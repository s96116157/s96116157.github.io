var CHANNEL_ACCESS_TOKEN = '8JjSUlUZ7Yi87GvAvZF/UoZRs7t/lrvKasoiWhprlifhw7fw0xvAvhEsu/AMzT8jRi69ixizLp64dEmrvllbv/u393huonF8ZB6BOfgUvN/dp4winDdBG6kZ+7HwvNvyVFJyMm1uJO5t3nCIK/pTHAdB04t89/1O/w1cDnyilFU=';

function doPost(e) {
    var msg = JSON.parse(e.postData.contents);
    var userType = msg.events[0].type;
    var replyToken = msg.events[0].replyToken;

    return;
}