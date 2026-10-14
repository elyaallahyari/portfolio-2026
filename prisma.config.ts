import 'dotenv/config' // so migrate sees DATABASE_URL from .env
import { defineConfig } from 'prisma/config'
import { PrismaPg } from '@prisma/adapter-pg'

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations'
  },
  migrate: {
    // Prisma 7: Migrate connects through a driver adapter, not a URL string
    adapter: async () => {
      return new PrismaPg({ connectionString: process.env.DATABASE_URL! })
    }
  }
})
