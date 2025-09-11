'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Loader2, Save, Plus, CheckCircle } from 'lucide-react'
import { createCompany, updateCompany, type CompanyWithRelations, type CompanyFormData } from '@/lib/companies'
import { type Category } from '@/lib/categories'

interface CompanyFormProps {
  company?: CompanyWithRelations | null
  onSuccess?: () => void
  categories: Category[]
}

export function CompanyForm({ company, onSuccess, categories }: CompanyFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const router = useRouter()

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (showSuccess) {
      timer = setTimeout(() => {
        setShowSuccess(false)
        router.push('/companies')
        router.refresh()
      }, 5000) // 5 seconds
    }
    return () => clearTimeout(timer)
  }, [showSuccess, router])

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }

  const handleWebsiteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value && !value.startsWith('https://') && !value.startsWith('http://')) {
      e.target.value = 'https://' + value
    }
  }

  const validateForm = (formData: FormData) => {
    const newErrors: Record<string, string> = {}
    const name = formData.get('name') as string
    const slug = formData.get('slug') as string
    const email = formData.get('email') as string
    const website = formData.get('website') as string
    const categoryId = formData.get('categoryId') as string

    if (!name?.trim()) {
      newErrors.name = 'Company name is required'
    }

    if (!slug?.trim()) {
      newErrors.slug = 'Slug is required'
    } else if (!/^[a-z0-9-]+$/.test(slug)) {
      newErrors.slug = 'Slug can only contain lowercase letters, numbers, and hyphens'
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Invalid email address'
    }

    if (website && !/^https?:\/\/.+\..+/.test(website)) {
      newErrors.website = 'Invalid website URL'
    }

    if (!categoryId) {
      newErrors.categoryId = 'Category is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  async function handleSubmit(formData: FormData) {
    if (!validateForm(formData)) {
      return
    }

    setIsLoading(true)
    setErrors({})

    try {
      const formDataObject: CompanyFormData = {
        name: formData.get('name') as string,
        slug: formData.get('slug') as string,
        tagline: formData.get('tagline') as string || null,
        description: formData.get('description') as string || null,
        phone: formData.get('phone') as string || null,
        email: formData.get('email') as string || null,
        website: formData.get('website') as string || null,
        categoryId: formData.get('categoryId') as string,
      }

      let result
      
      if (company?.id) {
        result = await updateCompany(company.id, formDataObject)
      } else {
        result = await createCompany(formDataObject)
      }
      
      if (!result.success) {
        setErrors({ submit: result.error || 'Failed to save company' })
        return
      }
      
      // Show success animation
      setShowSuccess(true)
      
      if (onSuccess) {
        onSuccess()
      }
    } catch (error) {
      console.error('Error saving company:', error)
      setErrors({ submit: 'Failed to save company. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  // Safe default values
  const defaultValues = {
    name: company?.name || '',
    slug: company?.slug || '',
    tagline: company?.tagline || '',
    description: company?.description || '',
    phone: company?.phone || '',
    email: company?.email || '',
    website: company?.website || '',
    categoryId: company?.categoryId || '',
  }

  return (
    <div className="flex justify-center">
      {/* Success Overlay */}
      {showSuccess && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg max-w-md w-full mx-4 border border-green-200 dark:border-green-800 flex flex-col items-center animate-in fade-in-90 zoom-in-90">
            <div className="relative">
              <CheckCircle className="h-16 w-16 text-green-500 mb-4 animate-tick" />
              <div className="absolute inset-0 bg-green-500 rounded-full opacity-0 animate-ping-slow" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Success!
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-center mb-6">
              Company {company ? 'updated' : 'created'} successfully.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500 text-center">
              Redirecting to companies in a few seconds...
            </p>
          </div>
        </div>
      )}
      
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>{company ? 'Edit Company' : 'Create New Company'}</CardTitle>
          <CardDescription>
            {company ? 'Update your company information' : 'Add a new company to your directory'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Company Name *</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter company name"
                  defaultValue={defaultValues.name}
                  onChange={(e) => {
                    if (!company && !defaultValues.slug) {
                      const slugInput = document.getElementById('slug') as HTMLInputElement
                      if (slugInput && !slugInput.value) {
                        slugInput.value = generateSlug(e.target.value)
                      }
                    }
                  }}
                  className={errors.name ? 'border-destructive' : ''}
                />
                {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="categoryId">Category *</Label>
                <Select
                  name="categoryId"
                  defaultValue={defaultValues.categoryId}
                >
                  <SelectTrigger 
                    className={`w-full ${errors.categoryId ? 'border-destructive' : ''}`}
                    style={{ width: '100%' }}
                  >
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent className="w-full">
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.categoryId && <p className="text-sm text-destructive">{errors.categoryId}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">Slug *</Label>
              <Input
                id="slug"
                name="slug"
                placeholder="company-slug"
                defaultValue={defaultValues.slug}
                className={errors.slug ? 'border-destructive' : ''}
              />
              <p className="text-sm text-muted-foreground">
                Unique identifier for URLs. Use lowercase letters, numbers, and hyphens only.
              </p>
              {errors.slug && <p className="text-sm text-destructive">{errors.slug}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="tagline">Tagline</Label>
              <Input
                id="tagline"
                name="tagline"
                placeholder="Brief tagline or slogan"
                defaultValue={defaultValues.tagline}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Detailed description of the company"
                className="min-h-32"
                defaultValue={defaultValues.description}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  placeholder="Phone number"
                  defaultValue={defaultValues.phone}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="contact@company.com"
                  defaultValue={defaultValues.email}
                  className={errors.email ? 'border-destructive' : ''}
                />
                {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                name="website"
                placeholder="company.com"
                defaultValue={defaultValues.website}
                onChange={handleWebsiteChange}
                className={errors.website ? 'border-destructive' : ''}
              />
              {errors.website && <p className="text-sm text-destructive">{errors.website}</p>}
            </div>

            {errors.submit && <p className="text-sm text-destructive">{errors.submit}</p>}

            <div className="flex gap-4 pt-4">
              <Button 
                type="submit" 
                disabled={isLoading}
                className="bg-primary hover:bg-primary/90"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    {company ? (
                      <Save className="mr-2 h-4 w-4" />
                    ) : (
                      <Plus className="mr-2 h-4 w-4" />
                    )}
                    {company ? 'Update Company' : 'Create Company'}
                  </>
                )}
              </Button>
              
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => router.back()}
                disabled={isLoading}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}