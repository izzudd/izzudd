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
    evidence: GenBatik, Mayfeyr
    evidenceHref: '#project-genbatik'
  - name: Message queues and retry policies that survive supplier failures
  - name: Batch loading to cut per-product work (DataLoader, 100ms to 10ms)
    evidence: Mayfeyr
  - name: Microservice extraction when one module gets hot
    evidence: Mayfeyr
tools:
  - { name: FastAPI, icon: 'simple-icons:fastapi' }
  - { name: Go, icon: 'simple-icons:go' }
  - { name: Docker, icon: 'simple-icons:docker' }
  - { name: Cloudflare, icon: 'simple-icons:cloudflare' }
---
