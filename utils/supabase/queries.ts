import { getUser } from "@/app/(auth)/actions";
import { createClient } from "./server";
import { List } from "@/lib/types";

export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
}

interface ProfileData {
  username: string;
}

interface LastItemData {
  profiles: ProfileData; // profiles is now an OBJECT, not an array
}

interface BookList {
  id: string;
  name: string;
  updated_at: string;
  follower_count: number;
  item_count: number;
  last_item: LastItemData; // last_item is now an OBJECT, not an array
}

export default async function getBookLists(page: number = 1) {
  const perPage = 2; // Number of items per page
  const from = (page - 1) * perPage; // Calculate the offset for
  const to = from + perPage - 1;

  const supabase = await createClient();

  const { data: bookLists, error , count} = await supabase
    .from("book_lists")
    .select(
      "id, name, updated_at, follower_count, item_count, last_item(profiles(username))",
      { count: "exact" }
    )
    .eq("is_private", false)
    .order("updated_at", { ascending: false })
    .range(from, to);

  console.log(error);
  if (error) {
    throw new Error(error.message);
  }
  // for some reason typescript was complaining about the type of bookLists
  // so we need to cast it to BookList[]
  const typedBookLists: BookList[] = bookLists as unknown as BookList[];
  return {bookLists:typedBookLists, count:count};;
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
  const newBooks = novelsWithIds
    .filter((book) => !existingIds.has(book.id))
    .map((book) => ({
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
      novelsWithIds?.map((book) => ({
        book_id: book.id,
        book_list_id: listResult.id,
        added_by: user.id,
        description: book.description,
      }))
    );
    if (error) {
      console.log(error.message);
      return error;
    }
  } else {
    console.log("");
    const { error } = await supabase.from("list_books").insert(
      novelsWithIds?.map(({ id, description }) => ({
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
    .select(
      `
      *,
      list_items!list_books_book_list_id_fkey(*, books(id, name, author, is_complete), profiles(username))
      
    `
    )
    .eq("id", id)
    .single();
  console.log(error);

  return data;
};

export const isItTracked = async (id: string) => {
  const { user, supabase } = await getUser();
  if (!user) {
    // console.log("no user")
    return { error: "you need to log in" };
  }
  const { error } = await supabase
    .from("list_followers")
    .select("user_id") // or "*", or just a lightweight field
    .match({ user_id: user.id, list_id: id })
    .single();
  if (error) {
    console.log(error);

    return { isFollowing: false };
  }
  return { isFollowing: true };
};
