import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Profile - OurReadingList",
  description: "Manage your user profile and settings on OurReadingList.",
};

export default function ProfilePage() {
  return (
    <div>
      <h1>Profile Page</h1>
      <p>This is the profile page.</p>
    </div>
  );
}
