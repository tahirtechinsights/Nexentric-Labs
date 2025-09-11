// app/profile/page.tsx

import { getUserProfile } from '@/lib/users';
import ProfileCard from '@/components/profile-card';
import { currentUser } from '@clerk/nextjs/server'; // Assuming you're using Clerk for authentication

export default async function ProfilePage() {
  const user = await currentUser();

  if (!user || !user.id) {
    return <div>Please log in to view your profile.</div>;
  }
  
  const { user: dbUser, error } = await getUserProfile(user.id); 

  if (error || !dbUser) {
    return <div>Error loading profile.</div>;
  }

  // Use dynamic color classes from tailwind.config.js
  return (
    <div className="min-h-screen bg-[rgb(var(--background-start-rgb))] text-[rgb(var(--text-rgb))] p-8">
      <ProfileCard initialUser={dbUser} />
    </div>
  );
}