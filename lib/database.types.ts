export interface DbBook {
  id: string;
  name: string;
  author: string;
  is_complete: boolean;
  description?: string;
}

export interface DbProfile {
  id: string;
  username: string;
}

export interface DbListItem {
  id: string;
  book_id: string;
  book_list_id: string;
  added_by: string;
  description?: string;
  books?: DbBook;
  profiles?: DbProfile;
}

export interface DbBookList {
  id: string;
  name: string;
  description?: string;
  creator_id: string;
  updated_at: string;
  is_private: boolean;
  follower_count: number;
  item_count: number;
  list_items?: DbListItem[];
}

export type InsertBookList = Omit<DbBookList, 'id' | 'updated_at' | 'follower_count' | 'item_count'>
