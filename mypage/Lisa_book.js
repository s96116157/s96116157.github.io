var CHANNEL_ACCESS_TOKEN = '8JjSUlUZ7Yi87GvAvZF/UoZRs7t/lrvKasoiWhprlifhw7fw0xvAvhEsu/AMzT8jRi69ixizLp64dEmrvllbv/u393huonF8ZB6BOfgUvN/dp4winDdBG6kZ+7HwvNvyVFJyMm1uJO5t3nCIK/pTHAdB04t89/1O/w1cDnyilFU=';

function doPost(e) {
    var msg = JSON.parse(e.postData.contents);
    var userType = msg.events[0].type;
    var replyToken = msg.events[0].replyToken;

    if (typeof replyToken === 'undefined') { return; }

    console.log('============ 202011181550 ============');
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
                case 'dark':
                    return_txt = get_story(1);
                    sendPushMessage(CHANNEL_ACCESS_TOKEN, replyToken, return_txt);
                    return;
                case 'book':
                    return_txt = get_story(0);
                    sendPushMessage(CHANNEL_ACCESS_TOKEN, replyToken, return_txt);
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
    var url = 'https://scontent.ftpe7-2.fna.fbcdn.net/v/t31.0-8/460837_281453208617694_470224812_o.jpg?_nc_cat=109&ccb=2&_nc_sid=de6eea&_nc_ohc=ajR8OvwytxIAX8tAg6b&_nc_ht=scontent.ftpe7-2.fna&oh=d3ab36cd41a7c2112157572bfe7c655f&oe=5FD94BE0';
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
                "backgroundColor": "#535557FF",
                "contents": [
                    {
                        "type": "text",
                        "text": "Hi. 我是 Clio",
                        "weight": "bold",
                        "size": "xl",
                        "color": "#FFFFFFFF",
                        "contents": []
                    },
                    {
                        "type": "text",
                        "text": "很開心我們成為了好友！\n自然塔羅是以牌卡占卜和大家分享：人生哲學、心靈成長、運勢解析\n沒有個人占卜、收費服務\n除了塔羅和閒聊以外，偶爾會天降趣味小測驗，單純想和大家分享塔羅的有趣，一起開心互動。",
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
                "backgroundColor": "#535557FF",
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