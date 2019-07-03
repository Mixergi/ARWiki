

function MarkUp(data){
    var sum = ''
    for(var i in data){
        sum += data[i];
    }

    console.log(sum);
}

module.exports = MarkUp

MarkUp("##Data\n###IsData");