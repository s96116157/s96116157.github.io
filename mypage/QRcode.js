var padDate = function (value) {
    return value < 10 ? '0' + value : value;
};

var vm = new Vue({
    el: '#app',
    delimiters: ['${', '}'],
    data: {
        location: '',
        data: '',
        time: '',
        info: ''
    },
    methods: {
    },
    mounted: function () {
        var date = new Date();
        var year = date.getFullYear();
        var month = padDate(date.getMonth() + 1);
        var day = padDate(date.getDate());
        var hours = padDate(date.getHours());
        var minutes = padDate(date.getMinutes());
        var seconds = padDate(date.getSeconds());
        this.data = year + '/' + month + '/' + day + '/';
        this.time = hours + ':' + minutes + ':' + seconds;
        this.location = 'Mona的房間';
        this.info = '有事請在下方留言，謝謝。'
    }
});

start();
function start() {
    $("#creat_info").modal();
}

function getJson() {
    var url = 'http://gsx2json.com/api?id=1calxFtlDzNrK78vFKpX3AygxbB1VTrfMb10qK8wIe48&rows=false';
    $.getJSON(url, function (data) {
        console.log(data);
    });
    
}