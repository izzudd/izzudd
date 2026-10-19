<script setup lang="ts">
defineProps<{
  email: string
  links: { label: string; href: string }[]
  availability: string
  location: string
}>()
</script>

<template>
  <section id="contact" class="border-t-2 border-ink bg-paper-2 px-4 py-16 sm:px-6">
    <div class="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[1.4fr_1fr]">
      <div>
        <h2 class="max-w-xl text-3xl font-bold leading-tight tracking-[-0.02em] sm:text-4xl">
          Hiring for an AI engineering role, or need a model turned into a product?
        </h2>

        <div class="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
          <a :href="`mailto:${email}`" class="btn btn-primary">{{ email }}</a>
          <a
            v-for="link in links"
            :key="link.href"
            :href="link.href"
            :target="link.href.startsWith('http') ? '_blank' : undefined"
            :rel="link.href.startsWith('http') ? 'noopener noreferrer' : undefined"
            class="inline-flex min-h-11 items-center text-sm font-medium underline decoration-2 underline-offset-4"
          >{{ link.label }}</a>
        </div>
      </div>

      <aside class="border-t-2 border-ink pt-4">
        <p class="label">Availability</p>
        <p class="mt-1 text-sm font-medium">{{ availability }}</p>

        <p class="label mt-6">Based in</p>
        <p class="mt-1 text-sm font-medium">{{ location }}</p>
      </aside>
    </div>
  </section>

  <footer class="border-t-2 border-ink px-4 py-6 sm:px-6">
    <div class="mx-auto flex max-w-5xl flex-wrap items-center gap-x-4 gap-y-2 text-xs text-ink/60">
      <span>© {{ new Date().getFullYear() }} Daffa Izzuddin</span>
      <a href="#top" class="ml-auto inline-flex min-h-11 items-center underline decoration-1 underline-offset-2 hover:text-ink">Back to top</a>
    </div>
  </footer>
</template>
