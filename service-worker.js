console.log('Service worker loaded');

const cacheVersion = 'v7';

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(cacheVersion)
        .then(function (cache) {
            return cache.addAll([
                '/',
                'index.html',
                '/assets/',
            ])
        })
    );
});

self.addEventListener('activate', function (event) {
    event.waitUntil(clients.claim());
});

self.addEventListener('fetch', function (event) {
    if (event.request.method === 'GET') {
        event.respondWith(
            caches.match(event.request)
            .then(function (response) {
                return response || fetch(event.request)
                    .then(function (response) {
                        const responseClone = response.clone();
                        caches.open(cacheVersion)
                            .then(function (cache) {
                                cache.put(event.request, responseClone);
                            })

                        return response;
                    })
            })
            .catch(function () {
                return caches.match('index.html');
            })
        );
    }
});

self.addEventListener('message', function (event) {
    if (event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});