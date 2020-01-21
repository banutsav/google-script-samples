function assign_indent_items(values) {
  // get sheet
  var sheet = SpreadsheetApp.openById('1Y5bc6yPkdDzCc6DYh7c6tgFJ7OspRr3QcNCvyuUKK8o').getSheetByName('evaluation');
  var rows = sheet.getDataRange().getValues();
  // insert data into sheet
  var add_data = [];
  // evaluation time
  var date = new Date();
  // iterate over all bic's which need to be updated
  for(var i=0; i<values.length; i++){
    var bic = values[i]['bic'];
    // check if bic in sheet
    for(var j=1; j<rows.length; j++){
      var row = rows[j];
      if(row[0] == bic){
        // update value
        var range = sheet.getRange('B' + (j+1) + ':C' + (j+1));
        range.setValues([[values[i]['cat'], values[i]['assign']]]);
        range = sheet.getRange('E' + (j+1)).setValue(date);
        break;
      }
    }
  }
}  
