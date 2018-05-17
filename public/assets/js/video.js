$(function() {
  console.log("connected");
  $(".video-link").click(function() {
    var id = $(this).attr("value");

    console.log(id);

    queryURL = "/api/videos/id/" + id;

    window.location.href = queryURL;
  });
});
