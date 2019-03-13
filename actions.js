var committedActions = [];
initActions();

function initActions() {
  if (localStorage.getItem("committedActions") != null) {
    committedActions = JSON.parse(localStorage.getItem("committedActions"));
  }
}

function generateActions(actionsText) {
  var time = new Date().toLocaleString();
  committedActions.push(time + " - " + actionsText);
  localStorage.setItem("committedActions", JSON.stringify(committedActions));
  generateHTMLForCommittedActions();
}
