var httpManager = require('httpManager');

var args = arguments[0] || {};
var arrXAxis = [];
var arrChartData = [];
var noOfYears = args.noOfYears;
var density;
var selectedChartStyle = "GFS REV_EXP BAR";
var chartColor = "";
var isTableViewOpened = false;

var arr = args.arrData;

function hideTableView() {

	$.TableBackView.visible = false;
	var hideCarouselView = Ti.UI.createAnimation({
		bottom : -(Alloy.Globals.GetHeight(120)),
		curve : Ti.UI.ANIMATION_CURVE_EASE_OUT,
		duration : 300,
	});

	$.slidingView.animate(hideCarouselView);

}

function highlightSelectedRow(e) {

	loadRows(arr, e.data);
	$.TableBackView.visible = true;
	var showCarouselView = Ti.UI.createAnimation({
		bottom : 25,
		curve : Ti.UI.ANIMATION_CURVE_EASE_OUT,
		duration : 300,
	});

	$.slidingView.animate(showCarouselView);
}

$.lblBudgetActivity.text = Alloy.Globals.selectedLanguage.lblFederalBudget + " - " + "2015";

if (OS_IOS) {
	density = "dp";
} else {
	density = "px";
}

var chartType = "PIE";

/*$.winFederalBudget.addEventListener("open", function(e) {
	Alloy.Globals.arrWindows.push($.winFederalBudget);
	Ti.App.addEventListener("ChartData", highlightSelectedRow);
	$.slidingView.height = (Alloy.Globals.GetHeight(120) + density);
	$.slidingView.bottom = -(Alloy.Globals.GetHeight(120));

	$.budgetActivityView.height = (Alloy.Globals.GetHeight(35) + density);
	$.sectionView.height = (Alloy.Globals.GetHeight(30) + density);
	$.lblDesc.width = "48%";
	$.lblTotal.width = "48%";
	$.budgetView.height = (Alloy.Globals.GetHeight(150) + density);
	$.chartStyleView.height = (Alloy.Globals.GetHeight(130) + density);
	$.lblChart.height = (Alloy.Globals.GetHeight(30) + density);
	$.pieChartView.height = $.barChartView.height = (Alloy.Globals.GetHeight(30) + density);

});*/

if (Alloy.Globals.isIOS7Plus) {
	$.winFederalBudget.extendEdges = [Ti.UI.EXTEND_EDGE_TOP];
	$.statusBar.height = 20;
	$.budgetView.top = 75;
	$.chartStyleView.top = 65;
	$.transparentView.top = 65;
}

//Declaring variables for setting boolean for checking CarouselView, SectorView, ChartStyleview etc is opened or not
var isCarouselOpened = false;
var isSectorViewOpened = false;
var isChartStyleOpened = false;

function showChartStyleView() {

	if (isSectorViewOpened) {
		showSectorView();
		return;
	} else if (isCarouselOpened) {
		showCarouselView();
		return;
	}

	if (!isChartStyleOpened) {

		$.transparentView.visible = true;
		$.chartStyleView.visible = true;

		$.navChartBackView.backgroundImage = Alloy.Globals.path.bgIcnChartStyleSelected;
		$.imgChartStyle.backgroundImage = "transparent";
		isChartStyleOpened = true;
	} else {

		$.transparentView.visible = false;
		$.chartStyleView.visible = false;

		$.navChartBackView.backgroundImage = "transparent";
		$.imgChartStyle.backgroundImage = Alloy.Globals.path.icnChartStyleUnselected;
		isChartStyleOpened = false;
	}

}

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

function showHideView() {

	if (isSectorViewOpened) {
		showSectorView();
	} else if (isChartStyleOpened) {
		showChartStyleView();
	}

}

function closeWindow() {
	Alloy.Globals.closeWindow($.winFederalBudget);
}

function gotoHome() {
	Alloy.Globals.gotoHome();
}

