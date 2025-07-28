import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Terms of Service - OurReadingList",
  description: "Review the terms and conditions for using OurReadingList.",
};

export default function TermsOfServicePage() {
  return (
    <div className="prose dark:prose-invert">
      <h1>Terms of Service</h1>
      <p>
        These Terms of Service govern your use of OurReadingList. By accessing or using our service, you agree to be bound by these terms.
        Please read them carefully.
      </p>
      <h2>1. Acceptance of Terms</h2>
      <p>
        By using OurReadingList, you agree to comply with and be bound by these Terms of Service. If you do not agree to these terms, you may not use our service.
      </p>
      <h2>2. Changes to Terms</h2>
      <p>
        We reserve the right to modify or replace these Terms at any time. We will provide notice of any significant changes.
        Your continued use of the service after any such changes constitutes your acceptance of the new Terms of Service.
      </p>
      <h2>3. User Conduct</h2>
      <p>
        You agree not to use the service for any unlawful purpose or in any way that could harm OurReadingList or its users.
      </p>
    </div>
  );
}