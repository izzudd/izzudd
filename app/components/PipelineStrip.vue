<script setup lang="ts">
defineProps<{
  stages: { stage: string; title: string; summary?: string }[]
}>()
</script>

<template>
  <section class="no-print border-b-4 border-ink bg-ink text-paper">
    <div class="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <p class="font-mono text-xs uppercase tracking-[0.2em] text-paper/70">What I actually do</p>
      <ol class="mt-4 flex flex-col gap-2 sm:flex-row sm:items-stretch">
        <li v-for="(stage, index) in stages" :key="stage.stage" class="flex flex-1 items-center gap-2">
          <a
            href="#skills"
            class="group flex w-full items-center gap-3 border-2 border-paper/50 px-3 py-2 transition-colors hover:border-paper hover:bg-paper/10"
          >
            <span class="font-mono text-xs text-paper/70">{{ stage.stage }}</span>
            <span class="font-mono text-sm font-bold">{{ stage.title }}</span>
          </a>
          <span
            v-if="index < stages.length - 1"
            class="hidden shrink-0 font-mono text-paper/60 sm:block"
            aria-hidden="true"
          >→</span>
        </li>
      </ol>
      <p class="mt-4 max-w-2xl text-sm leading-relaxed text-paper/85">
        Models are the easy part. These four stages are what I own end to end, and every claim above
        links to a project where I did it.
      </p>
    </div>
  </section>
</template>
