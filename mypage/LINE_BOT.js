//程式碼開始

var CHANNEL_ACCESS_TOKEN = "Line Bot 的存取憑證";
var spreadSheetID = "Google 試算表的 ID";
var welcomeTitle = "問卷的說明";
var finishTitle = "問卷結束時的感謝語";

var spreadSheet = SpreadsheetApp.openById(spreadSheetID);
var sheet = spreadSheet.getActiveSheet();
var lastRow = sheet.getLastRow();
var lastColumn = sheet.getLastColumn();
var sheetData = sheet.getSheetValues(1, 1, lastRow, lastColumn);

function doPost(e) {

    var userData = JSON.parse(e.postData.contents);
    console.log(userData);

    // 取出 replayToken 和發送的訊息文字
    var replyToken = userData.events[0].replyToken;
    var clientMessage = userData.events[0].message.text;
    var clientID = userData.events[0].source.userId;
    var QandO = [sheetData[0], sheetData[1]];          //取得題目和選項
    var replyData = getUserAnswer(clientID, clientMessage);
    switch (replyData[1]) {
        case 0:
            var replyMessage = finishTitle;
            break;

        case 2:
            var replyMessage = welcomeTitle + "\n\n" + QandO[0][replyData[1] - 1] + "\n\n" + QandO[1][replyData[1] - 1];
            break;

        default:
            var replyMessage = QandO[0][replyData[1] - 1] + "\n\n" + QandO[1][replyData[1] - 1];
    }

    sendReplyMessage(CHANNEL_ACCESS_TOKEN, replyToken, replyMessage);
}

//傳送訊息給使用者
function sendReplyMessage(CHANNEL_ACCESS_TOKEN, replyToken, replyMessage) {

    UrlFetchApp.fetch("https://api.line.me/v2/bot/message/reply", {
        "headers": {
            "Content-Type": "application/json; charset=UTF-8",
            "Authorization": "Bearer " + CHANNEL_ACCESS_TOKEN,
        },
        "method": "post",
        "payload": JSON.stringify({
            "replyToken": replyToken,
            "messages": [{
                "type": "text",
                "text": replyMessage,
            }],
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
    return returnData;
}
