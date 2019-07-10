var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  if (req.cookies.user_data) {
    res.render('main', { name: req.cookies.user_data['user_name'] });
  }
  else {
    res.render('main');
  }
});

router.get('/SignIn', function (req, res) {
  if (req.cookies.user_data) {
    res.redirect('/');
  }
  else {
    res.render('SignIn');
  }
});

router.get('/SignUp', function (req, res) {
  if (req.cookies.user_data) {
    res.redirect('/');
  }
  else {
    res.render('SignUp');
  }
});

module.exports = router;
