// next.config.ts
import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const withNextIntl = createNextIntlPlugin('./src/lib/i18n/request.ts');

const nextConfig: NextConfig = {
  experimental: {
    inlineCss: true,
  },
  productionBrowserSourceMaps: process.env.ANALYZE === 'true',
};

export default withBundleAnalyzer(withNextIntl(nextConfig));
