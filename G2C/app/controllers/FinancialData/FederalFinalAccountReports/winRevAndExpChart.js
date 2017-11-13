var httpManager = require('httpManager');
var args = arguments[0] || {};
var arrXAxis = [];
var arrChartData = [];
var density;
var selectedChartStyle = "REV_EXP BAR";

if (OS_IOS) {
	density = "dp";
} else {
	density = "px";
}

if (Alloy.Globals.isIOS7Plus) {
	$.winRevAndExpChart.extendEdges = [Ti.UI.EXTEND_EDGE_TOP];
	$.statusBar.height = 20;
}

function closeWindow() {
	Alloy.Globals.closeWindow($.winRevAndExpChart);
}

function gotoHome() {
	Alloy.Globals.gotoHome();
}

var arrAllocated = [];
var arrExecuted = [];

function loadChartData(arr) {

	arrXAxis = [];
	arrChartData = [];
	var colors = [{
		linearGradient : Alloy.Globals.gradiantLinearShape,
		stops : [[0, 'rgb(248, 152, 131)'], [1, 'rgb(217, 102, 102)']]
	}, {
		linearGradient : Alloy.Globals.gradiantLinearShape,
		stops : [[0, 'rgb(117, 246, 245)'], [1, 'rgb(7,192,192)']]
	}];
	for (var i = 0; i < arr.length; i++) {

		arrXAxis.push(parseInt(arr[i].year));

		if (args.obj == 0) {// By Revenue
			arrAllocated.push(parseInt(arr[i].revenueAllocated));
			arrExecuted.push(parseInt(arr[i].revenueExecuted));
		} else if (args.obj == 1) {//BY Expenditure
			arrAllocated.push(parseInt(arr[i].expenditureAllocated));
			arrExecuted.push(parseInt(arr[i].expenditureExecuted));
		}

	}

	if (args.obj == 0) {
		arrChartData.push({
			name : Alloy.Globals.selectedLanguage.revenueExecuted,
			data : arrExecuted,
			color : colors[0],
		}, {
			name : Alloy.Globals.selectedLanguage.revenueAllocated,
			data : arrAllocated,
			color : colors[1],
		});
	} else if (args.obj == 1) {
		arrChartData.push({
			name : Alloy.Globals.selectedLanguage.expenditureExecuted,
			data : arrExecuted,
			color : colors[0],
		}, {
			name : Alloy.Globals.selectedLanguage.expenditureAllocated,
			data : arrAllocated,
			color : colors[1],
		});

	}

};

function changeLanguage() {
	loadChartData(args.arrData);
	var delay = setTimeout(function(e) {
		loadChartWithStyle(selectedChartStyle);
	}, 500);
	if (args.obj == 0) {
		$.lblBudgetActivity.text = Alloy.Globals.selectedLanguage.budgetExecutionByRevenue;
	} else {
		$.lblBudgetActivity.text = Alloy.Globals.selectedLanguage.budgetExecutionByExpenditure;
	}
	$.lblNavTitle.text = Alloy.Globals.selectedLanguage.fgFinalAccount;
	var alignment;
	if (Alloy.Globals.isEnglish) {
		alignment = Titanium.UI.TEXT_ALIGNMENT_LEFT;
		$.lblBudgetActivity.left = 10;
		$.lblBudgetActivity.right = 40;
	} else {
		alignment = Titanium.UI.TEXT_ALIGNMENT_RIGHT;
		$.lblBudgetActivity.right = 10;
		$.lblBudgetActivity.left = 40;
	}
	$.lblBudgetActivity.textAlign = alignment;
}

function loadChartWithStyle(style) {
	if (style == "REV_EXP BAR") {
		Ti.API.info('Xaxis ==' + JSON.stringify(arrXAxis));
		Ti.API.info('Chart Data ==' + JSON.stringify(arrChartData));
		$.normalChart.loadChart(style, arrChartData, arrXAxis, Alloy.Globals.selectedLanguage.years, Alloy.Globals.selectedLanguage.values, (Alloy.isTablet) ? 95 : 70);
	}

}

var preOrientation = undefined;
function changeOrientation(e) {
	if (preOrientation == e.orientation || e.orientation == 5) {
		return;
	}
	preOrientation = Ti.Gesture.orientation;
	if (Alloy.isTablet) {
		$.normalChart.reloadChart();
	}
}

$.winRevAndExpChart.addEventListener("focus", function(e) {
	if (Alloy.Globals.currentTheme == "dark") {
		$.normalChart.backgroundColor = "black";
	} else {
		$.normalChart.backgroundColor = "white";
	}
	Ti.Gesture.addEventListener("orientationchange", changeOrientation);
	$.viewBottomToolbar.setDefaultTheme($.winRevAndExpChart);
});

$.winRevAndExpChart.addEventListener("blur", function(e) {
	Ti.Gesture.removeEventListener("orientationchange", changeOrientation);
});

/**
 * Adding the eventlistener for the bottom bar view
 *
 * @param {Object} e
 */
$.viewBottomToolbar.getView().addEventListener('click', function(e) {
	if (e.source.buttonId == 'btnFontChange') {
		$.viewBottomToolbar.changeFont($.winRevAndExpChart);
	} else if (e.source.buttonId == 'btnSystemFeedback') {
		$.viewBottomToolbar.openFeedbackScreen(e);
	} else/* if (e.source.buttonId == 'btnSystemInstruction') {
	 $.viewInstructions.openHelpScreen(e);
	 }*/
	if (e.source.buttonId == 'btnSystemChangeTheme') {
		if (Alloy.Globals.currentTheme == "dark") {
			$.normalChart.backgroundColor = "white";
		} else {
			$.normalChart.backgroundColor = "black";
		}
		$.viewBottomToolbar.changeTheme($.winRevAndExpChart);
	}
});
/**
 * Called on open of the window
 *
 * @param {Object} e
 */
var windowOpened = function(e) {
	$.mainView.layout = 'vertical';
	$.budgetActivityView.height = (Alloy.Globals.GetHeight(33) + density);
	Alloy.Globals.arrWindows.push($.winRevAndExpChart);

	$.viewBottomToolbar.setOptions({
		showInstructions : false,
		showFeedBack : true,
		showFontResize : false
	});
};

/**
 * Window is closed
 *
 * @param {Object} e
 */
var windowClosed = function(e) {
	Alloy.Globals.arrWindows.pop();
	$.imgBackBtn = $.imgHomeBtn = $.normalChart = $.winCofogByYearsChart = arrXAxis = arrChartData = arrAllocated = arrExecuted = null;
	$.destroy();
};
$.viewBottomToolbar.setDefaultTheme($.winRevAndExpChart);
changeLanguage();
