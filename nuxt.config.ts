import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2026-10-01',
  modules: ['@nuxt/content', '@nuxt/icon', 'nuxt-studio'],

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
      // /cv.html instead of /cv/index.html: Cloudflare then serves /cv with no
      // 307 to /cv/ (redirects in the canonical URL are noisy for a CV link).
      autoSubfolderIndex: false,
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

  // Studio is a dev-time tool on this site: a production build that includes it
  // grows .output/public from 2.5 MB to 8.8 MB (a 648 kB editor chunk is
  // modulepreloaded into the page), so the static deploy switches it off.
  $production: {
    studio: false,
  },

  // Visual editing on top of Nuxt Content. In dev the floating Studio button
  // writes straight to content/*.md on disk; publishing stays a git commit.
  // Production mode (`dev: false`) needs GitHub OAuth secrets — see CONTENT.md.
  studio: {
    repository: {
      provider: 'github',
      owner: 'izzudd',
      repo: 'izzudd',
      branch: 'main',
    },
  },

  devtools: { enabled: false },
})
