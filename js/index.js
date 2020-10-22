var today_card = ["", "", "", ""];
var today_title = ["", "", "", ""];
var today_txt = ["", "", "", ""];
var today_info = '';
var random_num = [];

$.getJSON('https://s96116157.github.io/js/json/info_2.json', function (data) {    
    //===========================================
    var r = data.title.length;    
    let num = parseInt(Math.random() * r)    
    today_info = data.title[num];
    vm.msg = today_info;
    //===========================================
    r = data.card.length;    
    ger_random(r);
    for (i = 0; i < 4; i++) {
        r = random_num[i];
        today_card[i] = data.card[r];
    }
    //=========================================== 
    r = data.info.length;    
    ger_random(r);
    for (i = 0; i < 4; i++) {
        r = random_num[i];
        today_title[i] = data.info[r].title;
        today_txt[i] = data.info[r].txt;
    }
    //===========================================
}).error(function () {
    console.log('error');
});

function ger_random(_len) {
    random_num.length = 0;
    while (random_num.length < 4) {
        let num = parseInt(Math.random() * _len)
        // parseInt取正，小数点后面的数字全部抹掉
        // Math.random() 0-1的随机数
        if (random_num.indexOf(num) == -1) {
            // this.arr.indexOf(num)若等于-1则证明arr这个数组里没有num这个随机数，因此可以放进这个数组里
            random_num.push(num)
        }
    }
}

var x = '';
var vm = new Vue({
    el: '#app',
    delimiters: ['${', '}'],
    data: {
        msg: '顯示十月運勢',
        card_title: '',
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
                        var num = parseInt(targetId);
                        vm.card_title = today_title[num];
                        vm.card_msg = today_txt[num];
                        vm.src = 'image/' + today_card[num] + '.png'
                    }
                }
            });
        }
    }
});

function get_img() {
    btn_txt = 'class="col-6 col-md-3 code-btn" type="button" data-toggle="modal" data-target="#show_card_info" v-on:click="change_info($event)">';
    x = '<div>' +
        '<div class="row">' +
        '<div class="col-md-3"></div>' +
        '<div id="0" ' + btn_txt +
        '<img src="image/' + today_card[0] + '.png" class="mx-auto d-block" style="width: 80%;"></div>' +
        '<div id="1" ' + btn_txt +
        '<img src="image/' + today_card[1] + '.png" class="mx-auto d-block" style="width: 80%;"></div>' +
        '<div class="col-md-3"></div>' +
        '</div>' +
        '<h1></h1>' +
        '<div class="row">' +
        '<div class="col-md-3"></div>' +
        '<div id="2" ' + btn_txt +
        '<img src="image/' + today_card[2] + '.png" class="mx-auto d-block" style="width: 80%;"></div>' +
        '<div id="3" ' + btn_txt +
        '<img src="image/' + today_card[3] + '.png" class="mx-auto d-block" style="width: 80%;"></div>' +
        '<div class="col-md-3"></div>' +
        '</div>' +
        '</div>';
}