const CACHE_NAME = "t1d-food-impact-v1";
const urlsToCache = ["/", "/index.html", "/manifest.json"];

// Установка
self.addEventListener( "install", ( event ) => {
  event.waitUntil(
    caches.open( CACHE_NAME ).then( ( cache ) => {
      return cache.addAll( urlsToCache );
    } )
  );
} );

// Активация (очистка старых кэшей)
self.addEventListener( "activate", ( event ) => {
  event.waitUntil(
    caches.keys().then( ( keys ) =>
      Promise.all( keys.map( ( k ) => k !== CACHE_NAME && caches.delete( k ) ) )
    )
  );
} );

// Интерцепт запросов
self.addEventListener( "fetch", ( event ) => {
  event.respondWith(
    caches.match( event.request ).then(
      ( resp ) => resp || fetch( event.request ).catch( () => caches.match( "/index.html" ) )
    )
  );
} );
