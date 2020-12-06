var id = '1calxFtlDzNrK78vFKpX3AygxbB1VTrfMb10qK8wIe48';
var url = 'https://spreadsheets.google.com/feeds/list/' + id + '/od6/public/values?alt=json';
var _list = [];
var user = [
    'Uf9a505a47211f69d17cdf966789f9ca4',  // 瑄
    'U4e05797dc82021cfa5dd34b1587e6b40', // Boots
    'U578815852467d6824d56536024c75e03' // 貓咪
]
get_info();

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
                icon: "https://s96116157.github.io/mypage/art/" + data[i]['gsx$icon']['$t'] + ".jpg",
            });
        }
    });
    console.log(_list);
}

var vm = new Vue({
    el: '#app',
    delimiters: ['${', '}'],
    data: {
        list: _list
    },
    methods: {
    }
});