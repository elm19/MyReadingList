import { Contact } from '@/components/Contact';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Contact Us - OurReadingList",
  description: "Get in touch with OurReadingList support and team.",
};

export default function ContactPage() {
  return (
    <Contact/>
  );
}