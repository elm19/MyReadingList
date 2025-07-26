import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Privacy Policy - MyReadingList",
  description: "Understand how MyReadingList collects, uses, and protects your data.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="prose dark:prose-invert">
      <h1>Privacy Policy</h1>
      <p>
        Your privacy is important to us. This Privacy Policy explains how MyReadingList collects, uses, and protects your information.
      </p>
      <h2>1. Information We Collect</h2>
      <p>
        We collect information you provide directly to us, such as when you create an account, create a reading list, or contact us.
        This may include your name, email address, and any content you submit to the service.
      </p>
      <h2>2. How We Use Your Information</h2>
      <p>
        We use the information we collect to provide, maintain, and improve our services, to communicate with you, and to personalize your experience.
      </p>
      <h2>3. Data Sharing</h2>
      <p>
        We do not share your personal information with third parties except as described in this policy or with your consent.
      </p>
    </div>
  );
}