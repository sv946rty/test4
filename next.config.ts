// next.config.ts

import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import bundleAnalyzer from '@next/bundle-analyzer';

const I18N_REQUEST_PATH = './src/lib/i18n/request.ts';
const BUNDLE_ANALYZER_TRIGGER_VALUE = 'true';

// Enable bundle analyzer when ANALYZE env var is true
// Run `ANALYZE=true pnpm build` to see bundle size report
const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === BUNDLE_ANALYZER_TRIGGER_VALUE,
});

// Base Next.js configuration
const nextConfig: NextConfig = {
  experimental: {
    inlineCss: true,
  },
};

// Internationalization plugin setup
const withNextIntl = createNextIntlPlugin(I18N_REQUEST_PATH);

// Export combined config:
// 1. Wrap with bundle analyzer (optional dev tool)
// 2. Wrap with next-intl (translations support)
export default withBundleAnalyzer(
  withNextIntl({
    ...nextConfig,
  })
);
