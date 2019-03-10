console.log("GET");

const Http = new XMLHttpRequest();

function request(url) {
  Http.open("GET", url);
  Http.send();
  Http.onreadystatechange = e => {
    console.log(JSON.parse(Http.responseText));
  };
}

var Ajax = {
  ajax: null,

  init() {
    if (!this.ajax) {
      this.ajax = new XMLHttpRequest();
    }
    return this.ajax;
  },

  get(url, cllbk) {
    var request = this.init();
    request.open("GET", url);
    request.send();
    request.onload = () => {
      cllbk(JSON.parse(this.ajax.responseText));
    };
  },
  post() {}
};
