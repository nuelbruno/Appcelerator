var args = arguments[0] || {};
var moment = require('alloy/moment');
$.lblOrderNumber.text = args.data.po_Number;
$.btnStatus.title = args.data.status.toUpperCase();
$.lblDescription.text = args.data.description;
$.lblEntityValue.text = args.data.event_Name;
$.lblOrdDateValue.text = moment(args.data.order_Datemoment).format("DD-MM-YYYY");
$.lblAmoutValue.text = args.data.amount;
$.lblEntityTitle.text = Alloy.Globals.selectedLanguage.entity;
$.lblOrdDateTitle.text = Alloy.Globals.selectedLanguage.orderDate;
$.lblAmoutTitle.text = Alloy.Globals.selectedLanguage.amountTitle;
$.btnViewInv.title = Alloy.Globals.selectedLanguage.viewInvoices;
if (args.data.status.toLowerCase() == "pending") {
	$.btnStatus.color = Alloy.Globals.path.greenColor;
	$.btnStatus.borderColor = Alloy.Globals.path.greenColor;
} else {
	$.btnStatus.color = Alloy.Globals.path.orangeColor;
	$.btnStatus.borderColor = Alloy.Globals.path.orangeColor;
}
$.tblRow.imgUpDown = $.imgUpDown;
$.tblRow.mainView = $.mainBackView;
$.btnViewInv.orderNo = args.data.po_Number;
var alignment;
if (Alloy.Globals.isEnglish) {
	alignment = Ti.UI.TEXT_ALIGNMENT_LEFT;
	$.lblOrderNumber.left = 10;
	$.imgUpDown.right = 10;
	$.btnViewInv.left = 10;
	$.btnStatus.left = 150;
	$.lblEntityTitle.left = $.lblOrdDateTitle.left = $.lblAmoutTitle.left = 10;
	$.lblEntityValue.left = $.lblOrdDateValue.left = $.lblAmoutValue.left = 130;
	$.lblEntityValue.right = $.lblOrdDateValue.right = $.lblAmoutValue.right = 10;

} else {
	alignment = Ti.UI.TEXT_ALIGNMENT_RIGHT;
	$.lblOrderNumber.right = 10;
	$.imgUpDown.left = 10;
	$.btnViewInv.right = 10;
	$.btnStatus.right = 150;
	$.lblEntityTitle.right = $.lblOrdDateTitle.right = $.lblAmoutTitle.right = 10;
	$.lblEntityValue.right = $.lblOrdDateValue.right = $.lblAmoutValue.right = 130;
	$.lblEntityValue.left = $.lblOrdDateValue.left = $.lblAmoutValue.left = 10;

}
$.lblEntityTitle.textAlign = $.lblOrdDateTitle.textAlign = $.lblAmoutTitle.textAlign = alignment;
$.lblEntityValue.textAlign = $.lblOrdDateValue.textAlign = $.lblAmoutValue.textAlign = $.lblOrderNumber.textAlign = alignment;
$.lblDescription.textAlign = Ti.UI.TEXT_ALIGNMENT_RIGHT;

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
function openInvoices(e) {
	var orderNo = e.source.orderNo;
	httpManager.ISupplierInvoices_By_PurchaseOrderNumber(Ti.App.Properties.getObject("LoginDetaisObj").general_Profile.vendor_id,orderNo, function(e) {
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
				var NextWindow = Alloy.createController("ISupplier/winInvoice", {
					data : e,
					orderNo : orderNo
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
