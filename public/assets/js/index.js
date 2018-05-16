$(function() {
  var keywordArray = [];
  var titleArray = [];
  var contributorArray = [];
  var searchArray = [];

  $.get("/json", function(data) {
    //Make sure there are no duplicates and sort data into
    //a specific array and a main autocomplete array
    function dataSort(sortedArray, acArray) {
      var isRepeat = false;
      if (acArray.length > 0) {
        for (var j = 0; j < acArray.length; j++) {
          if (datapoint === acArray[j]) {
            isRepeat = true;
          }
        }
      }
      console.log(isRepeat);
      if (isRepeat === false) {
        sortedArray.push(datapoint);
        acArray.push(datapoint);
      }
    }

    for (var i = 0; i < data.videos.length; i++) {
      var datapoint = data.videos[i].keywordOne;
      dataSort(keywordArray, searchArray);
    }

    for (var i = 0; i < data.videos.length; i++) {
      var datapoint = data.videos[i].keywordTwo;
      if (datapoint !== "") {
        dataSort(keywordArray, searchArray);
      }
    }

    for (var i = 0; i < data.videos.length; i++) {
      var datapoint = data.videos[i].keywordThree;
      if (datapoint !== "") {
        dataSort(keywordArray, searchArray);
      }
    }

    for (var i = 0; i < data.videos.length; i++) {
      var datapoint = data.videos[i].title;
      dataSort(titleArray, searchArray);
    }

    for (var i = 0; i < data.videos.length; i++) {
      var datapoint = data.videos[i].Contributor.name;
      dataSort(contributorArray, searchArray);
    }

    $(".search_bar").select2({ data: searchArray });
    console.log(searchArray);
  });

  // $.get("/", function(data) {});

  //Mission button scroll function
  // $("#missionBtn").click(function() {
  //   $("html,body").animate(
  //     {
  //       scrollTop: $("#mission").offset().top,
  //     },
  //     "slow"
  //   );
  // });

  // $("#nav_search_btn").click(function() {
  //   var searchTerm = $(".search_bar").select2("data");
  //   // console.log(searchTerm[0].text);
  //   var query = "/api/videos/keyword/" + searchTerm[0].text;
  //   console.log(query);

  //   if (searchTerm[0].id === "keyword") {
  //     $.get("/api/videos/keyword/tatas", function(data) {});
  //   }
  // });
  $("#nav_search_btn").on("click", function(event) {
    event.preventDefault();
    var searchTerm = $(".search_bar")
      .find(":selected")
      .text();
    function findSearchRoute(array, searchTerm) {
      for (var i = 0; i < array.length; i++) {
        if (searchTerm === array[i]) {
          if (array === keywordArray) {
            queryUrl = "/api/videos/keyword/" + searchTerm;
            console.log(queryUrl);
            window.location.href = queryUrl;
          } else if (array === titleArray) {
            queryUrl = "/api/videos/" + searchTerm;
            console.log(queryUrl);
            window.location.href = queryUrl;
          } else if (array === contributorArray) {
            queryUrl = "/api/videos/contributor/" + searchTerm;
            console.log(queryUrl);
            window.location.href = queryUrl;
          }
        }
      }
    }

    function routeSearch(searchTerm) {
      findSearchRoute(keywordArray, searchTerm);
      findSearchRoute(titleArray, searchTerm);
      findSearchRoute(contributorArray, searchTerm);
    }

    routeSearch(searchTerm);
    // queryUrl = "/api/videos/keyword/" + searchTerm;
    // window.location.href = queryUrl;
  });
});

// function findSearchRoute(array, searchTerm) {
//   for (var i = 0; i < array.length; i++) {
//     if (searchTerm === array[i]) {
//       if (array === keywordArray) {
//         queryUrl = "/api/videos/keyword/" + searchTerm;
//         console.log(queryUrl);
//       } else if (array === titleArray) {
//         queryUrl = "/api/videos/" + searchTerm;
//         console.log(queryUrl);
//       } else if (array === contributorArray) {
//         queryUrl = "/api/videos/contributor/" + searchTerm;
//         console.log(queryUrl);
//       }
//     }
//   }
// }

// function routeSearch(searchTerm) {
//   findSearchRoute(keywordArray, searchTerm);
//   findSearchRoute(titleArray, searchTerm);
//   findSearchRoute(contributorArray, searchTerm);
// }

// routeSearch(searchTerm);
