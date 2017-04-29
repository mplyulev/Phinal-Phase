var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');


users=db.get("users");
router.get('/', function(req, res, next) {
  users.find({ _id: req.session.userId}).then(function (data) {
      var loggedInUser = data[0].username;
      console.log(loggedInUser);
      res.render('index',{message:"  Welcome, " + loggedInUser +"!", message2:loggedInUser});
  });
});
router.post("/", function (req, res, next)  {
  var currentPassword = req.body.currentPassword;
  var newPassword = req.body.newPassword;
  var avatarURL = req.body.avatarURL;
 
  users.find({ _id: req.session.userId} ).then(function (data)  {
      loggedInUser = data[0].username;
      if(avatarURL.length!==0) {
          users.update( {_id: req.session.userId} ,{ $set: {
          avatarURL: avatarURL
      }});
      res.redirect("/index#/changePassword");
      }
      if ( bcrypt.compareSync(currentPassword, data[0].password) && newPassword.length>=6) { 
          console.log("smenqm q brato"); 
          var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(newPassword, salt);
          users.update( {_id: req.session.userId} ,{ $set: {
            "password": hash
          }});
          res.render("index",{message2:loggedInUser,message3:"Password changed!"});
          console.log(data);
     }
     if (!bcrypt.compareSync(currentPassword, data[0].password)){
          res.render( "index",{message2:loggedInUser,message4:"Wrong password!"});
     }
     if ( bcrypt.compareSync(currentPassword, data[0].password) && newPassword.length<6){
          res.render( "index",{message2:loggedInUser,message5:"The password must be at least 6 symbols long!"});
     }
  });
})
module.exports = router;
