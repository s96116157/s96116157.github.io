async function sendShare() {
    var icon = ['icon_face', 'icon_ararm', 'icon_eat'];
    var select = {
        "type": "flex",
        "altText": "Menu",
        "contents": {
            "type": "bubble",
            "body": {
                "type": "box",
                "layout": "vertical",
                "paddingAll": "0px",
                "backgroundColor": "#126E9DFF",
                "contents": [
                    {
                        "type": "image",
                        "url": "https://s96116157.github.io/LINEBot/ROBOT_002.jpg",
                        "size": "full",
                        "aspectRatio": "2:3",
                        "aspectMode": "cover"
                    },
                    {
                        "type": "image",
                        "url": "https://s96116157.github.io/LINEBot/" + icon[0] + ".png",
                        "size": "xs",
                        "position": "absolute",
                        "offsetTop": "25px",
                        "offsetStart": "210px"
                    },
                    {
                        "type": "box",
                        "layout": "vertical",
                        "position": "absolute",
                        "offsetBottom": "0px",
                        "offsetStart": "0px",
                        "offsetEnd": "0px",
                        "paddingAll": "30px",
                        "backgroundColor": "#00000050",
                        "contents": []
                    }
                ]
            }
        }
    }

    var menu = {
        "type": "box",
        "layout": "vertical",
        "offsetBottom": "15px",
        "contents": [
            {
                "type": "text",
                "text": "請選擇您想要使用的功能",
                "color": "#FFFFFF",
                "align": "center",
                "wrap": true,
                "contents": []
            }
        ]
    }

    select['contents']['body']['contents'][2]['contents'].push(menu);


    var flex = {
        "type": "flex",
        "altText": "Menu",
        "contents": {
            "type": "carousel",
            "contents": []
        }
    }

    var bubble = {
        "type": "bubble",
        "hero": {
            "type": "image",
            "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_1_cafe.png",
            "size": "full",
            "aspectRatio": "20:13",
            "aspectMode": "cover",
            "action": {
                "type": "uri",
                "label": "Line",
                "uri": "https://linecorp.com/"
            }
        },
        "body": {
            "type": "box",
            "layout": "vertical",
            "contents": [
                {
                    "type": "text",
                    "text": "Brown Cafe",
                    "weight": "bold",
                    "size": "xl",
                    "contents": []
                },
                {
                    "type": "box",
                    "layout": "baseline",
                    "margin": "md",
                    "contents": [
                        {
                            "type": "icon",
                            "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png",
                            "size": "sm"
                        },
                        {
                            "type": "icon",
                            "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png",
                            "size": "sm"
                        },
                        {
                            "type": "icon",
                            "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png",
                            "size": "sm"
                        },
                        {
                            "type": "icon",
                            "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png",
                            "size": "sm"
                        },
                        {
                            "type": "icon",
                            "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gray_star_28.png",
                            "size": "sm"
                        },
                        {
                            "type": "text",
                            "text": "4.0",
                            "size": "sm",
                            "color": "#999999",
                            "flex": 0,
                            "margin": "md",
                            "contents": []
                        }
                    ]
                },
                {
                    "type": "box",
                    "layout": "vertical",
                    "spacing": "sm",
                    "margin": "lg",
                    "contents": [
                        {
                            "type": "box",
                            "layout": "baseline",
                            "spacing": "sm",
                            "contents": [
                                {
                                    "type": "text",
                                    "text": "Place",
                                    "size": "sm",
                                    "color": "#AAAAAA",
                                    "flex": 1,
                                    "contents": []
                                },
                                {
                                    "type": "text",
                                    "text": "Miraina Tower, 4-1-6 Shinjuku, Tokyo",
                                    "size": "sm",
                                    "color": "#666666",
                                    "flex": 5,
                                    "wrap": true,
                                    "contents": []
                                }
                            ]
                        },
                        {
                            "type": "box",
                            "layout": "baseline",
                            "spacing": "sm",
                            "contents": [
                                {
                                    "type": "text",
                                    "text": "Time",
                                    "size": "sm",
                                    "color": "#AAAAAA",
                                    "flex": 1,
                                    "contents": []
                                },
                                {
                                    "type": "text",
                                    "text": "10:00 - 23:00",
                                    "size": "sm",
                                    "color": "#666666",
                                    "flex": 5,
                                    "wrap": true,
                                    "contents": []
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        "footer": {
            "type": "box",
            "layout": "vertical",
            "flex": 0,
            "spacing": "sm",
            "contents": [
                {
                    "type": "button",
                    "action": {
                        "type": "uri",
                        "label": "WEBSITE",
                        "uri": "https://linecorp.com"
                    },
                    "height": "sm",
                    "style": "link"
                },
                {
                    "type": "spacer",
                    "size": "sm"
                }
            ]
        }
    };

    flex['contents']['contents'].push(bubble);
    flex['contents']['contents'].push(bubble);
    flex['contents']['contents'].push(bubble);

    const result = await liff.shareTargetPicker([flex])
    if (result) {
        alert(`[${result.status}] Message sent!`)
    } else {
        const [majorVer, minorVer, patchVer] = (liff.getLineVersion() || "").split('.');

        if (minorVer === undefined) {
            alert('ShareTargetPicker was canceled in external browser')
            return
        }

        if (parseInt(majorVer) >= 10 && parseInt(minorVer) >= 10 && parseInt(patchVer) > 0) {
            alert('ShareTargetPicker was canceled in LINE app')
        }
    }
}

function logOut() {
    liff.logout()
    window.location.reload()
}

async function main() {
    await liff.init({ liffId: "1655284249-Dl2J9P15" })
    if (liff.isLoggedIn()) {
        document.getElementById("btnShare").style.display = "block"
        if (!liff.isInClient()) {
            document.getElementById("btnLogOut").style.display = "block"
        }
    } else {
        document.getElementById("btnLogin").style.display = "block"
    }
}
main()