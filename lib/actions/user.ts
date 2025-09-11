// lib/actions/user.ts
'use server';

import prisma from '@/lib/prisma';
import { User, Prisma } from '@prisma/client';
import { revalidatePath } from 'next/cache';

// Update a user's profile information
export async function updateUserProfile(data: Partial<User>) {
  const { clerkUserId, ...updateData } = data;

  if (!clerkUserId) {
    return { error: 'Authentication error: Clerk User ID not provided.' };
  }

  try {
    const user = await prisma.user.update({
      where: { clerkUserId },
      data: updateData,
    });

    // Revalidate the profile page to show the updated data
    revalidatePath('/profile'); 

    return { user };
  } catch (error) {
    console.error('Error updating user profile:', error);
    return { error: 'Failed to update user profile.' };
  }
}

// Function to create a user (if needed for initial setup)
export async function createNewUser(data: Partial<User>) {
  try {
    // Create a properly typed object for Prisma create
    const createData: Prisma.UserCreateInput = {
      // Required fields with defaults if not provided
      email: data.email || '',
      clerkUserId: data.clerkUserId || '',
      createdAt: data.createdAt || new Date(),
      updatedAt: data.updatedAt || new Date(),
      
      // Optional fields - only include if they have values
      ...(data.firstName && { firstName: data.firstName }),
      ...(data.lastName && { lastName: data.lastName }),
      ...(data.imageUrl && { imageUrl: data.imageUrl }),
      ...(data.jobTitle && { jobTitle: data.jobTitle }),
      ...(data.xUrl && { xUrl: data.xUrl }),
      ...(data.linkedInUrl && { linkedInUrl: data.linkedInUrl }),
      ...(data.companySlug && { companySlug: data.companySlug }),
    };

    const user = await prisma.user.create({ data: createData });
    revalidatePath('/profile');
    return { user };
  } catch (error) {
    console.error('Error creating user:', error);
    return { error: 'Failed to create user.' };
  }
}