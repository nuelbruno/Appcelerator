var args = arguments[0] || {};
var orderList = args.purchaseOrderList;
var moment = require('alloy/moment');
if (Alloy.Globals.isIOS7Plus) {
	//$.winPurchaseOrder.extendEdges = [Ti.UI.EXTEND_EDGE_TOP];
	$.statusBar.height = 20;
	$.tblISupplierList.separatorInsets = {
		left : 0
	};
}

function closeWindow() {
	Alloy.Globals.closeWindow($.winPurchaseOrder);
	//$.winISupplierHome.close();
}

function changeLanguage() {
	$.lblNavTitle.text = Alloy.Globals.selectedLanguage.purchaseOrder;
	$.lblNoRecord.text = Alloy.Globals.selectedLanguage.noRecordFound;
	var alignment;

	if (Alloy.Globals.isEnglish) {
		alignment = Titanium.UI.TEXT_ALIGNMENT_LEFT;
		$.imgSearch.left = 10;
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
}

function searchList() {
	var arrSearch = [];
	if ($.txtSearch.value.trim().length == 0) {
		arrSearch = orderList;
	} else {

		arrSearch = orderList.filter(function(obj) {
			return obj.po_Number.indexOf($.txtSearch.value.trim()) != -1;
		});
	}
	loadPurchaseOrder(arrSearch);
}

function loadPurchaseOrder(orderList) {
	var pur_Ord_Row = [];
	$.listSection.setItems([]);
	if (orderList.length == 0) {
		$.lblNoRecord.visible = true;
	} else {
		$.lblNoRecord.visible = false;
	}
	//Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading);
	for (var i = 0,
	    length = orderList.length; i < length; i++) {
		pur_Ord_Row.push({
			lblOrderNumber : {
				text : orderList[i].po_Number,
				font : (Alloy.isTablet) ? Alloy.Globals.path.font18Bold : Alloy.Globals.path.font14Bold
			},
			btnStatus : {
				font : (Alloy.isTablet) ? Alloy.Globals.path.font13Bold : Alloy.Globals.path.font11Bold,
				title : orderList[i].status.toUpperCase(),
				color : (orderList[i].status.toUpperCase() == "APPROVED") ? Alloy.Globals.path.greenColor : Alloy.Globals.path.orangeColor,
				borderColor : (orderList[i].status.toUpperCase() == "APPROVED") ? Alloy.Globals.path.greenColor : Alloy.Globals.path.orangeColor
			},
			lblDescription : {
				font : (Alloy.isTablet) ? Alloy.Globals.path.font17 : Alloy.Globals.path.font12,
				text : orderList[i].description,
			},
			lblEntityValue : {
				font : (Alloy.isTablet) ? Alloy.Globals.path.font17 : Alloy.Globals.path.font12,
				text : orderList[i].event_Name,
			},
			lblOrdDateValue : {
				font : (Alloy.isTablet) ? Alloy.Globals.path.font17 : Alloy.Globals.path.font12,
				text : orderList[i].order_Datemoment == "" ? "-" : moment(orderList[i].order_Datemoment).format("DD-MM-YYYY"),
			},
			lblAmoutValue : {
				font : (Alloy.isTablet) ? Alloy.Globals.path.font17 : Alloy.Globals.path.font12,
				text : orderList[i].amount
			},
			imgUpDown : {
				image : Alloy.Globals.path.iconArrow2Down
			},
			btnViewInv : {
				font : (Alloy.isTablet) ? Alloy.Globals.path.font18Bold : Alloy.Globals.path.font14Bold,
				height : (orderList[i].status.toUpperCase() == "REQUIRES REAPPROVAL" || orderList[i].invoiceCount == 0) ? 0 : (Alloy.isTablet) ? 45 : 33,
				top : (orderList[i].status.toUpperCase() == "REQUIRES REAPPROVAL" || orderList[i].invoiceCount == 0) ? 0 : 15
			},
			lblEntityTitle : {
				font : (Alloy.isTablet) ? Alloy.Globals.path.font17 : Alloy.Globals.path.font12
			},
			lblOrdDateTitle : {
				font : (Alloy.isTablet) ? Alloy.Globals.path.font17 : Alloy.Globals.path.font12
			},
			lblAmoutTitle : {
				font : (Alloy.isTablet) ? Alloy.Globals.path.font17 : Alloy.Globals.path.font12
			},
			properties : {
				isClicked : false
			}
		});
	}
	$.listSection.setItems(pur_Ord_Row);
	//Alloy.Globals.hideLoading();
}

var alert = Ti.UI.createAlertDialog({
	title : Alloy.Globals.selectedLanguage.purchaseOrder,
	buttonNames : [Alloy.Globals.selectedLanguage.ok, Alloy.Globals.selectedLanguage.cancelTitle]
});

alert.addEventListener('click', function(e) {
	if (e.index == 0) {
		Alloy.Globals.gotoHomeScreen(Alloy.Globals.arrSupWindow);
	}
});

var httpManager = require("httpManager");
//Alloy.createController('common/httpManager');
function openInvoices(e) {
	var orderNo = orderList[e.itemIndex].po_Number;
	httpManager.ISupplierInvoices_By_PurchaseOrderNumber(Ti.App.Properties.getObject("LoginDetaisObj").general_Profile.vendor_id, orderNo, function(e) {
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
						Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.purchaseOrder, e.tokenDetails.tokenResponseDescription_En);
					} else {
						Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.purchaseOrder, e.tokenDetails.tokenResponseDescription_Ar);
					}
				}
			}
		}

	});
}

$.tblISupplierList.addEventListener('itemclick', function(e) {
	var section = $.tblISupplierList.sections[e.sectionIndex];
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

$.winPurchaseOrder.addEventListener("focus",function(e){
	$.viewBottomToolbar.setDefaultTheme($.winPurchaseOrder);
});
$.viewBottomToolbar.setDefaultTheme($.winPurchaseOrder);

/**
 * Adding the eventlistener for the bottom bar view
 *
 * @param {Object} e
 */
$.viewBottomToolbar.getView().addEventListener('click', function(e) {
	if (e.source.buttonId == 'btnFontChange') {
		$.viewBottomToolbar.changeFont($.winPurchaseOrder);
	} else if (e.source.buttonId == 'btnSystemFeedback') {
		$.viewBottomToolbar.openFeedbackScreen(e);
	} else if(e.source.buttonId == 'btnSystemChangeTheme'){
		$.viewBottomToolbar.changeTheme($.winPurchaseOrder);
	}
});

/**
 * Called on open of the window
 *
 * @param {Object} e
 */
var windowOpened = function(e) {
	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading);
	loadPurchaseOrder(orderList);
	Alloy.Globals.hideLoading();
	Alloy.Globals.arrSupWindow.push($.winPurchaseOrder);
	$.viewBottomToolbar.setOptions({
		showThemeButton : true,	
		showInstructions : false,
		showFeedBack : true,
		showFontResize : true
	});
};

/**
 * Window closed
 *
 * @param {Object} e
 */
var windowClosed = function(e) {
	Alloy.Globals.arrSupWindow.pop();
};
