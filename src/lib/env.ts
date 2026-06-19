import * as v from 'valibot';

const processEnvSchema = v.object({
  DATABASE_URL: v.string(),
});

export const safeEnv = v.parse(processEnvSchema, process.env);
