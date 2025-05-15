import { dbCredentials } from '@/config/get-db-credentials';
import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schemas/index.ts',
  dialect: 'turso',
  strict: true,
  verbose: true,
  dbCredentials,
});
