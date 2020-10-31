var CHANNEL_ACCESS_TOKEN = 'xfJIhufP7KTjewU+xrnIWGwp3XgzyjF6xFeGINWB6KqHuPv1n4uUU5469qY1Ns//ABvsNjB9jPKRZdkxBNuMQ+Y97s45SNLohg3NFV+Kyss2/0WZMmr7o7jEaOOgy4BR0PGISg3whXgBSogFawCKgwdB04t89/1O/w1cDnyilFU=';
var aUrl = "https://s96116157.github.io/js/json/LINE_BOT.json";
var response = UrlFetchApp.fetch(aUrl); // get feed
var json_txt = JSON.parse(response.getContentText()); //

var txt_3 = {};

function doPost(e) {
    var msg = JSON.parse(e.postData.contents);
    var clientID = msg.events[0].source.userId;
    var return_txt = '';
    var userMessage = '';
    console.log('============ 202010311145 ============');
    console.log(msg.events[0]);
    var replyToken = msg.events[0].replyToken;
    if (typeof replyToken === 'undefined') {
        return;
    }
    var userType = msg.events[0].type;
    switch (userType) {
        case 'follow':
            return_txt = getJson(0);
            getUserAnswer(clientID, 0);
            sendPushMessage(CHANNEL_ACCESS_TOKEN, replyToken, return_txt);
            return;
        case 'unfollow':
            return;
        case 'message':
            userMessage = msg.events[0].message.text;
            if (userMessage.indexOf('塔羅') != -1) {
                var num = getUserAnswer(clientID, 1);
                if (num != 0) {
                    return_txt = json_txt[3];
                    sendPushMessage(CHANNEL_ACCESS_TOKEN, replyToken, return_txt);
                    console.log('============== num != 0 =================');
                } else {
                    return_txt = getJson(2);
                    sendPushMessage(CHANNEL_ACCESS_TOKEN, replyToken, return_txt);
                    console.log('============== num == 0 =================');
                }
            }
            else {
                //return_txt = json_txt[1];
                //sendReplyMessage(CHANNEL_ACCESS_TOKEN, replyToken, return_txt, '');
            }
            return;
        case 'postback':
            var num = getUserAnswer(clientID, 2);
            if (num != 0) {
                userMessage = msg.events[0].postback.data;
                if (userMessage.indexOf('占卜') != -1) {
                    var num = getRandom(0, 9);
                    return_txt = {
                        "type": "image",
                        "originalContentUrl": "https://s96116157.github.io/image/A_00" + num + ".png",
                        "previewImageUrl": "https://s96116157.github.io/image/A_00" + num + ".png"
                    };
                    return_txt = getJson(1);
                    getUserAnswer(clientID, 7);
                    sendPushMessage(CHANNEL_ACCESS_TOKEN, replyToken, return_txt);
                }
                return;
            } else {
                return_txt = getJson(2);
                sendPushMessage(CHANNEL_ACCESS_TOKEN, replyToken, return_txt);
                console.log('============== num == 0 =================');
            }
    }
    console.log('============== END =================');
}

function sendReplyMessage(CHANNEL_ACCESS_TOKEN, replyToken, txt_1, txt_2) {
    if (txt_2 == '') {
        var msg = [txt_1];
    } else {
        var msg = [txt_1, txt_2];
    }
    var url = 'https://api.line.me/v2/bot/message/reply';
    UrlFetchApp.fetch(url, {
        "headers": {
            "Content-Type": "application/json; charset=UTF-8",
            "Authorization": "Bearer " + CHANNEL_ACCESS_TOKEN,
        },
        "method": "post",
        "payload": JSON.stringify({
            "replyToken": replyToken,
            "messages": msg,
        }),
    });
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

function getUserAnswer(clientID, type) {
    //=======================================================================
    var spreadSheetID = "1sdoX-WjcqokHZPgVoVdixxF4HHp2GsnB_Ak0ImVXMpc"; //LINEBOT_USER
    var spreadSheet = SpreadsheetApp.openById(spreadSheetID);
    var sheet = spreadSheet.getActiveSheet();
    var lastRow = sheet.getLastRow();
    var lastColumn = sheet.getLastColumn();
    var sheetData = sheet.getSheetValues(1, 1, lastRow, lastColumn);
    //=======================================================================
    var time = Utilities.formatDate(new Date(), "GMT+8", "yyyy-MM-dd HH:mm:ss");
    var returnData = [];

    for (var i = lastRow - 1; i >= 0; i--) {
        // ============= 如果有找到 ID ===============
        if (sheetData[i][0] == clientID) {
            if (type == 0) {
                sheet.getRange(i + 1, 2).setValue(0);
                sheet.getRange(i + 1, 5).setValue(time);
                return;
            }
            else {
                returnData = sheetData[i][1];
                console.log(returnData);
                return returnData;
            }
        }
    }

    // ============= 如果沒找到 ID ===============
    sheet.insertRowAfter(lastRow);
    sheet.getRange(lastRow + 1, 1).setValue(clientID);
    sheet.getRange(lastRow + 1, 2).setValue(0);
    sheet.getRange(lastRow + 1, 5).setValue(time);
    return 0;
}

function getJson(i) {
    // 0 = follow
    var response = UrlFetchApp.fetch('https://s96116157.github.io/js/json/LINE_bubble.json'); // 外框 JSON
    var info_txt = JSON.parse(response.getContentText()); //
    if (i == 1) {
        for (var num = 0; num < 0; num++) {
            info_txt[1]['contents']['contents'][2]['hero']['url'] = 'https://s96116157.github.io/image/A_001.png';
        }
    }
    //console.log(info_txt[1]['contents']['contents'][0]['hero']['url']);
    return info_txt[i];
}

//產生min到max之間的亂數
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};