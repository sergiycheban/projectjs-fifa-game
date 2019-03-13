var committedActions = [];

function generateActions(actionsText) {
  var time = new Date().toLocaleString();
  committedActions.push(time + " - " + actionsText);
  localStorage.setItem("committedActions", committedActions);
  generateHTMLForCommittedActions();
}
