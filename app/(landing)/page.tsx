"use client";

import {
  Shield,
  Globe,
  Lock,
  Code,
  Bot,
  Users,
  Search,
  Bell,
  PieChart,
  Star,
  LucideIcon,
  Mail,
  Github,
  Linkedin,
  ExternalLink,
} from "lucide-react";
import Image from "next/image";
import {
  SignedIn,
  SignedOut,
  useUser,
} from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Custom component for the glow effect
const GlowEffect = () => (
  <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
    <div className="absolute top-1/2 left-[calc(50%+200px)] -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
    <div className="absolute top-1/2 left-[calc(50%-200px)] -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-fuchsia-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
  </div>
);

// Hero Section component
const Hero = () => {
  const router = useRouter();
  const { user, isLoaded } = useUser();
  const [displayName, setDisplayName] = useState("");

  useEffect(() => {
    if (user) {
      // Try to get the full name, fallback to first name, then username
      const fullName = [user.firstName, user.lastName].filter(Boolean).join(" ");
      setDisplayName(fullName || user.firstName || user.username || "User");
    }
  }, [user]);

  const handleAdminPanelClick = () => {
    router.push("/dashboard");
  };

  const handleSignInClick = () => {
    router.push("/sign-in");
  };

  return (
    <section className="relative overflow-hidden bg-slate-950 text-white py-16 md:py-32 text-center">
      <GlowEffect />
      <div className="relative z-10 container mx-auto px-4">
        <SignedIn>
          {isLoaded ? (
            <>
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight mb-4">
                Welcome, {displayName}!
              </h1>
              <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8">
                Now you can access Admin Panel build in Modern Tech
                Frameworks: React, Next.js
                Language: TypeScript, 
                Styling: Tailwind CSS with Shadcn/UI components, 
                Authentication: Clerk-based User Management.
              </p>

              <button
                onClick={handleAdminPanelClick}
                className="py-3 px-8 rounded-full text-lg font-semibold bg-gradient-to-r from-green-600 to-indigo-600 hover:from-green-500 hover:to-green-500 transition-all text-white shadow-lg"
              >
                Access Admin Panel
              </button>
            </>
          ) : (
            <div className="h-40 flex items-center justify-center">
              <div className="animate-pulse text-gray-400">Loading...</div>
            </div>
          )}
        </SignedIn>

        <SignedOut>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight mb-4">
            I&apos;ll build your SaaS fast with Modern Tech Stack
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            I&apos;m personally providing Next.js SaaS Quick Custom Development Services, 
            providing a closely pre-built, well-researched, and scalable foundation.
          </p>
        
          <button
            onClick={handleSignInClick}
            className="py-3 px-8 rounded-full text-lg font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 transition-all text-white shadow-lg"
          >
            Sign In Securely with Clerk
          </button>
        </SignedOut>
      </div>
    </section>
  );
};

