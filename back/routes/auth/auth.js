const express = require("express");
const parser = require("body-parser");
const router = express.Router();
const connection = require('../../helpers/db');

router.use(parser.json());
router.use(parser.urlencoded({
    extended:true
}));

router.post('/signup', function(req, res, next) {
    const userSign = req.body;
      connection.query(
        "INSERT INTO users (email, password, name, lastname) VALUES (?,?,?,?)", 
        [userSign.email, userSign.password, userSign.name, userSign.lastname], 
        (error, results, fields) => {
          if( error ){
            res.status(500).end();
          }
          else{
           res.status(200).end();
        }
        }
      )
    });

module.exports = router; 