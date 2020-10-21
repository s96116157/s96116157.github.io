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
            this.show_img()
        },
        show_img() {
            get_img();
            Vue.component('v-img', {
                template: x
            });
        }
    }
});

function get_img() {
    for (i=0;i<4;i++){}
    x = '<div>'+
    '<div class="row">'+
    '<div class="col-6"><img src="image/A_000.png" class="mx-auto d-block" style="width: 80%;"></div>'+
    '<div class="col-6"><img src="image/A_001.png" class="mx-auto d-block" style="width: 80%;"></div>'+
    '</div>'+
    '<h1></h1>'+
    '<div class="row">'+
    '<div class="col-6"><img src="image/A_002.png" class="mx-auto d-block" style="width: 80%;"></div>'+
    '<div class="col-6"><img src="image/A_003.png" class="mx-auto d-block" style="width: 80%;"></div>'+
    '</div>'+
    '</div>';
}