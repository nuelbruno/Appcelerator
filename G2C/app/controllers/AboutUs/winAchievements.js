var args = arguments[0] || {};
if (Alloy.Globals.isIOS7Plus) {
	$.winAchievements.extendEdges = [Ti.UI.EXTEND_EDGE_TOP];
	$.statusBar.height = 20;
}

function closeWindow() {
	Alloy.Globals.closeWindow($.winAchievements);
}

function gotoHome() {
	Alloy.Globals.gotoHome();
}

function changeLanguage() {
	$.lblNavTitle.text = args;
}

/*$.winAchievements.addEventListener("open", function(e) {

 Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading, false);

 Alloy.Globals.arrWindows.push($.winAchievements);
 var randomStr = Math.random().toString(36).substring(7);
 if (Alloy.isTablet) {
 if (Alloy.Globals.isEnglish) {
 $.webView.url = "http://194.170.30.187/Guides/AboutUs/HTML/Achievements_en_Tablet.html?" + randomStr;
 } else {
 $.webView.url = "http://194.170.30.187/Guides/AboutUs/HTML/Achievements_ar_Tablet.html?" + randomStr;
 }
 } else {
 if (Alloy.Globals.isEnglish) {
 $.webView.url = "http://194.170.30.187/Guides/AboutUs/HTML/Achievements_en.html?" + randomStr;
 } else {
 $.webView.url = "http://194.170.30.187/Guides/AboutUs/HTML/Achievements_ar.html?" + randomStr;
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
		Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading, false);
		if (Alloy.Globals.isEnglish) {
			$.webView.url = Alloy.Globals.SOADomainUrl + "Guides/AboutUs/HTML/Achievements_en_Tablet.html?" + randomStr;
		} else {
			$.webView.url = Alloy.Globals.SOADomainUrl + "Guides/AboutUs/HTML/Achievements_ar_Tablet.html?" + randomStr;
		}
	}
}

/*$.winAchievements.addEventListener("close", function(e) {
 Alloy.Globals.arrWindows.pop();
 $.imgBackBtn = $.imgHomeBtn = $.imgShareBtn = $.webView = null;
 });*/

$.winAchievements.addEventListener("focus", function(e) {
	if (Alloy.Globals.currentTheme == "dark") {
		$.webView.backgroundColor = "black";
	} else {
		$.webView.backgroundColor = "white";
	}
	$.viewBottomToolbar.setDefaultTheme($.winAchievements);
});
$.viewBottomToolbar.setDefaultTheme($.winAchievements);

/**
 * Adding the eventlistener for the bottom bar view
 *
 * @param {Object} e
 */
$.viewBottomToolbar.getView().addEventListener('click', function(e) {
	if (e.source.buttonId == 'btnFontChange') {
		$.viewBottomToolbar.changeFont($.winAchievements);
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
		$.viewBottomToolbar.changeTheme($.winAchievements);
	}
});
/**
 * Called on open of the window
 *
 * @param {Object} e
 */
var windowOpened = function(e) {
	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading, false);

	Alloy.Globals.arrWindows.push($.winAchievements);
	var randomStr = Math.random().toString(36).substring(7);
	if (Alloy.isTablet) {
		if (Alloy.Globals.isEnglish) {
			$.webView.url = Alloy.Globals.SOADomainUrl + "Guides/AboutUs/HTML/Achievements_en_Tablet.html?" + randomStr;
		} else {
			$.webView.url = Alloy.Globals.SOADomainUrl + "Guides/AboutUs/HTML/Achievements_ar_Tablet.html?" + randomStr;
		}
	} else {
		if (Alloy.Globals.isEnglish) {
			$.webView.url = Alloy.Globals.SOADomainUrl + "Guides/AboutUs/HTML/Achievements_en.html?" + randomStr;
		} else {
			$.webView.url = Alloy.Globals.SOADomainUrl + "Guides/AboutUs/HTML/Achievements_ar.html?" + randomStr;
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
	$.imgBackBtn = $.imgHomeBtn = $.imgShareBtn = $.webView = null;
	$.destroy();
};

changeLanguage(); 