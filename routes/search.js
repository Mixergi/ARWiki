var express = require('express');
var router = express.Router();

router.route('/').post(function(req, res){
    title = req.body.title;
    res.redirect(`/docs/${title}`);
    console.log(title);
});

module.exports = router;