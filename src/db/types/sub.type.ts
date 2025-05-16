import { InferSelectModel } from 'drizzle-orm';
import { subscription } from '../schemas/subscription.schema';

export type Subscription = InferSelectModel<typeof subscription>;

export type SubscriptionInsert = Pick<
  Subscription,
  | 'companyId'
  | 'name'
  | 'price'
  | 'finishAt'
  | 'startAt'
  | 'notifyWhenCloseToFinish'
>;
