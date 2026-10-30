---
title: TataKata
tagline: 'Grammar checking for Bahasa Indonesia, built on EYD and KBBI rules, used by real writers.'
order: 4
featured: false
role: Solo
tags: [AI, NLP, Writing]
stack: [nuxt, postgresql, python]
pipelineStage: [Model]
links:
  live: 'https://tata-kata.netlify.app'
metrics:
  - { label: 'Active users', value: '60+' }
  - { label: 'Documents enhanced', value: '100K+' }
status: Live
---

## The problem

Spell-checkers handle typos, not Indonesian grammar. TataKata is an attempt at the harder part:
non-standard words, affixes, and punctuation that EYD cares about.

## Approach

- **Rules first**: deterministic EYD/KBBI corrections where the right answer is unambiguous.
- **Model second**: only send the sentences that rules cannot resolve to a language model, because it is slower and less predictable.
- **Feedback loop**: every accepted correction is stored so the rule set and the model improve.

## Where it is now

Live and in use by 60+ active writers, who have run 100K+ document enhancements through it. The
stored accept/reject decisions are what I use to decide whether a correction belongs in the rule set
or the model.
