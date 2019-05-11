var models = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", (req, res) => {
    models.Movie.findAll({}).then((results) => {
      res.render("index", {
        msg: "Welcome!",
        movies: results
      });
    });
  });
  // Load example page and pass in an example by id
  app.get("/movies/:id", isLoggedIn, (req, res) => {
    models.Movie.findOne({ where: { id: req.params.id } }).then((results) => {
      res.render("movies", {
        movie: results
      });
    });
  });
  //Passport routes
  app.get("/dashboard", isLoggedIn, (req, res) => {
    res.render("dashboard");
  })
  app.get("/signup", (req, res) => {
    res.render("signup");
  });
  app.get("/signin", (req, res) => {
    res.render("signin");
  });
  app.get("/logout", (req, res) => {
    req.session.destroy(function(err) {
      res.redirect("/");
    })
  });
  //Function that requires user to login before moving past homepage
  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/signin");
  };
  // Render 404 page for any unmatched routes
  app.get("*", (req, res) => {
    res.render("404");
  });
};
