const CACHE_NAME = "app-cache-v3"; // Increment version to update cache
const urlsToCache = [
    "./",  
    "./index.html",
    "./styles.css", 
    "./script.js",
    "./manifest.json",
    "./images/logo.png"
];

// Install: Cache essential assets
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlsToCache);
        })
    );
    self.skipWaiting(); // Activate service worker immediately
});

// Fetch: Serve from cache first, then fetch from network
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            return cachedResponse || fetch(event.request).then((networkResponse) => {
                return caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, networkResponse.clone()); // Store for future use
                    return networkResponse;
                });
            });
        }).catch(() => {
            // Fallback to cached home page if offline
            if (event.request.destination === "document") {
                return caches.match("./index.html");
            }
        })
    );
});

// Activate: Delete old caches
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.filter(cache => cache !== CACHE_NAME)
                .map(cache => caches.delete(cache))
            );
        })
    );
    self.clients.claim(); // Take control immediately
});
