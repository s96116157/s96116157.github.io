var vm = new Vue({
    el: '#main',
    data: {
        msg: [
            '嘿嘿，不在這邊哦！<br>妳找錯地方了！',
            '仔細找找看威利在哪裡！',
            '真虧妳能找到這裡來！<br>但這裡沒有東西哦！',
            '很接近了！<br>繼續加油呀！',
            '妳知道嗎？<br>一分鐘有六十秒哦！',
            '！＠＃％＄＆＊？',
            '馬倫巴不在這裡。<br>而且老闆的威士忌賣光了…'
        ]
    },
    computed: {
        get_msg: function () {
            var x = new URL(location.href).searchParams.get('v');
            var txt = '';
            if (x == "840108") {
                txt = '恭喜妳！<br>找到第一條線索了！<br><br>禮＿在＿間＿桌＿的＿下＿抽＿裡<br><br>共有兩條線索哦！';
            } else if (x == "771117") {
                txt = '恭喜妳！<br>找到第二條線索了！<br><br>＿物＿房＿裡＿子＿右＿方＿屜＿<br><br>共有兩條線索哦！';
            } else {
                const idx = Math.floor(Math.random() * this.msg.length);
                txt = this.msg[idx];
            }
            return txt;
        }
    }
});