var client = require('mongodb')
var express = require('express');
var router = express.Router();
var cookie = require('./cookie')

var URL = 'mongodb://localhost:27017';

function Check_Login(req) {
  if (req.cookie.user_data) {
    return true;
  }
  return false;
}

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

/*Post users listing */

router.route('/LogIn').post(function (req, res) {
  var user_name = req.body.user_name;
  var password = req.body.password;

  if (!(user_name && password)) {
    res.send('ERROR');
  }

  var user_data = { user_name: user_name, password: password };

  client.connect(URL, function (err, db) {

    var dbo = db.db('userdata');

    dbo.collection('user').findOne(user_data, function (err, result) {

      if (result === null) {
        res.send('no data');
      }
      else {
        var user_data = {
          user_name: user_name,
          password: password
        }
        res.cookie('user_data', user_data, { 'maxAge': 60 * 60 * 24 * 30 });
        res.send(result);
      }
    });
  });
});

router.route('/LogUp').post(function (req, res) {
  var user_name = req.body.user_name;
  var password = req.body.password;
  var email = req.body.email;

  if (!(user_name && password && email)) {
    res.send('ERROR');
  }

  client.connect(URL, function (err, db) {

    var dbo = db.db('userdata');

    dbo.collection('user').findOne({ $or: [{ user_name: user_name }, { email: email }] }, function (err, result) {

      if (result !== null) {
        res.send('Alrealy Exist Id or Email');
      }

      else {
        var user_data = {
          user_name: user_name,
          password: password,
          email: email,
          cookie_list: []
        };


        dbo.collection('user').insertOne(user_data);
        res.cookie('user_data', { user_name: user_name, password: password }, { maxAge: 1000 * 60 * 60 * 24 * 30 });
        res.send('Success');
      }
    })
  });
});

router.get('/LogOut', function (req, res) {
  console.log(req.cookies.user_data);
  res.clearCookie('user_data');
});

router.get('/Cookie_Check', function (req, res) {
});

module.exports = router;
