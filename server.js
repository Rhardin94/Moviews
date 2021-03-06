/* eslint-disable no-undef */
//Importing .env configuration for .env sensitive information
require("dotenv").config();
//Dependencies
const passport = require("passport");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const models = require("./models");
const app = express();
const PORT = process.env.PORT || 4500;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
//Passport sessions
app.use(session({secret: "keyboard cat", resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session()); 
// Handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
//Passport strategies
require("./config/passport/passport")(passport, models.User);
// Routes
require("./routes/apiRoutes")(app, passport);
require("./routes/htmlRoutes")(app);
let syncOptions = { force: false };
// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}
// Starting the server, syncing our models ------------------------------------/
models.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    // eslint-disable-next-line no-console
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
}).catch((err) => {
  // eslint-disable-next-line no-console
  console.log(err, "Something went wrong with db update!");
});
module.exports = app;
