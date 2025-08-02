import type { Metadata } from "next";
import {
  BotMessageSquare,
  BrainCircuit,
  Compass,
  GitFork,
  HeartHandshake,
  Library,
  Link,
  MessageCircleQuestion,
  Milestone,
  Search,
  Sparkles,
  Users,
  Book,
} from "lucide-react";

import BlogLayout from "@/components/layout/BlogLayout";

export const metadata: Metadata = {
  title: "About Us - OurReadingList",
  description:
    "Learn more about OurReadingList, our mission, and how we're solving book discovery for readers everywhere.",
};

export default function AboutPage() {
  const sections = [
      {
        id: "mission",
        title: "Our Mission",
        icon: <HeartHandshake size={18} />,
      },
      { id: "problem", title: "The Problem", icon: <GitFork size={18} /> },
      { id: "solution", title: "Our Solution", icon: <Compass size={18} /> },
      { id: "why", title: "Why We Do This", icon: <Book size={18} /> },
      {
        id: "community",
        title: "Join Our Community",
        icon: <Users size={18} />,
      },
      {
        id: "contact",
        title: "Contact Us",
        icon: <MessageCircleQuestion size={18} />,
      },
    ];
  return (
    <BlogLayout sections={sections}>
      <div className="relative overflow-hidden bg-white dark:bg-gray-950">
        <div className="relative px-4 sm:px-6 lg:px-8">
          <div className="text-lg max-w-7xl mx-auto">
            <div className="text-left mb-12">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl">
                About OurReadingList
              </h1>
              <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">
                Books Shouldn&apos;t Be Limited by Where You Find Them
              </p>
            </div>

            <div className="space-y-16 text-left">
              <section>
                <p className="text-lg leading-8 text-gray-700 dark:text-gray-300">
                  We created OurReadingList because we believe great stories
                  exist everywhere – from traditional publishers on Amazon to
                  web serials on Royal Road, from indie gems on Wattpad to
                  hidden treasures in MTL novels. Yet most readers stick to one
                  or two platforms out of habit, missing out on incredible books
                  that might be exactly what they&apos;re looking for.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                  <BotMessageSquare size={32} className="text-primary" />
                  The Problem We&apos;re Solving
                </h2>
                <div className="grid md:grid-cols-2 gap-6 text-gray-700 dark:text-gray-300">
                  <div className="p-6 bg-gray-100 dark:bg-gray-800/50 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                      <GitFork size={20} /> Platform Silos
                    </h3>
                    <p>
                      Keeps great books hidden based on where they&apos;re
                      published.
                    </p>
                  </div>
                  <div className="p-6 bg-gray-100 dark:bg-gray-800/50 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                      <Search size={20} /> Scattered Recommendations
                    </h3>
                    <p>Forums are hard to navigate and often repetitive.</p>
                  </div>
                  <div className="p-6 bg-gray-100 dark:bg-gray-800/50 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                      <Compass size={20} /> Limited Discovery
                    </h3>
                    <p>
                      Each platform only shows you what&apos;s in their catalog.
                    </p>
                  </div>
                  <div className="p-6 bg-gray-100 dark:bg-gray-800/50 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                      <Link size={20} /> Messy, Unorganized Lists
                    </h3>
                    <p>
                      They don&apos;t actually help you find your next great
                      read.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                  <BrainCircuit size={32} className="text-primary" />
                  Our Solution: Community-Powered Book Discovery
                </h2>
                <p className="text-lg mb-10 text-gray-700 dark:text-gray-300">
                  OurReadingList brings together book lovers who read across
                  platforms to build comprehensive, organized lists around what
                  actually matters – the stories you want to read.
                </p>
                <div>
                  <h3 className="text-2xl font-semibold mb-6">How it works:</h3>
                  <ol className="relative border-l border-gray-200 ml-5 dark:border-gray-700">
                    <li className="mb-10 ml-6">
                      <span className="absolute flex items-center justify-center w-8 h-8 bg-primary-100 rounded-full -left-4 ring-8 ring-white dark:ring-gray-950 dark:bg-primary-900">
                        <Library className="w-5 h-5 text-primary-500 dark:text-primary-400" />
                      </span>
                      <h4 className="font-semibold text-lg">
                        We curate initial lists
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        Around genres, tropes, themes, and reader interests.
                      </p>
                    </li>
                    <li className="mb-10 ml-6">
                      <span className="absolute flex items-center justify-center w-8 h-8 bg-primary-100 rounded-full -left-4 ring-8 ring-white dark:ring-gray-950 dark:bg-primary-900">
                        <Users className="w-5 h-5 text-primary-500 dark:text-primary-400" />
                      </span>
                      <h4 className="font-semibold text-lg">
                        Our community adds recommendations
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        From any platform – Amazon, Royal Road, Webnovel,
                        Wattpad, wherever great stories live.
                      </p>
                    </li>
                    <li className="mb-10 ml-6">
                      <span className="absolute flex items-center justify-center w-8 h-8 bg-primary-100 rounded-full -left-4 ring-8 ring-white dark:ring-gray-950 dark:bg-primary-900">
                        <Sparkles className="w-5 h-5 text-primary-500 dark:text-primary-400" />
                      </span>
                      <h4 className="font-semibold text-lg">
                        We build clean, organized collections
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        Together, we make discovery actually useful.
                      </p>
                    </li>
                    <li className="ml-6">
                      <span className="absolute flex items-center justify-center w-8 h-8 bg-primary-100 rounded-full -left-4 ring-8 ring-white dark:ring-gray-950 dark:bg-primary-900">
                        <Milestone className="w-5 h-5 text-primary-500 dark:text-primary-400" />
                      </span>
                      <h4 className="font-semibold text-lg">
                        Powerful filtering tools
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        As our content grows, we&apos;re developing tools to
                        help you find exactly what you&apos;re craving.
                      </p>
                    </li>
                  </ol>
                </div>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
                  <HeartHandshake size={32} className="text-primary" />
                  Why We Do This
                </h2>
                <div className="text-lg space-y-4 text-gray-700 dark:text-gray-300">
                  <p>
                    We&apos;re readers first. We&apos;ve spent years hunting for
                    that perfect next book, frustrated by the artificial
                    barriers between platforms. We know the joy of discovering
                    an amazing story in an unexpected place, and we want to make
                    that experience easier for everyone.
                  </p>
                  <p className="font-semibold text-primary">
                    Books are about the stories they tell, not where you happen
                    to find them.
                  </p>
                  <p>
                    OurReadingList exists to connect readers with the stories
                    they&apos;ll love, regardless of platform, format, or
                    traditional publishing boundaries.
                  </p>
                </div>
              </section>

              <section className="bg-gray-100 dark:bg-gray-800/50 p-8 rounded-lg">
                <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
                  <Users size={32} className="text-primary" />
                  Join Our Community
                </h2>
                <p className="text-lg mb-6 text-gray-700 dark:text-gray-300">
                  Every list on our site benefits from our community&apos;s
                  knowledge and discoveries. Whether you&apos;re looking for
                  your next obsession or want to help others discover hidden
                  gems, you&apos;re part of making book discovery better for
                  everyone.
                </p>
                <p className="text-lg font-medium">
                  Ready to find your next great read? Start exploring our lists,
                  and don&apos;t forget to add your own recommendations along
                  the way.
                </p>
              </section>

              <hr className="border-gray-200 dark:border-gray-700" />

              <section id="contact">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <MessageCircleQuestion className="text-primary" />
                  Questions about our lists or want to suggest a new category?
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  We&apos;d love to hear from you.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </BlogLayout>
  );
}
