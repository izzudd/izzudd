<script setup lang="ts">
type Entry = {
  path: string
  role: string
  company: string
  companyUrl?: string
  period: string
  type: string
  location: string
  current?: boolean
  summary?: string
  highlights?: string[]
  stack?: string[]
  body?: unknown
}

const props = defineProps<{ entries: Entry[] }>()

const accent = (index: number) =>
  ['bg-accent-lime', 'bg-accent-sky', 'bg-accent-amber', 'bg-accent-fuchsia'][index % 4]

/** Period / type / location, deduped by token so "Remote · Full-time" + "Remote" prints once. */
const meta = (entry: Entry) => {
  const tokens = [entry.period, entry.type, entry.location]
    .filter((part) => Boolean(part && String(part).trim()))
    .flatMap((part) => String(part).split('·'))
    .map((token) => token.trim())
    .filter(Boolean)

  const seen = new Set<string>()
  return tokens
    .filter((token) => {
      const key = token.toLowerCase()
      if (seen.has(key)) return false
      seen.add(key)
      return true
    })
    .join(' · ')
}
</script>

<template>
  <ol class="relative ml-3 space-y-6 border-l-4 border-ink pl-6 sm:ml-4 sm:pl-8">
    <li v-for="(entry, index) in entries" :key="entry.path" v-reveal="index * 60" class="relative">
      <span
        class="absolute -left-[38px] top-1 block h-5 w-5 border-4 border-ink sm:-left-[46px]"
        :class="accent(index)"
        aria-hidden="true"
      ></span>

      <article class="card-brutal max-w-3xl p-5">
        <div class="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3 class="font-mono text-lg font-bold">{{ entry.role }}</h3>
          <span class="text-ink/55" aria-hidden="true">·</span>
          <a
            v-if="entry.companyUrl"
            :href="entry.companyUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="font-medium underline decoration-2 underline-offset-2"
          >{{ entry.company }}</a>
          <span v-else class="font-medium">{{ entry.company }}</span>

          <span
            v-if="entry.current"
            class="ml-auto border-2 border-ink bg-accent-lime px-2 py-0.5 font-mono text-[11px] font-bold uppercase"
          >Now</span>
        </div>

        <p class="mt-1 font-mono text-xs uppercase tracking-wide text-ink/70">
          {{ meta(entry) }}
        </p>

        <p v-if="entry.summary" class="mt-3 text-[15px] leading-relaxed">{{ entry.summary }}</p>

        <ul
          v-if="entry.highlights?.length"
          class="mt-3 space-y-1.5 text-[15px] leading-relaxed"
        >
          <li v-for="line in entry.highlights" :key="line" class="flex gap-2">
            <span class="mt-[9px] h-2 w-2 shrink-0 bg-ink" aria-hidden="true"></span>
            <span>{{ line }}</span>
          </li>
        </ul>

        <div v-if="entry.stack?.length" class="mt-4 flex flex-wrap gap-1.5">
          <span v-for="tech in entry.stack" :key="tech" class="tag bg-paper-2">{{ tech }}</span>
        </div>
      </article>
    </li>
  </ol>
</template>
