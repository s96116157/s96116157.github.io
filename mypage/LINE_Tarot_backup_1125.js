var CHANNEL_ACCESS_TOKEN = 'xfJIhufP7KTjewU+xrnIWGwp3XgzyjF6xFeGINWB6KqHuPv1n4uUU5469qY1Ns//ABvsNjB9jPKRZdkxBNuMQ+Y97s45SNLohg3NFV+Kyss2/0WZMmr7o7jEaOOgy4BR0PGISg3whXgBSogFawCKgwdB04t89/1O/w1cDnyilFU=';

function doPost(e) {
    var msg = JSON.parse(e.postData.contents);
    var userId = msg.events[0].source.userId;
    var userType = msg.events[0].type;
    var replyToken = msg.events[0].replyToken;
    var return_txt = '';
    var userMessage = '';

    if (typeof replyToken === 'undefined') { return; }

    console.log('============ 202011251100 ============');
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
                //mon_re_bubble_txt(0);
                sendPushMessage(CHANNEL_ACCESS_TOKEN, replyToken, mon_re_bubble_txt(userId, 1));
                return;
            }

            return;
        case 'postback':
            userMessage = msg.events[0].postback.data;
            if (userMessage.indexOf('m_') != -1) {
                var x = userMessage.charAt(2);
                userMessage = userMessage.substr(0, 2);
            }

            switch (userMessage) {
                case 'tarot_day':
                    sendPushMessage(CHANNEL_ACCESS_TOKEN, replyToken, mon_re_bubble_txt(userId, 0));
                    return;
                case 'tarot_month':
                    sendPushMessage(CHANNEL_ACCESS_TOKEN, replyToken, speed_tarot_month());
                    return;
                case 'm_':
                    sendPushMessage(CHANNEL_ACCESS_TOKEN, replyToken, m_bubble_txt(x));
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
    for (var i = 0; i < 4; i++) {
        var url_txt = 'https://s96116157.github.io/image/' + returnData[i] + '.jpg';
        return_txt['contents']['contents'][i]["body"]["contents"][0]["url"] = url_txt;
    }
    return return_txt;
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
                returnData.push(sheetData[i][1]);
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
    var url = 'https://spreadsheets.google.com/feeds/list/1iUJW05PMXwUzPqiXnv_JTEmSc4QMvSx66tVUKrodttk/od6/public/values?alt=json';
    var response = UrlFetchApp.fetch(url);
    var info_txt = JSON.parse(response.getContentText());
    var data = info_txt['feed']['entry'];
    var len = data.length;
    var json_txt = {
        "type": "flex",
        "altText": "this is a flex message",
        "contents": { "type": "carousel", "contents": [] }
    };

    for (var i = 0; i < len; i++) {
        json_txt["contents"]["contents"].push(mon_bubble_txt(data[i]['gsx$clink']['$t'], i));
    }
    return json_txt;
}

