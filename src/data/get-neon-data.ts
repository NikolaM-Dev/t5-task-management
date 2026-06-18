import { neon } from '@neondatabase/serverless';
import { createServerFn } from '@tanstack/react-start';

import { env } from '#/lib/env';

export const getData = createServerFn({ method: 'GET' }).handler(async () => {
  const sql = neon(env.DATABASE_URL);
  const response = await sql`SELECT version()`;

  return response[0].version;
});
