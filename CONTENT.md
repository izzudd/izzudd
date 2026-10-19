# Editing this portfolio

The site and `README.md` are both generated from the Markdown files in `content/`.
Nothing is hardcoded in the components: if a section looks empty, the folder is empty.
Open items live in `content/TODO.md`, which is never rendered.

| I want to change | Edit |
| --- | --- |
| name, role, tagline, availability, links | `content/profile.md` (frontmatter) |
| a job or role | `content/experience/<slug>.md` |
| a project | `content/projects/<slug>.md` |
| the skills pipeline | `content/skills/*.md` |
| an article | `content/writing/<slug>.md` |
| a testimonial | `content/testimonials/<slug>.md` |

After editing:

```bash
bun run readme     # regenerate README.md from content/
bun run dev        # local preview on http://localhost:3000
bun run generate   # static build in .output/public
```

CI runs `bun run readme:check` on pull requests and regenerates README on `main`,
so you cannot forget it.

## Frontmatter cheat sheet

### `content/experience/*.md`

```yaml
---
role: Tech Lead
company: Rains
companyUrl: https://example.com   # optional
period: 2025-03 to present
start: '2025-03-01'               # only used for sorting
type: Remote · Full-time
location: Remote
current: true
summary: One sentence about the product and your part in it.
highlights:
  - Led a team of N engineers, owned architecture and review for <product>.
  - Moved <X> to <Y>, p95 latency from A to B.
stack: [typescript, nuxt, go, postgresql]
---
```

Optional extra paragraph(s) shown after the highlights.

Rules of thumb: 2 to 4 highlights, each one an outcome with a number, not a job description.

### `content/projects/*.md`

```yaml
---
title: GenBatik
tagline: One sentence a recruiter can repeat.
order: 1                 # card order
featured: true           # also appears in README
role: Model, backend, and frontend
timeframe: 2024          # omit if unsure, it renders as-is
tags: [AI, Image Generation]
stack: [python, pytorch, nuxt]
pipelineStage: [Model, Serving, Product]
links:
  live: https://example.com
  repo: https://example.com
metrics:
  - { label: 'Generations', value: '12000' }
status: Live
---

## Body

Markdown rendered inside the project dialog. Sections that work well:
problem, what you built, what you would change next.
```

Leave `metrics` out unless the numbers are measured. An empty card is better than an
invented figure. Same for `status` and `timeframe`: if the value is still a guess, delete
the field instead of writing a placeholder, because every field here is rendered verbatim.

### `content/testimonials/*.md`

```yaml
---
name: Rina
title: Engineering Manager
company: Rains
relation: Direct manager
order: 1
---

The quote itself, as Markdown.
```

While the folder contains no `.md` file, the Testimonials section is not rendered at all,
neither on the site nor in the README.

## Deploy

Static output (`.output/public`) is served by the Cloudflare Worker `izzudd-me`:

```bash
bun run generate
npx wrangler deploy --assets=.output/public --name=izzudd-me --compatibility-date=2026-10-01
```

Pushing to `main` runs the same build through Workers Builds.

## Social card

`public/og.png` is the screenshot of `scripts/og-card.html` at 1200x630. It uses the same
woff2 files as the site, so edit the HTML and re-shoot it rather than editing the PNG:

```bash
chrome --headless --screenshot=public/og.png --window-size=1200,630 scripts/og-card.html
```
