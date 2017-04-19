var express = require('express');
var router = express.Router();
 
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('registration');
});

 var users = db.get("users");
router.post('/', function(req, res, next) {
 var username = req.body.username;
    var password = req.body.password;
    var email  = req.body.email;
    var name = req.body.name;
    // var confirmPass = req.body.confirm;
    users.find({email:email}).then(function (data1) {
        users.find({username:username}).then(function (data2) {
            if (data1.length>0) {
                res.render("registration" ,{messageEmailTaken:"This email is already taken."});
                console.log("zaeto eamil");
            }
            if (data2.length>0) {
                 res.render("registration" ,{messageUsernameTaken:"This username is already taken."});
                console.log("zaeto user");
            }
            if (data1.length==0 && data2.length==0) {
                console.log("vaji");
                users.insert({name:name,username:username,email:email,password:password});
                res.render("login");
            }
        });
    })
 
});


module.exports = router;