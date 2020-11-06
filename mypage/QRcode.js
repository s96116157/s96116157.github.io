var padDate = function (value) {
    return value < 10 ? '0' + value : value;
};

var vm = new Vue({
    el: '#app',
    delimiters: ['${', '}'],
    data: {
        location: 'Mona的房間',
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
        this.info = '有事請在下方留言，謝謝。'
    }
});

start();
function start() {
    $("#show_card_info").modal();
}