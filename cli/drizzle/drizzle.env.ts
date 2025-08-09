// /cli/drizzle/drizzle.env.ts

// Minimal loader for CLI (drizzle-kit, seeds, etc.)
// ✅ No Zod, just simple existence checks

import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
dotenv.config(); // fallback to .env

function requireEnv(name: string, fallback?: string) {
  const value = process.env[name] ?? fallback;
  if (!value) {
    console.error(`❌ Missing required environment variable: ${name}`);
    process.exit(1); // Hard fail for CLI use
  }
  return value;
}

export const env = {
  DATABASE_URL: requireEnv('DATABASE_URL'),
  DATABASE_SCHEMA: process.env.DATABASE_SCHEMA || 'public', // optional with default,
  GOOGLE_CLIENT_ID: requireEnv('GOOGLE_CLIENT_ID'),
  GOOGLE_CLIENT_SECRET: requireEnv('GOOGLE_CLIENT_SECRET'),
};
