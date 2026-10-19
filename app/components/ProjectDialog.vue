<script setup lang="ts">
import type { ProjectItem } from '~/types/content'

const props = defineProps<{ project: ProjectItem | null }>()
const emit = defineEmits<{ close: [] }>()

const dialog = ref<HTMLDialogElement>()

function clearHash() {
  // Synchronous URL edit, no router navigation: router.replace() only changed
  // the hash asynchronously and raced with open/close clicks.
  if (window.location.hash.startsWith('#project-')) {
    history.replaceState(null, '', window.location.pathname + window.location.search)
  }
}

function restorePage() {
  document.body.style.overflow = ''
  clearHash()
}

// The dialog is fully controlled by the parent: `close()` only tells the parent,
// and `apply()` does the DOM work. That keeps ESC, backdrop click, the Close
// button and the hash all in one place.
function apply(project: ProjectItem | null) {
  const el = dialog.value
  if (!el) return

  if (project) {
    if (!el.open) el.showModal()
    document.body.style.overflow = 'hidden'
    const hash = `#project-${project.slug}`
    if (window.location.hash !== hash) history.replaceState(null, '', hash)
  } else {
    if (el.open) el.close()
    restorePage()
  }
}

watch(() => props.project, apply, { flush: 'post' })

// Deep links: the parent may already have a project selected on first paint.
onMounted(() => apply(props.project))

function close() {
  emit('close')
}

/** ESC: block the native close so the watcher above stays the single source of truth. */
function onCancel(event: Event) {
  event.preventDefault()
  close()
}

/** Safety net: if the browser closed the dialog by itself, tell the parent. */
function onNativeClose() {
  if (props.project) close()
  else restorePage()
}

/** Click on the backdrop (the dialog element itself, outside its content) closes. */
function onClick(event: MouseEvent) {
  if (event.target === dialog.value) close()
}

onBeforeUnmount(restorePage)
</script>

<template>
  <dialog ref="dialog" class="project-dialog w-full" @cancel="onCancel" @close="onNativeClose" @click="onClick">
    <div v-if="project" class="max-h-[calc(100dvh-2rem)] overflow-y-auto">
      <header class="sticky top-0 z-10 flex items-start gap-3 border-b-4 border-ink bg-canvas px-5 py-4">
        <div>
          <h2 class="font-mono text-2xl font-bold leading-tight">{{ project.title }}</h2>
          <p class="mt-1 font-mono text-xs uppercase tracking-wide text-ink/70">
            <template v-if="project.role">{{ project.role }}</template>
            <template v-if="project.role && project.timeframe"> · </template>
            <template v-if="project.timeframe">{{ project.timeframe }}</template>
            <template v-if="project.status"> · {{ project.status }}</template>
          </p>
        </div>
        <button
          type="button"
          class="ml-auto flex h-9 w-9 shrink-0 items-center justify-center border-2 border-ink bg-accent-fuchsia/30 font-mono text-lg leading-none hover:bg-accent-fuchsia/60"
          aria-label="Close details"
          @click="close"
        >
          ✕
        </button>
      </header>

      <div class="px-5 py-5">
        <div class="flex flex-wrap gap-1.5">
          <span v-for="tag in project.tags" :key="tag" class="tag bg-paper-2">{{ tag }}</span>
        </div>

        <dl v-if="project.metrics?.length" class="mt-4 grid gap-2 sm:grid-cols-3">
          <div v-for="metric in project.metrics" :key="metric.label" class="border-2 border-ink bg-paper p-3">
            <dt class="font-mono text-[10px] uppercase tracking-wider text-ink/70">{{ metric.label }}</dt>
            <dd class="font-mono text-lg font-bold">{{ metric.value }}</dd>
          </div>
        </dl>

        <div v-if="project.body" class="prose-brutal mt-5">
          <ContentRenderer :value="project" />
        </div>

        <div v-if="project.stack?.length" class="mt-6">
          <p class="font-mono text-xs uppercase tracking-widest text-ink/70">Stack</p>
          <div class="mt-2 flex flex-wrap gap-1.5">
            <span v-for="tech in project.stack" :key="tech" class="tag bg-canvas">{{ tech }}</span>
          </div>
        </div>

        <div class="mt-6 flex flex-wrap gap-3 border-t-4 border-ink pt-5">
          <a
            v-if="project.links?.live"
            :href="project.links.live"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-brutal bg-accent-lime"
          >Live site ↗</a>
          <a
            v-if="project.links?.repo"
            :href="project.links.repo"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-brutal"
          >Source ↗</a>
          <a
            v-if="project.links?.paper"
            :href="project.links.paper"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-brutal"
          >Write-up ↗</a>
          <button type="button" class="btn-brutal ml-auto" @click="close">Close</button>
        </div>
      </div>
    </div>
  </dialog>
</template>
