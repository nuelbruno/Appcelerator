var args = arguments[0] || {};
var moment = require('alloy/moment');
if (Alloy.Globals.isIOS7Plus) {
	//$.winPurchaseOrder.extendEdges = [Ti.UI.EXTEND_EDGE_TOP];
	$.statusBar.height = 20;
}

function closeWindow() {
	Alloy.Globals.closeWindow($.winTendersDetails);
	//$.winISupplierHome.close();
}

function changeLanguage() {
	$.lblNavTitle.text = Alloy.Globals.selectedLanguage.tenderBidsProcurements;
	$.lblEventTit.text = Alloy.Globals.selectedLanguage.eventName;
	$.lblEventVal.text = args.event_Name;
	$.lblTitleTit.text = Alloy.Globals.selectedLanguage.title;
	$.lblTitleVal.text = args.title;
	$.lblDescTit.text = Alloy.Globals.selectedLanguage.descriptionTitle;
	$.lblDescVal.text = args.description.trim();
	$.lblOpenDateTit.text = Alloy.Globals.selectedLanguage.openDate;
	$.lblOpenDateVal.text = moment(args.open_Date).format("DD-MM-YYYY");
	$.lblCloseDateTit.text = Alloy.Globals.selectedLanguage.closeDate;
	$.lblCloseDateVal.text = moment(args.close_Date).format("DD-MM-YYYY");
	$.lblPriceTit.text = Alloy.Globals.selectedLanguage.price;
	$.lblPriceVal.text = args.price;
	$.lblNumberTit.text = Alloy.Globals.selectedLanguage.Number;
	$.lblNumberVal.text = args.Number;
	var alignment;
	if (Alloy.Globals.isEnglish) {
		alignment = Ti.UI.TEXT_ALIGNMENT_LEFT;
	} else {
		alignment = Ti.UI.TEXT_ALIGNMENT_RIGHT;
	}
	$.lblEventTit.textAlign = $.lblEventVal.textAlign = $.lblTitleTit.textAlign = $.lblTitleVal.textAlign = $.lblDescTit.textAlign = alignment;
	$.lblDescVal.textAlign = $.lblOpenDateTit.textAlign = $.lblOpenDateVal.textAlign = $.lblCloseDateTit.textAlign = alignment;
	$.lblCloseDateVal.textAlign = $.lblPriceTit.textAlign = $.lblPriceVal.textAlign = $.lblNumberTit.textAlign = $.lblNumberVal.textAlign = alignment;
}

changeLanguage();


$.winTendersDetails.addEventListener("focus",function(e){
	$.viewBottomToolbar.setDefaultTheme($.winTendersDetails);
});
$.viewBottomToolbar.setDefaultTheme($.winTendersDetails);

/**
 * Adding the eventlistener for the bottom bar view
 *
 * @param {Object} e
 */
$.viewBottomToolbar.getView().addEventListener('click', function(e) {
	if (e.source.buttonId == 'btnFontChange') {
		$.viewBottomToolbar.changeFont($.winTendersDetails);
	} else if (e.source.buttonId == 'btnSystemFeedback') {
		$.viewBottomToolbar.openFeedbackScreen(e);
	} else if(e.source.buttonId == 'btnSystemChangeTheme'){
		$.viewBottomToolbar.changeTheme($.winTendersDetails);
	}
});

/**
 * Called on open of the window
 *
 * @param {Object} e
 */
var windowOpened = function(e) {
	$.viewBottomToolbar.setOptions({
		showThemeButton : true,
		showInstructions : false,
		showFeedBack : true,
		showFontResize : true
	});
};

/**
 * Window is closed
 * 
 * @param {Object} e
 */
var windowClosed = function(e){
	$.destroy();
};