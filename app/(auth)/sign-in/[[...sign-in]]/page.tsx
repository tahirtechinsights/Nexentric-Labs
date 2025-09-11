"use client";

import { SignIn } from "@clerk/nextjs";
import Image from "next/image";
import { GlobalStyles } from "@/components/GlobalStyles";

// Custom component for the glow effect on the right side
const StellarGlowEffect = () => (
  <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500 rounded-full mix-blend-screen filter blur-3xl opacity-70 animate-blob"></div>
    <div className="absolute top-1/2 left-[calc(50%+200px)] -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500 rounded-full mix-blend-screen filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
    <div className="absolute top-1/2 left-[calc(50%-200px)] -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-transparent"></div>
  </div>
);

// Main Page component
export default function Page() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white font-sans antialiased text-gray-200">
      {/* Global styles for the blob animation */}
      <GlobalStyles />
      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
          overflow-x: hidden;
        }
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
      `}</style>

      {/* Left Section: Clerk SignIn Panel */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 relative bg-white overflow-hidden">
        {/* Subtle gradient light background for the white panel */}
        <div className="absolute inset-0 z-0 opacity-50 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
          <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
        </div>

        {/* SignIn component from Clerk */}
        <div className="relative z-10 w-full max-w-sm mx-auto mt-20 md:mt-0">
          <SignIn path="/sign-in" />
        </div>
      </div>

      {/* Right Section: Stellar Theme with CTA */}
      <div className="hidden md:flex flex-1 flex-col items-center justify-center relative bg-grey-20 text-gray-800 p-8 overflow-hidden shadow-md">
        <StellarGlowEffect />
        <div className="relative z-10 text-center flex flex-col items-center">
          {/* Logo at the top */}
          <div className="mx-auto mb-6">
            <Image
              src="/assets/Nexentric_Logo.png"
              alt="Nexentric Logo"
              width={80}
              height={40}
              className="h-auto"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-4">
            Clerk Modern Authentication
          </h1>
          <p className="text-lg md:text-xl text-gray-500 max-w-sm mx-auto mb-8">
            Securing a Next.js application, especially for a SaaS product,
            requires a multi-layered approach that goes beyond just a simple
            login form. It involves protecting routes, managing user sessions,
            and controlling access to components and data based on a user&apos;s
            role.
          </p>
        </div>
      </div>
    </div>
  );
}
