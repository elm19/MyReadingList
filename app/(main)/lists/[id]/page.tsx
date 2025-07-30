import type { Metadata } from "next";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { getListData, isItTracked } from "@/utils/supabase/queries";
import { Button } from "@/components/ui/button";

import { Badge } from "@/components/ui/badge";

import { BookListDisclaimer } from "@/components/book-lists/BookListDisclaimer";
import { Novel } from "@/lib/types";
import MainBreadcrumb from "@/components/layout/MainBreadcrumb";
import FollowListButton from "@/components/book-lists/FollowListButton";
import BookListItemMenu from "@/components/book-lists/BookListItemMenu";
import ExplainHoverCard from "@/components/book-lists/ExplainHoverCard";

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




export default async function BookListPage({ params }: PageProps) {
  const { id } = await params;


  try {
    const list = await getBookListData(id);
    console.log(list)
    // Format the last updated date for display
    const lastUpdatedDate = new Date(list.updated_at).toLocaleDateString(
      "en-US",
      {
        year: "numeric",
        month: "long",
        day: "numeric",
      }
    );
    const contributors = [
      ...new Set(
        list.list_items.map(
          (item: { profiles: { username: string } }) => item.profiles.username
        )
      ),
    ];
    console.log(contributors);
    const {isFollowing} = await isItTracked(list.id)
    console.log(isFollowing)
    

    return (
      <div className="w-full pt-10 min-h-3xl max-w-4xl mx-auto px-4 flex flex-col rounded-lg">
        {/* Header Section */}
        <MainBreadcrumb page="lists" />
        <div className="flex capitalize flex-col gap-4 items-start mb-6">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-3">
            {list.name}
          </h1>
          <div className="flex md:items-center gap-4 justify-between w-full flex-col md:flex-row text-sm text-gray-500 dark:text-gray-400">
            <div className="flex flex-col gap-2 ">
              <div>
                Last updated {lastUpdatedDate}
              </div>
              <div className="flex gap-2 items-center">
                <span>Built by </span>

                {(contributors as string[]).map((username) => (
                  <Badge key={username} variant="secondary">
                    <Link href={`profile/${username}`}>{username}</Link>
                  </Badge>
                ))}
              </div>

            </div>
            <FollowListButton isFollowing={isFollowing}  listId={list.id} />
          </div>
        </div>

        {/* Description Section */}
        <div className="mb-8">
          <p className="whitespace-pre-wrap">
            {list.description || "This list has no description yet."}
          </p>
        </div>

        <Separator className="my-6" />

        {/* Novels Section */}
        <div>
          {list.list_items.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400">
              No books have been added to this list yet.
            </p>
          ) : (
            <ul className="space-y-8">
              {list.list_items.map((elem: { description:string, books: Novel }, index:number) => (
                <li key={elem.books.id}>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl capitalize font-semibold text-gray-900 dark:text-gray-100 flex items-center">
                      {index + 1}. {elem.books.name}{" "}
                      {elem.books.author ? `By ${elem.books.author}` : ""}
                      {!elem.books.is_complete && (
                        <ExplainHoverCard />
                      )}
                    </h3>
                  </div>

                  <div className="pl-6 border-l-2 border-gray-200 dark:border-gray-700">
                    <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                      {elem.description || "No description available."}
                    </p>
                    <BookListItemMenu />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Disclaimer Section */}
        <Separator className="my-8 mt-20 self-end" />
        <BookListDisclaimer />
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
