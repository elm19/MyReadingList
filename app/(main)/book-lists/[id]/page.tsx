import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Heart, Flag, Loader2, ArrowLeft } from "lucide-react";
import { HoverCard } from "@/components/ui/hover-card";
import { HoverCardContent, HoverCardTrigger } from "@radix-ui/react-hover-card";
import Link from "next/link";
// import { List, Novel } from "@/lib/types";

import { getListData } from "@/utils/supabase/queries";
import { Novel } from "@/lib/types";

interface PageProps {
  params: Promise<{ id: string }>;
}

// Function to get book list data
async function getBookListData(id: string) {
  try {
    const data = await getListData(id);
    // console.log("this is data", data);
    return data;
  } catch (error) {
    console.error("Error getting book list data:", error);
    throw new Error("Failed to get book list data");
  }
}

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

export default async function BookListPage({ params }: PageProps) {
  const { id } = await params;
  try {
    const list = await getBookListData(id);
    console.log(list);

    const lastUpdatedDate = new Date(list.updated_at).toLocaleDateString(
      "en-US",
      {
        year: "numeric",
        month: "long",
        day: "numeric",
      }
    );
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          {/* Navigation */}
          <div className="mb-6">
            <Link
              href="/lists"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Lists
            </Link>
          </div>

          {/* Main Content */}
          <div className="w-full max-w-4xl mx-auto">
            {/* Header Section */}
            <div className="flex flex-col gap-4 items-start mb-8">
              <h1 className="text-4xl font-bold text-foreground capitalize">
                {list.name}
              </h1>

              <div className="flex items-center justify-between w-full text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <span>Built by</span>
                  <Badge variant="secondary">
                    {list.list_books[0].profiles.username || "Unknown User"}
                  </Badge>
                  <span>•</span>
                  <span>Last updated {lastUpdatedDate || "now"}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <Heart className="w-4 h-4" />
                    Follow
                  </Button>
                </div>
              </div>
            </div>

            {/* Description Section */}
            <div className="mb-8">
              <div className="prose prose-gray dark:prose-invert max-w-none">
                <p className="text-lg leading-relaxed">
                  {list.description || "This list has no description yet."}
                </p>
              </div>
            </div>

            <Separator className="my-8" />

            {/* Books Section */}
            <div className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">
                  Books in this list ({list.list_books.length})
                </h2>
              </div>

              {list.list_books.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg">
                    No books have been added to this list yet.
                  </p>
                </div>
              ) : (
                <div className="space-y-8">
                  {list.list_books.map(
                    (elem: { books: Novel }, index: number) => {
                      const book = elem.books;
                      console.log(book);
                      return (
                        <div key={book.id} className="group">
                          <div className="flex items-start gap-4">
                            {/* Book Number */}
                            <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm font-semibold text-primary">
                              {index + 1}
                            </div>

                            {/* Book Content */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-3">
                                <h3 className="text-xl font-semibold text-foreground capitalize flex items-center gap-2">
                                  {book.name}
                                  {book.author && (
                                    <span className="text-base font-normal text-muted-foreground">
                                      by {book.author}
                                    </span>
                                  )}

                                  {book.is_complete && (
                                    <HoverCard>
                                      <HoverCardTrigger asChild>
                                        <div className="cursor-help">
                                          <Loader2 className="w-4 h-4 animate-spin text-amber-500" />
                                        </div>
                                      </HoverCardTrigger>
                                      <HoverCardContent>
                                        <div className="bg-background border rounded-lg p-3 shadow-lg">
                                          <div className="flex items-center gap-2 mb-2">
                                            <Loader2 className="w-4 h-4 animate-spin text-amber-500" />
                                            <h4 className="text-sm font-semibold">
                                              Collecting Book Details
                                            </h4>
                                          </div>
                                          <p className="text-xs text-muted-foreground mb-2">
                                            Help us speed up the process by
                                            providing information about this
                                            book.
                                          </p>
                                          <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() =>
                                              alert(
                                                `Add information about: ${book.name}`
                                              )
                                            }
                                          >
                                            Add Details
                                          </Button>
                                        </div>
                                      </HoverCardContent>
                                    </HoverCard>
                                  )}
                                </h3>

                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
                                >
                                  <Flag className="w-4 h-4" />
                                </Button>
                              </div>

                              <div className="pl-4 border-l-2 border-border">
                                <p className="text-muted-foreground leading-relaxed mb-4">
                                  {book.description ||
                                    "No description available for this book yet."}
                                </p>

                                {/* Book metadata */}
                                {/* <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              {book.genre && (
                                <Badge variant="outline" className="text-xs">
                                  {book.genre}
                                </Badge>
                              )}
                              {book.publishedYear && (
                                <span>{book.publishedYear}</span>
                              )}
                              {book.rating && (
                                <span>★ {book.rating}/5</span>
                              )}
                            </div> */}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              )}
            </div>

            {/* Disclaimer Section */}
            <Separator className="my-8" />
            <div className="text-xs text-muted-foreground bg-muted/30 p-4 rounded-lg">
              <p>
                <strong>DISCLAIMER:</strong> The books and novels listed on this
                page are not owned by us. This list is intended for
                recommendation and discovery purposes only. All rights and
                ownership of the content belong to their respective authors and
                publishers.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
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

//     return (
//       <div className="min-h-screen bg-background flex items-center justify-center">
//         <div className="text-center">
//           <h1 className="text-2xl font-bold text-foreground mb-4">
//             Oops! Something went wrong
//           </h1>
//           <p className="text-muted-foreground mb-6">
//             We couldn't load the book list. Please try again later.
//           </p>
//           <Link href="/lists">
//             <Button variant="outline">
//               <ArrowLeft className="w-4 h-4 mr-2" />
//               Back to Lists
//             </Button>
//           </Link>
//         </div>
//       </div>
//     );
