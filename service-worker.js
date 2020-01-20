importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js"
);

if (workbox) {
  console.log(`Workbox berhasil dimuat`);

  const cachedResponseWillBeUsed = ({ cache, request, cachedResponse }) => {
    // If there's already a match against the request URL, return it.
    if (cachedResponse) {
      return cachedResponse;
    }
    return caches.match(request.url, { ignoreSearch: true });
  };

  const queryCachingStrategy = workbox.strategies.cacheFirst({
    cacheName: "pages",
    cacheableResponse: { statuses: [0, 200] },
    plugins: [{ cachedResponseWillBeUsed }]
  });

  workbox.precaching.precacheAndRoute([
    "/static/js/jquery-3.4.1.min.js",
    "https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js",
    { url: "/manifest.json", revision: "1" },
    { url: "/index.html", revision: "1" },
    { url: "/nav.html", revision: "1" },
    { url: "/database.js", revision: "1" },
    { url: "/static/css/materialize.min.css", revision: "1" },
    { url: "/static/css/style.css", revision: "1" },
    { url: "/static/js/main.js", revision: "1" },
    { url: "/static/js/materialize.min.js", revision: "1" },
    { url: "/static/js/vendor/idb.js", revision: "1" },
    { url: "/static/js/api.js", revision: "1" },
    { url: "/static/js/nav.js", revision: "1" }
  ]);

  workbox.routing.registerRoute(
    new RegExp("/pages/"),
    workbox.strategies.staleWhileRevalidate({
      cacheName: "pages"
    })
  );

  workbox.routing.registerRoute(
    new RegExp("/competition.html"),
    queryCachingStrategy
  );

  workbox.routing.registerRoute(
    new RegExp("/team.html"),
    queryCachingStrategy
  );

  workbox.routing.registerRoute(
    /^https:\/\/fonts\.googleapis\.com/,
    workbox.strategies.staleWhileRevalidate({
      cacheName: "fonts"
    })
  );

  workbox.routing.registerRoute(
    /^https:\/\/fonts\.gstatic\.com/,
    workbox.strategies.staleWhileRevalidate({
      cacheName: "fonts"
    })
  );

  workbox.routing.registerRoute(
    new RegExp("http://api.football-data.org/v2/"),
    workbox.strategies.staleWhileRevalidate({
      cacheName: "football"
    })
  );

  workbox.routing.registerRoute(
    /\.(?:png|gif|jpg|jpeg|svg)$/,
    workbox.strategies.cacheFirst({
      cacheName: "images",
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 60,
          maxAgeSeconds: 30 * 24 * 60 * 60 // 30 hari
        })
      ]
    })
  );
} else console.log(`Workbox gagal dimuat`);

self.addEventListener("notificationclick", function(event) {
  event.notification.close();

  if (!event.action) {
    console.log("Notification Click.");
    return;
  }
  switch (event.action) {
    case "yes-action":
      console.log("Pengguna memilih action yes.");
      // buka tab baru
      clients.openWindow("https://google.com");
      break;
    case "no-action":
      console.log("Pengguna memilih action no");
      break;
    default:
      console.log(`Action yang dipilih tidak dikenal: '${event.action}'`);
      break;
  }
});

self.addEventListener("push", function(event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = "Push message no payload";
  }
  var options = {
    body: body,
    icon: "/static/icon-152.png",
    badge: "/static/icon-152.png",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    requireInteraction: true,
    actions: [
      {
        action: "yes-action",
        title: "Iya"
      },
      {
        action: "no-action",
        title: "Tidak"
      }
    ]
  };
  event.waitUntil(
    self.registration.showNotification("Basic Laboratory", options)
  );
});
