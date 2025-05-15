import { z } from 'zod';

const envsSchema = z.object({
  TURSO: z.object({
    URL: z.string(),
    TOKEN: z.string(),
  }),
});

type Envs = z.infer<typeof envsSchema>;

const envs: Envs = {
  TURSO: {
    TOKEN: process.env.TURSO_TOKEN || '',
    URL: process.env.TURSO_URL || '',
  },
};

export default envsSchema.parse(envs);
