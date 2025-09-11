import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import {
  Users2,
  Building2,
  UserX,
  SearchIcon,
  SearchXIcon,
} from 'lucide-react'
import {
  getUsers,
  getUsersWithCompanies,
  getUsersCount,
  getUsersWithoutCompanies,
  searchUsers,
  searchCompanies,
  combineName,
} from '@/lib/users'
import { Company, User } from '@prisma/client'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Suspense } from 'react'

// This export forces the page to be dynamic, ensuring data is always fetched on each request
export const dynamic = 'force-dynamic'

interface SearchParams {
  query?: string
  type?: 'people' | 'companies'
}

// Define a type for the partial company data that might be returned
interface PartialCompany {
  slug: string;
  name: string;
  // Add other properties that might be returned if needed
}

// Define type for user with company
interface UserWithCompany extends User {
  company: Company | PartialCompany | null;
}

function UserCard({ user }: { user: UserWithCompany }) {
  const fullName = combineName(user)

  return (
    <Card
      key={user.id}
      className="w-full max-w-xl transition-all duration-300 hover:shadow-lg rounded-none mx-auto border-b-0"
    >
      <CardHeader className="flex flex-row items-center space-x-2 p-3 pb-0">
        <Avatar className="h-8 w-8">
          <AvatarImage src={user.imageUrl || ''} alt={fullName} />
          <AvatarFallback className="text-sm">
            {user.firstName?.[0]}
            {user.lastName?.[0]}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <CardTitle className="text-base font-bold">{fullName}</CardTitle>
          <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
            {user.jobTitle}
          </p>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="outline" size="sm" className="text-xs">
            View Profile
          </Button>
          <Button size="sm" className="text-xs">
            Connect
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-3">
        {user.company && (
          <div className="flex items-center space-x-2">
            <div className="rounded-full bg-green-100 p-1 dark:bg-green-900/40">
              <Building2 className="h-3 w-3 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Company
              </p>
              <p className="font-semibold text-gray-800 dark:text-gray-200 text-sm">
                {user.company.name}
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function CompanyCard({ company }: { company: Company }) {
  return (
    <Card
      key={company.id}
      className="w-full max-w-xl transition-all duration-300 hover:shadow-lg rounded-none mx-auto border-b-0"
    >
      <CardHeader className="flex flex-row items-center space-x-2 p-3 pb-0">
        <div className="flex-1">
          <CardTitle className="text-base font-bold">{company.name}</CardTitle>
          <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
            {company.tagline}
          </p>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="outline" size="sm" className="text-xs">
            View Details
          </Button>
          <Button size="sm" className="text-xs">
            Explore Services
          </Button>
        </div>
      </CardHeader>
    </Card>
  )
}

function NoResults({ query }: { query?: string }) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center">
      <SearchXIcon className="h-16 w-16 text-gray-400" />
      <h2 className="mt-4 text-2xl font-semibold">No results found</h2>
      <p className="mt-2 text-gray-500">
        We couldn&apos;t find any results for &quot;{query}&quot;. Try a different
        search term.
      </p>
    </div>
  )
}

// Loading component
function DiscoverLoading() {
  return (
    <div className="container mx-auto max-w-7xl space-y-8 px-4 py-8 md:px-6">
      <div className="animate-pulse">
        <div className="h-8 w-64 bg-gray-200 rounded"></div>
        <div className="h-4 w-96 bg-gray-200 rounded mt-2"></div>
      </div>
    </div>
  )
}

// Search component that accepts resolved searchParams
function SearchAndFilter({ searchParams }: { searchParams: { query?: string; type?: string } }) {
  const query = searchParams.query || '';
  const type = searchParams.type || 'people';

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center">
      <div className="relative flex-grow">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <SearchIcon className="h-4 w-4 text-gray-500" />
        </div>
        <form className="w-full" action="/discover">
          <Input
            type="search"
            name="query"
            defaultValue={query || ''}
            placeholder="Search across your network..."
            className="w-full rounded-full border border-gray-300 bg-gray-100 pl-10 text-gray-900 transition-all duration-200 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
          />
          <input type="hidden" name="type" defaultValue={type} />
        </form>
      </div>

      <div className="hidden md:block">
        <Separator orientation="vertical" />
      </div>

      <Tabs defaultValue={type} className="w-full md:w-auto">
        <TabsList className="grid w-full grid-cols-2 p-1 md:w-auto">
          <TabsTrigger value="people" asChild>
            <Link href={`/discover?type=people${query ? `&query=${query}` : ''}`} className="cursor-pointer">
              People
            </Link>
          </TabsTrigger>
          <TabsTrigger value="companies" asChild>
            <Link href={`/discover?type=companies${query ? `&query=${query}` : ''}`} className="cursor-pointer">
              Company
            </Link>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  )
}

// Define types for the data
interface SearchData {
  users?: UserWithCompany[];
  companies?: Company[];
}

interface DefaultData {
  all: User[];
  withCompanies: User[];
  withoutCompanies: User[];
}

// Helper function to convert User to UserWithCompany
function convertToUserWithCompany(user: User): UserWithCompany {
  return {
    ...user,
    company: null
  };
}

// Type guard to check if data is DefaultData
function isDefaultData(data: SearchData | DefaultData | null): data is DefaultData {
  return data !== null && 'all' in data;
}

// Main content component that accepts resolved searchParams
async function DiscoverContent({ searchParams }: { searchParams: { query?: string; type?: string } }) {
  const { query, type = 'people' } = searchParams
  let data: SearchData | DefaultData | null = null
  let usersCount = 0
  let usersWithCompaniesCount = 0
  let usersWithoutCompaniesCount = 0

  if (query) {
    if (type === 'people') {
      const { users, error } = await searchUsers(query)
      if (error) notFound()
      data = { users: users as UserWithCompany[] }
      usersCount = users?.length || 0
    } else if (type === 'companies') {
      const { companies, error } = await searchCompanies(query)
      if (error) notFound()
      data = { companies }
      usersCount = companies?.length || 0
    }
  } else {
    // Default data fetching - these functions return User objects
    const { users: allUsers } = await getUsers()
    const { users: usersWithCompanies } = await getUsersWithCompanies()
    const { users: usersWithoutCompanies } = await getUsersWithoutCompanies()
    const { count } = await getUsersCount()

    data = {
      all: allUsers || [],
      withCompanies: usersWithCompanies || [],
      withoutCompanies: usersWithoutCompanies || [],
    }
    usersCount = count || 0
    usersWithCompaniesCount = usersWithCompanies?.length || 0
    usersWithoutCompaniesCount = usersWithoutCompanies?.length || 0
  }

  return (
    <div className="container mx-auto max-w-7xl space-y-8 px-4 py-8 md:px-6">
      {/* Header and Stats */}
      <div className="flex flex-col items-start justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            Discover Your Network
          </h1>
          <p className="mt-1 text-lg text-gray-600 dark:text-gray-400">
            {query
              ? `Found ${usersCount} results for "${query}"`
              : `Found ${usersCount} professionals in your network.`}
          </p>
        </div>
        {!query && (
          <div className="grid grid-cols-2 gap-4">
            <Card className="flex items-center space-x-3 bg-gray-50 p-4 dark:bg-gray-800">
              <div className="flex-shrink-0 rounded-full bg-blue-100 p-2 dark:bg-blue-900/40">
                <Building2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Corporate
                </p>
                <p className="text-lg font-bold">{usersWithCompaniesCount}</p>
              </div>
            </Card>
            <Card className="flex items-center space-x-3 bg-gray-50 p-4 dark:bg-gray-800">
              <div className="flex-shrink-0 rounded-full bg-yellow-100 p-2 dark:bg-yellow-900/40">
                <UserX className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Independent
                </p>
                <p className="text-lg font-bold">{usersWithoutCompaniesCount}</p>
              </div>
            </Card>
          </div>
        )}
      </div>

      <hr className="border-gray-200 dark:border-gray-700" />

      {/* Search Bar and Tabs for Filtering Users */}
      <SearchAndFilter searchParams={searchParams} />

      {/* Conditional Rendering based on Search or Filter */}
      {query ? (
        <div className="mt-6">
          <div className="flex flex-col items-center gap-0">
            {data && 'users' in data && data.users && data.users.length > 0 ? (
              type === 'people' ? (
                data.users.map((user) => (
                  <UserCard key={user.id} user={user} />
                ))
              ) : null
            ) : data && 'companies' in data && data.companies && data.companies.length > 0 ? (
              type === 'companies' ? (
                data.companies.map((company) => (
                  <CompanyCard key={company.id} company={company} />
                ))
              ) : null
            ) : (
              <div className="col-span-full">
                <NoResults query={query} />
              </div>
            )}
          </div>
        </div>
      ) : (
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="flex items-center gap-2 rounded-lg bg-gray-100 p-1 dark:bg-gray-800">
            <TabsTrigger value="all">
              <Users2 className="mr-2 h-4 w-4" /> All Users
            </TabsTrigger>
            <TabsTrigger value="with_companies">
              <Building2 className="mr-2 h-4 w-4" /> Corporate
            </TabsTrigger>
            <TabsTrigger value="without_companies">
              <UserX className="mr-2 h-4 w-4" /> Independents
            </TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-6">
            <div className="flex flex-col items-center gap-0">
              {isDefaultData(data) && data.all.map((user) => (
                <UserCard key={user.id} user={convertToUserWithCompany(user)} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="with_companies" className="mt-6">
            <div className="flex flex-col items-center gap-0">
              {isDefaultData(data) && data.withCompanies.map(
                (user) => <UserCard key={user.id} user={convertToUserWithCompany(user)} />
              )}
            </div>
          </TabsContent>
          <TabsContent value="without_companies" className="mt-6">
            <div className="flex flex-col items-center gap-0">
              {isDefaultData(data) && data.withoutCompanies.map(
                (user) => <UserCard key={user.id} user={convertToUserWithCompany(user)} />
              )}
            </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}

// Main page component
export default async function DiscoverPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const resolvedSearchParams = await searchParams

  return (
    <Suspense fallback={<DiscoverLoading />}>
      <DiscoverContent searchParams={resolvedSearchParams} />
    </Suspense>
  )
}