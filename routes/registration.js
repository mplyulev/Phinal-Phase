var express = require('express');
var router = express.Router();
var session = require("express-session");
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('registration');
});

 
router.post('/', function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    var email  = req.body.email;
    var name = req.body.name;
    var confirmPass = req.body.confirm;
    var db = req.db;
    console.log(db);
    var users = db.get("users");
users.find({username:username, password:password}).then(function (data) {
   res.redirect("/")
});
});





module.exports = router;