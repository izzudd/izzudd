export type ProjectItem = {
  path: string
  slug: string
  title: string
  tagline: string
  tags?: string[]
  stack?: string[]
  status?: string
  role?: string
  timeframe?: string
  metrics?: { label: string; value: string }[]
  links?: { live?: string; repo?: string; paper?: string }
  pipelineStage?: string[]
  body?: unknown
}
