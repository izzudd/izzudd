---
title: Serving & Inference
stage: '02'
order: 2
summary: A model that only runs in a notebook is not a feature. I put it behind an endpoint and keep it honest.
items:
  - name: REST / async job APIs around model inference
    evidence: GenBatik, IdentifEye
    evidenceHref: '#project-genbatik'
  - name: Streaming progress to the client (WebSocket)
    evidence: GenBatik
    evidenceHref: '#project-genbatik'
  - name: Containerised deploy, GPU vs CPU trade-offs
    evidence: SPARSE
    evidenceHref: '#project-sparse'
  - name: Latency and cost per request
    evidence: GenBatik
    evidenceHref: '#project-genbatik'
tools:
  - { name: FastAPI, icon: 'simple-icons:fastapi' }
  - { name: Go, icon: 'simple-icons:go' }
  - { name: Docker, icon: 'simple-icons:docker' }
  - { name: Cloudflare, icon: 'simple-icons:cloudflare' }
---

<!-- TODO Daffa: kalau ada angka latency/cost nyata, sebut di sini — ini bagian yang paling
     dicari untuk role AI engineer. -->
