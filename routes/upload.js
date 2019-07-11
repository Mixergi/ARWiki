var fs = require('fs');
var multer = require('multer');
var express = require('express');
var router = express.Router();
var path = require('path');
var client = require('mongodb');

var URL = 'mongodb://localhost:27017';


var path_list = path.dirname(__filename).split('\\')
var dir = (__dirname.toString().split(path_list[path_list.length - 1])[0] + 'public\\images\\').split('\\').join('/');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {

        cb(null, dir);
    },

    filename: function (req, file, cb) {
        var testSn = req.body.TEST_SN;
        var qSn = req.body.Q_SN;
        var mimeType;

        switch (file.mimetype) {
            case "image/jpeg":
                mimeType = "jpg";
                break;
            case "image/png":
                mimeType = "png";
                break;
            case "image/gif":
                mimeType = "gif";
                break;
            case "image/bmp":
                mimeType = "bmp";
                break;
            default:
                mimeType = "jpg";
                break;
        }

        cb(null, testSn + "_" + qSn + "." + mimeType);
    }
});

var upload = multer({ storage: storage });

router.get('/image', function (req, res) {
    res.render('img');
});

router.post('/image', upload.single('name'), function (req, res) {
    var testSn = req.body.TES1T_SN;
    var qSnArr = req.body.Q_SN;
    var imgFile = req.file;
    res.render('img', { err: error });
});

router.route('/docs').post(function (req, res) {

    var title = req.body.title;
    var content = req.body.content;
    var contributer;

    if (title != "") {
        if (req.cookies.user_data) {
            contributer = req.cookies.user_data['user_name'];
        }
        else {
            contributer = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        }

        client.connect(URL, function (err, db) {
            var dbo = db.db('docs');

            var date = new Date();
            dbo.collection(title).findOne({}, (err, rs) => {
                if (rs == null) {
                    dbo.collection(title).insertOne({ title: title, content: content, contributer: contributer, date: date.toString(), version: 0 });
                    res.redirect(`/docs/${title}`);
                }
                else {
                    dbo.collection(title).find().toArray((err, data) => {
                        dbo.collection(title).insertOne({ title: title, content: content, contributer: contributer, date: date.toString(), version: data.length - 1 });
                        res.redirect(`/docs/${title}`);
                    });
                }
            });
        });
    }
    else{
        res.redirect('/newdocs');
    }
});

module.exports = router;