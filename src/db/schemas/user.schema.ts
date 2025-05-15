import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const user = sqliteTable('user', {
  id: int('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
});
