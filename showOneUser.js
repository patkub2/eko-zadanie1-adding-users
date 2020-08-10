document.getElementById("loaduser").addEventListener("click", loadUsers);
// load users
function loadUsers() {
  var userid = document.getElementById("userid").value;
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "http://test.eko.eu", true);

  xhr.onload = function () {
    if (this.status == 200) {
      var users = JSON.parse(this.responseText);
      var outpul = `<tr>
      <th>First name</th>
      <th>Last name</th>
      <th>Postal code</th>
      <th>Street</th>
      <th>City</th>
      <th>Age</th>
      <th></th>
      <th></th>
    </tr>`;
      id = users.users[userid].id;
      outpul +=
        `<td > ` +
        users.users[userid].first_name +
        "</td>" +
        "<td>" +
        users.users[userid].last_name +
        "</td>" +
        "<td>" +
        users.users[userid].postal_code +
        "</td>" +
        "<td>" +
        users.users[userid].street +
        "</td>" +
        "<td>" +
        users.users[userid].city +
        "</td>" +
        "<td>" +
        users.users[userid].age +
        "</td>" +
        //////////////////////////////////
        `<td><form action="contact.php" method="POST" class="ajax">
             <input name="_method" type="hidden" value="delete" />
             <input value="` +
        users.users[userid].id +
        `" type="hidden" name="id" />


          <button type="submit"  value="edit" class="button" ><img src="./icons/bin.svg" class="icon" alt="no img" /></button>
         </form></td>` +
        ////////////////////////////////////////////
        `<td><form action="edit.php" method="POST" class="ajaxx">
         <input name="_method" type="hidden" class="table" value="delete" />
         <input value="` +
        users.users[userid].id +
        `" type="hidden" name="id" />
         <input value="` +
        users.users[userid].first_name +
        `" type="hidden" name="first_name" />
         <input value="` +
        users.users[userid].last_name +
        `" type="hidden" name="last_name" />
         <input value="` +
        users.users[userid].postal_code +
        `" type="hidden" name="postal_code" />
         <input value="` +
        users.users[userid].street +
        `" type="hidden" name="street" />
         <input value="` +
        users.users[userid].city +
        `" type="hidden" name="city" />
         <input value="` +
        users.users[userid].age +
        `" type="hidden" name="age" />
          


         <button type="submit"  value="edit" class="button" ><img src="./icons/edit.svg" class="icon" alt="no img" /></button>
     </form></td>` +
        "</tr>";

      document.getElementById("users").innerHTML = outpul; // input one user table elements to table users
    }
    ////////////   D E L E T E //////////////
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
      });
      //DELETE AJAX//
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
          document.getElementById("users").innerHTML = "";
          loadOneUser();
        },
      });
      return false;
    });
    ////////////   E D I T  //////////////
    $("form.ajaxx").on("submit", function () {
      var that = $(this),
        data = {};
      that.find("[name]").each(function (value) {
        var that = $(this),
          name = that.attr("name"),
          value = that.val();

        data[name] = value;
      });
      //EDIT AJAX//
      $.ajax({
        success: function () {
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
