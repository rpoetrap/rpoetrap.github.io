document.addEventListener("DOMContentLoaded", function() {
  // Activate sidebar nav
  var elems = document.querySelectorAll(".sidenav");
  M.Sidenav.init(elems);
  loadNav();

  function loadNav() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4) {
        if (this.status != 200) return;

        // Muat daftar tautan menu
        document.querySelectorAll(".topnav, .sidenav").forEach(function(elm) {
          elm.innerHTML = xhttp.responseText;
        });

        // Daftarkan event listener untuk setiap tautan menu
        document
          .querySelectorAll(".sidenav a, .topnav a")
          .forEach(function(elm) {
            elm.addEventListener("click", function(event) {
              // Tutup sidenav
              var sidenav = document.querySelector(".sidenav");
              M.Sidenav.getInstance(sidenav).close();

              // Muat konten halaman yang dipanggil
              page = event.target.getAttribute("href").substr(1);
              loadPage(page);
            });
          });
      }
    };
    xhttp.open("GET", "nav.html", true);
    xhttp.send();
  }

  // Load page content
  var page = window.location.hash.substr(1);
  if (page == "") page = "home";
  if (
    window.location.pathname == "/" ||
    window.location.pathname == "/index.html"
  )
    loadPage(page);

  $("#back").click(function(e) {
    e.preventDefault();
    history.back();
  });

  function loadPage(page) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4) {
        var content = document.querySelector("#body-content");
        if (this.status == 200) {
          content.innerHTML = xhttp.responseText;
          switch (page) {
            case "home":
              football.getAllCompetitions(function(data) {
                var articlesHTML = "";
                data.competitions.forEach(function(competition) {
                  let until = new Date(competition.currentSeason.endDate);
                  let datenow = new Date();
                  datenow.setHours(0, 0, 0, 0);

                  let winner =
                    competition.currentSeason.winner != null
                      ? `<b class="red-text text-darken-2">Winner: ${competition.currentSeason.winner.name}</b>`
                      : `<p>Berakhir pada <b>${until.toLocaleDateString()}</b></p>`;
                  let season =
                    until < datenow
                      ? winner
                      : `<p>Berakhir pada <b>${until.toLocaleDateString()}</b></p>`;

                  articlesHTML += `
                                <a href="./competition.html?id=${competition.id}">
                                  <div class="card horizontal">
                                      <div class="card-image">
                                          ${
                                            competition.emblemUrl != null
                                              ? `<div class="card-content hide-on-small-only"><img src="${competition.emblemUrl}"></div>`
                                              : ""
                                          }
                                      </div>
                                      <div class="card-stacked">
                                          <div class="card-content black-text">
                                              <span class="card-title truncate"><b>${
                                                competition.name
                                              }</b></span>
                                              <p>Area: ${
                                                competition.area.name
                                              }</p>
                                              ${season}
                                          </div>
                                      </div>
                                  </div>
                                </a>
                            `;
                });

                document.getElementById("competitions").innerHTML = articlesHTML;
              });
              break;

            case "teams":
              getAllFavTeams(function(teams){
                var articlesHTML = "";
                teams.forEach(function(team){
                  articlesHTML += `
                  <a href="./team.html?id=${team.teamId}">
                    <div class="card horizontal">
                      <div class="card-stacked">
                          <div class="card-content black-text">
                              <span class="card-title truncate"><b>${team.teamName}</b></span>
                              <span class="new badge blue" data-badge-caption="">${team.teamTLA}</span>
                          </div>
                      </div>
                    </div>
                  </a>
                  `
                })

                $("#teams").html(articlesHTML)
              })
              break;
          }
        } else if (this.status == 404) {
          content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
        } else {
          content.innerHTML = "<p>Ups.. halaman tidak dapat diakses.</p>";
        }
      }
    };
    xhttp.open("GET", "pages/" + page + ".html", true);
    xhttp.send();
  }
});
