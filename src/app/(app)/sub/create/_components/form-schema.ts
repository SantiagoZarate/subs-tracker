import { z } from 'zod';
import { companies } from '../constants';

export const createSubFormSchema = z.object({
  name: z.string(),
  service: z.enum(companies),
  price: z.coerce.number().min(1),
});

export type CreateSubFormSchema = z.infer<typeof createSubFormSchema>;
