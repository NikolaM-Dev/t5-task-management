import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

import { safeEnv } from '#/lib/env';

export const db = drizzle({
  client: neon(safeEnv.DATABASE_URL),
  casing: 'snake_case',
});
