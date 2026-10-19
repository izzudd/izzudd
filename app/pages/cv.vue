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
  title: 'CV · Daffa Izzuddin',
  meta: [{ name: 'robots', content: 'noindex' }],
})
</script>

<template>
  <div v-if="profile" class="mx-auto max-w-3xl px-5 py-8 print:px-0 print:py-0">
    <div class="no-print mb-6 flex flex-wrap items-center gap-3">
      <NuxtLink to="/" class="btn">Back</NuxtLink>
      <button type="button" class="btn btn-primary" @click="() => window.print()">
        Print this page
      </button>
    </div>

    <header class="border-b-2 border-ink pb-4">
      <h1 class="text-3xl font-bold tracking-[-0.02em]">{{ profile.name }}</h1>
      <p class="mt-1 text-sm font-medium">{{ profile.role }} · {{ profile.location }}</p>
      <p class="mt-3 max-w-xl text-sm leading-relaxed">{{ profile.tagline }}</p>
      <p class="mt-3 text-xs">
        <a :href="`mailto:${profile.email}`" class="underline decoration-1 underline-offset-2">{{ profile.email }}</a>
        <template v-for="link in profile.links.filter((l: { href: string }) => l.href !== '/cv')" :key="link.href">
          · <a :href="link.href" class="underline decoration-1 underline-offset-2">{{ link.label }}</a>
        </template>
      </p>
    </header>

    <section class="mt-7">
      <h2 class="text-xs font-bold uppercase">Experience</h2>
      <div class="mt-3 space-y-5">
        <article v-for="entry in experience ?? []" :key="entry.path" class="break-inside-avoid">
          <div class="flex flex-wrap items-baseline gap-x-2">
            <h3 class="font-bold">{{ entry.role }}</h3>
            <span class="text-sm">· {{ entry.company }}</span>
            <span class="tech ml-auto text-xs">{{ entry.period }}</span>
          </div>
          <p class="text-xs text-ink/60">
            {{ [entry.type, entry.location].filter((v: string, i: number, a: string[]) => a.indexOf(v) === i).join(' · ') }}
          </p>
          <p v-if="entry.summary" class="mt-1 text-sm leading-relaxed">{{ entry.summary }}</p>
          <ul v-if="entry.highlights?.length" class="mt-1 list-disc space-y-0.5 pl-5 text-sm leading-relaxed">
            <li v-for="line in entry.highlights" :key="line">{{ line }}</li>
          </ul>
          <p v-if="entry.stack?.length" class="tech mt-1 text-xs">{{ entry.stack.join(', ') }}</p>
        </article>
      </div>
    </section>

    <section class="mt-7">
      <h2 class="text-xs font-bold uppercase">Selected projects</h2>
      <div class="mt-3 space-y-3">
        <article v-for="project in projects ?? []" :key="project.path" class="break-inside-avoid">
          <div class="flex flex-wrap items-baseline gap-x-2">
            <h3 class="font-bold">{{ project.title }}</h3>
            <span class="tech text-xs">{{ (project.tags ?? []).join(', ') }}</span>
          </div>
          <p class="text-sm leading-relaxed">{{ project.tagline }}</p>
          <p v-if="project.links?.live" class="tech text-xs underline underline-offset-2">
            {{ project.links.live }}
          </p>
        </article>
      </div>
    </section>

    <section class="mt-7">
      <h2 class="text-xs font-bold uppercase">Skills</h2>
      <dl class="mt-3 grid gap-2 sm:grid-cols-2">
        <div v-for="stage in stages ?? []" :key="stage.path" class="break-inside-avoid">
          <dt class="text-xs font-bold">{{ stage.title }}</dt>
          <dd class="text-sm leading-relaxed">
            {{ (stage.items ?? []).map((item: { name: string }) => item.name).join(', ') }}
          </dd>
        </div>
      </dl>
    </section>
  </div>
</template>
