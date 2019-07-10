var client = require('mongodb');
var express = require('express');
var router = express.Router();

var URL = 'mongodb://localhost:27017';

router.get('/:title/:version', function (req, res) {
    client.connect(URL, function (err, db) {
        if (err) throw err;

        var title = req.params['title'];
        var version = req.params['version'];
        var dbo = db.db('docs');

        dbo.collection(title).findOne({ version: parseInt(version) }, function (err, data) {
            if (data == null) {
                res.send('ERROR');
            }
            else {
                res.send(`<h1>${data['content']}</h1>`);
            }
        });
    });
});

router.get('/:title', function (req, res) {
    client.connect(URL, function (err, db) {
        if (err) throw err;

        var title = req.params['title'];
        var dbo = db.db('docs');

        dbo.collection(title).findOne({}, function (err, data) {
            if (data == null) {
                res.send('ERROR');
            }
            else {
                res.render('wk');
            }
        });
    });
});


router.route('/:title/edit').post(function(req, res){

});

module.exports = router;