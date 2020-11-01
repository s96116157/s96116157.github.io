//var return_txt = getJson(3);
//console.log(return_txt);
var x = { "type": "flex", "altText": "this is a flex message", "contents": { "type": "carousel", "contents": {} } };
var array_ = [];
console.log(x);
console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
getJson(0);
function getJson(num) {
    var y = x;
    // 0 = 追隨好友, 1 = 選擇想要的占卜項目
    $.getJSON('https://s96116157.github.io/js/json/LINE_bubble.json', function (data) {


        array_.push(data[3]);
        array_.push(data[3]);
        array_.push(data[3]);


        y['contents']['contents'] = array_;
        console.log(y);
        console.log("yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy");
        console.log(data[4]);
        console.log(data[3]);
        //var info_txt = JSON.parse(data);
        //return info_txt[num];
    })
}