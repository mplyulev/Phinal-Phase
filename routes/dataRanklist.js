var express = require('express');
var router = express.Router();
users=db.get("users");
router.get('/', function(req, res, next) {
    users.find()
        .then(function (data2) {  
          console.log(data2);
          res.json(data2);
  }).catch(function(err) {
    res.json(500 , err);
  }); 
});
module.exports = router;