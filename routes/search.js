var express = require('express');
var router = express.Router();

router.route('/').post(function (req, res) {
    title = req.body.title;
    if (title != "") {
        res.redirect(`/docs/${title}`);
    }
    else {
        res.redirect('/');
    }
});

module.exports = router;