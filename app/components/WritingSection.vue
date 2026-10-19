<script setup lang="ts">
type Article = {
  path: string
  title: string
  outlet: string
  href: string
  date?: string
  description: string
}

defineProps<{ articles: Article[] }>()
</script>

<template>
  <ul class="border-t-2 border-ink">
    <li v-for="(article, index) in articles" :key="article.path" v-reveal="index * 50">
      <a
        :href="article.href"
        target="_blank"
        rel="noopener noreferrer"
        class="grid gap-1 border-b-2 border-ink py-5 hover:bg-canvas sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-6"
      >
        <span class="text-base font-semibold underline decoration-2 underline-offset-4">
          {{ article.title }}
        </span>
        <span class="text-xs text-ink/60 sm:text-right">{{ article.outlet }}</span>
        <span class="text-sm leading-relaxed text-ink/70 sm:col-span-2 sm:max-w-2xl">
          {{ article.description }}
        </span>
      </a>
    </li>
  </ul>
</template>
