var httpManager = require("httpManager");//Alloy.createController('common/httpManager');

var args = arguments[0] || {};

var arrXAxis = [];
var arrChartData = [];

var density;
var selectedChartStyle = "REV_EXP BAR";


var chartColor = "";


if (OS_IOS) {
	density = "dp";
} else {
	density = "px";
}

$.winRevAndExpChart.addEventListener("open", function(e) {
	$.mainView.layout ='vertical';
	$.budgetActivityView.height = (Alloy.Globals.GetHeight(33) + density);
	/*$.budgetView.height = (Alloy.Globals.GetHeight(150) + density);*/
});

if (Alloy.Globals.isIOS7Plus) {
	$.winRevAndExpChart.extendEdges = [Ti.UI.EXTEND_EDGE_TOP];
	$.statusBar.height = 20;
	/*$.budgetView.top = 75;*/
	
}

//Declaring variables for setting boolean for checking CarouselView, SectorView, ChartStyleview etc is opened or not
/*
var isCarouselOpened = false;
var isSectorViewOpened = false;
var isChartStyleOpened = false;


var isBudgetViewOpened = false;

function showBudgetView() {

	return;

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
*/
function closeWindow() {
	Alloy.Globals.closeWindow($.winRevAndExpChart);
}


/*
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
			touchEnabled : false
		});

		if (i < [arrBudget.length - 1]) {
			row.add(imgSeparator);
		}

		row.doc = arrBudget[i];

		rowData.push(row);

		var prevRow = undefined;
		row.addEventListener("click", function(e) {

			//$.lblBudgetActivity.text = "Budget Execution By Cofog : " + e.source.doc.title;

			httpManager.budgetExecutionByCofogByYear(e.source.doc.title, function(e) {

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

*/
var arrAllocated = [];
var arrExecuted = [];

function loadChartData(arr) {

	arrXAxis = [];
	arrChartData = [];
	var colors = [{
		linearGradient : Alloy.Globals.gradiantLinearShape,
		stops : [[0, 'rgb(247, 111, 111)'], [1, 'rgb(220, 54, 54)']]
	}, {
		linearGradient : Alloy.Globals.gradiantLinearShape,
		stops : [[0, 'rgb(120, 202, 248)'], [1, 'rgb(46, 150, 208)']]
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
		arrChartData.push( {
			name : Alloy.Globals.selectedLanguage.revenueExecuted,
			data : arrExecuted,
			color : colors[0],
		},
		{
			name : Alloy.Globals.selectedLanguage.revenueAllocated,
			data : arrAllocated,
			color : colors[1],
		});
	} else if (args.obj == 1) {
		arrChartData.push( {
			name : Alloy.Globals.selectedLanguage.expenditureExecuted,
			data : arrExecuted,
			color : colors[0],
		},
		{
			name : Alloy.Globals.selectedLanguage.expenditureAllocated,
			data : arrAllocated,
			color : colors[1],
		});

	}

};

function changeLanguage() {

	loadChartData(args.arrData);
	
	//loadBudgetRows();

	var delay = setTimeout(function(e) {
		loadChartWithStyle(selectedChartStyle);
	}, 500);
	if(args.obj == 0){
		$.lblBudgetActivity.text = Alloy.Globals.selectedLanguage.budgetExecutionByRevenue ;	
	}else{
		$.lblBudgetActivity.text = Alloy.Globals.selectedLanguage.budgetExecutionByExpenditure;
	}
	$.lblNavTitle.text = Alloy.Globals.selectedLanguage.openFinancialData;
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
		$.normalChart.loadChart(style, arrChartData, arrXAxis,Alloy.Globals.selectedLanguage.years, Alloy.Globals.selectedLanguage.values, (Alloy.isTablet) ? 95 : 70);
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
	Ti.Gesture.addEventListener("orientationchange", changeOrientation);
});

$.winRevAndExpChart.addEventListener("blur", function(e) {
	Ti.Gesture.removeEventListener("orientationchange", changeOrientation);
});

changeLanguage();
