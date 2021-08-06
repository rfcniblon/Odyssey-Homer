const express = require("express");
const parser = require("body-parser");
const router = express.Router();

router.use(parser.json());
router.use(parser.urlencoded({
    extended:true
}));

router.post('/signup', function(req, res, next) {
    res.send('I am in POST signup');
    });

module.exports = router; 