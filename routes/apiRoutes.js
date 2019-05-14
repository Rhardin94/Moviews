//Importing firebase for user authentication
//const firebaseConfig = require("../config/connection");
//Initialize firebase
//firebase.intializeApp(firebaseConfig);
//Required tables/sequelize models
const models = require("../models");
module.exports = function(app, passport) {
  // Get all movies
  app.get("/api/movies", (req, res) => {
    models.Movie.findAll({include:[models.Review]}).then((results) => {
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
    })
  })
  //Get all reviews
  app.get("/api/reviews", (req, res) => {
    models.Review.findAll({}).then((result) => {
      res.json(result);
    });
  });
  //Get all reviews from selected movie
  app.get("/api/reviews/:id", (req, res) => {
    models.Review.findAll({
      where: {
        MovieId: req.params.id
      }
    }).then((results) => {
      res.json(results);
    }); 
  });
  // app.get("/api/users", (req, res) => {
  //   models.User.findAll({}).then((result) => {
  //     res.json(result);
  //   });
  // });
  // Create a new review
  app.post("/api/reviews/add", (req, res) => {
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
    successRedirect: "/dashboard",
    failureRedirect: "/signup"
  }));
  app.post("/signin", function(req, res, next){
    console.log(req.body);
    next();
  }, passport.authenticate("local-signin", {
    successRedirect: "/dashboard",
    failureRedirect: "/signin"
  }));
};
