// config/passport.js

const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const connection = require("./db");
// expose this function to our app using module.exports
module.exports = function (passport) {
  passport.use( new LocalStrategy(
      { usernameField: "email", passwordField: "password", session: false },
      function (email, password, cb) {
        connection.query(
          "SELECT email, password FROM users WHERE email = ?",
          [email],
          function (err, email, info) {
            if (err) {
              return cb(err);
            }
            if (!email.length) {
              return cb(null, false);
            }
            if (!bcrypt.compareSync(password, email[0].password)) {
              return cb(null, false);
            }
            if (bcrypt.compareSync(password, email[0].password)) {
               return cb(null, email[0].email);
            }
              return cb(null, email[0].email);
          }
        );
      }
    )
  );

  const JwtStrategy = require('passport-jwt').Strategy;
  const ExtractJwt = require('passport-jwt').ExtractJwt;

  var opts = {}
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = 'jwtsecret';
  opts.issuer = 'wildcodeschool.com';
  opts.audience = 'yoursite.net';

  passport.use(new JwtStrategy(opts, function(jwt_payload, cb) {
    connection.query( "SELECT * FROM users WHERE email = ?", [email], function (err, email) {
      if (err) {
        return cb(err);
      }
      if (!email.length) {
        return cb(null, false);
      }
      return cb(null, jwt_payload);
    });
},  
// function (jwtPayload, cb) {  
//     return cb(null, jwtPayload);
//   }  
));


  // used to serialize the user for the session
  passport.serializeUser(function (email, done) {
    done(null, email.id);
  });

  // used to deserialize the user
  passport.deserializeUser(function (id, done) {
    connection.query(
      "SELECT email, password FROM users WHERE id = ? ",
      [id],
      function (err, rows) {
        done(err, rows[0]);
      }
    );
  });
};
