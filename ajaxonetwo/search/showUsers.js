document.getElementById("button").addEventListener("click", loadUsers);

// Load Github Users
var id = "";
function loadUsers() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "http://test.eko.eu/", true);

  xhr.onload = function () {
    if (this.status == 200) {
      var users = JSON.parse(this.responseText);

      console.log(users.users);
      var output = "";
      for (var i in users.users) {
        id = users.users[i].id;
        output +=
          '<div class="user">' +
          "<ul>" +
          "<li>Name: " +
          users.users[i].id +
          "</li>" +
          "<li>Last name: " +
          users.users[i].last_name +
          "</li>" +
          "<li>Postal Code: " +
          users.users[i].postal_code +
          "</li>" +
          "<li>Street: " +
          users.users[i].street +
          "</li>" +
          "<li>City: " +
          users.users[i].city +
          "</li>" +
          "</ul>" +
          `<form action="contact.php" method="POST" class="ajax">
             <input name="_method" type="hidden" value="delete" />
             <input value="` +
          users.users[i].id +
          `" type="hidden" name="id" />


             <input type="submit" class="btn btn-primary mb-2" value="submit" />
         </form>` +
          "<button id=edit" +
          i +
          ">Edit</button>" +
          "</div>";
      }
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
        console.log(data.id);
      });
      //DELETE AJAX//
      $.ajax({
        url: "http://test.eko.eu/user/" + data.id,
        type: type,
        data: data,
        success: function (response) {
          alert("deleted");
          document.getElementById("button").click();
        },
      });
      return false;
    });
  };

  xhr.send();
}
