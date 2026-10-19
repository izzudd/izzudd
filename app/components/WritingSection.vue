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
  <ul class="grid gap-4 sm:grid-cols-2">
    <li v-for="(article, index) in articles" :key="article.path" v-reveal="index * 50">
      <a
        :href="article.href"
        target="_blank"
        rel="noopener noreferrer"
        class="card-brutal card-brutal-hover flex h-full flex-col p-5 hover:bg-accent-emerald/15"
      >
        <div class="flex items-baseline gap-2">
          <h3 class="font-mono text-base font-bold">{{ article.title }}</h3>
          <span class="ml-auto shrink-0 font-mono text-[11px] uppercase text-ink/65">{{ article.outlet }}</span>
        </div>
        <p class="mt-2 text-sm leading-relaxed">{{ article.description }}</p>
        <span class="mt-auto pt-4 font-mono text-xs font-bold uppercase">Read →</span>
      </a>
    </li>
  </ul>
</template>
