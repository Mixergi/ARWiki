var fs = require('fs');
var multer = require('multer');
var express = require('express');
var router = express.Router();
var path = require('path');

var path_list = path.dirname(__filename).split('\\')
var dir = __dirname.toString().split(path_list[path_list.length - 1])[0] + 'public\\images\\';

router.route('/image').post(function (req, res) {
    console.log(dir);
    res.redirect('/');
});

module.exports = router;