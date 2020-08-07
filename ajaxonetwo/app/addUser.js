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
    console.log(data);
  });

  $.ajax({
    url: "http://test.eko.eu/user",
    type: type,
    data: data,
    success: function (response) {
      alert("success2");
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
