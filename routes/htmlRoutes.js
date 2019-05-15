var models = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", isLoggedIn, (req, res) => {
    // console.log(req.user.id);
    models.Movie.findAll({}).then(results => {
      res.render("home", {
        movies: results
      });
    });
  });
  //Passport routes
  app.get("/dashboard", (req, res) => {
    res.render("dashboard");
  });
  app.get("/signup", (req, res) => {
    res.render("signup");
  });
  /*
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
    res.redirect("/dashboard");
  }
  // Render 404 page for any unmatched routes
  app.get("*", (req, res) => {
    res.render("404");
  });
};
