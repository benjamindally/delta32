$(function() {
  var keywordArray = [];
  var titleArray = [];
  var cleanArray = [];
  var searchArray = [];
  var cleanTitle = [];
  var contributorArray = [];
  var cleanContributor = [];
  $.get("/json", function(data) {
    console.log(data);
    for (var i = 0; i < data.videos.length; i++) {
      var keywordOne = data.videos[i].keywordOne;
      keywordArray.push(keywordOne);

      var keywordTwo = data.videos[i].keywordTwo;

      if (keywordTwo != "") {
        keywordArray.push(keywordTwo);
      }

      var keywordThree = data.videos[i].keywordThree;
      if (keywordThree != "") {
        keywordArray.push(keywordThree);
      }

      var title = data.videos[i].title;
      titleArray.push(title);

      var contributor = data.videos[i].Contributor.name;
      contributorArray.push(contributor);

      cleanArray.text = keywordArray.filter(function(elem, pos) {
        return keywordArray.indexOf(elem) == pos;
      });

      cleanTitle.text = titleArray.filter(function(elem, pos) {
        return titleArray.indexOf(elem) == pos;
      });

      cleanContributor.text = contributorArray.filter(function(elem, pos) {
        return contributorArray.indexOf(elem) == pos;
      });
    }
    for (var j = 0; j < cleanArray.text.length; j++) {
      var cleanObject = cleanArray.text[j];
      searchArray.push({ id: "keyword", text: cleanObject });
    }

    for (var l = 0; l < cleanTitle.text.length; l++) {
      var cleanObject2 = cleanTitle.text[l];
      searchArray.push({ id: "title", text: cleanObject2 });
    }

    for (var x = 0; x < cleanContributor.text.length; x++) {
      var cleanObject3 = cleanContributor.text[x];
      searchArray.push({ id: "contributor", text: cleanObject3 });
    }

    $(".search_bar").select2({ data: searchArray });
    console.log(searchArray);
  });

  $.get("/", function(data) {});
});

//Mission button scroll function
$("#missionBtn").click(function() {
  $("html,body").animate(
    {
      scrollTop: $("#mission").offset().top,
    },
    "slow"
  );
});
