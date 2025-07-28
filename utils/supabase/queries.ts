import { getUser } from "@/app/(auth)/actions";
import { createClient } from "./server";
import { List } from "@/lib/types";

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
}

export default async function getBookLists() {
  const supabase = await createClient();

  const { data: bookLists, error } = await supabase
    .from("book_lists")
    .select("*");

  if (error) {
    throw new Error(error.message);
  }
  return bookLists;
}

export const addBookListToDb = async () => {
  const { supabase, user } = await getUser();
  const { data, error } = await supabase
    .from("book_lists")
    .insert([
      { name: "testing", description: "testing", creator_id: user?.id }, // Adjust keys as needed
    ])
    .select();
  if (error) {
    console.log({ "error message addBookListTODb": error.message });
    return error;
  }

  return data;
};

export const addNewBookList = async (list: List) => {
  const { supabase, user } = await getUser();

  if (!user) {
    return { error: "you need to log in" };
  }

  const { data: listResult, error: listError } = await supabase
    .from("book_lists")
    .insert([
      { name: list.name, description: list.description, creator_id: user.id },
    ])
    .select()
    .single();
  console.log(listResult);
  if (listError) {
    console.log(listError.message);
    return { error: `failed to create a list, ${listError.message} ` };
  }

  const novelsWithIds = list.novels.map((book) => ({
    ...book,
    id: slugify(book.name),
  }));

  const ids = novelsWithIds.map((book) => book.id);

  // Check existing books by ID (not title)
  const { data: existingBooks } = await supabase
    .from("books")
    .select("id")
    .in("id", ids);

  const existingIds = new Set(existingBooks?.map((b) => b.id));
  const newBooks = novelsWithIds.filter((book) => !existingIds.has(book.id));
  if (newBooks.length > 0) {
    const { data: newBooksAdded, error: bookError } = await supabase
      .from("books")
      .insert(newBooks)
      .select();
    if (bookError) {
      console.log(bookError.message);
      return { error: `failed to add new books, ${bookError.message} ` };
    }
  } else {
      const { error } = await supabase.from("list_books").insert(existingBooks?.map(book =>{
        book_id: book.id,
        book_list_id: listResult.id,
        added_by: user.id,
      })))
  }

  const allBooks = [...(existingBooks ?? []), ...(newBooksAdded ?? [])];

  // const { error } = await supabase.from("list_books").insert(
  //   allBooks?.map((book) => {
  //     console.log({ book_id: book.id, book_list_id: listResult.id });
  //     return {
  //       book_id: book.id,
  //       book_list_id: listResult.id,
  //       added_by: user.id,
  //     };
  //   })
  // );

  if (error) {
    console.log(error.message);
    return error;
  }
};
