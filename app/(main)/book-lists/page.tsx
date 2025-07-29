import { getListData } from "@/utils/supabase/queries";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Lists - OurReadingList",
  description: "Explore and manage your curated book lists on OurReadingList.",
};

export default async function BookListsPage() {
  // const data = await getBookLists();
  // const list = {
  //     name: "mmmm",
  //     description: 'hhhhhh',
  //     isPrivate: false,
  //     books:[{
  //       id: '1',
  //       name:'aaa',
  //       author: 'hhhhhhh',
  //       description: 'desc',
  //       type:"B"
  //     }, {
  //       id: '2',
  //       name:'birth',
  //       author: 'hhhhhhh',
  //       description: 'desc',
  //       type:'AC'
  //     }]
  // }
  const result = await getListData("mmmm");

  console.log(result)
  return (
    <div>
      <h1>Book Lists</h1>
      <p>This is the book lists page.</p>
      {/* <div>{data && data.length>0 && data[0].name}</div> */}
      {/* <div>
        {result.name}
      </div>
      <ul>
        {result.list_books.map(book => (
          <div key={book.books.id} >
            {book.books.name}
          </div>
        ))}
      </ul> */}
    </div>
  );
}

