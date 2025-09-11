"use client";

import { SignUp } from "@clerk/nextjs";
import Image from "next/image";
import { GlobalStyles } from "@/components/GlobalStyles";
import { CheckCircle2 } from "lucide-react";

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

      {/* Left Section: Clerk SignUp Panel */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 relative bg-white overflow-hidden">
        {/* Subtle gradient light background for the white panel */}
        <div className="absolute inset-0 z-0 opacity-50 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
          <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
        </div>

        {/* SignUp component from Clerk */}
        <div className="relative z-10 w-full max-w-sm mx-auto mt-20 md:mt-0">
          <SignUp path="/sign-up" />
        </div>
      </div>

      {/* Right Section: Unique, Professional Look */}
      <div className="hidden md:flex flex-1 flex-col items-center justify-center relative bg-gray-100 text-black p-8 overflow-hidden">
        <StellarGlowEffect />
        <div className="relative z-10 w-full max-w-md">
          {/* Logo at the top right */}
          <div className="absolute top-4 right-4">
            <Image
              src="/assets/Nexentric_Logo.png"
              alt="Nexentric Logo"
              width={60}
              height={30}
              className="h-auto"
            />
          </div>

          <div className="pt-20 pb-12">
            <h1 className="text-4xl font-extrabold tracking-tight mb-2 text-black">
              Next-Gen Authentication
            </h1>
            <p className="text-lg text-slate-700 max-w-sm">
              Experience seamless, bulletproof security powered by{" "}
              <span className="font-semibold text-black">Clerk</span> and{" "}
              <span className="font-semibold text-black">Next.js</span>.
            </p>
          </div>

          {/* Key Features List */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-600">
              Key Features:
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                <p className="text-slate-700">
                  Effortless sign-in with social logins like Google, GitHub, and more.
                </p>
              </li>
              <li className="flex items-center space-x-3">
                <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                <p className="text-slate-700">
                  Highly customizable UI to match your brand&apos;s unique identity.
                </p>
              </li>
              <li className="flex items-center space-x-3">
                <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                <p className="text-slate-700">
                  Robust session and cookie management for state-of-the-art security.
                </p>
              </li>
              <li className="flex items-center space-x-3">
                <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                <p className="text-slate-700">
                  Seamless user data handling with clerk scalable Neon DB integration.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}