var httpManager = require('httpManager');

var args = arguments[0] || {};
var arrData = args.arrData;
var arrXAxis = [];
var arrChartData = [];
var noOfYears = args.noOfYears;

var density;
var selectedChartStyle = "COFOG_GROUPS BAR";
var chartColor = "";

$.lblBudgetActivity.text = Alloy.Globals.selectedLanguage.gfsOutlays + ": "/*"Budget Execution By Cofog : "*/ + Alloy.Globals.GFSYear;

if (OS_IOS) {
	density = "dp";
} else {
	density = "px";
}

function hideTableView() {

	$.TableBackView.visible = false;
	var hideCarouselView = Ti.UI.createAnimation({
		bottom : -(Alloy.Globals.GetHeight(150)),
		curve : Ti.UI.ANIMATION_CURVE_EASE_OUT,
		duration : 300,
	});

	$.slidingView.animate(hideCarouselView);

}

function highlightSelectedRow(e) {

	loadRows(arrChartData, e.data);
	$.TableBackView.visible = true;
	var showCarouselView = Ti.UI.createAnimation({
		bottom : 25,
		curve : Ti.UI.ANIMATION_CURVE_EASE_OUT,
		duration : 300,
	});

	$.slidingView.animate(showCarouselView);
}

var selectedIndex = 0;
function loadRows(arr, value) {

	var rowData = [];
	for (var i = 0; i < arr.length; i++) {

		var payLoad = {
			index : i,
			code : arrXAxis[i],
			desc : arr[i].name,
			total : Alloy.Globals.addCommas(arr[i].y)//arr[i].y,
		};

		var imgSeparator = Ti.UI.createImageView({
			width : "100%",
			height : 1,
			bottom : 0,
			backgroundColor : Alloy.Globals.path.grayColor,
			touchEnabled : false,
				isToExclude_contrast: true
		});

		var row = Alloy.createController("FinancialData/GFSReports/gfs_Asse_LiaRow", payLoad).getView();
		row.selectionStyle = 0;
		row.backgroundSelectedColor = "none";
		row.touchEnabled = false;
		row.bubbleParent = false;
		if (value == arr[i].name) {
			row.backgroundColor = Alloy.Globals.path.graphTableSelectionColor;
			selectedIndex = i;
		}
		row.add(imgSeparator);
		row.doc = arr[i];
		rowData.push(row);

	}

	$.tableView.data = rowData;
	if (rowData.length > 0) {
		$.tableView.scrollToIndex(selectedIndex);
	}
}

/*$.winGFS_OutlayCofogChart.addEventListener("open", function(e) {
	Alloy.Globals.arrWindows.push($.winGFS_OutlayCofogChart);
	$.budgetActivityView.height = (Alloy.Globals.GetHeight(35) + density);
	$.budgetView.height = (Alloy.Globals.GetHeight(150) + density);

	$.slidingView.height = (Alloy.Globals.GetHeight(150) + density);
	$.slidingView.bottom = -(Alloy.Globals.GetHeight(150));
	$.sectionView.height = (Alloy.Globals.GetHeight(30) + density);
	$.lblCode.width = "26%";
	$.lblDesc.width = "48%";
	$.lblTotal.width = "28%";

	Ti.App.addEventListener("ChartData", highlightSelectedRow);
});*/

if (Alloy.Globals.isIOS7Plus) {
	$.winGFS_OutlayCofogChart.extendEdges = [Ti.UI.EXTEND_EDGE_TOP];
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
	Alloy.Globals.closeWindow($.winGFS_OutlayCofogChart);
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
				isToExclude_contrast: true
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

	var colors = [{
		linearGradient : Alloy.Globals.gradiantLinearShape,
		stops : [[0, 'rgb(248, 152, 131)'], [1, 'rgb(217, 102, 102)']]
	}];

	arrXAxis = [];
	arrChartData = [];

	for (var i = 0; i < arr.length; i++) {

		arrXAxis.push(arr[i].code);

		arrChartData.push({
			name : (Alloy.Globals.isEnglish) ? arr[i].enDesc : arr[i].arDesc,
			y : parseFloat(arr[i].year3),
			sliced : false,
			selected : false,
			color : colors[0],
		});

	}

};

