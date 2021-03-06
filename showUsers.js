document.getElementById("button").addEventListener("click", loadUsers);

window.onload = loadOneUser;

// Load Users
var id = "";
function loadUsers() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "http://test.eko.eu/", true);

  xhr.onload = function () {
    if (this.status == 200) {
      var users = JSON.parse(this.responseText);
      // Create table
      var output = `<tr>
      <th>First name</th>
      <th>Last name</th>
      <th>Postal code</th>
      <th>Street</th>
      <th>City</th>
      <th>Age</th>
      <th></th>
      <th></th>
    </tr>`;
      for (var i in users.users) {
        id = users.users[i].id;
        output +=
          `<td > ` +
          users.users[i].first_name +
          "</td>" +
          "<td>" +
          users.users[i].last_name +
          "</td>" +
          "<td>" +
          users.users[i].postal_code +
          "</td>" +
          "<td>" +
          users.users[i].street +
          "</td>" +
          "<td>" +
          users.users[i].city +
          "</td>" +
          "<td>" +
          users.users[i].age +
          "</td>" +
          ////////// Form to delete a user/////////////
          `<td><form action="contact.php" method="POST" class="ajax">
             <input name="_method" type="hidden" value="delete" />
             <input value="` +
          users.users[i].id +
          `" type="hidden" name="id" />


          <button type="submit"  value="edit" class="button" ><img src="./icons/bin.svg" class="icon" alt="no img" /></button>
         </form></td>` +
          /////////////////// Form to edit a user/////////////////////
          `<td><form action="edit.php" method="POST" class="editajax">
         <input name="_method" type="hidden" class="table" value="delete" />
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
          


         <button type="submit"  value="edit" class="button" ><img src="./icons/edit.svg" class="icon" alt="no img" /></button>
     </form></td>` +
          "</tr>";
      }
      document.getElementById("users").innerHTML = output; // input table elements to table users
    }
    ////////////   D E L E T E //////////////
    $("form.ajax").on("submit", function () {
      var that = $(this),
        type = that.attr("method"),
        data = {};
      that.find("[name]").each(function (index, value) {
        var that = $(this),
          name = that.attr("name"),
          value = that.val();

        data[name] = value;
      });
      //////////DELETE AJAX//////////
      $.ajax({
        url: "http://test.eko.eu/user/" + data.id,
        type: type,
        data: data,
        success: function (response) {
          document.getElementById("alert").style.display = "block";
          document.getElementById("alert").style.color = "red";
          document.getElementById("alert").style.border = " 2px solid red";
          document.getElementById("closebtn").style.color = "red";
          document.getElementById("action").innerHTML = "Deleted";
          document.getElementById("button").click();
          loadOneUser();
        },
      });
      return false;
    });
    ////////////   E D I T  //////////////
    $("form.editajax").on("submit", function () {
      var that = $(this),
        data = {};
      that.find("[name]").each(function (value) {
        var that = $(this),
          name = that.attr("name"),
          value = that.val();

        data[name] = value;
      });
      //////////EDIT AJAX//////////
      $.ajax({
        url: "http://test.eko.eu",
        type: "POST",
        success: function () {
          document.getElementById("button").click();
          document.getElementById("first_name").value = data.first_name;
          document.getElementById("last_name").value = data.last_name;
          document.getElementById("postal_code").value = data.postal_code;
          document.getElementById("street").value = data.street;
          document.getElementById("city").value = data.city;
          document.getElementById("age").value = data.age;
          document.getElementById("id_del").value = data.id;
          document.getElementById("submit_add").value = "Edit";
        },
      });
      return false;
    });
  };

  xhr.send();
}
