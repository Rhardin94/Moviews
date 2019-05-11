//Routing for signup page?
//const authController = require("../controllers/authController");
module.exports = function(app, passport) {
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
  app.post("/signup", passport.authenticate("local-signup", {
    successRedirect: "/dashboard",
    failureRedirect: "/signup"
  }))
  app.post("/signin", passport.authenticate("local-signin", {
    successRedirect: "/dashboard",
    failureRedirect: "/signin"
  }));
  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/signin");
  };
};
