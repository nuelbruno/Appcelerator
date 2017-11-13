var args = arguments[0] || {};
var currentBudget = undefined;
var btnWidth = (Ti.Platform.displayCaps.platformWidth / 2);
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

function gotoHome() {
	Alloy.Globals.gotoHome();
}

function loadData() {
	if (currentBudget != undefined) {
		showRevenueSources();
		//LoadChart();
		if (currentBudget.ExpenseCategoriesBudget.length == 0) {
			$.lblNoExpense.visible = true;
		} else {
			LoadBarChart();
		}
	}
}

var isAnimComplete = true;
var showRevenueSources = function(e) {
	if (!isAnimComplete) {
		return;
	}
	$.lblRevenueSources.color = Alloy.Globals.path.darkGrayColor;
	$.lblExpenseCategories.color = Alloy.Globals.path.grayColor;
	isAnimComplete = false;
	if (Alloy.Globals.isEnglish) {
		$.imgselection.animate({
			left : 0,
			duration : 300
		}, function(e) {
			isAnimComplete = true;
		});
	} else {
		$.imgselection.animate({
			right : 0,
			duration : 300
		}, function(e) {
			isAnimComplete = true;
		});
	}

	$.chartView.show();
	$.barChartView.hide();

	if (e == null) {
		LoadChart();
	}
};

var showExpenseCategories = function(e) {
	if (!isAnimComplete) {
		return;
	}
	$.lblRevenueSources.color = Alloy.Globals.path.grayColor;
	$.lblExpenseCategories.color = Alloy.Globals.path.darkGrayColor;
	isAnimComplete = false;
	if (Alloy.Globals.isEnglish) {
		$.imgselection.animate({
			left : btnWidth + density,
			duration : 300
		}, function(e) {
			isAnimComplete = true;
		});
	} else {
		$.imgselection.animate({
			right : btnWidth + density,
			duration : 300
		}, function(e) {
			isAnimComplete = true;
		});
	}

	$.chartView.hide();
	$.barChartView.show();

	if (e == null) {
		LoadBarChart();
	}
};
var LoadChart = function() {
	var arrRevenue = [Alloy.Globals.selectedLanguage.salary, Alloy.Globals.selectedLanguage.dividend, Alloy.Globals.selectedLanguage.rent, Alloy.Globals.selectedLanguage.familySupport, Alloy.Globals.selectedLanguage.saving];
	var style = 'GFS_INDICIES PIE';
	//'PIE';
	var arrXAxis = [];

	var region = [];

	for (var i = 0; i < currentBudget.RevenueSources.length; i++) {
		var revenueColorIndex = (i < 10) ? i : 5;
		Ti.API.info("revenue color index" + revenueColorIndex);

		var colorCode = Alloy.Globals.RevenueSourcesReportColors[parseInt(revenueColorIndex)].color;

		arrXAxis.push((i <= 4) ? arrRevenue[i] : currentBudget.RevenueSources[i].Title);
		region.push({
			name : (i <= 4) ? arrRevenue[i] : currentBudget.RevenueSources[i].Title,
			y : parseFloat(currentBudget.RevenueSources[i].Amount),
			sliced : false,
			selected : false,
			color : colorCode,
		});

	}

	$.pieChart.loadChart(style, region, arrXAxis);
};

