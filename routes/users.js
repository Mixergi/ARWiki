var client = require('mongodb')
var express = require('express');
var router = express.Router();
var cookie = require('./cookie')

var URL = 'mongodb://localhost:27017';

router.route('/SignIn').post(function (req, res) {
  var user_name = req.body.user_name;
  var password = req.body.password;

  if (!(user_name && password)) {
    res.render('SignIn', { err: true });
  }

  var user_data = { user_name: user_name, password: password };

  client.connect(URL, function (err, db) {

    var dbo = db.db('userdata');

    dbo.collection('user').findOne(user_data, function (err, result) {

      if (result === null) {
        res.render('SignIn', { err: true });
      }
      else {
        var user_data = {
          user_name: user_name,
          password: password
        }
        res.cookie('user_data', user_data, { 'maxAge': 60 * 60 * 24 * 30 });
        res.redirect('/');
      }
    });
  });
});

router.route('/SignUp').post(function (req, res) {
  var user_name = req.body.user_name;
  var password = req.body.password;
  var email = req.body.email;

  if (!(user_name && password && email)) {
    res.render('SignUp', { err: true });
  }

  client.connect(URL, function (err, db) {

    var dbo = db.db('userdata');

    dbo.collection('user').findOne({ $or: [{ user_name: user_name }, { email: email }] }, function (err, result) {

      if (result != null) {
        res.render('SignUp', { err: true });
      }

      else {
        var user_data = {
          user_name: user_name,
          password: password,
          email: email
        };

        dbo.collection('user').insertOne(user_data)
        res.cookie('user_data', { user_name: user_name, password: password }, { maxAge: 1000 * 60 * 60 * 24 * 30 });
        res.redirect('/');
      }
    })
  });
});

router.get('/LogOut', function (req, res) {
  if (req.cookies.user_data) {
    res.clearCookie('user_data');
  }
  res.redirect('/');
});

module.exports = router;
