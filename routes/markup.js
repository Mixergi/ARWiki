var Markup = function (data) {
    var MarkupStack = '';
    var content = '';
    var imageLink = '';
    var ImageLink = false;
    var bold = '';
    var Bold = false;

    var pattern = /\[|\]|\#|\@|\"/

    for (var i in data) {
        if (!pattern.test(data[i])) {
            if (MarkupStack.length == 0) {
                if (ImageLink) {
                    imageLink += data[i];
                }
                else if(Bold){
                    bold +=data[i];
                }
                else {
                    content += data[i];
                }
            }

            //Img Tag
            else if (MarkupStack == "[[" || MarkupStack == "]]"){
                if(MarkupStack == "[["){
                    ImageLink = true;
                    imageLink += data[i];
                }
                else{
                    content += `<br><img src="/images/${imageLink}" width = "40%"><br>`;
                    ImageLink = false;
                    imageLink = '';
                }
            }

            //Title Tag
            else if(MarkupStack == '"""'){
                if(Bold){
                    content += `<b>${bold}</b>`
                    Bold = false;
                    bold ='';
                }
                else{
                    Bold = true;
                    bold = data[i];
                }
            }

            else {
                content += MarkupStack;
            }
            MarkupStack = '';
        }
        else {
            MarkupStack += data[i];
        }
    }


    if(MarkupStack != ''){
        if(MarkupStack == ']]'){
            content += `<br><img src="/images/${imageLink}" width = "40%"><br>`;
            ImageLink = false;
            imageLink = '';
        }
        if(MarkupStack == '"""'){
            content += `<b>${bold}</b>`;
            Bold = false;
            bold = '';
        }
    }


    if(Bold || ImageLink){
        content += bold + imageLink;
    }
    return content;
};

module.exports = Markup;   