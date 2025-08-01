// disable-next-line @typescript-eslint/ban-ts-comment
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Star } from "lucide-react";
import MainBreadcrumb from "@/components/layout/MainBreadcrumb";
import Link from "next/link";
import { getBookData } from "@/utils/supabase/queries";
import { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import BackToTopButton from "@/components/BackToTopButton";

interface PageProps {
  params: Promise<{ id: string }>;
}

async function getBookListData(id: string) {
  try {
    const data = await getBookData(id);
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
    const book = await getBookListData(id);
    console.log("Book data:", book);
    return {
      title: `${book.name} | OurReadingList`,
      description:
        book.description ||
        `Discover amazing books in the ${book.name} collection.`,
    };
  } catch {
    // Fallback metadata if list data cannot be fetched
    const fallbackName = id
      .replace(/-/g, " ")
      .split(" ")
      .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    return {
      title: `${fallbackName} | OurReadingList`,
      description: `Details of the book list: ${fallbackName}.`,
    };
  }
}

export default async function BookDetailsPage({ params }: PageProps) {
  const { id } = await params;
  const book = await getBookListData(id);

  const userLists = [
    { id: "1", name: "My Reading List" },
    { id: "2", name: "Wishlist" },
    { id: "3", name: "Favorites" },
  ];

  return (
    <div className="w-full pt-10 min-h-screen mx-auto px-4 md:p-4 m-auto flex justify-between rounded-lg">
      <div className="w-full pt-10 min-h-screen max-w-4xl mx-auto flex flex-col rounded-lg">
        <MainBreadcrumb page="books" />
        <div className=" gap-4 inline items-start mb-6">
          <h1 className="text-4xl capitalize font-bold">{book.name}</h1>
          <div className="flex items-center gap-2">
            <span className="text-xl text-gray-700 dark:text-gray-300 ">
              By {book.author}, On
            </span>
            <Badge>{book.source_id}</Badge>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-6 h-6 ${
                  i < Math.floor(book.rating)
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300 dark:text-gray-600"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {book.book_tags.map((tag) => (
            <Badge key={tag.tag_id} variant="secondary">
              {tag && tag.tag_id}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button>Add to a List</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {userLists.map((list) => (
                  <DropdownMenuItem key={list.id}>{list.name}</DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Link href={`/books/${"some-book-id"}/edit`}>
              <Button variant="outline">Contribute</Button>
            </Link>
          </div>
          <Link className="self-end" href={`/books/${"some-book-id"}/edit`}>
            <Button size={"lg"} variant="destructive">
              Read Now
            </Button>
          </Link>
        </div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl capitalize font-semibold text-gray-900 dark:text-gray-100 flex items-center">
            Description
          </h3>
        </div>
        <div className="pl-6 border-l-2 border-b-2 mb-10 border-gray-200 dark:border-gray-700">
          <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
            {book.description || "No description available."}
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Mentioned In</h2>
          <div className="rounded-md shadow-sm">
            <Table>
              <TableBody>
                {book.list_items.map((listItem, index: number) => (
                  <TableRow
                    key={index}
                    className="hover:bg-gray-50/50 transition-colors duration-150 group border-b border-gray-50"
                  >
                    <TableCell className="py-4 shadow-sm">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center group-hover:from-blue-200 group-hover:to-indigo-200 transition-colors">
                          <svg
                            className="w-4 h-4 text-blue-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                            />
                          </svg>
                        </div>
                        <div>
                          <div className="font-semibold capitalize">
                            {listItem.book_lists.name}
                          </div>
                          <div className="text-sm mt-0.5 text-gray-500 flex gap-1 items-center flex-wrap">
                            <div className="text-sm  ">
                              {listItem.book_lists.item_count}{" "}
                              {listItem.book_lists.item_count === 1
                                ? "book"
                                : "books"}
                            </div>
                            <span>•</span>
                            <div className="text-xsmt-0.5">
                              updated by @
                              <Link
                                href={`/profiles/${listItem.profiles.username}`}
                              >
                                {listItem.profiles.username}
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      <div className="w-full hidden md:block max-w-sm px-4 py-6 rounded-lg">
        <BackToTopButton />
      </div>
    </div>
  );
}
