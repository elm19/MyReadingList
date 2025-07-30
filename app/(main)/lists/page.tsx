import { Card, CardContent } from "@/components/ui/card";
import getBookLists from "@/utils/supabase/queries";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Book Lists - OurReadingList",
  description: "Explore and manage your curated book lists on OurReadingList.",
};

export default async function BookListsPage() {
  const bookLists = await getBookLists();
  console.log(bookLists);
  return (
    <div className="w-full min-h-screen bg-gray-50/50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Book Lists
          </h1>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
            {/* Search */}
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search lists..."
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm bg-white hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-64"
              />
            </div>

            <Link
              href="/lists/my-lists"
              className="text-blue-600 hover:text-blue-700 font-medium transition-colors whitespace-nowrap"
            >
              My Lists
            </Link>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-700 whitespace-nowrap">
                Sort by:
              </span>
              <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="last-updated">Last Updated</option>
                <option value="most-popular">Most Popular</option>
              </select>
            </div>
          </div>
        </div>

        {/* Single Column Layout */}
        <div className="space-y-4">
          {bookLists.map((list) => (
              <Card key={list.id} className="hover:shadow-md transition-all duration-200 border border-gray-200 bg-white hover:border-gray-300 cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start gap-4">
                    {/* Left Section - Main Info */}
                    <div className="flex-1 min-w-0">
                      <h2 className="text-xl font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
                        <Link href={`/lists/${list.id}`}>
                          {list.name}
                        </Link>
                      </h2>

                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <span>Last updated by</span>
                          <Link
                            href="/profile/john_doe"
                            className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
                            // onClick={(e) => e.stopPropagation()}
                          >
                            @john_doe
                          </Link>
                          <span className="text-gray-400">•</span>
                          <span>3 months ago</span>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <svg
                              className="h-4 w-4 text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253z"
                              />
                            </svg>
                            <span>{list.book_count || 12} books</span>
                          </div>
                          <Link href={`/lists/${list.id}/followers`} className="text-blue-600 hover:text-blue-700 font-medium hover:underline"></Link>
                          <div className="flex items-center gap-1">
                            <svg
                              className="h-4 w-4 text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                              />
                            </svg>
                            <span>247 followers</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Section - Action Indicator */}
                    <div className="flex-shrink-0">
                      <svg
                        className="h-5 w-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </CardContent>
              </Card>
          ))}
        </div>

        {/* Empty State */}
        {bookLists.length === 0 && (
          <div className="text-center py-12">
            <div className="max-w-sm mx-auto">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253z"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                No book lists
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Get started by creating a new book list.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
