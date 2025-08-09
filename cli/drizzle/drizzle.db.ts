// /cli/drizzle/drizzle.db.ts

// Minimal loader for CLI (drizzle-kit, seeds, etc.)
// ✅ No Zod, just simple existence checks

import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { env } from './drizzle.env';

const pool = new Pool({
  connectionString: env.DATABASE_URL,
});

export const db = drizzle(pool, {});
