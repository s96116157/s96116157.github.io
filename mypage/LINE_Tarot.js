var CHANNEL_ACCESS_TOKEN = 'xfJIhufP7KTjewU+xrnIWGwp3XgzyjF6xFeGINWB6KqHuPv1n4uUU5469qY1Ns//ABvsNjB9jPKRZdkxBNuMQ+Y97s45SNLohg3NFV+Kyss2/0WZMmr7o7jEaOOgy4BR0PGISg3whXgBSogFawCKgwdB04t89/1O/w1cDnyilFU=';
var aUrl = "https://s96116157.github.io/js/json/LINE_BOT.json";
var response = UrlFetchApp.fetch(aUrl); // get feed
var json_txt = JSON.parse(response.getContentText()); //

//=======================================================================
var spreadSheetID = "1X5Mtln-MYBhyBRn0RveNOXCkb32A4VTzht1AIGkNvdU";
var spreadSheet = SpreadsheetApp.openById(spreadSheetID);
var sheet = spreadSheet.getActiveSheet();
var lastRow = sheet.getLastRow();
var lastColumn = sheet.getLastColumn();
var sheetData = sheet.getSheetValues(1, 1, lastRow, lastColumn);
//=======================================================================

var txt_3 = {};

function doPost(e) {
    var msg = JSON.parse(e.postData.contents);
    var clientID = msg.events[0].source.userId;
    var return_txt = '';
    var userMessage = '';
    console.log('============ msg.events[0] ============');
    console.log(msg.events[0]);
    var replyToken = msg.events[0].replyToken;
    if (typeof replyToken === 'undefined') {
        return;
    }
    var userType = msg.events[0].type;
    getUserAnswer(clientID, '');
    switch (userType) {
        case 'follow':
            sendReplyMessage(CHANNEL_ACCESS_TOKEN, replyToken, json_txt[0], json_txt[1]);
        case 'unfollow':
            return;
        case 'message':
            userMessage = msg.events[0].message.text;
            if (userMessage.indexOf('塔羅') != -1) {
                return_txt = json_txt[3];
                //return_txt = txt_3;
                sendPushMessage(CHANNEL_ACCESS_TOKEN, replyToken, return_txt);
            }
            else {
                return_txt = json_txt[1];
                sendReplyMessage(CHANNEL_ACCESS_TOKEN, replyToken, return_txt, '');
            }
            return;
        case 'postback':
            userMessage = msg.events[0].postback.data;
            if (userMessage.indexOf('占卜') != -1) {
                var num = getRandom(0, 9);
                return_txt = {
                    "type": "image",
                    "originalContentUrl": "https://s96116157.github.io/image/A_00" + num + ".png",
                    "previewImageUrl": "https://s96116157.github.io/image/A_00" + num + ".png"
                };

                response = UrlFetchApp.fetch('https://s96116157.github.io/js/json/LINE_bubble.json');
                //response = UrlFetchApp.fetch('https://s96116157.github.io/js/json/info.json'); // get feed
                var info_txt = JSON.parse(response.getContentText()); //
                //var txt_2 = { "type": "text", "text": info_txt['info'][0]['txt'] };
                //console.log('============== info_txt =================');
                //console.log(info_txt);

                //sendReplyMessage(CHANNEL_ACCESS_TOKEN, replyToken, return_txt, txt_2)
                sendPushMessage(CHANNEL_ACCESS_TOKEN, replyToken, info_txt);
            }
            return;
    }

    console.log('============== END =================');
    //==========================================================================================
    //sendReplyMessage(CHANNEL_ACCESS_TOKEN, replyToken, return_txt);
    //==========================================================================================
}

//傳送訊息給使用者
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

//判斷使用者回答到第幾題
function getUserAnswer(clientID, clientMessage) {

    var returnData = [];
    for (var i = lastRow - 1; i >= 0; i--) {
        if (sheetData[i][0] == clientID && sheetData[i][lastColumn - 1] == "") {
            for (var j = 1; j <= lastColumn - 1; j++) {
                if (sheetData[i][j] == "") { break; }
            }
            sheet.getRange(i + 1, j + 1).setValue(clientMessage);
            //如果使用者已經回答了最後一題，就把完成時間填上。不然就送出下一題給使用者
            if (j + 2 == lastColumn) {
                sheet.getRange(i + 1, lastColumn).setValue(Date());
                returnData = [i + 1, 0];
            }
            else {
                returnData = [i + 1, j + 2];
            }
            return returnData;
            break;
        }
    }
    //如果使用者還沒有回答過任何資料，就新增加一列在最後，把使用者ID輸入並開始送出題目
    sheet.insertRowAfter(lastRow);
    sheet.getRange(lastRow + 1, 1).setValue(clientID);
    returnData = [lastRow + 1, 2];
    console.log('=================== returnData ==================');
    console.log(returnData);
    return returnData;
}

//產生min到max之間的亂數
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};