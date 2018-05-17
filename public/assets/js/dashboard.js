//js file
$(function() {
  $(".submit").on("click", function(event) {
    event.preventDefault();

    //this stores the values from the form as variables
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
    var token = $("#videoLink")
      .val()
      .trim();
    var thumbnail = $("#thumbnail").val();
    var ContributorId = $(".submit").attr("value");

    console.log(thumbnail);

    //this creates a model based on the varibles created from the form
    var videoInfo = {
      title: title,
      description: description,
      token: token,
      thumbnail: thumbnail,
      category: category,
      keywordOne: keywordOne,
      keywordTwo: keywordTwo,
      keywordThree: keywordThree,
      ContributorId: ContributorId,
    };

    //this handles errors if something has not been entered and alerts the user to what they are missing
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

  //this clears the form fields so users can create another video easily
  function clearInputs() {
    $("#title").val("");
    $("#description").val("");
    $("#category").val("Choose one...");
    $("#keyword1").val("");
    $("#keyword2").val("");
    $("#keyword3").val("");
    $("#videoLink").val("");
  }
});
