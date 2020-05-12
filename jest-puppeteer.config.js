module.exports = {
  launch: {
    dumpio: true,
    headless: process.env.HEADLESS !== 'false',
  },
  browser: 'chromium',
  browserContext: 'default',
  server: {
    command: 'PORT=3000 E2E_TEST=true node ./server/index.js',
    port: 3000,
  },
}