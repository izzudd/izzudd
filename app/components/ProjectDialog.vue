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
      <header class="sticky top-0 z-10 flex items-start gap-4 border-b-2 border-ink bg-canvas px-5 py-4">
        <div>
          <h2 class="text-2xl font-bold leading-tight tracking-[-0.02em]">{{ project.title }}</h2>
          <p class="mt-1 text-xs text-ink/60">
            <template v-if="project.role">{{ project.role }}</template>
            <template v-if="project.role && project.timeframe"> · </template>
            <template v-if="project.timeframe">{{ project.timeframe }}</template>
            <template v-if="project.status"> · {{ project.status }}</template>
          </p>
        </div>
        <button type="button" class="btn ml-auto px-3 py-1.5 text-xs" aria-label="Close details" @click="close">
          Close
        </button>
      </header>

      <div class="px-5 py-5">
        <p v-if="project.tags?.length" class="tech">{{ project.tags.join(', ') }}</p>
        <p v-if="project.pipelineStage?.length" class="tech mt-1">
          Pipeline: {{ project.pipelineStage.join(', ') }}
        </p>

        <dl v-if="project.metrics?.length" class="mt-4 grid gap-3 border-t-2 border-ink/15 pt-3 sm:grid-cols-3">
          <div v-for="metric in project.metrics" :key="metric.label">
            <dt class="label">{{ metric.label }}</dt>
            <dd class="tech text-base font-bold">{{ metric.value }}</dd>
          </div>
        </dl>

        <div v-if="project.body" class="prose-ledger mt-5">
          <ContentRenderer :value="project" />
        </div>

        <div v-if="project.stack?.length" class="mt-6 border-t-2 border-ink/15 pt-4">
          <p class="label">Stack</p>
          <p class="tech mt-1">{{ project.stack.join(', ') }}</p>
        </div>

        <div v-if="project.links?.live || project.links?.repo || project.links?.paper" class="mt-6 flex flex-wrap gap-3 border-t-2 border-ink pt-5">
          <a
            v-if="project.links?.live"
            :href="project.links.live"
            target="_blank"
            rel="noopener noreferrer"
            class="btn btn-primary"
          >Live site</a>
          <a
            v-if="project.links?.repo"
            :href="project.links.repo"
            target="_blank"
            rel="noopener noreferrer"
            class="btn"
          >Source</a>
          <a
            v-if="project.links?.paper"
            :href="project.links.paper"
            target="_blank"
            rel="noopener noreferrer"
            class="btn"
          >Write-up</a>
        </div>
      </div>
    </div>
  </dialog>
</template>
