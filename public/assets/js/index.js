//js file
$(function() {
  $(".submit").on("click", function(event) {
    event.preventDefault();
    var title = $("#title")
      .val()
      .trim();
    var description = $("#description")
      .val()
      .trim();
    var category = $("#category").val();
    var keywordOne = $("#keyword1")
      .val()
      .trim();
    var keywordTwo = $("#keyword2")
      .val()
      .trim();
    var keywordThree = $("#keyword3")
      .val()
      .trim();
  });
});
