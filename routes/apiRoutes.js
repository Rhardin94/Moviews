//Importing firebase for user authentication
//const firebaseConfig = require("../config/connection");
//Initialize firebase
//firebase.intializeApp(firebaseConfig);
//Required tables/sequelize models
const models = require("../models");
module.exports = function(app, passport) {
  // Get all examples
  app.get("/api/movies", (req, res) => {
    models.Movie.findAll({}).then((results) => {
      res.json(results);
    });
  });
  //Get all reviews from selected movie
  app.get("api/reviews/:id", (req, res) => {
    models.Reviews.findAll({
      where: {
        MovieId: req.params.id
      }
    }).then((results) => {
      res.json(results);
    });
  });
  //Get all reviews from the user
  app.get("/api/reviews/:id", (req, res) => {
    models.Reviews.findAll({
      where: {
        UserId: req.params.id
      }
    }).then((results) => {
      res.json(results);
    });
  });
  // Create a new review
  app.post("/api/reviews", (req, res) => {
    models.Review.create(req.body).then((results) => {
      res.json(results);
    });
  });
  // Delete a review by id
  app.delete("/api/reviews/:id", (req, res) => {
    models.Example.destroy({ where: { id: req.params.id } }).then((results) => {
      res.json(results);
    });
  });
  //Passport routes
  app.post("/signup", passport.authenticate("local-signup", {
    successRedirect: "/dashboard",
    failureRedirect: "/signup"
  }))
  app.post("/signin", passport.authenticate("local-signin", {
    successRedirect: "/dashboard",
    failureRedirect: "/signin"
  }));
};
