var httpManager = require("httpManager");//Alloy.createController('common/httpManager');

var args = arguments[0] || {};
var arrData = args.arrData;
var arrXAxis = [];
var arrChartData = [];

var density;
var selectedChartStyle = "REV_EXP BAR";//"COFOG_GROUPS BAR";
var chartColor = "";

if (OS_IOS) {
	density = "dp";
} else {
	density = "px";
}

$.winCofogByGroupsChart.addEventListener("open", function(e) {
	$.mainView.layout ='vertical';
	$.budgetView.height = (Alloy.Globals.GetHeight(150) + density);
	$.budgetActivityView.height = (Alloy.Globals.GetHeight(33) + density);
});

if (Alloy.Globals.isIOS7Plus) {
	$.winCofogByGroupsChart.extendEdges = [Ti.UI.EXTEND_EDGE_TOP];
	$.statusBar.height = 20;
	$.budgetView.top = 75;
}

//Declaring variables for setting boolean for checking CarouselView, SectorView, ChartStyleview etc is opened or not
var isCarouselOpened = false;
var isSectorViewOpened = false;
var isChartStyleOpened = false;


var isBudgetViewOpened = false;

function showBudgetView() {
	
	if(args.obj == 6 || args.obj == 7)
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
	Alloy.Globals.closeWindow($.winCofogByGroupsChart);
}


var arrBudget = [{
	title : "الإسكان ومر",
	group : '701.00',
	isSingleYear : true
}, {
	title : "الترفية وال",
	group : '702.00',
	isSingleYear : true
}, {
	title : "الت",
	group : '703.00',
	isSingleYear : true
}, {
	title : "الحماية ",
	group : '704.00',
	isSingleYear : true
}, {
	title : "الخدمات العم",
	group : '705.00',
	isSingleYear : true
}, {
	title : "الد",
	group : '706.00',
	isSingleYear : true
}, {
	title : "الشؤون ال",
	group : '707.00',
	isSingleYear : true
}, {
	title : "الص",
	group : '708.00',
	isSingleYear : true
}, {
	title : "النظام العام وشؤو",
	group : '709.00',
	isSingleYear : true
}, {
	title : "حماية ",
	group : '710.00',
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
	arrRevenueAvg = [];
	arrExpenditureAvg = [];

	for (var i = 0; i < arr.length; i++) {
		arrXAxis.push(arr[i].year);

		arrRevenueAvg.push(parseInt(arr[i].revenue_avg));
		arrExpenditureAvg.push(parseInt(arr[i].expenditure_avg));

	}
	var colors = [{
		linearGradient : Alloy.Globals.gradiantLinearShape,
		stops : [[0, 'rgb(247, 111, 111)'], [1, 'rgb(220, 54, 54)']]
	}, {
		linearGradient : Alloy.Globals.gradiantLinearShape,
		stops : [[0, 'rgb(120, 202, 248)'], [1, 'rgb(46, 150, 208)']]
	}];
	
	arrChartData.push({
		name :  Alloy.Globals.selectedLanguage.revenueAvg, 
		data : arrRevenueAvg,
		color : colors[0],
	}, {
		name : Alloy.Globals.selectedLanguage.expenditureAvg,
		data : arrExpenditureAvg,
		color : colors[1],
	});
	Ti.API.info("arr chartdata :"+ JSON.stringify(arrChartData));

};

function changeLanguage() {

	loadChartData(args.arrData);

	loadBudgetRows();
	

	var delay = setTimeout(function(e) {
		loadChartWithStyle(selectedChartStyle);
	}, 500);

	$.lblNavTitle.text = Alloy.Globals.selectedLanguage.openFinancialData;
	$.lblBudgetActivity.text = Alloy.Globals.selectedLanguage.revenueExpenditureKPI;
	var alignment;

	if (Alloy.Globals.isEnglish) {

		alignment = Titanium.UI.TEXT_ALIGNMENT_LEFT;
		$.imgClose.right = 5;
		$.lblBudgetActivity.left = 10;
		$.lblBudgetActivity.right = 40;
		$.imgClose.left = undefined;
	} else {
		alignment = Titanium.UI.TEXT_ALIGNMENT_RIGHT;
		$.imgClose.left = 5;
		$.lblBudgetActivity.right = 10;
		$.lblBudgetActivity.left = 40;
		$.imgClose.right = undefined;
	}
	$.lblBudgetActivity.textAlign = alignment;
}

function loadChartWithStyle(style) {
		$.normalChart.loadChart(style, arrChartData, arrXAxis,Alloy.Globals.selectedLanguage.years, Alloy.Globals.selectedLanguage.values, (Alloy.isTablet) ? 95 : 70);
}

var preOrientation = undefined;
function changeOrientation(e){
	if(preOrientation == e.orientation || e.orientation == 5){
		return;
	}
	preOrientation = Ti.Gesture.orientation;
	if(Alloy.isTablet){
		$.normalChart.reloadChart();	
	}
}

$.winCofogByGroupsChart.addEventListener("focus",function(e){
	Ti.Gesture.addEventListener("orientationchange",changeOrientation);	
});

$.winCofogByGroupsChart.addEventListener("blur",function(e){
	Ti.Gesture.removeEventListener("orientationchange",changeOrientation);	
});
changeLanguage();
