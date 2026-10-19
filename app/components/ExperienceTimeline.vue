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

defineProps<{ entries: Entry[] }>()

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
  <ol class="space-y-8 border-l-2 border-ink pl-5 sm:pl-7">
    <li v-for="(entry, index) in entries" :key="entry.path" v-reveal="index * 60" class="relative">
      <span
        class="absolute top-2 -left-[27px] block h-3 w-3 border-2 border-ink sm:-left-[35px]"
        :class="entry.current ? 'bg-accent' : 'bg-ink'"
        aria-hidden="true"
      ></span>

      <div class="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h3 class="text-lg font-bold tracking-[-0.01em]">{{ entry.role }}</h3>
        <a
          v-if="entry.companyUrl"
          :href="entry.companyUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="font-medium underline decoration-1 underline-offset-2"
        >{{ entry.company }}</a>
        <span v-else class="font-medium">{{ entry.company }}</span>
      </div>

      <p class="mt-1 text-xs text-ink/60">{{ meta(entry) }}</p>

      <p v-if="entry.summary" class="mt-3 max-w-2xl text-[15px] leading-relaxed">{{ entry.summary }}</p>

      <ul v-if="entry.highlights?.length" class="mt-3 max-w-2xl space-y-2 text-[15px] leading-relaxed">
        <li v-for="line in entry.highlights" :key="line" class="flex gap-3">
          <span class="mt-[10px] h-1.5 w-1.5 shrink-0 bg-ink" aria-hidden="true"></span>
          <span>{{ line }}</span>
        </li>
      </ul>

      <p v-if="entry.stack?.length" class="tech mt-3">{{ entry.stack.join(', ') }}</p>
    </li>
  </ol>
</template>
