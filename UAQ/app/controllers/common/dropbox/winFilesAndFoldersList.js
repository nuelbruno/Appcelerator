var args = arguments[0] || {};
//Alloy.Globals.SetMainWindow($.winFilesAndFoldersList);
// Utilities
var utilities = require('utilities');
// Http Manager
var httpManager = require('httpManager');

$.lblNavTitle.text = Alloy.Globals.selectedLanguage.dropbox;

/**
 * Show/ Hide the subfolders of scrollend event
 * @param {Object} e
 */
function showHideSubFolders(e) {
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
function getDelta(e) {
	Alloy.Globals.client.delta({}, function(status, response) {
		Alloy.Globals.hideLoading();
		if (status) {
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

			var tableview = Alloy.createController('common/dropbox/tableviewFilesAndFoldersList', {
				folderListIndex : 1,
				data : data,
				callback : args.callback,
				closeWindow : closeWindow
			}).getView();
			Ti.API.info('Row Count: ' + tableview.addrowCount);
			if (tableview.addrowCount > 0) {
				$.scrollableview.addView(tableview);
			}
		} else {
			utilities.showAlert("Error in Delta");
		}
	});
};

/**
 * Log out from dropbox
 * @param {Object} e
 */
var logoutDropbox = function(e) {
	Alloy.Globals.client.logout(function(loginOptions) {
		var st = setTimeout(Alloy.Globals.createDropboxClient, 100);
		// Getting the dropbox client
		Ti.API.info('Dropbox Logged out success : ' + JSON.stringify(loginOptions));
		$.winFilesAndFoldersList.close();
	});
};

/**
 * Close this window
 * @param {Object} e
 */
function closeWindow(e) {
	Ti.API.info('Close window: ' + JSON.stringify(e));
	if (e.imageselected == true || $.scrollableview.currentPage == 0) {
		$.winFilesAndFoldersList.close();
	} else {
		$.scrollableview.currentPage = $.scrollableview.currentPage - 1;
	}
};

/**
 * Window Opened
 * @param {Object} e
 */
function windowOpened(e) {
	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading);
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
 * Close this window on login timeout
 */
function closeWindowTimeout() {
	$.winFilesAndFoldersList.close();
}

// App event listener for timeout of login
Ti.App.addEventListener('loginTimeout', closeWindowTimeout);
/**
 * Window Closed
 * @param {Object} e
 */
function windowClosed(e) {
	Ti.App.removeEventListener('closeWinFileAndFoldersList', closeWindow);
	// App event listener for timeout of login
	Ti.App.removeEventListener('loginTimeout', closeWindowTimeout);
	Alloy.Globals.hideLoading();
	$.destroy();
};

