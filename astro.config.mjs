// @ts-check
import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';

import vercel from '@astrojs/vercel';

// Placeholder — replace with the confirmed canonical domain once section 8.1
// of the project spec (corosportugal.pt vs www.corosportugal.pt) is decided.
const SITE_URL = 'https://corosportugal.pt';

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  i18n: {
    defaultLocale: 'pt',
    locales: ['pt', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [sitemap()],
  adapter: vercel(),
});