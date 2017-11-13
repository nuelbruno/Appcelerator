var args = arguments[0] || {};
var paymentList = args.data.paymentList;
var invoiceNo = args.invoiceNo;
var moment = require('alloy/moment');
if (Alloy.Globals.isIOS7Plus) {
	//$.winPayments.extendEdges = [Ti.UI.EXTEND_EDGE_TOP];
	$.statusBar.height = 20;
	$.tblPaymentList.separatorInsets = {
		left : 0
	};
}

function closeWindow() {
	Alloy.Globals.closeWindow($.winPayments);
	//$.winISupplierHome.close();
}

function changeLanguage() {
	$.lblNavTitle.text = Alloy.Globals.selectedLanguage.payments;
	$.lblNoRecord.text = Alloy.Globals.selectedLanguage.noRecordFound;
	$.lblPaymentNo.text = Alloy.Globals.selectedLanguage.payOfInvNo + " : " + invoiceNo;
	var alignment;
	if (Alloy.Globals.isEnglish) {
		alignment = Titanium.UI.TEXT_ALIGNMENT_LEFT;
		$.imgSearch.left = 10;
		$.lblPaymentNo.right = 20;
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
		$.lblPaymentNo.left = 20;
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
	$.lblPaymentNo.textAlign = alignment;

}

function searchList() {
	var arrSearch = [];
	if ($.txtSearch.value.trim().length == 0) {
		arrSearch = paymentList;
	} else {

		arrSearch = paymentList.filter(function(obj) {
			return obj.payment_Number.indexOf($.txtSearch.value.trim()) != -1;
		});
	}
	loadPayments(arrSearch);
}

function loadPayments(paymentList) {
	var payment_Row = [];
	$.listSection.setItems([]);
	if (paymentList.length == 0) {
		$.lblNoRecord.visible = true;
	} else {
		$.lblNoRecord.visible = false;
	}
	//Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading);
	for (var i = 0,
	    length = paymentList.length; i < length; i++) {
		payment_Row.push({
			lblOrderNumber : {
				font : (Alloy.isTablet) ? Alloy.Globals.path.font18Bold : Alloy.Globals.path.font14Bold,
				text : paymentList[i].payment_Number
			},
			btnStatus : {
				font : (Alloy.isTablet) ? Alloy.Globals.path.font13Bold : Alloy.Globals.path.font11Bold,
				title : paymentList[i].currency + " " + paymentList[i].amout_Number,
			},
			imgUpDown : {
				image : Alloy.Globals.path.iconArrow2Down
			},
			lblEntityTitle : {
				font : (Alloy.isTablet) ? Alloy.Globals.path.font17 : Alloy.Globals.path.font12,
			},
			lblEntityValue : {
				font : (Alloy.isTablet) ? Alloy.Globals.path.font17 : Alloy.Globals.path.font12,
				text : paymentList[i].event_Name
			},
			lblPayDateTitle : {
				font : (Alloy.isTablet) ? Alloy.Globals.path.font17 : Alloy.Globals.path.font12,
			},
			lblPayDateValue : {
				font : (Alloy.isTablet) ? Alloy.Globals.path.font17 : Alloy.Globals.path.font12,
				text : paymentList[i].payment_Date == "" ? "-" : moment(paymentList[i].payment_Date).format("DD-MM-YYYY")
			},
			lblMethodTitle : {
				font : (Alloy.isTablet) ? Alloy.Globals.path.font17 : Alloy.Globals.path.font12
			},
			lblMethodValue : {
				font : (Alloy.isTablet) ? Alloy.Globals.path.font17 : Alloy.Globals.path.font12,
				text : paymentList[i].payment_Method
			},
			lblBankAccTitle : {
				font : (Alloy.isTablet) ? Alloy.Globals.path.font17 : Alloy.Globals.path.font12
			},
			lblBankAccValue : {
				font : (Alloy.isTablet) ? Alloy.Globals.path.font17 : Alloy.Globals.path.font12,
				text : paymentList[i].bank_Account_Name
			},
			properties : {
				isClicked : false
			}
		});

	}
	$.listSection.setItems(payment_Row);
	//Alloy.Globals.hideLoading();
}

$.tblPaymentList.addEventListener('itemclick', function(e) {
	var section = $.tblPaymentList.sections[e.sectionIndex];
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


$.winPayments.addEventListener("focus",function(e){
	$.viewBottomToolbar.setDefaultTheme($.winPayments);
});
$.viewBottomToolbar.setDefaultTheme($.winPayments);

/**
 * Adding the eventlistener for the bottom bar view
 *
 * @param {Object} e
 */
$.viewBottomToolbar.getView().addEventListener('click', function(e) {
	if (e.source.buttonId == 'btnFontChange') {
		$.viewBottomToolbar.changeFont($.winPayments);
	} else if (e.source.buttonId == 'btnSystemFeedback') {
		$.viewBottomToolbar.openFeedbackScreen(e);
	} else if(e.source.buttonId == 'btnSystemChangeTheme'){
		$.viewBottomToolbar.changeTheme($.winPayments);
	}
});

/**
 * Called on open of the window
 *
 * @param {Object} e
 */
var windowOpened = function(e) {
	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading);
	loadPayments(paymentList);
	Alloy.Globals.hideLoading();
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
