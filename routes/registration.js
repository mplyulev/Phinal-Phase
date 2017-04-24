var express = require('express');
var router = express.Router();
 
router.get('/', function(req, res, next) {
  res.render('registration');
});

var users = db.get("users");
router.post('/', function(req, res, next) {
 var username = req.body.username;
    var password = req.body.password;
    var email  = req.body.email;
    var name = req.body.name;
    users.find({email:email}).then(function (data1) {
        users.find({username:username}).then(function (data2) {
            if (data1.length>0) {
                res.render("registration" ,{messageEmailTaken:"This email is already taken."});
            }
            if (data2.length>0) {
                 res.render("registration" ,{messageUsernameTaken:"This username is already taken."});
            }
            if (data1.length==0 && data2.length==0) {
                users.insert({name:name,username:username,email:email,password:password, avatarURL:"https://rockymountainradar.com/landing/images/blank-avatar.png"});
                res.redirect("/login");
            }
        });
    })

});
module.exports = router;