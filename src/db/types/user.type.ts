import { InferSelectModel } from 'drizzle-orm';
import { user } from '../schemas/auth.schema';

export type User = InferSelectModel<typeof user>;

export type UserInsert = Omit<User, 'id'>;
