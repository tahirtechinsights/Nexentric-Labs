'use server'

import { revalidatePath } from 'next/cache'
import prisma from '@/lib/prisma'
import { Company, Category, User, Service } from '@prisma/client'

export type CompanyWithRelations = Company & {
  category: Category
  staff: User[]
  services: Service[]
}

export type CompanyFormData = {
  name: string
  slug: string
  tagline?: string | null
  description?: string | null
  phone?: string | null
  email?: string | null
  website?: string | null
  categoryId: string
}

export async function createCompany(formData: CompanyFormData) {
  try {
    // Check if slug already exists
    const existingCompany = await prisma.company.findUnique({
      where: { slug: formData.slug },
    })

    if (existingCompany) {
      return { 
        success: false, 
        error: 'Slug already exists. Please choose a different one.' 
      }
    }

    const company = await prisma.company.create({
      data: {
        name: formData.name,
        slug: formData.slug,
        tagline: formData.tagline,
        description: formData.description,
        phone: formData.phone,
        email: formData.email,
        website: formData.website,
        categoryId: formData.categoryId,
      },
      include: {
        category: true,
        staff: true,
        services: true,
      },
    })

    revalidatePath('/companies')
    revalidatePath(`/companies/${company.slug}`)
    
    return { success: true, company }
  } catch (error) {
    console.error('Error creating company:', error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to create company' 
    }
  }
}

export async function updateCompany(
  id: string,
  formData: CompanyFormData
) {
  try {
    // Check if slug already exists for another company
    const existingCompany = await prisma.company.findFirst({
      where: {
        slug: formData.slug,
        id: { not: id },
      },
    })

    if (existingCompany) {
      return { 
        success: false, 
        error: 'Slug already exists. Please choose a different one.' 
      }
    }

    const company = await prisma.company.update({
      where: { id },
      data: {
        name: formData.name,
        slug: formData.slug,
        tagline: formData.tagline,
        description: formData.description,
        phone: formData.phone,
        email: formData.email,
        website: formData.website,
        categoryId: formData.categoryId,
      },
      include: {
        category: true,
        staff: true,
        services: true,
      },
    })

    revalidatePath('/companies')
    revalidatePath(`/companies/${company.slug}`)
    revalidatePath(`/companies/${formData.slug}`)
    
    return { success: true, company }
  } catch (error) {
    console.error('Error updating company:', error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to update company' 
    }
  }
}

export async function getCompanyBySlug(slug: string) {
  try {
    const company = await prisma.company.findUnique({
      where: { slug },
      include: {
        category: true,
        staff: true,
        services: true,
      },
    })
    return company
  } catch (error) {
    console.error('Error fetching company:', error)
    return null
  }
}

export async function getAllCompanies() {
  try {
    const companies = await prisma.company.findMany({
      include: {
        category: true,
        staff: true,
      },
      orderBy: {
        name: 'asc',
      },
    })
    return companies
  } catch (error) {
    console.error('Error fetching companies:', error)
    return []
  }
}