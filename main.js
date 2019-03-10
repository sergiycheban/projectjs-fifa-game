function country(country) {
  Ajax.get("https://worldcup.sfg.io/matches", data => {
    isHaveEvent = false;
    for (let index = 0; index < data.length; index++) {
      if (data[index].away_team_country == country) {
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
          data[index].home_team.goals +
          "-" +
          data[index].away_team.goals +
          "</div> </article><tr></tr>";
        ul.appendChild(li);

        document.getElementById("Group").appendChild(ul);
      }
    }
    if (!isHaveEvent) {
      var a = document.createElement("a");
      a.innerHTML = "DONT HAVE EVENTS IN THIS COUNTRY";
      document.getElementById("Group").appendChild(a);
    }
  });
}

function clearHTML() {
  document.getElementById("Group").innerHTML = "";
}