var currentTime = new Date();
var year = currentTime.getFullYear();
var selectedIndex = 0;
function loadRows(arr, value) {

	var rowData = [];
	for (var i = 0; i < arr.length; i++) {

		var payLoad = {
			//	code : arr[i].code,
			index : i,
			desc : (Alloy.Globals.isEnglish) ? arr[i].enDesc : arr[i].arDesc,
			total : Alloy.Globals.addCommas(arr[i].total)//arr[i].y,
		};

		var imgSeparator = Ti.UI.createImageView({
			width : "100%",
			height : 1,
			bottom : 0,
			backgroundColor : Alloy.Globals.path.grayColor,
			touchEnabled : false
		});

		var row = Alloy.createController("FinancialData/GFSReports/gfs_FederalUnionRow", payLoad).getView();

		if (value == [(Alloy.Globals.isEnglish) ? arr[i].enDesc : arr[i].arDesc]) {
			row.backgroundColor = Alloy.Globals.path.graphTableSelectionColor;
			selectedIndex = i;
		}

		row.add(imgSeparator);
		row.doc = arr[i];
		rowData.push(row);
		row.addEventListener("click", function(e) {
			
			var index = e.index;
			
			if (e.index == 2)
				return;

			if (e.index == 0) {
				//exp

				httpManager.getFederalUnion_ExpSubCategory(year, "ExpValue", function(e) {
					Ti.API.info('GFS Federal Union Expense Sub Category == ' + JSON.stringify(e));

					if (e.length == 0) {
						return;
					}

					payLoad = {
						index : index,
						arrData : e,
					};

					var win = Alloy.createController("FinancialData/GFSReports/winFederalBudgetSubDetails", payLoad).getView();
					Alloy.Globals.openWindow(win);
				});

			} else if (e.index == 1) {
				//getFederalUnion_AsseSubCategory
		
					httpManager.getFederalUnion_AsseSubCategory(year, "AssetValue", function(e) {
					Ti.API.info('GFS Federal Union Asset Sub Category == ' + JSON.stringify(e));

					if (e.length == 0) {
						return;
					}

					payLoad = {
						index : index,
						arrData : e,
					};

					var win = Alloy.createController("FinancialData/GFSReports/winFederalBudgetSubDetails", payLoad).getView();
					Alloy.Globals.openWindow(win);
				});
				
		
			}

		});

	}

	$.tableView.data = rowData;
	if (rowData.length > 0) {
		$.tableView.scrollToIndex(selectedIndex);
	}

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
			selectedBackgroundColor : Alloy.Globals.path.navBarColor
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

				if (e == null) {
					return;
				}

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

var isPieChartSelected = false;
function pieChartSelected() {

	if (isPieChartSelected) {
		$.pieChartView.backgroundColor = "transparent";
		isPieChartSelected = false;
	} else {
		chartType = "PIE";
		$.pieChartView.backgroundColor = Alloy.Globals.path.selectedRowColor;
		$.barChartView.backgroundColor = "transparent";
		isPieChartSelected = true;
		isBarChartSelected = false;
	}

}

var isBarChartSelected = false;
function barChartSelected() {
	if (isBarChartSelected) {
		$.barChartView.backgroundColor = "transparent";
		isBarChartSelected = false;
	} else {
		chartType = "BAR";
		$.barChartView.backgroundColor = Alloy.Globals.path.selectedRowColor;
		$.pieChartView.backgroundColor = "transparent";
		isBarChartSelected = true;
		isPieChartSelected = false;
	}

}

function loadChartData(arr) {

	Ti.API.info('arr==' + JSON.stringify(arr));
	arrXAxis = [];
	arrChartData = [];
	colors = [{
		linearGradient : Alloy.Globals.gradientRadialShape,
		stops : [[0, 'rgb(248, 152, 131)'], [1, 'rgb(217, 102, 102)']]
	}, {
		linearGradient : Alloy.Globals.gradientRadialShape,
		stops : [[0, 'rgb(117, 246, 245)'], [1, 'rgb(7,192,192)']]
	}];

	Ti.API.info("========GFS FEDERAL PIE======");

	selectedChartStyle = "GFS_INDICIES PIE";

	for (var i = 0; i < 2; i++) {

		//	if (arr[i].code == "1") {
		arrXAxis.push(arr[i].code);
		arrChartData.push({
			name : (Alloy.Globals.isEnglish) ? arr[i].enDesc : arr[i].arDesc,
			y : parseFloat(arr[i].total),
			sliced : false,
			selected : false,
			color : colors[i],
		});

	}

	loadRows(arrChartData, "");
};

function changeLanguage() {

	loadChartData(arr);

	loadRows(arr, "");
	var delay = setTimeout(function(e) {
		loadChartWithStyle(selectedChartStyle);
	}, 500);

	if (args.isFromDashboard) {
		$.lblNavTitle.text = Alloy.Globals.selectedLanguage.openFinancialData;
	} else {
		$.lblNavTitle.text = Alloy.Globals.selectedLanguage.gfsFederalUnion;
	}
	$.lblChart.text = Alloy.Globals.selectedLanguage.presentationStyle;
	$.lblDesc.text = Alloy.Globals.selectedLanguage.description;
	$.lblTotal.text = Alloy.Globals.selectedLanguage.total;
	var alignment;

	if (Alloy.Globals.isEnglish) {

		alignment = Titanium.UI.TEXT_ALIGNMENT_LEFT;
		$.imgClose.right = 5;
		$.lblBudgetActivity.left = 10;
		$.lblBudgetActivity.right = 40;
		$.lblDesc.left = "2%";
		$.lblTotal.right = "2%";
		$.imgClose.left = $.lblDesc.right = $.lblTotal.left = undefined;
		$.icnBarChart.left = $.icnPieChart.left = 10;
		$.lblBarChart.left = $.lblPieChart.left = (Alloy.isTablet) ? 60 : 40;
		$.icnBarChart.right = $.lblBarChart.right = $.icnPieChart.right = $.lblPieChart.right = undefined;
	} else {
		alignment = Titanium.UI.TEXT_ALIGNMENT_RIGHT;
		$.imgClose.left = 5;
		$.lblBudgetActivity.right = 10;
		$.lblBudgetActivity.left = 40;
		$.lblDesc.right = "2%";
		$.lblTotal.left = "2%";
		$.imgClose.right = $.lblDesc.left = $.lblTotal.right = undefined;
		$.icnBarChart.right = $.icnPieChart.right = 10;
		$.lblBarChart.right = $.lblPieChart.right = (Alloy.isTablet) ? 60 : 40;
		$.icnBarChart.left = $.lblBarChart.left = $.icnPieChart.left = $.lblPieChart.left = undefined;
	}

	$.lblChart.textAlign = $.lblBudgetActivity.textAlign = alignment;
}

function loadChartWithStyle(style) {
	$.normalChart.loadChart(style, arrChartData, arrXAxis, Alloy.Globals.selectedLanguage.revenueExpenses, Alloy.Globals.selectedLanguage.MillionAED, (Alloy.isTablet) ? 80 : 60);
}

function chartTypeSelected() {

	loadChartData();

	var delay = setTimeout(function(e) {
		loadChartWithStyle(selectedChartStyle);
	}, 500);

	showHideView();
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

$.winFederalBudget.addEventListener("focus", function(e) {
	if (Alloy.Globals.currentTheme == "dark") {
		$.normalChart.backgroundColor = "black";
	} else {
		$.normalChart.backgroundColor = "white";
	}
	$.viewBottomToolbar.setDefaultTheme($.winFederalBudget);
	Ti.Gesture.addEventListener("orientationchange", changeOrientation);
});

$.winFederalBudget.addEventListener("blur", function(e) {
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
		$.viewBottomToolbar.changeFont($.winFederalBudget);
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
		$.viewBottomToolbar.changeTheme($.winFederalBudget);
	}
});
/**
 * Called on open of the window
 * 
 * @param {Object} e
 */
var windowOpened = function(e){
	Alloy.Globals.arrWindows.push($.winFederalBudget);
	Ti.App.addEventListener("ChartData", highlightSelectedRow);
	$.slidingView.height = (Alloy.Globals.GetHeight(120) + density);
	$.slidingView.bottom = -(Alloy.Globals.GetHeight(120));

	$.budgetActivityView.height = (Alloy.Globals.GetHeight(35) + density);
	$.sectionView.height = (Alloy.Globals.GetHeight(30) + density);
	$.lblDesc.width = "48%";
	$.lblTotal.width = "48%";
	$.budgetView.height = (Alloy.Globals.GetHeight(150) + density);
	$.chartStyleView.height = (Alloy.Globals.GetHeight(130) + density);
	$.lblChart.height = (Alloy.Globals.GetHeight(30) + density);
	$.pieChartView.height = $.barChartView.height = (Alloy.Globals.GetHeight(30) + density);

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
	Ti.App.removeEventListener("ChartData", highlightSelectedRow);
	$.imgBackBtn = $.imgHomeBtn = $.normalChart = $.tableView = $.budgetTableView = $.imgClose = null;
	$.icnPieChart = $.icnBarChart = null;
	$.destroy();
};

$.viewBottomToolbar.setDefaultTheme($.winFederalBudget);
