
import GridShape from "@/components/layout/GridShape";
import ThemeSwitch from "@/components/MoonToggle";
import Link from "next/link";
import React from "react";
import { Toaster } from "sonner";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      < Toaster position="top-left" />

      {/* Left side - decorative */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-b from-primary-400/10 to-primary-600/10 dark:from-primary-900 dark:to-primary-950">
        <div className="absolute inset-0">
          <GridShape />
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center w-full p-12">
          <Link href="/" className="mb-8 transition-transform hover:scale-105">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
              MyReadingList
            </h1>
          </Link>
          <div className="max-w-md text-center">
            <p className="text-xl font-medium text-gray-600 dark:text-gray-300">
              Join our community of book lovers
            </p>
            <p className="mt-4 text-gray-500 dark:text-gray-400">
              Discover curated reading lists, share your favorites, and connect with fellow readers around the world.
            </p>
          </div>
          <div className="mt-12 p-6 bg-white/10 dark:bg-gray-800/30 rounded-lg backdrop-blur-sm">
            <p className="text-sm text-gray-600 dark:text-gray-300 italic">
              &quot;&ldquo;Reading is a conversation. All books talk. But a good book listens as well.&rdquo;&quot;
              <span className="block mt-2 font-medium">— Mark Haddon</span>
            </p>
          </div>
        </div>
      </div>

      {/* Right side - form */}
      <div className="flex-1 z-1 flex flex-col justify-center items-center p-4 sm:p-8 lg:p-12 bg-white dark:bg-gray-900">
        <div className="w-full max-w-md">
          {children}
        </div>
        <div className="absolute top-4 right-4">
          <ThemeSwitch />
        </div>
      </div>
    </div>
  );
}