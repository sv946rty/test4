#!/usr/bin/env tsx
/**
 * CLI: Unified Drizzle Operations (cli-ops)
 * -----------------------------------------
 *
 * Supported Commands (Safe for existing DB data):
 *
 *   drizzle:generate → Generate migration files from schema
 *   drizzle:migrate  → Apply existing migrations to the DB
 *   drizzle:pull     → Introspect DB and generate schema.ts
 *   drizzle:check    → Validate schema and migrations
 *   drizzle:up       → Create and run new migrations
 *   drizzle:studio   → Launch Drizzle Studio web UI
 *
 * ⚠️ drizzle:push is intentionally disabled in this CLI.
 *    Use drizzle:init or migrations to avoid dropping data.
 */

import { execSync } from 'node:child_process';
import path from 'node:path';
import constants from '../constants.json' assert { type: 'json' };

// Extract paths from constants.json
const drizzlePaths = constants.paths.drizzle;
const DRIZZLE_CONFIG = path.resolve(process.cwd(), drizzlePaths.config);
const DRIZZLE_MIGRATE = path.resolve(process.cwd(), drizzlePaths.migrate);

// CLI argument
const command = process.argv[2];

function runDrizzleCommand(command: string) {
  let cmd: string | null = null;

  switch (command) {
    case 'drizzle:generate':
      console.log('\n⚡ Generating Drizzle migrations...\n');
      cmd = `npx drizzle-kit generate --config="${DRIZZLE_CONFIG}"`;
      break;

    case 'drizzle:migrate':
      console.log('\n⚡ Running Drizzle migrations...\n');
      cmd = `pnpm tsx "${DRIZZLE_MIGRATE}"`;
      break;

    case 'drizzle:push':
      console.error(`
❌ drizzle:push is DISABLED in this CLI.

⚠️ Reason:
  - drizzle-kit push can DROP existing tables
  - This will result in PERMANENT DATA LOSS

💡 Recommended Actions:
  1. If starting fresh → use your "pnpm tsx cli/index.ts drizzle:init" command instead.
  2. If preserving data → use migrations:
       pnpm tsx cli/index.ts drizzle:generate
       pnpm tsx cli/index.ts drizzle:migrate
`);
      process.exit(0); // Exit cleanly without throwing

    case 'drizzle:pull':
      console.log('\n⚡ Pulling DB schema into Drizzle (introspecting)...\n');
      cmd = `npx drizzle-kit pull --config="${DRIZZLE_CONFIG}"`;
      break;

    case 'drizzle:check':
      console.log('\n⚡ Checking Drizzle schema & migrations...\n');
      cmd = `npx drizzle-kit check --config="${DRIZZLE_CONFIG}"`;
      break;

    case 'drizzle:up':
      console.log('\n⚡ Creating & running new Drizzle migrations...\n');
      cmd = `npx drizzle-kit up --config="${DRIZZLE_CONFIG}"`;
      break;

    case 'drizzle:studio':
      console.log('\n⚡ Launching Drizzle Studio...\n');
      cmd = `npx drizzle-kit studio --config="${DRIZZLE_CONFIG}"`;
      break;

    default:
      console.error(`
❌ Unknown command: ${command}

Available Commands:
  drizzle:generate   → Generate migration files
  drizzle:migrate    → Apply existing migrations
  drizzle:pull       → Introspect DB and generate schema
  drizzle:check      → Validate schema & migrations
  drizzle:up         → Create and run new migrations
  drizzle:studio     → Launch Drizzle Studio

⚠️ drizzle:push is disabled. Use drizzle:init for a fresh DB.

Examples:
  pnpm tsx cli/drizzle/drizzle.cli.ts drizzle:generate
  pnpm tsx cli/drizzle/drizzle.cli.ts drizzle:migrate
  pnpm tsx cli/drizzle/drizzle.cli.ts drizzle:pull
`);
      process.exit(1);
  }

  if (cmd) {
    console.log(`Running Drizzle command: ${cmd}\n`);
    try {
      execSync(cmd, { stdio: 'inherit' });
      console.log(`\n✅ Completed: ${command}\n`);
    } catch (err) {
      console.error(`\n❌ Drizzle command '${command}' failed.\n`, err);
      process.exit(1);
    }
  }
}

runDrizzleCommand(command);
