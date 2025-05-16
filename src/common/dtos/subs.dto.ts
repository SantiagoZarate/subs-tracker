import { z } from 'zod';
import { companyDTO } from './company.dto';

export const subscriptionDTO = z.object({
  id: z.coerce.number(),
  name: z.string(),
  price: z.coerce.number(),
  startAt: z.string(),
  finishAt: z.string(),
  company: companyDTO,
});

export type SubscriptionDTO = z.infer<typeof subscriptionDTO>;