function changeLanguage() {

	loadChartData(arrData);
	loadBudgetRows();

	$.lblDesc.text = Alloy.Globals.selectedLanguage.description;
	$.lblCode.text = Alloy.Globals.selectedLanguage.code;
	$.lblTotal.text = Alloy.Globals.selectedLanguage.total;

	var delay = setTimeout(function(e) {
		loadChartWithStyle(selectedChartStyle);
	}, 500);

	if (args.isFromDashboard) {
		$.lblNavTitle.text = Alloy.Globals.selectedLanguage.openFinancialData;
	} else {
		$.lblNavTitle.text = Alloy.Globals.selectedLanguage.gfsReports;
	}
	var alignment;

	if (Alloy.Globals.isEnglish) {

		$.lblCode.left = "1%";
		$.lblDesc.left = "21%";
		$.lblTotal.left = "69%";
		$.lblCode.right = $.lblDesc.right = $.lblTotal.right = undefined;
		alignment = Titanium.UI.TEXT_ALIGNMENT_LEFT;
		$.imgClose.right = 5;
		$.imgClose.left = undefined;
	} else {
		$.lblCode.right = "1%";
		$.lblDesc.right = "21%";
		$.lblTotal.right = "69%";
		$.lblCode.left = $.lblDesc.left = $.lblTotal.left = undefined;
		alignment = Titanium.UI.TEXT_ALIGNMENT_RIGHT;
		$.imgClose.left = 5;
		$.imgClose.right = undefined;
	}
	$.lblBudgetActivity.textAlign = alignment;
}


function loadChartWithStyle(style) {

	if (style == "COFOG_GROUPS BAR") {
		$.normalChart.loadChart(style, arrChartData, arrXAxis, Alloy.Globals.selectedLanguage.cofogs, Alloy.Globals.selectedLanguage.values, (Alloy.isTablet) ? 95 : 70);
	}

}

/*$.winGFS_OutlayCofogChart.addEventListener("close", function(e) {
	Alloy.Globals.arrWindows.pop();
	$.imgBackBtn = $.imgHomeBtn = $.normalChart = $.budgetTableView = $.imgClose = null;
	Ti.App.removeEventListener("ChartData", highlightSelectedRow);
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

$.winGFS_OutlayCofogChart.addEventListener("focus", function(e) {
	if (Alloy.Globals.currentTheme == "dark") {
		$.normalChart.backgroundColor = "black";
	} else {
		$.normalChart.backgroundColor = "white";
	}
	$.viewBottomToolbar.setDefaultTheme($.winGFS_OutlayCofogChart);
	Ti.Gesture.addEventListener("orientationchange", changeOrientation);
});

$.winGFS_OutlayCofogChart.addEventListener("blur", function(e) {
	Ti.Gesture.removeEventListener("orientationchange", changeOrientation);
});

changeLanguage();



/**
 * Adding the eventlistener for the bottom bar view
 *
 * @param {Object} e
 */
$.viewBottomToolbar.getView().addEventListener('click', function(e) {
	if(e.source.buttonId == 'btnFontChange'){
		$.viewBottomToolbar.changeFont($.winGFS_OutlayCofogChart);
	}else if(e.source.buttonId == 'btnSystemFeedback'){
		$.viewBottomToolbar.openFeedbackScreen(e);
	}else/* if(e.source.buttonId == 'btnSystemInstruction'){
		$.viewInstructions.openHelpScreen(e);
	}*/if (e.source.buttonId == 'btnSystemChangeTheme') {
		if (Alloy.Globals.currentTheme == "dark") {
			$.normalChart.backgroundColor = "white";
		} else {
			$.normalChart.backgroundColor = "black";
		}
		$.viewBottomToolbar.changeTheme($.winGFS_OutlayCofogChart);
	}
});
/**
 * Called on open of the window
 * 
 * @param {Object} e
 */
var windowOpened = function(e){
	Alloy.Globals.arrWindows.push($.winGFS_OutlayCofogChart);
	$.budgetActivityView.height = (Alloy.Globals.GetHeight(35) + density);
	$.budgetView.height = (Alloy.Globals.GetHeight(150) + density);

	$.slidingView.height = (Alloy.Globals.GetHeight(150) + density);
	$.slidingView.bottom = -(Alloy.Globals.GetHeight(150));
	$.sectionView.height = (Alloy.Globals.GetHeight(30) + density);
	$.lblCode.width = "20%";
	$.lblDesc.width = "46%";
	$.lblTotal.width = "30%";

	Ti.App.addEventListener("ChartData", highlightSelectedRow);
	$.viewBottomToolbar.setOptions({
		showThemeButton : true,
		showInstructions : false,
		showFeedBack :true,
		showFontResize:false
	});
};

/**
 * Window is closed
 * 
 * @param {Object} e
 */
var windowClosed = function(e){
	Alloy.Globals.arrWindows.pop();
	$.imgBackBtn = $.imgHomeBtn = $.normalChart = $.budgetTableView = $.imgClose = null;
	Ti.App.removeEventListener("ChartData", highlightSelectedRow);
	$.destroy();
};

$.viewBottomToolbar.setDefaultTheme($.winGFS_OutlayCofogChart);