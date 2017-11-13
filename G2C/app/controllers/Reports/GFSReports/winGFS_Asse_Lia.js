var httpManager = require("httpManager");//Alloy.createController('common/httpManager');

var args = arguments[0] || {};
var arrData = args.arrData;
var arrXAxis = [];
var arrChartData = [];
var noOfYears = args.noOfYears;

var density;
var selectedChartStyle = "GFS ASSE_LIA BAR";
//args.selectedChartStyle;

var chartColor = "";

var isTableViewOpened = false;

function hideTableView() {

	$.TableBackView.visible = false;
	var hideCarouselView = Ti.UI.createAnimation({
		bottom : -(Alloy.Globals.GetHeight(180)),
		curve : Ti.UI.ANIMATION_CURVE_EASE_OUT,
		duration : 300,
	});

	$.slidingView.animate(hideCarouselView);

}

function highlightSelectedRow(e) {
	Ti.API.info('>>>>>>> table view show function called');
	loadRows(arrData, e.data);
	$.TableBackView.visible = true;
	var showCarouselView = Ti.UI.createAnimation({
		bottom : 0,
		curve : Ti.UI.ANIMATION_CURVE_EASE_OUT,
		duration : 300,
	});

	$.slidingView.animate(showCarouselView);
}

//$.lblBudgetActivity.text = "Operations - Assests & Liabilities : " + Alloy.Globals.arrFiveYear[4].year;

if (OS_IOS) {
	density = "dp";
} else {
	density = "px";
}

$.winGFS_Asse_Lia.addEventListener("open", function(e) {
	$.mainView.layout ="vertical";
	Ti.App.addEventListener("ChartData", highlightSelectedRow);

	
	$.slidingView.height = (Alloy.Globals.GetHeight(180) + density);
	$.slidingView.bottom = -(Alloy.Globals.GetHeight(180));

	//$.budgetActivityView.height = (Alloy.Globals.GetHeight(30) + density);
	$.sectionView.height = (Alloy.Globals.GetHeight(30) + density);
	$.lblCode.width = (Alloy.Globals.GetWidth(70) + density);
	$.lblDesc.width = (Alloy.Globals.GetWidth(135) + density);
	$.lblTotal.width = (Alloy.Globals.GetWidth(80) + density);
	//$.budgetView.height = (Alloy.Globals.GetHeight(150) + density);
	
});

if (Alloy.Globals.isIOS7Plus) {
	$.winGFS_Asse_Lia.extendEdges = [Ti.UI.EXTEND_EDGE_TOP];
	$.statusBar.height = 20;
	//$.budgetView.top = 75;
	
}

//Declaring variables for setting boolean for checking CarouselView, SectorView, ChartStyleview etc is opened or not
var isCarouselOpened = false;
var isSectorViewOpened = false;
var isChartStyleOpened = false;


var isBudgetViewOpened = false;

// function showBudgetView() {
// 
	// return;
// 
	// if (!isBudgetViewOpened) {
		// $.fullTransparentView.visible = true;
		// $.budgetView.visible = true;
		// isBudgetViewOpened = true;
	// } else {
		// $.fullTransparentView.visible = false;
		// $.budgetView.visible = false;
		// isBudgetViewOpened = false;
	// }
// 
// }


function closeWindow() {
	Alloy.Globals.closeWindow($.winGFS_Asse_Lia);
}

function loadRows(arr, value) {
	
	var rowData = [];
	for (var i = 0; i < arr.length; i++) {

		var payLoad = {
			code : arr[i].code,
			desc : /*(Alloy.Globals.isEnglish) ? arr[i].enDesc : */arr[i].arDesc,
			total : arr[i].year3,
		};

		var imgSeparator = Ti.UI.createImageView({
			width : "100%",
			height : 1,
			bottom : 0,
			backgroundColor : Alloy.Globals.path.grayColor,
			touchEnabled : false
		});

		var row = Alloy.createController("Reports/GFSReports/gfs_Asse_LiaRow", payLoad).getView();

		if (value == arr[i].arDesc) {
			row.backgroundColor = "#66b2ff";
		}

		if (i < [arr.length - 1]) {
			row.add(imgSeparator);
		}

		row.doc = arr[i];

		rowData.push(row);

		row.addEventListener("click", function(e) {

			return;

			var win = Alloy.createController("").getView();
			if (OS_IOS) {
				Alloy.Globals.openWindow(win);
			} else {
				win.open();
			}

		});

	}

	$.tableView.data = rowData;

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




function loadChartData(arr) {

	arrXAxis = [];
	arrChartData = [];

	for (var i = 0; i < arr.length; i++) {

		arrXAxis.push(arr[i].code);

		arrChartData.push({
			name : arr[i].arDesc,
			y : parseFloat(arr[i].year3),
			sliced : false,
			selected : false,
			color : "#1e90ff",
		});

	}

};

function changeLanguage() {
	loadChartData(arrData);

	loadRows(arrData, "");

	var delay = setTimeout(function(e) {
		loadChartWithStyle(selectedChartStyle);
	}, 500);

	$.lblNavTitle.text = Alloy.Globals.selectedLanguage.gfsReports; //Alloy.Globals.selectedLanguage.dashBoard;
	$.lblReprotTitle.text = Alloy.Globals.selectedLanguage.statementsOfGovtOperationsAssetsAndLiabilities,
	$.lblDesc.text = Alloy.Globals.selectedLanguage.descriptionTitle; 
	$.lblCode.text = Alloy.Globals.selectedLanguage.codeTitle;
	$.lblTotal.text = Alloy.Globals.selectedLanguage.totalText;

	var alignment;

	if (Alloy.Globals.isEnglish) {

		alignment = Titanium.UI.TEXT_ALIGNMENT_LEFT;
		//$.lblBudgetActivity.left = $.arrowView.right = 10;
		//$.lblBudgetActivity.right = 40;
		$.lblCode.left = (Alloy.Globals.GetWidth(5) + density);
		$.lblDesc.left = (Alloy.Globals.GetWidth(80) + density);
		$.lblTotal.left = (Alloy.Globals.GetWidth(220) + density);

		/*$.arrowView.left = */$.lblCode.right = $.lblDesc.right = $.lblTotal.right = undefined;

		//$.arrowView.backgroundImage = Alloy.Globals.path.icnArrowBrownRight;
	} else {
		alignment = Titanium.UI.TEXT_ALIGNMENT_RIGHT;
		//$.lblBudgetActivity.right = $.arrowView.left = 10;
		//$.lblBudgetActivity.left = 40;

		$.lblCode.right = (Alloy.Globals.GetWidth(5) + density);
		$.lblDesc.right = (Alloy.Globals.GetWidth(80) + density);
		$.lblTotal.right = (Alloy.Globals.GetWidth(220) + density);

		/*$.arrowView.right =*/ $.lblCode.left = $.lblDesc.left = $.lblTotal.left = undefined;
		//$.arrowView.backgroundImage = Alloy.Globals.path.icnArrowBrownLeft;
	}

	$.lblReprotTitle.textAlign = alignment;
	//$.lblBudgetActivity.textAlign = alignment;
}

function loadChartWithStyle(style) {

	
	if (style == "GFS ASSE_LIA BAR") {
		$.normalChart.loadChart(style, arrChartData, arrXAxis);
	}

}
$.winGFS_Asse_Lia.addEventListener("close", function(e) {
	Ti.App.removeEventListener("ChartData",highlightSelectedRow);
});

changeLanguage();
