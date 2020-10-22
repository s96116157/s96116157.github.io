var today_card = ["", "", "", ""];
var today_txt = ["", "", "", ""];
$.getJSON('https://s96116157.github.io/js/json/info.json', function (data) {
    for (i = 0; i < 4; i++) {
        today_card[i] = data.info[i].card;
        today_txt[i] = data.info[i].txt;
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
        card_msg: '',
        isShow: false,
        src: ''
    },
    methods: {
        prompt() {
            this.msg = '請選擇下方任一張牌';
            this.show_img()
        },
        show_img() {
            get_img();
            Vue.component('v-img', {
                data: function () {
                    return {
                        count: 0
                    };
                },
                // 元件的 HTML
                template: x,
                methods: {
                    change_info: function (event) {
                        targetId = event.currentTarget.id;
                        var num = targetId.charAt(targetId.length-1);
                        vm.card_msg = today_txt[num];
                        vm.src = 'image/' + targetId + '.png'
                    }
                }
            });
        }
    }
});

function get_img() {
    btn_txt = '" class="col-6 col-md-3 code-btn" type="button" data-toggle="modal" data-target="#show_card_info" v-on:click="change_info($event)">';
    x = '<div>' +
        '<div class="row">' +
        '<div class="col-md-3"></div>' +
        '<div id="' + today_card[0] + btn_txt +
        '<img src="image/' + today_card[0] + '.png" class="mx-auto d-block" style="width: 80%;"></div>' +
        '<div id="' + today_card[1] + btn_txt +
        '<img src="image/' + today_card[1] + '.png" class="mx-auto d-block" style="width: 80%;"></div>' +
        '<div class="col-md-3"></div>' +
        '</div>' +
        '<h1></h1>' +
        '<div class="row">' +
        '<div class="col-md-3"></div>' +
        '<div id="' + today_card[2] + btn_txt +
        '<img src="image/' + today_card[2] + '.png" class="mx-auto d-block" style="width: 80%;"></div>' +
        '<div id="' + today_card[3] + btn_txt +
        '<img src="image/' + today_card[3] + '.png" class="mx-auto d-block" style="width: 80%;"></div>' +
        '<div class="col-md-3"></div>' +
        '</div>' +
        '</div>';
}