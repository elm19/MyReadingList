export interface Book {
  id: string;
  name: string;
  updated_at?: string;
}



export interface Novel {
  id:string
  name: string;
  author: string;
  description: string;
  is_complete?: boolean;
}

export interface List {
  id?: string;
  name: string;
  description?:string;
  isPrivate?: boolean
  updated_at?: string;
  books: Novel[]
}