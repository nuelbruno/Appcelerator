var httpManager = require("httpManager");

var arrList = arguments[0].data;
var title = arguments[0].title;
var callBackFunction = arguments[0].callBackFunction;
var lbl = arguments[0].lbl;
var type = arguments[0].type;
var value = arguments[0].value;
var registerId = arguments[0].registerId;
var extensionId = arguments[0].extensionId;
var isUpdate = arguments[0].isUpdate;
var isProfile = arguments[0].isProfile;

var preLang = null;

Ti.API.info('arguments[0].registerId=====' + arguments[0].registerId);

if (Alloy.Globals.isIOS7Plus) {
	$.statusBar.height = 20;
	//$.statusBar.backgroundColor = Alloy.Globals.path.bgColor;
}

var changeLanguage = function() {

	if (preLang == Alloy.Globals.language) {
		return;
	}
	preLang = Alloy.Globals.language;

	$.lblNavTitle.text = Alloy.Globals.selectedLanguage.supplierRegistration, loadSelection();
};

$.tblSelection.addEventListener("click", function(e) {
	// $.winAddActivity.fireEvent('select', arrList[e.index]);

	var obj = {
		registeredId : registerId,
		action : (isUpdate) ? "UPDATE" : "INSERT",
		title : e.source.rowTitle.text,
		extensionId : extensionId,
		isProfile : (isProfile) ? "Y" : "",
		lang : (Alloy.Globals.isEnglish) ? "ENG" : "",
	};

	httpManager.addParticularMSupplierActivity(obj, function(e) {

		Ti.API.info('e' + JSON.stringify(e));

		if (e == null) {
			return;
		}
		Ti.API.info('e.status==='+e.status);
		
		if (e.status == "S") {

			var alert = Ti.UI.createAlertDialog({
				title : Alloy.Globals.selectedLanguage.iSupplier,
				message : Alloy.Globals.selectedLanguage.dataSuccess,
				buttonNames : [Alloy.Globals.selectedLanguage.ok]
			});
			alert.addEventListener('click', function(e) {

				if (e.index == 0) {
					callBackFunction();
					$.winAddActivity.close();
				}
			});
			alert.show();

		} else {
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.iSupplier, e.msg);
		}

	});
	return;
	var selectData = {
		label : lbl,
		labelTitle : e.source.rowTitle.text,
		selectedIndex : e.index,
		obj : arrList[e.index]
	};
	callBackFunction(selectData);
	$.winAddActivity.close();
});

var loadSelection = function() {

	var rowData = [];

	var selected = false;

	for (var i = 0; i < arrList.length; i++) {

		var lblTitle = Ti.UI.createLabel({
			font : (Alloy.isTablet) ? Alloy.Globals.path.font17 : Alloy.Globals.path.font14,
			height : Ti.UI.SIZE,
		//	width : Ti.UI.SIZE,
			touchEnabled : false,
			color : 'black',
			text : (Alloy.Globals.isEnglish) ? arrList[i].title : arrList[i].titleAr
		});

		var imgSelected = Ti.UI.createImageView({
			width : 20,
			height : 20,
			backgroundColor : "red",
			visible : false,
		});

		// if(value == [(Alloy.Globals.isEnglish) ? arrList[i].title : arrList[i].titleAr]){
		// imgSelected.visible = true;
		// }

		if (Alloy.Globals.isEnglish) {
			lblTitle.textAlign = Ti.UI.TEXT_ALIGNMENT_LEFT;
			lblTitle.left = imgSelected.right = '10dp';
			lblTitle.right = '30dp';
			imgSelected.left = undefined;
		} else {
			lblTitle.textAlign = Ti.UI.TEXT_ALIGNMENT_RIGHT;
			lblTitle.left = imgSelected.right = '30dp';
			lblTitle.right = '10dp';
			imgSelected.left = undefined;
		}
		var row = Ti.UI.createTableViewRow({
			height : '45dp',
			rowTitle : lblTitle,
			obj : arrList[i]
		});
		row.add(lblTitle);
		//	row.add(imgSelected);

		if (value == [(Alloy.Globals.isEnglish) ? arrList[i].title : arrList[i].titleAr]) {
			row.backgroundColor = Alloy.Globals.path.navBarColor;
		}

		var separetorView = Ti.UI.createView({
			left : 0,
			right : 0,
			bottom : 0,
			height : 1,
			touchEnabled : false,
			backgroundColor : Alloy.Globals.path.grayColor
		});

		row.add(separetorView);
		rowData.push(row);
	}

	$.tblSelection.data = rowData;
};
var closeWindow = function(e) {
	$.winAddActivity.close();
};

changeLanguage();

$.winAddActivity.addEventListener("focus", function(e) {
	$.viewBottomToolbar.setDefaultTheme($.winAddActivity);
});
$.viewBottomToolbar.setDefaultTheme($.winAddActivity);

/**
 * Adding the eventlistener for the bottom bar view
 *
 * @param {Object} e
 */
$.viewBottomToolbar.getView().addEventListener('click', function(e) {
	if (e.source.buttonId == 'btnFontChange') {
		$.viewBottomToolbar.changeFont($.winAddActivity);
	} else if (e.source.buttonId == 'btnSystemFeedback') {
		$.viewBottomToolbar.openFeedbackScreen(e);
	} else if (e.source.buttonId == 'btnSystemChangeTheme') {
		$.viewBottomToolbar.changeTheme($.winAddActivity);
	}
});

/**
 * Called on open of the window
 *
 * @param {Object} e
 */
var windowOpened = function(e) {
	Alloy.Globals.hideLoading();
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
var windowClosed = function(e) {
	$.destroy();
};

