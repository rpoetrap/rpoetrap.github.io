var dbPromise = idb.open("football", 1, function(upgradeDb) {
  if (!upgradeDb.objectStoreNames.contains("favTeams")) {
    var favTeams = upgradeDb.createObjectStore("favTeams", {
      keyPath: "teamId"
    });
    favTeams.createIndex("teamName", "teamName", { unique: false });
  }
});

function addFavTeam(data, callback) {
  dbPromise
    .then(function(db) {
      var tx = db.transaction("favTeams", "readwrite");
      var store = tx.objectStore("favTeams");
      var item = {
        teamId: data.id,
        teamName: data.name,
        teamTLA: data.tla
      };
      store.add(item);
      return tx.complete;
    })
    .then(function() {
      callback()
    })
    .catch(function() {
      console.log("Team gagal disimpan.");
    });
}

function getFavTeam(teamId, callback) {
  dbPromise
    .then(function(db) {
      var tx = db.transaction("favTeams", "readonly");
      var store = tx.objectStore("favTeams");
      return store.get(teamId);
    })
    .then(function(val) {
      callback(val);
    });
}

function getAllFavTeams(callback) {
  dbPromise
    .then(function(db) {
      var tx = db.transaction("favTeams", "readonly");
      var store = tx.objectStore("favTeams");
      return store.getAll();
    })
    .then(function(items) {
      callback(items)
    });
}

function updateData() {
  dbPromise
    .then(function(db) {
      var tx = db.transaction("buku", "readwrite");
      var store = tx.objectStore("buku");
      var item = {
        judul: "Menjadi Android Developer Expert (MADE)",
        isbn: 123456789,
        description:
          "Belajar pemrograman Android di Dicoding dengan modul online dan buku.",
        created: new Date().getTime()
      };
      store.put(item); //menambahkan KEY
      return tx.complete;
    })
    .then(function() {
      console.log("Buku berhasil disimpan.");
    })
    .catch(function() {
      console.error("Buku gagal disimpan.");
    });
}

function deleteFavTeam(teamId, callback) {
  dbPromise
    .then(function(db) {
      var tx = db.transaction("favTeams", "readwrite");
      var store = tx.objectStore("favTeams");
      store.delete(teamId);
      return tx.complete;
    })
    .then(function(data) {
      callback(data)
    });
}
