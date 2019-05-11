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
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");
//Importing passport strategies
require("./config/passport/passport")(passport, models.user);
// Routes
//require("./routes/apiRoutes")(app);
//require("./routes/htmlRoutes")(app);
require("./routes/auth")(app, passport);
let syncOptions = { force: false };
// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}
// Starting the server, syncing our models ------------------------------------/
models.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
}).catch((err) => {
  console.log(err, "Something went wrong with db update!");
});
module.exports = app;
