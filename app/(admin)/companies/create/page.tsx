import { CompanyForm } from '@/components/company-form'
import { getCategories } from '@/lib/categories'

export default async function CreateCompany() {
  const categories = await getCategories()

  return (
    <div className="container mx-auto py-8">
      <CompanyForm categories={categories}/>
    </div>
  )
}