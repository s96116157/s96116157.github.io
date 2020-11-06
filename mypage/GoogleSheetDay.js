function doGet(e) {
    /*查詢表單*/
    var params = e.parameter;
    var type = params.type;
    var time = params.order_time;
    var no = params.order_no;
    var pay = params.order_pay;
    var SpreadsheetAppId = "1sdoX-WjcqokHZPgVoVdixxF4HHp2GsnB_Ak0ImVXMpc";
    var getSheetByName = "sheet_1";
    if (type == "select") {
        var SpreadSheet = SpreadsheetApp.openById(SpreadsheetAppId);
        var Sheet = SpreadSheet.getSheetByName(getSheetByName);
        var LastRow = Sheet.getLastRow();
        var data = [];
        for (i = 0; i < LastRow; i++) {
            data[i] = [];
        }
        data = Sheet.getRange(1, 1, LastRow, 8).getValues();
        var time, pay, name;
        var output = [];
        for (i = 0; i < LastRow; i++) {
            if (data[i][0] == no) { //查詢的欄位序號
                output.push({ output: data[i], index: i });
            }//if
        }//for
        return ContentService.createTextOutput(JSON.stringify(output))
            .setMimeType(ContentService.MimeType.JSON);
    }//select
}//doGet