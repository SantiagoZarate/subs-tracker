import { companies } from '@/(app)/sub/create/constants';
import { z } from 'zod';

export const companyDTO = z.object({
  id: z.enum(companies),
  name: z.enum(companies),
});

export type CompanyDTO = z.infer<typeof companyDTO>;
