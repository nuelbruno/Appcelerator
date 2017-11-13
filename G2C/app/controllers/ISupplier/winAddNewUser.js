var httpManager = require("httpManager");//Alloy.createController('common/httpManager');

var args = arguments[0] || {};

var arr = args;

if (Alloy.Globals.isIOS7Plus) {
	//$.winPurchaseOrder.extendEdges = [Ti.UI.EXTEND_EDGE_TOP];
	$.statusBar.height = 20;
}

function closeWindow() {
	Alloy.Globals.closeWindow($.winAddNewUser);
	//$.winISupplierHome.close();
}

function addNewUser() {

	var isFromUserSatisfaction = false;

	var win = Alloy.createController("UserSatisfaction/winUserSatisfactionConfirm", isFromUserSatisfaction).getView();
	Alloy.Globals.openWindow(win);

}

function changeLanguage() {

	$.lblNavTitle.text = Alloy.Globals.selectedLanguage.addNewUser;

	$.lblUserName.text = Alloy.Globals.selectedLanguage.userName;
	$.lblEmail.text = Alloy.Globals.selectedLanguage.emailAddress;
	$.lblMobile.text = Alloy.Globals.selectedLanguage.mobileNumber;

	if (Alloy.Globals.isEnglish) {

		$.lblUserName.left = $.lblEmail.left = $.lblMobile.left = "2%";
		$.colonUserName.left = $.colonEmail.left = $.colonMobile.left = "44%";
		$.txtUserName.right = $.txtEmail.right = $.txtMobile.right = "2%";

		$.lblUserName.right = $.lblEmail.right = $.lblMobile.right = undefined;
		$.colonUserName.right = $.colonEmail.right = $.colonMobile.right = undefined;
		$.txtUserName.left = $.txtEmail.left = $.txtMobile.left = undefined;

	} else {

		$.lblUserName.right = $.lblEmail.right = $.lblMobile.right = "2%";
		$.colonUserName.right = $.colonEmail.right = $.colonMobile.right = "44%";
		$.txtUserName.left = $.txtEmail.left = $.txtMobile.left = "2%";

		$.lblUserName.left = $.lblEmail.left = $.lblMobile.left = undefined;
		$.colonUserName.left = $.colonEmail.left = $.colonMobile.left = undefined;
		$.txtUserName.right = $.txtEmail.right = $.txtMobile.right = undefined;

	}

}

changeLanguage();

$.winAddNewUser.addEventListener("focus",function(e){
	$.viewBottomToolbar.setDefaultTheme($.winAddNewUser);
});
$.viewBottomToolbar.setDefaultTheme($.winAddNewUser);

/**
 * Adding the eventlistener for the bottom bar view
 *
 * @param {Object} e
 */
$.viewBottomToolbar.getView().addEventListener('click', function(e) {
	if (e.source.buttonId == 'btnFontChange') {
		$.viewBottomToolbar.changeFont($.winAddNewUser);
	} else if (e.source.buttonId == 'btnSystemFeedback') {
		$.viewBottomToolbar.openFeedbackScreen(e);
	} else if(e.source.buttonId == 'btnSystemChangeTheme'){
		$.viewBottomToolbar.changeTheme($.winAddNewUser);
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



