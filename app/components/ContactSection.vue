<script setup lang="ts">
defineProps<{
  email: string
  links: { label: string; href: string }[]
  availability: string
}>()
</script>

<template>
  <section id="contact" class="border-b-4 border-ink bg-paper-2">
    <div class="mx-auto grid max-w-6xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[1.5fr_1fr]">
      <div>
        <p class="font-mono text-sm uppercase tracking-widest text-ink/70">// Contact</p>
        <h2 class="mt-2 max-w-2xl text-3xl font-bold leading-tight sm:text-4xl">
          Hiring for an AI engineering role, or need a model turned into a product?
        </h2>

        <div class="mt-8 flex flex-wrap items-center gap-3">
          <a :href="`mailto:${email}`" class="btn-brutal bg-accent-lime">{{ email }}</a>
          <a
            v-for="link in links"
            :key="link.href"
            :href="link.href"
            :target="link.href.startsWith('http') ? '_blank' : undefined"
            :rel="link.href.startsWith('http') ? 'noopener noreferrer' : undefined"
            class="btn-brutal"
          >{{ link.label }}</a>
        </div>
      </div>

      <aside class="card-brutal h-fit p-5">
        <p class="font-mono text-xs uppercase tracking-widest text-ink/70">Open to</p>
        <p class="mt-2 text-sm font-medium">{{ availability }}</p>

        <hr class="my-4 border-t-2 border-ink" />

        <p class="font-mono text-xs uppercase tracking-widest text-ink/70">Response time</p>
        <p class="mt-2 text-sm">Usually within a day, Monday to Friday.</p>

        <hr class="my-4 border-t-2 border-ink" />

        <p class="font-mono text-xs uppercase tracking-widest text-ink/70">Timezone</p>
        <p class="mt-2 text-sm">Malang, Indonesia (UTC+7) — overlaps EU mornings and US evenings.</p>
      </aside>
    </div>
  </section>

  <footer class="mx-auto flex max-w-6xl flex-wrap items-center gap-3 px-4 py-6 font-mono text-xs text-ink/70 sm:px-6">
    <span>© {{ new Date().getFullYear() }} Daffa Izzuddin</span>
    <span class="ml-auto">Built with Nuxt · content lives in <code class="border border-ink px-1">content/</code></span>
  </footer>
</template>
