<script setup lang="ts">
const { data: profile } = await useAsyncData('cv-profile', () => queryCollection('profile').first())
const { data: experience } = await useAsyncData('cv-experience', () =>
  queryCollection('experience').order('start', 'DESC').all()
)
const { data: projects } = await useAsyncData('cv-projects', () =>
  queryCollection('projects').order('order', 'ASC').all()
)
const { data: stages } = await useAsyncData('cv-skills', () =>
  queryCollection('skills').order('order', 'ASC').all()
)

useHead({
  title: 'CV — Daffa Izzuddin',
  meta: [{ name: 'robots', content: 'noindex' }],
})
</script>

<template>
  <div v-if="profile" class="mx-auto max-w-3xl px-5 py-8 print:px-0 print:py-0">
    <div class="no-print mb-6 flex flex-wrap items-center gap-3">
      <NuxtLink to="/" class="btn-brutal">← Back</NuxtLink>
      <button type="button" class="btn-brutal bg-accent-lime" @click="() => window.print()">
        Print / Save as PDF
      </button>
      <span class="font-mono text-xs text-ink/70">Halaman ini memang dibuat untuk dicetak.</span>
    </div>

    <header class="border-b-4 border-ink pb-4">
      <h1 class="text-3xl font-bold">{{ profile.name }}</h1>
      <p class="mt-1 font-mono text-sm uppercase tracking-wide">{{ profile.role }} · {{ profile.location }}</p>
      <p class="mt-3 text-sm leading-relaxed">{{ profile.tagline }}</p>
      <p class="mt-3 font-mono text-xs">
        <a :href="`mailto:${profile.email}`" class="underline decoration-2 underline-offset-2">{{ profile.email }}</a>
        <template v-for="link in profile.links" :key="link.href">
          · <a :href="link.href" class="underline decoration-2 underline-offset-2">{{ link.label }}</a>
        </template>
      </p>
    </header>

    <section class="mt-6">
      <h2 class="font-mono text-sm font-bold uppercase tracking-[0.2em]">Experience</h2>
      <div class="mt-3 space-y-4">
        <article v-for="entry in experience ?? []" :key="entry.path" class="break-inside-avoid">
          <div class="flex flex-wrap items-baseline gap-x-2">
            <h3 class="font-bold">{{ entry.role }}</h3>
            <span class="text-sm">· {{ entry.company }}</span>
            <span class="ml-auto font-mono text-xs text-ink/70">{{ entry.period }}</span>
          </div>
          <p class="font-mono text-[11px] uppercase tracking-wide text-ink/65">
            {{ [entry.type, entry.location].filter((v: string, i: number, a: string[]) => a.indexOf(v) === i).join(' · ') }}
          </p>
          <p v-if="entry.summary" class="mt-1 text-sm leading-relaxed">{{ entry.summary }}</p>
          <ul v-if="entry.highlights?.length" class="mt-1 list-disc space-y-0.5 pl-5 text-sm leading-relaxed">
            <li v-for="line in entry.highlights" :key="line">{{ line }}</li>
          </ul>
          <p v-if="entry.stack?.length" class="mt-1 font-mono text-[11px] text-ink/70">
            {{ entry.stack.join(' · ') }}
          </p>
        </article>
      </div>
    </section>

    <section class="mt-6">
      <h2 class="font-mono text-sm font-bold uppercase tracking-[0.2em]">Selected projects</h2>
      <div class="mt-3 space-y-3">
        <article v-for="project in projects ?? []" :key="project.path" class="break-inside-avoid">
          <div class="flex flex-wrap items-baseline gap-x-2">
            <h3 class="font-bold">{{ project.title }}</h3>
            <span class="font-mono text-xs text-ink/70">{{ (project.tags ?? []).join(' · ') }}</span>
          </div>
          <p class="text-sm leading-relaxed">{{ project.tagline }}</p>
          <p v-if="project.links?.live" class="font-mono text-[11px] underline underline-offset-2">
            {{ project.links.live }}
          </p>
        </article>
      </div>
    </section>

    <section class="mt-6">
      <h2 class="font-mono text-sm font-bold uppercase tracking-[0.2em]">Skills</h2>
      <dl class="mt-3 grid gap-2 sm:grid-cols-2">
        <div v-for="stage in stages ?? []" :key="stage.path" class="break-inside-avoid">
          <dt class="font-mono text-xs font-bold uppercase">{{ stage.title }}</dt>
          <dd class="text-sm leading-relaxed">
            {{ (stage.items ?? []).map((item: { name: string }) => item.name).join(', ') }}
          </dd>
        </div>
      </dl>
    </section>

    <p class="mt-8 border-t-2 border-ink pt-3 font-mono text-[10px] text-ink/65">
      Generated from the same content files as me.izzudd.my.id — no separate CV document to keep in sync.
    </p>
  </div>
</template>
