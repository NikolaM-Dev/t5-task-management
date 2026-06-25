import * as t from 'drizzle-orm/pg-core';

function withIdAndTimestamps<TColumns extends Record<string, t.PgColumnBuilderBase>>(
  columns: TColumns,
) {
  return {
    id: t.bigint({ mode: 'number' }).primaryKey().generatedByDefaultAsIdentity(),
    ...columns,
    createdAt: t.timestamp({ withTimezone: true }).notNull().defaultNow(),
    updatedAt: t
      .timestamp({ withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdateFn(() => new Date()),
    deletedAt: t.timestamp({ withTimezone: true }),
  };
}

export const usersTable = t.pgTable(
  'users',
  withIdAndTimestamps({
    name: t.varchar().notNull(),
    email: t.varchar().notNull(),
    passwordHash: t.text().notNull(),
  }),
  (table) => [t.uniqueIndex().on(table.email)],
);

export const projectsTable = t.pgTable(
  'projects',
  withIdAndTimestamps({
    ownerId: t
      .bigint({ mode: 'number' })
      .notNull()
      .references(() => usersTable.id),
    name: t.varchar().notNull(),
    description: t.text(),
  }),
);
