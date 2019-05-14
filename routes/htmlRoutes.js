var models = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", (req, res) => {
    models.Movie.findAll({}).then(results => {
      res.render("home", {
        movies: results
      });
    });
  });
  app.get("/api/reviews/:id", (req, res) => {
    models.Review.findAll({
      where: {
        MovieId: req.params.id
      }
    }).then((results) => {
      res.render("index", {
        reviews: results
      });
    });
  });
  //Passport routes
  app.get("/dashboard", isLoggedIn, (req, res) => {
    res.render("dashboard");
  });
  /*
  app.get("/signup-block", (req, res) => {
    res.render("signup-block");
  });
  app.get("/signin-block", (req, res) => {
    res.render("signin-block");
  });
  */
  app.get("/logout", (req, res) => {
    req.session.destroy(function(err) {
      res.redirect("/");
    });
  });
  //Function that requires user to login before moving past homepage
  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/index");
  }
  // Render 404 page for any unmatched routes
  app.get("*", (req, res) => {
    res.render("404");
  });
};
