//Required tables/sequelize models
// eslint-disable-next-line no-undef
const models = require("../models");
// eslint-disable-next-line no-undef
module.exports = function (app, passport) {
  // Get all movies
  app.get("/api/movies", (req, res) => {
    models.Movie.findAll({
      include: [models.Review]
    }).then((results) => {
      res.json(results);
    });
  });
  //Get individual movies based on id
  app.get("/api/movies/:id", (req, res) => {
    models.Movie.findOne({
      where: {
        id: req.params.id
      }
    }).then((result) => {
      res.json(result);
    });
  });
  //Get all reviews from selected movie minues spoiler filled ones
  app.get("/api/reviews/:id", (req, res) => {
    models.Review.findAll({
      where: {
        MovieId: req.params.id,
        spoiler: false
      }
    }).then((results) => {
      res.json(results);
    });
  });
  //Get all reviews from selected movie
  app.get("/api/allreviews/:id", (req, res) => {
    models.Review.findAll({
      where: {
        MovieId: req.params.id
      }
    }).then((results) => {
      res.json(results);
    });
  });
  // Create a new review
  app.post("/api/reviews/add", (req, res) => {
    if (req.user) {
      models.Review.create({
        text: req.body.text,
        spoiler: req.body.spoiler,
        MovieId: req.body.MovieId,
        UserId: req.user.id
      }).then((results) => {
        res.json(results);
      });
    } else {
      res.status(404).end();
    }
  });
  // Delete a review by id
  app.delete("/api/reviews/:id", (req, res) => {
    models.Review.destroy({
      where: {
        id: req.params.id
      }
    }).then((results) => {
      res.json(results);
    });
  });
  //Passport routes
  app.post("/signup", function (req, res, next) {
    next();
  }, passport.authenticate("local-signup", {
    successRedirect: "/",
    failureRedirect: "/signup"
  }));
  app.post("/signin", function (req, res, next) {
    next();
  }, passport.authenticate("local-signin", {
    successRedirect: "/",
    failureRedirect: "/dashboard"
  }));
};