<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    id: string
    title: string
    subtitle?: string
    defaultOpen?: boolean
  }>(),
  {
    // Open on first paint so the prerendered HTML carries the content for
    // crawlers and no-JS visitors. A saved choice takes over on mount.
    defaultOpen: true,
  }
)

const details = ref<HTMLDetailsElement>()
const storageKey = `section-open:${props.id}`

onMounted(() => {
  const saved = localStorage.getItem(storageKey)
  if (saved !== null && details.value) details.value.open = saved === '1'
})

function onToggle(event: Event) {
  const open = (event.target as HTMLDetailsElement).open
  localStorage.setItem(storageKey, open ? '1' : '0')
}
</script>

<template>
  <section :id="id" class="border-t-2 border-ink">
    <details ref="details" :open="props.defaultOpen" @toggle="onToggle" class="group">
      <summary class="flex items-baseline gap-4 px-4 py-6 hover:bg-paper-2/70 sm:px-6">
        <span class="flex min-w-0 flex-1 flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
          <h2 class="text-2xl font-bold tracking-[-0.02em] sm:text-3xl">{{ title }}</h2>
          <span v-if="subtitle" class="text-sm text-ink/60 sm:max-w-sm sm:text-right">{{ subtitle }}</span>
        </span>
        <span class="flex h-6 w-6 shrink-0 items-center justify-center text-xl leading-none" aria-hidden="true">
          <span class="group-open:hidden">+</span>
          <span class="hidden group-open:inline">−</span>
        </span>
        <span class="sr-only">Toggle {{ title }}</span>
      </summary>

      <div class="section-body">
        <div>
          <div class="max-w-5xl px-4 pb-12 sm:px-6">
            <slot />
          </div>
        </div>
      </div>
    </details>
  </section>
</template>
