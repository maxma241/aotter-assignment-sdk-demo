## 電獺 - Ad SDK

Build tool: Parcel

## How to run

Install
```shell
npm i
# or
yarn
```
Run the api server first (default port: 3000)
```shell
npm run server
# or
yarn run server
```

Run client (default port: 8080, `dist` folder)
```shell
npm start
# or
yarn start
```

Build (in `build` folder, current js, css will be separated)
```shell
npm run build
# or
yarn run build
```

[上線計畫書]()


### Import the JS SDK

Add script in `head` or dynamic append `<script>` element

```html
<script src="path/to/js/cdn/0.1/xxx.js"></script>
```

### How to use:

Add the ad field to `<body>`

```html
<div id="your-id"></div>
```

then add the script after your Ad field

```html
<script>
  var ad = AotterAds({
    el: 'your-id',
    type: 'video', // 'video' | 'banner'
    // when ad loaded
    onAdLoaded(el, ad) {
      // el: your Ad DOM
      // ad: the Ad data
    },
    // when ad load failed
    onAdFailed(el, err) {
      // el: your Ad DOM
      // err: The error
    },
    // when ad is visible over 50% and 1 second
    onAdImpression(ad) {
      // ad: the Ad data
    },
  });
  ad.init()
</script>
```

### 廣告欄未說明

| key            | 說明                      |  type   | 備註                   |
| -------------- | :------------------------ | :-----: | ---------------------- |
| success        | 載入是否成功              | boolean |                        |
| id             | 廣告id                    | string  |                        |
| type           | 類型: 'BANNER' or 'VIDEO' | string  |                        |
| title          | 標題                      | string  |                        |
| description    | 廣告敘述                  | string  |                        |
| image          | 圖片網址                  | string  |                        |
| url            | banner 廣告網址           | string  | banner類型才會有此欄位 |
| video_url      | video 廣告影片網址        | string  | video類型才會有此欄位  |
| impression_url | TEXT                      | string  |                        |

