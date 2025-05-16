import { z } from 'zod';
import { companies } from '../constants';

export const timeIntervals = ['day', 'week', 'month', 'year'] as const;

export const createSubFormSchema = z.object({
  name: z.string(),
  service: z.enum(companies),
  price: z.coerce.number().min(1),
  startAt: z.date(),
  duration: z.coerce.number().min(1, 'Invalid duration'),
  timeInterval: z.enum(timeIntervals),
  notifyWhenCloseToFinish: z.coerce.boolean(),
});

export type CreateSubFormSchema = z.infer<typeof createSubFormSchema>;
