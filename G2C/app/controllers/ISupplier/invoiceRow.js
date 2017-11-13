var args = arguments[0] || {};
var moment = require('alloy/moment');
$.lblOrderNumber.text = args.data.invoice_Number;
$.btnStatus.title = args.data.invoice_Status.toUpperCase();
$.lblEntityValue.text = args.data.event_Name;
$.lblAmoutValue.text = args.data.amount;
$.lblinvoiceDateValue.text = moment(args.data.invoice_Date).format("DD-MM-YYYY");
$.lblDueValue.text = args.data.due_amount;
$.lblDueDateValue.text = moment(args.data.due_Date).format("DD-MM-YYYY");
$.lblPayStatusValue.text = args.data.payment_Status;
$.lblEntityTitle.text = Alloy.Globals.selectedLanguage.entity;
$.lblAmoutTitle.text = Alloy.Globals.selectedLanguage.amountTitle;
$.lblinvoiceDateTitle.text = Alloy.Globals.selectedLanguage.invoiceDate;
$.lblDueTitle.text = Alloy.Globals.selectedLanguage.due;
$.lblDueDateTitle.text = Alloy.Globals.selectedLanguage.dueDate;
$.lblPayStatusTitle.text = Alloy.Globals.selectedLanguage.paymentStatus;
$.btnViewPay.title = Alloy.Globals.selectedLanguage.paymentDetails;
if (args.data.invoice_Status.toLowerCase() == "pending") {
	$.btnStatus.color = Alloy.Globals.path.greenColor;
	$.btnStatus.borderColor = Alloy.Globals.path.greenColor;
} else {
	$.btnStatus.color = Alloy.Globals.path.orangeColor;
	$.btnStatus.borderColor = Alloy.Globals.path.orangeColor;
}
$.tblRow.imgUpDown = $.imgUpDown;
$.tblRow.mainView = $.mainBackView;
$.btnViewPay.invoiceNo = args.data.invoice_Number;
//args.data.invoice_Id;
var alignment;
if (Alloy.Globals.isEnglish) {
	alignment = Ti.UI.TEXT_ALIGNMENT_LEFT;
	$.lblOrderNumber.left = 10;
	$.imgUpDown.right = 10;
	$.btnViewPay.left = 10;
	$.btnStatus.left = 140;
	$.lblEntityValue.left = $.lblAmoutValue.left = $.lblinvoiceDateValue.left = $.lblDueValue.left = $.lblDueDateValue.left = $.lblPayStatusValue.left = 130;
	$.lblEntityValue.right = $.lblAmoutValue.right = $.lblinvoiceDateValue.right = $.lblDueValue.right = $.lblDueDateValue.right = $.lblPayStatusValue.right = 10;
	$.lblEntityTitle.left = $.lblAmoutTitle.left = $.lblinvoiceDateTitle.left = $.lblDueTitle.left = $.lblDueDateTitle.left = $.lblPayStatusTitle.left = 10;

} else {
	alignment = Ti.UI.TEXT_ALIGNMENT_RIGHT;
	$.lblOrderNumber.right = 10;
	$.imgUpDown.left = 10;
	$.btnViewPay.right = 10;
	$.btnStatus.right = 140;
	$.lblEntityValue.left = $.lblAmoutValue.left = $.lblinvoiceDateValue.left = $.lblDueValue.left = $.lblDueDateValue.left = $.lblPayStatusValue.left = 10;
	$.lblEntityValue.right = $.lblAmoutValue.right = $.lblinvoiceDateValue.right = $.lblDueValue.right = $.lblDueDateValue.right = $.lblPayStatusValue.right = 130;
	$.lblEntityTitle.right = $.lblAmoutTitle.right = $.lblinvoiceDateTitle.right = $.lblDueTitle.right = $.lblDueDateTitle.right = $.lblPayStatusTitle.right = 10;
}
$.lblEntityTitle.textAlign = $.lblAmoutTitle.textAlign = $.lblinvoiceDateTitle.textAlign = $.lblDueTitle.textAlign = $.lblDueDateTitle.textAlign = $.lblPayStatusTitle.textAlign = alignment;
$.lblEntityValue.textAlign = $.lblAmoutValue.textAlign = $.lblinvoiceDateValue.textAlign = $.lblDueValue.textAlign = $.lblDueDateValue.textAlign = $.lblPayStatusValue.textAlign = alignment;
$.lblOrderNumber.textAlign = alignment;

var alert = Ti.UI.createAlertDialog({
	title : Alloy.Globals.selectedLanguage.iSupplier,
	buttonNames : [Alloy.Globals.selectedLanguage.ok, Alloy.Globals.selectedLanguage.cancelTitle]
});

alert.addEventListener('click', function(e) {
	if (e.index == 0) {
		Alloy.Globals.gotoHomeScreen(Alloy.Globals.arrSupWindow);
	}
});

var httpManager = require("httpManager");//Alloy.createController('common/httpManager');
function openPayments(e) {
	var invoiceId = e.source.invoiceNo;
	httpManager.ISupplierPayments(Ti.App.Properties.getObject("LoginDetaisObj").general_Profile.vendor_id,invoiceId, function(e) {
		Ti.API.info(JSON.stringify(e));
		if (e != null) {
			if (e.tokenDetails.tokenResponseStatus == "Success") {
				Ti.App.Properties.setInt("authenticationCode", e.tokenDetails.tokenCode);
				Ti.App.Properties.setString("emailID", e.tokenDetails.emailId);
				Ti.App.Properties.setString("status", e.tokenDetails.tokenstaus);
				Ti.App.Properties.setString("roleType", e.tokenDetails.roleType);
				Ti.App.Properties.setString("groupType", e.tokenDetails.groupType);
				Ti.App.Properties.setString("createdDate", e.tokenDetails.createdDate);
				Ti.App.Properties.setString("lastUpdatedDate", e.tokenDetails.lastUpdatedDate);
				var NextWindow = Alloy.createController("ISupplier/winPayments", {
					data : e,
					invoiceNo : invoiceId
				}).getView();
				Alloy.Globals.openWindow(NextWindow);
			} else {
				if (e.tokenDetails.tokenStatus.toLowerCase() == "expired") {
					alert.message = (Alloy.Globals.isEnglish) ? e.tokenDetails.tokenResponseDescription_En : e.tokenDetails.tokenResponseDescription_Ar;
					alert.show();
				} else {
					if (Alloy.Globals.isEnglish) {
						Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.iSupplier, e.tokenDetails.tokenResponseDescription_En);
					} else {
						Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.iSupplier, e.tokenDetails.tokenResponseDescription_Ar);
					}
				}
			}
		}
	});
}
