// REGISTER SERVICE WORKER
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then(function() {
        console.log("Pendaftaran ServiceWorker berhasil");
      })
      .catch(function() {
        console.log("Pendaftaran ServiceWorker gagal");
      });
  });
} else {
  console.log("ServiceWorker belum didukung browser ini.");
}

// Periksa fitur Notification API
if ("Notification" in window) {
  requestPermission();
} else {
  console.error("Browser tidak mendukung notifikasi.");
}

// Meminta ijin menggunakan Notification API
function requestPermission() {
  Notification.requestPermission().then(function(result) {
    if (result === "denied") {
      console.log("Fitur notifikasi tidak diijinkan.");
      return;
    } else if (result === "default") {
      console.error("Pengguna menutup kotak dialog permintaan ijin.");
      return;
    }
    if ("PushManager" in window) {
      navigator.serviceWorker.getRegistration().then(function(registration) {
        registration.pushManager
          .subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(
              "BMeVaUN6ct63041yN0eG3wRnql2RKkqkyLbHC7MmbvI6fMjXNzzEgW_E4o4UHz_FX_xwFVF6-0ZiJuDNa6wc1GA"
            )
          })
          .then(function(subscribe) {
            console.log(subscribe);
            
            console.log(
              "Berhasil melakukan subscribe dengan endpoint: ",
              subscribe.endpoint
            );
            console.log(
              "Berhasil melakukan subscribe dengan p256dh key: ",
              btoa(
                String.fromCharCode.apply(
                  null,
                  new Uint8Array(subscribe.getKey("p256dh"))
                )
              )
            );
            console.log(
              "Berhasil melakukan subscribe dengan auth key: ",
              btoa(
                String.fromCharCode.apply(
                  null,
                  new Uint8Array(subscribe.getKey("auth"))
                )
              )
            );
          })
          .catch(function(e) {
            console.error("Tidak dapat melakukan subscribe ", e.message);
          });
      });
    }
    console.log("Fitur notifikasi diijinkan.");
  });
}

function showNotif(message, tag) {
  const title = "Notifikasi Sederhana";
  const options = {
    body: message,
    tag: tag,
    renotify: true,
    icon: "/static/icon-152.png",
    badge: "/static/icon-152.png",
    image: "/static/images/slider-1.png",
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
  if (Notification.permission === "granted") {
    navigator.serviceWorker.ready.then(function(registration) {
      registration.showNotification(title, options);
    });
  } else {
    console.error("Fitur notifikasi tidak diijinkan.");
  }
}

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
