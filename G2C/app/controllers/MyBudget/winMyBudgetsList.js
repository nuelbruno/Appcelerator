var args = arguments[0] || {};
var isNextWinOpen = false;
var isEventFired = false;
if (OS_IOS) {
	density = "dp";
} else {
	density = "px";
}

if (Alloy.Globals.isIOS7Plus) {
	$.win.extendEdges = [Ti.UI.EXTEND_EDGE_TOP];
	$.statusBar.height = 20;
	$.tableViewBudget.separatorInsets = {
		left : 0
	};
}

function closeWindow() {
	Ti.App.removeEventListener("reloadBudgets", reload);
	Alloy.Globals.closeWindow($.win);
}
function gotoHome(){
	Alloy.Globals.gotoHome();
}
//Declaring an array for storing data
var arr = [];

//Defining function for loading data from webservice and add to tableview
function loadList() {
	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading);
	arr = Alloy.Globals.DBManager.getAllBudgets(Alloy.Globals.languageCode);
	$.tableViewBudget.data = [];
	var rowData = [];
	for (var i = 0; i < arr.length; i++) {

		var doc = {
			callbackFunction_reload : reload,
			budget_id : arr[i].ID,
			title : arr[i].Title,
			startDate : arr[i].StartDate,
			endDate : arr[i].EndDate,
			notes : arr[i].Notes,
			budget_Amount : arr[i].budget_Amount,
			budget_AmountSpent : (arr[i].budget_AmountSpent != null ) ? arr[i].budget_AmountSpent : 0,
		};

		var imgSeparator = Ti.UI.createImageView({
			width : "100%",
			height : 1,
			bottom : 0,
			backgroundColor : Alloy.Globals.path.grayColor
		});

		var row = Alloy.createController("MyBudget/myBudgetListRow", doc).getView();

		row.add(imgSeparator);
		row.doc = arr[i];
		rowData.push(row);
		//	Click event for navigating to its details

	}
	$.tableViewBudget.data = rowData;

	if (arr.length == 0) {
		$.viewAddBudget.visible = true;
		$.viewAddBudget1.visible = false;
	} else {
		$.viewAddBudget.visible = false;
		$.viewAddBudget1.visible = true;
	}
	Alloy.Globals.hideLoading();
}

//Navigate to  detail screen
$.tableViewBudget.addEventListener("click", function(e) {
	Ti.API.info('>>>>>><<<<<<<<<<' + JSON.stringify(e.source));
	if (isNextWinOpen == true) {
		return;
	}
	var win;
	if (e.source.isReportClicked != undefined) {
		win = Alloy.createController('MyBudget/winMyBudgetReport', {
			budget_id : e.source.budget_id
		}).getView();
	} else if (e.source.isViewEditClicked != undefined) {
		win = Alloy.createController('MyBudget/winCreateBudget', {
			callbackFunction_reload : reload,
			budget_id : e.source.budget_id,
			mode : 'edit'
		}).getView();
	} else {
		win = Alloy.createController("MyBudget/winMyBudgetDetails", {
			data : e.row.doc,
			//callbackFunction_reload : reload
		}).getView();
	}
	Alloy.Globals.openWindow(win);
	isNextWinOpen = true;
});
var reload = function(e) {
	Ti.API.info("=== Budget List reloading from budget list ====");
	isEventFired = true;
};

Ti.App.addEventListener("reloadBudgets", reload);

var createBudget = function(e) {

	var win = Alloy.createController("MyBudget/winCreateBudget", {
		callbackFunction_reload : reload
	}).getView();
	Alloy.Globals.openWindow(win);
};
function changeLanguage() {

	$.lblNavTitle.text = Alloy.Globals.selectedLanguage.myBudgetTitle;
	if (Alloy.Globals.isEnglish) {
		if (Alloy.isTablet) {
			$.imgPlusBlack.left = 0;
			$.lblAddBudget.left = 35;
		} else {
			$.imgPlusBlack.left = 0;
			$.lblAddBudget.left = 25;
		}

	} else {
		if (Alloy.isTablet) {
			$.imgPlusBlack.right = 0;
			$.lblAddBudget.right = 35;
		} else {
			$.imgPlusBlack.right = 0;
			$.lblAddBudget.right = 25;
		}
	}

}

changeLanguage();

$.win.addEventListener("focus", function(e) {
	if (isEventFired) {
		loadList();
		isEventFired = false;
	}
	isNextWinOpen = false;
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
	loadList();
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
	$.imgBackBtn = $.imgHomeBtn = $.tableViewBudget = null;
	$.destroy();
};