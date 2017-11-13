var args = arguments[0] || {};
var invoiceList = args.data.invoiceList;
var moment = require('alloy/moment');
var orderNo = args.orderNo;
if (Alloy.Globals.isIOS7Plus) {
	//$.winInvoice.extendEdges = [Ti.UI.EXTEND_EDGE_TOP];
	$.statusBar.height = 20;
	$.tblInvoiceList.separatorInsets = {
		left : 0
	};
}

function closeWindow() {
	Alloy.Globals.closeWindow($.winInvoice);
	//$.winISupplierHome.close();
}

function changeLanguage() {
	$.lblNavTitle.text = Alloy.Globals.selectedLanguage.invoices;
	$.lblNoRecord.text = Alloy.Globals.selectedLanguage.noRecordFound;
	$.lblInvoiceNo.text = Alloy.Globals.selectedLanguage.invOfPurOrder + " : " + orderNo;
	var alignment;
	if (Alloy.Globals.isEnglish) {
		alignment = Titanium.UI.TEXT_ALIGNMENT_LEFT;
		$.imgSearch.left = 10;
		$.lblInvoiceNo.right = 20;
		if (OS_IOS) {
			$.txtSearch.left = (Alloy.isTablet) ? 40 : 30;
			$.txtSearch.right = 10;
		} else {
			$.txtSearch.left = (Alloy.isTablet) ? 35 : 25;
			$.txtSearch.right = 0;
		}
		$.imgSearch.right = undefined;
	} else {
		alignment = Titanium.UI.TEXT_ALIGNMENT_RIGHT;
		$.imgSearch.right = 10;
		$.lblInvoiceNo.left = 20;
		if (OS_IOS) {
			$.txtSearch.right = (Alloy.isTablet) ? 40 : 30;
			$.txtSearch.left = 10;
		} else {
			$.txtSearch.right = (Alloy.isTablet) ? 35 : 25;
			$.txtSearch.left = 0;
		}
		$.imgSearch.left = undefined;
	}
	$.txtSearch.textAlign = alignment;
	$.lblInvoiceNo.textAlign = alignment;

}

function searchList() {
	var arrSearch = [];
	if ($.txtSearch.value.trim().length == 0) {
		arrSearch = invoiceList;
	} else {

		arrSearch = invoiceList.filter(function(obj) {
			return obj.invoice_Number.indexOf($.txtSearch.value.trim()) != -1;
		});
	}
	loadInvoices(arrSearch);
}

function loadInvoices(invoiceList) {
	var invoice_Row = [];
	$.listSection.setItems([]);
	if (invoiceList.length == 0) {
		$.lblNoRecord.visible = true;
	} else {
		$.lblNoRecord.visible = false;
	}
	// Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading);
	for (var i = 0,
	    length = invoiceList.length; i < length; i++) {
		invoice_Row.push({
			lblOrderNumber : {
				font : (Alloy.isTablet) ? Alloy.Globals.path.font18Bold : Alloy.Globals.path.font14Bold,
				text : invoiceList[i].invoice_Number
			},
			lblEntityTitle : {
				font : (Alloy.isTablet) ? Alloy.Globals.path.font17 : Alloy.Globals.path.font12,
			},
			lblEntityValue : {
				font : (Alloy.isTablet) ? Alloy.Globals.path.font17 : Alloy.Globals.path.font12,
				text : invoiceList[i].event_Name
			},
			lblAmoutTitle : {
				font : (Alloy.isTablet) ? Alloy.Globals.path.font17 : Alloy.Globals.path.font12,
			},
			lblAmoutValue : {
				font : (Alloy.isTablet) ? Alloy.Globals.path.font17 : Alloy.Globals.path.font12,
				text : invoiceList[i].currency + " " + invoiceList[i].amount
			},
			lblinvoiceDateTitle : {
				font : (Alloy.isTablet) ? Alloy.Globals.path.font17 : Alloy.Globals.path.font12,
			},
			lblinvoiceDateValue : {
				font : (Alloy.isTablet) ? Alloy.Globals.path.font17 : Alloy.Globals.path.font12,
				text : invoiceList[i].invoice_Date == "" ? "-" : moment(invoiceList[i].invoice_Date).format("DD-MM-YYYY"),
			},
			lblDueTitle : {
				font : (Alloy.isTablet) ? Alloy.Globals.path.font17 : Alloy.Globals.path.font12,
			},
			lblDueValue : {
				font : (Alloy.isTablet) ? Alloy.Globals.path.font17 : Alloy.Globals.path.font12,
				text : invoiceList[i].due_amount
			},
			lblDueDateTitle : {
				font : (Alloy.isTablet) ? Alloy.Globals.path.font17 : Alloy.Globals.path.font12,
			},
			lblDueDateValue : {
				font : (Alloy.isTablet) ? Alloy.Globals.path.font17 : Alloy.Globals.path.font12,
				text : invoiceList[i].due_Date == "" ? "-" : moment(invoiceList[i].due_Date).format("DD-MM-YYYY")
			},
			lblPayStatusTitle : {
				font : (Alloy.isTablet) ? Alloy.Globals.path.font17 : Alloy.Globals.path.font12,
			},
			lblPayStatusValue : {
				font : (Alloy.isTablet) ? Alloy.Globals.path.font17 : Alloy.Globals.path.font12,
				text : invoiceList[i].payment_Status
			},
			btnViewPay : {
				font : (Alloy.isTablet) ? Alloy.Globals.path.font18Bold : Alloy.Globals.path.font14Bold,
			},
			btnStatus : {
				font : (Alloy.isTablet) ? Alloy.Globals.path.font13Bold : Alloy.Globals.path.font11Bold,
				title : invoiceList[i].invoice_Status.toUpperCase(),
				color : (invoiceList[i].invoice_Status.toLowerCase() == "pending") ? Alloy.Globals.path.greenColor : Alloy.Globals.path.orangeColor,
				borderColor : (invoiceList[i].invoice_Status.toLowerCase() == "pending") ? Alloy.Globals.path.greenColor : Alloy.Globals.path.orangeColor,
				visible : (invoiceList[i].invoice_Status.toUpperCase().length > 0) ? true : false
			},
			imgUpDown : {
				image : Alloy.Globals.path.iconArrow2Down
			},
			btnViewInv : {
				font : (Alloy.isTablet) ? Alloy.Globals.path.font13Bold : Alloy.Globals.path.font11Bold,
				orderNo : invoiceList[i].po_Number,
				height : (invoiceList[i].paymentCount == 0) ? 0 : (Alloy.isTablet) ? 45 : 33,
				top : (invoiceList[i].paymentCount == 0) ? 0 : 15
			},
			properties : {
				isClicked : false
			}
		});
	}
	$.listSection.setItems(invoice_Row);
	// Alloy.Globals.hideLoading();
}

