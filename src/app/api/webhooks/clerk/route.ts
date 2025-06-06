import { Webhook } from "svix";
import { headers } from "next/headers";
import { type WebhookEvent } from "@clerk/nextjs/server";
import { db } from "~/server/db"; // Assuming your db instance is exported from here
import { users } from "~/server/db/schema"; // Your Drizzle users schema
import { eq } from "drizzle-orm";
import { env } from "~/env";

// Make sure CLERK_WEBHOOK_SECRET is set in your environment variables and validated by your env schema
if (!env.CLERK_WEBHOOK_SECRET) {
  throw new Error(
    "Please ensure CLERK_WEBHOOK_SECRET is defined in your environment variables and included in your env schema (e.g., src/env.js or src/env.mjs)",
  );
}

export async function POST(req: Request) {
  const headerPayload = await headers(); // Await the headers
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occurred -- no svix headers", {
      status: 400,
    });
  }

  let payload: WebhookEvent;
  try {
    const rawBody = await req.text();
    const wh = new Webhook(env.CLERK_WEBHOOK_SECRET);
    payload = wh.verify(rawBody, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occurred verifying webhook", {
      status: 400,
    });
  }

  const eventType = payload.type;
  console.log(`Received webhook event: ${eventType}`);

  try {
    switch (eventType) {
      case "user.created": {
        const userData = payload.data;
        const primaryEmailObj = userData.email_addresses.find(
          (email: {
            id: string;
            email_address: string;
            verification: { status: string } | null;
          }) => email.id === userData.primary_email_address_id,
        );

        if (!primaryEmailObj?.email_address) {
          console.warn(
            "User created event received without a primary email address.",
          );
          return new Response("Primary email address missing", { status: 400 });
        }

        await db.insert(users).values({
          user_id: userData.id,
          email: primaryEmailObj.email_address,
          username: userData.username ?? null, // Handle potential null from Clerk
          first_name: userData.first_name ?? null,
          last_name: userData.last_name ?? null,
          email_verified: primaryEmailObj.verification?.status === "verified",
          created_at: userData.created_at
            ? new Date(userData.created_at)
            : new Date(),
          updated_at: userData.updated_at
            ? new Date(userData.updated_at)
            : new Date(),
          // is_deleted defaults to false
        });
        console.log(`User ${userData.id} created in database.`);
        break;
      }
      case "user.updated": {
        const userData = payload.data;
        const primaryEmailObj = userData.email_addresses.find(
          (email: {
            id: string;
            email_address: string;
            verification: { status: string } | null;
          }) => email.id === userData.primary_email_address_id,
        );

        if (!primaryEmailObj?.email_address) {
          console.warn(
            "User updated event received without a primary email address.",
          );
          // Depending on your logic, you might still want to update other fields
          // or return an error. For now, we'll skip if primary email is gone.
          return new Response("Primary email address missing for update", {
            status: 400,
          });
        }

        await db
          .update(users)
          .set({
            email: primaryEmailObj.email_address,
            username: userData.username ?? null,
            first_name: userData.first_name ?? null,
            last_name: userData.last_name ?? null,
            email_verified: primaryEmailObj.verification?.status === "verified",
            updated_at: userData.updated_at
              ? new Date(userData.updated_at)
              : new Date(),
          })
          .where(eq(users.user_id, userData.id));
        console.log(`User ${userData.id} updated in database.`);
        break;
      }
      case "user.deleted": {
        const { id, deleted } = payload.data;

        if (!id) {
          console.warn("User deletion event received without an ID.");
          return new Response("User ID missing for deletion", { status: 400 });
        }

        // Ensure the event confirms deletion, though the event type itself is a strong indicator
        if (deleted) {
          await db
            .update(users)
            .set({
              is_deleted: true,
              updated_at: new Date(), // Update timestamp for the deletion event
            })
            .where(eq(users.user_id, id));
          console.log(`User ${id} marked as deleted in database.`);
        } else {
          // This case should ideally not happen for a user.deleted event
          console.warn(
            `User deletion event for ${id} received but 'deleted' flag is false.`,
          );
        }
        break;
      }
      default:
        console.log(`Unhandled webhook event type: ${eventType}`);
    }

    return new Response("Webhook processed successfully", { status: 200 });
  } catch (error) {
    console.error("Error processing webhook event:", error);
    // It's good practice to not expose internal error details in the response
    return new Response("Error processing webhook event", { status: 500 });
  }
}
