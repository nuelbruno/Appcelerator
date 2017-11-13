var args = arguments[0] || {};

$.tableviewFilesAndFoldersList.folderListIndex = args.folderListIndex;
var rows = [];
var extension;
for (var key in args.data) {
	var folderName = (args.data[key]['path'].replace('/', '')).split('/');
	if (args.data[key]['is_dir'] == false) {
		var fileName = args.data[key]['path'].replace('/', '');
		fileName = fileName.split('/');
		fileName = fileName[fileName.length - 1];
		extension = fileName.split('.')[1];
	}
	Ti.API.info('Folder Name : ' + folderName + ' Length : ' + folderName.length);
	if ((folderName.length == $.tableviewFilesAndFoldersList.folderListIndex) && (extension == 'pdf' || args.data[key]['is_dir'] == true)) {
		var row = Alloy.createController('common/dropbox/tableviewRowFileOrFolder', {
			folderData : args.data[key]
		}).getView();
		rows.push(row);
	}
}
$.tableviewFilesAndFoldersList.setData(rows);

/**
 * tableview Clicked
 * @param {Object} e
 */
var tableviewClicked = function(e) {
	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading);
	if (e.row.isDir == false) {
		Alloy.Globals.client.get(e.row.path, {}, function(status, reply, response, metadata) {
			Ti.API.info(status);
			Alloy.Globals.hideLoading();
			// var file = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, e.row.filename);
			// Ti.API.info('File Location: ' + file.nativePath);
			// file.write(reply.responseData);
			// Ti.API.info('File is saved at: ' + file.nativePath);
			// alert("File is saved at application data directory : " + file.nativePath);
			if ( typeof $.tableviewFilesAndFoldersList.parent.parent.parent != 'undefined' && typeof $.tableviewFilesAndFoldersList.parent.parent.parent.close == 'function') {
				$.tableviewFilesAndFoldersList.parent.parent.parent.close();
			}
			setTimeout(function(e){
				args.callback(reply.responseData);
				
			},300);
		});
	} else {
		Alloy.Globals.client.metadata(e.row.path, {
			file_limit : 10000,
			list : true,
			include_deleted : false,
			root : 'dropbox'
		}, function(status, reply) {
			Ti.API.info(status);
			Ti.API.info(JSON.stringify(reply));
			Alloy.Globals.hideLoading();
			$.tableviewFilesAndFoldersList.parent.addView(Alloy.createController('common/dropbox/tableviewFilesAndFoldersList', {
				folderListIndex : 1 + $.tableviewFilesAndFoldersList.folderListIndex,
				data : reply.contents,
				callback : args.callback
			}).getView());
			$.tableviewFilesAndFoldersList.parent.currentPage = ($.tableviewFilesAndFoldersList.parent).views.length - 1;
		});
	}
};
