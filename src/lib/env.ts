import * as v from 'valibot';

const envVariables = v.object({
  DATABASE_URL: v.string(),
});

export const env = v.parse(envVariables, process.env);
