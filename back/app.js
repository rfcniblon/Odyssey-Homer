// je déclare l'ensemble des librairies nécessaires
const http = require("http");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();
const router = express.Router();
const authRouter = require("./routes/auth/auth");
const passport = require("passport");
require("dotenv").config();
const LocalStrategy = require("passport-local").Strategy;
const connection = require("./helpers/db");

// je configure l'application
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));


app.use(passport.initialize());
app.use(passport.session());
require("./helpers/passport")(passport);

// Route pour signin , signout et profile
app.use("/auth", authRouter);
app.get("/profile", passport.authenticate('jwt', { session: false }),function (req, res) { res.send(req.user); })

// j'implémente la partie API
app.get("/", (req, res) => {
  res.send("youhou");
});

/// dans le cas d'une route non trouvée, je retourne le code 404 'Not Found'
app.use(function (req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

let server = app.listen(process.env.PORT || 3000, function () {
  console.log("Listening on port " + server.address().port);
});