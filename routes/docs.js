var client = require('mongodb');
var express = require('express');
var router = express.Router();
var markup = require('./markup');

var URL = 'mongodb://localhost:27017';


router.route('/:title/edit').post(function (req, res) {
    res.render('index', {title : req.params.title})
});


router.get('/:title/:version', function (req, res) {
    var user_name = req.cookies.user_data.user_name;
    client.connect(URL, function (err, db) {

        var title = req.params['title'];
        var version = req.params['version'];
        var dbo = db.db('docs');

        dbo.collection(title).find().toArray(function (err, result) {

            if (result.length == 0) {
                res.redirect('/newdocs');
            }
            else if (version > result.length - 1) {
                res.redirect(`/docs/${title}`);
            }
            else {
                res.render('wk', { user_name: user_name, title: title, content: result[version - 1].content, history: result });
            }
        });
    });
});

router.get('/:title', function (req, res) {
    if (req.cookies) {
        client.connect(URL, function (err, db) {
            var title = req.params['title'];
            var dbo = db.db('docs');

            dbo.collection(title).find().toArray(function (err, result) {

                if (result.length != 0) {
                    res.render('wk', { user_name: user_name, title: title, content: markup(result[result.length - 1].content), history: result });
                }
                else {
                    res.redirect('/newdocs');
                }
            });
        });
    }
    else {
        var user_name = req.cookies.user_data.user_name;
        client.connect(URL, function (err, db) {
            var title = req.params['title'];
            var dbo = db.db('docs');

            dbo.collection(title).find().toArray(function (err, result) {

                if (result.length != 0) {
                    res.render('wk', { user_name: user_name, title: title, content: result[result.length - 1].content, history: result });
                }
                else {
                    res.redirect('/newdocs');
                }
            });
        });
    }
});

module.exports = router;