//Mission button scroll function

$(document).ready(function() {
  $("#missionBtn").click(function() {
    $("html,body").animate(
      {
        scrollTop: $("#mission").offset().top,
      },
      "slow"
    );
  });
});
