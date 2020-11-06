var padDate = function (value) {
    return value < 10 ? '0' + value : value;
};

var x = '';
var vm = new Vue({
    el: '#app',
    delimiters: ['${', '}'],
    data: {
        headers: ["編號", "簽到時間", '註記', '回應'],
        list: [],
        location: '',
        data: '',
        time: '',
        info: '',
        info_txt: ''
    },
    methods: {
        show_info() {
            var url = 'https://script.google.com/macros/s/AKfycbxyu-JHXikGYsUvRt4aMjv-UsPPjSr25tjX2X-qFcDtOCm8hN8/exec';
            $.ajax({
                url: url,
                data: {
                    "info": this.info_txt,
                    "re": '',
                    "time": this.data + ' ' + this.time
                },
                success: function (response) {
                    if (response == "ok") {
                        $("#show_ok").modal();
                    }
                },
            });

            this._info();
        },
        _info() {
            this.list = [];
            //var url = 'https://gsx2json.com/api?id=1calxFtlDzNrK78vFKpX3AygxbB1VTrfMb10qK8wIe48&rows=false';
            //var url = 'https://s96116157.github.io/mypage/QRcode.json';
            var url = 'https://spreadsheets.google.com/feeds/list/1calxFtlDzNrK78vFKpX3AygxbB1VTrfMb10qK8wIe48/od6/public/values?alt=json';
            fetch(url).then(res => res.json()).then(lessons => {
                data = lessons['feed']['entry'];
                var len = data.length;
                var x = 0;
                //if (len > 10) { len = 10; }
                for (i = len - 1; i >= 0; i--) {
                    x++;
                    var _info = data[i]['gsx$info']['$t'];
                    var _re = data[i]['gsx$return']['$t'];
                    if (_info == 0) { _info = ''; }
                    if (_re == 0) { _re = ''; }
                    this.list.push({
                        no: x,
                        time: data[i]['gsx$time']['$t'],
                        info: _info,
                        re: _re
                    });
                }
            });
        }
    },
    mounted: function () {
        var date = new Date();
        var year = date.getFullYear();
        var month = padDate(date.getMonth() + 1);
        var day = padDate(date.getDate());
        var hours = padDate(date.getHours());
        var minutes = padDate(date.getMinutes());
        var seconds = padDate(date.getSeconds());
        this.data = year + '/' + month + '/' + day;
        this.time = hours + ':' + minutes + ':' + seconds;
        this.location = 'Mona的房間';
        this.info = '有事請在下方留言，謝謝。';
    }
});

start();
function start() {
    $("#creat_info").modal();
}