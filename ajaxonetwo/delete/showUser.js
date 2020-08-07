document.getElementById("button").addEventListener("click", loadUsers);
var id = "";
function loadUsers() {
  var userid = document.getElementById("userid").value;
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "http://test.eko.eu", true);

  xhr.onload = function () {
    if (this.status == 200) {
      var users = JSON.parse(this.responseText);
      console.log(users.users);
      id = users.users[userid].id;
      var output =
        '<div class="user">' +
        "<ul>" +
        "<li>Name: " +
        users.users[userid].first_name +
        "</li>" +
        "<li>Last name: " +
        users.users[userid].last_name +
        "</li>" +
        "<li>Postal Code: " +
        users.users[userid].postal_code +
        "</li>" +
        "<li>Street: " +
        users.users[userid].street +
        "</li>" +
        "<li>City: " +
        users.users[userid].city +
        "</li>" +
        "</ul>" +
        `<form id="postForm" name="ajax" action="contact.php" method="POST">
             <input name="_method" type="hidden" value="delete" />


             <input type="submit" class="btn btn-primary mb-2" value="submit" />
         </form>` +
        "</div>";

      $("form").on("submit", function () {
        return false;
      });

      document.getElementById("users").innerHTML = output;
    }
  };

  xhr.send();
}
