var express = require('express');
var router = express.Router();
users = db.get("users");
router.get('/', function (req, res, next) {
  users.find()
    .then(function (data) {
      res.json(data);
    }).catch(function (err) {
      res.json(500, err);
    });
});
module.exports = router;