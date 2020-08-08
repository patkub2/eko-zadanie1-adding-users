// Load Users
function loadOneUser() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "http://test.eko.eu/", true);

  xhr.onload = function () {
    if (this.status == 200) {
      var users = JSON.parse(this.responseText);
      var output = "";
      for (var i in users.users) {
        output += `<option value="` + i + `">` + i + `</option>`;
      }
      document.getElementById("userid").innerHTML = output;
    }
  };

  xhr.send();
}
