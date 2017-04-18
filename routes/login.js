var express = require('express');
var router = express.Router();
var session = require("express-session");
 
 var app = express();
 app.use(function(req, res, next) {
    req.db = db;
    next();
});

/* GET home page. */

router.post('/', function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    var db = req.db;
    console.log(db);
    var users = db.get("users");
    console.log(users);
users.find({username:username, password:password}).then(function (data) {
     if (data.length>0) {
         req.session.username = username;
         res.redirect('/')
     }
     else { 
         res.render('/login', {message:"Wrong username or password!"});
     }
 
});
});

router.get('/', function(req, res, next) {
  res.render('login');
});



module.exports = router;