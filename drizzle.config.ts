import { defineConfig } from 'drizzle-kit';
// import "@/lib/config";
export default defineConfig({
  schema: './backend/db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',

  dbCredentials: {
    host: process.env.DB_HOST || '',
    port: parseInt(process.env.DB_PORT || '5432'),
    user: process.env.DB_USER || '',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE || 'postgres',
  },
  verbose: true,
  strict: true,
  migrations: {
    table: 'migrations',
    schema: 'public',
  },
});
