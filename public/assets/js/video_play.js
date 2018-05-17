$(function() {
  var token = $("vid-title").val();

  $("#ziggeo_player").attr("ziggeo-video", token);
  console.log(token);
  console.log($("ziggeo_player".attr("ziggeo-video")));
});
