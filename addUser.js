$("form.send").on("submit", function () {
  var that = $(this),
    type = that.attr("method"),
    data = {};
  that.find("[name]").each(function (value) {
    var that = $(this),
      name = that.attr("name"),
      value = that.val();

    data[name] = value;
  });

  $.ajax({
    url: "http://test.eko.eu/user",
    type: type,
    data: data,
    success: function () {
      document.getElementById("alert").style.display = "block";
      document.getElementById("alert").style.color = "green";
      document.getElementById("alert").style.border = " 2px solid green";
      document.getElementById("closebtn").style.color = "green";
      document.getElementById("action").innerHTML = "Added";
      document.getElementById("button").click();
      document.getElementById("first_name").value = "";
      document.getElementById("last_name").value = "";
      document.getElementById("postal_code").value = "";
      document.getElementById("street").value = "";
      document.getElementById("city").value = "";
      document.getElementById("age").value = "";
      loadOneUser();
    },
  });
  //////////////////////
  if (document.getElementById("id_del").value != "") {
    $.ajax({
      url: "http://test.eko.eu/user/" + document.getElementById("id_del").value,
      type: "POST",
      data: { _method: "delete", id: document.getElementById("id_del").value },
      success: function () {
        document.getElementById("button").click();
        document.getElementById("submit_add").value = "Add";
        document.getElementById("alert").style.display = "block";
        document.getElementById("alert").style.color = "orange";
        document.getElementById("alert").style.border = " 2px solid orange";
        document.getElementById("closebtn").style.color = "orange";
        document.getElementById("action").innerHTML = "Edited";

        document.getElementById("id_del").value = "";
        loadOneUser();
      },
    });
  }
  return false;
});
