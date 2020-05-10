

export function initialWindowScrollEventHandler(ctx: AdsContext, service: any) {
  let timeout = -1
  const stopTime = 1000
  if ('IntersectionObserver' in window ) {
    const observer = new IntersectionObserver(entries => {
      if(entries[0].isIntersecting === true) {
        timeout = setTimeout(() => {
          ctx.config.onAdImpression(ctx.currentAdData)
          service.handleImpression(ctx.currentAdData)
          // only observe once
          observer.unobserve(ctx.config.el as Element)
        }, stopTime);
      }
      else {
        window.clearTimeout(timeout)
      }
    }, { threshold: [0.5] });
    
    observer.observe(ctx.config.el as Element);
  } else {
    // for IE
    const handler = () => {
      if (isScrolledIntoView(ctx.config.el as Element) && !ctx.isInView) {
        ctx.isInView = true
        timeout = setTimeout(() => {
          if (isScrolledIntoView(ctx.config.el as Element)) {
            // call impression url once
            ctx.hasImpression = true
            ctx.config.onAdImpression(ctx.currentAdData)
            service.handleImpression(ctx.currentAdData)
          }
        }, stopTime)
      } else {
        ctx.isInView = false
        window.clearTimeout(timeout)
      }
    }
     window.addEventListener('scroll', handler)
     handler();
  }

}

function isScrolledIntoView(el: Element, percentVisible = 50) {
  let rect = el.getBoundingClientRect()
  let windowHeight = (window.innerHeight || document.documentElement.clientHeight);

  return !(
    Math.floor(100 - (((rect.top >= 0 ? 0 : rect.top) / +-(rect.height / 1)) * 100)) < percentVisible ||
    Math.floor(100 - ((rect.bottom - windowHeight) / rect.height) * 100) < percentVisible
  )
}