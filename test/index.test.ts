import {
  getByLabelText,
  getByText,
  getByTestId,
  queryByTestId,
  // Tip: all queries are also exposed on an object
  // called "queries" which you could import here as well
  waitFor,
  queryHelpers,
} from '@testing-library/dom'
// adds special assertions like toHaveTextContent
import '@testing-library/jest-dom/extend-expect'
import { AotterAds, initialAd } from '../src/ads/index'

function getExampleDOM() {

  const div = document.createElement('div')
  div.innerHTML = `
    <div id="ad-test"></div>
  `
  const config = {
    el: div,
    key: 'test',
    type: 'banner' as any,
    onAdLoaded(el, ad) {
      console.log(ad)
    },
    onAdFailed(el, err) {
      console.error(err)
    },
    onAdImpression(ad) {
      console.log(ad)
    },
  }
  const ad = AotterAds(config)
  return {
    ad,
    config
  }
}

describe('Ad Test', () => {

  let rootConfig: AdsConfig;

  it('Ad Root Creator Config test', async () => {
    const { ad, config } = getExampleDOM()
    rootConfig = config
    expect(ad.config).toMatchObject(config)
  })

  it('test onAdLoaded, snapshot, anchor DOM', async () => {

    const mockedService = {
      getAd: jest.fn(async (type = 'banner') => ({
        "id": "1",
        "type": "BANNER" as any,
        "title": "三星電視獨家搶先支援Apple TV App，手機還能一秒變遙控器！",
        "description": "好消息！三星在本週宣布~即日起旗下2019年全系列智慧電視、和2018年的指定機型將可透過更新支援Apple TV App以及Airplay2啦！",
        "image": "https://agirls.aotter.net/media/da724a8b-fe19-4f4e-8262-75c207ae038b.jpg",
        "url": "https://agirls.aotter.net/post/55419",
        "impression_url": "https://agirls.aotter.net?imp=1",
        "success": true
      })),
      handleImpression: jest.fn(data => data)
    }

    rootConfig.onAdLoaded = jest.fn((node, data) => data)

    const ret = await initialAd({
      config:rootConfig,
      isInView: false,
      hasImpression: false,
    }, mockedService) as AdsContext

    expect(ret.config).toMatchObject(rootConfig)
    expect(rootConfig.onAdLoaded).toBeCalled()
    expect(ret.config.el).toMatchSnapshot('banner')
    const rootAnchor = queryHelpers.queryByAttribute('class', ret.config.el as HTMLElement, 'ad-banner')
    expect(rootAnchor?.getAttribute('href')).toBe("https://agirls.aotter.net/post/55419")
  })


  it('test onAdFailed', async () => {

    const mockedService = {
      getAd: jest.fn(async (type = 'banner') => ({
        success: false,
      }) as any),
      handleImpression: jest.fn(data => data)
    }

    rootConfig.onAdFailed = jest.fn((node, data) => data)

    const ret = await initialAd({
      config:rootConfig,
      isInView: false,
      hasImpression: false,
    }, mockedService) as AdsContext

    expect(ret.config).toMatchObject(rootConfig)
    expect(rootConfig.onAdFailed).toBeCalled()
    expect(ret.config.el).toMatchSnapshot('no-ad')
  })

})