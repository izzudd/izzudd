---
title: SPARSE
tagline: 'Solar panel detection on satellite imagery, from model to a GIS interface.'
order: 2
featured: true
role: Team lead, model
timeframe: '2024'
tags: [AI, Computer Vision, Remote Sensing, GIS]
stack: [python, pytorch, fastapi, vue, leaflet, docker]
pipelineStage: [Model, Serving, Product]
links: {}
metrics:
  - { label: 'Test F1 (MaxViT-B)', value: '0.6459' }
status: Awarded
---

## The problem

Mapping rooftop solar panels by hand across a region is slow. SPARSE detects them from satellite
tiles so the result can be inspected on a map instead of a spreadsheet.

## What I built

- **Pipeline**: tile ingestion, model inference, and geo-referenced output, so each detection keeps its coordinates.
- **API**: FastAPI service that serves predictions per tile.
- **Interface**: map view where a reviewer can confirm or reject detections.

## The competition half

The project was the Company Capstone with Solafune Japan in Bangkit Academy, and I led the team. We
benchmarked four vision architectures (ResNet, EfficientNetV2, CoAtNet, MaxViT) on 12-band
Sentinel-2 imagery before settling on MaxViT Base, which gave us a 0.6459 test F1. We placed #1 in
the company capstone track and #1 overall across the academy.
