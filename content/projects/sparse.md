---
title: SPARSE
tagline: Solar panel detection on satellite imagery, from model to a GIS interface.
order: 2
featured: true
role: TODO peranmu (model / backend / GIS / semua)
timeframe: TODO tahun
tags: [AI, Computer Vision, Remote Sensing, GIS]
stack: [python, pytorch, fastapi, vue, leaflet, docker]
pipelineStage: [Model, Serving, Product]
links: {}
metrics: []
# TODO: isi status kalau sudah jelas, contoh: 'Case study' / 'Demo on request' / 'Shipped'
# status: ''
---

## The problem

Mapping rooftop solar panels by hand across a region is slow. SPARSE detects them from satellite
tiles so the result can be inspected on a map instead of a spreadsheet.

## What I built

- **Pipeline**: tile ingestion → model inference → geo-referenced output, so each detection keeps
  its coordinates.
- **API**: FastAPI service that serves predictions per tile.
- **Interface**: map view where a reviewer can confirm or reject detections.

## Notes

<!-- TODO Daffa: satu paragraf teknis yang tidak kelihatan dari UI — kelas apa yang diprediksi,
     ukuran dataset, resolusi tile, metrik evaluasi (mAP/IoU), dan apa yang paling sulit. -->
