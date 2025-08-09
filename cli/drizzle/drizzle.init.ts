#!/usr/bin/env tsx
/**
 * =============================================================================
 *  Drizzle Init Script (Shell-Free)
 * =============================================================================
 *
 *  This script performs a **full database initialization** for Drizzle ORM:
 *
 *    1️⃣ Reset Database Schema
 *        - Invokes `drizzle.db.reset.ts` to drop and recreate the schema.
 *        - Clears all tables and data non-interactively.
 *
 *    2️⃣ Remove Old Migrations Folder
 *        - Deletes the existing migration folder to start fresh.
 *
 *    3️⃣ Generate New Migrations
 *        - Runs `drizzle-kit generate` using the configured Drizzle schema files.
 *
 *    4️⃣ Apply Migrations
 *        - Executes `drizzle-kit migrate` to fully populate the database schema.
 *
 *  ⚡ Features:
 *    - Fully **non-interactive**: no manual confirmation required.
 *    - Uses **spawnSync** for shell-free execution and proper argument handling.
 *    - Prints clear step-by-step logs and a final success message.
 *
 *  📦 Requirements:
 *    - `pnpm` must be installed globally or accessible in your PATH.
 *    - Environment variables must be loaded from `.env.local` or `.env`.
 *    - `constants.json` must define:
 *
 *        {
 *          "paths": {
 *            "drizzle": {
 *              "config": "cli/drizzle/drizzle.config.ts",
 *              "migrationsDir": "cli/drizzle/migrations"
 *            }
 *          }
 *        }
 *
 *  🛠 Usage:
 *
 *      # 1. Run directly with tsx
 *      pnpm tsx cli/drizzle/drizzle.init.ts
 *
 *      # 2. Or add to package.json scripts
 *      "scripts": {
 *        "db:init": "tsx cli/drizzle/drizzle.init.ts"
 *      }
 *
 *      pnpm db:init
 *
 *  ✅ After successful execution:
 *      - Your `${DATABASE_SCHEMA}` is fully reset & populated.
 *      - A new migrations folder is created under constants.paths.drizzle.migrationsDir.
 *
 * =============================================================================
 */

import { spawnSync, spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
dotenv.config();

import constants from '../constants.json' assert { type: 'json' };

const DRIZZLE_CONFIG = path.resolve(
  process.cwd(),
  constants.paths.drizzle.config
);
const MIGRATIONS_DIR = path.resolve(
  process.cwd(),
  constants.paths.drizzle.migrationsDir
);
const RESET_SCRIPT = path.resolve(
  process.cwd(),
  'cli/drizzle/drizzle.db.reset.ts'
);

const schemaName = process.env.DATABASE_SCHEMA || 'public';

function logStep(title: string) {
  console.log(`\n🔹 ${title}`);
}

function runCommand(bin: string, args: string[]) {
  console.log(`\n⚡ Executing: ${[bin, ...args].join(' ')}\n`);
  const result = spawnSync(bin, args, { stdio: 'inherit', shell: false });

  if (result.error) throw result.error;
  if (result.status !== 0)
    throw new Error(
      `${bin} ${args.join(' ')} exited with code ${result.status}`
    );
}

async function runResetScriptWithYes() {
  return new Promise<void>((resolve, reject) => {
    console.log(`\n⚡ Resetting DB schema with auto-confirmation...`);
    const child = spawn('pnpm', ['tsx', RESET_SCRIPT], {
      stdio: ['pipe', 'inherit', 'inherit'],
      shell: false,
    });

    // Auto-answer "yes" once the process is ready
    setTimeout(() => {
      try {
        child.stdin.write('yes\n');
        child.stdin.end();
      } catch (e) {
        console.error('⚠️ Failed to send yes:', e);
      }
    }, 300);

    child.on('exit', code => {
      if (code === 0) resolve();
      else reject(new Error(`Reset script exited with code ${code}`));
    });

    child.on('error', reject);
  });
}

(async () => {
  try {
    // 1️⃣ Resetting DB schema (auto-yes)
    logStep('Step 1: Resetting DB schema...');
    await runResetScriptWithYes();

    // 2️⃣ Drop Drizzle Kit Migration folder if exists
    logStep('Step 2: Removing old migrations folder...');
    if (fs.existsSync(MIGRATIONS_DIR)) {
      fs.rmSync(MIGRATIONS_DIR, { recursive: true, force: true });
      console.log(`✅ Removed old migrations folder: ${MIGRATIONS_DIR}`);
    } else {
      console.log('ℹ️ No existing migrations folder to remove.');
    }

    // 3️⃣ Generate new migrations
    logStep('Step 3: Generating new migrations...');
    runCommand('pnpm', [
      'drizzle-kit',
      'generate',
      `--config=${DRIZZLE_CONFIG}`,
    ]);

    // 4️⃣ Execute migrations
    logStep('Step 4: Applying migrations...');
    runCommand('pnpm', [
      'drizzle-kit',
      'migrate',
      `--config=${DRIZZLE_CONFIG}`,
    ]);

    console.log(
      `\n✅ SUCCESS: Database schema "${schemaName}" is now fully populated and a new migration folder is created at:\n${MIGRATIONS_DIR}\n`
    );
  } catch (err: unknown) {
    console.error('\n❌ ERROR: Drizzle init procedure failed.');

    // Narrow before logging message
    if (err instanceof Error) {
      console.error(err.message);
    } else if (typeof err === 'string') {
      console.error(err);
    } else {
      console.error(JSON.stringify(err));
    }

    // Set exit code and allow process to end naturally
    process.exitCode = 1;
  }
})();
