<script setup lang="ts">
type SkillStage = {
  path: string
  title: string
  stage: string
  summary?: string
  order?: number
  items?: { name: string; evidence?: string; evidenceHref?: string }[]
  tools?: { name: string; icon?: string }[]
  body?: unknown
}

defineProps<{ stages: SkillStage[] }>()

const accents = ['bg-accent-sky', 'bg-accent-amber', 'bg-accent-emerald', 'bg-accent-fuchsia']
</script>

<template>
  <div class="grid gap-5 lg:grid-cols-2">
    <article
      v-for="(stage, index) in stages"
      :key="stage.path"
      v-reveal="index * 60"
      class="card-brutal flex flex-col p-5"
    >
      <div class="flex items-center gap-3">
        <span
          class="flex h-9 w-9 items-center justify-center border-2 border-ink font-mono text-sm font-bold text-ink"
          :class="accents[index % accents.length]"
        >{{ stage.stage }}</span>
        <h3 class="font-mono text-lg font-bold">{{ stage.title }}</h3>
      </div>

      <p v-if="stage.summary" class="mt-3 text-[15px] leading-relaxed">{{ stage.summary }}</p>

      <ul v-if="stage.items?.length" class="mt-4 space-y-2">
        <li v-for="item in stage.items" :key="item.name" class="flex gap-2 text-[15px] leading-relaxed">
          <span class="mt-[9px] h-2 w-2 shrink-0 bg-ink" aria-hidden="true"></span>
          <span>
            {{ item.name }}<template v-if="item.evidence">
              —
              <a
                v-if="item.evidenceHref"
                :href="item.evidenceHref"
                class="underline decoration-2 underline-offset-2 hover:bg-accent-amber/40"
              >{{ item.evidence }}</a>
              <span v-else class="font-mono text-sm">{{ item.evidence }}</span>
            </template>
          </span>
        </li>
      </ul>

      <div v-if="stage.tools?.length" class="mt-auto flex flex-wrap items-center gap-2 pt-5">
        <span
          v-for="tool in stage.tools"
          :key="tool.name"
          class="inline-flex items-center gap-1.5 border-2 border-ink bg-canvas px-2 py-1 font-mono text-xs"
        >
          <Icon v-if="tool.icon" :name="tool.icon" class="text-base" aria-hidden="true" />
          {{ tool.name }}
        </span>
      </div>
    </article>
  </div>
</template>
