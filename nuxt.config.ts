import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2026-10-01',
  modules: ['@nuxt/content', '@nuxt/icon'],

  css: [
    '@fontsource/space-grotesk/400.css',
    '@fontsource/space-grotesk/500.css',
    '@fontsource/space-grotesk/700.css',
    '@fontsource/jetbrains-mono/400.css',
    '@fontsource/jetbrains-mono/700.css',
    '~/assets/css/main.css',
  ],

  vite: {
    plugins: [tailwindcss()],
  },

  // Fully static: every route is prerendered at build time and shipped to a
  // Cloudflare Worker as assets (same pattern as inva.dev).
  nitro: {
    preset: 'static',
    prerender: {
      routes: ['/', '/cv'],
    },
  },

  content: {
    // Content is read at build time only; no runtime database needed.
    experimental: { sqliteConnector: 'native' },
  },

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      viewport: 'width=device-width, initial-scale=1',
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    },
  },

  devtools: { enabled: false },
})
