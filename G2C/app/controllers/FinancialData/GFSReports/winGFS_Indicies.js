var httpManager = require('httpManager');

var args = arguments[0] || {};
var arrData = args.arrData;
var arrXAxis = [];
var arrChartData = [];
var noOfYears = args.noOfYears;

var density;
var selectedChartStyle = "GFS REV_EXP BAR";

var chartColor = "";

$.lblBudgetActivity.text = Alloy.Globals.selectedLanguage.gfsIndicies + ": " + Alloy.Globals.GFSYear;

if (OS_IOS) {
	density = "dp";
} else {
	density = "px";
}

//var chartType = "PIE";
var chartType = "BAR";

/*$.winGFS_Indicies.addEventListener("open", function(e) {
 Alloy.Globals.arrWindows.push($.winGFS_Indicies);
 $.budgetActivityView.height = (Alloy.Globals.GetHeight(35) + density);
 $.budgetView.height = (Alloy.Globals.GetHeight(150) + density);
 });*/

if (Alloy.Globals.isIOS7Plus) {
	$.winGFS_Indicies.extendEdges = [Ti.UI.EXTEND_EDGE_TOP];
	$.statusBar.height = 20;
	$.budgetView.top = 75;
	$.transparentView.top = 65;
}

//Declaring variables for setting boolean for checking CarouselView, SectorView, ChartStyleview etc is opened or not
var isCarouselOpened = false;
var isSectorViewOpened = false;
var isChartStyleOpened = false;
var isBudgetViewOpened = false;

function showBudgetView() {

	return;

	if (!isBudgetViewOpened) {
		if (OS_IOS) {
			$.fullTransparentView.opacity = 1;
		} else {
			$.fullTransparentView.visible = true;
		}

		$.budgetView.visible = true;
		isBudgetViewOpened = true;
	} else {
		if (OS_IOS) {
			$.fullTransparentView.opacity = 0;
		} else {
			$.fullTransparentView.visible = false;
		}
		$.budgetView.visible = false;
		isBudgetViewOpened = false;
	}

}

function showHideView() {

	if (isSectorViewOpened) {
		showSectorView();
	} else if (isChartStyleOpened) {
		showChartStyleView();
	}

}

function closeWindow() {
	Alloy.Globals.closeWindow($.winGFS_Indicies);
}

function gotoHome() {
	Alloy.Globals.gotoHome();
}

var arrBudget = [{
	title : "الإسكان ومر",
	group : 01,
	isSingleYear : true
}, {
	title : "الترفية وال",
	group : 02,
	isSingleYear : true
}, {
	title : "الت",
	group : 03,
	isSingleYear : true
}, {
	title : "الحماية ",
	group : 04,
	isSingleYear : true
}, {
	title : "الخدمات العم",
	group : 05,
	isSingleYear : true
}, {
	title : "الد",
	group : 06,
	isSingleYear : true
}, {
	title : "الشؤون ال",
	group : 07,
	isSingleYear : true
}, {
	title : "الص",
	group : 08,
	isSingleYear : true
}, {
	title : "النظام العام وشؤو",
	group : 09,
	isSingleYear : true
}, {
	title : "حماية ",
	group : 10,
	isSingleYear : true
}];

var isNavChartHidden = false;

function loadBudgetRows() {

	var rowData = [];
	for (var i = 0; i < arrBudget.length; i++) {

		var row = Ti.UI.createTableViewRow({
			width : "100%",
			height : (Alloy.Globals.GetHeight(30) + density),
			isSelected : false,
			selectedBackgroundColor : "transparent"
		});

		var lblTitle = Ti.UI.createLabel({
			left : 10,
			right : 10,
			height : "100%",
			color : Alloy.Globals.path.blackColor,
			font : Alloy.Globals.path.font13,
			text : arrBudget[i].title,
			touchEnabled : false
		});

		if (Alloy.Globals.isEnglish) {
			lblTitle.textAlign = Ti.UI.TEXT_ALIGNMENT_LEFT;
		} else {
			lblTitle.textAlign = Ti.UI.TEXT_ALIGNMENT_RIGHT;
		}

		row.lbl = lblTitle;

		row.add(lblTitle);

		var imgSeparator = Ti.UI.createImageView({
			width : "100%",
			height : 1,
			bottom : 0,
			backgroundColor : Alloy.Globals.path.grayColor,
			touchEnabled : false,
			isToExclude_contrast : true
		});

		if (i < [arrBudget.length - 1]) {
			row.add(imgSeparator);
		}

		row.doc = arrBudget[i];

		rowData.push(row);

		var prevRow = undefined;
		row.addEventListener("click", function(e) {

			$.lblBudgetActivity.text = "Budget Execution By Cofog : " + e.source.doc.title;
			httpManager.budgetExecutionByCofogByGroup(e.source.doc.group, function(e) {
				showBudgetView();
				loadChartData(e.arrData);

				var delay = setTimeout(function(e) {
					loadChartWithStyle(selectedChartStyle);
				}, 500);

			});
		});

	}

	$.budgetTableView.data = rowData;

}

var arrColors = [{
	color : "#f16645"
}, {
	color : "#ffc65d"
}, {
	color : "#7bc8a4"
}];

