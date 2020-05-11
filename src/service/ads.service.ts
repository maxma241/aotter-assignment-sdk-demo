import { apiConfig } from '../config'


export const adsService = (key: string) => {
  return {
    getAd: (type: string = ''): Promise<AdApiResponseVM> => window.fetch(`${apiConfig.url}/ads?type=${type}`, { method: 'GET', headers: { key, 'Content-Type': 'application/json' } })
    .then(res => res.json()),
    handleImpression: (data:　AdApiResponseVM) => {
      console.log('handle Impression url: ' + data.impression_url)
    }
  }
}

export interface AdsService {
  getAd: (type?: string) => Promise<AdApiResponseVM>
  handleImpression: (data: AdApiResponseVM) => any
}
