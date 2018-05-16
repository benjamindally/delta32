//Mission button scroll function

$(document).ready(function() {
  $("#missionBtn").click(function() {
    $("html,body").animate(
      {
        scrollTop: $("#what-we-do").offset().top,
      },
      "slow"
    );
  });
});
