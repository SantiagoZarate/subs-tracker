import { relations } from 'drizzle-orm';
import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { subscription } from './subscription.schema';

export const company = sqliteTable('company', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
});

export const companyRelations = relations(company, ({ many }) => ({
  subscriptions: many(subscription),
}));
