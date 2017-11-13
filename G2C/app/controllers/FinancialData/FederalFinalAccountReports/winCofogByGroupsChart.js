var httpManager = require('httpManager');
var args = arguments[0] || {};
var arrData = args.arrData;
var arrXAxis = [];
var arrChartData = [];
var density;
var selectedChartStyle = "REV_EXP BAR";
//"COFOG_GROUPS BAR";
if (OS_IOS) {
	density = "dp";
} else {
	density = "px";
}

if (Alloy.Globals.isIOS7Plus) {
	$.winCofogByGroupsChart.extendEdges = [Ti.UI.EXTEND_EDGE_TOP];
	$.statusBar.height = 20;
}

function closeWindow() {
	Alloy.Globals.closeWindow($.winCofogByGroupsChart);
}

function gotoHome() {
	Alloy.Globals.gotoHome();
}

function loadChartData(arr) {

	arrXAxis = [];
	arrRevenueAvg = [];
	arrExpenditureAvg = [];

	for (var i = 0; i < arr.length; i++) {
		arrXAxis.push(arr[i].year);

		arrRevenueAvg.push(parseInt(arr[i].revenue_avg));
		arrExpenditureAvg.push(parseInt(arr[i].expenditure_avg));

	}
	var colors = [{
		linearGradient : Alloy.Globals.gradiantLinearShape,
		stops : [[0, 'rgb(248, 152, 131)'], [1, 'rgb(217, 102, 102)']]
	}, {
		linearGradient : Alloy.Globals.gradiantLinearShape,
		stops : [[0, 'rgb(117, 246, 245)'], [1, 'rgb(7,192,192)']]
	}];

	arrChartData.push({
		name : Alloy.Globals.selectedLanguage.revenueAvg,
		data : arrRevenueAvg,
		color : colors[1],
	}, {
		name : Alloy.Globals.selectedLanguage.expenditureAvg,
		data : arrExpenditureAvg,
		color : colors[0],
	});
	Ti.API.info("arr chartdata :" + JSON.stringify(arrChartData));

};

function changeLanguage() {

	loadChartData(args.arrData);

	var delay = setTimeout(function(e) {
		loadChartWithStyle(selectedChartStyle);
	}, 500);

	$.lblNavTitle.text = Alloy.Globals.selectedLanguage.fgFinalAccount;
	$.lblBudgetActivity.text = Alloy.Globals.selectedLanguage.revenueExpenditureKPI;
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
	$.normalChart.loadChart(style, arrChartData, arrXAxis, Alloy.Globals.selectedLanguage.years, Alloy.Globals.selectedLanguage.values, (Alloy.isTablet) ? 95 : 70);
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

$.winCofogByGroupsChart.addEventListener("focus", function(e) {
	if (Alloy.Globals.currentTheme == "dark") {
		$.normalChart.backgroundColor = "black";
	} else {
		$.normalChart.backgroundColor = "white";
	}
	Ti.Gesture.addEventListener("orientationchange", changeOrientation);
	$.viewBottomToolbar.setDefaultTheme($.winCofogByGroupsChart);
});

$.winCofogByGroupsChart.addEventListener("blur", function(e) {
	Ti.Gesture.removeEventListener("orientationchange", changeOrientation);
});

/**
 * Adding the eventlistener for the bottom bar view
 *
 * @param {Object} e
 */
$.viewBottomToolbar.getView().addEventListener('click', function(e) {
	if (e.source.buttonId == 'btnFontChange') {
		$.viewBottomToolbar.changeFont($.winCofogByGroupsChart);
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
		$.viewBottomToolbar.changeTheme($.winCofogByGroupsChart);
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
	Alloy.Globals.arrWindows.push($.winCofogByGroupsChart);

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
	$.imgBackBtn = $.imgHomeBtn = $.normalChart = $.winCofogByGroupsChart = null;
	$.destroy();
};
$.viewBottomToolbar.setDefaultTheme($.winCofogByGroupsChart);
changeLanguage();
