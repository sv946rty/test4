#!/usr/bin/env tsx
/**
 * CLI: Drizzle DB Reset
 * ---------------------
 *
 * ⚠️ WARNING: This will DROP ALL TABLES in the configured schema!
 * Use with extreme caution in production environments.
 *
 * Features:
 * - Reads schema directory from `constants.json` (generic & future-proof).
 * - Dynamically imports all Drizzle tables instead of using TS path aliases.
 * - Confirms with the user before performing destructive operations.
 *
 * Usage:
 *   pnpm tsx cli/drizzle/drizzle.db.reset.ts
 *
 * Notes:
 * - Ensure that `constants.paths.drizzle.schemaDir` points to the folder
 *   containing your Drizzle tables. If no `index.ts` exists in that folder,
 *   create one exporting all tables or enable the optional glob loader.
 */

import readline from 'readline';
import { db } from './drizzle.db';
import { sql, isTable, getTableName } from 'drizzle-orm';
import { env } from './drizzle.env';
import constants from '../constants.json' assert { type: 'json' };
import path from 'node:path';
import { pathToFileURL } from 'node:url';

/**
 * Dynamically import the schema module
 * ------------------------------------
 * 1. Reads schemaDir from constants.json
 * 2. Resolves to `index.ts` within that directory
 * 3. Imports all tables from that module
 *
 * ⚠️ If no index.ts exists, consider creating one that exports all tables:
 *
 *   // src/lib/db/schema/index.ts
 *   export * from "./users";
 *   export * from "./posts";
 *
 * Or implement a glob import loader for full automation.
 */
async function loadSchema() {
  const schemaDir = constants.paths.drizzle.schemaDir; // e.g. "src/lib/db/schema/"
  const schemaPath = path.resolve(schemaDir, 'index.ts');

  const schemaModule = await import(pathToFileURL(schemaPath).href);
  return schemaModule;
}

/**
 * Prompt the user for a destructive confirmation
 */
const confirmPrompt = (question: string): Promise<boolean> => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise(resolve => {
    rl.question(`${question} (yes/no): `, answer => {
      rl.close();
      const normalized = answer.trim().toLowerCase();
      resolve(normalized === 'yes' || normalized === 'y');
    });
  });
};

/**
 * Drop all tables in the configured schema
 */
const dropTables = async () => {
  const confirmed = await confirmPrompt(
    `⚠️  This will permanently delete ALL tables in schema "${env.DATABASE_SCHEMA}". Continue?`
  );

  if (!confirmed) {
    console.log('❌ Operation cancelled.');
    process.exit(0);
  }

  console.log('🧨 Dropping all tables from schema:', env.DATABASE_SCHEMA);

  // ✅ Dynamically load schema using constants.json
  const schema = await loadSchema();
  const tableObjects = Object.values(schema).filter(isTable);

  for (const table of tableObjects) {
    const tableName = getTableName(table);
    const fullName = `"${env.DATABASE_SCHEMA}"."${tableName}"`;
    console.log(`→ Dropping ${fullName}`);
    await db.execute(sql.raw(`DROP TABLE IF EXISTS ${fullName} CASCADE;`));
  }

  console.log('✅ All tables dropped.');
  process.exit(0);
};

dropTables().catch(err => {
  console.error('❌ Failed to drop tables');
  console.error(err);
  process.exit(1);
});
