var httpManager = require("httpManager");//Alloy.createController('common/httpManager');
Alloy.Globals.SetMainWindow($.winLogin);
// Alloy.Globals.changeLanguage("english");

function hasConnection() {
	if (Ti.Network.online == false) {
		Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.networkError, Alloy.Globals.selectedLanguage.noInternet);
		return false;
	}
	return true;
}

hasConnection();

function doLogin() {
	var winHome = Alloy.createController("winHome").getView();
	var tab = Ti.UI.createTab({
		window : winHome
	});
	var tabGroup = Ti.UI.createTabGroup({
		tabs : [tab]
	});
	if (Alloy.Globals.isIOS7Plus) {
		tabGroup.top = 20;
		tabGroup.statusBarStyle = Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT;
	}
	Alloy.Globals.SetMainWindow(tabGroup);
	Alloy.Globals.tab = tab;
	tabGroup.open();
}

function showForgotPasswordView() {
	$.backView.visible = true;
	$.forgotPasswordView.visible = true;
}

function closeForgotPasswordView() {
	$.backView.visible = false;
	$.forgotPasswordView.visible = false;
	$.txtAdmin.value = "";
	$.txtCall.value = "";
	$.txtAdmin.blur();
	$.txtCall.blur();
}

function openRegistration() {
	
	var winRegistration = Alloy.createController("winRegistration").getView();
	if(OS_IOS){
		winRegistration.open({
			modal : true
		});
	}else{
		winRegistration.open();
	}
	
};

$.winLogin.open(); 