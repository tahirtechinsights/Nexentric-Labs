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
  X,
  Maximize2,
  ChevronLeft, ChevronRight, LayoutGrid
} from "lucide-react";
import Image from "next/image";
import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";

// Custom component for the glow effect
const GlowEffect = () => (
  <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
    <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
    <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-gradient-to-r from-green-400 to-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
    <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-gradient-to-r from-red-400 to-orange-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
  </div>
);

// Section Wrapper with alternating backgrounds
const SectionWrapper = ({
  children,
  isDark = false,
}: {
  children: React.ReactNode;
  isDark?: boolean;
}) => (
  <section
    className={`relative overflow-hidden ${
      isDark ? "bg-slate-950 text-white" : "bg-[#fafafa] text-slate-900"
    } transition-colors duration-500`}
  >
    <GlowEffect />
    <div className="relative z-10">{children}</div>
  </section>
);

// Hero Section component
const Hero = () => {
  const router = useRouter();
  const { user, isLoaded } = useUser();
  const [displayName, setDisplayName] = useState("");

  useEffect(() => {
    if (user) {
      const fullName = [user.firstName, user.lastName]
        .filter(Boolean)
        .join(" ");
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
    <SectionWrapper isDark={true}>
      <div className="py-24 md:py-32 text-center">
        <div className="container mx-auto px-6 max-w-4xl">
          <SignedIn>
            {isLoaded ? (
              <>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-6">
                  Welcome,{" "}
                  <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                    {displayName}
                  </span>
                  !
                </h1>
                <p className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto mb-8 leading-relaxed">
                  Now you can access Admin Panel built with Modern Tech Stack:
                  React, Next.js, TypeScript, Tailwind CSS with Shadcn/UI
                  components, and Clerk-based User Management.
                </p>
                <button
                  onClick={handleAdminPanelClick}
                  className="py-2.5 px-8 rounded-lg text-base font-semibold bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-400 hover:to-blue-400 transition-all text-white shadow-lg transform hover:scale-105 duration-200"
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
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-6">
              Build Your SaaS Fast with{" "}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Modern Tech Stack
              </span>
            </h1>
            <p className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto mb-8 leading-relaxed">
              Professional Next.js SaaS development services with pre-built,
              well-researched, and scalable foundations for rapid deployment.
            </p>

            <button
              onClick={handleSignInClick}
              className="py-2.5 px-8 rounded-lg text-base font-semibold bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 transition-all text-white shadow-lg transform hover:scale-105 duration-200"
            >
              Sign In Securely with Clerk
            </button>
          </SignedOut>
        </div>
      </div>
    </SectionWrapper>
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

  const duplicatedLogos = [...logos, ...logos];

  return (
    <SectionWrapper isDark={true}>
      {/* Modification 2: Reduced gap by changing 'py-8 border-b border-gray-800' to 'pt-8 pb-0' */}
      <div className="pt-8 pb-8"> 
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm text-gray-400 mb-6 tracking-wide">
            BUILT ON MODERN, ROBUST TECH STACK
          </p>
        </div>
        <div className="relative w-full flex overflow-hidden">
          <div className="flex animate-scroll-logos">
            {duplicatedLogos.map((logo, index) => (
              <div key={index} className="flex-shrink-0 mx-8 md:mx-12">
                <Image
                  width={logo.width}
                  height={logo.height}
                  src={logo.src}
                  alt={logo.alt}
                  className="h-5 md:h-6 object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

// App Pages Gallery Section
interface AppPage {
  id: number;
  title: string;
  subtitle: string;
  pageName: string;
  imageUrl: string;
  description?: string;
  // Add a field for multiple images if you want to support internal image switching
  galleryImages?: string[];
}

const appPages: AppPage[] = [
  {
    id: 1,
    title: "Dashboard",
    subtitle: "Welcome Back & Manage Your Business",
    pageName: "Dashboard",
    imageUrl: "/assets/app-pages/dashboard.png",
    description: "Your personalized hub to access Your Ultimate Business Ledger for financial tracking and to manage your next steps. The dashboard also features calls for developer collaboration and lists your action items.",
    galleryImages: ["/assets/app-pages/dashboard.png"], // Example: Two images
  },
  {
    id: 2,
    title: "User Profile",
    subtitle: "Your Professional Hub & Expertise",
    pageName: "Profile",
    imageUrl: "/assets/app-pages/user-profile.png",
    description: "View and manage your professional profile, including your bio, experience, contact information, and company details. Highlight your skills and connect with your network.",
    galleryImages: ["/assets/app-pages/user-profile.png"],
  },
  {
    id: 3,
    title: "Create New Company",
    subtitle: "Establish Your Presence in the Directory",
    pageName: "Create Company",
    imageUrl: "/assets/app-pages/create-company-form.png",
    description: "Onboard your company by filling out essential details like name, category, tagline, description, and contact information. This page facilitates the secure addition of your business to the community directory.",
    galleryImages: ["/assets/app-pages/create-company-form.png"],
  },
  {
    id: 4,
    title: "Sign in to Nexentric lab",
    subtitle: "Access Your Secure Next.js Account",
    pageName: "SignIn",
    imageUrl: "/assets/app-pages/sign-in.png",
    description: "The secure login page utilizes Clerk Modern Authentication for managing user sessions and access control in this Next.js/SaaS product, offering a seamless sign-in experience with email or Google.",
    galleryImages: ["/assets/app-pages/sign-in.png"],
  },
  {
    id: 5,
    title: "Discover Your Network",
    subtitle: "Connect with Professionals and Companies",
    pageName: "Discover",
    imageUrl: "/assets/app-pages/discover.png",
    description: "Explore the community directory to find and connect with Corporate and Independent professionals, as well as new Companies. Grow your professional circle and discover collaboration opportunities.",
    galleryImages: ["/assets/app-pages/discover.png"],
  },
  {
    id: 6,
    title: "Company Profile View",
    subtitle: "Innovative Real-Time Conglomeration",
    pageName: "Company Details",
    imageUrl: "/assets/app-pages/details.png",
    description: "A detailed view of a specific company. This page outlines their services offered, introduces their team members, and provides all necessary contact information for partnership or inquiry.",
    galleryImages: ["/assets/app-pages/details.png"],
  },
];

const AppPagesGallery = () => {
  const [selectedPage, setSelectedPage] = useState<AppPage | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState<{ [key: number]: boolean }>({});
  const [imageLoaded, setImageLoaded] = useState<{ [key: number]: boolean }>({});
  
  // Array of page IDs in gallery order
  const pageIds = appPages.map(page => page.id);

  // Helper to get all image URLs for the selected page
  const getPageImages = (page: AppPage) => page.galleryImages && page.galleryImages.length > 0
    ? page.galleryImages
    : [page.imageUrl]; // Fallback to main image

  const currentImages = selectedPage ? getPageImages(selectedPage) : [];
  const hasMultipleImages = currentImages.length > 1;

  // --- Image Navigation (Inside a Page) ---
  const nextImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % currentImages.length);
  }, [currentImages.length]);

  const prevImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev - 1 + currentImages.length) % currentImages.length);
  }, [currentImages.length]);

  // --- Gallery Object Navigation (Between Pages) ---
  const navigateGallery = useCallback((direction: 'prev' | 'next') => {
    if (!selectedPage) return;

    const currentIndex = pageIds.indexOf(selectedPage.id);
    let nextIndex;

    if (direction === 'next') {
      nextIndex = (currentIndex + 1) % pageIds.length;
    } else {
      nextIndex = (currentIndex - 1 + pageIds.length) % pageIds.length;
    }

    const nextPage = appPages.find(p => p.id === pageIds[nextIndex]);
    if (nextPage) {
      setSelectedPage(nextPage);
      setCurrentImageIndex(0); // Reset image index for the new page
    }
  }, [selectedPage, pageIds]);

  const nextGalleryItem = useCallback(() => navigateGallery('next'), [navigateGallery]);
  const prevGalleryItem = useCallback(() => navigateGallery('prev'), [navigateGallery]);

  // --- Effects and Handlers ---
  useEffect(() => {
    if (selectedPage) {
      document.body.style.overflow = "hidden";
      setCurrentImageIndex(0);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedPage]);

  // Keyboard navigation for a professional touch (Escape to close, Arrows for navigation)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!selectedPage) return;

      if (event.key === 'Escape') {
        setSelectedPage(null);
      } else if (event.key === 'ArrowRight') {
        // Prioritize internal image switch if multiple, otherwise switch page
        hasMultipleImages ? nextImage() : nextGalleryItem();
      } else if (event.key === 'ArrowLeft') {
        // Prioritize internal image switch if multiple, otherwise switch page
        hasMultipleImages ? prevImage() : prevGalleryItem();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPage, hasMultipleImages, nextImage, prevImage, nextGalleryItem, prevGalleryItem]);


  const handleImageError = (pageId: number) => {
    // console.error(`Image failed to load for page ${pageId}`);
    setImageErrors((prev) => ({ ...prev, [pageId]: true }));
  };

  const handleImageLoad = (pageId: number) => {
    // console.log(`Image loaded successfully for page ${pageId}`);
    setImageLoaded((prev) => ({ ...prev, [pageId]: true }));
  };

  // --- Render Functions ---

  const renderFallback = (page: AppPage, size: 'small' | 'large') => (
    <div className={`w-full h-full flex flex-col items-center justify-center ${size === 'large' ? 'bg-gray-100' : 'bg-gradient-to-br from-gray-100 to-gray-200'}`}>
      <LayoutGrid className="text-gray-400" size={size === 'large' ? 48 : 24} />
      <span className={`text-sm ${size === 'large' ? 'text-gray-600 mt-2' : 'text-gray-500 mt-1'}`}>Image not found</span>
      <span className={`text-xs text-gray-400 ${size === 'large' ? 'mt-1' : ''}`}>{page.imageUrl}</span>
    </div>
  );

  const renderLoadingSkeleton = (size: 'small' | 'large') => (
    <div className={`absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center z-10 ${size === 'large' ? 'text-lg' : 'text-sm'}`}>
      <div className="text-gray-400">Loading image...</div>
    </div>
  );

  return (
    <SectionWrapper isDark={false}>
      {/* Modification 2: Reduced vertical padding from 'py-20' to 'py-16' for smaller gap */}
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Gallery Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-4 text-gray-900">
            Application{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Pages
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-16 leading-relaxed">
            Explore the carefully crafted pages that make up our comprehensive SaaS platform and discover key features.
          </p>
        </div>
        {/* --- */}

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {appPages.map((page) => (
            <div
              key={page.id}
              className="group bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer overflow-hidden"
              onClick={() => setSelectedPage(page)}
            >
              {/* Image Container */}
              <div className="relative aspect-video w-full overflow-hidden bg-gray-50"> {/* Changed to aspect-video for modern UI */}
                {imageErrors[page.id] ? (
                  renderFallback(page, 'small')
                ) : (
                  <>
                    {!imageLoaded[page.id] && renderLoadingSkeleton('small')}
                    
                    {/* Actual Image */}
                    <div className={`w-full h-full relative ${imageLoaded[page.id] ? 'block' : 'invisible'}`}>
                      <Image
                        src={page.imageUrl}
                        alt={page.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        onLoad={() => handleImageLoad(page.id)}
                        onError={() => handleImageError(page.id)}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority={page.id <= 3}
                      />
                    </div>
                  </>
                )}

                {/* View icon Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 pointer-events-none">
                    <Maximize2
                      className="text-white bg-purple-600 bg-opacity-90 rounded-full p-2 shadow-xl"
                      size={40}
                    />
                </div>
              </div>

              {/* Text Content */}
              <div className="p-6 md:p-8">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-xl text-gray-900 mb-1">{page.title}</h3>
                    <p className="text-sm text-gray-500">{page.subtitle}</p>
                  </div>
                  <span className="text-xs font-semibold bg-purple-50 text-purple-700 px-3 py-1 rounded-full whitespace-nowrap border border-purple-200">
                    {page.pageName}
                  </span>
                </div>
                <button 
                  onClick={(e) => { e.stopPropagation(); setSelectedPage(page); }} // Use stopPropagation for button inside a clickable div
                  className="mt-2 text-sm font-semibold text-purple-600 hover:text-purple-800 transition-colors flex items-center group/btn"
                >
                  View Details
                  <span className="ml-1 transition-transform duration-200 group-hover/btn:translate-x-1">→</span>
                </button>
              </div>
            </div>
          ))}
        </div>
        {/* --- */}

        {/* Modification 1: Changed z-50 to z-[100] on the modal overlay 
          to ensure it sits above any fixed navigation bar. 
        */}
        {selectedPage && (
          <div className="fixed inset-0 bg-black bg-opacity-90 z-[100] flex items-center justify-center p-4" onClick={() => setSelectedPage(null)}>
            <div 
              className="bg-white rounded-xl max-w-5xl w-full max-h-[85vh] h-full shadow-3xl flex flex-col transition-all duration-300"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
            >
              <div className="relative flex-1 flex flex-col md:flex-row overflow-hidden">
                
                {/* Close Button */}
                <button
                  onClick={() => setSelectedPage(null)}
                  className="absolute top-4 right-4 z-30 bg-white text-gray-700 rounded-full p-2 shadow-lg hover:bg-gray-100 transition-all"
                  aria-label="Close Gallery"
                >
                  <X size={24} />
                </button>

                {/* Left Section: Image Gallery (Takes up more space) */}
                <div className="relative w-full md:w-2/3 flex-shrink-0 bg-gray-50 rounded-t-xl md:rounded-l-xl md:rounded-t-none overflow-hidden">
                  
                  {/* Image Display */}
                  <div className="relative w-full h-full flex items-center justify-center p-4"> {/* Padding inside image area */}
                    {imageErrors[selectedPage.id] ? (
                      renderFallback(selectedPage, 'large')
                    ) : (
                      <>
                        {!imageLoaded[selectedPage.id] && renderLoadingSkeleton('large')}
                        
                        <div className={`w-full h-full relative ${imageLoaded[selectedPage.id] ? 'block' : 'invisible'}`}>
                          <Image
                            src={currentImages[currentImageIndex]}
                            alt={`${selectedPage.title} - Image ${currentImageIndex + 1}`}
                            fill
                            className="object-contain transition-opacity duration-300"
                            onLoad={() => handleImageLoad(selectedPage.id)}
                            onError={() => handleImageError(selectedPage.id)}
                            sizes="(max-width: 768px) 100vw, 66vw"
                          />
                        </div>
                      </>
                    )}

                    {/* Image Navigation Buttons (Internal Page Gallery) */}
                    {hasMultipleImages && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-60 text-white rounded-full p-2 hover:bg-opacity-80 transition-all z-20"
                          aria-label="Previous Image"
                        >
                          <ChevronLeft size={24} />
                        </button>
                        
                        <button
                          onClick={nextImage}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-60 text-white rounded-full p-2 hover:bg-opacity-80 transition-all z-20"
                          aria-label="Next Image"
                        >
                          <ChevronRight size={24} />
                        </button>
                      </>
                    )}
                    
                    {/* Image counter / indicator */}
                    {currentImages.length > 1 && (
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-60 text-white px-3 py-1 rounded-full text-sm font-medium z-20">
                        {currentImageIndex + 1} / {currentImages.length}
                      </div>
                    )}
                  </div>

                  {/* Gallery Object Navigation (Between Pages) */}
                  <div className="absolute inset-0 flex justify-between items-center px-2 pointer-events-none">
                    <button
                      onClick={prevGalleryItem}
                      className="p-2 bg-white text-gray-800 rounded-full shadow-lg opacity-80 hover:opacity-100 transition-opacity pointer-events-auto -translate-x-4 md:-translate-x-6"
                      aria-label="Previous Gallery Item"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button
                      onClick={nextGalleryItem}
                      className="p-2 bg-white text-gray-800 rounded-full shadow-lg opacity-80 hover:opacity-100 transition-opacity pointer-events-auto translate-x-4 md:translate-x-6"
                      aria-label="Next Gallery Item"
                    >
                      <ChevronRight size={24} />
                    </button>
                  </div>
                </div>

                {/* Right Section: Details (Scrollable) */}
                <div className="w-full md:w-1/3 p-6 md:p-8 flex flex-col overflow-y-auto">
                  <div className="mb-6 border-b pb-4">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedPage.title}</h3>
                    <p className="text-base text-gray-600 mb-3">{selectedPage.subtitle}</p>
                    <span className="inline-block bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold border border-purple-200">
                      {selectedPage.pageName} Page
                    </span>
                  </div>

                  <h4 className="text-lg font-semibold text-gray-800 mb-3">Description</h4>
                  <p className="text-gray-700 leading-relaxed mb-8 text-base flex-grow">{selectedPage.description}</p>

                  <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:space-x-4 pt-4 border-t mt-auto">
                    <button
                      className="w-full sm:w-auto px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
                      onClick={() => setSelectedPage(null)}
                    >
                      Close
                    </button>
                    <button className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg shadow-md hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-[1.02]">
                      Explore Feature
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </SectionWrapper>
  );
};

const AboutCreator = () => (
  <SectionWrapper isDark={false}>
    <div className="py-20 px-6">
      <div className="container mx-auto max-w-4xl">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="relative mb-8">
            <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white shadow-lg">
              <Image
                src="/assets/TahirProfileImage.png"
                alt="Muhammad Tahir A"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="absolute -top-2 -left-2 w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 opacity-70 animate-pulse"></div>
            <div className="absolute -bottom-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-r from-green-400 to-blue-400 opacity-70 animate-pulse delay-1000"></div>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            About The{" "}
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              Creator
            </span>
          </h2>
        </div>

        <div className="grid md:grid-cols-5 gap-8 items-start">
          <div className="hidden md:block md:col-span-1"></div>

          <div className="md:col-span-3">
            <div className="prose prose-lg max-w-none">
              <p className="text-lg font-light text-gray-700 mb-6 leading-relaxed">
                <span className="font-medium bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                  Hi, I&apos;m Muhammad Tahir A
                </span>{" "}
                — a Data Technology Professional and Modern Tech Full-Stack
                Developer.
              </p>

              <p className="text-gray-700 mb-6 leading-relaxed">
                Over the past{" "}
                <span className="font-semibold text-gray-900">8 years</span>,
                I&apos;ve worked with renowned companies and clients globally, honing
                skills in research, planning, requirement analysis, and
                delivering high-quality products.
              </p>

              <p className="text-gray-700 mb-6 leading-relaxed">
                This full-stack application showcases my expertise in modern
                development practices, built with cutting-edge technologies and
                optimized for performance and scalability.
              </p>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-100 my-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <Star className="mr-2 text-purple-500" size={20} />
                  Inspiration
                </h3>
                <p className="text-gray-700">
                  With AI and innovative tech ideas rising rapidly, there&apos;s
                  growing demand for quick MVP launches. I&apos;ve created a
                  launch-ready platform with secure authentication, professional
                  UI, payment systems, and a solid foundation for modern
                  startups.
                </p>
              </div>
            </div>

            <div className="flex justify-center space-x-4 mt-8">
              {[
                {
                  icon: Mail,
                  href: "tahirtechinsights@gmail.com",
                  label: "Email",
                },
                {
                  icon: Github,
                  href: "https://github.com/tahirtechinsights/",
                  label: "GitHub",
                },
                {
                  icon: Linkedin,
                  href: "https://www.linkedin.com/in/tahirtechinsights/",
                  label: "LinkedIn",
                },
                {
                  icon: ExternalLink,
                  href: "https://tahirtechinsight.tech",
                  label: "Portfolio",
                },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-white shadow-sm border border-gray-100 hover:shadow-md transition-all text-gray-600 hover:text-gray-900 hover:border-purple-200"
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          <div className="hidden md:block md:col-span-1"></div>
        </div>
      </div>
    </div>
  </SectionWrapper>
);

// Feature Item component
interface FeatureItemProps {
  icon: LucideIcon;
  title: string;
  description: string;
  isDark?: boolean;
}

const FeatureItem = ({
  icon: Icon,
  title,
  description,
  isDark = false,
}: FeatureItemProps) => (
  <div
    className={`flex items-start space-x-4 p-6 rounded-xl transition-all duration-300 hover:transform hover:-translate-y-1 ${
      isDark
        ? "bg-slate-900/50 hover:bg-slate-800/50 border border-gray-800"
        : "bg-white shadow-sm hover:shadow-md border border-gray-100"
    }`}
  >
    <div
      className={`p-3 rounded-full ${
        isDark
          ? "bg-purple-500/10 border border-purple-500/30 text-purple-400"
          : "bg-gradient-to-r from-purple-100 to-pink-100 text-purple-600"
      }`}
    >
      <Icon size={24} />
    </div>
    <div>
      <h4
        className={`text-lg font-semibold mb-1 ${
          isDark ? "text-white" : "text-gray-900"
        }`}
      >
        {title}
      </h4>
      <p
        className={`text-sm leading-relaxed ${
          isDark ? "text-gray-400" : "text-gray-600"
        }`}
      >
        {description}
      </p>
    </div>
  </div>
);

// Core Services Section
const CoreServices = () => (
  <SectionWrapper isDark={true}>
    <div className="py-20 px-6">
      <div className="container mx-auto text-center max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Strategic Expertise &{" "}
          <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
            Secure Architecture
          </span>
        </h2>
        <p className="text-base text-gray-400 max-w-3xl mx-auto mb-16 leading-relaxed">
          I provide comprehensive solutions that help companies choose the right
          technologies and ensure their applications are built on secure,
          scalable foundations.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {[
            {
              icon: Shield,
              title: "Authentication & Authorization",
              description:
                "Secure auth solutions with multi-provider support using Auth.js and Clerk.",
            },
            {
              icon: Code,
              title: "Data Persistence",
              description:
                "PostgreSQL with Prisma for type-safe data modeling and migrations.",
            },
            {
              icon: Globe,
              title: "API Layer",
              description:
                "Next.js Route Handlers and tRPC for end-to-end type safety.",
            },
            {
              icon: Lock,
              title: "Deployment",
              description:
                "Seamless Vercel deployment with Git integration and performance optimization.",
            },
            {
              icon: Bot,
              title: "Payment Integration",
              description:
                "Stripe integration for subscriptions, payments, and webhooks.",
            },
            {
              icon: Search,
              title: "Security",
              description:
                "Server-side validation, rate limiting, and dependency scanning.",
            },
          ].map((feature, index) => (
            <FeatureItem key={index} {...feature} isDark={true} />
          ))}
        </div>
      </div>
    </div>
  </SectionWrapper>
);

// Why Trust Us Section
const WhyTrustUs = () => (
  <SectionWrapper isDark={false}>
    <div className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose Our{" "}
              <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                Foundation
              </span>
            </h2>
            <p className="text-base text-gray-600 leading-relaxed">
              We provide robust, maintainable, and production-ready foundations
              that allow you to focus on core business logic while ensuring
              excellent user experience.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                className="p-6 rounded-xl bg-white shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-gradient-to-r from-purple-100 to-pink-100 text-purple-600 mb-3">
                  <item.icon size={20} />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  {item.title}
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Carefully balanced foundation prioritizing both user
                  experience and security requirements.
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </SectionWrapper>
);

// Final CTA Section
const FinalCTA = () => {
  const router = useRouter();

  const handleGetStartedClick = () => {
    router.push("/dashboard");
  };

  return (
    <SectionWrapper isDark={true}>
      <div className="py-20 px-6 text-center">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Let&apos;s{" "}
            <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Connect
            </span>
          </h2>
          <p className="text-base text-gray-400 max-w-2xl mx-auto mb-8 leading-relaxed">
            Choose your preferred platform for collaboration and secure
            contracting
          </p>

          <div className="flex flex-col md:flex-row justify-center items-center gap-6 mt-12">
            {[
              {
                platform: "Upwork",
                href: "https://www.upwork.com/freelancers/tahirtechinsights/",
                logo: "/assets/upwork-logo.png",
                description:
                  "Secure contracting with built-in payment protection",
                buttonText: "View Upwork Profile",
                buttonClass: "bg-[#14a800] hover:bg-[#108400]",
              },
              {
                platform: "Contra",
                href: "https://tahirtechinsights.contra.com/",
                logo: "/assets/Contra_Logo.png",
                description: "Commission-free independent collaborations",
                buttonText: "View Contra Profile",
                buttonClass:
                  "bg-black hover:bg-gray-900 border border-gray-700",
              },
            ].map((platform, index) => (
              <div
                key={index}
                className="relative group bg-slate-900/50 p-8 rounded-2xl border border-gray-800 hover:border-purple-500/50 transition-all duration-300 cursor-pointer transform hover:-translate-y-1 w-full max-w-sm"
                onClick={() => window.open(platform.href, platform.platform)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                <div className="relative z-10">
                  <div className="mb-6 flex justify-center">
                    <Image
                      src={platform.logo}
                      alt={platform.platform}
                      width={120}
                      height={40}
                      className="object-contain"
                    />
                  </div>
                  <p className="text-gray-300 mb-6 text-sm leading-relaxed">
                    {platform.description}
                  </p>
                  <button
                    className={`py-2 px-6 rounded-full text-sm font-medium transition-all text-white ${platform.buttonClass}`}
                  >
                    {platform.buttonText}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16">
            <p className="text-gray-400 mb-6 text-sm">
              Or get started directly with our platform
            </p>
            <button
              onClick={handleGetStartedClick}
              className="py-2.5 px-8 rounded-lg text-base font-semibold bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 transition-all text-white shadow-lg transform hover:scale-105 duration-200"
            >
              Nexentric Lab
            </button>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

// Main Page component
export default function LandingPage() {
  return (
    <div className="font-sans antialiased">
      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
          background: #fafafa;
        }
        @keyframes blob {
          0%,
          100% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        .animate-blob {
          animation: blob 7s ease-in-out infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
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
      `}</style>
      <main>
        <Hero />
        <TechLogos />
        <AppPagesGallery />
        <AboutCreator />
        <CoreServices />
        <WhyTrustUs />
        <FinalCTA />
      </main>
    </div>
  );
}