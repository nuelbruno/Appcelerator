var httpManager = require("httpManager");//Alloy.createController('common/httpManager');

var args = arguments[0] || {};

if (OS_IOS) {
	density = "dp";
} else {
	density = "px";
}

if (Alloy.Globals.isIOS7Plus) {
	$.win.extendEdges = [Ti.UI.EXTEND_EDGE_TOP];
	$.statusBar.height = 20;

}

function closeWindow() {
	Alloy.Globals.closeWindow($.win);
}

var instructionsArray = [Alloy.Globals.selectedLanguage.instruction1, Alloy.Globals.selectedLanguage.instruction2, Alloy.Globals.selectedLanguage.instruction3, Alloy.Globals.selectedLanguage.instruction4, Alloy.Globals.selectedLanguage.instruction5];

function loadItems(arrDoc) {

	var rowData = [];
	for (var i = 0; i < arrDoc.length; i++) {
		//Creating  TableViewRow
		var row = Ti.UI.createTableViewRow({
			width : "100%",
			height : Titanium.UI.SIZE,
			backgroundColor : "transparent",
			selectedColor : 'transparent',
			selectedBackgroundColor : 'transparent',
			selectionStyle : 'none'
		});
		var lblIndex = Ti.UI.createLabel({
			top : (Alloy.isTablet) ? 15 : 10,
			width : (Alloy.isTablet) ? 35 : 25,
			font : (Alloy.isTablet) ? Alloy.Globals.path.font18 :  Alloy.Globals.path.font14,
			color : Alloy.Globals.path.darkGrayColor,
			touchEnabled : false,
			height : Titanium.UI.SIZE,
			backgroundColor : "transparent"
		});
		//Creating a Label for assigning item name
		var lblTitle = Ti.UI.createLabel({
			top : (Alloy.isTablet) ? 15 : 10,
			text : arrDoc[i],
			font : (Alloy.isTablet) ? Alloy.Globals.path.font18 :  Alloy.Globals.path.font14,
			color : Alloy.Globals.path.darkGrayColor,
			touchEnabled : false,
			height : Titanium.UI.SIZE,
			backgroundColor : "transparent"
		});

		if (Alloy.Globals.isEnglish) {
			lblIndex.left = 10;
			lblTitle.left = (Alloy.isTablet) ? 45 : 35;
			lblTitle.right = 10;
			lblIndex.textAlign = lblTitle.textAlign = "left";
			lblIndex.text = (i + 1) + ". ";
			lblIndex.right = undefined;

		} else {
			lblIndex.right = 10;
			lblTitle.left = 10;
			lblTitle.right = (Alloy.isTablet) ? 45 : 35;
			lblIndex.textAlign = lblTitle.textAlign = "right";
			lblIndex.text = " ." + (i + 1);
			lblIndex.left = undefined;

		}
		row.add(lblIndex);
		row.add(lblTitle);

		rowData.push(row);

	}

	$.tableInstructions.data = rowData;

}

//var loadData =function(){
//var arr = Alloy.Globals.DBManager.getAllBudgets(Alloy.Globals.languageCode);
// if(arr.length ==0)
// {
// $.viewExistingBudget.visible = false;
// }
// else {
// $.viewExistingBudget.visible = true;
// }
//};
var reload = function(e) {
	//loadData();
};
var createBudget = function(e) {

	var win = Alloy.createController("MyBudget/winCreateBudget", {
		callbackFunction_reload : reload
	}).getView();
	Alloy.Globals.openWindow(win);
};
var openExistingBudgetList = function(e) {
	var win = Alloy.createController("MyBudget/winMyBudgetsList", {
		callbackFunction_reload : reload
	}).getView();
	Alloy.Globals.openWindow(win);
};
var openInstructions = function(e) {
	$.backView.visible = true;
	$.instructionsView.visible = true;
};
var closeInstructionsView = function(e) {
	$.backView.visible = false;
	$.instructionsView.visible = false;
};

function changeLanguage() {
	
	
	
	loadItems(instructionsArray);
	$.lblNavTitle.text = Alloy.Globals.selectedLanguage.myBudgetTitle;

	var alignment;

	if (Alloy.Globals.isEnglish) {
		alignment = Titanium.UI.TEXT_ALIGNMENT_LEFT;

		$.viewNewBudget.left = 20;
		$.viewExistingBudget.right = 20;

		$.viewNewBudget.right = undefined;
		$.viewExistingBudget.left = undefined;

	} else {
		alignment = Titanium.UI.TEXT_ALIGNMENT_RIGHT;

		$.viewNewBudget.right = 20;
		$.viewExistingBudget.left = 20;

		$.viewNewBudget.left = undefined;
		$.viewExistingBudget.right = undefined;
	}
	$.lblIntroduction.textAlign = alignment;
}

changeLanguage();

$.win.addEventListener("focus", function(e) {
	$.viewBottomToolbar.setDefaultTheme($.win);
});

$.viewBottomToolbar.setDefaultTheme($.win);

// var openHelpScreen = $.viewInstructions.openHelpScreen;

/**
 * Adding the eventlistener for the bottom bar view
 *
 * @param {Object} e
 */
$.viewBottomToolbar.getView().addEventListener('click', function(e) {
	if (e.source.buttonId == 'btnFontChange') {
		$.viewBottomToolbar.changeFont($.win);
	} else if (e.source.buttonId == 'btnSystemFeedback') {
		$.viewBottomToolbar.openFeedbackScreen(e);
	} else/*if (e.source.buttonId == 'btnSystemInstruction') {
	 $.viewInstructions.openHelpScreen(e);
	 } else*/
	if (e.source.buttonId == 'btnSystemChangeTheme') {
		$.viewBottomToolbar.changeTheme($.win);
	}
});

/**
 * Called on open of the window
 *
 * @param {Object} e
 */
function windowOpened(e) {
	Alloy.Globals.arrWindows.push($.win);
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
function windowClosed(e) {
	Alloy.Globals.arrWindows.pop();
	$.imgBackBtn = $.imgNewBudget = $.imgExistingBudget = $.tableInstructions = null;
	$.destroy();
};