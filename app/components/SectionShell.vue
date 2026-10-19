<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    id: string
    index: string
    title: string
    subtitle?: string
    defaultOpen?: boolean
  }>(),
  {
    // Sections are open on first paint so the prerendered HTML contains the
    // content (crawlers, no-JS). The user's last choice takes over on mount.
    defaultOpen: true,
  }
)

const details = ref<HTMLDetailsElement>()
const storageKey = `section-open:${props.id}`

onMounted(() => {
  // Restore the last state, after hydration so the SSR markup stays indexable.
  const saved = localStorage.getItem(storageKey)
  if (saved !== null && details.value) details.value.open = saved === '1'
})

function onToggle(event: Event) {
  const open = (event.target as HTMLDetailsElement).open
  localStorage.setItem(storageKey, open ? '1' : '0')
}
</script>

<template>
  <section :id="id" class="border-b-4 border-ink">
    <details ref="details" :open="props.defaultOpen" @toggle="onToggle">
      <summary
        class="group flex items-center gap-4 px-4 py-6 transition-colors hover:bg-paper-2 sm:px-6"
      >
        <span class="border-2 border-ink bg-ink px-2 py-0.5 font-mono text-xs font-bold text-paper">
          {{ index }}
        </span>
        <h2 class="font-mono text-2xl font-bold tracking-tight sm:text-3xl">{{ title }}</h2>
        <span
          v-if="subtitle"
          class="hidden font-mono text-xs text-ink/70 sm:block sm:max-w-md"
        >{{ subtitle }}</span>
        <span
          class="ml-auto flex h-8 w-8 shrink-0 items-center justify-center border-2 border-ink bg-canvas font-mono text-base leading-none transition-transform duration-200 group-open:rotate-180"
          aria-hidden="true"
        >▾</span>
        <span class="sr-only">Toggle {{ title }}</span>
      </summary>

      <div class="section-body">
        <div>
          <div class="px-4 pb-10 sm:px-6">
            <slot />
          </div>
        </div>
      </div>
    </details>
  </section>
</template>
