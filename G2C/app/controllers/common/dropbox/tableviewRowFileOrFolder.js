var args = arguments[0] || {};

Ti.API.info('Rows : ' + JSON.stringify(args));
var fileName = args.folderData['path'].replace('/', '');
fileName = fileName.split('/');
fileName = fileName[fileName.length - 1];
if (args.folderData['is_dir'] == false) {
	var extension = fileName.split('.')[1];
	if (extension == 'zip') {
		$.imageview.image = '/images/dropbox/zipicon.png';
	} else if (extension == 'pdf') {
		$.imageview.image = '/images/dropbox/pdficon.png';
	} else if (extension == 'js') {
		$.imageview.image = '/images/dropbox/jsicon.png';
	} else if (extension == 'xml') {
		$.imageview.image = '/images/dropbox/xmlicon.png';
	} else if (extension == 'gif' || extension == 'jpg' || extension == 'png' || extension == 'jpeg') {
		$.imageview.image = '/images/dropbox/imageicon.png';
	} else {/*(extension == 'doc' || extension == 'docx' || extension == 'txt' || extension == 'rtf')*/

		$.imageview.image = '/images/dropbox/docicon.png';
	}
} else {
	$.row.hasChild = false;
	$.imgRowArrow.visible = true; 
	$.imageview.image = '/images/dropbox/foldericon.png';
}
$.label.text = fileName;
$.row.path = args.path;
$.row.filename = fileName;
$.row.folderData = args.folderData;
$.row.isDir = args.folderData['is_dir'];
$.row.path = args.folderData['path'];

