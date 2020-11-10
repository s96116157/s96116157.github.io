//var return_txt = getJson(3);
//console.log(return_txt);
var x = { "type": "flex", "altText": "this is a flex message", "contents": { "type": "carousel", "contents": {} } };
var array_ = [];
//getJson(0);
str_sub();
function getJson(num) {
    var y = x;
    // 0 = 追隨好友, 1 = 選擇想要的占卜項目
    //https://s96116157.github.io/js/json/LINE_bubble.json
    var url = "https://script.google.com/macros/s/AKfycbxi5xNdxcApWLiLGSskJwaY-rrDXQCGBbOtz0tvN3J6mZm-3cg/exec";
    //var url = "https://script.google.com/macros/s/AKfycbycYobkKyElU0VclVL4PxSHK4tDG26YkBcQvMWPT-7_uipmKbTc/exec"
    var _select = "?type=c&order_no=9"
    var link = url + _select;

    $.getJSON(link, function (data) {
        console.log(data[0]);
        console.log(JSON.stringify(data));

        //var i = 2;
        //var data_txt = "m_" + i.toString();
        //console.log(data_txt);
        //console.log(data[3]["body"]["contents"][1]["contents"][0]["contents"][0]["action"]["data"]);

    })
}

function str_sub() {
    var url = 'https://spreadsheets.google.com/feeds/list/1iUJW05PMXwUzPqiXnv_JTEmSc4QMvSx66tVUKrodttk/od6/public/values?alt=json';
    var json_txt = [];
    var get_json_txt = "";
    var len;
    var x = 0;

    fetch(url).then(res => res.json()).then(lessons => {
        data = lessons['feed']['entry'];

        get_json_txt = data[0]['gsx$info']['$t'];
        len = get_json_txt.length / 50;
        for (i = 0; i < len; i++) {
            json_txt.push(get_json_txt.substr(x, 50));
            x = x + 50;
        }
        console.log(json_txt);
    });
}