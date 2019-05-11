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
    models.Review.findAll({
      where: {
        MovieId: req.params.id
      }
    }).then((results) => {
      res.json(results);
    });
  });
  //Get all reviews from the user
  app.get("/api/reviews/:id", (req, res) => {
    models.Review.findAll({
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
    models.Review.destroy({ where: { id: req.params.id } }).then((results) => {
      res.json(results);
    });
  });
  //Passport routes
  app.post("/signup", function(req, res, next){
    console.log(req.body);
    next();
  }, passport.authenticate("local-signup", {
    successRedirect: "/",
    failureRedirect: "/signup"
  }));
  app.post("/signin", function(req, res, next){
    console.log(req.body);
    next();
  }, passport.authenticate("local-signin", {
    successRedirect: "/",
    failureRedirect: "/signin"
  }));
};
