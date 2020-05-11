// import { createEventBus, EventName, AdsEvents } from './event-handler';
import { findAdElement, createAdsDOM } from './ads-dom';
import { adsService, AdsService } from '../service/ads.service';
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
    config,
    init: () => {
      initialAd(ctx, adsService(ctx.config.key))
    },
  }
}

export function verifyEnv() {
  if (!window) {
    throw Error('SDK should run on Browser environment.')
  }
}

export function initialAd(ctx: AdsContext, service: AdsService) {

  return service.getAd(ctx.config.type)
    .then(ad => {
      // create DOM
      try {
        if (!ad) { return ctx; }
        if (!ad.success) {
          throw Error('load ad failed.')
        }
        ctx.currentAdData = ad
        createAdsDOM(ctx.config.el as any, ctx.currentAdData)
        initialWindowScrollEventHandler(ctx, service)
        ctx.config.onAdLoaded(ctx.config.el, ad)
        return ctx
      } catch (error) {
        // error log API
        return Promise.reject(error)
      }
    })
    .catch(err => {
      ctx.config.onAdFailed(ctx.config.el, err)
      return ctx
    })
}
