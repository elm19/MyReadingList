import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Book Lists - MyReadingList",
  description: "Explore and manage your curated book lists on MyReadingList.",
};

export default function BookListsPage() {
  return (
    <div>
      <h1>Book Lists</h1>
      <p>This is the book lists page.</p>
    </div>
  );
}
