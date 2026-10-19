---
title: IdentifEye
tagline: 'Face-embedding authentication exposed as a small, boring REST API.'
order: 3
featured: true
role: Solo
tags: [AI, Vision, Embeddings, API]
stack: [go, python, pytorch, react, tailwindcss]
pipelineStage: [Model, Serving]
links:
  repo: 'https://github.com/izzudd/identifEye'
metrics: []
status: Open source
---

## The problem

Second-factor authentication usually means a code or a hardware key. IdentifEye explores a third
option: prove identity with a face, without shipping a whole identity platform.

## How it works

- **Embedding**: FaceNet produces a feature vector for each face.
- **Verification**: similarity score against the enrolled vector, with a threshold instead of a
  binary classifier. It is a comparison problem, not a classification problem.
- **Service**: Go HTTP API that wraps the inference step, so the model stays a small independent
  process rather than being embedded in the app.
