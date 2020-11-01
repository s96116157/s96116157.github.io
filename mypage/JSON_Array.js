//var return_txt = getJson(3);
//console.log(return_txt);
var x = { "type": "flex", "altText": "this is a flex message", "contents": { "type": "carousel", "contents": {} } };
var array_ = [];
getJson(0);
function getJson(num) {
    var y = x;
    // 0 = 追隨好友, 1 = 選擇想要的占卜項目
    $.getJSON('https://s96116157.github.io/js/json/LINE_bubble.json', function (data) {
        var i = 2;
        var data_txt = "m_" + i.toString();
        console.log(data_txt);
        console.log(data[3]["body"]["contents"][1]["contents"][0]["contents"][0]["action"]["data"]);

    })
}