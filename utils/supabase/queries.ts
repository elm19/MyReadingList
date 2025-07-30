import { getUser } from "@/app/(auth)/actions";
import { createClient } from "./server";
import { List } from "@/lib/types";

export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
}

export default async function getBookLists() {
  const supabase = await createClient();

  const { data: bookLists, error } = await supabase
    .from("book_lists")
    .select("*")
    // .eq("is_public", true);
  console.log(error)
  if (error) {
    throw new Error(error.message);
  }

  const listsWithBookCounts = await Promise.all(
    bookLists.map(async (list) => {
      const { count } = await supabase
        .from("list_books")
        .select("*", { count: "exact", head: true })
        .eq("book_list_id", list.id);

      return {
        ...list,
        book_count: count || 0,
      };
    })
  );

  return listsWithBookCounts;
}

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
    return { error: listError, list_id: slugify(list.name) };
  }

  const novelsWithIds = list.books.map((book) => ({
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
  const newBooks = novelsWithIds.filter((book) => !existingIds.has(book.id)).map((book) => ({
    ...book,
    description: "",
  }));
  if (newBooks.length > 0) {
    const { error: bookError } = await supabase
      .from("books")
      .insert(newBooks)
      .select();
    if (bookError) {
      console.log(bookError.message);
      // failled to add new books code: 410
      return {
        error: 410,
        message: `failed to add new books, ${bookError.message} `,
      };
    }
    // const allBooks = [...(novelsWithIds ?? []), ...(newBooksAdded ?? [])];
    const { error } = await supabase.from("list_items").insert(
      novelsWithIds?.map((book) => {
        console.log({ book_id: book.id, book_list_id: listResult.id });
        return {
          book_id: book.id,
          book_list_id: listResult.id,
          added_by: user.id,
          description: book.description,
        };
      })
    );
    if (error) {
      console.log(error.message);
      return error;
    }
  } else {
    console.log("")
    const { error } = await supabase.from("list_books").insert(
      novelsWithIds?.map(({id, description}) => ({
        book_id: id,
        book_list_id: listResult.id,
        added_by: user.id,
        description: description,
      }))
    );
    if (error) {
      console.log(error.message);
      return error;
    }
  }
  return {
    error: null,
    success: "new list has been saved to the database",
    list_id: listResult.id,
  };
};



export const getListData = async (id: string) => {
  const { supabase } = await getUser();

  const { data, error } = await supabase
    .from("book_lists")
    .select(`
      *,
      list_items(*, books(id, name, author, is_complete), profiles(username))
      
    `)
    .eq("id", id)
    .single()
    console.log(error)



  return data;  
};



export const isItTracked = async (id: string) => {
  const { user, supabase } = await getUser();
  if (!user) {
    // console.log("no user")
    return {error: "you need to log in"};
  }
  const {  error } = await supabase
    .from("list_followers")
    .select("user_id") // or "*", or just a lightweight field
    .match({ user_id: user.id, list_id: id })
    .single()
  if (error) {
    console.log(error)

    return { isFollowing: false };
  } 
  return { isFollowing: true };
};

