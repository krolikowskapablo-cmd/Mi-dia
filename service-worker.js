const CACHE_NAME = "mi-app-cache-v1";

const urlsToCache = [
  "/",
  "/index.html",
  "/manifest.json"
];

// Instalar y guardar archivos en caché
self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});

// Activar
self.addEventListener("activate", function(event) {
  console.log("Service Worker activado");
});

// Interceptar solicitudes
self.addEventListener("fetch", function(event) {
  event.respondWith(
    fetch(event.request).catch(function() {
      return caches.match(event.request);
    })
  );
});
