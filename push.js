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
   "endpoint": "https://fcm.googleapis.com/fcm/send/f_NsZV1gTd0:APA91bF1_WkCOBw608c8t17CkdMJtsE7I2a5p-ogytEJglXXO18Umrr0yqrsPIcvX0bKvPAPNOYHEC5fbhqLqsEMk24YSzrXPVF3fBiBNrYSVQ3iUT6kUBiINDZp4GW-ThbglIZzgyU1",
   "keys": {
      "p256dh": "BCqxwiV5zE-ATTYviJjtC7dhS4Eqhh_GcU7lvOZBXMcSoAdL7p6m9IbTrDqjqIZ5zRJtDPLJQZDUS8QtoUASFrM",
      "auth": "gkWeEofY5Dt2jl6NmNsbNg"
   }
};

webPush.sendNotification(pushSubscription, payload, options);
