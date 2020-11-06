let arr = Array(120);
arr.fill(1, 0, 1);
arr.fill(2, 1, 3);
arr.fill(3, 3, 8);
arr.fill(4, 8, 18);
arr.fill(5, 18, 38);
arr.fill(6, 38, 120);

var num = [0, 0, 0, 0, 0, 0];

loop_777();

function loop_777() {
    for (var i = 0; i < 2000; i++) {
        var x = getRandom(0, 120);
        var y = arr[x] - 1;
        num[y] = num[y] + 1;
    }
    console.log("頭獎：" + num[0].toString());
    console.log("二獎：" + num[1].toString());
    console.log("三獎：" + num[2].toString());
    console.log("四獎：" + num[3].toString());
    console.log("五獎：" + num[4].toString());
    console.log("安慰獎：" + num[5].toString());
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};


