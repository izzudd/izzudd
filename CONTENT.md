# Editing this portfolio

The site and `README.md` are both generated from the Markdown files in `content/`.
Nothing is hardcoded in the components: if a section looks empty, the folder is empty.

| I want to… | Edit |
| --- | --- |
| change name, role, tagline, availability, links | `content/profile.md` (frontmatter) |
| add a job / role | drop `content/experience/<slug>.md` |
| add a project | drop `content/projects/<slug>.md` |
| change the skills pipeline | `content/skills/*.md` |
| add an article | drop `content/writing/<slug>.md` |
| add a testimonial | drop `content/testimonials/<slug>.md` |

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
period: 2025-03 — present
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

Optional extra paragraph(s) shown after the highlights.
```

Rules of thumb: 2–4 highlights, each one **outcome + number**, not a job description.

### `content/projects/*.md`

```yaml
---
title: GenBatik
tagline: One sentence a recruiter can repeat.
order: 1                 # card order
featured: true           # also appears in README
role: Solo — model, backend, frontend
timeframe: 2024
tags: [AI, Image Generation]
stack: [python, pytorch, nuxt]
pipelineStage: [Model, Serving, Product]
links:
  live: https://…
  repo: https://…
metrics:
  - { label: 'Generations', value: '12k+' }
status: Live
---

## Body

Markdown rendered inside the project dialog. Sections that work well:
problem → what you built → what you would change next.
```

Leave `metrics` out if you do not have real numbers yet — an empty card looks
better than an invented figure.

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

While the folder only contains `README.txt`, the Testimonials section is not
rendered at all — neither on the site nor in the README.

## Deploy

Static output (`.output/public`) is served by a Cloudflare Worker:

```bash
bun run generate
npx wrangler deploy --assets=.output/public --name=portfolio-v2 --compatibility-date=2026-10-01
```

Pushing to `main` runs the same build through Workers Builds.
