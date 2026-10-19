---
title: Monitoring & Iteration
stage: '03'
order: 3
summary: >-
  The part most portfolios skip. I care about what happens after deploy: what broke, what drifted,
  and what the next version should change.
items:
  - name: Logging inputs/outputs to make failures reproducible
    evidence: GenBatik
    evidenceHref: '#project-genbatik'
  - name: Feedback capture (accepted vs rejected output)
    evidence: TataKata
    evidenceHref: '#project-tatakata'
  - name: Cost and usage tracking per feature
  - name: Versioned experiments instead of one-off notebooks
tools:
  - { name: Postgres, icon: 'simple-icons:postgresql' }
  - { name: Grafana, icon: 'simple-icons:grafana' }
  - { name: GitHub Actions, icon: 'simple-icons:githubactions' }
---

<!-- TODO Daffa: ini section yang paling perlu bukti. Kalau di Rains/Mayfeyr kamu pernah pasang
     metrics, alert, atau eval rutin, tulis di sini dan tautkan. Kalau belum, jujur tulis apa yang
     sedang kamu bangun — jangan diklaim sudah ada. -->
