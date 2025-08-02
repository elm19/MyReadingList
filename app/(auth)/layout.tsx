import GridShape from "@/components/layout/GridShape";
import ThemeSwitch from "@/components/MoonToggle";
import Link from "next/link";
import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <svg
        className="fixed inset-0 w-screen h-screen pointer-events-none z-10000"
        width="100vw"
        height="100vh"
        viewBox="0 0 1920 1080"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Vertical lines */}
        {Array.from({ length: 33 }).map((_, i) => (
          <line
            key={`v-${i}`}
            x1={i * 70}
            y1={0}
            x2={i * 50}
            y2={1080}
            stroke="#818cf8"
            strokeWidth="1"
            opacity="0.08"
          />
        ))}
        {/* Horizontal lines */}
        {Array.from({ length: 13 }).map((_, i) => (
          <line
            key={`h-${i}`}
            x1={0}
            y1={i * 70}
            x2={1920}
            y2={i * 70}
            stroke="#818cf8"
            strokeWidth="1"
            opacity="0.08"
          />
        ))}
      </svg>
      {/* Left side - decorative */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-b from-primary-400/10 to-primary-600/10 dark:from-primary-900 dark:to-primary-950">
        <div className="absolute inset-0">
          <GridShape />
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center w-full p-12">
          <Link href="/" className="mb-8 transition-transform hover:scale-105">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
              OurReadingList
            </h1>
          </Link>
          <div className="max-w-md text-center">
            <p className="text-xl font-medium text-gray-600 dark:text-gray-300">
              Join our community of book lovers
            </p>
            <p className="mt-4 text-gray-500 dark:text-gray-400">
              Discover curated reading lists, share your favorites, and connect
              with fellow readers around the world.
            </p>
          </div>
          <div className="mt-12 p-6 bg-white/10 dark:bg-gray-800/30 rounded-lg backdrop-blur-sm">
            <p className="text-sm text-gray-600 dark:text-gray-300 italic">
              &quot;&ldquo;Reading is a conversation. All books talk. But a good
              book listens as well.&rdquo;&quot;
              <span className="block mt-2 font-medium">— Mark Haddon</span>
            </p>
          </div>
        </div>
      </div>

      {/* Right side - form */}
      <div className="flex-1 z-1 flex flex-col justify-center items-center p-4 sm:p-8 lg:p-12 bg-white dark:bg-gray-900">
        <div className="w-full max-w-md">{children}</div>
        <div className="absolute top-4 right-4">
          <ThemeSwitch />
        </div>
      </div>
    </div>
  );
}
