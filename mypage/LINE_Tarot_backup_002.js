var CHANNEL_ACCESS_TOKEN = 'xfJIhufP7KTjewU+xrnIWGwp3XgzyjF6xFeGINWB6KqHuPv1n4uUU5469qY1Ns//ABvsNjB9jPKRZdkxBNuMQ+Y97s45SNLohg3NFV+Kyss2/0WZMmr7o7jEaOOgy4BR0PGISg3whXgBSogFawCKgwdB04t89/1O/w1cDnyilFU=';

function doPost(e) {
    var msg = JSON.parse(e.postData.contents);
    var userId = msg.events[0].source.userId;
    var userType = msg.events[0].type;
    var replyToken = msg.events[0].replyToken;
    var return_txt = '';
    var userMessage = '';

    if (typeof replyToken === 'undefined') { return; }

    console.log('============ 202010312210 ============');
    console.log(msg.events[0]);

    switch (userType) {
        case 'follow':
            return_txt = getJson(0);
            sendPushMessage(CHANNEL_ACCESS_TOKEN, replyToken, return_txt);
            return;
        case 'unfollow':
            return;
        case 'message':
            userMessage = msg.events[0].message.text;
            if (userMessage.indexOf('塔羅') != -1) {
                return_txt = getJson(1);
                sendPushMessage(CHANNEL_ACCESS_TOKEN, replyToken, return_txt);
            }

            if (userMessage.indexOf('test') != -1) {
                sendPushMessage(CHANNEL_ACCESS_TOKEN, replyToken, speed_tarot_month());
                return;
            }

            return;
        case 'postback':
            userMessage = msg.events[0].postback.data;
            if (userMessage.indexOf('m_') != -1) {
                ;
                var x = userMessage.charAt(2);
                userMessage = userMessage.substr(0, 2);
            }

            switch (userMessage) {
                case 'tarot_day':
                    var returnData = get_info(0, '');
                    return_txt = getJson(2);
                    return_txt['contents']['hero']['url'] = 'https://s96116157.github.io/image/' + returnData[0] + '.jpg';
                    return_txt['contents']['body']['contents'][1]['text'] = returnData[1];
                    sendPushMessage(CHANNEL_ACCESS_TOKEN, replyToken, return_txt);
                    return;
                case 'tarot_month':
                    sendPushMessage(CHANNEL_ACCESS_TOKEN, replyToken, tarot_month());
                    return;
                case 'm_':
                    var returnData = get_info(2, x);
                    return_txt = getJson(2);
                    return_txt['contents']['hero']['url'] = 'https://s96116157.github.io/image/' + returnData[0] + '.jpg';
                    return_txt['contents']['hero']['aspectRatio'] = '1:1';
                    return_txt['contents']['body']['contents'][0]['text'] = '每月運勢';
                    return_txt['contents']['body']['contents'][1]['text'] = returnData[1];
                    sendPushMessage(CHANNEL_ACCESS_TOKEN, replyToken, return_txt);
                    return;
            }
            return;
        default:
            return;
    }
}

function tarot_month() {
    var returnData = get_info(1, '');
    var return_txt = getJson(3);
    var array_ = [4];

    for (var i = 0; i < 4; i++) {
        array_[i] = return_txt;
    }

    var x = { "type": "flex", "altText": "this is a flex message", "contents": { "type": "carousel", "contents": {} } };
    x['contents']['contents'] = array_;
    x = JSON.stringify(x);
    x = JSON.parse(x);

    for (var i = 0; i < 4; i++) {
        var url_txt = 'https://s96116157.github.io/image/' + returnData[i] + '.jpg';
        var data_txt = "m_" + i.toString();
        x['contents']['contents'][i]["body"]["contents"][0]["url"] = url_txt;
        x['contents']['contents'][i]["body"]["contents"][1]["contents"][0]["contents"][0]["action"]["data"] = data_txt;
    }
    return x;
}

function getJson(num) {
    // 0 = 追隨好友, 1 = 選擇想要的占卜項目
    var response = UrlFetchApp.fetch('https://s96116157.github.io/js/json/LINE_bubble.json');
    var info_txt = JSON.parse(response.getContentText());
    return info_txt[num];
}

function sendPushMessage(CHANNEL_ACCESS_TOKEN, replyToken, msg) {
    var url = 'https://api.line.me/v2/bot/message/reply';
    UrlFetchApp.fetch(url, {
        "headers": {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + CHANNEL_ACCESS_TOKEN,
        },
        "method": "post",
        "payload": JSON.stringify({
            "replyToken": replyToken,
            "messages": [msg],
        }),
    });
}

function get_info(type, select) {
    //=======================================================================
    if (type == 0) {
        var spreadSheetID = "1sdoX-WjcqokHZPgVoVdixxF4HHp2GsnB_Ak0ImVXMpc"; //LINEBOT_USER
    } else if (type == 1 || type == 2) {
        var spreadSheetID = "1iUJW05PMXwUzPqiXnv_JTEmSc4QMvSx66tVUKrodttk"; //LINEBOT_tarot_month
    }
    var spreadSheet = SpreadsheetApp.openById(spreadSheetID);
    var sheet = spreadSheet.getActiveSheet();
    var lastRow = sheet.getLastRow();
    var lastColumn = sheet.getLastColumn();
    var sheetData = sheet.getSheetValues(1, 1, lastRow, lastColumn);
    //=======================================================================
    var returnData = [];
    //=======================================================================

    switch (type) {
        case 0:
            var num = getRandom(0, lastRow - 1);
            returnData.push(sheetData[num][0]);
            returnData.push(sheetData[num][1]);
            return returnData;
        case 1:
            for (var i = 0; i < 4; i++) {
                returnData.push(sheetData[i][0]);
            }
            return returnData;
        case 2:
            returnData.push(sheetData[+select][1]);
            returnData.push(sheetData[+select][2]);
            return returnData;
    }
}

//產生min到max之間的亂數
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};



//==============================================================


function speed_tarot_month() {
    var json_txt = ['c_202009_001', 'c_202009_002', 'c_202009_003', 'c_202009_004'];
    var returnData = json_txt;
    var return_txt = getJson(3);
    var array_ = [4];

    for (var i = 0; i < 4; i++) {
        array_[i] = return_txt;
    }

    var x = { "type": "flex", "altText": "this is a flex message", "contents": { "type": "carousel", "contents": {} } };
    x['contents']['contents'] = array_;
    x = JSON.stringify(x);
    x = JSON.parse(x);

    for (var i = 0; i < 4; i++) {
        var url_txt = 'https://s96116157.github.io/image/' + returnData[i] + '.jpg';
        var data_txt = "m_" + i.toString();
        x['contents']['contents'][i]["body"]["contents"][0]["url"] = url_txt;
        x['contents']['contents'][i]["body"]["contents"][1]["contents"][0]["contents"][0]["action"]["data"] = data_txt;
    }
    return x;
}