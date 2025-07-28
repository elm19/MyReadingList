import getBookLists, { addBookListToDb, addNewBookList } from "@/utils/supabase/queries";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Lists - OurReadingList",
  description: "Explore and manage your curated book lists on OurReadingList.",
};

export default async function BookListsPage() {
  const data = await getBookLists();
  const list = {
      name: "sER",
      description: 'hhhhhh',
      isPrivate: false,
      novels:[{
        name:'aaa',
        author: 'hhhhhhh',
        type:"B"
      }, {
        name:'birth',
        author: 'hhhhhhh',
        type:'B'
      }]
  }
  // const result = await addNewBookList(list);
  // console.log(result)
  return (
    <div>
      <h1>Book Lists</h1>
      <p>This is the book lists page.</p>
      <div>{data && data[0].name}</div>
    </div>
  );
}

