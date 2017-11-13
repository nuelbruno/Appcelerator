var httpManager = Alloy.createController('common/httpManager');

if (Alloy.Globals.isIOS7Plus) {
	$.winUploadNewDocs.extendEdges = [Ti.UI.EXTEND_EDGE_TOP];
	$.statusBar.height = 20;
}

var alignment;
function changeLanguage() {
	$.lblNavTitle.text = "Attachments";

	$.lblAttachementsInfo.text = "Attachements Details";
	$.lblAttachment.text = "Attachments";
	$.lblSecAttachmentTitle.text = "Title";
	$.lblSecAttachmentCategory.text = "Category";
	
	$.lblAttachmentPlus.text = "(+)";
	
	if(Alloy.Globals.isEnglish){
		alignment = Ti.UI.TEXT_ALIGNMENT_LEFT;
		$.lblSecAttachmentTitle.left = "2%";
		$.lblSecAttachmentCategory.left = (Alloy.isTablet) ? "33%" : "43%";
		$.lblAttachment.left = 10;
		$.lblAttachment.right = 80;
		$.lblAttachmentPlus.right = 10;
		
		$.lblAttachmentPlus.textAlign = Ti.UI.TEXT_ALIGNMENT_RIGHT;
		
	} else {
		alignment = Ti.UI.TEXT_ALIGNMENT_RIGHT;
		$.lblSecAttachmentTitle.right = "2%";
		$.lblSecAttachmentCategory.right = (Alloy.isTablet) ? "33%" : "43%";
		
		$.lblAttachment.right = 10;
		$.lblAttachment.left = 80;
		$.lblAttachmentPlus.left = 10;
		
		$.lblAttachmentPlus.textAlign = Ti.UI.TEXT_ALIGNMENT_LEFT;
	}
	
	$.lblAttachementsInfo.textAlign = $.lblAttachment.textAlign = alignment;
}

function loadAttachmentItems(arrDoc) {

	if (arrDoc.length == 0) {
		$.lblNoItemsAttachment.visible = true;
	} else {
		$.lblNoItemsAttachment.visible = false;
	}

	var rowData = [];
	for (var i = 0; i < arrDoc.length; i++) {

		rowData.push({
			lblRowAttachmentsTitle : {
				text : arrDoc[i].fileName,
			},
			lblRowAttachmentCategory : {
				text : arrDoc[i].categoryName,
			},

			properties : {
				obj : arrDoc[i]
			}
		});

	}

	$.attachmentListSection.setItems(rowData);

}

$.attachmentsTableViewItems.addEventListener("itemclick", function(e) {
	var section = $.attachmentsTableViewItems.sections[e.sectionIndex];
	var item = section.getItemAt(e.itemIndex);

	var payload = {
		isUpdate : true,
		arr : [],
		registeredId : 123123,//registerId,
		obj : item.properties.obj,
		navTitle : Alloy.Globals.selectedLanguage.renewal,
		callBackFunction : updateAttachmentList,
	};

	var win = Alloy.createController("ISupplier/winAddAttachments", payload).getView();
	Alloy.Globals.openWindow(win);

});

function updateAttachmentList() {
	// registerId
	httpManager.getMSupplierAttachmentList("515068", function(e) {

		Ti.API.info('e' + JSON.stringify(e));
		arrAttachment = e;

		loadAttachmentItems(arrAttachment);

	});

}

function openAttachmentsWindow() {

	var payload = {
		isUpdate : false,
		arr : [],
		mappingId :12313, //mappingId,
		obj : "",
		navTitle : Alloy.Globals.selectedLanguage.renewal,
		callBackFunction : updateAttachmentList,
	};

	var win = Alloy.createController("ISupplier/winAddAttachments", payload).getView();
	Alloy.Globals.openWindow(win);

}

function closeWindow() {
	Alloy.Globals.closeWindow($.winUploadNewDocs);
}

$.winUploadNewDocs.addEventListener("focus",function(e){
	$.viewBottomToolbar.setDefaultTheme($.winUploadNewDocs);
});
$.viewBottomToolbar.setDefaultTheme($.winUploadNewDocs);

/**
 * Adding the eventlistener for the bottom bar view
 *
 * @param {Object} e
 */
$.viewBottomToolbar.getView().addEventListener('click', function(e) {
	if (e.source.buttonId == 'btnFontChange') {
		$.viewBottomToolbar.changeFont($.winUploadNewDocs);
	} else if (e.source.buttonId == 'btnSystemFeedback') {
		$.viewBottomToolbar.openFeedbackScreen(e);
	}else if(e.source.buttonId == 'btnSystemChangeTheme'){
		$.viewBottomToolbar.changeTheme($.winUploadNewDocs);
	}
});

/**
 * Called on open of the window
 *
 * @param {Object} e
 */
var windowOpened = function(e) {
	$.viewBottomToolbar.setOptions({
		showThemeButton : true,
		showInstructions : false,
		showFeedBack : true,
		showFontResize : true
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