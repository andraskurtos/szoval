const cacheName = "v1";
async function impl(e) {
    let cache = await caches.open(cacheName);
    let cacheResponse = await cache.match(e.request);
    if (cacheResponse)
        return cacheResponse
    else {
        let networkResponse = await fetch(e.request);
        cache.put(e.request, networkResponse.clone())
        return networkResponse;
    }
}
self.addEventListener("fetch", e => e.respondWith(impl(e)));
self.addEventListener("push", e=> {
    let data = e.data?.text();
    self.registration.showNotification("WORDLE", {"body":data, "icon":"./logo192.png"}); 
});