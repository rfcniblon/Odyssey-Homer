const express = require("express");
const parser = require("body-parser");
const router = express.Router();
const connection = require("../../helpers/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtsecret = process.env.JWT_SECRET;

require("dotenv").config();
const passport = require("passport");
router.use(parser.json());
router.use(
  parser.urlencoded({
    extended: true,
  })
);

// Register
router.post("/signup", function (req, res, next) {
  const user = req.body;
  // je crypte myPassword qui devient un 'hash'
  let hash = bcrypt.hashSync(user.password, 10);
  connection.query(
    "INSERT INTO users (email, password, name, lastname) VALUES (?, ?, ?, ?)",
    [user.email, hash, user.name, user.lastname],
    (error, results, fields) => {
      if (error) res.status(500).json({ flash: error.message });
      else res.status(200).json({ flash: "User has been signed up !" });
    }
  );
});

// Login
router.post("/signin", function (req, res) {
  const user = req.body;
   //const isSame = bcrypt.compareSync(user.password, 10);

  passport.authenticate("local", (err, user, info) => {
    const Imessage ="user or password not database";
    if (err) return res.status(500).send(err);
    if (!user) return res.status(400).send(Imessage);
    const token =  jwt.sign(
      { user },
      jwtsecret,
      (err, token) => {
        if (err) {
          res.status(501).send("JWT error");
        }
        else {
          // res.json({ token });
          res.status(200).json({user, token});
        }
      })
   
  })(req, res);
});

router.get('/user', function(req, res)  {
  connection.query('SELECT * FROM users ',
    (err, results) => {
      if (err) {
        console.log('Get table user not ok');
      } else {
        console.log('Get table user ok');
        res.json(results);
      }
    });
});

module.exports = router;
