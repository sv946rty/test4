// src/app/[locale]/layout.tsx  (server-only, no NextIntlClientProvider)
import { notFound } from 'next/navigation';
import { routing } from '@/lib/i18n/routing';
import { type Locale } from '@/lib/i18n/request';

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;
  if (!routing.locales.includes(locale as Locale)) notFound();
  return children;
}
