---
title: Quoin
tagline: 'Developer utilities that run entirely in the browser: no uploads, no accounts, no telemetry.'
order: 5
featured: true
role: Solo
tags: [DevTools, Developer Experience, Privacy]
stack: [nuxt, vue, tailwindcss, typescript, bun, cloudflare]
pipelineStage: [Product]
links:
  live: 'https://quoin.izzudd.my.id'
  repo: 'https://github.com/izzudd/quoin'
metrics:
  - { label: 'Payloads uploaded', value: '0' }
status: Live
timeframe: '2026'
---

## Why

Most "online JSON formatter" pages are a textarea in front of a logging server, so pasting a token or
a customer payload into one is a small security incident nobody notices. Quoin takes the opposite
position: every tool is a pure function in the browser, and the data never leaves the tab.

## What I built

- **Grouped by task, not by vendor.** JSON beautifier and tree visualizer, JSON to TypeScript, Zod,
  Pydantic and Go type generator, JSON Schema inference, encoders, slugifier, text and Git diffs,
  timezone conversion, table and CSV editing with SQL `INSERT` output, Markdown conversion. The list
  grows whenever I get annoyed.
- **One registry, one shell.** A single SPA driven by a typed tool registry. The sidebar, the home
  grid and the command palette all read from the same file, so shipping a tool is one page plus one
  entry, not a new app.
- **Built for repetition.** Command palette on `Ctrl+P`, pinnable tools, and drafts that survive a
  reload through `localStorage`, because a utility you use daily should remember your work.
- **Shipped as static assets** on a Cloudflare Worker, built by Workers Builds on every push to
  `main`, gated by lint and typecheck in CI.

## Privacy by construction

No analytics, no cookies, no third-party requests. State lives in page memory or `localStorage` and
never on a server. Keeping the tools pure functions means privacy is a property of the architecture
rather than a promise in a policy page.
