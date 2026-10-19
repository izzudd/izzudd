<script setup lang="ts">
import type { ProjectItem } from '~/types/content'

defineProps<{ projects: ProjectItem[] }>()
const emit = defineEmits<{ open: [project: ProjectItem] }>()
</script>

<template>
  <div class="grid gap-5 sm:grid-cols-2">
    <article
      v-for="(project, index) in projects"
      :key="project.slug"
      v-reveal="index * 60"
      class="card card-link group flex"
    >
      <button
        type="button"
        class="flex h-full w-full flex-col p-5 text-left"
        :aria-label="`Open the build notes for ${project.title}`"
        @click="emit('open', project)"
      >
        <span class="flex flex-wrap items-baseline gap-x-3">
          <span class="text-xl font-bold tracking-[-0.01em] group-hover:underline group-hover:decoration-2 group-hover:underline-offset-4">
            {{ project.title }}
          </span>
          <span v-if="project.status" class="label">{{ project.status }}</span>
        </span>

        <span class="mt-2 text-[15px] leading-relaxed">{{ project.tagline }}</span>

        <span v-if="project.metrics?.length" class="mt-4 grid grid-cols-2 gap-3 border-t-2 border-ink/15 pt-3">
          <span v-for="metric in project.metrics" :key="metric.label">
            <span class="label block">{{ metric.label }}</span>
            <span class="tech text-base font-bold">{{ metric.value }}</span>
          </span>
        </span>

        <span class="tech mt-4">{{ (project.tags ?? []).join(', ') }}</span>

        <span class="mt-auto pt-5 text-sm font-semibold underline decoration-1 underline-offset-4">
          Build notes
        </span>
      </button>
    </article>
  </div>
</template>
