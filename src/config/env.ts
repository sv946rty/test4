// File: src/config/env.ts
import { z } from 'zod';

// ✅ Helper for required strings
const requiredString = (name: string) =>
  z.string().nonempty(`${name} is required`);

const serverEnvSchema = z.object({
  // Supabase
  SUPABASE_URL: requiredString('SUPABASE_URL'),
  SUPABASE_SERVICE_ROLE_KEY: requiredString('SUPABASE_SERVICE_ROLE_KEY'),

  // Stripe
  STRIPE_SECRET_KEY: requiredString('STRIPE_SECRET_KEY'),
  STRIPE_WEBHOOK_SECRET: z.string().optional(),

  // Resend
  RESEND_API_KEY: requiredString('RESEND_API_KEY'),

  // OpenAI
  OPENAI_API_KEY: requiredString('OPENAI_API_KEY'),

  // JWT
  JWT_SECRET: requiredString('JWT_SECRET'),

  // Database
  DATABASE_URL: requiredString('DATABASE_URL'),
  DATABASE_SCHEMA: requiredString('DATABASE_SCHEMA'),

  // Better Auth
  BETTER_AUTH_SECRET: requiredString('BETTER_AUTH_SECRET'),
  BETTER_AUTH_URL: requiredString('BETTER_AUTH_URL'),

  // Google OAuth
  GOOGLE_CLIENT_ID: requiredString('GOOGLE_CLIENT_ID'),
  GOOGLE_CLIENT_SECRET: requiredString('GOOGLE_CLIENT_SECRET'),
});

const publicEnvSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: requiredString('NEXT_PUBLIC_SUPABASE_URL'),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: requiredString(
    'NEXT_PUBLIC_SUPABASE_ANON_KEY'
  ),

  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: requiredString(
    'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY'
  ),

  NEXT_PUBLIC_APP_NAME: requiredString('NEXT_PUBLIC_APP_NAME'),
  NEXT_PUBLIC_DEFAULT_LOCALE: requiredString('NEXT_PUBLIC_DEFAULT_LOCALE'),

  // Optional analytics ID
  NEXT_PUBLIC_GOOGLE_ANALYTICS_ID: z.string().optional(),
});

// Merge and validate
const envSchema = serverEnvSchema.merge(publicEnvSchema);
type Env = z.infer<typeof envSchema>;

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error(
    '❌ Invalid environment variables:',
    parsedEnv.error.flatten().fieldErrors
  );
  if (process.env.NODE_ENV !== 'development') {
    process.exit(1);
  }
  throw new Error('Invalid environment variables');
}

const env: Env = parsedEnv.data;
export default env;
