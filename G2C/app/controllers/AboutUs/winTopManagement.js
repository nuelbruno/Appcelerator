var args = arguments[0] || {};

var density;
var isExpand = false;
if (OS_IOS) {
	density = "dp";
} else {
	density = "px";
}

if (Alloy.Globals.isIOS7Plus) {
	$.winTopManagement.extendEdges = [Ti.UI.EXTEND_EDGE_TOP];
	$.statusBar.height = 20;
}

function closeWindow() {
	Alloy.Globals.closeWindow($.winTopManagement);
}

function gotoHome() {
	Alloy.Globals.gotoHome();
}

function changeLanguage() {
	$.lblNavTitle.text = args.replace("_", "&");
}

/*$.winTopManagement.addEventListener("open", function(e) {

 Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading, false);

 Alloy.Globals.arrWindows.push($.winTopManagement);
 var randomStr = Math.random().toString(36).substring(7);

 if (Alloy.isTablet) {
 if (Alloy.Globals.isEnglish) {
 $.webView.url = "http://194.170.30.187/Guides/AboutUs/HTML/TopManagement_en_Tablet.html?" + randomStr;
 } else {
 $.webView.url = "http://194.170.30.187/Guides/AboutUs/HTML/TopManagement_ar_Tablet.html?" + randomStr;
 }
 } else {
 if (Alloy.Globals.isEnglish) {
 $.webView.url = "http://194.170.30.187/Guides/AboutUs/HTML/TopManagement_en.html?" + randomStr;
 } else {
 $.webView.url = "http://194.170.30.187/Guides/AboutUs/HTML/TopManagement_ar.html?" + randomStr;
 }
 }

 });*/

$.webView.addEventListener("load", function(e) {
	Alloy.Globals.hideLoading();
});

var preOrientation = undefined;
function changeOrientation(e) {
	if (preOrientation == e.orientation || e.orientation == 5) {
		return;
	}
	preOrientation = Ti.Gesture.orientation;
	if (Alloy.isTablet) {
		var randomStr = Math.random().toString(36).substring(7);
		if (Alloy.Globals.isEnglish) {
			$.webView.url = Alloy.Globals.SOADomainUrl + "Guides/AboutUs/HTML/TopManagement_en_Tablet.html?" + randomStr;
		} else {
			$.webView.url = Alloy.Globals.SOADomainUrl + "Guides/AboutUs/HTML/TopManagement_ar_Tablet.html?" + randomStr;
		}
	}
}

changeLanguage();
/*$.winTopManagement.addEventListener("close", function(e) {
Alloy.Globals.arrWindows.pop();
$.imgBackBtn = $.imgHomeBtn = $.webView = null;
});*/

/**
 * Adding the eventlistener for the bottom bar view
 *
 * @param {Object} e
 */
$.viewBottomToolbar.getView().addEventListener('click', function(e) {
	if (e.source.buttonId == 'btnFontChange') {
		$.viewBottomToolbar.changeFont($.winTopManagement);
	} else if (e.source.buttonId == 'btnSystemFeedback') {
		$.viewBottomToolbar.openFeedbackScreen(e);
	} else if (e.source.buttonId == 'btnSystemInstruction') {
		$.viewInstructions.openHelpScreen(e);
	} else if (e.source.buttonId == 'btnSystemChangeTheme') {
		if (Alloy.Globals.currentTheme == "dark") {
			$.webView.backgroundColor = "white";
		} else {
			$.webView.backgroundColor = "black";
		}
		$.viewBottomToolbar.changeTheme($.winTopManagement);
	}
});
$.winTopManagement.addEventListener("focus", function(e) {
	if (Alloy.Globals.currentTheme == "dark") {
		$.webView.backgroundColor = "black";
	} else {
		$.webView.backgroundColor = "white";
	}
	$.viewBottomToolbar.setDefaultTheme($.winTopManagement);
});
$.viewBottomToolbar.setDefaultTheme($.winTopManagement);

/**
 * Called on open of the window
 *
 * @param {Object} e
 */
var windowOpened = function(e) {
	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading, false);

	Alloy.Globals.arrWindows.push($.winTopManagement);
	var randomStr = Math.random().toString(36).substring(7);

	if (Alloy.isTablet) {
		if (Alloy.Globals.isEnglish) {
			$.webView.url = Alloy.Globals.SOADomainUrl + "Guides/AboutUs/HTML/TopManagement_en_Tablet.html?" + randomStr;
		} else {
			$.webView.url = Alloy.Globals.SOADomainUrl + "Guides/AboutUs/HTML/TopManagement_ar_Tablet.html?" + randomStr;
		}
	} else {
		if (Alloy.Globals.isEnglish) {
			$.webView.url = Alloy.Globals.SOADomainUrl + "Guides/AboutUs/HTML/TopManagement_en.html?" + randomStr;
		} else {
			$.webView.url = Alloy.Globals.SOADomainUrl + "Guides/AboutUs/HTML/TopManagement_ar.html?" + randomStr;
		}
	}
	$.viewBottomToolbar.setOptions({
		showInstructions : false,
		showFeedBack : true,
		showFontResize : false,
	});
};

/**
 * Window is closed
 *
 * @param {Object} e
 */
var windowClosed = function(e) {
	Alloy.Globals.arrWindows.pop();
	$.imgBackBtn = $.imgHomeBtn = $.webView = null;
	$.destroy();
};
