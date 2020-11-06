function doGet(e) {
    /*查詢表單*/
    var params = e.parameter;
    var type = params.type;
    var no = params.order_no;
    var SpreadsheetAppId = "1iUJW05PMXwUzPqiXnv_JTEmSc4QMvSx66tVUKrodttk";
    var getSheetByName = "sheet_1";
    if (type == "c") {
        var SpreadSheet = SpreadsheetApp.openById(SpreadsheetAppId);
        var Sheet = SpreadSheet.getSheetByName(getSheetByName);
        var LastRow = Sheet.getLastRow();
        var data = [];
        for (i = 0; i < LastRow; i++) {
            data[i] = [];
        }
        data = Sheet.getRange(1, 1, LastRow, 3).getValues();
        var output = [];
        for (i = 0; i < LastRow; i++) {
            if (data[i][0] == no) { //查詢的欄位序號
                output.push(data[i][1]);
            }//if
        }//for
        
        return ContentService.createTextOutput(JSON.stringify(output))
            .setMimeType(ContentService.MimeType.JSON);
    }//select
}//doGet