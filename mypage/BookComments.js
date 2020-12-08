var id = '1calxFtlDzNrK78vFKpX3AygxbB1VTrfMb10qK8wIe48';
var url = 'https://spreadsheets.google.com/feeds/list/' + id + '/od6/public/values?alt=json';
var _list = [];
var LINE_id = '';

async function main() {
    await liff.init({ liffId: "1655284249-Dl2J9P15" });
    if (liff.isLoggedIn()) {
        console.log(liff.getContext().userId);
        LINE_id = liff.getContext().userId;
        alert("登入");
        get_info();
    } else {
        LINE_id = '尚未登入 LINE';
        alert("尚未登入 LINE");
        get_info();
        //liff.login();
    };
    //window.location.reload()
}

main();

function get_info() {
    fetch(url).then(res => res.json()).then(lessons => {
        data = lessons['feed']['entry'];
        var len = data.length;
        for (i = len - 1; i >= 0; i--) {
            //var _info = 0 ? '' : data[i]['gsx$info']['$t'];
            _list.push({
                user: data[i]['gsx$user']['$t'],
                time: data[i]['gsx$time']['$t'],
                info: data[i]['gsx$info']['$t'],
                re: data[i]['gsx$return']['$t'],
                icon: "https://s96116157.github.io/mypage/art/" + data[i]['gsx$icon']['$t'] + ".jpg"
            });
        }
    });
    console.log(_list);
}

var vm = new Vue({
    el: '#app',
    delimiters: ['${', '}'],
    data: {
        user_id: LINE_id,
        list: _list,
        info_txt: ''
    },
    methods: {
        send_info() {
            var url = 'https://script.google.com/macros/s/AKfycbxyu-JHXikGYsUvRt4aMjv-UsPPjSr25tjX2X-qFcDtOCm8hN8/exec';
            if (LINE_id != '尚未登入 LINE') {
                $.ajax({
                    url: url,
                    data: {
                        "info": this.info_txt,
                        "id": this.user_id
                    },
                    success: function (response) {
                        if (response == "ok") {
                            window.location.reload();
                        }
                    },
                });
            } else {
                alert("尚未登入 LINE");
            }
        }
    }
});