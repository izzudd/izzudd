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
</script>

<template>
  <div class="grid gap-5 lg:grid-cols-2">
    <article
      v-for="(stage, index) in stages"
      :key="stage.path"
      v-reveal="index * 60"
      class="card flex flex-col p-5"
    >
      <div class="flex items-baseline gap-3">
        <span class="tech text-xs font-bold">{{ stage.stage }}</span>
        <h3 class="text-lg font-bold tracking-[-0.01em]">{{ stage.title }}</h3>
      </div>

      <p v-if="stage.summary" class="mt-3 text-[15px] leading-relaxed">{{ stage.summary }}</p>

      <ul v-if="stage.items?.length" class="mt-4 space-y-2.5 text-[15px] leading-relaxed">
        <li v-for="item in stage.items" :key="item.name">
          <span class="flex gap-3">
            <span class="mt-[10px] h-1.5 w-1.5 shrink-0 bg-ink" aria-hidden="true"></span>
            <span>{{ item.name }}</span>
          </span>
          <span v-if="item.evidence" class="mt-0.5 ml-[18px] block text-xs">
            <a
              v-if="item.evidenceHref"
              :href="item.evidenceHref"
              class="inline-flex min-h-6 items-center underline decoration-1 underline-offset-2 hover:bg-accent/40"
            >{{ item.evidence }}</a>
            <span v-else class="text-ink/60">{{ item.evidence }}</span>
          </span>
        </li>
      </ul>

      <div v-if="stage.tools?.length" class="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-5">
        <span v-for="tool in stage.tools" :key="tool.name" class="tech inline-flex items-center gap-1.5">
          <Icon v-if="tool.icon" :name="tool.icon" class="text-sm" aria-hidden="true" />
          {{ tool.name }}
        </span>
      </div>
    </article>
  </div>
</template>
