import { getUser } from "@/app/(auth)/actions";
import { createClient } from "./server";
import { List } from "@/lib/types";

const perPage = 10;

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

export default async function getBookLists(
  page: number = 1,
  sort: number = 0,
  search: string = ""
) {
  // Number of items per page
  const from = (page - 1) * perPage; // Calculate the offset for
  const to = from + perPage - 1;
  const sortBy = sort === 1 ? "follower_count" : "updated_at";

  const supabase = await createClient();
  let query = supabase
    .from("book_lists")
    .select(
      "id, name, updated_at, follower_count, item_count, last_item(profiles(username))",
      { count: "exact" }
    )
    .eq("is_private", false);

  if (search && search.length >= 7) {
    query = query.or(`name.ilike.%${search}%`);
  }

  query = query.order(sortBy, { ascending: false }).range(from, to);

  const { data: bookLists, error, count } = await query;
  console.log(bookLists);
  if (error) {
    throw new Error(error.message);
  }

  const typedBookLists: BookList[] = bookLists as unknown as BookList[];
  return { bookLists: typedBookLists, count: count };
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
  const { error, data } = await supabase
    .from("list_followers")
    .select("user_id")
    .match({ user_id: user.id, list_id: id })
    .single();
  if (error || !data) {
    return { isFollowing: false };
  }
  return { isFollowing: true };
};

export async function getBooks(
  page: number = 1,
  sort: number = 0,
  search: string = ""
) {
  // Number of items per page
  const from = (page - 1) * perPage; // Calculate the offset for
  const to = from + perPage - 1;
  const sortBy = sort === 1 ? "list_count" : "added_at";

  const supabase = await createClient();
  let query = supabase
    .from("books")
    .select(
      "id, name, author, description, is_complete, added_at, list_count, source_id",
      { count: "exact" }
    );

  if (search && search.length >= 7) {
    query = query.or(`name.ilike.%${search}%`);
  }

  query = query.order(sortBy, { ascending: false }).range(from, to);
  const { data: books, error, count } = await query;
  console.log(books);
  if (error) {
    throw new Error(error.message);
  }
  return { books: books, count: count };
}

export async function getBookData(id: string) {
  const { supabase } = await getUser();

  const { data, error } = await supabase
    .from("books")
    .select(
      `name, description,author, rating, source_id, book_tags(tag_id), list_items(added_at,profiles(username), book_lists:book_list_id(name, item_count))`
    )
    .eq("id", id)
    .single();
  if (error) {
    console.error("Error fetching book data:", error.message);
    throw new Error("Failed to fetch book data");
  }
  console.log(error);

  return data  as unknown as {
    name: string
    description: string;
    author: string;
    rating: number;
    source_id: string;
    book_tags: { tag_id: string }[];
    list_items: {
      added_at: string;
      profiles: { username: string };
      book_lists: { name: string; item_count: number };
    }[];
  };
}
