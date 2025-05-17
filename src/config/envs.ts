import { z } from 'zod';

const envsSchema = z.object({
  TURSO: z.object({
    URL: z.string(),
    TOKEN: z.string(),
  }),
  SEED: z.coerce.boolean().default(false),
  GITHUB: z.object({
    ID: z.string(),
    SECRET: z.string(),
  }),
});

type Envs = z.infer<typeof envsSchema>;

const envs = {
  TURSO: {
    TOKEN: process.env.TURSO_TOKEN || '',
    URL: process.env.TURSO_URL || '',
  },
  GITHUB: {
    ID: process.env.GITHUB_CLIENT_ID || '',
    SECRET: process.env.GITHUB_CLIENT_SECRET || '',
  },
  SEED: process.env.SEED,
};

export default envsSchema.parse(envs);
