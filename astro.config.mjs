import { defineConfig } from 'astro/config';

export default defineConfig({
  // Set SITE_URL when a preview/production domain is chosen.
  site: process.env.SITE_URL || 'https://oliviadelegas.vercel.app',
  trailingSlash: 'ignore',
  build: { format: 'directory', inlineStylesheets: 'auto' },
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  image: { responsiveStyles: false },
  devToolbar: { enabled: false },
});
