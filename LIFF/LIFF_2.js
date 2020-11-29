var liffID = '1655284249-Dl2J9P15';

liff.init({
    liffId: liffID
}).then(function () {
    console.log('LIFF init');

    // 這邊開始寫使用其他功能

}).catch(function (error) {
    console.log(error);
});

// 引用 LIFF SDK 的頁面，頁面中的 lang 值
liff.getLanguage();

// LIFF SDK 的版本
liff.getVersion();

// 回傳是否由 LINE App 存取
liff.isInClient();

// 使用者是否登入 LINE 帳號
liff.isLoggedIn();

// 回傳使用者作業系統：ios、android、web
liff.getOS();

// 使用者的 LINE 版本
liff.getLineVersion();

// 開啟連結
liff.openWindow({
    // uri：要開啟的網址
    url: uri,

    // external：
    // 是否要用外部瀏覽器打開，這在 LINE APP 下開頁面時會比較有感
    // 一般我們在 LINE 上開連結，都會是在 LINE 的框架下，external 設為 true，就可以直接用瀏覽器開啟而不是在 LINE 的框架下開啟
    // 預設值是 false
    external: true
})