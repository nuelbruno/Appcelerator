var httpManager = require("httpManager");
//Alloy.createController('common/httpManager');
var args = arguments[0] || {};
var density;
/*var strUrl = "";
 var inquiryId;
 if (args.url.length > 0) {
 strUrl = args.url;
 inquiryId = strUrl.substring(strUrl.indexOf("IID"),strUrl.length );
 }*/

if (OS_IOS) {
	density = "dp";
} else {
	density = "px";
}

if (Alloy.Globals.isIOS7Plus) {
	//	$.winDashboard.statusBarStyle = Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT;
	$.winVatTaxWeb.extendEdges = [Ti.UI.EXTEND_EDGE_TOP];
	$.statusBar.height = 20;
}

function closeWindow() {
	if (args.callBack != undefined) {
		args.callBack();
	}
	Alloy.Globals.closeWindow($.winVatTaxWeb);
}

function gotoHome() {
	Alloy.Globals.gotoHome();
}

function closePopUP() {
	closeWindow();
}

function openUserSatisfaction() {
	httpManager.getUserSatisfactionQuestions(function(e) {
		if (e == null) {
			return;
		}
		var win = Alloy.createController("UserSatisfaction/winUserSatisfaction", {
			callBack : closeWindow,
			data : e,
			serviceID : 5
		}).getView();
		Alloy.Globals.openWindow(win);

	});
}

function submitTax() {
	$.backView.show();
	$.popView.show();
}

function changeLanguage() {
	$.btnSubmit.title = Alloy.Globals.selectedLanguage.submitTitle;
	$.lblUserSatisfaction.text = Alloy.Globals.selectedLanguage.userSatisfaction;
	$.lblSuggestion.text = Alloy.Globals.selectedLanguage.userSatisfactionSuggestion;
	$.lblFeedback.text = Alloy.Globals.selectedLanguage.yes;
	$.lblSkip.text = Alloy.Globals.selectedLanguage.skip;
	var alignment;
	if (Alloy.Globals.isEnglish) {
		alignment = Titanium.UI.TEXT_ALIGNMENT_LEFT;
		$.lblNavTitle.text = args.enName;
		
		$.lblFeedback.left = $.lblSkip.right = 0;
		
	} else {
		alignment = Titanium.UI.TEXT_ALIGNMENT_RIGHT;
		$.lblNavTitle.text = args.arName;
		
		$.lblFeedback.right = $.lblSkip.left = 0;
	}

}

/*function getTransactionDetail(){
 httpManager.getTransactionId(inquiryId,function(obj){
 Ti.API.info('TRANSACTION DETAIL = ' + JSON.stringify(obj));
 });
 }*/

$.winVatTaxWeb.addEventListener("focus",function(e){
	$.viewBottomToolbar.setDefaultTheme($.winVatTaxWeb);
});
$.viewBottomToolbar.setDefaultTheme($.winVatTaxWeb);

/**
 * Adding the eventlistener for the bottom bar view
 *
 * @param {Object} e
 */
$.viewBottomToolbar.getView().addEventListener('click', function(e) {
	if (e.source.buttonId == 'btnFontChange') {
		$.viewBottomToolbar.changeFont($.winVatTaxWeb);
	} else if (e.source.buttonId == 'btnSystemFeedback') {
		$.viewBottomToolbar.openFeedbackScreen(e);
	} else if (e.source.buttonId == 'btnSystemInstruction') {
		$.viewInstructions.openHelpScreen(e);
	} else if (e.source.buttonId == 'btnSystemChangeTheme') {
		$.viewBottomToolbar.changeTheme($.winVatTaxWeb);
	}
});

$.winVatTaxWeb.addEventListener("open", function(e) {
	Alloy.Globals.arrWindows.push($.winVatTaxWeb);
	$.viewBottomToolbar.setOptions({
		showThemeButton : true,
		showInstructions : false,
		showFeedBack : true,
		showFontResize : true
	});
});
$.winVatTaxWeb.addEventListener("close", function(e) {
	Alloy.Globals.arrWindows.pop();
	$.imgBackBtn = $.imgHomeBtn = $.webView = null;
	$.destroy();
});
changeLanguage();
