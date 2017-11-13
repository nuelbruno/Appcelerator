var httpManager = require('httpManager');
var args = arguments[0] || {};
var arrData = args.arrData;
var arrXAxis = [];
var arrChartData = [];
var density;
var selectedChartStyle = "BUDGET_GROUP BAR";
var chartColor = "";
//Declaring and defining for highlight selected row
if (OS_IOS) {
	density = "dp";
} else {
	density = "px";
}

$.winBudgetGroupChart.addEventListener("open", function(e) {
	//$.budgetActivityView.height = (Alloy.Globals.GetHeight(30) + density);
	$.budgetView.height = (Alloy.Globals.GetHeight(150) + density);
});

if (Alloy.Globals.isIOS7Plus) {
	$.winBudgetGroupChart.extendEdges = [Ti.UI.EXTEND_EDGE_TOP];
	$.statusBar.height = 20;
	$.budgetView.top = 75;

}

//Declaring variables for setting boolean for checking CarouselView, SectorView, ChartStyleview etc is opened or not

var isCarouselOpened = false;
var isSectorViewOpened = false;
var isChartStyleOpened = false;

var isBudgetViewOpened = false;

function showBudgetView() {

	if (!isBudgetViewOpened) {
		$.fullTransparentView.visible = true;
		$.budgetView.visible = true;
		isBudgetViewOpened = true;
	} else {
		$.fullTransparentView.visible = false;
		$.budgetView.visible = false;
		isBudgetViewOpened = false;
	}

}

function closeWindow() {
	Alloy.Globals.closeWindow($.winBudgetGroupChart);
}

var arrBudget = [{
	title : "2009",
	isSingleYear : true
}, {
	title : "2010",
	isSingleYear : true
}, {
	title : "2011",
	isSingleYear : true
}, {
	title : "2012",
	isSingleYear : true
}, {
	title : "2013",
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

			if (args.obj == 4) {
				$.lblBudgetActivity.text = "Budget Execution Group By Revenue : " + e.source.doc.title;

				httpManager.budgetExecutionGroup_Revenue(e.source.doc.title, "Revenue", function(e) {

					showBudgetView();
					loadChartData(e.arrData);

					var delay = setTimeout(function(e) {
						loadChartWithStyle(selectedChartStyle);
					}, 500);

				});
			} else if (args.obj == 5) {
				$.lblBudgetActivity.text = "Budget Execution Group By Expenditure : " + e.source.doc.title;

				httpManager.budgetExecutionGroup_Revenue(e.source.doc.title, "Expenditure", function(e) {

					showBudgetView();
					loadChartData(e.arrData);

					var delay = setTimeout(function(e) {
						loadChartWithStyle(selectedChartStyle);
					}, 500);

				});
			}

		});

	}

	$.budgetTableView.data = rowData;

}

var arrAllocated = [];
var arrExecuted = [];

function loadChartData(arr) {

	arrAllocated = [];
	arrExecuted = [];

	arrXAxis = [];
	arrChartData = [];

	var colors = [{
		linearGradient : Alloy.Globals.gradiantLinearShape,
		stops : [[0, 'rgb(248, 152, 131)'], [1, 'rgb(217, 102, 102)']]
	}, {
		linearGradient : Alloy.Globals.gradiantLinearShape,
		stops : [[0, 'rgb(117, 246, 245)'], [1, 'rgb(7,192,192)']]
	}];

	Ti.API.info('arrAxis == ' + arrXAxis.length);
	Ti.API.info('arrChartData == ' + arrChartData.length);

	for (var i = 0; i < arr.length; i++) {

		arrXAxis.push(arr[i].groupDesc);

		arrAllocated.push(parseInt(arr[i].allocatedBudget));
		arrExecuted.push(parseInt(arr[i].executedBudget));
	}

	if (args.obj == 4) {
		arrChartData.push({
			name : Alloy.Globals.selectedLanguage.allocatedRevenue,
			data : arrAllocated,
			color : colors[0],
		}, {
			name : Alloy.Globals.selectedLanguage.executedRevenue,
			data : arrExecuted,
			color : colors[1],
		});
	} else if (args.obj == 5) {
		arrChartData.push({
			name : Alloy.Globals.selectedLanguage.allocatedExpenditure,
			data : arrAllocated,
			color : colors[0],
		}, {
			name : Alloy.Globals.selectedLanguage.executedExpenditure,
			data : arrExecuted,
			color : colors[1],
		});

	}

};

function changeLanguage() {

	loadChartData(arrData);

	loadBudgetRows();

	var delay = setTimeout(function(e) {
		loadChartWithStyle(selectedChartStyle);
	}, 500);

	$.lblNavTitle.text = Alloy.Globals.selectedLanguage.fgFinalAccount;
	$.lblReprotTitle.text = args.title;

	var alignment;

	if (Alloy.Globals.isEnglish) {

		alignment = Titanium.UI.TEXT_ALIGNMENT_LEFT;
		$.imgClose.right = 5;
		//$.lblBudgetActivity.left = $.arrowView.right = 10;
		//$.lblBudgetActivity.right = 40;

		$.imgClose.left = /*$.arrowView.left = $.lblStrategic.right = $.lblChapter2.right = $.lblChapter3.right = $.lblTotal.right = */undefined;

		//$.arrowView.backgroundImage = Alloy.Globals.path.icnArrowBrownRight;
	} else {
		alignment = Titanium.UI.TEXT_ALIGNMENT_RIGHT;
		$.imgClose.left = 5;
		//$.lblBudgetActivity.right = $.arrowView.left = 10;
		//$.lblBudgetActivity.left = 40;

		$.imgClose.right = /*$.arrowView.right = $.lblStrategic.left = $.lblChapter2.left = $.lblChapter3.left = $.lblTotal.left = */undefined;
		//$.arrowView.backgroundImage = Alloy.Globals.path.icnArrowBrownLeft;
	}
	$.lblReprotTitle.textAlign = alignment;

}

function loadChartWithStyle(style) {

	if (style == "BUDGET_GROUP BAR") {
		$.normalChart.loadChart(style, arrChartData, arrXAxis);
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

$.winBudgetGroupChart.addEventListener("focus",function(e){
	$.viewBottomToolbar.setDefaultTheme($.winBudgetGroupChart);
	Ti.Gesture.addEventListener("orientationchange", changeOrientation);
});

$.winBudgetGroupChart.addEventListener("blur",function(e){
	Ti.Gesture.removeEventListener("orientationchange", changeOrientation);
});

/**
 * Adding the eventlistener for the bottom bar view
 *
 * @param {Object} e
 */
$.viewBottomToolbar.getView().addEventListener('click', function(e) {
	if (e.source.buttonId == 'btnFontChange') {
		$.viewBottomToolbar.changeFont($.winBudgetGroupChart);
	} else if (e.source.buttonId == 'btnSystemFeedback') {
		$.viewBottomToolbar.openFeedbackScreen(e);
	} else if (e.source.buttonId == 'btnSystemInstruction') {
		$.viewInstructions.openHelpScreen(e);
	}
});
/**
 * Called on open of the window
 *
 * @param {Object} e
 */
var windowOpened = function(e) {
	$.mainView.layout = 'vertical';
	//$.budgetView.height = (Alloy.Globals.GetHeight(150) + density);
	$.viewBottomToolbar.setOptions({
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
	//	Ti.App.removeEventListener("ChartData",highlightSelectedRow);
	$.destroy();
};

changeLanguage();
