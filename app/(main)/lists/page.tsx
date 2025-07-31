
import getBookLists from "@/utils/supabase/queries";
import type { Metadata } from "next";
import CardList from "@/components/CardList";
import NoBookList from "@/components/book-lists/NoBookList";
import { OurPagination } from "@/components/OurPagination";
import SubHeaderSeaction from "@/components/SubHeaderSeaction";

export const metadata: Metadata = {
  title: "Our Reading Lists - Book Lists",
  description: "Explore public curated book lists, discover new reads, and share your own collections on OurReadingList.",
};

export default async function BookListsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) {
  const params = await searchParams;
  const page = params.page ? Number(params.page) : 1;
  const sort = params.sort ==="most-popular" ?  1 : 0;
  const search = params.search
  
  const { bookLists, count } = await getBookLists(page, sort, search);

  return (
    <div className="w-full mb-10 min-h-screen max-w-4xl mx-auto px-4 py-8">
      <SubHeaderSeaction />

      {/* Single Column Layout with Dividers */}
      <div className="space-y-0">
        {bookLists.map((list, index) => (
          <div key={list.id}>
            <CardList
              id={list.id}
              updateAt={list.updated_at}
              updatedBy={list.last_item?.profiles?.username || ""}
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
      {bookLists.length === 0 && <NoBookList />}

      {count && count>10 && <OurPagination page={page} totalCount={count} pageSize={10} />}
    </div>
  );
}
