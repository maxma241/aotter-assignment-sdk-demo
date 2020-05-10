// import { createEventBus, EventName, AdsEvents } from './event-handler';
import { findAdElement, createAdsDOM } from './ads-dom';
import { adsService } from '../service/ads.service';
import { initialWindowScrollEventHandler } from './scroll-handler';


export function AotterAds(config: AdsConfig) {

  const ctx: AdsContext = {
    config,
    isInView: false,
    hasImpression: false,
  }

  try {
    verifyEnv()
    config.el = findAdElement(ctx.config.el)
  } catch (error) {
    config.onAdFailed(ctx.config.el, error)
    throw error;
  }
  
  return {
    init: () => {
      initialAd(ctx)
    },
  }
}

export function verifyEnv() {
  if (!window) {
    throw Error('SDK should run on Browser environment.')
  }
}

export function initialAd(ctx: AdsContext) {
  const service = adsService(ctx.config.key);

  service.getAd(ctx.config.type)
    .then(ad => {
      // create DOM
      try {
        if (!ad) { return; }
        if (!ad.success) {
          throw Error('load ad failed.')
        }
        ctx.currentAdData = ad
        createAdsDOM(ctx.config.el as any, ctx.currentAdData)
        initialWindowScrollEventHandler(ctx, service)
        ctx.config.onAdLoaded(ctx.config.el, ad)
        return
      } catch (error) {
        // error log API
        return Promise.reject(error)
      }
    })
    .catch(err => {
      ctx.config.onAdFailed(ctx.config.el, err)
    })
}
