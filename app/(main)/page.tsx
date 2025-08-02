import HeroSection from '@/components/HeroSection';
import type { Metadata } from 'next';
import { getUser } from '../(auth)/actions';

export const metadata: Metadata = {
  title: "OurReadingList - Home",
  description: "Discover, curate, and share your reading journey with OurReadingList.",
};

export default async function Home() {
  const user = await getUser();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {!user && <HeroSection />}
      <h1>Welcome to Our Reading Lists!</h1>
    </main>
  );
}