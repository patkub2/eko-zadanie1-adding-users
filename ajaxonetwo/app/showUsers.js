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
          users.users[i].first_name +
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
          "<li>Age: " +
          users.users[i].age +
          "</li>" +
          "</ul>" +
          //////////////////////////////////
          `<form action="contact.php" method="POST" class="ajax">
             <input name="_method" type="hidden" value="delete" />
             <input value="` +
          users.users[i].id +
          `" type="hidden" name="id" />


             <input type="submit" class="btn btn-primary mb-2" value="submit" />
         </form>` +
          ////////////////////////////////////////////
          `<form action="edit.php" method="POST" class="ajaxx">
         <input name="_method" type="hidden" value="delete" />
         <input value="` +
          users.users[i].id +
          `" type="hidden" name="id" />
         <input value="` +
          users.users[i].first_name +
          `" type="hidden" name="first_name" />
         <input value="` +
          users.users[i].last_name +
          `" type="hidden" name="last_name" />
         <input value="` +
          users.users[i].postal_code +
          `" type="hidden" name="postal_code" />
         <input value="` +
          users.users[i].street +
          `" type="hidden" name="street" />
         <input value="` +
          users.users[i].city +
          `" type="hidden" name="city" />
         <input value="` +
          users.users[i].age +
          `" type="hidden" name="age" />
          


         <input type="submit" class="btn btn-primary mb-2" value="edit" />
     </form>` +
          "</div>";
      }
      document.getElementById("users").innerHTML = output;
    }
    ////////////   D E L E T E  //////////////
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
    ////////////   E D I T  //////////////
    $("form.ajaxx").on("submit", function () {
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
      //EDIT AJAX//
      $.ajax({
        url: "http://test.eko.eu/user/" + data.id,
        type: type,
        data: data,
        success: function (response) {
          document.getElementById("button").click();
          document.getElementById("first_name").value = data.first_name;
          document.getElementById("last_name").value = data.last_name;
          document.getElementById("postal_code").value = data.postal_code;
          document.getElementById("street").value = data.street;
          document.getElementById("city").value = data.city;
          document.getElementById("age").value = data.age;
          alert("deleted");
        },
      });
      return false;
    });
  };

  xhr.send();
}
