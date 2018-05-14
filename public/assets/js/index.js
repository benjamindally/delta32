$(function() {
  var searchArray = [];
  $.get("/json", function(data) {
    console.log(data);
    for (var i = 0; i < data.videos.length; i++) {
      var keywordOne = {
        id: data.videos[i].id,
        text: data.videos[i].keywordOne,
      };
      searchArray.push(keywordOne);
      var keywordTwo = {
        id: data.videos[i].id,
        text: data.videos[i].keywordTwo,
      };
      if (keywordTwo.text != "") {
        searchArray.push(keywordTwo);
      }
      var keywordThree = {
        id: data.videos[i].id,
        text: data.videos[i].keywordThree,
      };
      if (keywordThree.text != "") {
        searchArray.push(keywordThree);
      }
      var title = {
        id: data.videos[i].id,
        text: data.videos[i].title,
      };
      searchArray.push(title);
    }
    $(".search_bar").select2({ data: searchArray });
    console.log(searchArray[0]);
  });
  $.get("/", function(data) {});
});
