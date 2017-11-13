var args = arguments[0] || {};
var density;
Ti.API.info("TEST----->" + JSON.stringify(args));
if (OS_IOS) {
	density = "dp";
} else {
	density = "px";
}

if (Alloy.Globals.isIOS7Plus) {
	//	$.winDashboard.statusBarStyle = Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT;
	$.winWebView.extendEdges = [Ti.UI.EXTEND_EDGE_TOP];
	$.statusBar.height = 20;
}

function closeWindow() {
	Alloy.Globals.closeWindow($.winWebView);
}
function gotoHome(){
	Alloy.Globals.gotoHome();
}
function changeLanguage() {
	if (args.url.length == 0) {
		$.lblNoItemFound.text = Alloy.Globals.selectedLanguage.noItemsFound;
		$.webView.visible= false;
	} else {
		if(OS_ANDROID){
			$.webView.setCacheMode(Titanium.UI.Android.WEBVIEW_LOAD_NO_CACHE);	
		}
		$.webView.url = (Alloy.Globals.isEnglish) ? args.url : args.urlAr;
	}

	var alignment;
	if (Alloy.Globals.isEnglish) {
		alignment = Titanium.UI.TEXT_ALIGNMENT_LEFT;
		$.lblNavTitle.text = args.enName;

	} else {
		alignment = Titanium.UI.TEXT_ALIGNMENT_RIGHT;
		$.lblNavTitle.text = args.arName;
	}

}
$.webView.addEventListener("load",function(e){
	Alloy.Globals.hideLoading();
});
$.webView.addEventListener("error",function(e){
	Alloy.Globals.hideLoading();
});
changeLanguage();
$.winWebView.addEventListener("open", function(e) {
	Ti.Gesture.addEventListener("orientationchange", changeOrientation);
	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading, false);
	Alloy.Globals.arrWindows.push($.winWebView);
});
$.winWebView.addEventListener("close", function(e) {
	if(OS_ANDROID){
		$.webView.release();
	}
	Ti.Gesture.removeEventListener("orientationchange", changeOrientation);
	Alloy.Globals.arrWindows.pop();
	$.imgBackBtn = $.imgHomeBtn = $.webView = null;
});
var preOrientation = Ti.Gesture.orientation;
function changeOrientation(e) {
	if (preOrientation == e.orientation || e.orientation == 5) {
		return;
	}
	preOrientation = Ti.Gesture.orientation;
	if (Alloy.isTablet) {
		if(OS_ANDROID){
			$.webView.setCacheMode(Titanium.UI.Android.WEBVIEW_LOAD_NO_CACHE);	
		}
		Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading, false);
		$.webView.url = (Alloy.Globals.isEnglish) ? args.url : args.urlAr;
	}
}