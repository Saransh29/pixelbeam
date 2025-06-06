"use client";

import { SignUp } from "@clerk/nextjs";
import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";

export default function SignUpPage() {
  const router = useRouter();
  const { isSignedIn } = useAuth();

  useEffect(() => {
    if (isSignedIn) {
      router.push("/dashboard");
    }
  }, [isSignedIn, router]);

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* Navigation */}
      <div className="absolute top-8 right-8 z-10">
        <Link
          href="/sign-in"
          className="rounded-md border border-gray-300 bg-transparent px-4 py-2 text-gray-700 transition-colors hover:bg-gray-100"
        >
          Login
        </Link>
      </div>

      {/* Left side - Image (hidden on mobile) */}
      <div className="relative hidden md:block md:w-1/2">
        <Image
          src="/images/signup.png"
          alt="Sign Up"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Right side - Auth Component */}
      <div className="flex w-full items-center justify-center p-4 md:w-1/2 md:p-8">
        <SignUp
          appearance={{
            elements: {
              rootBox: "w-full max-w-md mx-auto",
              card: "shadow-none",
            },
          }}
          redirectUrl="/dashboard"
        />
      </div>
    </div>
  );
}
