var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/movies", (req, res) => {
    db.Movie.findAll({}).then((results) => {
      res.json(results);
    });
  });
  //Get all reviews from selected movie
  app.get("api/reviews/:id", (req, res) => {
    db.Reviews.findAll({
      where: {
        MovieId: req.params.id
      }
    }).then((results) => {
      res.json(results);
    });
  });
  //Get all reviews from the user
  app.get("/api/reviews/:id", (req, res) => {
    db.Reviews.findAll({
      where: {
        UserId: req.params.id
      }
    }).then((results) => {
      res.json(results);
    });
  });
  // Create a new review
  app.post("/api/reviews", (req, res) => {
    db.Review.create(req.body).then((results) => {
      res.json(results);
    });
  });

  // Delete a review by id
  app.delete("/api/reviews/:id", (req, res) => {
    db.Example.destroy({ where: { id: req.params.id } }).then((results) => {
      res.json(results);
    });
  });
};
