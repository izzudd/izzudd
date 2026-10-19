<script setup lang="ts">
const props = defineProps<{
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
  <header class="no-print sticky top-0 z-40 border-b-4 border-ink bg-paper/95 backdrop-blur-sm">
    <div class="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3 sm:px-6">
      <a href="#top" class="border-2 border-ink bg-accent-lime px-2 py-1 font-mono text-sm font-bold uppercase">
        Daffa Izzuddin
      </a>

      <nav class="ml-auto hidden items-center gap-1 md:flex" aria-label="Sections">
        <a
          v-for="item in nav"
          :key="item.href"
          :href="item.href"
          class="border-2 border-transparent px-2 py-1 font-mono text-sm hover:border-ink hover:bg-canvas"
        >
          {{ item.label }}
        </a>
        <a href="/cv" class="ml-2 border-2 border-ink bg-canvas px-2 py-1 font-mono text-sm font-bold hover:bg-accent-amber">
          CV
        </a>
      </nav>

      <button
        class="ml-auto border-2 border-ink bg-canvas px-3 py-1 font-mono text-sm font-bold md:hidden"
        :aria-expanded="menuOpen"
        aria-controls="mobile-nav"
        @click="menuOpen = !menuOpen"
      >
        {{ menuOpen ? 'Close' : 'Menu' }}
      </button>
    </div>

    <nav
      v-show="menuOpen"
      id="mobile-nav"
      aria-label="Sections"
      class="border-t-4 border-ink bg-paper-2 md:hidden"
    >
      <a
        v-for="item in nav"
        :key="item.href"
        :href="item.href"
        class="block border-b-2 border-ink/20 px-5 py-3 font-mono text-sm"
        @click="menuOpen = false"
      >
        {{ item.label }}
      </a>
      <a href="/cv" class="block px-5 py-3 font-mono text-sm font-bold" @click="menuOpen = false">CV</a>
    </nav>
  </header>
</template>
