// dashboard/page.tsx
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { PrismaClient, Company } from '@prisma/client'
import { SendHorizonal, Copy, CircleUserRound, Briefcase, Calendar } from "lucide-react";
import Image from 'next/image';
import Link from 'next/link';

// Import the new function from lib/users.ts
import { getUserProfile } from '@/lib/users';

const prisma = new PrismaClient()

// Define the type for the company prop
interface CompanyItemProps {
  company: Company | null;
}

const CompanyItem = ({ company }: CompanyItemProps) => {
  if (!company) {
    return null;
  }

  // Format the creation date to be more readable
  const formattedDate = new Date(company.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex items-start gap-4 mb-4">
        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
          <Briefcase className="w-6 h-6 text-green-600" />
        </div>
        <div className="flex-grow">
          <h3 className="font-bold text-xl leading-tight text-gray-900">{company.name}</h3>
          {company.tagline && (
            <p className="text-sm text-gray-500 mt-1">{company.tagline}</p>
          )}
        </div>
      </div>

      {company.description && (
        <p className="text-sm text-gray-600 mb-4 line-clamp-3">{company.description}</p>
      )}

      <div className="space-y-2 text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-gray-400" />
          <span>Registered: {formattedDate}</span>
        </div>
        {company.website && (
          <div className="flex items-center gap-2">
            <Link href={company.website} target="_blank" className="text-blue-500 hover:underline">
              Visit Website
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

// Fetch user data from Neon database
const getUserData = async (clerkUserId: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        clerkUserId: clerkUserId
      },
      select: {
        firstName: true,
        lastName: true,
        imageUrl: true
      }
    });

    return user;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
};

// The main application component.
const App = async () => {
  const clerkUser = await currentUser()

  if (!clerkUser) {
    redirect('/sign-in')
  }

  const dbUser = await getUserData(clerkUser.id);

  // Fetch user profile and associated company
  const { user: userProfile } = await getUserProfile(clerkUser.id);
  const featuredCompany = userProfile?.company || null;

  // Generate display name (fallback to Clerk data if DB data not available)
  const displayName = dbUser
    ? `${dbUser.firstName || ''} ${dbUser.lastName || ''}`.trim()
    : clerkUser.firstName || clerkUser.username || 'User';

  // Use profile image from DB or fallback to Clerk
  const profileImage = dbUser?.imageUrl || clerkUser.imageUrl || '/assets/TahirProfileImage.png';

  return (
    <section className="py-6 sm:py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Welcome Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Image
              src={profileImage}
              alt="Profile Image"
              width={42}
              height={42}
              className="rounded-full"
            />
            <h1 className="font-semibold text-2xl sm:text-3xl">
              Welcome, {displayName} 👋
            </h1>
          </div>
        </div>

        {/* Create Company Section - Modified */}
        <div className="relative w-full overflow-hidden rounded-2xl shadow-xl p-4 sm:p-8 md:p-10 flex flex-col justify-center min-h-[150px]
                    bg-gradient-to-br from-blue-100 via-purple-100 to-white
                    dark:from-gray-800 dark:via-gray-900 dark:to-black">
          {/* Blue, Purple Gradient Lights - for light theme */}
          <div className="absolute inset-0 z-0">
            <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
            <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
          </div>

          {/* Main Content Container */}
          <div className="relative z-10 max-w-xl">
            <h2 className="font-bold text-xl sm:text-2xl leading-tight mb-2 text-gray-90 dark:text-white">
              Your Ultimate Business Ledger
            </h2>
            <p className="text-sm sm:text-base font-light mb-4 text-gray-700 dark:text-gray-300">
              Control your finances with precision. Securely log expenses, track revenue, and monitor profit and loss for every company you own. Take the guesswork out of your business&apos;s success.
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="bg-white bg-opacity-70 text-xs font-medium px-3 py-1 rounded-full border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200">
                Financial Planning
              </span>
              <span className="bg-white bg-opacity-70 text-xs font-medium px-3 py-1 rounded-full border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200">
                Business Tracking
              </span>
              <span className="bg-white bg-opacity-70 text-xs font-medium px-3 py-1 rounded-full border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200">
                Real-time Updates
              </span>
            </div>
            <Link href="/companies/create">
              <Button className="bg-fuchsia-500 hover:bg-fuchsia-600 transition-colors font-medium py-2 px-5 rounded-full shadow-lg text-sm">
                Create Company
              </Button>
            </Link>
          </div>
        </div>

        {/* New Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Invite Clients */}
          <div className="p-6 rounded-2xl border bg-card text-card-foreground shadow-sm bg-muted/30 border-dashed border-border/50">
            <h3 className="font-semibold text-lg sm:text-xl leading-tight mb-2">
              Earn when you invite your client
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="font-semibold text-primary">1.</span>
                <span>Invite clients to Contra via email, projects, and invoices.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-semibold text-primary">2.</span>
                <span>Your client completes a $500+ project with any freelancer.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-semibold text-primary">3.</span>
                <span>You get rewarded. Every single time! <Link href="#" className="underline text-primary">Learn more</Link></span>
              </li>
            </ul>
            <div className="mt-6 flex flex-col sm:flex-row items-center gap-2">
              <div className="relative flex-grow w-full">
                <CircleUserRound className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <Input
                  type="email"
                  placeholder="client email address"
                  className="pl-10 h-10 w-full rounded-full border-muted-foreground/20 focus:border-primary/50"
                />
              </div>
              <div className="flex gap-2 w-full sm:w-auto mt-2 sm:mt-0">
                <Button className="h-10 px-4 rounded-full bg-blue-600 hover:bg-blue-700 transition-colors font-medium w-full sm:w-auto">
                  <SendHorizonal className="mr-2 h-4 w-4" /> Invite new client
                </Button>
                <Button variant="outline" size="icon" className="h-10 w-10 shrink-0 rounded-full border-muted-foreground/20 hover:bg-muted">
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Card 2: Action Items */}
          <div className="p-6 rounded-2xl border bg-card text-card-foreground shadow-sm bg-muted/30 border-dashed border-border/50">
            <h3 className="font-semibold text-xl leading-tight mb-2">
              Your action items
            </h3>
            <div className="flex justify-center items-center h-48 text-muted-foreground/70">
              <p>No action items at the moment.</p>
            </div>
          </div>
        </div>

        {/* Featured Companies Section */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-semibold mb-6">
            Featured Companies
          </h2>
          {featuredCompany ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              <CompanyItem company={featuredCompany} />
            </div>
          ) : (
            <div className="flex justify-center items-center h-48 text-muted-foreground/70 rounded-2xl border border-dashed">
              <p className="text-center">No company found. <Link href="/companies/create" className="text-fuchsia-500 hover:underline">Create one</Link> to see it here.</p>
            </div>
          )}
        </div>

        {/* View All Link */}
        <div className="mt-8">
          <Link
            href="/companies"
            className="inline-flex items-center gap-2 transition-colors hover:text-fuchsia-500 text-lg font-medium"
          >
            View all companies
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default App;