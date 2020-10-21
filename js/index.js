var today_card = ["", "", "", ""];
$.getJSON('https://s96116157.github.io/js/json/info.json', function (data) {
    for (i = 0; i < 4; i++) {
        today_card[i] = data.info[i].card;
    }
}).error(function () {
    console.log('error');
});

var x = '';
var vm = new Vue({
    el: '#app',
    delimiters: ['${', '}'],
    data: {
        msg: '顯示十月運勢',
        isShow: false
    },
    methods: {
        prompt() {
            this.msg = '請選擇下方任一張牌';            
            this.card_msg = 'OOOOOOO';
            this.show_img()
        },
        show_img() {
            get_img();
            Vue.component('v-img', {
                template: x
            });
        },
        change_info() {
        }
    }
});

function get_img() {
    x = '<div>' +
        '<div class="row">' +
        '<div class="col-md-3"></div>' +
        '<div class="col-6 col-md-3"><img src="image/' + today_card[0] + '.png" class="mx-auto d-block" style="width: 80%;" data-toggle="modal" data-target="#exampleModalCenter" type="button"></div>' +
        '<div class="col-6 col-md-3"><img src="image/' + today_card[1] + '.png" class="mx-auto d-block" style="width: 80%;"></div>' +
        '<div class="col-md-3"></div>' +
        '</div>' +
        '<h1></h1>' +
        '<div class="row">' +
        '<div class="col-md-3"></div>' +
        '<div class="col-6 col-md-3"><img src="image/' + today_card[2] + '.png" class="mx-auto d-block" style="width: 80%;"></div>' +
        '<div class="col-6 col-md-3"><img src="image/' + today_card[3] + '.png" class="mx-auto d-block" style="width: 80%;"></div>' +
        '<div class="col-md-3"></div>' +
        '</div>' +
        '</div>';
}