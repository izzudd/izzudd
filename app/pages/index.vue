<script setup lang="ts">
import type { ProjectItem } from '~/types/content'

const { data: profile } = await useAsyncData('profile', () => queryCollection('profile').first())
const { data: experience } = await useAsyncData('experience', () =>
  queryCollection('experience').order('start', 'DESC').all()
)
const { data: projects } = await useAsyncData('projects', () =>
  queryCollection('projects').order('order', 'ASC').all()
)
const { data: stages } = await useAsyncData('skills', () =>
  queryCollection('skills').order('order', 'ASC').all()
)
const { data: articles } = await useAsyncData('writing', () =>
  queryCollection('writing').order('order', 'ASC').all()
)
const { data: testimonials } = await useAsyncData('testimonials', () =>
  queryCollection('testimonials').order('order', 'ASC').all()
)

const toProject = (doc: Record<string, any>): ProjectItem => ({
  ...doc,
  slug: String(doc.path ?? '').split('/').filter(Boolean).pop() ?? '',
})

const currently = computed(() =>
  (experience.value ?? [])
    .filter((entry) => entry.current)
    .map((entry) => ({ role: entry.role as string, company: entry.company as string }))
)

const projectItems = computed<ProjectItem[]>(() => (projects.value ?? []).map(toProject))

const activeProject = ref<ProjectItem | null>(null)

function openProject(project: ProjectItem) {
  activeProject.value = project
}

function closeProject() {
  activeProject.value = null
}

function openFromHash(hash: string) {
  if (!hash.startsWith('#project-')) return
  const slug = hash.replace('#project-', '')
  const match = projectItems.value.find((project) => project.slug === slug)
  if (match) activeProject.value = match
}

// The router owns the hash: it is empty during hydration and populated right
// after, so watch the reactive route hash instead of reading window.location.
const route = useRoute()

watch(
  () => route.hash,
  (hash) => openFromHash(hash ?? ''),
  { immediate: true }
)

// Content collections can resolve after the first route tick; retry then.
watch(projectItems, () => {
  if (!activeProject.value) openFromHash(route.hash ?? '')
})

onBeforeUnmount(() => {
  activeProject.value = null
})

useHead({
  title: 'Daffa Izzuddin — AI Engineer',
  meta: [
    {
      name: 'description',
      content:
        'AI engineer in Malang, Indonesia. Model development, inference and serving, monitoring and iteration — plus the product around it.',
    },
    { property: 'og:title', content: 'Daffa Izzuddin — AI Engineer' },
    {
      property: 'og:description',
      content:
        'I take models from a training run to something people can actually use: train, serve, monitor, iterate.',
    },
    { property: 'og:type', content: 'profile' },
    { property: 'og:url', content: 'https://me.izzudd.my.id' },
    { property: 'og:image', content: 'https://me.izzudd.my.id/og.png' },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { property: 'og:image:alt', content: 'Daffa Izzuddin — AI Engineer' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:image', content: 'https://me.izzudd.my.id/og.png' },
  ],
  link: [{ rel: 'canonical', href: 'https://me.izzudd.my.id' }],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Daffa Izzuddin',
        jobTitle: 'AI Engineer',
        url: 'https://me.izzudd.my.id',
        email: 'mailto:halo@izzudd.my.id',
        address: { '@type': 'PostalAddress', addressLocality: 'Malang', addressCountry: 'ID' },
        sameAs: [
          'https://github.com/izzudd',
          'https://www.linkedin.com/in/daffa-izzuddin/',
          'https://www.invasikode.com',
        ],
        knowsAbout: ['Machine Learning', 'Computer Vision', 'Diffusion models', 'Inference', 'Nuxt', 'Go'],
      }),
    },
  ],
})
</script>

<template>
  <div v-if="profile">
    <SiteHeader :links="profile.links" :email="profile.email" />

    <main>
      <HeroSection
        :name="profile.name"
        :role="profile.role"
        :tagline="profile.tagline"
        :location="profile.location"
        :availability="profile.availability"
        :focus="profile.focus"
        :links="profile.links"
        :email="profile.email"
        :currently="currently"
      >
        <template #intro>
          <div class="text-sm leading-relaxed">
            <ContentRenderer :value="profile" />
          </div>
        </template>
      </HeroSection>

      <PipelineStrip :stages="stages ?? []" />

      <SectionShell
        id="experience"
        index="01"
        title="Experience"
        subtitle="Where I have shipped models and the systems around them"
      >
        <ExperienceTimeline :entries="experience ?? []" />
      </SectionShell>

      <SectionShell
        id="projects"
        index="02"
        title="Projects"
        subtitle="Click a card for the technical detail"
      >
        <ProjectsGrid :projects="projectItems" @open="openProject" />
      </SectionShell>

      <SectionShell id="skills" index="03" title="Skills" subtitle="Grouped by the ML lifecycle, each with evidence">
        <SkillsSection :stages="stages ?? []" />
      </SectionShell>

      <SectionShell
        id="writing"
        index="04"
        title="Writing"
        subtitle="Selected posts · 100+ articles, ~1k readers weekly at invasikode.com"
      >
        <WritingSection :articles="articles ?? []" />
      </SectionShell>

      <SectionShell
        v-if="(testimonials?.length ?? 0) > 0"
        id="testimonials"
        index="05"
        title="Testimonials"
        subtitle="What people I worked with say"
      >
        <TestimonialsSection :testimonials="testimonials ?? []" />
      </SectionShell>

      <ContactSection :email="profile.email" :links="profile.links" :availability="profile.availability" />
    </main>

    <ProjectDialog :project="activeProject" @close="closeProject" />
  </div>
</template>
