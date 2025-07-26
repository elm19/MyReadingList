import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Profile - MyReadingList",
  description: "Manage your user profile and settings on MyReadingList.",
};

export default function ProfilePage() {
  return (
    <div>
      <h1>Profile Page</h1>
      <p>This is the profile page.</p>
    </div>
  );
}
