var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/LogUp', function(req, res, next) {
  res.render('LogUp');
});

router.get('/', function(req, res, next){
  res.render('main');
});

router.get('/wk', function(req, res){
  res.render('wk');
});

module.exports = router;
