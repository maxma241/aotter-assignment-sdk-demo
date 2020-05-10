import 'promise-polyfill/src/polyfill'
import 'whatwg-fetch'
import './polyfill/event'
import { AotterAds } from './ads'
// import '../public/style/ads.styl'
// impl aotter ads sdk

(function (global, factory) {
  // typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  // typeof define === 'function' && define.amd ? define(factory) :
  global = global || self, global['AotterAds'] = factory();
}(window, function () {
  const version = '0.1'
  console.log(`Aotter Ad Version ${version}`)
  return AotterAds
}));