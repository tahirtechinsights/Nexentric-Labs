"use client";

import {
  UserButton,
  SignedIn,
} from "@clerk/nextjs";
import Link from "next/link";

// Navigation component that combines the new design with Clerk authentication
export default function Navigation() {
  return (
    <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-sm p-4 md:px-8 border-b border-gray-800">
      <div className="container mx-auto flex items-center justify-between">
       
        {/* API Security Framework logo and title */}
        <Link
          href="/"
          className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-600"
        >
          NEXENTRIC LAB
        </Link>
        
       
          {/* User button for signed-in users */}
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
    </header>
  );
}