var alert = Ti.UI.createAlertDialog({
	title : Alloy.Globals.selectedLanguage.invoices,
	buttonNames : [Alloy.Globals.selectedLanguage.ok, Alloy.Globals.selectedLanguage.cancelTitle]
});

alert.addEventListener('click', function(e) {
	if (e.index == 0) {
		Alloy.Globals.gotoHomeScreen(Alloy.Globals.arrSupWindow);
	}
});

var httpManager = require("httpManager");
//Alloy.createController('common/httpManager');
function openPayments(e) {
	var invoiceId = invoiceList[e.itemIndex].invoice_Number;
	httpManager.ISupplierPayments(Ti.App.Properties.getObject("LoginDetaisObj").general_Profile.vendor_id, invoiceId, function(e) {
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
						Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.invoices, e.tokenDetails.tokenResponseDescription_En);
					} else {
						Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.invoices, e.tokenDetails.tokenResponseDescription_Ar);
					}
				}
			}
		}
	});
}

$.tblInvoiceList.addEventListener('itemclick', function(e) {
	var section = $.tblInvoiceList.sections[e.sectionIndex];
	var item = section.getItemAt(e.itemIndex);
	if (item.properties.isClicked == false) {
		item.properties.height = Ti.UI.SIZE;
		item.imgUpDown.image = Alloy.Globals.path.iconArrow2Up;
		item.properties.isClicked = true;
	} else {
		item.properties.isClicked = false;
		item.imgUpDown.image = Alloy.Globals.path.iconArrow2Down;
		item.properties.height = (Alloy.isTablet) ? 55 : 46;
	}
	section.updateItemAt(e.itemIndex, item);
});
changeLanguage();


$.winInvoice.addEventListener("focus",function(e){
	$.viewBottomToolbar.setDefaultTheme($.winInvoice);
});
$.viewBottomToolbar.setDefaultTheme($.winInvoice);

/**
 * Adding the eventlistener for the bottom bar view
 *
 * @param {Object} e
 */
$.viewBottomToolbar.getView().addEventListener('click', function(e) {
	if (e.source.buttonId == 'btnFontChange') {
		$.viewBottomToolbar.changeFont($.winInvoice);
	} else if (e.source.buttonId == 'btnSystemFeedback') {
		$.viewBottomToolbar.openFeedbackScreen(e);
	} else if(e.source.buttonId == 'btnSystemChangeTheme'){
		$.viewBottomToolbar.changeTheme($.winInvoice);
	}
});

/**
 * Called on open of the window
 *
 * @param {Object} e
 */
var windowOpened = function(e) {
	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading);
	loadInvoices(invoiceList);
	Alloy.Globals.hideLoading();
	Alloy.Globals.arrSupWindow.push($.winInvoice);
	$.viewBottomToolbar.setOptions({
		showThemeButton : true,
		showInstructions : false,
		showFeedBack : true,
		showFontResize : true
	});
};

/**
 * Called on close of the window
 *
 * @param {Object} e
 */
var windowClosed = function(e) {
	$.destroy();
};
