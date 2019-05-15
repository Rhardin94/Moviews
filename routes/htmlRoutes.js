// eslint-disable-next-line no-undef
var models = require("../models");
// eslint-disable-next-line no-undef
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
  app.get("/signin", (req, res) => {
    res.render("signin");
  });
  app.get("/signup", (req, res) => {
    res.render("signup");
  });
  app.get("/logout", (req, res) => {
    // eslint-disable-next-line no-unused-vars
    req.session.destroy(function(err) {
      res.redirect("/");
    });
  });
  //Function that requires user to login before moving past to next page
  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/signup");
  }
  // Render 404 page for any unmatched routes
  app.get("*", (req, res) => {
    res.render("404");
  });
};
