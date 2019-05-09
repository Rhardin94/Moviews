//Importing firebase for user authentication
const firebaseConfig = require("../config/connection");
//Initialize firebase
firebase.intializeApp(firebaseConfig);
//Required tables/sequelize models
const db = require("../models");
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
  /*Create a new user
  app.post("/api/create", (req, res) => {
    let userName = req.body.name;
    let userPass = req.body.pass;
    let userEmail = req.body.email;
    firebase.auth().createUserWithEmailAndPassword(userEmail, userPass).catch((error) => {
      let errorCode = error.code;
      let errorMessage = error.message;
      console.log(errorCode + "\n" + errorMessage);
    });
  });
  Login existing user
  app.post("/api/login", (req, res) => {
    let userName = req.body.name;
    let userPass = req.body.pass;
    let userEmail = req.body.email;
    firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch((error) => {
      let errorCode = error.code;
      let errorMessage = error.message;
      console.log(errorCode + "\n" + errorMessage);
    });
  });*/
  app.post("/api/signup", passport.authenticate("local-signup", {
    successRedirect: "/",
    failureRedirect: "/api/signup"
  }))
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
