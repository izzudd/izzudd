---
role: Full-Stack AI Engineer
company: Mayfeyr
period: 2024-12 to present
start: '2024-12-01'
type: Remote · Full-time
location: Remote
current: true
summary: Catalogue ingestion, pricing, storefront content, and the AI features on top of them for a D2C clothing brand.
highlights:
  - 'Rebuilt catalogue ingestion as a distributed pipeline in Python and RabbitMQ: daily stock and price syncs, storefront product pages generated, and onboarding a large supplier catalogue without losing work.'
  - Integrated external supplier APIs behind strict retry queues and kept sync failures out of the storefront, which is the difference between a stale price and a negative-margin order.
  - Refactored the pricing engine around DataLoader batching and cut per-product pricing from 100ms to 10ms, a 10x throughput gain.
  - Pulled the hot paths out into Go microservices (pricing, image caching, content generation, PDF rendering) and moved the rest of the background work onto Celery and n8n.
  - Built Mayfeyr Mirror, the virtual try-on engine, from zero to one, plus custom ChatGPT apps that take a conversational shopping query straight to a product.
stack: [python, go, rabbitmq, postgresql, celery, docker]
---

I also own the multi-server infrastructure and the technical SEO/GEO work that got the full catalogue indexed.
