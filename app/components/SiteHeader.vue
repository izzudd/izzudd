<script setup lang="ts">
defineProps<{
  links: { label: string; href: string }[]
  email: string
}>()

const nav = [
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Writing', href: '#writing' },
  { label: 'Contact', href: '#contact' },
]

const menuOpen = ref(false)
</script>

<template>
  <header class="no-print sticky top-0 z-40 border-b-2 border-ink bg-paper">
    <div class="px-4 py-3 sm:px-6">
      <div class="mx-auto flex max-w-5xl items-center gap-4">
        <a href="#top" class="inline-flex min-h-11 items-center text-sm font-bold tracking-[-0.01em]">Daffa Izzuddin</a>

        <nav class="ml-auto hidden items-center gap-5 md:flex" aria-label="Sections">
          <a
            v-for="item in nav"
            :key="item.href"
            :href="item.href"
            class="text-sm underline-offset-4 hover:underline"
          >
            {{ item.label }}
          </a>
          <a href="/cv" class="btn px-3 py-1.5 text-xs">CV</a>
        </nav>

        <button
          type="button"
          class="ml-auto inline-flex min-h-11 items-center border-2 border-ink bg-canvas px-3 text-xs font-semibold md:hidden"
          :aria-expanded="menuOpen"
          aria-controls="mobile-nav"
          @click="menuOpen = !menuOpen"
        >
          {{ menuOpen ? 'Close' : 'Menu' }}
        </button>
      </div>
    </div>

    <nav
      v-show="menuOpen"
      id="mobile-nav"
      aria-label="Sections"
      class="border-t-2 border-ink bg-paper-2 md:hidden"
    >
      <a
        v-for="item in nav"
        :key="item.href"
        :href="item.href"
        class="block border-b border-ink/25 px-5 py-3 text-sm"
        @click="menuOpen = false"
      >
        {{ item.label }}
      </a>
      <a href="/cv" class="block px-5 py-3 text-sm font-semibold" @click="menuOpen = false">CV</a>
    </nav>
  </header>
</template>
