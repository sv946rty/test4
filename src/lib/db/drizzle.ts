// File: src/lib/db/drizzle.ts

/**
 * ✅ Purpose:
 * This file sets up the Drizzle client for use **inside the app** — including:
 * - Next.js API routes and server components
 * - RSCs, server actions, route handlers
 * - Auth-aware or user-specific DB access logic
 *
 * It integrates with the runtime environment and config loading system.
 *
 * ⛔ Not for CLI Usage:
 * This file should NOT be used with CLI tools like `drizzle-kit`, `db:migrate`, or `db:seed`.
 * Use `drizzle.cli.ts` instead for those use cases.
 *
 * ⚠️ Why not use this file in CLI scripts?
 *
 * - It depends on `@/config/env`, which includes:
 *   - `zod` validation and runtime-safe guards
 *   - dynamic `.env.${NODE_ENV}` resolution using `dotenv` + `path`
 *   - support for framework behaviors like `process.cwd()` or alias resolution
 *
 * - It may also import other app-specific logic (e.g. auth helpers, RSC helpers),
 *   or assume context available only in Next.js runtime.
 *
 * ❌ These patterns can break CLI tools like `drizzle-kit`, which require:
 *   - Plain `process.env` usage (not wrapped in Zod or dynamic loaders)
 *   - Node-only, framework-free imports
 *   - No module aliasing (like `@/config/...`)
 *
 * ✅ What this file *does*:
 * - Imports a validated `env` object from `@/config/env` (Zod-safe)
 * - Connects to the database using a runtime-aware connection string
 * - Sets up Drizzle with schema for application use
 * - Safe for all runtime access in your Next.js project
 */

import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';
import env from '@/config/env';

const pool = new Pool({
  connectionString: env.DATABASE_URL,
});

export const db = drizzle(pool, { schema });
export type DbClient = typeof db;
