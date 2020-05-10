import '../../public/style/ads.styl'


export function findAdElement(element: any) {
  if (element instanceof HTMLElement) {
    return element;
  }
  if (typeof element === 'string') {
    const el = window.document.getElementById(element)
    if (!el) {
      throw Error('ads field is not exist.')
    }
    return el;
  }
  throw Error('ads field is not exist.')
}

export function createAdsDOM(el: HTMLElement, ad: AdApiResponseVM) {
  let adDOM = ''
  if (ad.type === 'VIDEO') {
    adDOM = geVideoTemplate(ad)
  } else {
    adDOM = getBannerTemplate(ad)
  }
  el.innerHTML = adDOM
}

const geVideoTemplate = (ad: AdApiResponseVideoVM) => `
<div class="ad-container">
<a class="ad-video" taget="_blank" href="${ad.video_url}">
<div class="image">
  <div class="content">
    <img class="ads-img" src="${ad.image}" alt="" />
  </div>
</div>

<div class="player">
  <div class="player-icon"></div>
</div>
<div class="title">
  <div class="content">
    <div class="main">
      <span>${ad.title}</span>
    </div>
  </div>
</div>
</a>
</div>
`;

const getBannerTemplate = (ad: AdApiResponseBannerVM) => `
<div class="ad-container">
<a class="ad-banner" href="${ad.url}" target="_blank">
  <div class="image">
    <div class="content">
      <img class="ads-img" src="${ad.image}" alt="" />
    </div>
  </div>
  
  <div class="info">
    <div class="info-icon">
      <img src="https://static.xx.fbcdn.net/rsrc.php/v3/ys/r/SRBDu_p7126.png" alt="" height="20" width="20">
    </div>
  </div>
  <div class="title">
    <div class="content">
      <div class="domain">
        <span>agirls.aotter.net</span>
      </div>
      <div class="main">
        <span>${ad.title}</span>
      </div>
    </div>
  </div>
</a>
</div>`;