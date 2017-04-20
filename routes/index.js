var express = require('express');
var router = express.Router();
users=db.get("users");
/* GET home page. */
router.get('/', function(req, res, next) {
    users.find({ _id: req.session.userId})
        .then(function (data) {
          var loggedInUser = data[0].username;
  console.log(loggedInUser)
  
    res.render('index',{message:loggedInUser});
  });
});

module.exports = router;
