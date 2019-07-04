var crypto = require('crypto');
var client = require('mongodb');

var URL = 'mongodb://localhost:27017';

function Cookie_Encryt(cookie_data) {
    crypto.randomBytes(64, function (err, buf) {
        crypto.pbkdf2(cookie_data, buf.toString('base64'), 101151, 64, 'sha512', function (error, key) {
            return key.toString('base64');
        });
    });
}

var Cookie = {
    Set_Cookie: function (res, user_data) {
        var cookie_data = user_data.cookie_list;

        return Promise(client.connect(URL, function (err, db) {
            var dbo = db.db('userdata');

            var encryted_password = Cookie_Encryt(user_data.password);

            cookie_data.push(encryted_password);

            dbo.collection('user').updateOne(user_data, { $set: { cookie_data: cookie_data } });

            res.cookie('user_data', {user_name:user_data.user_name, password : encryted_password}, {maxAge : 1000 * 60 * 60 * 24 * 30});

            return true;
        }));
    },
    Check_Cookie: function (user_data) {

        return new Promise(client.connect(URL, function (err, db) {
            var dbo = db.db('userdata');

            dbo.collection('user').findOne({ user_name: user_data.user_name }, function (err, result) {
                if (result == null) {
                    return false;
                }
                else {
                    if (user_data.cookie_data in result.cookie_list) {
                        return true;
                    }
                    else {
                        return true
                    }
                }
            });
        }));
    }
}
module.exports = Cookie;