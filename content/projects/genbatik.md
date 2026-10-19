---
title: GenBatik
tagline: Text-to-image generation for batik patterns — a diffusion model wrapped in a real product.
order: 1
featured: true
role: Solo — model, backend, frontend
timeframe: TODO tahun
tags: [AI, Image Generation, Diffusion, Fullstack]
stack: [python, pytorch, huggingface, nuxt, websocket]
pipelineStage: [Model, Serving, Product]
links:
  live: 'https://batik.izzudd.my.id'
  repo: ''
# TODO: isi angka nyata, lalu hapus tanda komentar. Format:
# metrics:
#   - { label: 'Generations', value: '12k+' }
#   - { label: 'p95 latency', value: '8s / image' }
#   - { label: 'GPU cost', value: '$0.004 / image' }
metrics: []
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
- **Serving**: asynchronous job queue with WebSocket progress — generation takes seconds, so the UI
  reports stages instead of blocking a request.
- **Product**: Nuxt frontend with prompt presets, so a first-time user gets a usable result without
  knowing prompt engineering.

## What I would change next

<!-- TODO Daffa: bagian ini paling menjual di interview karena menunjukkan kamu mengevaluasi
     sistem sendiri. Tulis 2-3 hal nyata, misalnya: batas biaya GPU, evaluasi kualitas otomatis,
     atau cara menangani prompt berbahaya. -->
