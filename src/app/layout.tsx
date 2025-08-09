import { SpeedInsights } from '@vercel/speed-insights/next';

import { siteFontSans, siteFontMono } from '@/lib/fonts';

import '@/styles/globals.css';
import { ThemeProvider } from '@/components/theme-provider';

import { metadata } from './metadata';
export { metadata };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${siteFontSans.variable} ${siteFontMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