// Tech Logos component with sliding effect
const TechLogos = () => {
  const logos = [
    {
      src: "/assets/tech_logos/Nexentric_Landing_Page_NextJs_Logo.png",
      alt: "Next.js Logo",
      width: 100,
      height: 40,
    },
    {
      src: "/assets/tech_logos/Nexentric_Landing_Page_Clerk_Logo.png",
      alt: "Clerk Logo",
      width: 80,
      height: 40,
    },
    {
      src: "/assets/tech_logos/Nexentric_Landing_Page_Prisma_Logo.png",
      alt: "Prisma Logo",
      width: 100,
      height: 40,
    },
    {
      src: "/assets/tech_logos/Nexentric_Landing_Page_NeonDB_Logo.png",
      alt: "Neon Logo",
      width: 80,
      height: 40,
    },
    {
      src: "/assets/tech_logos/Nexentric_Landing_Page_Vercel_Logo.png",
      alt: "Vercel Logo",
      width: 100,
      height: 40,
    },
    {
      src: "/assets/tech_logos/Nexentric_Landing_Page_Supabase_Logo.png",
      alt: "Supabase Logo",
      width: 100,
      height: 40,
    },
    {
      src: "/assets/tech_logos/Nexentric_Landing_Page_Stripe_Logo.png",
      alt: "Stripe Logo",
      width: 80,
      height: 40,
    },
    {
      src: "/assets/tech_logos/Nexentric_Landing_Page_Upstash_Logo.png",
      alt: "Upstash Logo",
      width: 100,
      height: 40,
    },
    {
      src: "/assets/tech_logos/Nexentric_Landing_Page_Shadcn-ui-Light_Logo.png",
      alt: "Shadcn-UI Logo",
      width: 100,
      height: 40,
    },
  ];

  // Duplicate the logos to ensure a seamless loop
  const duplicatedLogos = [...logos, ...logos];

  return (
    <section className="bg-slate-950 text-white py-6 border-b border-gray-800 overflow-hidden">
      <div className="container mx-auto px-6 text-center">
        <p className="text-sm md:text-base text-gray-400 mb-8">
          Built on a modern, robust tech stack
        </p>
      </div>
      <div className="relative w-full flex overflow-hidden group">
        <div className="flex w-[100%] animate-scroll-logos group-hover:pause">
          {duplicatedLogos.map((logo, index) => (
            <div key={index} className="flex-shrink-0 mx-6 md:mx-12">
              <Image
                width={logo.width}
                height={logo.height}
                src={logo.src}
                alt={logo.alt}
                className="h-4 md:h-6 object-contain transition-transform transform hover:scale-110"
              />
            </div>
          ))}
        </div>
      </div>
      <style jsx global>{`
        @keyframes scroll-logos {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        .animate-scroll-logos {
          animation: scroll-logos 40s linear infinite;
        }
        .group:hover .animate-scroll-logos {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

const AboutCreator = () => (
  <section
    id="about"
    className="bg-slate-950 text-white py-20 px-4 md:px-8 border-b border-gray-800"
  >
    <div className="container mx-auto max-w-4xl">
      <div className="flex flex-col items-center text-center mb-12">
        {/* Profile Image Container */}
        <div className="relative mb-8">
          <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-purple-500/30 shadow-lg">
            {/* Replace with your actual profile image path */}
            <Image
              src="/assets/TahirProfileImage.png" // Update this path to your actual profile image
              alt="Muhammad Tahir A"
              fill
              className="object-cover"
              priority
            />
          </div>
          {/* Decorative elements */}
          <div className="absolute -top-2 -left-2 w-8 h-8 rounded-full bg-purple-500 opacity-70 animate-pulse"></div>
          <div className="absolute -bottom-2 -right-2 w-6 h-6 rounded-full bg-indigo-500 opacity-70 animate-pulse delay-1000"></div>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
          About The Creator
        </h2>
      </div>

      <div className="grid md:grid-cols-5 gap-8 items-start">
        {/* Left spacer */}
        <div className="hidden md:block md:col-span-1"></div>

        {/* Main content */}
        <div className="md:col-span-3">
          <div className="prose prose-lg prose-invert max-w-none">
            <p className="text-xl font-light text-gray-300 mb-6 leading-relaxed">
              <span className="text-purple-400 font-medium">
                Hi, I&apos;m Muhammad Tahir A
              </span>{" "}
              — a Data Technology Professional and Modern Tech Full-Stack
              Developer.
            </p>

            <p className="text-gray-300 mb-6 leading-relaxed">
              Over the past{" "}
              <span className="text-purple-400 font-medium">8 years</span>, I&apos;ve
              had the opportunity to work with well-known companies and clients
              around the globe. Throughout my career, I&apos;ve honed my skills in
              research, planning, requirement analysis, prioritization, and
              delivering high-quality products — not always perfect, but always
              close to expectations.
            </p>

            <p className="text-gray-300 mb-6 leading-relaxed">
              This full-stack application is built using a modern tech stack and
              reflects my recent hands-on experience in full-stack development.
              I continuously explore, practice, build, and optimize as part of
              my development cycle.
            </p>

            <div className="bg-slate-900/50 p-6 rounded-xl border border-gray-800 my-8">
              <h3 className="text-lg font-semibold text-purple-400 mb-3 flex items-center">
                <Star className="mr-2" size={20} />
                Inspiration
              </h3>
              <p className="text-gray-300">
                With the rapid rise of AI and innovative tech ideas, there&apos;s a
                growing demand for launching MVPs (Minimum Viable Products)
                quickly. That&apos;s why I aimed to create a launch-ready platform
                with secure and reliable authentication, a professional
                SaaS-style UI, integrated payment systems, and a well-structured
                application foundation to meet modern startup needs.
              </p>
            </div>
          </div>

          {/* Social links */}
          <div className="flex justify-center space-x-4 mt-8">
            <a
              href="tahirtechinsights@gmail.com"
              className="p-3 rounded-full bg-slate-800 hover:bg-slate-700 transition-colors text-gray-300 hover:text-white"
            >
              <Mail size={20} />
            </a>
            <a
              href="https://github.com/tahirtechinsights/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-slate-800 hover:bg-slate-700 transition-colors text-gray-300 hover:text-white"
            >
              <Github size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/tahirtechinsights/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-slate-800 hover:bg-slate-700 transition-colors text-gray-300 hover:text-white"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="https://tahirtechinsight.tech"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-slate-800 hover:bg-slate-700 transition-colors text-gray-300 hover:text-white"
            >
              <ExternalLink size={20} />
            </a>
          </div>
        </div>

        {/* Right spacer */}
        <div className="hidden md:block md:col-span-1"></div>
      </div>
    </div>
  </section>
);

// Feature Item component with proper TypeScript types
interface FeatureItemProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const FeatureItem = ({ icon: Icon, title, description }: FeatureItemProps) => (
  <div className="flex items-start space-x-4 mb-6">
    <div className="p-3 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400">
      <Icon size={24} />
    </div>
    <div>
      <h4 className="text-xl font-semibold text-white mb-1">{title}</h4>
      <p className="text-gray-400 max-w-sm">{description}</p>
    </div>
  </div>
);

// Simplify Security Section
const CoreServices = () => (
  <section
    id="features"
    className="bg-slate-950 text-white py-20 px-4 md:px-8 border-b border-gray-800"
  >
    <div className="container mx-auto text-center">
      <h2 className="text-3xl md:text-5xl font-bold mb-4">
        Strategic Expertise & Secure Architecture
      </h2>
      <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-16">
        I don&apos;t just sell code; I sell expertise. I help companies choose
        the right authentication solution and ensure their entire application is
        built on a secure and scalable foundation.
      </p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 text-left">
        <FeatureItem
          icon={Shield}
          title="Authentication & Authorization"
          description="I use Auth.js to provide a simple, secure, and flexible solution with built-in support for dozens of providers."
        />
        <FeatureItem
          icon={Code}
          title="Data Persistence"
          description="Your application needs a place to store data. I use PostgreSQL paired with Prisma for type-safe data modeling and migrations."
        />
        <FeatureItem
          icon={Globe}
          title="API Layer"
          description="I create full-fledged API endpoints using Next.js Route Handlers and can implement tRPC for end-to-end type safety."
        />
        <FeatureItem
          icon={Lock}
          title="Deployment"
          description="I configure a seamless deployment pipeline on Vercel, which offers Git integration and incredible performance optimizations out of the box."
        />
        <FeatureItem
          icon={Bot}
          title="Payment Integration"
          description="I integrate with industry-standard providers like Stripe to handle subscriptions, one-time payments, and webhooks."
        />
        <FeatureItem
          icon={Search}
          title="Security"
          description="I implement crucial security measures including server-side input validation, rate limiting, and dependency scanning."
        />
      </div>
    </div>
  </section>
);

// Why Trust Us Section
const WhyTrustUs = () => (
  <section className="bg-slate-950 text-white py-20 px-4 md:px-8 border-b border-gray-800">
    <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center">
      <div>
        <h2 className="text-3xl md:text-5xl font-bold mb-4">
          Why My Foundation is the Right Choice
        </h2>
        <p className="text-lg text-gray-400">
          I provide a robust, maintainable, and production-ready foundation,
          allowing you to focus on your core business logic and deliver an
          excellent user experience.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[
          { icon: Shield, title: "API Authorization" },
          { icon: Users, title: "Team Users" },
          { icon: Search, title: "Powerful Search" },
          { icon: PieChart, title: "API Analytics" },
          { icon: Bell, title: "Notifications" },
          { icon: Star, title: "Integrations" },
        ].map((item, index) => (
          <div
            key={index}
            className="p-6 rounded-xl border border-gray-800 bg-slate-900/50 hover:bg-slate-800/50 transition-colors"
          >
            <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-purple-500/10 text-purple-400 mb-2">
              <item.icon size={20} />
            </div>
            <h4 className="text-xl font-semibold mb-1">{item.title}</h4>
            <p className="text-gray-400 text-sm">
              I&apos;ve built the foundation to achieve the right balance
              between user experience and security.
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// Final CTA Section
const FinalCTA = () => {
  const router = useRouter();
  
  const handleGetStartedClick = () => {
    router.push("/dashboard");
  };

  const handleUpworkClick = () => {
    window.open("https://www.upwork.com/freelancers/tahirtechinsights/", "Upwork");
  };

  const handleContraClick = () => {
    window.open("https://tahirtechinsights.contra.com/", "Contra");
  };

  return (
    <section className="bg-slate-950 text-white py-20 px-4 md:px-8 text-center border-b border-gray-800">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">
          Let&apos;s connect
        </h2>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">
          We can choose Contra or Upwork independent platforms for contract.
        </p>
        
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 mt-12">
          {/* Upwork Card */}
          <div 
            className="relative group bg-slate-900/50 p-8 rounded-2xl border border-gray-800 hover:border-purple-500/50 transition-all duration-300 cursor-pointer transform hover:-translate-y-1 w-full max-w-sm"
            onClick={handleUpworkClick}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
            <div className="relative z-10">
              <div className="mb-6 flex justify-center">
                <Image
                  src="/assets/upwork-logo.png" // Update with your Upwork logo path
                  alt="Upwork"
                  width={120}
                  height={40}
                  className="object-contain"
                />
              </div>
              <p className="text-gray-300 mb-6">
                Hire me on Upwork for secure contracting with built-in payment protection
              </p>
              <button className="py-2 px-6 rounded-full text-sm font-medium bg-[#14a800] hover:bg-[#108400] transition-all text-white">
                View Upwork Profile
              </button>
            </div>
          </div>

          {/* Contra Card */}
          <div 
            className="relative group bg-slate-900/50 p-8 rounded-2xl border border-gray-800 hover:border-purple-500/50 transition-all duration-300 cursor-pointer transform hover:-translate-y-1 w-full max-w-sm"
            onClick={handleContraClick}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
            <div className="relative z-10">
              <div className="mb-6 flex justify-center">
                <Image
                  src="/assets/Contra_Logo.png" // Update with your Contra logo path
                  alt="Contra"
                  width={120}
                  height={40}
                  className="object-contain"
                />
              </div>
              <p className="text-gray-300 mb-6">
                Work with me on Contra for commission-free independent collaborations
              </p>
              <button className="py-2 px-6 rounded-full text-sm font-medium bg-black hover:bg-gray-900 transition-all text-white border border-gray-700">
                View Contra Profile
              </button>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <p className="text-gray-400 mb-6">Or get started directly with this platform</p>
          <button
            onClick={handleGetStartedClick}
            className="py-3 px-8 rounded-full text-lg font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 transition-all text-white shadow-lg"
          >
            Nexentric Lab
          </button>
        </div>
      </div>
    </section>
  );
};

// Main Page component
export default function LandingPage() {
  return (
    <div className="bg-slate-950 font-sans antialiased text-gray-200">
      {/* Global styles for the blob animation */}
      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
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
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
      <main>
        <Hero />
        <TechLogos />
        <AboutCreator />
        <CoreServices />
        <WhyTrustUs />
        <FinalCTA />
      </main>
    </div>
  );
}