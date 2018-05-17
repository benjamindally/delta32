$(function() {
  var token = $(".vid-title").attr("value");

  token.promise().done(function(token) {
    $("#ziggeo_player").attr("ziggeo-video", token);
  });

  console.log(token);
  // console.log($("ziggeo_player".attr("ziggeo-video")));
});
