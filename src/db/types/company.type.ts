import { InferSelectModel } from 'drizzle-orm';
import { company } from '../schemas/company.schema';

export type Company = InferSelectModel<typeof company>;
