var express = require('express');
var router = express.Router();
// var session = require("express-session");
 

    var users = db.get('users');
router.post('/', function (req, res, next) {

    var username = req.body.username;
    var password = req.body.password;
    var email  = req.body.email;
    var name = req.body.name;
    // var confirmPass = req.body.confirm;
   
    
   users.find({username:username}).then(function (data) {
       if (data.length>0) {
          
       }
   })
   users.find({email:email}).then(function (data1) {
        users.find({username:username}).then(function (data2) {
       if (data1.length>0) {
           console.log("zaeto eamil");
    }
       if (data2.length>0) {
           console.log("zaeto user");
    }
    if (data1.length==0 && data2.length==0) {
        console.log("vaji");
        users.insert({name:name,username:username,email:email,password:password});
          res.redirect("/login");
    }
        });
   })
 
 
      users.find().then(function (data) {
      console.log(data);
  });
    var usernameLogin = req.body.usernameLogin;

    var passwordLogin = req.body.key;
     users.find({ username: usernameLogin} ,{password: passwordLogin })
        .then(function (data) {
            if (data.length > 0) {
                req.session.userId = data[0]._id;
                res.redirect('/');
            } 
            else {
                res.render('login', { message: 'Wrong username or password.' }); 
            }
        });
});

router.get('/', function(req, res, next) {
      res.render('login');
    

//  db = req.db;
//     db.get("users",{}).find({},{}).then(function (data) {
//         console.log(data);
//     });

  
});



module.exports = router;