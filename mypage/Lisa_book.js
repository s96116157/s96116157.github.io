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
                case 'Story':
                    return_txt = get_book_list();
                    sendPushMessage(CHANNEL_ACCESS_TOKEN, replyToken, return_txt);
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
            userMessage = msg.events[0].postback.data;
            return_txt = get_story(userMessage);
            sendPushMessage(CHANNEL_ACCESS_TOKEN, replyToken, return_txt);
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
                        "align": "center",
                        "contents": []
                    },
                    {
                        "type": "text",
                        "text": "\n嗨，我們是居住在廢物星球上的廢物情侶\n希望廢物星球可以帶給你們一些希望\n為了不讓全世界的人變成廢物\nSali 把所有的廢物能量聚集在一副眼鏡上\n而由 Boots 戴著那一副\n\n---「廢物眼鏡」---\n\n讓全世界的人不會因為廢物能量\n而變成廢物",
                        "size": "sm",
                        "color": "#FFFFFFFF",
                        "align": "center",
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
    var id = '1Dnn5iusu0Y8qinBLgn5xNptyFEG06ZkRlF4snbPSVzs';
    var url = 'https://spreadsheets.google.com/feeds/list/' + id + '/od6/public/values?alt=json';
    var response = UrlFetchApp.fetch(url);
    var info_txt = JSON.parse(response.getContentText());
    var data = info_txt['feed']['entry'];
    var len = data.length;
    var txt = {
        "type": "flex",
        "altText": "Choose Your Story.",
        "contents": { "type": "carousel", "contents": [] }
    }

    for (var i = 0; i < len; i++) {
        txt["contents"]["contents"].push(get_card_bubble(data[i]['gsx$id']['$t'], i));
    }

    return txt;
}

function get_story(type) {
    type = parseInt(type);
    var id = '1Dnn5iusu0Y8qinBLgn5xNptyFEG06ZkRlF4snbPSVzs';
    var url = 'https://spreadsheets.google.com/feeds/list/' + id + '/od6/public/values?alt=json';
    var response = UrlFetchApp.fetch(url);
    var info_txt = JSON.parse(response.getContentText());
    var data = info_txt['feed']['entry'];

    url = 'https://s96116157.github.io/Lisa/' + data[type]['gsx$id']['$t'] + '.jpg';
    var title = data[type]['gsx$title']['$t'];
    var txt = data[type]['gsx$txt']['$t'];
    var array = data[type]['gsx$array']['$t'].split(",");
    var len = array.length;
    var x = 0;
    console.log(txt.length);

    if (len > 1) {
        var t = txt;
        txt = t.substr(x, parseInt(array[0]) - x + 1);
        x = parseInt(array[0]) + 1;
    };

    var bubble = {
        "type": "flex",
        "altText": "Have One's Story",
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
                }, {
                    "type": "bubble",
                    "direction": "ltr",
                    "header": {
                        "type": "box",
                        "layout": "vertical",
                        "flex": 0,
                        "backgroundColor": "#F9F3E2FF",
                        "contents": [
                            {
                                "type": "text",
                                "text": title,
                                "weight": "bold",
                                "size": "xl",
                                "color": "#594136FF",
                                "align": "center",
                                "contents": []
                            }
                        ]
                    },
                    "body": {
                        "type": "box",
                        "layout": "vertical",
                        "backgroundColor": "#F9F3E2FF",
                        "contents": [
                            {
                                "type": "text",
                                "text": txt,
                                "size": "md",
                                "color": "#594136FF",
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

    if (len > 1) {
        for (var i = 1; i < len; i++) {
            txt = t.substr(x, parseInt(array[i]) - x + 1);
            x = parseInt(array[i]) + 1;
            bubble["contents"]["contents"].push(get_story_bubble(txt));
        }
    };

    return bubble;
}

function get_card_bubble(url, data) {
    url = 'https://s96116157.github.io/Lisa/' + url + '.jpg';
    data = data.toString();
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
                    "aspectRatio": "40:55",
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
                                    "action": { "type": "postback", "label": "閱讀", "data": data },
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

function get_story_bubble(txt) {
    var bubble = {
        "type": "bubble",
        "body": {
            "type": "box",
            "layout": "vertical",
            "backgroundColor": "#F9F3E2FF",
            "contents": [
                {
                    "type": "text",
                    "text": txt,
                    "size": "md",
                    "color": "#594136FF",
                    "align": "center",
                    "wrap": true,
                    "contents": []
                }
            ]
        }
    }
    return bubble;
}