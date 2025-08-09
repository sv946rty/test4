// src/features/auth/types/auth.ts

import { z } from 'zod';

const nameRegex = new RegExp(String.raw`^[\p{L}\p{M}\s.'-]+$`, 'u');

export const LoginSchema = z.object({
  email: z
    .string()
    .trim()
    .email('Invalid email address')
    .transform(s => s.toLowerCase()),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  rememberMe: z.boolean().optional().default(true),
});

export const RegisterSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Full Name must be at least 2 characters long')
    .max(100, 'Full Name cannot exceed 100 characters')
    .regex(
      nameRegex,
      'Full Name can only contain letters, spaces, apostrophes, hyphens, and periods.'
    ),
  email: z
    .string()
    .trim()
    .email('Invalid email address')
    .transform(s => s.toLowerCase()),
  password: z
    .string()
    .min(8, 'At least 8 characters')
    .regex(/[A-Z]/, 'At least 1 uppercase letter')
    .regex(/[a-z]/, 'At least 1 lowercase letter')
    .regex(/[0-9]/, 'At least 1 number'),
});

export type LoginFormData = z.infer<typeof LoginSchema>;
export type RegisterFormData = z.infer<typeof RegisterSchema>;

/** Optional helpers */
export function flattenErrors(err: z.ZodError) {
  const out: Record<string, string> = {};
  const f = err.format();
  for (const k of Object.keys(f)) {
    if (k === '_errors') continue;
    const first = f[k]?._errors?.[0];
    if (first) out[k] = first;
  }
  return out;
}
