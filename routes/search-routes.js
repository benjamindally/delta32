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

  app.get("/careers", function(req, res) {
    res.render("careers");
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
