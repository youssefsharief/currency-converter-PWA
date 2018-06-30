const version = "0.8";
const cacheName = `converter_${version}`;
const filesToCache = [
  './',
  './index.html',
  'static/css/main.css',
  'static/js/main.js',
];



self.addEventListener("install", event => {
  console.log("[Service Worker] installing ");
  event.waitUntil(
    caches.open(cacheName).then(cache => {
      console.log("[Service Worker] caching all files");
      return cache.addAll(filesToCache);
    }).then(() => self.skipWaiting()).catch(err => console.log("error occured in caching files ==> ",err))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request)
    })
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keyList => {
      Promise.all(
        keyList.map(key => {
          if (key !== cacheName) {
            caches.delete(key);
          }
        })
      );
    })
  );
});
