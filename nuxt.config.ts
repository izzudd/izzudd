import tailwindcss from '@tailwindcss/vite'

/**
 * `db0` (used by Nuxt Content) imports `bun:sqlite` conditionally. When the build runs under
 * Bun, rollup tries to bundle that module for the Cloudflare preset and fails ("externals are
 * not allowed"). On Cloudflare the connector is D1, so the module is never used — point it at
 * an empty stub, same trick as inva.dev.
 */
const stubBunSqlite = () => ({
  name: 'stub-bun-sqlite',
  resolveId(id: string) {
    if (id === 'bun:sqlite') return '\0stub-bun-sqlite'
    return null
  },
  load(id: string) {
    if (id === '\0stub-bun-sqlite') {
      return 'class Database { constructor() {} prepare() { return { run() {}, all() { return [] }, get() { return null } } } close() {} }\nexport { Database }\nexport default { Database }'
    }
    return null
  },
})

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

  // Cloudflare Worker with a server runtime. Pages stay prerendered, so visitors
  // get static HTML from the assets binding; the server only exists for Nuxt
  // Studio's OAuth routes and for Nuxt Content's runtime queries against D1.
  nitro: {
    preset: process.env.NITRO_PRESET || 'cloudflare_module',
    rollupConfig: { plugins: [stubBunSqlite() as any] },
    prerender: {
      routes: ['/', '/cv'],
      crawlLinks: true,
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

  // Visual editing on top of Nuxt Content, in production too: `dev: false` turns on
  // /_studio on the live site. OAuth credentials come from Worker secrets
  // (NUXT_STUDIO_AUTH_GITHUB_CLIENT_ID / _SECRET), never from the repo.
  studio: {
    dev: false,
    repository: {
      provider: 'github',
      owner: 'izzudd',
      repo: 'izzudd',
      branch: 'main',
    },
  },

  devtools: { enabled: false },
})
