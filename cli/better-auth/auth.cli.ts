#!/usr/bin/env tsx

/**
 * CLI: Better Auth (TSX version)
 * ------------------------------
 *
 * Usage (direct via pnpm + tsx):
 *   pnpm tsx cli/better-auth/auth.cli.ts auth:generate
 *   pnpm tsx cli/better-auth/auth.cli.ts auth:migrate
 *
 * Recommended package.json scripts:
 *   {
 *     "scripts": {
 *       "auth:generate": "pnpm tsx cli/better-auth/auth.cli.ts auth:generate",
 *       "auth:migrate": "pnpm tsx cli/better-auth/auth.cli.ts auth:migrate"
 *     }
 *   }
 *
 * Then run short aliases:
 *   pnpm auth:generate
 *   pnpm auth:migrate
 *
 * Notes:
 * - This script now uses TSX for TypeScript execution.
 * - Supports async/await and works in Node 18+.
 */

import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

// Load constants.json (works in TSX/ESM)
import constants from '../constants.json';

const BA_CONFIG_PATH = path.resolve(
  process.cwd(),
  constants.paths.betterAuth.config
);
const BA_SCHEMA_OUTPUT_PATH = path.resolve(
  process.cwd(),
  constants.paths.betterAuth.schemaOutput
);
const BA_OUTPUT_DIR = path.resolve(
  process.cwd(),
  constants.paths.betterAuth.outputDir
);

/** Generate Better Auth schema */
export async function generateAuthSchema() {
  console.log('\n⚡ Generating Better Auth schema...');
  fs.mkdirSync(BA_OUTPUT_DIR, { recursive: true });

  execSync(
    `npx @better-auth/cli generate --config=${BA_CONFIG_PATH} --output=${BA_SCHEMA_OUTPUT_PATH}`,
    { stdio: 'inherit' }
  );

  console.log('✅ Schema generated:', BA_SCHEMA_OUTPUT_PATH, '\n');
}

/** Example migration function */
export async function migrateAuthSchema() {
  console.log('\n⚡ Migrating Auth schema...');
  console.log(
    '\nNOTE: [Better Auth]: The migrate command only works with the built-in Kysely adapter. For Drizzle, run `npx @better-auth/cli generate` to create the schema, then use Drizzle’s migrate or push to apply it.'
  );
  console.log('\n...Running Drizzle Migrate now');
  execSync(`pnpm tsx cli/index.ts drizzle:migrate`, {
    stdio: 'inherit',
  });
  console.log('✅ Migration complete\n');
}

/** CLI Entrypoint */
async function main() {
  const cmd = process.argv[2];

  switch (cmd) {
    case 'auth:generate':
      await generateAuthSchema();
      break;
    case 'auth:migrate':
      await migrateAuthSchema();
      break;
    default:
      console.error('❌ Unknown command:', cmd);
      console.log('Available commands:');
      console.log('  auth:generate   Generate Better Auth schema');
      console.log('  auth:migrate    Migrate Better Auth schema\n');
      process.exit(1);
  }
}

main();
