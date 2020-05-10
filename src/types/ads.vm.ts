interface AdsContext {
  isInView: boolean
  hasImpression: boolean
  currentAdData?: AdApiResponseVM
  config: AdsConfig
}

interface AdsConfig {
  el: HTMLElement | string
  key: string
  type: 'banner' | 'video'
  onAdLoaded: (...args: any) => void
  onAdFailed: (...args: any) => void
  onAdImpression: (adData: any) => void
}

type AdApiResponseVM =  AdApiResponseBannerVM | AdApiResponseVideoVM

interface AdApiResponseBannerVM {
  id: string
  type: 'BANNER',
  title: string
  description: string
  image: string
  url: string
  impression_url: string
  success: boolean
}

interface AdApiResponseVideoVM {
  id: string
  type: 'VIDEO',
  title: string
  description: string
  image: string
  video_url: string
  impression_url: string
  success: boolean
}