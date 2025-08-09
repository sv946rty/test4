#!/usr/bin/env tsx
/**
 * CLI: Unified Project Operations (cli-ops)
 * -----------------------------------------
 *
 * Entry point for all CLI operations (Drizzle DB, Better Auth, etc.).
 *
 * ======================
 * 🚀 Usage Examples
 * ======================
 *
 * 1️⃣ **Recommended for first-time setup**:
 *
 *   pnpm tsx cli/index.ts drizzle:init
 *
 *      - Resets the database (auto-yes)
 *      - Removes old Drizzle migrations folder
 *      - Generates new migrations
 *      - Applies all migrations
 *
 *   ⚡ This is the **one-stop command** to fully reset & initialize your DB.
 *
 * 2️⃣ **Other commands (use only if needed)**:
 *
 *   pnpm tsx cli/index.ts drizzle:generate   # Generate migrations only
 *   pnpm tsx cli/index.ts drizzle:migrate    # Apply existing migrations
 *   pnpm tsx cli/index.ts drizzle:reset      # Drop & recreate DB schema
 *
 *   pnpm tsx cli/index.ts auth:generate      # Better Auth schema generation
 *   pnpm tsx cli/index.ts auth:migrate       # Better Auth migration only
 *
 * -------------------------
 * Notes & Best Practices
 * -------------------------
 * - Prefer `drizzle:init` for clean setup & re-initialization.
 * - Use other commands **only for incremental DB changes**.
 * - Keeps all operational scripts centralized under `cli-ops`.
 */

import { execSync } from 'node:child_process';
import path from 'node:path';

const DRIZZLE_CLI = path.resolve('cli/drizzle/drizzle.cli.ts');
const DRIZZLE_RESET = path.resolve('cli/drizzle/drizzle.db.reset.ts');
const DRIZZLE_INIT = path.resolve('cli/drizzle/drizzle.init.ts'); // ✅ full reset + generate + migrate
const AUTH_CLI = path.resolve('cli/better-auth/auth.cli.ts');

const command = process.argv[2];

function run(command: string) {
  switch (command) {
    // ----------------------
    // Drizzle DB operations
    // ----------------------
    case 'drizzle:init': // ✅ Recommended first-time command
      execSync(`pnpm tsx "${DRIZZLE_INIT}"`, { stdio: 'inherit' });
      break;

    case 'drizzle:generate':
    case 'drizzle:push':
    case 'drizzle:pull':
    case 'drizzle:check':
    case 'drizzle:up':
    case 'drizzle:studio':
    case 'drizzle:migrate':
      execSync(`pnpm tsx "${DRIZZLE_CLI}" ${command}`, { stdio: 'inherit' });
      break;

    case 'drizzle:reset': // ⚠️ Destroys all tables
      execSync(`pnpm tsx "${DRIZZLE_RESET}"`, { stdio: 'inherit' });
      break;

    // ----------------------
    // Better Auth operations
    // ----------------------
    case 'auth:generate':
    case 'auth:migrate':
      execSync(`pnpm tsx "${AUTH_CLI}" ${command}`, { stdio: 'inherit' });
      break;

    // ----------------------
    // Unknown command
    // ----------------------
    default:
      console.error(`
❌ Unknown command: ${command}

Available commands:
  drizzle:init      (⚡ Full reset + generate + migrate)
  drizzle:generate  | drizzle:push | drizzle:pull
  drizzle:check     | drizzle:up   | drizzle:studio
  drizzle:migrate   | drizzle:reset (⚠️ Drops all tables)

  auth:generate     | auth:migrate
`);
      process.exit(1);
  }
}

run(command);
