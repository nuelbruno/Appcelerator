
if (Alloy.Globals.isIOS7Plus) {
	$.winmChatting.extendEdges = [Ti.UI.EXTEND_EDGE_TOP];
	$.statusBar.height = 20;
}

function changeLanguage(){
	
	$.lblNavTitle.text = Alloy.Globals.selectedLanguage.mChatting;	
}

function closeWindow() {
	$.winmChatting.close({
		animate : true
	});
}

$.winmChatting.addEventListener("focus",function(e){
	$.viewBottomToolbar.setDefaultTheme($.winmChatting);
});
$.viewBottomToolbar.setDefaultTheme($.winmChatting);

/**
 * Adding the eventlistener for the bottom bar view
 *
 * @param {Object} e
 */
$.viewBottomToolbar.getView().addEventListener('click', function(e) {
	if (e.source.buttonId == 'btnFontChange') {
		$.viewBottomToolbar.changeFont($.winmChatting);
	} else if (e.source.buttonId == 'btnSystemFeedback') {
		$.viewBottomToolbar.openFeedbackScreen(e);
	} else if(e.source.buttonId == 'btnSystemChangeTheme'){
		$.viewBottomToolbar.changeTheme($.winmChatting);
	}
});

/**
 * Called on open of the window
 *
 * @param {Object} e
 */
var windowOpened = function(e) {
	$.webView.url = "http://demoserver.tacme.net:3030/MOFDIGI/mChatting/index.html";
	
	$.viewBottomToolbar.setOptions({
		showThemeButton : true,
		showInstructions : false,
		showFeedBack : true,
		showFontResize : false
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

changeLanguage();