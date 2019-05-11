const bCrypt = require("bcrypt-nodejs");
module.exports = function(passport, user) {
  let User = user;
  let LocalStrategy = require("passport-local").Strategy;
  passport.use("local-signup", new LocalStrategy({
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true
    },
    function (req, email, password, done) {
      let generateHash = function(password) {
        return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
      };
      User.findOne({
        where: {
          email: email
        }
      }).then(function (user) {
        if(user) {
          return done(null, false, {
            message: 'That email is already taken'
          });
        } else {
          let userPassword = generateHash(password);
          let data = {
            name: req.body.name,
            email: email,
            password: userPassword
          };
          User.create(data).then(function(newUser, created) {
            if (!newUser) {
              return done(null, false);
            }
            if (newUser) {
              return done(null, newUser);
            }
          });
        }
      })
    },
    passport.use("local-signin", new LocalStrategy( {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true
    },
    function(req, email, password, done) {  
      let isValidPassword = function(userpass, password) {
        return bCrypt.compareSync(password, userpass);
      }
      User.findOne({
        where: {
          email: email
        }
      }).then(function(user) {
        if (!user) {
          return done(null, false, {
            message: "Email does not exist"
          });
        }
        if (!isValidPassword(user.password, password)) {
          return done(null, false, {
            message: "Incorrect Password"
          });
        }
        let userinfo = user.get();
        return done(null, userinfo);
      }).catch(function(err) {
        console.log("Error:", err);
        return done(null, false, {
          message: "Something went wrong with your Signin"
        });
      })
    }))
  ));
  //Serialize user
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });
  //Deserialize user
  passport.deserializeUser(function (id, done) {
    User.findById(id).then(function(user) {
      if (user) {
        done(null, user.get());
      } else {
        done(user.errors, null);
      }
    });
  });
}