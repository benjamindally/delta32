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
    var ContributorId = $(".submit").attr("value");

    var videoInfo = {
      title: title,
      description: description,
      link: "Unknown",
      category: category,
      keywordOne: keywordOne,
      keywordTwo: keywordTwo,
      keywordThree: keywordThree,
      ContributorId: ContributorId,
    };

    if (title === "") {
      alert("Please enter a title for your video.");
      return;
    } else if (description === "") {
      alert("Please enter a description for your video.");
      return;
    } else if (category === "Choose one...") {
      alert("Please select a category");
      return;
    } else if (keywordOne === "") {
      alert("Please enter the first keyword.");
      return;
    } else {
      $.post("api/videos", videoInfo).then(function(newVideo) {
        clearInputs();
      });
    }
  });

  function clearInputs() {
    $("#title").val("");
    $("#description").val("");
    $("#category").val("Choose one...");
    $("#keyword1").val("");
    $("#keyword2").val("");
    $("#keyword3").val("");
  }
});
