// ./src/actions/auth/signInWithEmail.ts
'use server';

import { headers } from 'next/headers';
import { z } from 'zod';
import { auth } from '@/lib/auth/better-auth';

const SignInArgsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
  rememberMe: z.boolean().default(true),
});

export type SignInArgs = z.infer<typeof SignInArgsSchema>;

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

type ActionResult =
  | { ok: true; data: z.infer<typeof BetterAuthResultSchema> }
  | { ok: false; message: string; code?: string };

export async function signInWithEmail(args: SignInArgs): Promise<ActionResult> {
  const parsed = SignInArgsSchema.safeParse(args);
  if (!parsed.success) {
    return {
      ok: false,
      message: parsed.error.message,
      code: 'VALIDATION_ERROR',
    };
  }

  try {
    const result = await auth.api.signInEmail({
      body: {
        email: parsed.data.email,
        password: parsed.data.password,
        rememberMe: parsed.data.rememberMe,
      },
      headers: await headers(),
    });

    // ✅ validate the returned object itself (no `.body`)
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
