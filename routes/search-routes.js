//import models
const db = require("../models");
const Op = db.sequelize.Op;
// const express = require("express");

//Routes

//DEV NOTE
//Table Names and Table Keys are currently PLACEHOLDERS
//They need to be updated for actual use
//Same is true of Handlebars Page Names
//Testing instructions and test post routes are at the bottom of the page

//root route
//find featured
//switched from finding featured to finding all
//switch is to support auto-complete npm package.
//code determining featured and tag list relegated to front-end

module.exports = function(app) {
  //root route

  //root to get the api token
  app.get("/ziggeoToken", function(req, res) {
    res.json(process.env.api_token);
  });

  //working route as of 5/10
  app.get("/", function(req, res) {
    db.Video.findAll({
      include: [db.Contributor],
    }).then(function(result) {
      let hbsObject = {
        videos: result,
      };
      // console.log(hbsObject);
      //update with correct handlebars link
      // res.json(hbsObject);
      res.render("index", hbsObject);
    });
  });
  app.get("/json", function(req, res) {
    db.Video.findAll({
      include: [db.Contributor],
    }).then(function(result) {
      let hbsObject = {
        videos: result,
      };
      // console.log(hbsObject);
      //update with correct handlebars link
      res.json(hbsObject);
      //res.render("index", hbsObject);
    });
  });

  //Search Routes
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  //find all videos
  //include user list

  //working route 5/10
  app.get("/api/videos", function(req, res) {
    db.Video.findAll({
      include: [db.Contributor],
    }).then(function(result) {
      // res.json(result);
      let hbsObject = {
        videos: result,
      };

      //update with correct handlebars link
      res.render("search", hbsObject);
      // res.json(hbsObject);
    });
  });

  //working route as of 5/10
  //find all videos with a given title
  app.get("/api/videos/:title", function(req, res) {
    db.Video.findAll({
      where: {
        title: req.params.title,
      },
      include: [db.Contributor],
    }).then(function(result) {
      let hbsObject = {
        videos: result,
      };
      // console.log(result);
      //update with correct handlebars link
      res.render("search", hbsObject);
      //res.json(hbsObject);
    });
  });

  //working as of 5/10
  //find all videos with a given author
  //include video list
  app.get("/api/videos/contributor/:author", function(req, res) {
    db.Contributor.findAll({
      where: {
        name: req.params.author,
      },
      include: [db.Video],
    }).then(function(result) {
      let hbsObject = {
        videos: result,
      };
      // console.log(hbsObject);
      // update with correct handlebars link
      res.render("search", hbsObject);
      //res.json(hbsObject);
    });
  });

  //working as of 5/10
  //find all videos with a given tag
  app.get("/api/videos/keyword/:keyword", function(req, res) {
    db.Video.findAll({
      where: {
        [Op.or]: [
          { keywordOne: req.params.keyword },
          { keywordTwo: req.params.keyword },
          { keywordThree: req.params.keyword },
        ],
      },
      include: [db.Contributor],
    }).then(function(result) {
      let hbsObject = {
        videos: result,
      };
      //   console.log(hbsObject);
      //update with correct handlebars link
      res.render("search", hbsObject);
      // res.json(hbsObject);
    });
  });

  //working as of 5/10
  app.get("/api/videos/category/:category", function(req, res) {
    db.Video.findAll({
      where: {
        category: req.params.category,
      },
      include: [db.Contributor],
    }).then(function(result) {
      let hbsObject = {
        videos: result,
      };
      //   console.log(hbsObject);
      //update with correct handlebars link
      res.render("search", hbsObject);
      //res.json(hbsObject);
    });
  });

  //Contributor registration route
  //add data set if needed
  //change handlebars file name
  app.get("/register", function(req, res) {
    res.render("signup");
  });

  //Contributor login route
  //add data set if needed
  //change handlebars file name

  app.get("/login", function(req, res) {
    res.render("user_login");
  });
  //User login route

  //Post Routes
  //will be taken care of once we decide how to handle
  //authentication

  //post routes for testing
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //HOW TO TEST A ROUTE
  //comment out all active code in the .then of the route to test
  //uncomment res.json(result);
  //Use postman to post to contributor, then
  //use postman to post to videos.
  //Order matters here or the foreign key will be null.
  //Use postman to test a given search route.
  //If you're using nodemon and you save a change,
  //you will have to run the two post routes again before testing.

  //working as of 5/10
  app.post("/api/contributor", function(req, res) {
    db.Contributor.create({
      name: "test2guy",
      specialty: "dirt",
      title: "Dr.",
    }).then(function(newCont) {
      res.json(newCont);
    });
  });

  //also working as of 5/10
  app.post("/api/videos", function(req, res) {
    var videoInfo = req.body;
    db.Video.create({
      title: videoInfo.title,
      description: videoInfo.description,
      link: videoInfo.link,
      category: videoInfo.category,
      keywordOne: videoInfo.keywordOne,
      keywordTwo: videoInfo.keywordTwo,
      keywordThree: videoInfo.keywordThree,
      ContributorId: videoInfo.ContributorId,
    }).then(function(newVideo) {
      res.json(newVideo);
    });
  });
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  //export function ends
};
