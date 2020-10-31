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
            return;
        case 'postback':
            userMessage = msg.events[0].postback.data;
            switch (userMessage) {
                case 'tarot_day':
                    var returnData = get_info();
                    return_txt = getJson(2);
                    return_txt['contents']['hero']['url'] = 'https://s96116157.github.io/image/' + returnData[0] + '.jpg';
                    return_txt['contents']['body']['contents'][1]['text'] = returnData[1];
                    sendPushMessage(CHANNEL_ACCESS_TOKEN, replyToken, return_txt);
                    return;
                case 'tarot_month':
                    var returnData = get_info();
                    return;
            }
            return;
        default:
            return;
    }
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

function get_info() {
    //=======================================================================
    var spreadSheetID = "1sdoX-WjcqokHZPgVoVdixxF4HHp2GsnB_Ak0ImVXMpc"; //LINEBOT_USER
    var spreadSheet = SpreadsheetApp.openById(spreadSheetID);
    var sheet = spreadSheet.getActiveSheet();
    var lastRow = sheet.getLastRow();
    var lastColumn = sheet.getLastColumn();
    var sheetData = sheet.getSheetValues(1, 1, lastRow, lastColumn);
    //=======================================================================
    var returnData = [];
    var num = getRandom(0, lastRow - 1);
    //=======================================================================
    returnData.push(sheetData[num][0]);
    returnData.push(sheetData[num][1]);
    return returnData;
}

//產生min到max之間的亂數
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};