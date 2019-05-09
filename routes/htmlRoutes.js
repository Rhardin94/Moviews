var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", (req, res) => {
    db.Movie.findAll({}).then((results) => {
      res.render("index", {
        msg: "Welcome!",
        movies: results
      });
    });
  });
  // Load example page and pass in an example by id
  app.get("/movie/:id", (req, res) => {
    db.Movie.findOne({ where: { id: req.params.id } }).then((results) => {
      res.render("example", {
        movie: results
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", (req, res) => {
    res.render("404");
  });
};