function LoadBarChart() {
	Ti.API.info("barchart Data -->:" + JSON.stringify(currentBudget.ExpenseCategoriesBudget));

	var style = 'REV_EXP BAR';

	var arrXAxis = [];
	//['Food', 'Cinema', 'Shopping'];

	var region = [];

	var spentData = [];
	var budgetData = [];

	for (var i = 0; i < currentBudget.ExpenseCategoriesBudget.length; i++) {
		var current = currentBudget.ExpenseCategoriesBudget[i];
		var title = (Alloy.Globals.isEnglish) ? currentBudget.ExpenseCategoriesBudget[i].expenseCategory.name_en : currentBudget.ExpenseCategoriesBudget[i].expenseCategory.name_ar;
		//arrXAxis.push( Alloy.Globals.ExpenseCategories[current.index].title);
		arrXAxis.push(title);

		spentData.push(parseInt((current.budget_AmountSpent != null ? current.budget_AmountSpent : 0)));
		budgetData.push(current.budget_Amount);

	}

	region.push({
		name : Alloy.Globals.selectedLanguage.spent,
		data : spentData, //[500, 700, 1200],
		color : Alloy.Globals.path.spentAmount_GraphColor,
	});

	region.push({
		name : Alloy.Globals.selectedLanguage.budgetTitle,
		data : budgetData, //[1000, 2000, 3000],
		color : Alloy.Globals.path.availableAmount_GraphColor,
	});

	$.barChart.loadChart(style, region, arrXAxis, "", Alloy.Globals.selectedLanguage.values, (Alloy.isTablet) ? 190 : 120);

}

function changeLanguage() {
	//Ti.API.info("Budget Report Load Budget Id  :"+ JSON.stringify(args));
	$.lblNavTitle.text = Alloy.Globals.selectedLanguage.myBudgetReportTitle;
	$.lblNoExpense.text = Alloy.Globals.selectedLanguage.NoExpenseCategory;
	$.lblRevenueSources.text = Alloy.Globals.selectedLanguage.revenueSources;
	$.lblExpenseCategories.text = Alloy.Globals.selectedLanguage.expenseCategories;
	var obj = Alloy.Globals.DBManager.getBudgetDetailsById(args.budget_id);
	if (obj.length > 0)
		currentBudget = obj[0];

	//Ti.API.info("Budget Report Object :"+ JSON.stringify(currentBudget));

	loadData();

	var alignment;

	if (Alloy.Globals.isEnglish) {
		alignment = Titanium.UI.TEXT_ALIGNMENT_LEFT;
		$.btnRevenueSourcesView.left = $.imgselection.left = 0;
		$.btnExpenseCategoriesView.right = 0;
		//$.lblRevenueSources.left = /*$.lblExpenseCategories.left =*/0;

	} else {
		alignment = Titanium.UI.TEXT_ALIGNMENT_RIGHT;
		$.btnRevenueSourcesView.right = $.imgselection.right = 0;
		$.btnExpenseCategoriesView.left = 0;
		//$.lblRevenueSources.right = /*$.lblExpenseCategories.right =*/0;
	}

	//$.lblRevenueSources.textAlign = /*$.lblExpenseCategories.textAlign =*/ alignment;

}

changeLanguage();

$.win.addEventListener("postlayout", function(e) {
	btnWidth = (Alloy.Globals.platformWidth / 2);
});

var preOrientation = undefined;
function changeOrientation(e) {
	if (preOrientation == e.orientation || e.orientation == 5) {
		return;
	}
	btnWidth = (Ti.Platform.displayCaps.platformWidth / 2);
	preOrientation = Ti.Gesture.orientation;
	if (Alloy.isTablet) {
		if ($.chartView.visible) {
			$.pieChart.reloadChart();
			if (Alloy.Globals.isEnglish) {
				$.imgselection.animate({
					left : 0,
					duration : 300
				});
			} else {
				$.imgselection.animate({
					right : 0,
					duration : 300
				});
			}
		}
		if ($.barChartView.visible) {
			$.pieChart.reloadChart();
			if (Alloy.Globals.isEnglish) {
				$.imgselection.animate({
					left : btnWidth + density,
					duration : 300
				});
			} else {
				$.imgselection.animate({
					right : btnWidth + density,
					duration : 300
				});
			}
			if (currentBudget.ExpenseCategoriesBudget.length != 0) {
				$.barChart.reloadChart();
			}
		}
	}
}

$.win.addEventListener("focus", function(e) {
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
	$.imgBackBtn = $.imgHomeBtn = $.barChart = $.pieChart = null;
	$.destroy();
};