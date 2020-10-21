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
            this.isShow = true;
        }

    }
});