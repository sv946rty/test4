// src/app/metadata.ts
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Testimora',
  description: 'Social Proof. Supercharged by AI.',
  icons: {
    icon: [
      { url: '/favicons/favicon-16x16.png', sizes: '16x16' },
      { url: '/favicons/favicon-32x32.png', sizes: '32x32' },
    ],
    apple: [{ url: '/favicons/apple-touch-icon.png', sizes: '180x180' }],
  },
};
