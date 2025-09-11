import React from 'react';
import Image from 'next/image';

// The main application component.
const Analytics = async () => {

  return (
    <section className="py-10 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-8 sm:mb-12">
          <div className="flex items-center gap-4">
            {/* Using a standard Image tag instead of Next.js Image */}
            <Image
              src="/assets/TahirProfileImage.png"
              alt="Profile Image"
              width={42}
              height={42}
              className="rounded-full"
            />
            <h1 className="font-semibold text-2xl sm:text-3xl">
              Welcome, Analytics
            </h1>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Analytics;
