// src/lib/db/schema/activity.ts

import { user } from './auth';

import {
  pgSchema,
  uuid,
  varchar,
  timestamp,
  text,
  vector,
} from 'drizzle-orm/pg-core';
import env from '@/config/env';

const dbSchema = pgSchema(env.DATABASE_SCHEMA);

export const userActivityLogs = dbSchema.table('user_activity_logs', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id)
    .notNull(),
  action: varchar('action', { length: 100 }).notNull(),
  metadata: text('metadata'),
  embedding: vector('embedding', { dimensions: 1536 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
