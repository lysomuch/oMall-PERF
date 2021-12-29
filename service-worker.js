/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "2979292fa1ee544c2bea245a59295696"
  },
  {
    "url": "assets/css/0.styles.a57395e0.css",
    "revision": "9c3323b3c274af24c0b08bd5397b7347"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.df913fac.js",
    "revision": "93eefd87070e36de0aeb49af5200165e"
  },
  {
    "url": "assets/js/11.89a377b3.js",
    "revision": "a5bd4550819465b746b5433e5f347f67"
  },
  {
    "url": "assets/js/12.d6a1e82f.js",
    "revision": "50377c9ad2666a913bc28806abd09a1d"
  },
  {
    "url": "assets/js/13.e7993bb7.js",
    "revision": "d4d234c0476b551d1ce36f09304664d9"
  },
  {
    "url": "assets/js/14.eb078b76.js",
    "revision": "c5a121b65c4e6c56e7da6e04de75bc7a"
  },
  {
    "url": "assets/js/15.d1c3c8a1.js",
    "revision": "c14aa7d5b5b6f49ec692f9e6f89b1137"
  },
  {
    "url": "assets/js/16.a7d4da49.js",
    "revision": "cb2416f969dad147202d4e0805e20a15"
  },
  {
    "url": "assets/js/17.0fa934f4.js",
    "revision": "6cabf615023a6a9686f0fb2e31e4f5a9"
  },
  {
    "url": "assets/js/18.971e4300.js",
    "revision": "faab045b3de72bdb34cf48210ced429c"
  },
  {
    "url": "assets/js/19.5a0f3ecd.js",
    "revision": "c668156f294554859cc0914d295e3df3"
  },
  {
    "url": "assets/js/20.17e2e13f.js",
    "revision": "632f95b597dace3b12d5342fadcaa7a8"
  },
  {
    "url": "assets/js/21.8447c5ea.js",
    "revision": "d885d2714b3d598a9bfede34d21834da"
  },
  {
    "url": "assets/js/4.a7041a76.js",
    "revision": "2190aeb442623c7c5eac7e95a53cb5a1"
  },
  {
    "url": "assets/js/5.009e70e6.js",
    "revision": "d4e80ee5ff7183bb93c17d127c48e4bf"
  },
  {
    "url": "assets/js/6.5533d298.js",
    "revision": "72684fb9c7682fa827f44ac5a08b2fba"
  },
  {
    "url": "assets/js/7.3bef3d36.js",
    "revision": "613ff6ecb3a5c55e5615b366f0e864e4"
  },
  {
    "url": "assets/js/8.4f8ee984.js",
    "revision": "52ed964450ad8cf2a62707e8193ebafb"
  },
  {
    "url": "assets/js/9.7c4d4c84.js",
    "revision": "d4da0f70116149c6c0335d8ab028ec66"
  },
  {
    "url": "assets/js/app.6e093351.js",
    "revision": "33d315e195f90ae04deb0b8fb750775a"
  },
  {
    "url": "assets/js/vendors~docsearch.8ea4cde2.js",
    "revision": "8bd70455bbe23ba9f0f4792581b6bc7a"
  },
  {
    "url": "assets/js/vendors~notification.92a6efe3.js",
    "revision": "f8f50b7ae8ad6642510a38d15a90a243"
  },
  {
    "url": "icons/android-chrome-192x192.png",
    "revision": "f130a0b70e386170cf6f011c0ca8c4f4"
  },
  {
    "url": "icons/android-chrome-512x512.png",
    "revision": "0ff1bc4d14e5c9abcacba7c600d97814"
  },
  {
    "url": "icons/apple-touch-icon-120x120.png",
    "revision": "936d6e411cabd71f0e627011c3f18fe2"
  },
  {
    "url": "icons/apple-touch-icon-152x152.png",
    "revision": "1a034e64d80905128113e5272a5ab95e"
  },
  {
    "url": "icons/apple-touch-icon-180x180.png",
    "revision": "c43cd371a49ee4ca17ab3a60e72bdd51"
  },
  {
    "url": "icons/apple-touch-icon-60x60.png",
    "revision": "9a2b5c0f19de617685b7b5b42464e7db"
  },
  {
    "url": "icons/apple-touch-icon-76x76.png",
    "revision": "af28d69d59284dd202aa55e57227b11b"
  },
  {
    "url": "icons/apple-touch-icon.png",
    "revision": "66830ea6be8e7e94fb55df9f7b778f2e"
  },
  {
    "url": "icons/favicon-16x16.png",
    "revision": "4bb1a55479d61843b89a2fdafa7849b3"
  },
  {
    "url": "icons/favicon-32x32.png",
    "revision": "98b614336d9a12cb3f7bedb001da6fca"
  },
  {
    "url": "icons/msapplication-icon-144x144.png",
    "revision": "b89032a4a5a1879f30ba05a13947f26f"
  },
  {
    "url": "icons/mstile-150x150.png",
    "revision": "058a3335d15a3eb84e7ae3707ba09620"
  },
  {
    "url": "icons/safari-pinned-tab.svg",
    "revision": "f78c0251d6ddd56ee219a1830ded71b4"
  },
  {
    "url": "index.html",
    "revision": "16e4350fa93f4a087a412b52c2db4edc"
  },
  {
    "url": "logo.png",
    "revision": "5c85e71fd21761c50faaba0c3e770c3f"
  },
  {
    "url": "logo.svg",
    "revision": "edee1b26181f8caa5caf6343c841ce7f"
  },
  {
    "url": "notes/base/01-基础知识.html",
    "revision": "df7b754858594cf35b73e20805416894"
  },
  {
    "url": "notes/base/02-使用 HTTP2.html",
    "revision": "0ecaf23a9cf8606540dec3acabfceafc"
  },
  {
    "url": "notes/base/03-环境配置.html",
    "revision": "aa6078a5d8748b2c9e241887a35f1bf5"
  },
  {
    "url": "notes/cache/01-api接口缓存.html",
    "revision": "28c7594ebbabd4db71773f4f5d52da57"
  },
  {
    "url": "notes/cache/02-页面缓存.html",
    "revision": "610beaaf71ce622af49d0b7eac976a69"
  },
  {
    "url": "notes/cache/03-CSS Tree Shaking.html",
    "revision": "b1ff3890fa3457c1ad92a6814000faae"
  },
  {
    "url": "notes/cache/04-JS Tree Shaking.html",
    "revision": "74246dbdf327f48a90da73be6a3989fd"
  },
  {
    "url": "notes/cache/05-使用 DLLPlugin 加快打包速度.html",
    "revision": "2e9e8d0f5bb7522d05c7e0c40aec04c3"
  },
  {
    "url": "notes/index.html",
    "revision": "0368ccb772b6ac59851070cbe8b380db"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
