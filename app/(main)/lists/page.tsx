import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import getBookLists from "@/utils/supabase/queries";
import type { Metadata } from "next";
import Link from "next/link";
import CardList from "@/components/CardList";
import NoBookList from "@/components/book-lists/NoBookList";
import { OurPagination } from "@/components/OurPagination";

export const metadata: Metadata = {
  title: "Book Lists - OurReadingList",
  description: "Explore and manage your curated book lists on OurReadingList.",
};

export default async function BookListsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) {
  const params = await searchParams;
  const page = params.page ? Number(params.page) : 1;
  
  // console.log('Page number:', page);
  // console.log('Sort by:', sort);
  console.log('All search params:', searchParams);

  const {bookLists, count} = await getBookLists(page);
  console.log('Total count:', count);
  return (
    <div className="w-full min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold">Our Lists</h1>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
            {/* Search */}
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4"
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
                className="pl-10 pr-4 py-2 border bg-background text-foreground placeholder:text-muted-foreground rounded-lg text-sm hover:border-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring w-full sm:w-64"
              />
            </div>

            <Link
              href="/lists/my-lists"
              className="text-primary hover:text-primary/80 font-medium transition-colors whitespace-nowrap"
            >
              My Lists
            </Link>

            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground whitespace-nowrap">
                Sort by:
              </span>
              <DropdownMenu>
                <DropdownMenuTrigger className="border bg-background text-foreground rounded-lg px-3 py-2 text-sm hover:border-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring flex items-center gap-2">
                  Last Updated
                  <svg
                    className="h-4 w-4 text-muted-foreground"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link href="?sort=last-updated" className="w-full">
                      Last Updated
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="?sort=most-popular" className="w-full">
                      Most Popular
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="?sort=alphabetical" className="w-full">
                      Alphabetical
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="?sort=newest" className="w-full">
                      Newest
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Single Column Layout with Dividers */}
        <div className="space-y-0">
          {bookLists.map((list, index) => (
            <div key={list.id}>
              <CardList
                id={list.id}
                updateAt={list.updated_at}
                updatedBy={
                  list.last_item?.profiles?.username || ""
                }
                name={list.name}
                book_count={list.item_count}
                follower_count={list.follower_count}
              />
              {/* Divider - don't show after last item */}
              {index < bookLists.length - 1 && (
                <div className="border-b border-border"></div>
              )}
            </div>
          ))}
        </div>

        {/* Empty State */}
        {bookLists.length === 0 && (
          <NoBookList />
        )}
  
        <OurPagination />
      </div>
    </div>
  );
}
