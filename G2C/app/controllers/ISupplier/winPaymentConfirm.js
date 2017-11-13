var httpManager = require("httpManager");//Alloy.createController('common/httpManager');

var args = arguments[0];

if (Alloy.Globals.isIOS7Plus) {
	//$.winPurchaseOrder.extendEdges = [Ti.UI.EXTEND_EDGE_TOP];
	$.statusBar.height = 20;
}

function closeWindow() {
	Alloy.Globals.closeWindow($.winPaymentConfirm);
	//$.winISupplierHome.close();
}

function submitPayment(){
	
	httpManager.submitMSupplierPayment(function(e){
		
		
		
	});
	
	
}


function changeLanguage() {
	$.lblThankYou.text = Alloy.Globals.selectedLanguage.thankYouConfirmPayment;
	$.lblNavTitle.text = Alloy.Globals.selectedLanguage.addNewUser;
}

changeLanguage();

$.winPaymentConfirm.addEventListener("focus",function(e){
	$.viewBottomToolbar.setDefaultTheme($.winPaymentConfirm);
});
$.viewBottomToolbar.setDefaultTheme($.winPaymentConfirm);

/**
 * Adding the eventlistener for the bottom bar view
 *
 * @param {Object} e
 */
$.viewBottomToolbar.getView().addEventListener('click', function(e) {
	if (e.source.buttonId == 'btnFontChange') {
		$.viewBottomToolbar.changeFont($.winPaymentConfirm);
	} else if (e.source.buttonId == 'btnSystemFeedback') {
		$.viewBottomToolbar.openFeedbackScreen(e);
	} else if(e.source.buttonId == 'btnSystemChangeTheme'){
		$.viewBottomToolbar.changeTheme($.winPaymentConfirm);
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
