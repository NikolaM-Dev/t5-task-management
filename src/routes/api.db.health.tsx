import { neon } from '@neondatabase/serverless';
import { createFileRoute } from '@tanstack/react-router';

import { safeEnv } from '#/lib/env';

export const Route = createFileRoute('/api/db/health')({
  server: {
    handlers: {
      GET: async () => {
        const sql = neon(safeEnv.DATABASE_URL);

        try {
          const response = await sql`SELECT version();`;
          if (response.length === 0 || typeof response[0].version !== 'string') {
            return Response.json(
              {
                isOK: false,
                message: 'DB is not healthy',
                service: 'database',
              },
              { status: 503 },
            );
          }

          return Response.json({
            isOK: true,
            message: 'DB is healthy',
            service: 'database',
          });
        } catch (error) {
          console.error(error);
          return Response.json(
            {
              isOK: false,
              message: 'DB is not healthy',
              service: 'database',
            },
            { status: 503 },
          );
        }
      },
    },
  },
});
