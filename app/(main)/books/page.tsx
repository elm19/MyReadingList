import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Books - MyReadingList",
  description: "Discover and explore a wide range of books on MyReadingList.",
};

export default function BooksPage() {
  return (
    <div>
      <h1>Books</h1>
      <p>This is the books page.</p>
    </div>
  );
}
