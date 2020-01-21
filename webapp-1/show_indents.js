// used to serve html on a webapp call
function doGet(e) {
  return HtmlService
  .createTemplateFromFile('indent_list.html').evaluate().setTitle("Indents");
}

// get bics already in the evaluation table
function get_existing_eval_indents(){
  // get item sheet and rows
  var sheet = SpreadsheetApp.openById('1Y5bc6yPkdDzCc6DYh7c6tgFJ7OspRr3QcNCvyuUKK8o').getSheetByName('evaluation');
  var rows = sheet.getDataRange().getValues();
  var bics = [];
  var deadlines = [];
  for(var i=1; i<rows.length; i++){
    if(rows[i][0] == '')
      break;
    // add bic to list
    bics.push(rows[i][0]);
    deadlines.push(Utilities.formatDate(rows[i][3], "IST", "dd-MM-yyyy"));
  }
  return [bics, deadlines];
}

// get data for the set of existing bics which are waiting assignment
function get_existing_indent_with_data(){
  var vals = get_existing_eval_indents();
  // get item sheet and rows
  var sheet = SpreadsheetApp.openById('1Y5bc6yPkdDzCc6DYh7c6tgFJ7OspRr3QcNCvyuUKK8o').getSheetByName('evaluation');
  var rows = sheet.getDataRange().getValues();
  var bics = [];
  var deadlines = [];
  for(var i=1; i<rows.length; i++){
    if(rows[i][0] == '')
      break;
    // if already assigned, do nothing
    if(rows[i][4] != '')
      continue;
    // add bic to list
    bics.push(rows[i][0]);
    deadlines.push(Utilities.formatDate(rows[i][3], "IST", "dd-MM-yyyy"));
  }
  return [get_item_data_from_bics(bics), deadlines];
}

// generate list of bics which are pending allotment
function get_new_indent_items(){
  // get item sheet and rows
  var sheet = SpreadsheetApp.openById('1Y5bc6yPkdDzCc6DYh7c6tgFJ7OspRr3QcNCvyuUKK8o').getSheetByName('items');
  var rows = sheet.getDataRange().getValues();
  var allbics = [];
  for(var i=1; i<rows.length; i++){
    if(rows[i][0] == '')
      break;
    // add bic to list
    allbics.push(rows[i][1]);
  }
  var existing_indents = get_existing_eval_indents();
  var existing = existing_indents[0];
  return get_item_data_from_bics(difference(allbics, existing));
}

// get all the item details for a list of bics
function get_item_data_from_bics(bics){
  // get item sheet and rows
  var sheet = SpreadsheetApp.openById('1Y5bc6yPkdDzCc6DYh7c6tgFJ7OspRr3QcNCvyuUKK8o').getSheetByName('items');
  var rows = sheet.getDataRange().getValues();
  var items = [];
  // header row
  var head = rows[0];
  for(var i=0; i<bics.length; i++){
    for(var j=1; j<rows.length; j++){
      var row = rows[j];
      if(row[0] == '')
        break;
      // found bic
      if(bics[i] == row[1]){
        //items.push({'bic': bics[i],'item': row[6],'qty': row[7],'uom': row[8],'date': Utilities.formatDate(row[9], "IST", "dd-MM-yyyy")});
        items.push(get_all_fieds_for_bic(bics[i],row,head));
        break;
      }
    }
  }
  return items;
}

// for a particular bic number, pack all it's details into an object and return
function get_all_fieds_for_bic(bic,row,head){
  var details = {'bic': bic};
  for(var i=0;i<20; i++){
    if((head[i] == 'Timestamp')||(head[i] == 'Required by Date'))
     details[head[i]] = Utilities.formatDate(row[i], "IST", "dd-MM-yyyy");
    else
     details[head[i]] = row[i];
  }
  return details;
}

// list difference
function difference(a1, a2) {
  var result = [];
  for (var i = 0; i < a1.length; i++) {
    if (a2.indexOf(a1[i]) === -1) {
      result.push(a1[i]);
    }
  }
  return result;
}