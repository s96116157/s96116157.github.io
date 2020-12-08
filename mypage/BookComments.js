var id = '1calxFtlDzNrK78vFKpX3AygxbB1VTrfMb10qK8wIe48';
var url = 'https://spreadsheets.google.com/feeds/list/' + id + '/od6/public/values?alt=json';
var _list = [];
var _id = '';

async function main() {
    await liff.init({ liffId: "1655284249-Dl2J9P15" });
    if (liff.isLoggedIn()) {
        _id = liff.getContext().userId;
    };
    //window.location.reload()
}

main();
get_info();

async function get_line_id() {
    await liff.init({ liffId: "1655284249-Dl2J9P15" });
    return liff.getContext().userId;
}

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
    //console.log(_list);
}

var vm = new Vue({
    el: '#app',
    delimiters: ['${', '}'],
    data: {
        alert_txt: '',
        list: _list,
        info_txt: ''
    },
    methods: {
        send_info() {
            var url = 'https://script.google.com/macros/s/AKfycbxyu-JHXikGYsUvRt4aMjv-UsPPjSr25tjX2X-qFcDtOCm8hN8/exec';
            if (this.info_txt != '') {
                $.ajax({
                    url: url,
                    data: {
                        "info": this.info_txt,
                        "id": _id
                    },
                    success: function (response) {
                        if (response == "ok") {
                            window.location.reload();
                        }
                    },
                });
            } else {
                if (_id == '') { this.alert_txt = '請輸入要留言的訊息'; }
                $("#infoModal").modal();
            }
        }
    },
    mounted: function () {
        if (_id == '') { this.alert_txt = '尚未登入 LINE'; }
        $("#infoModal").modal();
        //this.user_id = get_line_id();
    }
});