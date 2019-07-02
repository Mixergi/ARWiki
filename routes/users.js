var crypto = require('crypto');
var client = require('mongodb')
var express = require('express');
var router = express.Router();

var URL = 'mongodb://localhost:27017';

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
    if (err) throw err;

    var dbo = db.db('userdata');

    dbo.collection('user').findOne(user_data, function (err, result) {
      if (err) throw err;

      if (result === null) {
        res.send('no data');
      }
      else {
        res.cookie('user_name', user_name, {'maxAge' : 60 * 60 * 24 * 30});
        res.cookie('password', password, {'maxAge' : 60 * 60 * 24 * 30});
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
    if (err) throw err;

    var dbo = db.db('userdata');

    dbo.collection('user').findOne({ $or: [{ user_name: user_name }, { email: email }] }, function (err, result) {
      if (err) throw err;

      if (result !== null) {
        res.send('Alrealy Exist Id or Email');
      }

      else {
        dbo.collection('user').insertOne({ user_name: user_name, password: password, email: email });
        res.cookie('user_name', user_name, {'maxAge' : 60 * 60 * 24 * 30});
        res.cookie('password', password, {'maxAge' : 60 * 60 * 24 * 30});
        res.send('SUCCESS');
      }
    })
  });
});

router.route('/LogOut').post(function (req, res) {
  res.clearCookie();
  res.end('shibal');
});
module.exports = router;
