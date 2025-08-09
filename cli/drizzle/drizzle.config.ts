// File: drizzle.config.ts

import { defineConfig } from 'drizzle-kit';
import { env } from './drizzle.env'; // using CLI-safe .env.local loader

import * as constants from '../constants.json';

const SCHEMA_GLOB = constants.paths.drizzle.schemaGlob;
const MIGRATIONS_DIR = constants.paths.drizzle.migrationsDir;

export default defineConfig({
  schema: SCHEMA_GLOB, // "/src/lib/db/schema/**"
  out: MIGRATIONS_DIR, // "cli/drizzle/migrations"
  dialect: 'postgresql',
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  /*
  Why use schemaFilter?
  Without schemaFilter, Drizzle might:
    Inspect all schemas in the database (including public, auth, etc.).
    Generate table definitions for every schema, even if irrelevant.
    Cause naming collisions or extra clutter.
  By filtering, you:
    Prevent unintended table generation.
    Ensure you’re only targeting your intended schema (e.g., my_app_schema).
  */
  schemaFilter: env.DATABASE_SCHEMA,
});
