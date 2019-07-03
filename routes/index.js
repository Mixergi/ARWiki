var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/LogUp', function(req, res, next) {
  res.render('LogUp');
});

module.exports = router;
