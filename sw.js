self.addEventListener('install', e => { e.waitUntil(caches.open('app-cache-v1').then(c => c.addAll(['/','/index.html','/manifest.json']))); });
