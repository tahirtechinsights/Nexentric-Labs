import { getAllCompanies as getCompanies } from '@/lib/companies'
import Companies from '@/components/companies'
import { getCategories } from '@/lib/categories'
import { Card } from '@/components/ui/card'
import { Building2 } from 'lucide-react'

export default async function CompaniesPage() {
  const companies = await getCompanies()
  const categories = await getCategories()

  if (!companies || companies.length === 0) {
    return null
  }

  const companiesCount = companies.length

  return (
    <section className='pb-24 pt-6 sm:pt-8'>
      <div className='container mx-auto max-w-7xl space-y-8 px-4 md:px-6'>
        {/* Header and Stats - Exact same structure as Discover page */}
        <div className="flex flex-col items-start justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
               Companies
            </h1>
            <p className="mt-1 text-lg text-gray-600 dark:text-gray-400">
              Found {companiesCount} companies in our community.
            </p>
          </div>
          
          {/* Stats card matching Discover page */}
          <div className="grid grid-cols-1 gap-4">
            <Card className="flex items-center space-x-3 bg-gray-50 p-4 dark:bg-gray-800">
              <div className="flex-shrink-0 rounded-full bg-blue-100 p-2 dark:bg-blue-900/40">
                <Building2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Total Companies
                </p>
                <p className="text-lg font-bold">{companiesCount}</p>
              </div>
            </Card>
          </div>
        </div>

        <hr className="border-gray-200 dark:border-gray-700" />

        <Companies companies={companies} categories={categories} />
      </div>
    </section>
  )
}