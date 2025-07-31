import type { Metadata } from "next";
import { getBooks } from "@/utils/supabase/queries";
import CardList from "@/components/CardList";
import NoBookList from "@/components/book-lists/NoBookList";
import { OurPagination } from "@/components/OurPagination";
import SubHeaderSeaction from "@/components/SubHeaderSeaction";

export const metadata: Metadata = {
  title: "Books - OurReadingList",
  description: "Discover and explore a wide range of books on OurReadingList.",
};

export default async function BooksPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) {
  const params = await searchParams;
  const page = params.page ? Number(params.page) : 1;
  const sort = params.sort === "most-popular" ? 1 : 0;
  const search = params.search;

  const { books, count } = await getBooks(page, sort, search);
  console.log("searchParams", search);
  console.log(books, count);
  return (
    <div className="w-full mb-10 min-h-screen max-w-4xl mx-auto px-4 py-8">
      <SubHeaderSeaction type="book" />

      {/* Single Column Layout with Dividers */}
      <div className="space-y-0">
        {books.map((book, index) => (
          <div key={book.id}>
            <CardList
              type="books"
              id={book.id}
              date={book.added_at}
              user={book.author || ""}
              name={book.name}
              book_count={book.list_count}
              source={book.source_id}
            />
            {/* Divider - don't show after last item */}
            {index < books.length - 1 && (
              <div className="border-b border-border"></div>
            )}
          </div>
        ))}
      </div>

      {/* Empty State */}
      {books.length === 0 && <NoBookList />}

      {count && count > 10 && (
        <OurPagination page={page} totalCount={count} pageSize={10} />
      )}
    </div>
  );
}
