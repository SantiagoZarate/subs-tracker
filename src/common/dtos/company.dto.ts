import { companies } from '@/(app)/sub/create/constants';
import { z } from 'zod';

export const companyDTO = z.object({
  id: z.string(),
  name: z.enum(companies),
});
