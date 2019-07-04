var client = require('mongodb');

var URL = 'mongodb://localhost:27017';

function Check_Cookie(req){
    var user_data = req.cookies.user_data;

    if(!(user_data.user_name && user_data.password)){
        return false;
    }

    client.connect(URL, function(err, db){
        var dbo = db.db('userdata');

        dbo.collection('user').findOne(user_data, function(err, data){
            if(data !== null){
                return true;
            }
            else{
                return false;
            }
        });
    });
}

module.exports = Check_Cookie;