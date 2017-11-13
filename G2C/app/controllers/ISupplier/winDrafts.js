var httpManager = require("httpManager");//Alloy.createController('common/httpManager');

var args = arguments[0] || {};

var arr = [{
	title : "Drafts Sample request 1",
	by : "Gaurav Solanki",
	date : "16 Feb 2015"
},{
	title : "Drafts Sample request 2",
	by : "Gaurav Solanki",
	date : "16 Feb 2016"
},{
	title : "Drafts Sample request 3",
	by : "Gaurav Solanki",
	date : "16 Feb 2017"
}];

if (Alloy.Globals.isIOS7Plus) {
	//$.winPurchaseOrder.extendEdges = [Ti.UI.EXTEND_EDGE_TOP];
	$.statusBar.height = 20;
}

function closeWindow() {
	Alloy.Globals.closeWindow($.winDrafts);
	//$.winISupplierHome.close();
}


function loadItems(arrDoc){
	
	if (arrDoc.length == 0) {
		$.lblNoItems.visible = true;
	} else {
		$.lblNoItems.visible = false;
	}
		
	var rowData = [];
	for (var i = 0; i < arrDoc.length; i++) {

		rowData.push({
			lblTitle : {
				font : Alloy.Globals.path.font14,
				text : (Alloy.Globals.isEnglish) ? arrDoc[i].title : arrDoc[i].title,
			},
			lblCreatedByTitle:{
				font : (Alloy.isTablet) ? Alloy.Globals.path.font14 :Alloy.Globals.path.font10
			},
			lblCreatedByValue : {
				font : (Alloy.isTablet) ? Alloy.Globals.path.font14 :Alloy.Globals.path.font10,
				text : arrDoc[i].by,
			},
			lblDateTitle:{
				font : (Alloy.isTablet) ? Alloy.Globals.path.font14 :Alloy.Globals.path.font10
			},
			lblDateValue : {
				font : (Alloy.isTablet) ? Alloy.Globals.path.font14 :Alloy.Globals.path.font10,
				text : arrDoc[i].date,
			},
			properties : {
				obj : arrDoc[i]
			}
		});
		
	}

	$.listSection.setItems(rowData);
	
}


$.tableViewItems.addEventListener("itemclick",function(e){
	
	return;
	
	var section = $.tableViewItems.sections[e.sectionIndex];
	var item = section.getItemAt(e.itemIndex);
			
});

function changeLanguage() {
	
	loadItems(arr);
	
	$.lblNavTitle.text = Alloy.Globals.selectedLanguage.drafts;

}

changeLanguage();

$.winDrafts.addEventListener("focus",function(e){
	$.viewBottomToolbar.setDefaultTheme($.winDrafts);
});
$.viewBottomToolbar.setDefaultTheme($.winDrafts);


/**
 * Adding the eventlistener for the bottom bar view
 *
 * @param {Object} e
 */
$.viewBottomToolbar.getView().addEventListener('click', function(e) {
	if (e.source.buttonId == 'btnFontChange') {
		$.viewBottomToolbar.changeFont($.winDrafts);
	} else if (e.source.buttonId == 'btnSystemFeedback') {
		$.viewBottomToolbar.openFeedbackScreen(e);
	} else if(e.source.buttonId == 'btnSystemChangeTheme'){
		$.viewBottomToolbar.changeTheme($.winDrafts);
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



