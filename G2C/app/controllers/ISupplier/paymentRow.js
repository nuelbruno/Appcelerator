var args = arguments[0] || {};
var moment = require('alloy/moment');
$.lblOrderNumber.text = args.data.payment_Number;
$.btnStatus.title = args.data.currency + " " + args.data.amout_Number;//args.data.invoice_Status;
$.lblEntityValue.text = args.data.event_Name;
//$.lblAmoutValue.text = args.data.currency + " " + args.data.amout_Number;
$.lblPayDateValue.text = moment(args.data.payment_Date).format("DD-MM-YYYY");
$.lblMethodValue.text = args.data.payment_Method;
$.lblBankAccValue.text = args.data.bank_Account_Name;
$.lblEntityTitle.text = Alloy.Globals.selectedLanguage.entity;
//$.lblAmoutTitle.text = Alloy.Globals.selectedLanguage.amountTitle;
$.lblPayDateTitle.text = Alloy.Globals.selectedLanguage.paymentDate;
$.lblMethodTitle.text = Alloy.Globals.selectedLanguage.method;
$.lblBankAccTitle.text = Alloy.Globals.selectedLanguage.bankAccount;
// if (args.data.invoice_Status.toLowerCase() == "paid") {
	// $.btnStatus.borderColor = Alloy.Globals.path.greenColor;
	// $.btnStatus.color = Alloy.Globals.path.greenColor;
// } else {
	// $.btnStatus.borderColor = Alloy.Globals.path.orangeColor;
	// $.btnStatus.color = Alloy.Globals.path.orangeColor;
// }
$.tblRow.imgUpDown = $.imgUpDown;
$.tblRow.mainView = $.mainBackView;
var alignment;
if (Alloy.Globals.isEnglish) {
	alignment = Ti.UI.TEXT_ALIGNMENT_LEFT;
	$.lblOrderNumber.left = 10;
	$.imgUpDown.right = 10;
	$.btnStatus.left = 130;
	$.lblEntityValue.left = /*$.lblAmoutValue.left =*/ $.lblPayDateValue.left = $.lblMethodValue.left = $.lblBankAccValue.left = 130;
	$.lblEntityValue.right = /*$.lblAmoutValue.right =*/ $.lblPayDateValue.right = $.lblMethodValue.right = $.lblBankAccValue.right = 10;
	$.lblEntityTitle.left = /*$.lblAmoutTitle.left =*/ $.lblPayDateTitle.left = $.lblMethodTitle.left = $.lblBankAccTitle.left = 10;

} else {
	alignment = Ti.UI.TEXT_ALIGNMENT_RIGHT;
	$.lblOrderNumber.right = 10;
	$.imgUpDown.left = 10;
	$.btnStatus.right = 130;
	$.lblEntityValue.left = /*$.lblAmoutValue.left =*/ $.lblPayDateValue.left = $.lblMethodValue.left = $.lblBankAccValue.left = 10;
	$.lblEntityValue.right = /*$.lblAmoutValue.right =*/ $.lblPayDateValue.right = $.lblMethodValue.right = $.lblBankAccValue.right = 130;
	$.lblEntityTitle.right = /*$.lblAmoutTitle.right =*/ $.lblPayDateTitle.right = $.lblMethodTitle.right = $.lblBankAccTitle.right = 10;

}
$.lblEntityValue.textAlign = /*$.lblAmoutValue.textAlign =*/ $.lblPayDateValue.textAlign = $.lblMethodValue.textAlign = $.lblBankAccValue.textAlign = alignment;
$.lblEntityTitle.textAlign = /*$.lblAmoutTitle.textAlign =*/ $.lblPayDateTitle.textAlign = $.lblMethodTitle.textAlign = $.lblBankAccTitle.textAlign =alignment;
$.lblOrderNumber.textAlign = alignment;