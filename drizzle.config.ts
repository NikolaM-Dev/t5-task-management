import { defineConfig } from 'drizzle-kit';
import process from 'node:process';

import { safeEnv } from '#/lib/env';

process.loadEnvFile();

export default defineConfig({
  schema: './src/lib/db/schema.ts',
  dialect: 'postgresql',
  casing: 'snake_case',
  dbCredentials: {
    url: safeEnv.DATABASE_URL,
  },
});
