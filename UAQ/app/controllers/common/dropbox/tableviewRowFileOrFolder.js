var args = arguments[0] || {};
var fileName = args.folderData['path'].replace('/', '');
fileName = fileName.split('/');
fileName = fileName[fileName.length - 1];
if (args.folderData['is_dir'] == false) {
	if (args.mimeType == 'application/pdf') {
		$.labelIcon.text = Alloy.Globals.selectedLanguage.pdfIcon;
	} else if (args.mimeType.indexOf('image/') > -1) {
		$.labelIcon.text = Alloy.Globals.selectedLanguage.imageIcon;
	}
} else {
	$.labelIcon.text = Alloy.Globals.selectedLanguage.folderIcon;
}
$.label.text = fileName;
$.row.path = args.path;
$.row.filename = fileName;
$.row.folderData = args.folderData;
$.row.isDir = args.folderData['is_dir'];
$.row.path = args.folderData['path'];

