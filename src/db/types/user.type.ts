import { InferSelectModel } from 'drizzle-orm';
import { user } from '../schemas/user.schema';

export type User = InferSelectModel<typeof user>;

export type UserInsert = Omit<User, 'id'>;
