import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata(
  { params }: PageProps,
): Promise<Metadata> {
  const {id } = await params;
  const bookName = id.replace(/-/g, ' ').split(' ').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  return {
    title: `${bookName} - Book Details | OurReadingList`,
    description: `Details about the book: ${bookName}.`,
  };
}

export default async function BookDetailsPage({ params }: PageProps) {
  const {id } = await params;

  return (
    <div>
      <h1>Book Details: {id}</h1>
      <p>This is the page for book with ID: {id}</p>
    </div>
  );
}
