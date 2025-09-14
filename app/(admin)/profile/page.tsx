// app/profile/page.tsx
import { getUserProfile } from '@/lib/users';
import ProfileCard from '@/components/profile-card';
import { currentUser } from '@clerk/nextjs/server';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProfileBasicInfo from '@/components/profile-basic-info';
import ProfileBio from '@/components/profile-bio';
import ProfileCompany from '@/components/profile-company';
import ProfileSocial from '@/components/profile-social';
import { Suspense } from 'react';
import ProfileLoading from '@/components/profile-loading';

// Separate component for the main content that can be streamed
async function ProfileContent() {
  const user = await currentUser();
  
  if (!user || !user.id) {
    return <div>Please log in to view your profile.</div>;
  }
  
  const { user: dbUser, error } = await getUserProfile(user.id); 

  if (error || !dbUser) {
    return <div>Error loading profile.</div>;
  }

  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-8 bg-muted p-1 rounded-lg">
        <TabsTrigger 
          value="overview" 
          className="data-[state=active]:bg-background data-[state=active]:text-foreground rounded-md"
        >
          Overview
        </TabsTrigger>
        <TabsTrigger 
          value="basic" 
          className="data-[state=active]:bg-background data-[state=active]:text-foreground rounded-md"
        >
          Basic Info
        </TabsTrigger>
        <TabsTrigger 
          value="company" 
          className="data-[state=active]:bg-background data-[state=active]:text-foreground rounded-md"
        >
          Company
        </TabsTrigger>
        <TabsTrigger 
          value="social" 
          className="data-[state=active]:bg-background data-[state=active]:text-foreground rounded-md"
        >
          Social Links
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="overview" className="space-y-6">
        <ProfileCard initialUser={dbUser} />
      </TabsContent>
      
      <TabsContent value="basic">
        <Card className="bg-card">
          <CardContent className="pt-6">
            <ProfileBasicInfo initialUser={dbUser} />
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="bio">
        <Card className="bg-card">
          <CardContent className="pt-6">
            <ProfileBio initialUser={dbUser} />
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="company">
        <Card className="bg-card">
          <CardContent className="pt-6">
            <ProfileCompany initialUser={dbUser} />
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="social">
        <Card className="bg-card">
          <CardContent className="pt-6">
            <ProfileSocial initialUser={dbUser} />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}

export default async function ProfilePage() {
  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-foreground mb-6">My Profile</h1>
        
        <Suspense fallback={<ProfileLoading />}>
          <ProfileContent />
        </Suspense>
      </div>
    </div>
  );
}