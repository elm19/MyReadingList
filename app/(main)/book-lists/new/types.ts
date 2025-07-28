import { Novel } from '@/lib/types';

export interface BookListMetadata {
  name: string;
  description: string;
  isPrivate: boolean;
}

export interface NewBookDetails {
  name: string;
  author: string;
  description: string;
}
