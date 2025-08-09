// src/features/auth/api/signInWithEmail.ts
'use server';

import { headers } from 'next/headers';
import { z } from 'zod';
import { auth } from '@/lib/auth/better-auth';
import { LoginSchema, flattenErrors } from '@/features/auth/types/auth';

const BetterAuthResultSchema = z.object({
  redirect: z.boolean(),
  token: z.string(),
  url: z.string().optional(),
  user: z.object({
    id: z.string(),
    email: z.string().email().optional(),
    name: z.string().optional(),
    image: z.string().nullable().optional(),
    emailVerified: z.union([z.string(), z.date()]).nullable().optional(),
  }),
});

export type SignInActionResult =
  | { ok: true; data: z.infer<typeof BetterAuthResultSchema> }
  | {
      ok: false;
      message: string;
      fieldErrors?: Record<string, string>;
      code?: string;
    };

export async function signInWithEmail(
  input: unknown
): Promise<SignInActionResult> {
  const parsed = LoginSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      message: 'Validation failed',
      fieldErrors: flattenErrors(parsed.error),
      code: 'VALIDATION',
    };
  }

  try {
    const result = await auth.api.signInEmail({
      body: parsed.data,
      headers: await headers(),
    });

    const validated = BetterAuthResultSchema.safeParse(result);
    if (!validated.success) {
      return {
        ok: false,
        message: 'Invalid response from auth server',
        code: 'BAD_RESPONSE',
      };
    }

    return { ok: true, data: validated.data };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return { ok: false, message, code: 'INTERNAL' };
  }
}
