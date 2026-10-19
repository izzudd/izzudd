---
title: TataKata
tagline: 'Grammar checking for Bahasa Indonesia, built on EYD and KBBI rules.'
order: 4
featured: false
role: Solo
tags: [AI, NLP, Writing]
stack: [nuxt, postgresql, python]
pipelineStage: [Model]
links:
  live: 'https://tata-kata.netlify.app'
metrics: []
status: In progress
---

## The problem

Spell-checkers handle typos, not Indonesian grammar. TataKata is an attempt at the harder part:
non-standard words, affixes, and punctuation that EYD cares about.

## Approach

- **Rules first**: deterministic EYD/KBBI corrections where the right answer is unambiguous.
- **Model second**: only send the sentences that rules cannot resolve to a language model, because
  it is slower and less predictable.
- **Feedback loop**: every accepted correction is stored so the rule set and the model improve.
