import { z } from 'zod';

const envsSchema = z.object({
  TURSO: z.object({
    URL: z.string(),
    TOKEN: z.string(),
  }),
  SEED: z.coerce.boolean().default(false),
});

type Envs = z.infer<typeof envsSchema>;

const envs = {
  TURSO: {
    TOKEN: process.env.TURSO_TOKEN || '',
    URL: process.env.TURSO_URL || '',
  },
  SEED: process.env.SEED,
};

export default envsSchema.parse(envs);
