// src/app/[locale]/(public)/layout.tsx

import { getMessages } from 'next-intl/server';
import ClientIntlProvider from '@/features/i18n/ClientIntlProvider';

export default async function PublicLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <ClientIntlProvider locale={locale} messages={messages}>
      {children}
    </ClientIntlProvider>
  );
}
