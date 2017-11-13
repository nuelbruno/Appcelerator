var httpManager = require('httpManager');
var args = arguments[0] || {};
var arrXAxis = [];
var arrChartData = [];
var density;
var selectedChartStyle = "COFOG_GROUPS BAR";

if (OS_IOS) {
	density = "dp";
} else {
	density = "px";
}

if (Alloy.Globals.isIOS7Plus) {
	$.winCofogByYearsChart.extendEdges = [Ti.UI.EXTEND_EDGE_TOP];
	$.statusBar.height = 20;
}

function closeWindow() {
	Alloy.Globals.closeWindow($.winCofogByYearsChart);
}

function gotoHome() {
	Alloy.Globals.gotoHome();
}

function loadChartData(arr) {

	arrXAxis = [];
	arrChartData = [];
	var colors = [{
		linearGradient : Alloy.Globals.gradiantLinearShape,
		stops : [[0, 'rgb(248, 152, 131)'], [1, 'rgb(217, 102, 102)']]
	}];

	for (var i = 0; i < arr.length; i++) {
		//arrXAxis.push(arr[i].year);
		arrXAxis.push(parseInt(arr[i].value));

		arrChartData.push({
			name : "",
			y : parseInt(arr[i].year),
			sliced : false,
			selected : false,
			color : colors[0]
		});

	}

};

function changeLanguage() {

	loadChartData(args.arrData);
	//loadBudgetRows();

	var delay = setTimeout(function(e) {
		loadChartWithStyle(selectedChartStyle);
	}, 500);
	$.lblBudgetActivity.text = Alloy.Globals.selectedLanguage.budgetExecutionByCofog;
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
	$.normalChart.loadChart(style, arrChartData, arrXAxis, Alloy.Globals.selectedLanguage.cofogs, Alloy.Globals.selectedLanguage.values, (Alloy.isTablet) ? 95 : 70);
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

$.winCofogByYearsChart.addEventListener("focus", function(e) {
	if (Alloy.Globals.currentTheme == "dark") {
		$.normalChart.backgroundColor = "black";
	} else {
		$.normalChart.backgroundColor = "white";
	}
	Ti.Gesture.addEventListener("orientationchange", changeOrientation);
	$.viewBottomToolbar.setDefaultTheme($.winCofogByYearsChart);
});

$.winCofogByYearsChart.addEventListener("blur", function(e) {
	Ti.Gesture.removeEventListener("orientationchange", changeOrientation);
});

/**
 * Adding the eventlistener for the bottom bar view
 *
 * @param {Object} e
 */
$.viewBottomToolbar.getView().addEventListener('click', function(e) {
	if (e.source.buttonId == 'btnFontChange') {
		$.viewBottomToolbar.changeFont($.winCofogByYearsChart);
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
		$.viewBottomToolbar.changeTheme($.winCofogByYearsChart);
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
	Alloy.Globals.arrWindows.push($.winCofogByYearsChart);

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
	$.imgBackBtn = $.imgHomeBtn = $.normalChart = $.winCofogByYearsChart = arrChartData = arrXAxis = null;
	$.destroy();
};
$.viewBottomToolbar.setDefaultTheme($.winCofogByYearsChart);
changeLanguage();
