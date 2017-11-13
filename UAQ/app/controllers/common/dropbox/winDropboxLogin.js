var args = arguments[0] || {};
/**
 * Window Opened
 * @param {Object} e
 */
function windowOpened(e) {
	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading);
	$.webviewDropbox.url = args.url;
};

/**
 * Close this window
 * @param {Object} e
 */
function closeWindow(e) {
	Ti.App.fireEvent('closeWinFileAndFoldersList');
	$.winDropboxLogin.close();
};

/**
 * Close this window on login timeout
 */
function closeWindowTimeout() {
	$.winDropboxLogin.close();
}

// App event listener for timeout of login
Ti.App.addEventListener('loginTimeout', closeWindowTimeout);
/**
 * Window Closed
 * @param {Object} e
 */
function windowClosed(e) {
	Alloy.Globals.hideLoading();
	// App event listener for timeout of login
	Ti.App.removeEventListener('loginTimeout', closeWindowTimeout);
	$.destroy();
};
