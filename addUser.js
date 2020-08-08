$("form.send").on("submit", function () {
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

  $.ajax({
    url: "http://test.eko.eu/user",
    type: type,
    data: data,
    success: function (response) {
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
    },
  });
  return false;
});
