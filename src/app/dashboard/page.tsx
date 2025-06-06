import { auth } from "@clerk/nextjs/server";

import { api, HydrateClient } from "~/trpc/server";
import { AppSidebar } from "~/components/ui/app-sidebar";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });
  const { userId } = await auth();

  void api.post.getSecretMessage.prefetch();

  let secretMessage = "Log in to see your secret message!";
  if (userId) {
    try {
      secretMessage = await api.post.getSecretMessage();
    } catch (error) {
      console.error("Error fetching secret message:", error);
      secretMessage = "Could not fetch secret message.";
    }
  }

  return (
    <HydrateClient>
      <AppSidebar>
        <main className="flex flex-1 flex-col items-center justify-center overflow-auto p-4 md:p-6">
          <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
            <div className="flex flex-col items-center gap-2">
              <p className="text-2xl">
                {hello ? hello.greeting : "Loading tRPC query..."}
              </p>
              <p className="text-xl">{secretMessage}</p>
            </div>
          </div>
        </main>
      </AppSidebar>
    </HydrateClient>
  );
}
