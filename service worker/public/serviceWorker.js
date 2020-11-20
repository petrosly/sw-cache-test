var dynamicCacheName = 'my-dynamic-cache';

self.addEventListener('install', function (e) {
    //Perform install steps
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Opened cache!');
            return cache.addAll(urlsToCache);
        })
    );
});

// activate event
self.addEventListener('activate', (evt) => {
    evt.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys
                    .filter((key) => key !== dynamicCacheName)
                    .map((key) => caches.delete(key))
            );
        })
    );
});

self.addEventListener('fetch', (evt) => {
    evt.respondWith(
        caches.match(evt.request).then((cacheRes) => {
            return (
                cacheRes ||
                fetch(evt.request).then((fetchRes) => {
                    return caches.open(dynamicCacheName).then((cache) => {
                        cache.put(evt.request.url, fetchRes.clone());
                        return fetchRes;
                    });
                })
            );
        })
    );
});
