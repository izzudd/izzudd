<script setup lang="ts">
defineProps<{
  name: string
  role: string
  tagline: string
  location: string
  availability: string
  links: { label: string; href: string }[]
  email: string
  currently: { role: string; company: string }[]
}>()
</script>

<template>
  <section id="top" class="px-4 pt-14 pb-12 sm:px-6 lg:pt-20">
    <div class="mx-auto max-w-5xl">
      <p class="label">{{ role }} · {{ location }}</p>

      <h1 class="mt-4 text-[clamp(2.6rem,9vw,5.25rem)] font-bold leading-[0.94] tracking-[-0.03em]">
        {{ name }}
      </h1>

      <p class="mt-6 max-w-2xl text-lg leading-snug sm:text-xl">
        {{ tagline }}
      </p>

      <div class="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
        <a :href="`mailto:${email}`" class="btn btn-primary">Email me</a>
        <a
          v-for="link in links"
          :key="link.href"
          :href="link.href"
          :target="link.href.startsWith('http') ? '_blank' : undefined"
          :rel="link.href.startsWith('http') ? 'noopener noreferrer' : undefined"
          class="inline-flex min-h-11 items-center text-sm font-medium underline decoration-2 underline-offset-4 hover:bg-canvas"
        >
          {{ link.label }}
        </a>
      </div>

      <dl class="mt-12 grid gap-6 border-t-2 border-ink pt-6 sm:grid-cols-3">
        <div>
          <dt class="label">Status</dt>
          <dd class="mt-1 text-sm font-medium">{{ availability }}</dd>
        </div>
        <div>
          <dt class="label">Currently</dt>
          <dd class="mt-1 space-y-0.5 text-sm font-medium">
            <p v-for="job in currently" :key="job.company">{{ job.role }}, {{ job.company }}</p>
          </dd>
        </div>
        <div>
          <dt class="label">Based in</dt>
          <dd class="mt-1 text-sm font-medium">{{ location }}</dd>
        </div>
      </dl>

      <div v-if="$slots.intro" class="prose-ledger mt-10 max-w-2xl">
        <slot name="intro" />
      </div>
    </div>
  </section>
</template>
