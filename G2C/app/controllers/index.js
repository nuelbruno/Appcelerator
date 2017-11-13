var httpManager = require("httpManager");//Alloy.createController('common/httpManager');

function hasConnection() {
	if (Ti.Network.online == false) {
		Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.networkError, Alloy.Globals.selectedLanguage.noInternet);
		return false;
	}
	return true;
}


Ti.App.iOS.addEventListener("watchkitextensionrequest",function(e){
    var myReplyContent = {foo:"bar"};
    Ti.App.iOS.sendWatchExtensionReply(e.handlerId,myReplyContent);
	alert(e);
	
	Ti.Platform.openURL("urlschemademo://");
	
});


//hasConnection();

if (Alloy.Globals.isiOS7Plus) {
	$.tabGroup.top = 20;
	$.tabGroup.statusBarStyle = Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT;
}


if (OS_IOS) {
	Alloy.Globals.tab = $.tab1;
	Alloy.Globals.SetMainWindow($.tabGroup);
	$.tabGroup.open();
} else {

	var winHome = Alloy.createController("winHome").getView();
	Alloy.Globals.SetMainWindow(winHome);
	winHome.open();

}