function loadChartData(arr) {

	arrXAxis = [];
	arrChartData = [];

	if (chartType == "BAR") {

		var colors = [{
			linearGradient : Alloy.Globals.gradiantLinearShape,
			stops : [[0, 'rgb(248, 152, 131)'], [1, 'rgb(217, 102, 102)']]
		}, {
			linearGradient : Alloy.Globals.gradiantLinearShape,
			stops : [[0, 'rgb(117, 246, 245)'], [1, 'rgb(7,192,192)']]
		}, {
			linearGradient : Alloy.Globals.gradiantLinearShape,
			stops : [[0, 'rgb(190, 235, 159)'], [1, 'rgb(122,190,143)']]
		}];

		Ti.API.info("======GFS REV_EXP======");

		selectedChartStyle = "GFS REV_EXP BAR";

		for (var i = 0; i < arr.length; i++) {

			arrXAxis.push(arr[i].code);

			arrChartData.push({
				name : (Alloy.Globals.isEnglish) ? arr[i].enDesc : arr[i].arDesc,
				y : parseFloat(arr[i].year3),
				sliced : false,
				selected : false,
				color : colors[i],
			});

		}
	} else if (chartType == "PIE") {

		var colors = [{
			linearGradient : Alloy.Globals.gradientRadialShape,
			stops : [[0, 'rgb(247, 111, 111)'], [1, 'rgb(220, 54, 54)']]
		}, {
			linearGradient : Alloy.Globals.gradientRadialShape,
			stops : [[0, 'rgb(120, 202, 248)'], [1, 'rgb(46, 150, 208)']]
		}, {
			linearGradient : Alloy.Globals.gradiantLinearShape,
			stops : [[0, 'rgb(136, 219, 5)'], [1, 'rgb(112, 180, 5)']]
		}];

		Ti.API.info("========GFS REV_EXP PIE======");

		selectedChartStyle = "GFS_INDICIES PIE";

		for (var i = 0; i < arr.length; i++) {

			arrXAxis.push(arr[i].code);

			arrChartData.push({
				name : (Alloy.Globals.isEnglish) ? arr[i].enDesc : arr[i].arDesc,
				y : parseFloat(arr[i].year3),
				sliced : false,
				selected : false,
				color : colors[i],
			});

		}

	}

};

function changeLanguage() {

	loadChartData(arrData);
	loadBudgetRows();
	var delay = setTimeout(function(e) {
		loadChartWithStyle(selectedChartStyle);
	}, 500);
	$.lblNavTitle.text = Alloy.Globals.selectedLanguage.gfsReports;
	var alignment;

	if (Alloy.Globals.isEnglish) {

		alignment = Titanium.UI.TEXT_ALIGNMENT_LEFT;
		$.imgClose.right = 5;
		$.imgClose.left = undefined;
	} else {
		alignment = Titanium.UI.TEXT_ALIGNMENT_RIGHT;
		$.imgClose.left = 5;
		$.imgClose.right = undefined;
	}

	$.lblBudgetActivity.textAlign = alignment;
}

function loadChartWithStyle(style) {
	$.normalChart.loadChart(style, arrChartData, arrXAxis, Alloy.Globals.selectedLanguage.indicies, Alloy.Globals.selectedLanguage.values, (Alloy.isTablet) ? 95 : 70);
}

/*$.winGFS_Indicies.addEventListener("close", function(e) {
 Alloy.Globals.arrWindows.pop();
 $.imgBackBtn = $.imgHomeBtn =
 $.normalChart = $.budgetTableView = $.imgClose = null;
 });*/
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

$.winGFS_Indicies.addEventListener("focus", function(e) {
	if (Alloy.Globals.currentTheme == "dark") {
		$.normalChart.backgroundColor = "black";
	} else {
		$.normalChart.backgroundColor = "white";
	}
	$.viewBottomToolbar.setDefaultTheme($.winGFS_Indicies);
	Ti.Gesture.addEventListener("orientationchange", changeOrientation);
});

$.winGFS_Indicies.addEventListener("blur", function(e) {
	Ti.Gesture.removeEventListener("orientationchange", changeOrientation);
});

changeLanguage();

/**
 * Adding the eventlistener for the bottom bar view
 *
 * @param {Object} e
 */
$.viewBottomToolbar.getView().addEventListener('click', function(e) {
	if (e.source.buttonId == 'btnFontChange') {
		$.viewBottomToolbar.changeFont($.winGFS_Indicies);
	} else if (e.source.buttonId == 'btnSystemFeedback') {
		$.viewBottomToolbar.openFeedbackScreen(e);
	} else/* if(e.source.buttonId == 'btnSystemInstruction'){
	 $.viewInstructions.openHelpScreen(e);
	 }*/
	if (e.source.buttonId == 'btnSystemChangeTheme') {
		if (Alloy.Globals.currentTheme == "dark") {
			$.normalChart.backgroundColor = "white";
		} else {
			$.normalChart.backgroundColor = "black";
		}
		$.viewBottomToolbar.changeTheme($.winGFS_Indicies);
	}
});
/**
 * Called on open of the window
 *
 * @param {Object} e
 */
var windowOpened = function(e) {
	Alloy.Globals.arrWindows.push($.winGFS_Indicies);
	$.budgetActivityView.height = (Alloy.Globals.GetHeight(35) + density);
	$.budgetView.height = (Alloy.Globals.GetHeight(150) + density);

	$.viewBottomToolbar.setOptions({
		showThemeButton : true,
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
	$.imgBackBtn = $.imgHomeBtn = /*$.imgChartStyle = */
	$.normalChart = $.budgetTableView = $.imgClose = null;
	$.destroy();
};

$.viewBottomToolbar.setDefaultTheme($.winGFS_Indicies); 