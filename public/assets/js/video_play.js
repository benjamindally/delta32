$(function() {
  var token = $(".vid-title").attr("value");

  $("#ziggeo_player").attr("ziggeo-video", token);
  console.log(token);
  // console.log($("ziggeo_player".attr("ziggeo-video")));
});
