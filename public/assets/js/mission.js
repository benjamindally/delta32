//Mission button scroll function
//only used on index.handlebars, other pages use a redirect

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
