<script setup lang="ts">
type Testimonial = {
  path: string
  name: string
  title: string
  company?: string
  relation?: string
  body?: unknown
}

const props = defineProps<{ testimonials: Testimonial[] }>()
const hasTestimonials = computed(() => (props.testimonials?.length ?? 0) > 0)
</script>

<template>
  <!-- Renders nothing while content/testimonials/ is empty. -->
  <div v-if="hasTestimonials" class="grid gap-5 sm:grid-cols-2">
    <figure
      v-for="(item, index) in testimonials"
      :key="item.path"
      v-reveal="index * 60"
      class="card-brutal flex flex-col p-5"
    >
      <blockquote class="prose-brutal text-[15px] leading-relaxed">
        <ContentRenderer :value="item" />
      </blockquote>
      <figcaption class="mt-4 border-t-2 border-ink pt-3">
        <p class="font-mono text-sm font-bold">{{ item.name }}</p>
        <p class="font-mono text-xs text-ink/70">
          {{ item.title }}<template v-if="item.company">, {{ item.company }}</template>
          <template v-if="item.relation"> · {{ item.relation }}</template>
        </p>
      </figcaption>
    </figure>
  </div>
</template>
