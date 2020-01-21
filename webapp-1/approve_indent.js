function approve_items(values){
  // get sheet
  var sheet = SpreadsheetApp.openById('1Y5bc6yPkdDzCc6DYh7c6tgFJ7OspRr3QcNCvyuUKK8o').getSheetByName('evaluation');
  var rows = sheet.getDataRange().getValues();
  // insert data into sheet
  var add_data = [];
  // evaluation time
  var date = new Date();
  date.setDate(date.getDate() + 5);
  var eval_dead = new Date(date);
  for(var i=0; i<values.length; i++){
    var bic = values[i];
    add_data.push([bic,'','',eval_dead,'']);
  }
  // insert data into sheet
  sheet.getRange(sheet.getLastRow()+1, 1, add_data.length, add_data[0].length).setValues(add_data);
}
