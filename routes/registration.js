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
    users.insert({username:username}, {password:password},{name:name},{email:email});
   
   console.log(users);
 
});


module.exports = router;