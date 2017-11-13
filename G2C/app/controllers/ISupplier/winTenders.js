var args = arguments[0] || {};
var arrTenderList = args;
var isTablet = Alloy.isTablet;
if (Alloy.Globals.isIOS7Plus) {
	//$.winPurchaseOrder.extendEdges = [Ti.UI.EXTEND_EDGE_TOP];
	$.statusBar.height = 20;
}

function closeWindow() {
	Alloy.Globals.closeWindow($.winTenders);
	//$.winISupplierHome.close();
}

function changeLanguage() {
	$.lblNavTitle.text = Alloy.Globals.selectedLanguage.tenderBidsProcurements;
	loadTendersList();
}

function loadTendersList() {
	var arrTblRow = [];
	for (var i = 0,
	    length = arrTenderList.length; i < length; i++) {
		var row = Ti.UI.createTableViewRow({
			height : Ti.UI.SIZE,
			width : "100%",
			//backgroundColor : Alloy.Globals.path.rowDropDownBgColor,
			selectedColor : "none",
			selectionStyle : 0,
			className : "tender"
		});
		var lblTitle = Ti.UI.createLabel({
			left : 5,
			right : 10,
			height : Ti.UI.SIZE,
			top : 12,
			bottom : 12,
			font : (isTablet) ? Alloy.Globals.path.font17 : Alloy.Globals.path.font14,
			//color : Alloy.Globals.path.whiteColor,
			color : Alloy.Globals.path.vatButtonTitleColor,
			text : arrTenderList[i].title
		});
		row.add(lblTitle);
		var imgArrow = Ti.UI.createImageView({
			height : 17,
			width : 9,
			isClick : false
		});
		row.add(imgArrow);
		var hSeparator = Ti.UI.createView({
			bottom : 0,
			height : 1,
			width : "100%",
			isToExclude_contrast: true,
			backgroundColor : Alloy.Globals.path.borderColor,
		});
		row.add(hSeparator);
		if (Alloy.Globals.isEnglish) {
			lblTitle.left = imgArrow.right = 10;
			lblTitle.right = 45;
			imgArrow.image = Alloy.Globals.path.icnRowDetail;
			lblTitle.textAlign = Ti.UI.TEXT_ALIGNMENT_LEFT;
		} else {
			lblTitle.right = imgArrow.left = 10;
			lblTitle.left = 45;
			imgArrow.image = Alloy.Globals.path.icnRowDetailRight;
			lblTitle.textAlign = Ti.UI.TEXT_ALIGNMENT_RIGHT;
		}
		arrTblRow.push(row);
	}
	$.tblTenders.data = arrTblRow;
}

$.tblTenders.addEventListener('click', function(e) {
	var nextWindow = Alloy.createController('ISupplier/winTenderDetails', arrTenderList[e.index]).getView();
	Alloy.Globals.openWindow(nextWindow);
});
changeLanguage();

$.winTenders.addEventListener("focus",function(e){
	$.viewBottomToolbar.setDefaultTheme($.winTenders);
});
$.viewBottomToolbar.setDefaultTheme($.winTenders);


/**
 * Adding the eventlistener for the bottom bar view
 *
 * @param {Object} e
 */
$.viewBottomToolbar.getView().addEventListener('click', function(e) {
	if (e.source.buttonId == 'btnFontChange') {
		$.viewBottomToolbar.changeFont($.winTenders);
	} else if (e.source.buttonId == 'btnSystemFeedback') {
		$.viewBottomToolbar.openFeedbackScreen(e);
	} else if(e.source.buttonId == 'btnSystemChangeTheme'){
		$.viewBottomToolbar.changeTheme($.winTenders);
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
