import { relations } from 'drizzle-orm';
import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { user } from './auth.schema';
import { company } from './company.schema';

export const subscription = sqliteTable('subscription', {
  id: int('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  price: int('price').notNull(),
  startAt: text('start_at').notNull(),
  finishAt: text('finish_at').notNull(),
  notifyWhenCloseToFinish: int('notify_when_close_to_finish', {
    mode: 'boolean',
  }).default(false),
  companyId: text('company_id')
    .references(() => company.id, { onDelete: 'cascade' })
    .notNull(),
  userId: text('user_id')
    .references(() => user.id, { onDelete: 'cascade' })
    .notNull(),
});

export const subscriptionRelations = relations(subscription, ({ one }) => ({
  company: one(company, {
    fields: [subscription.companyId],
    references: [company.id],
  }),
  user: one(user, {
    fields: [subscription.userId],
    references: [user.id],
  }),
}));
