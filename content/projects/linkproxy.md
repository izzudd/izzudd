---
title: LinkProxy
tagline: 'A streaming gateway that turns any file URL into a stable short link without buffering the file.'
order: 8
featured: false
role: Solo
timeframe: '2026'
tags: [Go, Streaming, Infrastructure]
stack: [go, sqlite, redis, htmx, docker]
pipelineStage: [Serving, Product]
links:
  repo: 'https://github.com/izzudd/url-proxy'
metrics: []
status: Open source
---

## The problem

A direct S3 or CDN URL leaks where the file really lives, breaks the day the bucket moves, and
loses range support the moment it is wrapped in a shortener that buffers the response first. I wanted
stable links that still behave like the origin.

## What I built

- **Bounded-memory streaming**: pooled 64 KB buffers from `sync.Pool`, so a multi-gigabyte file streams at O(1) memory with no temporary disk write.
- **Range passthrough**: `Range` and `Content-Range` go through untouched, so video seeking and `curl -C -` resumption work as if you had hit the origin.
- **SSRF protection**: every destination IP is checked against loopback, private IPv4 and IPv6, link-local and non-HTTP schemes, including across redirect chains.
- **Deterministic links**: tracking parameters stripped, remaining query parameters sorted, and a 16-character Base62 id derived from a SHA-256 of the canonical URL, so the same file maps to the same link every time.
- **Dashboard without a build step**: HTMX and Tailwind served from the Go binary, showing bandwidth served, access counts, searchable file records and live request metrics.
- **Two storage modes**: pure-Go SQLite in WAL mode with zero CGO, plus an optional Redis cache that degrades to SQLite on its own when Redis is absent or unreachable.

The admin API sits behind basic auth while the public `/p/{id}` links stay unauthenticated, because
the point of a mirror link is that the person you send it to does not need an account.
