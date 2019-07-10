var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next){
  res.render('main', {SignIn :  false});
});

router.get('/SignIn', function(req, res){
  res.render('SignIn');
});

router.get('/SignUp',function(req, res){
  res.render('SignUp');
});

module.exports = router;
