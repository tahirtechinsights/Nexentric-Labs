import prisma from '@/lib/prisma'
import { User } from '@prisma/client'

// Fetches all users, with an optional limit and sorted by last name.
export async function getUsers(limit?: number) {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        lastName: 'asc'
      },
      include: {
        company: {
          select: {
            name: true,
            slug: true,
          },
        },
      },
      ...(limit ? { take: limit } : {})
    })
    return { users }
  } catch (error) {
    return { error }
  }
}

// Fetches all users and includes their company details.
export async function getUsersWithCompanies(limit?: number) {
  try {
    console.log('Fetching users with companies...');
    const users = await prisma.user.findMany({
      where: {
        company: {
          isNot: null  // Use relation filter instead of companyId
        }
      },
      include: {
        company: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
      orderBy: {
        lastName: 'asc'
      },
      ...(limit ? { take: limit } : {})
    });
    console.log(`Found ${users.length} users with companies`);
    return { users };
  } catch (error) {
    console.error('Error in getUsersWithCompanies:', error);
    return { error };
  }
}

// Fetches all users without a company.
export async function getUsersWithoutCompanies() {
  try {
    console.log('Fetching users without companies...');
    const users = await prisma.user.findMany({
      where: {
        company: {
          is: null  // Use relation filter instead of companyId
        }
      },
      orderBy: {
        lastName: 'asc'
      }
    });
    console.log(`Found ${users.length} users without companies`);
    return { users };
  } catch (error) {
    console.error('Error in getUsersWithoutCompanies:', error);
    return { error };
  }
}

// Fetches the total count of all users in the database.
export async function getUsersCount() {
  try {
    const count = await prisma.user.count()
    return { count }
  } catch (error) {
    return { error }
  }
}

// Creates a new user in the database.
export async function createUser(data: User) {
  try {
    const user = await prisma.user.create({ data })
    return { user }
  } catch (error) {
    return { error }
  }
}

// Fetches a single user by ID or Clerk user ID.
export async function getUserById({
  id,
  clerkUserId
}: {
  id?: string
  clerkUserId?: string
}) {
  try {
    if (!id && !clerkUserId) {
      throw new Error('id or clerkUserId is required')
    }

    const query = id ? { id } : { clerkUserId }

    const user = await prisma.user.findUnique({ where: query })
    return { user }
  } catch (error) {
    return { error }
  }
}

// Fetches a single user by email.
export async function getUserByEmail(email: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { email }
    })
    return { user }
  } catch (error) {
    return { error }
  }
}

// Updates an existing user by their Clerk user ID.
export async function updateUser(id: string, data: Partial<User>) {
  try {
    const user = await prisma.user.update({
      where: { clerkUserId: id },
      data
    })
    return { user }
  } catch (error) {
    return { error }
  }
}

// Deletes a user by their Clerk user ID.
export async function deleteUser(id: string) {
  try {
    const user = await prisma.user.delete({
      where: { clerkUserId: id }
    })
    return { user }
  } catch (error) {
    return { error }
  }
}

// Combines the first and last name of a user into a single string.
export function combineName(user: User) {
  const { firstName, lastName } = user
  return `${firstName} ${lastName}`
}

// Fetches users based on a search query.
export async function searchUsers(query: string) {
  try {
    const users = await prisma.user.findMany({
      where: {
        OR: [
          {
            firstName: {
              contains: query,
              mode: 'insensitive',
            },
          },
          {
            lastName: {
              contains: query,
              mode: 'insensitive',
            },
          },
        ],
      },
      include: {
        company: {
          select: {
            name: true,
            slug: true,
          },
        },
      },
      orderBy: {
        lastName: 'asc',
      },
    })
    return { users }
  } catch (error) {
    return { error }
  }
}

// Fetches companies based on a search query.
export async function searchCompanies(query: string) {
  try {
    const companies = await prisma.company.findMany({
      where: {
        name: {
          contains: query,
          mode: 'insensitive',
        },
      },
    })
    return { companies }
  } catch (error) {
    return { error }
  }
}

// Add this new function to your existing lib/users.ts file
export async function getUserProfile(clerkUserId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { clerkUserId },
      include: {
        company: {
          include: {
            services: true,
          },
        },
      },
    });

    if (!user) {
      return { error: 'User not found' };
    }

    return { user };
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return { error };
  }
}