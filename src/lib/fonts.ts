// src/lib/fonts.ts
import { Geist, Geist_Mono } from 'next/font/google';

export const siteFontSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

export const siteFontMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});
