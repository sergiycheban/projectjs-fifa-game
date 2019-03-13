init();

function init() {
  getDataFromGroup();
}

function clearHTML(selector) {
  document.querySelector(selector).innerHTML = "";
}

function searchByCountry() {
  var searchText = document.getElementById("searchText").value;
  clearHTML("#event");
  getDataFromEvents(searchText);
}

async function getDataFromEvents(key) {
  Ajax.get("http://worldcup.sfg.io/matches", data => {
    isHaveEvent = false;
    var keys = Object.keys(data[0]);
    console.log(keys);
    for (let index = 0; index < data.length; index++) {
      for (var i of Object.keys(data[0])) {
        if (data[index][i] == key) {
          isHaveEvent = true;
          var ul = document.createElement("ul");
          var li = document.createElement("li");
          li.innerHTML =
            "<article class='message is-info'> <div class='message-header'> " +
            data[index].away_team_country +
            " - " +
            data[index].home_team_country +
            " </div> <div class='message-body'> The match took place in " +
            data[index].venue +
            " between the teams of " +
            data[index].away_team_country +
            " and " +
            data[index].home_team_country +
            ". " +
            data[index].winner +
            " won  " +
            data[index].away_team.goals +
            "-" +
            data[index].home_team.goals +
            "</div> </article><tr></tr>";
          ul.appendChild(li);
          document.getElementById("event").appendChild(ul);
        }
      }
    }
    if (!isHaveEvent) {
      var a = document.createElement("a");
      a.innerHTML = "DONT HAVE EVENTS IN THIS COUNTRY";
      document.getElementById("event").appendChild(a);
    }
  });
}

async function getDataFromTeams() {
  Ajax.get("http://worldcup.sfg.io/teams", data => {
    var fifa_codes = [];
    for (let index = 0; index < data.length; index++) {
      fifa_codes.push(data[index].fifa_code);
    }
    var div = document.createElement("div");
    div.className = "field is-grouped is-grouped-multiline";
    for (let index = 0; index < fifa_codes.length; index++) {
      div.innerHTML +=
        "<div class='control'> <div class='tags has-addons'> <a onclick='getDataFromCountry(this.innerText)' class='tag is-link'>" +
        fifa_codes[index] +
        "</a></div>";

      document.getElementById("fifa_code").appendChild(div);
    }
  });
}

async function getDataFromGroup() {
  Ajax.get("http://worldcup.sfg.io/teams/group_results", data => {
    for (let index = 0; index < data.length; index++) {
      var ul = document.createElement("ul");
      var li = document.createElement("li");

      var countryInGroup = [];

      for (let i = 0; i < data[index].ordered_teams.length; i++) {
        countryInGroup.push(data[index].ordered_teams[i].country);
      }

      li.innerHTML =
        "<article class='message is-info'> <div class='message-header'> " +
        data[index].letter +
        " - group" +
        " </div> <div class='message-body'>" +
        countryInGroup +
        "</div> </article><tr></tr>";
      ul.appendChild(li);
      document.getElementById("group").appendChild(ul);

      countryInGroup = [];
    }
    getDataFromTeams();
  });
}

async function getDataFromCountry(code) {
  clearHTML("#fifa_code_event");

  Ajax.get("http://worldcup.sfg.io/matches/country?fifa_code=" + code, data => {
    for (let index = 0; index < data.length; index++) {
      isHaveEvent = true;
      var ul = document.createElement("ul");
      var li = document.createElement("li");
      li.innerHTML =
        "<article class='message is-info'> <div class='message-header'> " +
        data[index].away_team_country +
        " - " +
        data[index].home_team_country +
        " </div> <div class='message-body'> The match took place in " +
        data[index].venue +
        " between the teams of " +
        data[index].away_team_country +
        " and " +
        data[index].home_team_country +
        ". " +
        data[index].winner +
        " won  " +
        data[index].away_team.goals +
        "-" +
        data[index].home_team.goals +
        "</div> </article><tr></tr>";
      ul.appendChild(li);
      document.getElementById("fifa_code_event").appendChild(ul);
    }
  });
}
