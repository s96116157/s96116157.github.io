var CHANNEL_ACCESS_TOKEN = '8JjSUlUZ7Yi87GvAvZF/UoZRs7t/lrvKasoiWhprlifhw7fw0xvAvhEsu/AMzT8jRi69ixizLp64dEmrvllbv/u393huonF8ZB6BOfgUvN/dp4winDdBG6kZ+7HwvNvyVFJyMm1uJO5t3nCIK/pTHAdB04t89/1O/w1cDnyilFU=';

function doPost(e) {
    var msg = JSON.parse(e.postData.contents);
    var userType = msg.events[0].type;
    var replyToken = msg.events[0].replyToken;

    if (typeof replyToken === 'undefined') { return; }

    console.log('============ 202011241200 ============');
    console.log(msg.events[0]);

    switch (userType) {
        case 'follow':
            return_txt = get_follow_bubble();
            sendPushMessage(CHANNEL_ACCESS_TOKEN, replyToken, return_txt);
            return;
        case 'unfollow':
            return;
        case 'message':
            userMessage = msg.events[0].message.text;
            switch (userMessage) {
                case 'book':
                    return_txt = get_story(0);
                    sendPushMessage(CHANNEL_ACCESS_TOKEN, replyToken, return_txt);
                    return;
                case 'dark':
                    return_txt = get_story(1);
                    sendPushMessage(CHANNEL_ACCESS_TOKEN, replyToken, return_txt);
                    return;
                case 'Story':
                    return;
                case 'About':
                    return_txt = get_follow_bubble();
                    sendPushMessage(CHANNEL_ACCESS_TOKEN, replyToken, return_txt);
                    return;
                default:
                    return;
            }
            return;
        case 'postback':
            return;
        default:
            return;

    }
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

function get_follow_bubble() {
    var url = 'https://s96116157.github.io/Lisa/sali_boots.jpg';
    var txt = {
        "type": "flex",
        "altText": "about",
        "contents": {
            "type": "bubble",
            "hero": {
                "type": "image",
                "url": url,
                "size": "full",
                "aspectRatio": "20:15",
                "aspectMode": "cover",
                "backgroundColor": "#FFFFFFFF"
            },
            "body": {
                "type": "box",
                "layout": "vertical",
                "backgroundColor": "#75665FFF",
                "contents": [
                    {
                        "type": "text",
                        "text": "Ms. Sali & Mr. Boots",
                        "weight": "bold",
                        "size": "xl",
                        "color": "#FFFFFFFF",
                        "contents": []
                    },
                    {
                        "type": "text",
                        "text": "嗨，很開心我們成為了好友。\n我們是廢物情侶\n他是廢物，我是情侶\n希望廢物星球可以帶給你們一點希望\n\n為了不讓全世界的人變成廢物\n我把所有的廢物能量聚集在一副眼鏡上面，然後我每天都帶著那副\n---「廢物眼鏡」---",
                        "size": "md",
                        "color": "#FFFFFFFF",
                        "wrap": true,
                        "contents": []
                    }
                ]
            },
            "footer": {
                "type": "box",
                "layout": "vertical",
                "flex": 0,
                "spacing": "sm",
                "backgroundColor": "#75665FFF",
                "contents": [
                    {
                        "type": "filler"
                    },
                    {
                        "type": "text",
                        "text": "「點我看更多功能」將會為您服務哦！",
                        "size": "sm",
                        "color": "#FFFFFFFF",
                        "align": "center",
                        "wrap": true,
                        "contents": []
                    }
                ]
            }
        }
    };
    return txt;
}

function get_book_list() {
    var url = 'https://spreadsheets.google.com/feeds/list/1sdoX-WjcqokHZPgVoVdixxF4HHp2GsnB_Ak0ImVXMpc/od6/public/values?alt=json';
    var response = UrlFetchApp.fetch(url);
    var info_txt = JSON.parse(response.getContentText());
    var data = info_txt['feed']['entry'];
}

function get_story(type) {
    var color = ['#F9F3E2FF', '#594136FF'];
    var url = 'https://s96116157.github.io/Lisa/20201119_002.jpg';
    var title = 'LET ME IN !';
    var txt = "不知道怪獸吞下我的時候\n\n會不會噎到\n\n會不會有人用哈姆立克法\n\n把我救出來";

    if (type == 1) {
        color[0] = '#000000FF';
        color[1] = '#FFFFFFFF';
        url = 'https://s96116157.github.io/Lisa/Dark_001_1.jpg';
    }

    var txt = {
        "type": "flex",
        "altText": "Have one's story",
        "contents": {
            "type": "carousel",
            "contents": [
                {
                    "type": "bubble",
                    "hero": {
                        "type": "image",
                        "url": url,
                        "size": "full",
                        "aspectRatio": "40:55",
                        "aspectMode": "cover"
                    }
                },
                {
                    "type": "bubble",
                    "direction": "ltr",
                    "header": {
                        "type": "box",
                        "layout": "vertical",
                        "flex": 0,
                        "backgroundColor": color[0],
                        "contents": [
                            {
                                "type": "text",
                                "text": title,
                                "weight": "bold",
                                "size": "xl",
                                "color": color[1],
                                "align": "center",
                                "contents": []
                            }
                        ]
                    },
                    "body": {
                        "type": "box",
                        "layout": "vertical",
                        "backgroundColor": color[0],
                        "contents": [
                            {
                                "type": "text",
                                "text": txt,
                                "size": "md",
                                "color": color[1],
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
    return txt;
}