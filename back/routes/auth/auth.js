const express = require("express");
const parser = require("body-parser");
const router = express.Router();
const connection = require("../../helpers/db");

router.use(parser.json());
router.use(
  parser.urlencoded({
    extended: true,
  })
);

router.post("/signup", function (req, res, next) {
  const user = req.body;
  connection.query(
    "INSERT INTO users (email, password, name, lastname) VALUES (?, ?, ?, ?)",
    [user.email, user.password, user.name, user.lastname],
    (error, results, fields) => {
      if (error) res.status(500).json({ flash: error.message });
      else res.status(200).json({ flash: "User has been signed up !" });
    }
  );
});

router.post('/signin', function(req, res,next) {
    // on récupère les données de connexion de notre utilisateur 
    const users = req.body;
    // on va essayer de trouver dans la base de données un utilisateur 
    // dont les noms et mots de passe correspondent
    connection.query(
      "SELECT * FROM users WHERE name=? AND password=?",
      [users.name, users.password],
      (error, results, fields) => {
        if (error) res.status(500).json({ flash: error.message });
      else res.status(200).json({ flash: "User has been logguer !" });
      }
    )
    
  })

module.exports = router;
