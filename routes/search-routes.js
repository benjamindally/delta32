//import models
const db = require("../models");
const Op = db.sequelize.Op;

module.exports = function(app) {
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //root to get the api token
  app.get("/ziggeoToken", function(req, res) {
    res.json(process.env.api_token);
  });

  //root route for onload
  app.get("/", function(req, res) {
    db.Video.findAll({
      include: [db.Contributor],
    }).then(function(result) {
      let hbsObject = {
        videos: result,
      };
      res.render("index", hbsObject);
    });
  });

  //json route
  app.get("/json", function(req, res) {
    db.Video.findAll({
      include: [db.Contributor],
    }).then(function(result) {
      let hbsObject = {
        videos: result,
      };
      res.json(hbsObject);
    });
  });

  //Search Routes
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //find all route
  app.get("/api/videos", function(req, res) {
    db.Video.findAll({
      include: [db.Contributor],
    }).then(function(result) {
      let hbsObject = {
        videos: result,
      };
      res.render("search", hbsObject);
    });
  });

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
      res.render("search", hbsObject);
    });
  });

  //find all videos with a given author
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
      res.render("search", hbsObject);
    });
  });

  //find video column by ID
  app.get("/api/videos/id/:id", function(req, res) {
    db.Video.findOne({
      where: {
        id: req.params.id,
      },
      include: [db.Contributor],
    }).then(function(result) {
      let hbsObject = {
        videos: result
      };
      res.render("video", hbsObject);
      //res.json(hbsObject);
    });
  });

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
      res.render("search", hbsObject);
    });
  });

  //find videos by category
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
      res.render("search", hbsObject);
    });
  });

  //renders career page
  app.get("/careers", function(req, res) {
    res.render("careers");
  });

  //Post route
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //post new video column
  app.post("/api/videos", function(req, res) {
    var videoInfo = req.body;
    db.Video.create({
      title: videoInfo.title,
      description: videoInfo.description,
      token: videoInfo.token,
      category: videoInfo.category,
      keywordOne: videoInfo.keywordOne,
      keywordTwo: videoInfo.keywordTwo,
      keywordThree: videoInfo.keywordThree,
      ContributorId: videoInfo.ContributorId,
    }).then(function(newVideo) {
      res.json(newVideo);
    });
  });

  //export function ends
};
