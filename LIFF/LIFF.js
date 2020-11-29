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

    const result = await liff.shareTargetPicker([select])
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