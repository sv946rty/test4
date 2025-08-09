// src/features/i18n/ClientIntlProvider.tsx

'use client';

import * as React from 'react';
import { NextIntlClientProvider } from 'next-intl';

type Props = {
  locale: string;
  messages: Record<string, unknown>;
  children: React.ReactNode;
};

export default function ClientIntlProvider({
  locale,
  messages,
  children,
}: Props) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
