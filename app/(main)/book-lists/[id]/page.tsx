import type { Metadata } from "next";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { getListData } from "@/utils/supabase/queries";
import { Novel } from "@/lib/types";
import { Button } from "@/components/ui/button";

// Import the new components
import { BookListHeader } from "@/components/book-lists/BookListHeader";
import { BookListDescription } from "@/components/book-lists/BookListDescription";
import { BookListItem } from "@/components/book-lists/BookListItem";
import { BookListDisclaimer } from "@/components/book-lists/BookListDisclaimer";

interface PageProps {
  params: Promise<{ id: string }>;
}

/**
 * Fetches book list data from the database.
 * @param id The ID of the book list.
 * @returns The book list data.
 * @throws Error if fetching data fails.
 */
async function getBookListData(id: string) {
  try {
    const data = await getListData(id);
    return data;
  } catch (error) {
    console.error("Error getting book list data:", error);
    throw new Error("Failed to get book list data");
  }
}

/**
 * Generates metadata for the book list page.
 * @param params Page parameters containing the book list ID.
 * @returns Metadata object with title and description.
 */
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  try {
    const list = await getBookListData(id);
    return {
      title: `${list.name} - Book List | OurReadingList`,
      description:
        list.description ||
        `Discover amazing books in the ${list.name} collection.`,
    };
  } catch {
    // Fallback metadata if list data cannot be fetched
    const fallbackName = id
      .replace(/-/g, " ")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    return {
      title: `${fallbackName} - Book List | OurReadingList`,
      description: `Details of the book list: ${fallbackName}.`,
    };
  }
}

/**
 * Main component for displaying a single book list.
 * @param params Page parameters containing the book list ID.
 * @returns JSX element for the book list page.
 */
export default async function BookListPage({ params }: PageProps) {
  const { id } = await params;

  try {
    const list = await getBookListData(id);

    // Format the last updated date for display
    const lastUpdatedDate = new Date(list.updated_at).toLocaleDateString(
      "en-US",
      {
        year: "numeric",
        month: "long",
        day: "numeric",
      }
    );

    return (
      <div className="min-h-screen max-w-4xl mx-auto z-1000  bg-accent">
        <div className="container mx-auto px-4 py-8">
          {/* Navigation: Back to Lists link */}
          <div className="mb-6">
            <Link
              href="/lists"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Lists
            </Link>
          </div>

          {/* Main Content Area */}
          <div className="w-full mx-auto">
            {/* Header Section: Displays list name, author, and last updated date */}
            <BookListHeader
              name={list.name}
              author={list.list_books[0]?.profiles?.username || "Unknown User"}
              lastUpdatedDate={lastUpdatedDate}
            />

            {/* Description Section: Displays the list's description */}
            <BookListDescription description={list.description} />

            <Separator className="my-8" />

            {/* Books Section: Displays all books in the list */}
            <div className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">
                  Books in this list ({list.list_books.length})
                </h2>
              </div>

              {list.list_books.length === 0 ? (
                // Message displayed when no books are in the list
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg">
                    No books have been added to this list yet.
                  </p>
                </div>
              ) : (
                // Renders each book using the BookListItem component
                <div className="space-y-8">
                  {list.list_books.map(
                    (elem: { books: Novel }, index: number) => (
                      <BookListItem
                        key={elem.books.id}
                        book={elem.books}
                        index={index}
                      />
                    )
                  )}
                </div>
              )}
            </div>

            {/* Disclaimer Section: Displays a disclaimer about book ownership */}
            <BookListDisclaimer />
          </div>
        </div>
      </div>
    );
  } catch (error) {
    // Error handling for when the book list cannot be loaded
    console.error("Error loading book list:", error);
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Oops! Something went wrong
          </h1>
          <p className="text-muted-foreground mb-6">
            We couldn&apos;t load the book list. Please try again later.
          </p>
          <Link href="/lists">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Lists
            </Button>
          </Link>
        </div>
      </div>
    );
  }
}