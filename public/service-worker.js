const CACHE_NAME = "app-cache-v2"; // Change version to update cache
const urlsToCache = [
    "/",
    "/index.html",
    "/styles.css", // Add your CSS file
    "/script.js", // Add your JS file
    "/manifest.json",
    "/images/logo.png" // Example image
];

// Install: Cache essential assets
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlsToCache);
        })
    );
});

// Fetch: Serve from cache first, fallback to network
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            return cachedResponse || fetch(event.request).catch(() => {
                // Fallback response (optional)
                if (event.request.destination === "document") {
                    return caches.match("/index.html");
                }
            });
        })
    );
});

// Activate: Delete old caches
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});
