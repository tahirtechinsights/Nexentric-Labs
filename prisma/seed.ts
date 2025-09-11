import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker'
import { nanoid } from 'nanoid'

const prisma = new PrismaClient()

async function main() {
  console.log(`Starting database seeding... 🌱`)

  // ----- Step 1: Create Categories -----
  const categoryNames = ['Technology', 'Marketing', 'Design', 'Finance', 'Healthcare']
  const categories = await Promise.all(
    categoryNames.map(name =>
      prisma.category.create({
        data: {
          name,
          description: `Category for the ${name} industry.`,
        },
      })
    )
  )
  console.log(`Seeded ${categories.length} categories.`)

  // ----- Step 2: Create Companies and Services -----
  const companies = []
  for (let i = 0; i < 10; i++) {
    const randomCategory = faker.helpers.arrayElement(categories)
    const companyName = faker.company.name()
    const company = await prisma.company.create({
      data: {
        name: companyName,
        slug: faker.helpers.slugify(companyName).toLowerCase(),
        tagline: faker.company.catchPhrase(),
        description: faker.lorem.paragraph(),
        email: faker.internet.email(),
        website: faker.internet.url(),
        category: {
          connect: {
            id: randomCategory.id,
          },
        },
        // Create 3 services for each company
        services: {
          createMany: {
            data: [
              { name: faker.commerce.productName(), description: faker.lorem.sentence() },
              { name: faker.commerce.productName(), description: faker.lorem.sentence() },
              { name: faker.commerce.productName(), description: faker.lorem.sentence() },
            ],
          },
        },
      },
    })
    companies.push(company)
  }
  console.log(`Seeded ${companies.length} companies and their services.`)

  // ----- Step 3: Create Users -----
  const users = []
  for (let i = 0; i < 25; i++) {
    // Create an array with companies and null values for random selection
    const companyOptions = [...companies, null, null, null]
    const companyToAssign = faker.helpers.arrayElement(companyOptions) // 1/3 of users will have no company
    
    const firstName = faker.person.firstName()
    const lastName = faker.person.lastName()
    const email = faker.internet.email({ firstName, lastName })

    const user = await prisma.user.create({
      data: {
        email,
        clerkUserId: `user_${nanoid()}`, // Unique ID for Clerk
        firstName,
        lastName,
        imageUrl: faker.image.avatar(),
        jobTitle: faker.person.jobTitle(),
        xUrl: faker.internet.url(),
        linkedInUrl: faker.internet.url(),
        company: companyToAssign ? {
          connect: {
            slug: companyToAssign.slug
          }
        } : undefined, // Connect to a company or leave undefined
      },
    })
    users.push(user)
  }
  console.log(`Seeded ${users.length} users.`)

  console.log(`Database seeding completed! 🎉`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })