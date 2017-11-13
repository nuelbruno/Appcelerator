var args = arguments[0] || {};
var argsData = args.data;
var isNextWinOpen = false;
var currentBudget = undefined;
var selectedExpenseCategories = [];
//var callbackFunction = args.callbackFunction_reload;
var density;
if (OS_IOS) {
	density = "dp";
} else {
	density = "px";
}

function gotoHome() {
	Alloy.Globals.gotoHome();
}

if (Alloy.Globals.isIOS7Plus) {
	$.win.extendEdges = [Ti.UI.EXTEND_EDGE_TOP];
	$.statusBar.height = 20;

}

function closeWindow() {
	Alloy.Globals.closeWindow($.win);
}

var showReport = function() {
	if (isNextWinOpen == true) {
		return;
	}
	isNextWinOpen = true;
	var win = Alloy.createController('MyBudget/winMyBudgetReport', {
		budget_id : argsData.ID
	}).getView();
	Alloy.Globals.openWindow(win);
};
var editBudget = function() {
	if (isNextWinOpen == true) {
		return;
	}
	isNextWinOpen = true;
	var win = Alloy.createController('MyBudget/winCreateBudget', {
		callbackFunction_reload : reload,
		budget_id : argsData.ID,
		mode : 'edit'
	}).getView();
	Alloy.Globals.openWindow(win);
};

var openManageExpenses = function() {
	if (isNextWinOpen == true) {
		return;
	}
	isNextWinOpen = true;
	var doc = currentBudget;

	doc.callbackFunction_reload = reload;

	var win = Alloy.createController("MyBudget/winCreateExpense", doc).getView();
	Alloy.Globals.openWindow(win);
};
var openManageExpensesBudget = function() {
	if (isNextWinOpen == true) {
		return;
	}
	isNextWinOpen = true;
	var doc = currentBudget;
	doc.callbackFunction_reload = reload;
	var win = Alloy.createController("MyBudget/winExpenseCategory", doc).getView();
	Alloy.Globals.openWindow(win);
};

function loadList(arr, isFirstLoad) {
	if (arr != undefined) {
		var rowData = [];
		//Ti.API.info("Loading categories :" + JSON.stringify(arr));
		for (var i = 0; i < arr.length; i++) {

			var expenseCat = arr[i].expenseCategory;
			var doc = {
				id : expenseCat.category_id,
				title : (Alloy.Globals.isEnglish) ? expenseCat.name_en : expenseCat.name_ar,
				icon : expenseCat.icon_url,
				bgIcon : expenseCat.background_url,
				budget_Amount : arr[i].budget_Amount,
				actual : arr[i].budget_AmountSpent, //arr[i].actual,
				budget_AmountSpent : arr[i].budget_AmountSpent,
				isExpenseInfo : true,
				isFromBudget : true
			};

			var imgSeparator = Ti.UI.createImageView({
				width : "100%",
				height : 1,
				bottom : 0,
				backgroundColor : Alloy.Globals.path.grayColor
			});

			//Ti.API.info("Expense category row creating  with parameters :" + JSON.stringify(doc));

			var row = Alloy.createController("MyBudget/expenseCategoryRow", doc).getView();

			row.add(imgSeparator);
			row.doc = doc;
			rowData.push(row);
		}

		$.tableView.data = rowData;

		if (arr.length > 0)
			$.viewManageExpense.visible = $.viewExpenseHeader.visible = true;
		else
			$.viewManageExpense.visible = $.viewExpenseHeader.visible = false;
	}

}

function loadData() {
	var obj = Alloy.Globals.DBManager.getBudgetDetailsById(argsData.ID);
	if (obj.length > 0) {
		currentBudget = obj[0];
		Ti.API.info("Budget Details : Budget Onload - " + JSON.stringify(currentBudget));

		$.lblTitle.text = currentBudget.Title;
		$.lblBudgetAmount.text = currentBudget.budget_Amount;
		$.lblAvailableAmount.text = parseInt(currentBudget.budget_Amount) - parseInt((currentBudget.budget_AmountSpent != null ? currentBudget.budget_AmountSpent : 0));
		var selectedExpenseCategories = currentBudget.ExpenseCategoriesBudget;
		LoadChart(currentBudget);

		loadList(selectedExpenseCategories, true);
	} else {
		closeWindow();
	}
}

var LoadChart = function(curBudget) {
	//Ti.API.info("chart generation -- budget details" + currentBudget.budget_AmountSpent);
	var budget_amount = parseInt(curBudget.budget_Amount);
	var budget_AmountSpent = parseInt((curBudget.budget_AmountSpent != null) ? curBudget.budget_AmountSpent : 0);
	var amount_remaining = budget_amount - budget_AmountSpent;

	var style = 'PIE_DONUT';
	//'PIE_WITHOUTLEGEND';//'PIE';//'PIE_WITHOUTLEGEND';
	var arrXAxis = [];

	var region = [];

	if (budget_AmountSpent > 0) {
		arrXAxis.push('Amount Spent');
		region.push({
			name : Alloy.Globals.selectedLanguage.spent,
			y : budget_AmountSpent,
			//sliced : false,
			//selected : false,
			color : Alloy.Globals.path.spentAmount_GraphColor,
		});
	}

	if (amount_remaining > 0) {
		arrXAxis.push('Remaining Spent');
		region.push({
			name : Alloy.Globals.selectedLanguage.AvailableText,
			y : amount_remaining,
			//sliced : false,
			//selected : false,
			color : Alloy.Globals.path.availableAmount_GraphColor,
		});
	}

	$.pieChart.loadChart(style, region, arrXAxis);

};
var reload = function(e) {
	Ti.API.info("===  Budget Details reloading ====");
	loadData();
};
Ti.App.addEventListener("reloadBudgets", reload);
function changeLanguage() {

	Ti.API.info("==> Budget Details on Load :" + JSON.stringify(argsData));
	//$.chartView.height = Alloy.Globals.GetHeight(150)+density;
	$.lblNavTitle.text = Alloy.Globals.selectedLanguage.myBudgetTitle;

	loadData();

	var alignment;

	if (Alloy.Globals.isEnglish) {
		alignment = Titanium.UI.TEXT_ALIGNMENT_LEFT;
		$.chartView.left = (Alloy.isTablet) ? 40 : 20;
		$.leftContentCol2.right = $.viewManageExpenseBudget.left = $.viewManageExpense.right = $.viewExpenseHeader.right = 0;
		$.lblBudget.right = 10;
		if (Alloy.isTablet) {
			$.lblTitle.left = 10;
			$.lblTitle.right = 135;
			$.viewReport.right = 70;
			$.viewEdit.right = $.imgPlusBlack.left = $.imgPlusBlackEX.left = 0;
			$.lblManageExpenseBudget.left = $.lblManageExpenses.left = 35;
		} else {
			$.lblTitle.left = 10;
			$.lblTitle.right = 85;
			$.viewReport.right = 40;
			$.viewEdit.right = $.imgPlusBlack.left = $.imgPlusBlackEX.left = 0;
			$.lblManageExpenseBudget.left = $.lblManageExpenses.left = 25;
		}

	} else {
		alignment = Titanium.UI.TEXT_ALIGNMENT_RIGHT;
		$.chartView.right = (Alloy.isTablet) ? 40 : 20;
		$.leftContentCol2.left = $.viewManageExpenseBudget.right = $.viewManageExpense.left = $.viewExpenseHeader.left = 0;
		$.lblBudget.left = 10;
		if (Alloy.isTablet) {
			$.lblTitle.right = 10;
			$.lblTitle.left = 135;
			$.viewReport.left = 70;
			$.viewEdit.left = $.imgPlusBlack.right = $.imgPlusBlackEX.right = 0;
			$.lblManageExpenseBudget.right = $.lblManageExpenses.right = 35;
		} else {
			$.lblTitle.right = 10;
			$.lblTitle.left = 85;
			$.viewReport.left = 40;
			$.viewEdit.left = $.imgPlusBlack.right = $.imgPlusBlackEX.right = 0;
			$.lblManageExpenseBudget.right = $.lblManageExpenses.right = 25;
		}
	}
	$.lblBudget.textAlign = $.lblTitle.textAlign = alignment;

}

changeLanguage();

var preOrientation = undefined;
function changeOrientation(e) {
	if (preOrientation == e.orientation || e.orientation == 5) {
		return;
	}
	preOrientation = Ti.Gesture.orientation;
	if (Alloy.isTablet) {
		$.pieChart.reloadChart();
	}
}

$.win.addEventListener("focus", function(e) {
	isNextWinOpen = false;
	Ti.Gesture.addEventListener("orientationchange", changeOrientation);
	$.viewBottomToolbar.setDefaultTheme($.win);
});

$.win.addEventListener("blur", function(e) {
	Ti.Gesture.removeEventListener("orientationchange", changeOrientation);
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
	$.leftContentCol2.layout = 'vertical';
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
	Ti.App.removeEventListener("reloadBudgets", reload);
	$.imgBackBtn = $.imgHomeBtn = $.imgReport = $.imgCompose_Black = $.pieChart = $.imgPlusBlack = $.imgPlusBlackEX = $.tableView = null;
	$.destroy();
};