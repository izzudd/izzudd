---
title: GenBatik
tagline: 'Text-to-image generation for batik patterns: a diffusion model wrapped in a real product, and a paper about it.'
order: 1
featured: true
role: Model, backend, and frontend
tags: [AI, Image Generation, Diffusion, Fullstack]
stack: [python, pytorch, huggingface, nuxt, websocket]
pipelineStage: [Model, Serving, Product]
links:
  live: 'https://genbatik.ub.ac.id'
  repo: 'https://github.com/izzudd/gen-batik'
metrics:
  - { label: 'Batik patterns generated', value: '60K+' }
  - { label: 'Dropped requests', value: '0%' }
status: Live
---

## The problem

Batik motifs are usually recreated by hand or pulled from a fixed catalogue. GenBatik lets someone
describe the pattern they want in plain language and get a batik-style image back, so a small
workshop can explore variants without a designer.

## What I built

The whole path: the generation pipeline, the API that queues and streams results, and the interface
that shows progress to the user instead of a spinner that lies.

- **Model**: fine-tuned diffusion on batik imagery, served behind a Python worker.
- **Serving**: asynchronous job queue with WebSocket progress. Generation takes seconds, so the UI reports stages instead of blocking a request.
- **Product**: Nuxt frontend with prompt presets, so a first-time user gets a usable result without knowing prompt engineering.

## What came out of it

The platform has synthesized 60K+ patterns for public users with a 0% request drop rate, because the
queue absorbs load instead of refusing it. The work became my first-author paper in IEEE Access
(Q1), the framework is registered for intellectual property, and both the interface and the model
are open source at `izzudd/gen-batik`. I now review for the journal as well.
