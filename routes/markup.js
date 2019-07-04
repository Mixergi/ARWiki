var pug = require('pug');
var fs = require('fs');
var MarkUpData = JSON.parse(fs.readFileSync('./MarkUp.json', { encoding: 'utf8' }));

function MarkUp(data) {
    var pattern = /#|\[|\]/;
    var Link = '';
    var IsInA = false;
    

    var converted_data = '';
    var markup_stack = '';
    for (var i in data) {

        if (!(pattern.test(data[i]))) {
            var MarkUp = MarkUpData[markup_stack];

            if (IsInA) {
                Link += data[i];
            }

            else if (MarkUp == 'a') {
                
            }

            else if (MarkUp !== undefined) {
                converted_data += MarkUpData[markup_stack] + ' ';
            }
            else{
                converted_data += data[i];

                markup_stack = '';
            }
        }
        else if (true) {

        }
        else {
            markup_stack += data[i];0
        }
    }

    console.log(converted_data);
}

module.exports = MarkUp;

MarkUp("##data\n###data");