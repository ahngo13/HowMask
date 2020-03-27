import $ from "jquery";

$(document).ready(function() {
  $(document).on("click", ".starRev span", function() {
    $(this)
      .parent()
      .children("span")
      .removeClass("on");
    $(this)
      .addClass("on")
      .prevAll("span")
      .addClass("on");
    return false;
  });
});
