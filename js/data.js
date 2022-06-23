/* exported data */

var data = {
  view: 'stonks',
  stonks: [],
  stonkId: 0
};

var previousDataJSON = localStorage.getItem('ajax-project');
if (previousDataJSON !== null) {
  data = JSON.parse(previousDataJSON);
}

function beforeUnload(event) {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('ajax-project', dataJSON);
}

window.addEventListener('beforeunload', beforeUnload);
