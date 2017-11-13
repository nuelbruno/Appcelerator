// var utilities = require("utilities");
// var httpManager = require("httpManager");
var args = arguments[0] || {};
$.lblNavTitle.text = Alloy.Globals.selectedLanguage.services;
$.webView.url = args.url;
var a = Ti.UI.createAlertDialog({
	title : Alloy.Globals.selectedLanguage.appTitle,
	message : Alloy.Globals.selectedLanguage.error_loading_eService_page,
	buttonNames : [Alloy.Globals.selectedLanguage.ok]
});
a.addEventListener('click', function(eA) {
	if (eA.index == 0){
		closeWindow();
	}
});
// var preLang = null;

// function changeLanguage() {
	// if (preLang == Alloy.Globals.language) {
		// return;
	// }
	// preLang = Alloy.Globals.language;
	// put the code into comment - start
	// $.viewLeftPanel.setLanguage();
	// $.viewHappinessIndicator.changeLanguage();
	// $.viewNotification.changeLanguage();
	// put the code into comment - end
	// $.lblNavTitle.text = Alloy.Globals.selectedLanguage.services;

	/*if (Alloy.Globals.isEnglish) {

		alignment = Titanium.UI.TEXT_ALIGNMENT_LEFT;
	} else {

		alignment = Titanium.UI.TEXT_ALIGNMENT_RIGHT;
	}*/
	// $.webView.url = "http://demoserver.tacme.net:3030/MOFDIGI/Portal/new-waiste-container-mobile.html";
	//$.webView.url = args.url;
// }

function winOpen(e) {
	Alloy.Globals.currentWindow = e.source.id;
	Alloy.Globals.arrWindows.push($.servicesWebView);
	// put the code into comment - start
	// $.viewNavigationTools.getView().win = $.mainView;
	// $.viewNavigationTools.setHappinessView($.viewHappinessIndicator.getView());
	// $.viewNavigationTools.setNotificationView($.viewNotification.getView());

	// $.viewLeftPanel.getView().changeLanguage = changeLanguage;
	// $.viewBottomMenu.getView().viewBack = $.backView;

	// $.viewNavigationTools.getView().transparentView = $.viewTransparent;
	// put the code into comment - end
	
	setTimeout(function(){
		Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading);
	},500);
	
}

function closeLeftPanel() {
	// put the code into comment - start
	// $.viewNavigationTools.onMenu();
}

function winFocus(e) {
	// put the code into comment - start
	// $.viewBottomMenu.addInnerMenu();
	
	// changeLanguage();
	// put the code into comment - start
	// $.viewLeftPanel.setMenuDirectionView({
	// direction : Alloy.Globals.SelectedMenuDirection,
	// menuCallback : undefined
	// });
	// put the code into comment - end
	// Alloy.Globals.manageEservicesNotification();
	// if (Alloy.Globals.url){
		// $.webView.url = Alloy.Globals.url;
		
	// }
}

function closeWindow() {
	// if (args.isFromMenu) {
		// Alloy.Globals.gotoHome();
		// return;
	// }
	
	try{
		Alloy.Globals.arrWindows.pop($.servicesWebView);
		$.servicesWebView.close();
	}catch(e){
		Ti.API.info('Window closing error..');
		$.servicesWebView.close();
	}
	
}


$.webView.addEventListener('beforeload', function(e) {
	Ti.API.info(' URL before load: ' + e.url);
	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading);
	var url = e.url;
	
	if (url.indexOf("proceedpayment.html?") != "-1" || url.indexOf("proceedpayment.html?") != -1) {
		Alloy.Globals.hideLoading();
		$.webView.stopLoading();
		
		url = url + "&acountId=" + Ti.App.Properties.getObject("LoginDetaisObj").accountID +
				    "&token=" + Ti.App.Properties.getObject("LoginDetaisObj").tokenCode +
				    "&typeOfUser=" + Ti.App.Properties.getObject("LoginDetaisObj").typeOfuser +
				    "&status=" + Ti.App.Properties.getObject("LoginDetaisObj").status +
				    "&username=" + Ti.App.Properties.getObject("LoginDetaisObj").userName;
		
		Ti.API.info('FULL(APPDENDED) URL FOR PAYMENT: '+url); 
		Ti.Platform.openURL(url);
		closeWindow();
	}
});
$.webView.addEventListener('load', function(e) {
	Ti.API.info('current widnow: '+Alloy.Globals.currentWindow);
	Alloy.Globals.hideLoading();
});

$.webView.addEventListener('error', function(e) {
	Alloy.Globals.hideLoading();
	a.show();
});
if (OS_ANDROID){
	$.webView.addEventListener('sslerror', function(e) {
		Ti.API.info('SSL ERROR OCCUR:: '+JSON.stringify(e));
	});	
}

Alloy.Globals.returnbackURL=null;