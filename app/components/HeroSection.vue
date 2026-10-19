<script setup lang="ts">
defineProps<{
  name: string
  role: string
  tagline: string
  location: string
  availability: string
  focus: string[]
  links: { label: string; href: string }[]
  email: string
  currently: { role: string; company: string }[]
}>()
</script>

<template>
  <section id="top" class="border-b-4 border-ink bg-paper">
    <div class="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-20">
      <p class="font-mono text-sm uppercase tracking-widest text-ink/70">// {{ role }}</p>

      <h1 class="mt-3 max-w-4xl text-5xl font-bold leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
        {{ name }}
      </h1>

      <p class="mt-6 max-w-2xl text-lg leading-snug sm:text-xl">
        {{ tagline }}
      </p>

      <div class="mt-8 flex flex-wrap items-center gap-3">
        <a :href="`mailto:${email}`" class="btn-brutal bg-accent-lime">Email me</a>
        <a
          v-for="link in links"
          :key="link.href"
          :href="link.href"
          :target="link.href.startsWith('http') ? '_blank' : undefined"
          :rel="link.href.startsWith('http') ? 'noopener noreferrer' : undefined"
          class="btn-brutal"
        >
          {{ link.label }}
        </a>
      </div>

      <!-- Status strip: availability, where, and what I am doing right now. -->
      <dl class="mt-10 grid gap-0 border-4 border-ink bg-canvas sm:grid-cols-2 lg:grid-cols-3">
        <div class="border-b-4 border-ink p-4 sm:border-r-4 lg:border-b-0">
          <dt class="font-mono text-[11px] uppercase tracking-widest text-ink/70">Status</dt>
          <dd class="mt-1 text-sm font-medium">{{ availability }}</dd>
        </div>

        <div class="border-b-4 border-ink p-4 lg:border-r-4 lg:border-b-0">
          <dt class="font-mono text-[11px] uppercase tracking-widest text-ink/70">Based in</dt>
          <dd class="mt-1 text-sm font-medium">{{ location }}</dd>
        </div>

        <div class="p-4 sm:col-span-2 lg:col-span-1">
          <dt class="font-mono text-[11px] uppercase tracking-widest text-ink/70">Currently</dt>
          <dd class="mt-1 space-y-0.5 text-sm font-medium">
            <p v-for="job in currently" :key="job.company">{{ job.role }} · {{ job.company }}</p>
          </dd>
        </div>
      </dl>

      <ul class="mt-6 flex flex-wrap gap-2">
        <li v-for="item in focus" :key="item" class="tag bg-paper-2">{{ item }}</li>
      </ul>

      <div v-if="$slots.intro" class="card-brutal mt-8 bg-accent-amber/15 p-5 sm:p-6">
        <slot name="intro" />
      </div>
    </div>
  </section>
</template>
