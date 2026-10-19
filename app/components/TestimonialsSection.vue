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
      class="card flex flex-col p-5"
    >
      <blockquote class="prose-ledger text-[15px]">
        <ContentRenderer :value="item" />
      </blockquote>
      <figcaption class="mt-4 border-t-2 border-ink pt-3">
        <p class="text-sm font-bold">{{ item.name }}</p>
        <p class="text-xs text-ink/60">
          {{ item.title }}<template v-if="item.company">, {{ item.company }}</template>
          <template v-if="item.relation"> · {{ item.relation }}</template>
        </p>
      </figcaption>
    </figure>
  </div>
</template>
