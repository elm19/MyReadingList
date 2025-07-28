import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata(
  { params }: PageProps,
): Promise<Metadata> {
  const { id } = await params;

  const listName = id.replace(/-/g, ' ').split(' ').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  return {
    title: `${listName} - Book List | OurReadingList`,
    description: `Details of the book list: ${listName}.`,
  };
}

export default async function  BookListPage({ params }: PageProps) {
  const { id } = await params;
  return (
    <div>
      <h1>Book List: {id}</h1>
      <p>This is the page for book list with ID: {id}</p>
    </div>
  );
}
