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

router.post("/signup", function(req,res, next) {
    const user = req.body;
      connection.query(
        "INSERT INTO users (email, password, name, lastname) VALUES (?, ?, ?, ?)", 
        [user.email, user.password, user.name, user.lastname, ], 
        (error, results, fields) => {
          if( error ){
            res.status(500).end();
          }
          else{
            res.status(200).end();
          }
        }
      )
    }
  )


module.exports = router;
