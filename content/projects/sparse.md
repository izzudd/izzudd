---
title: SPARSE
tagline: 'Solar panel detection on satellite imagery, from model to a GIS interface.'
order: 2
featured: true
tags: [AI, Computer Vision, Remote Sensing, GIS]
stack: [python, pytorch, fastapi, vue, leaflet, docker]
pipelineStage: [Model, Serving, Product]
links: {}
metrics: []
---

## The problem

Mapping rooftop solar panels by hand across a region is slow. SPARSE detects them from satellite
tiles so the result can be inspected on a map instead of a spreadsheet.

## What I built

- **Pipeline**: tile ingestion, model inference, and geo-referenced output, so each detection keeps its coordinates.
- **API**: FastAPI service that serves predictions per tile.
- **Interface**: map view where a reviewer can confirm or reject detections.
