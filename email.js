var TO = 'prabir@hitech.in';
var BCC = 'ritika@hitech.in';

// send an email for a new item request
function send_new_item_email() {
  // get sheet and rows
  var sheet = SpreadsheetApp.openById(SHEET).getSheetByName('Form Responses 1');
  var rows = sheet.getDataRange().getValues();
  // get form
  var form = FormApp.openById(FORM);
  // iterate over rows
  for(var i = 1; i < rows.length; i++){
    var row = rows[i];
    // end of data
    if(row[0] == '')
      break;
    
    // if email already sent then nothing to do
    if(row[16] != '')
      continue;
    // no case number then do not email
    if(row[12] == '')
      continue;
    
    // create the edit url
    var timestamp = row[0];
    var editlink = form.getResponses(timestamp)[0].getEditResponseUrl();
    
    // create body and send email
    var body = get_email_body(row, editlink);
    // construct cc list
    var cc = row[12]; 
    // send email
    GmailApp.sendEmail(TO, 'Request to Add New Item for Indent - Case No: ' + row[13], 'Please the new item details.', {
     htmlBody: body,
     cc: cc
     //,bcc: BCC
    });
    // set edit URL
    sheet.getRange('O' + (i + 1)).setValue(editlink);
    // mark email as sent
    sheet.getRange('Q' + (i + 1)).setValue(new Date());
  }
}

// construct email body for one row
function get_email_body(row, editlink){
  // setup the email body
  var body = '<p>Dear Sir,</p>';
  body += '<p>' + row[12] + ' has raised a request for addition of a new item in the Stock item master list.<br>'
  + 'Details of the requested item in the table below:</p>'
  + '<p><table border="1"><tr>'
  + '<th>Product Group</th>'
  + '<th>Category</th>'
  + '<th>Sub Category</th>'
  + '<th>Item Name</th>'
  + '<th>OEM Part No.</th>'
  + '<th>UOM</th>'
  + '<th>HSN Code</th>'
  + '</tr>' 
  ;
  // get details from the row
  body += '<tr>'
  + '<td>' + row[3] + '</td>'
  + '<td>' + row[4] + '</td>'
  + '<td>' + row[5] + '</td>'
  + '<td>' + row[6] + '</td>'
  + '<td>' + row[7] + '</td>'
  + '<td>' + row[8] + '</td>'
  + '<td>' + row[11] + '</td>'
  + '</tr>';
  // end table
  body += '</table></p>';
  // last section
  body += '<p>Item master must consist the unique names of all the items being indented/ purchased in the Company.<br>' 
  + ' Hence, please use the below link to review and submit your decision accordingly to avoid duplicity of the names.<br>'
  + editlink
  + '</p><p>'
  + 'This is a system-generated e-mail. Please do not reply to this as responses are not being monitored.<br>'
  + 'In case of any corrections, please get in touch with Data Management executive - ritika@hitech.in (PBX number: 408)<br>'
  + '<br>Thank you'
  + '</p>'
  ;
  return body;
}
