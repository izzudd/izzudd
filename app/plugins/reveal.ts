/**
 * v-reveal: fades an element in when it enters the viewport.
 * Value: number = stagger delay in ms.
 *
 * Registered on both server and client (Vue needs the directive to exist during
 * SSR), but it only ever does anything in the browser.
 */
export default defineNuxtPlugin((nuxtApp) => {
  let observer: IntersectionObserver | null = null

  const getObserver = () => {
    if (observer) return observer
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.classList.add('is-visible')
          observer?.unobserve(entry.target)
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 }
    )
    return observer
  }

  nuxtApp.vueApp.directive('reveal', {
    getSSRProps() {
      return {}
    },
    mounted(el: HTMLElement, binding) {
      if (import.meta.server) return
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reduceMotion || typeof IntersectionObserver === 'undefined') return

      el.classList.add('reveal')
      const delay = typeof binding.value === 'number' ? binding.value : 0
      if (delay) el.style.setProperty('--reveal-delay', `${delay}ms`)
      getObserver().observe(el)
    },
    unmounted(el: HTMLElement) {
      if (import.meta.server) return
      observer?.unobserve(el)
    },
  })
})
