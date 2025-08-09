/* Runs from Terminal with: 
  >> npx @better-auth/cli generate --config=cli/better-auth/auth.ts --output=cli/better-auth/output/auth-schema.ts 
*/

/**
 * ✅ Self-contained CLI-safe Better Auth + Drizzle PostgreSQL config
 * - Loads `.env.local` then `.env`
 * - No external imports like env.ts
 * - Works for `@better-auth/cli generate`
 */

import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { admin, organization } from 'better-auth/plugins';

import { db } from '../drizzle/drizzle.db';
import { env } from '../drizzle/drizzle.env';

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
  }),

  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID as string,
      clientSecret: env.GOOGLE_CLIENT_SECRET as string,
    },
  },

  plugins: [admin(), organization()],
});
