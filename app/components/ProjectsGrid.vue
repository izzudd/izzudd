<script setup lang="ts">
import type { ProjectItem } from '~/types/content'

defineProps<{ projects: ProjectItem[] }>()
const emit = defineEmits<{ open: [project: ProjectItem] }>()

const hover = [
  'hover:bg-accent-amber/25',
  'hover:bg-accent-sky/20',
  'hover:bg-accent-lime/25',
  'hover:bg-accent-fuchsia/15',
]
</script>

<template>
  <div class="grid gap-5 sm:grid-cols-2">
    <article
      v-for="(project, index) in projects"
      :key="project.slug"
      v-reveal="index * 60"
      class="card-brutal card-brutal-hover flex flex-col"
      :class="hover[index % hover.length]"
    >
      <button
        type="button"
        class="group flex h-full w-full flex-col p-5 text-left"
        :aria-label="`Open details for ${project.title}`"
        @click="emit('open', project)"
      >
        <div class="flex items-start gap-3">
          <h3 class="font-mono text-xl font-bold">{{ project.title }}</h3>
          <span
            v-if="project.status"
            class="ml-auto shrink-0 border-2 border-ink bg-canvas px-2 py-0.5 font-mono text-[11px] uppercase"
          >{{ project.status }}</span>
        </div>

        <p class="mt-2 text-[15px] leading-relaxed">{{ project.tagline }}</p>

        <dl v-if="project.metrics?.length" class="mt-4 grid grid-cols-2 gap-2">
          <div v-for="metric in project.metrics" :key="metric.label" class="border-2 border-ink bg-canvas p-2">
            <dt class="font-mono text-[10px] uppercase tracking-wider text-ink/70">{{ metric.label }}</dt>
            <dd class="font-mono text-base font-bold">{{ metric.value }}</dd>
          </div>
        </dl>

        <div class="mt-4 flex flex-wrap gap-1.5">
          <span v-for="tag in project.tags" :key="tag" class="tag bg-canvas">{{ tag }}</span>
        </div>

        <div class="mt-auto flex items-center gap-2 pt-5 font-mono text-sm font-bold uppercase">
          <span>Details</span>
          <span aria-hidden="true" class="transition-transform duration-150 group-hover:translate-x-1">→</span>
        </div>
      </button>
    </article>
  </div>
</template>
