//Routing for signup page?
const authController = require("../controllers/authController");
  module.exports = function(app, passport) {
    app.get("/signup", authController.signup);
    app.get("/signin", authController.signin);
    app.post("/singup", passport.authenticate("local-signup", {
      successRedirect: "/dashboard",
      failureRedirect: "/signup"
    }))
  };