function mon_bubble_txt(url, data) {
    url = 'https://s96116157.github.io/image/' + url + '.jpg';
    data = "m_" + data.toString();
    var txt = {
        "type": "bubble",
        "size": "micro",
        "body": {
            "type": "box",
            "layout": "vertical",
            "paddingAll": "0px",
            "backgroundColor": "#A79486FF",
            "contents": [
                {
                    "type": "image",
                    "url": url,
                    "size": "full",
                    "aspectRatio": "40:57",
                    "aspectMode": "cover"
                },
                {
                    "type": "box",
                    "layout": "vertical",
                    "offsetBottom": "0px",
                    "offsetStart": "0px",
                    "offsetEnd": "0px",
                    "paddingAll": "10px",
                    "backgroundColor": "#00000070",
                    "contents": [
                        {
                            "type": "box",
                            "layout": "vertical",
                            "height": "40px",
                            "borderWidth": "1px",
                            "borderColor": "#FFFFFFFF",
                            "cornerRadius": "5px",
                            "contents": [
                                {
                                    "type": "button",
                                    "action": {
                                        "type": "postback",
                                        "label": "選擇",
                                        "data": data
                                    },
                                    "color": "#FFFFFF00",
                                    "height": "sm",
                                    "style": "primary",
                                    "gravity": "bottom"
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    }
    return txt;
}

function mon_re_bubble_txt(_userID, type) {
    _userID = _userID.substr(_userID.length - 2, 2);
    var id = parseInt(_userID, 16);
    var dd = parseInt(Utilities.formatDate(new Date(), "GMT+8", "dd"), 10);

    //var url = 'https://spreadsheets.google.com/feeds/list/1iUJW05PMXwUzPqiXnv_JTEmSc4QMvSx66tVUKrodttk/od6/public/values?alt=json';    
    var url = 'https://spreadsheets.google.com/feeds/list/1sdoX-WjcqokHZPgVoVdixxF4HHp2GsnB_Ak0ImVXMpc/od6/public/values?alt=json';
    var response = UrlFetchApp.fetch(url);
    var info_txt = JSON.parse(response.getContentText());
    var data = info_txt['feed']['entry'];
    var re = (id + dd) % data.length;
    if (type == 1) {
        re = data.length - 1;
    }
    var img_url = data[re]['gsx$dlink']['$t'];

    var txt = {
        "type": "flex",
        "altText": "this is a flex message",
        "contents": {
            "type": "carousel",
            "contents": [
                {
                    "type": "bubble",
                    "hero": {
                        "type": "image",
                        "url": "https://s96116157.github.io/image/" + img_url + ".jpg",
                        "size": "full",
                        "aspectRatio": "40:50",
                        "aspectMode": "cover",
                        "backgroundColor": "#FFFFFFFF"
                    },
                    "body": {
                        "type": "box",
                        "layout": "vertical",
                        "backgroundColor": "#A79486FF",
                        "contents": [
                            {
                                "type": "text",
                                "text": "當日指引",
                                "weight": "bold",
                                "size": "xl",
                                "color": "#FFFFFFFF",
                                "align": "center",
                                "contents": []
                            }
                        ]
                    },
                    "footer": {
                        "type": "box",
                        "layout": "vertical",
                        "flex": 0,
                        "spacing": "sm",
                        "backgroundColor": "#A79486FF",
                        "contents": [
                            {
                                "type": "filler"
                            },
                            {
                                "type": "text",
                                "text": "輸入「塔羅」或點選下方\n「點我看更多功能」將會為您服務哦！",
                                "size": "sm",
                                "color": "#FFFFFFFF",
                                "align": "center",
                                "wrap": true,
                                "contents": []
                            }
                        ]
                    }
                }
            ]

        }
    }

    var json_txt = [];
    var get_json_txt = data[re]['gsx$info']['$t'];
    console.log(get_json_txt.length);
    json_txt = data[re]['gsx$array']['$t'].split(",");
    var len = json_txt.length;
    var x = 0;

    for (i = 0; i < len; i++) {
        var o = get_json_txt.substr(x, parseInt(json_txt[i], 10) - x + 1);
        txt['contents']['contents'].push(bubble_txt(o));
        x = parseInt(json_txt[i], 10) + 1;
    }
    return txt;
}

function bubble_txt(txt) {
    var bubble = {
        "type": "bubble",
        "body": {
            "type": "box",
            "layout": "vertical",
            "backgroundColor": "#A79486FF",
            "contents": [
                {
                    "type": "text",
                    "text": txt,
                    "size": "md",
                    "color": "#FFFFFFFF",
                    "wrap": true,
                    "contents": []
                }
            ]
        }
    }
    return bubble;
}

function m_bubble_txt(type) {
    type = parseInt(type);
    var id = '1iUJW05PMXwUzPqiXnv_JTEmSc4QMvSx66tVUKrodttk';
    var url = 'https://spreadsheets.google.com/feeds/list/' + id + '/od6/public/values?alt=json';
    var response = UrlFetchApp.fetch(url);
    var info_txt = JSON.parse(response.getContentText());
    var data = info_txt['feed']['entry'];

    url = 'https://s96116157.github.io/image/' + data[type]['gsx$mlink']['$t'] + '.jpg';
    var txt = data[type]['gsx$info']['$t'];
    var array = txt.split("+");
    var len = array.length;

    var bubble = {
        "type": "flex",
        "altText": "Have One's Month Tarot",
        "contents": {
            "type": "carousel",
            "contents": [
                {
                    "type": "bubble",
                    "hero": {
                        "type": "image",
                        "url": url,
                        "size": "full",
                        "aspectRatio": "4:3",
                        "aspectMode": "cover"
                    },
                    "body": {
                        "type": "box",
                        "layout": "vertical",
                        "backgroundColor": "#A79486FF",
                        "contents": [
                            {
                                "type": "text",
                                "text": "\n每月運勢\n",
                                "weight": "bold",
                                "size": "xl",
                                "color": "#FFFFFFFF",
                                "align": "center",
                                "contents": []
                            }
                        ]
                    },
                    "footer": {
                        "type": "box",
                        "layout": "vertical",
                        "flex": 0,
                        "spacing": "sm",
                        "backgroundColor": "#A79486FF",
                        "contents": [
                            {
                                "type": "filler"
                            },
                            {
                                "type": "text",
                                "text": "輸入「塔羅」或點選下方\n「點我看更多功能」將會為您服務哦！",
                                "size": "sm",
                                "color": "#FFFFFFFF",
                                "align": "center",
                                "wrap": true,
                                "contents": []
                            }
                        ]
                    }
                }
            ]
        }
    };

    for (var i = 0; i < len; i++) {
        bubble["contents"]["contents"].push(get_story_bubble(array[i]));
    }

    return bubble;
}

function get_story_bubble(txt) {
    var bubble = {
        "type": "bubble",
        "body": {
            "type": "box",
            "layout": "vertical",
            "backgroundColor": "#A79486FF",
            "contents": [
                {
                    "type": "text",
                    "text": txt,
                    "size": "sm",
                    "color": "#FFFFFFFF",
                    "wrap": true,
                    "contents": []
                }
            ]
        }
    }
    return bubble;
}