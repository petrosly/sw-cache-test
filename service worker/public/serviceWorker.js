var CACHE_NAME = 'my-cache';
var urlsToCache = [
    '/index.html',
    '/style.css',
    '/main.js',
    '/pexels.mp4',
    '/video1.mp4',
    '/video2.mp4',
    '/video3.mp4',
];

self.addEventListener('install', function (e) {
    //Perform install steps
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Opened cache!');
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request).then(function (response) {
            // Cache hit - return response
            if (response) {
                return response;
            }
            return fetch(event.request);
        })
    );
});
