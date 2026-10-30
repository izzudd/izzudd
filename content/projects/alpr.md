---
title: ALPR Pipeline
tagline: 'Automatic license plate recognition, built from scratch for a national data competition.'
order: 6
featured: false
role: Solo
timeframe: '2023'
tags: [AI, Computer Vision, OCR]
stack: [python, pytorch, cnn, lstm]
pipelineStage: [Model]
links: {}
metrics:
  - { label: 'National rank', value: '12' }
status: Competition
---

## The problem

Satria Data 2023 asked for an end-to-end pipeline that finds a license plate in a photo and reads
the characters on it. Two problems dressed as one: detection is a localization task, reading is a
sequence task, and a mistake in the first one cannot be fixed by the second.

## What I built

- **Detection**: a CNN with custom activation layers to locate the plate in the frame.
- **Recognition**: an ASTER-style network (CNN encoder, LSTM sequence model) that reads the crop character by character instead of segmenting it first.
- **Pipeline**: both stages chained into one service, with the intermediate crop kept so a wrong reading can be traced back to a wrong crop.

Placed 12th nationally.
