var args = arguments[0] || {};

if (Alloy.Globals.isIOS7Plus) {
	$.statusBar.height = 20;
	//$.statusBar.backgroundColor = Alloy.Globals.path.bgColor;
}

var isEnglish = (Alloy.Globals.isVATTAXModuleActive) ? Alloy.Globals.VATTAXisEnglish : Alloy.Globals.isEnglish;
var selectedLanguage = (Alloy.Globals.isVATTAXModuleActive) ? Alloy.Globals.VTaxSelectedLanguage :  Alloy.Globals.selectedLanguage;

$.lblNavTitle.text = selectedLanguage.useDropbox;
$.logoutButton.title = selectedLanguage.logout;

/**
 * Show/ Hide the subfolders of scrollend event
 *
 * @param {Object} e
 */
var showHideSubFolders = function(e) {
	if ($.scrollableview.currentPage < $.scrollableview.views.length) {
		for (var i = ($.scrollableview.currentPage + 1); i < $.scrollableview.views.length; i++) {
			$.scrollableview.removeView($.scrollableview.views[i]);
		}
	}

};

/**
 * Get the delta information in root folder of the dropbox
 *
 * @param {Object}e
 */
var getDelta = function(e) {
	Alloy.Globals.client.delta({}, function(status, response) {
		Alloy.Globals.hideLoading();
		Ti.API.info(status);
		Ti.API.info('Response : ' + JSON.stringify(response));
		var data = [];
		for (var key in response.entries) {
			var folderName = (response.entries[key][1]['path'].replace('/', '')).split('/');
			Ti.API.info('Folder Name : ' + folderName + ' Length : ' + folderName.length);
			if (folderName.length == 1) {
				data.push(response.entries[key][1]);
			}
		}
		$.scrollableview.addView(Alloy.createController('common/dropbox/tableviewFilesAndFoldersList', {
			folderListIndex : 1,
			data : data,
			callback : args.callback
		}).getView());
	});
};

/**
 * Log out from dropbox
 * @param {Object} e
 */
var logoutDropbox = function(e) {
	Alloy.Globals.client.logout(function(loginOptions) {
		// Getting the dropbox client
		Alloy.Globals.createDropboxClient();
		Ti.API.info('Dropbox Logged out success : ' + JSON.stringify(loginOptions));
		$.winFilesAndFoldersList.close();
	});
};

/**
 * Close this window
 * @param {Object} e
 */
var closeWindow = function(e) {
	if ($.scrollableview.currentPage == 0) {
		Alloy.Globals.hideLoading();
		$.winFilesAndFoldersList.close();
	} else {
		$.scrollableview.currentPage = $.scrollableview.currentPage - 1;
	}
};

/**
 * Window Opened
 * @param {Object} e
 */
var windowOpened = function(e) {
	
	Alloy.Globals.showLoading(selectedLanguage.loading);
	
	if (Alloy.Globals.client.isAuthorized()) {
		$.logoutButton.visible = true;
		getDelta();
	} else {

		Alloy.Globals.client.login(function(loginOptions) {
			Ti.API.info('Dropbox Logged in success : ' + JSON.stringify(loginOptions));
			$.logoutButton.visible = true;
			getDelta();
		});
	}
};

Ti.App.addEventListener('closeWinFileAndFoldersList', closeWindow);

/**
 * Window Closed
 * @param {Object} e
 */
var windowClosed = function(e) {
	Ti.App.removeEventListener('closeWinFileAndFoldersList', closeWindow);
	$.destroy();
};

if (OS_ANDROID) {
	$.winFilesAndFoldersList.addEventListener("androidback", function(e) {
		closeWindow();
	});
}
