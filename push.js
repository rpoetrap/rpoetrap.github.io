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
  "endpoint": "https://fcm.googleapis.com/fcm/send/cF0vtibEalo:APA91bEvn6XDjLMuSr-Mcft7dKPaadyPJY1jrTMNg6brVIWhpjOqjK0GqkwwUIE0kw0G6DIzyJbCOEryICGTWRBqlZI530AvfUlY28VBktC4Fz3vaGnuBySwUMmEPClwPG6c7nz6Kx_t",
  "keys": {
    "p256dh": "BILYnA9BDhYgbiVshXAG-1zlZktvK5gLGTb-olTXbDKnJQmzflcxExh3o2buKOLieAegrFkcnpKOnziI1cRJWBY",
    "auth": "21xfhAi6GgR1FgSjqgSVZA"
  }
};

webPush.sendNotification(pushSubscription, payload, options);
