Alloy.Globals.SetModelWindow($.winDropboxLogin);

var args = arguments[0] || {};

if (Alloy.Globals.isIOS7Plus) {
	$.statusBar.height = 20;
	//$.statusBar.backgroundColor = Alloy.Globals.path.bgColor;
}

var isEnglish = (Alloy.Globals.isVATTAXModuleActive) ? Alloy.Globals.VATTAXisEnglish : Alloy.Globals.isEnglish;
var selectedLanguage = (Alloy.Globals.isVATTAXModuleActive) ? Alloy.Globals.VTaxSelectedLanguage :  Alloy.Globals.selectedLanguage;

$.lblNavTitle.text = selectedLanguage.useDropbox;

/**
 * Window Opened
 * @param {Object} e
 */
var windowOpened = function(e) {
	Alloy.Globals.showModelLoading(selectedLanguage.loading);
	$.dropboxWebView.url = args.url;
};

$.dropboxWebView.addEventListener("load",function(e){
	Alloy.Globals.hideModelLoading();
});

/**
 * Close this window
 * @param {Object} e
 */
var closeWindow = function(e) {
	Ti.App.fireEvent('closeWinFileAndFoldersList');
	$.winDropboxLogin.close();
};

/**
 * Window Closed
 * @param {Object} e
 */
var windowClosed = function(e) {
	$.destroy();
};
