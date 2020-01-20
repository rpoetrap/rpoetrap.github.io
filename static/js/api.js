var football = {
  base_url: "http://api.football-data.org/v2/",
  keys: "c8d6b1ea2fe5430587062bdb8d4aed32",
  getAllCompetitions: function(callback) {
    let endpoint = "competitions/?plan=TIER_ONE";
    if ("caches" in window) {
      caches.match(this.base_url + endpoint).then(function(response) {
        if (response) {
          response.json().then(function(data) {
            console.log("caches found");

            callback(data);
          });
        }
      });
    }
    fetch(this.base_url + endpoint, { headers: { "X-Auth-Token": this.keys } })
      .then(status)
      .then(json)
      .then(function(data) {
        callback(data);
      });
  },
  getCompetitionById: function(callback) {
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");
    let endpoint = "competitions/" + idParam + "/standings";
    if ("caches" in window) {
      caches.match(this.base_url + endpoint).then(function(response) {
        if (response) {
          response.json().then(function(data) {
            console.log("caches found");

            callback(data);
          });
        }
      });
    }
    fetch(this.base_url + endpoint, {
      headers: { "X-Auth-Token": this.keys }
    })
      .then(status)
      .then(json)
      .then(function(data) {
        callback(data);
      });
  },
  getTeamById: function(callback) {
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");
    let endpoint = "teams/" + idParam;
    if ("caches" in window) {
      caches.match(this.base_url + endpoint).then(function(response) {
        if (response) {
          response.json().then(function(data) {
            console.log("caches found");

            callback(data);
          });
        }
      });
    }
    fetch(this.base_url + endpoint, {
      headers: { "X-Auth-Token": this.keys }
    })
      .then(status)
      .then(json)
      .then(function(data) {
        callback(data);
      });
  },
  getPlayerById: function(callback) {
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");
    let endpoint = "players/" + idParam;
    if ("caches" in window) {
      caches.match(this.base_url + endpoint).then(function(response) {
        if (response) {
          response.json().then(function(data) {
            console.log("caches found");

            callback(data);
          });
        }
      });
    }
    fetch(this.base_url + endpoint, {
      headers: { "X-Auth-Token": this.keys }
    })
      .then(status)
      .then(json)
      .then(function(data) {
        callback(data);
      });
  }
};

function status(response) {
  if (response.status !== 200) {
    if (response.status === 404) alert("Not Found");
    else alert("Error");
    history.back();
    return Promise.reject(new Error(response.statusText));
  } else {
    return Promise.resolve(response);
  }
}

function json(response) {
  return response.json();
}
