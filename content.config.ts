import { defineCollection, defineContentConfig, z } from '@nuxt/content'

const link = z.object({
  label: z.string(),
  href: z.string(),
})

const stackItem = z.object({
  name: z.string(),
  icon: z.string().optional(),
})

export default defineContentConfig({
  collections: {
    /**
     * One file: content/profile.md
     * Frontmatter + intro paragraph rendered in the hero.
     */
    profile: defineCollection({
      type: 'page',
      source: 'profile.md',
      schema: z.object({
        name: z.string(),
        role: z.string(),
        tagline: z.string(),
        location: z.string(),
        availability: z.string(),
        focus: z.array(z.string()),
        links: z.array(link),
        email: z.string(),
      }),
    }),

    /** One .md per role → the experience timeline. */
    experience: defineCollection({
      type: 'page',
      source: 'experience/*.md',
      schema: z.object({
        role: z.string(),
        company: z.string(),
        companyUrl: z.string().optional(),
        period: z.string(),
        start: z.string(),
        end: z.string().optional(),
        type: z.string(),
        location: z.string(),
        summary: z.string(),
        highlights: z.array(z.string()).default([]),
        stack: z.array(z.string()).default([]),
        current: z.boolean().default(false),
      }),
    }),

    /** One .md per project → card + detail dialog (body = long description). */
    projects: defineCollection({
      type: 'page',
      source: 'projects/*.md',
      schema: z.object({
        title: z.string(),
        tagline: z.string(),
        order: z.number().default(99),
        featured: z.boolean().default(false),
        tags: z.array(z.string()).default([]),
        stack: z.array(z.string()).default([]),
        links: z
          .object({
            live: z.string().optional(),
            repo: z.string().optional(),
            paper: z.string().optional(),
          })
          .default({}),
        metrics: z
          .array(z.object({ label: z.string(), value: z.string() }))
          .default([]),
        role: z.string().optional(),
        timeframe: z.string().optional(),
        cover: z.string().optional(),
        status: z.string().optional(),
        pipelineStage: z.array(z.string()).default([]),
      }),
    }),

    /** One .md per lifecycle stage → skills, each with evidence links. */
    skills: defineCollection({
      type: 'page',
      source: 'skills/*.md',
      schema: z.object({
        title: z.string(),
        stage: z.string(),
        order: z.number().default(99),
        summary: z.string().optional(),
        items: z.array(
          z.object({
            name: z.string(),
            evidence: z.string().optional(),
            evidenceHref: z.string().optional(),
          })
        ),
        tools: z.array(stackItem).default([]),
      }),
    }),

    /** One .md per article. */
    writing: defineCollection({
      type: 'page',
      source: 'writing/*.md',
      schema: z.object({
        title: z.string(),
        outlet: z.string(),
        href: z.string(),
        date: z.string().optional(),
        description: z.string(),
        featured: z.boolean().default(false),
        order: z.number().default(99),
      }),
    }),

    /**
     * One .md per quote. The section renders nothing while this folder is
     * empty — dropping a file in is all it takes to publish a testimonial.
     */
    testimonials: defineCollection({
      type: 'page',
      source: 'testimonials/*.md',
      schema: z.object({
        name: z.string(),
        title: z.string(),
        relation: z.string().optional(),
        company: z.string().optional(),
        order: z.number().default(99),
      }),
    }),
  },
})
