#!/usr/bin/env bun
/**
 * Generates README.md from content/, the same files the site renders.
 *
 *   bun run readme          # write README.md
 *   bun run readme:check    # exit 1 if README.md is stale (used in CI)
 *
 * Nothing here talks to the network or to Nuxt: it reads frontmatter from the
 * Markdown files and prints Markdown. Keep the layout readable on GitHub, not a
 * copy of the site, because GitHub renders no JavaScript.
 */
import { readFileSync, readdirSync, writeFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { parse as parseYaml } from 'yaml'

const ROOT = new URL('..', import.meta.url).pathname
const CONTENT = join(ROOT, 'content')
const README = join(ROOT, 'README.md')
const SITE = 'https://me.izzudd.my.id'

type Frontmatter = Record<string, any>

function splitFrontmatter(file: string): { data: Frontmatter; body: string } {
  const raw = readFileSync(file, 'utf8').replace(/^\uFEFF/, '')
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(raw)
  if (!match) return { data: {}, body: raw.trim() }
  return {
    data: (parseYaml(match[1]) ?? {}) as Frontmatter,
    body: raw.slice(match[0].length).trim(),
  }
}

function readCollection(folder: string): { slug: string; data: Frontmatter; body: string }[] {
  const dir = join(CONTENT, folder)
  if (!existsSync(dir)) return []
  return readdirSync(dir)
    .filter((name) => name.endsWith('.md'))
    .map((name) => {
      const { data, body } = splitFrontmatter(join(dir, name))
      return { slug: name.replace(/\.md$/, ''), data, body }
    })
}

const profile = splitFrontmatter(join(CONTENT, 'profile.md')).data
const experience = readCollection('experience').sort(
  (a, b) => String(b.data.start ?? '').localeCompare(String(a.data.start ?? ''))
)
const projects = readCollection('projects').sort(
  (a, b) => Number(a.data.order ?? 99) - Number(b.data.order ?? 99)
)
const skills = readCollection('skills').sort(
  (a, b) => Number(a.data.order ?? 99) - Number(b.data.order ?? 99)
)
const writing = readCollection('writing').sort(
  (a, b) => Number(a.data.order ?? 99) - Number(b.data.order ?? 99)
)
const testimonials = readCollection('testimonials').sort(
  (a, b) => Number(a.data.order ?? 99) - Number(b.data.order ?? 99)
)

const linkList = (profile.links ?? []) as { label: string; href: string }[]
const siteLink = linkList.find((l) => l.label.toLowerCase() === 'cv')
const externalLinks = linkList.filter((l) => l.href.startsWith('http'))

const out: string[] = []

out.push(`# ${profile.name}`, '')
out.push(`**${profile.role}** · ${profile.location}`, '')
out.push(`> ${profile.tagline}`, '')
out.push(`\`${profile.availability}\``, '')

const contactRow = [
  `[Portfolio](${SITE})`,
  siteLink ? `[CV](${SITE}/cv)` : null,
  ...externalLinks.map((l) => `[${l.label}](${l.href})`),
  `[Email](mailto:${profile.email})`,
].filter(Boolean)
out.push(contactRow.join(' · '), '')

if (skills.length) {
  out.push('## What I do', '')
  out.push(
    skills.map((s) => `**${s.data.stage} ${s.data.title}**`).join(', ') + ', end to end, with evidence below.',
    ''
  )
}

if (experience.length) {
  out.push('## Experience', '')
  out.push('| Role | Company | Period | Type |')
  out.push('| --- | --- | --- | --- |')
  for (const entry of experience) {
    const company = entry.data.companyUrl
      ? `[${entry.data.company}](${entry.data.companyUrl})`
      : entry.data.company
    out.push(`| ${entry.data.role} | ${company} | ${entry.data.period} | ${entry.data.type} |`)
  }
  out.push('')
}

const featured = projects.filter((p) => p.data.featured)
const listed = featured.length ? featured : projects.slice(0, 4)

if (listed.length) {
  out.push('## Selected projects', '')
  for (const project of listed) {
    const href = project.data.links?.live ?? project.data.links?.repo
    const title = href ? `[${project.data.title}](${href})` : `**${project.data.title}**`
    out.push(`### ${title}`, '')
    out.push(project.data.tagline, '')
    const metrics = (project.data.metrics ?? []) as { label: string; value: string }[]
    if (metrics.length) {
      out.push(metrics.map((m) => `\`${m.label}: ${m.value}\``).join(' · '), '')
    }
    const meta: string[] = []
    if (project.data.stack?.length) meta.push(`Stack: ${project.data.stack.join(', ')}`)
    if (project.data.links?.repo) meta.push(`[source](${project.data.links.repo})`)
    if (project.data.links?.live) meta.push(`[live](${project.data.links.live})`)
    if (meta.length) out.push(`<sub>${meta.join(' · ')}</sub>`, '')
  }
}

if (writing.length) {
  out.push('## Writing', '')
  for (const article of writing.slice(0, 6)) {
    out.push(`- [${article.data.title}](${article.data.href}) · ${article.data.outlet}`)
  }
  out.push('')
}

if (testimonials.length) {
  out.push('## Testimonials', '')
  for (const item of testimonials) {
    const quote = item.body.replace(/\s+/g, ' ').trim()
    out.push(`> ${quote}`, `>`, `> **${item.data.name}**, ${item.data.title}${item.data.company ? ` at ${item.data.company}` : ''}`, '')
  }
}

out.push('---', '')
out.push(
  `<sub>This README and the site are generated from the same <a href="./content">content/</a> files. ` +
    `Edit the Markdown there, run <code>bun run readme</code>, and both stay in sync.</sub>`
)

const next = out.join('\n').replace(/\n{3,}/g, '\n\n') + '\n'

if (process.argv.includes('--check')) {
  const current = existsSync(README) ? readFileSync(README, 'utf8') : ''
  if (current !== next) {
    console.error('README.md is out of date. Run: bun run readme')
    process.exit(1)
  }
  console.log('README.md is up to date.')
} else {
  writeFileSync(README, next)
  console.log(`README.md written (${next.length} chars)`)
}
