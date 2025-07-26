import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "About Us - MyReadingList",
  description: "Learn more about MyReadingList and our mission.",
};

export default function AboutPage() {
  return (
    <div className="prose dark:prose-invert">
      <h1>About Us</h1>
      <p>
        Welcome to MyReadingList! We are passionate about books and believe in the power of shared reading experiences.
        Our platform is designed to help you discover, curate, and share your favorite reading lists with a vibrant community of book lovers.
      </p>
      <p>
        Whether you&apos;re looking for your next great read, want to organize your personal library, or connect with others who share your literary tastes,
        MyReadingList is the perfect place for you. Join us and embark on a new chapter in your reading journey!
      </p>
    </div>
  );
}