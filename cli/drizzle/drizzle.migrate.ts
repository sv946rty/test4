#!/usr/bin/env tsx
/**
 * CLI: Unified Project Operations (cli-ops)
 * -----------------------------------------
 *
 * This file serves as the **entry point** for Drizzle DB migration
 * operations. It integrates with the unified CLI approach for the project
 * and can be invoked directly or via the central `cli/index.ts`.
 *
 * -------------------------
 * Case 1: Direct execution
 * -------------------------
 * Run the migration command directly via pnpm + tsx:
 *
 *   pnpm tsx cli/drizzle/migrate.ts
 *
 * -------------------------
 * Case 2: Unified CLI via cli/index.ts
 * -------------------------
 * Trigger migrations through the centralized CLI entrypoint:
 *
 *   pnpm tsx cli/index.ts drizzle:migrate
 *
 * -------------------------
 * Notes
 * -------------------------
 * - Reads migration paths from `constants.json`
 * - Uses `drizzle-orm/node-postgres/migrator`
 * - Exits process after completion
 */

import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { db } from './drizzle.db'; // Your Drizzle DB instance

// Load constants from JSON (must include .json in ESM/TSX)
import constants from '../constants.json';

// Resolve the migrations folder path from constants.json
const migrationsFolder = constants.paths.drizzle.migrationsDir;

async function runMigrate() {
  console.log('⏳ Running Drizzle migrations...');
  console.log('📂 Using migrations folder:', migrationsFolder);

  const start = Date.now();

  await migrate(db, { migrationsFolder });

  const end = Date.now();
  console.log('✅ Migrations completed in', end - start, 'ms');
  process.exit(0);
}

runMigrate().catch(err => {
  console.error('❌ Migration failed');
  console.error(err);
  process.exit(1);
});
