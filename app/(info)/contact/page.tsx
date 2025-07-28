import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Contact Us - OurReadingList",
  description: "Get in touch with OurReadingList support and team.",
};

export default function ContactPage() {
  return (
    <div className="prose dark:prose-invert">
      <h1>Contact Us</h1>
      <p>
        We&apos;d love to hear from you! Whether you have a question, feedback, or just want to say hello,
        feel free to reach out to us using the information below.
      </p>
      <p>
        <strong>Email:</strong> support@ourreadinglist.com
      </p>
      <p>
        <strong>Address:</strong> 123 Bookworm Lane, Literary City, LC 12345
      </p>
      <p>
        We aim to respond to all inquiries within 24-48 hours.
      </p>
    </div>
  );
}