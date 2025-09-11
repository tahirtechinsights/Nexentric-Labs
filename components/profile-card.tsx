// components/ProfileCard.tsx

'use client';

import { useState, useTransition } from 'react';
import Image from 'next/image';
import { User, Company, Service } from '@prisma/client';
import { updateUserProfile } from '@/lib/actions/user';

type FullUser = User & {
  company: (Company & { services: Service[] }) | null;
};

export default function ProfileCard({ initialUser }: { initialUser: FullUser }) {
  const [user, setUser] = useState<FullUser>(initialUser);
  const [isEditing, setIsEditing] = useState<Record<string, boolean>>({});
  const [isPending, startTransition] = useTransition();

  const handleEdit = (section: string) => {
    setIsEditing(prev => ({ ...prev, [section]: true }));
  };

  const handleCancel = (section: string) => {
    setIsEditing(prev => ({ ...prev, [section]: false }));
    setUser(initialUser); 
  };

  const handleSave = (section: string) => {
    startTransition(async () => {
      const { error } = await updateUserProfile(user);
      if (!error) {
        setIsEditing(prev => ({ ...prev, [section]: false }));
      } else {
        alert('Failed to save changes. Please try again.');
      }
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: keyof User) => {
    setUser(prev => prev ? { ...prev, [field]: e.target.value } : prev);
  };

  return (
    // Replaced bg-gray-800 with `bg-card-bg` and text-white with `text-text-color`
    <div className="max-w-4xl mx-auto p-6 rounded-xl shadow-lg bg-card-bg text-text-color">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
        <div className="w-32 h-32 rounded-full overflow-hidden flex-shrink-0 relative">
          <Image
            src={user.imageUrl || '/default-avatar.png'}
            alt={`${user.firstName} ${user.lastName}`}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-1 text-center md:text-left">
          {/* Developer Name */}
          <div className="flex items-center gap-2 mb-2">
            {isEditing.name ? (
              <div className="flex flex-col gap-2">
                {/* Replaced bg-gray-700 with bg-border-color */}
                <input
                  type="text"
                  value={user.firstName || ''}
                  onChange={(e) => handleInputChange(e, 'firstName')}
                  className="bg-border-color rounded p-2 text-xl"
                />
                <input
                  type="text"
                  value={user.lastName || ''}
                  onChange={(e) => handleInputChange(e, 'lastName')}
                  className="bg-border-color rounded p-2 text-xl"
                />
              </div>
            ) : (
              <h1 className="text-4xl font-bold">
                {user.firstName} {user.lastName}
              </h1>
            )}
            {!isEditing.name ? (
              // Replaced text-blue-400 with text-primary-color
              <button onClick={() => handleEdit('name')} className="ml-2 text-primary-color">
                Edit
              </button>
            ) : (
              <div className="flex gap-2 ml-2">
                <button
                  onClick={() => handleSave('name')}
                  className="text-green-400"
                  disabled={isPending}
                >
                  {isPending ? 'Saving...' : 'Save'}
                </button>
                <button onClick={() => handleCancel('name')} className="text-red-400">
                  Cancel
                </button>
              </div>
            )}
          </div>
          {/* Replaced text-gray-400 with a dynamic color or keep as a specific gray */}
          <p className="text-lg text-gray-400">{user.jobTitle}</p>
        </div>
      </div>

      {/* Replaced border-gray-700 with `border-border-color` */}
      <hr className="my-8 border-border-color" />

      {/* About Me Section */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <h2 className="text-2xl font-semibold">About Me</h2>
          {!isEditing.about ? (
            <button onClick={() => handleEdit('about')} className="text-primary-color">
              Edit
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={() => handleSave('about')}
                className="text-green-400"
                disabled={isPending}
              >
                {isPending ? 'Saving...' : 'Save'}
              </button>
              <button onClick={() => handleCancel('about')} className="text-red-400">
                Cancel
              </button>
            </div>
          )}
        </div>
        {isEditing.about ? (
          // Replaced bg-gray-700 with bg-border-color
          <textarea
            value={user.jobTitle || ''}
            onChange={(e) => handleInputChange(e, 'jobTitle')} 
            className="w-full h-40 rounded p-4 text-sm resize-none bg-border-color"
          />
        ) : (
          <p className="text-gray-300">
            {user.jobTitle || "Add your 'About Me' section here."}
          </p>
        )}
      </div>

      {/* Company & Services Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Company & Services</h2>
        {user.company ? (
          <>
            <p className="text-gray-300 mb-2">
              **{user.company.name}** - {user.company.tagline}
            </p>
            <h3 className="text-xl font-medium mt-4 mb-2">Services</h3>
            <ul className="list-disc list-inside text-gray-300">
              {user.company.services.map(service => (
                <li key={service.id}>
                  **{service.name}**: {service.description}
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p className="text-gray-400">No company information available.</p>
        )}
      </div>
    </div>
  );
}