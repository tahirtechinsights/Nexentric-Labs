// lib/categories.ts
import 'server-only'
import prisma from '@/lib/prisma'

export async function getCategories() {
  return await prisma.category.findMany({
    orderBy: {
      name: 'asc'
    }
  })
}

export type Category = {
  id: string
  name: string
  description: string | null
  createdAt: Date
  updatedAt: Date
}