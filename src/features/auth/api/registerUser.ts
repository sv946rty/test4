// src/features/auth/api/registerUser.ts

'use server';

import { RegisterSchema, flattenErrors } from '@/features/auth/types/auth';

export type RegisterActionResult =
  | { ok: true }
  | {
      ok: false;
      message: string;
      fieldErrors?: Record<string, string>;
      code?: string;
    };

export async function registerUser(
  input: unknown
): Promise<RegisterActionResult> {
  const parsed = RegisterSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      message: 'Validation failed',
      fieldErrors: flattenErrors(parsed.error),
      code: 'VALIDATION',
    };
  }

  try {
    // Call your API/db here
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL ?? ''}/api/auth/register`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed.data),
        cache: 'no-store',
      }
    );

    if (!res.ok) {
      const json: { error?: string } = await res.json().catch(() => ({}));
      return {
        ok: false,
        message: json.error || 'Registration failed',
        code: 'UNAUTHORIZED',
      };
    }

    return { ok: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return { ok: false, message, code: 'INTERNAL' };
  }
}
