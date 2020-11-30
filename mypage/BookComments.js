var id = '1calxFtlDzNrK78vFKpX3AygxbB1VTrfMb10qK8wIe48';
var url = 'https://spreadsheets.google.com/feeds/list/' + id + '/od6/public/values?alt=json';
var _list = [];
get_info();

function get_info() {
    fetch(url).then(res => res.json()).then(lessons => {
        data = lessons['feed']['entry'];
        var len = data.length;
        for (i = len - 1; i >= 0; i--) {
            //var _info = 0 ? '' : data[i]['gsx$info']['$t'];
            _list.push({
                time: data[i]['gsx$time']['$t'],
                info: data[i]['gsx$info']['$t']
            });
        }
    });
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