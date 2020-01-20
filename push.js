var webPush = require("web-push");

const vapidKeys = {
  publicKey:
    "BMeVaUN6ct63041yN0eG3wRnql2RKkqkyLbHC7MmbvI6fMjXNzzEgW_E4o4UHz_FX_xwFVF6-0ZiJuDNa6wc1GA",
  privateKey: "rHDUvjkMG0bR1VcIlzjE9O1fOyyKMlJywU9gLMOOChs"
};

webPush.setVapidDetails(
  "mailto:notif@dasar.com",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

var payload = "Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!";

var options = {
  gcmAPIKey: "951076692640",
  TTL: 60
};

var pushSubscription = {
  "endpoint": "https://fcm.googleapis.com/fcm/send/ePPOQgS_FYo:APA91bG94tfZK2ROvAsUNlNFrooilmsGPM3wDvUSEsKIPrAy5Ej427a291v5huGXN3qCfGD279-khxf6zfl_2laiDsAyVwZfcop1fqIaqZst9NL9gS1LleNVlE7Eg1x927qqnRwY1PtM",
  "keys": {
    "p256dh": "BNZtypQeNyOZISlc6r9GhS8rxd4857URpl84RJ_37nt7-u2jj2pdZWAfscgtK8iYKnO3epRykmvsXP9lYiuhKg4",
    "auth": "P1FSBuqOSyyNZxZ6gxk7vA"
  }
};

webPush.sendNotification(pushSubscription, payload, options);
