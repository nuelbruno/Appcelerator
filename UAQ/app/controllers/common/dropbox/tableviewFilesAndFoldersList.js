var args = arguments[0] || {};
var utilities = require('utilities');
$.tableviewFilesAndFoldersList.folderListIndex = args.folderListIndex;
var rows = [];
var extension;
for (var key in args.data) {
	var folderName = (args.data[key]['path'].replace('/', '')).split('/');
	var mimeType = (args.data[key].mime_type, "");
	if (folderName.length == $.tableviewFilesAndFoldersList.folderListIndex || args.data[key]['is_dir'] == true) {
		var row = Alloy.createController('common/dropbox/tableviewRowFileOrFolder', {
			folderData : args.data[key],
			mimeType : mimeType
		}).getView();
		rows.push(row);
	}
}
$.tableviewFilesAndFoldersList.setData(rows);
$.tableviewFilesAndFoldersList.addrowCount = rows.length;

/**
 * tableview Clicked
 * @param {Object} e
 */
var tableviewClicked = function(e) {
	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading);
	if (e.row.isDir == false) {
		Alloy.Globals.client.get(e.row.path, {}, function(status, reply) {
			Alloy.Globals.hideLoading();
			if (status == false) {
				utilities.showAlert("Error");
			} else {
				if ( typeof args.closeWindow == 'function') {
					args.closeWindow({
						imageselected : true
					});
				}
				var stp = setTimeout(function() {
					var responseHeader = reply.getResponseHeader('Content-Type');
					args.callback(reply.responseData, (responseHeader == 'application/pdf'));
				}, 300);
			}
		});
	} else {
		Alloy.Globals.client.metadata(e.row.path, {
			file_limit : 10000,
			list : true,
			include_deleted : false,
			root : 'dropbox'
		}, function(status, reply) {
			if (status) {
				Alloy.Globals.hideLoading();
				var tableview = Alloy.createController('common/dropbox/tableviewFilesAndFoldersList', {
					folderListIndex : 1 + $.tableviewFilesAndFoldersList.folderListIndex,
					data : reply.contents,
					callback : args.callback,
					closeWindow : args.closeWindow
				}).getView();
				if (tableview.addrowCount > 0) {
					$.tableviewFilesAndFoldersList.parent.addView(tableview);
					$.tableviewFilesAndFoldersList.parent.currentPage = ($.tableviewFilesAndFoldersList.parent).views.length - 1;
				}
			} else {
				utilities.showAlert("Error in Metadata");
			}
		});
	}
};
