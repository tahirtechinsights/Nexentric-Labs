'use server';

import prisma from '@/lib/prisma';
import { User } from '@prisma/client';
import { revalidatePath } from 'next/cache';

export async function updateUserBio(userId: string, bioData: {
  about: string;
  totalYearsExperience: number;
  skillsAndTools: string;
  location: string;
  hourlyRate: number;
}) {
  try {
    // Prepare the data for create operation
    const createData = {
      about: bioData.about || '',
      totalYearsExperience: bioData.totalYearsExperience || 0,
      skillsAndTools: bioData.skillsAndTools || '',
      location: bioData.location || '',
      hourlyRate: bioData.hourlyRate || 0,
      userId: userId,
    };

    const updatedBio = await prisma.bio.upsert({
      where: { userId },
      update: bioData,
      create: createData,
    });
    
    // Revalidate the profile page to reflect bio changes
    revalidatePath('/profile');
    
    return { bio: updatedBio, error: null };
  } catch (error) {
    console.error('Error updating bio:', error);
    return { bio: null, error: 'Failed to update bio' };
  }
}

export async function updateUserProfile(userData: Partial<User>) {
  try {
    const updatedUser = await prisma.user.update({
      where: { id: userData.id },
      data: {
        firstName: userData.firstName,
        lastName: userData.lastName,
        jobTitle: userData.jobTitle,
        xUrl: userData.xUrl,
        linkedInUrl: userData.linkedInUrl,
      },
    });
    
    // Revalidate the profile page to reflect changes
    revalidatePath('/profile');
    
    return { user: updatedUser, error: null };
  } catch (error) {
    console.error('Error updating user:', error);
    return { user: null, error: 'Failed to update user' };
  }
}

export async function updateUserSocialLinks(userId: string, socialData: { xUrl?: string; linkedInUrl?: string }) {
  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        xUrl: socialData.xUrl,
        linkedInUrl: socialData.linkedInUrl,
      },
    });
    
    // Revalidate the profile page to reflect social link changes
    revalidatePath('/profile');
    
    return { user: updatedUser, error: null };
  } catch (error) {
    console.error('Error updating social links:', error);
    return { user: null, error: 'Failed to update social links' };
  }
}

export async function updateUserCompany() {
  try {
    // This would need to be implemented based on your company update logic
    // For now, we'll just revalidate the path
    revalidatePath('/profile');
    
    return { success: true, error: null };
  } catch (error) {
    console.error('Error updating company:', error);
    return { success: false, error: 'Failed to update company' };
  }
}