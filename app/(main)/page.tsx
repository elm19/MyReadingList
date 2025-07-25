

import HeroSection from "@/components/HeroSection";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <h1 className="text-center text-2xl font-bold mt-10">
        Welcome to MyReadingLists
      </h1>
      <p className="text-center text-muted-foreground mt-4">
        Explore curated book lists, create your own, and follow your reading journey.
      </p>
      <div className="container mx-auto px-4 mt-10">
        <p className="text-center text-lg">
          Discover, curate, and share your reading journey with us!
        </p>
      </div>
      <div className="flex justify-center mt-8">
        <Link
          href="/novel-lists/all"
          className="inline-block rounded-lg bg-primary-500 px-8 py-3 text-lg font-semibold text-white shadow-lg hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 transition"
        >
          See Popular Lists
        </Link>
      </div>
    </main>
  );
}
