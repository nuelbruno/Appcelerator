var httpManager = require("httpManager");//Alloy.createController('common/httpManager');

var args = arguments[0] || {};

var arrData = args.arrData;
var arrXAxis = [];
var arrChartData = [];
var noOfYears = args.noOfYears;

var density;
var selectedChartStyle = "COFOG_GROUPS BAR";
var chartColor = "";

if (args.index == 0) {
	$.lblBudgetActivity.text = "Revenue : " + Alloy.Globals.arrFiveYear[4].year;
} else {
	$.lblBudgetActivity.text = "Expense : " + Alloy.Globals.arrFiveYear[4].year;
}

if (OS_IOS) {
	density = "dp";
} else {
	density = "px";
}

$.winGFS_Rev_ExpDetails.addEventListener("open", function(e) {
	$.budgetActivityView.height = (Alloy.Globals.GetHeight(30) + density);
	$.budgetView.height = (Alloy.Globals.GetHeight(150) + density);

});

if (Alloy.Globals.isIOS7Plus) {
	$.winGFS_Rev_ExpDetails.extendEdges = [Ti.UI.EXTEND_EDGE_TOP];
	$.statusBar.height = 20;
	$.budgetView.top = 75;

}

//Declaring variables for setting boolean for checking CarouselView, SectorView, ChartStyleview etc is opened or not
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

function closeWindow() {
	Alloy.Globals.closeWindow($.winGFS_Rev_ExpDetails);
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
			touchEnabled : false
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

function loadChartData(arr) {

	arrXAxis = [];
	arrChartData = [];

	for (var i = 0; i < arr.length; i++) {

		if (args.index == 0) {

			if (arr[i].code !== "1") {
				arrXAxis.push(arr[i].code);
				arrChartData.push({
					name : arr[i].arDesc,
					y : parseFloat(arr[i].year3),
					sliced : false,
					selected : false,
					color : "#1e90ff"
				});
			}

		} else {

			if (arr[i].code !== "2") {
				arrXAxis.push(arr[i].code);
				arrChartData.push({
					name : arr[i].arDesc,
					y : parseFloat(arr[i].year3),
					sliced : false,
					selected : false,
					color : "#1e90ff"
				});
			}

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
	$.lblReprotTitle.text = args.title;

	var alignment;

	if (Alloy.Globals.isEnglish) {

		alignment = Titanium.UI.TEXT_ALIGNMENT_LEFT;
		$.imgClose.right = 5;
		$.lblBudgetActivity.left = $.arrowView.right = 10;
		$.lblBudgetActivity.right = 40;

		$.imgClose.left = $.arrowView.left = undefined;

		$.arrowView.backgroundImage = Alloy.Globals.path.icnArrowBrownRight;
	} else {
		alignment = Titanium.UI.TEXT_ALIGNMENT_RIGHT;
		$.imgClose.left = 5;
		$.lblBudgetActivity.right = $.arrowView.left = 10;
		$.lblBudgetActivity.left = 40;

		$.imgClose.right = $.arrowView.right = undefined;
		$.arrowView.backgroundImage = Alloy.Globals.path.icnArrowBrownLeft;
	}

	$.lblReprotTitle.textAlign = $.lblBudgetActivity.textAlign = alignment;
}

function loadChartWithStyle(style) {
	if (style == "COFOG_GROUPS BAR") {
		$.normalChart.loadChart(style, arrChartData, arrXAxis);
	}
}

$.winGFS_Rev_ExpDetails.addEventListener("close", function(e) {
	//	Ti.App.removeEventListener("ChartData",highlightSelectedRow);
});

changeLanguage();
