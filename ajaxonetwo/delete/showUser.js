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
        `<form action="contact.php" method="POST" class="ajax">
             <input name="_method" type="hidden" value="delete" />


             <input type="submit" class="btn btn-primary mb-2" value="submit" />
         </form>` +
        "</div>";

      document.getElementById("users").innerHTML = output;
    }
    $("form.ajax").on("submit", function () {
      var that = $(this),
        url = that.attr("action"),
        type = that.attr("method"),
        data = {};
      that.find("[name]").each(function (index, value) {
        var that = $(this),
          name = that.attr("name"),
          value = that.val();

        data[name] = value;
        console.log(data);
      });

      $.ajax({
        url: "http://test.eko.eu/user/" + id,
        type: type,
        data: data,
        success: function (response) {
          alert("deleted");
        },
      });
      return false;
    });
  };

  xhr.send();
}
