import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const subscription = sqliteTable('subscription', {
  id: int('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  price: int('price').notNull(),
});
