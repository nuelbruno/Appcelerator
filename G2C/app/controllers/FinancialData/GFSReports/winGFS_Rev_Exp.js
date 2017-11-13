var httpManager = require('httpManager');

var args = arguments[0] || {};
var arrRev = args.arrRev;
var arrExp = args.arrExp;
var arrXAxis = [];
var arrChartData = [];
var noOfYears = args.noOfYears;

var density;
var selectedChartStyle = "GFS REV_EXP BAR";
var chartColor = "";
var isTableViewOpened = false;

function hideTableView() {

	$.TableBackView.visible = false;
	var hideCarouselView = Ti.UI.createAnimation({
		bottom : -(Alloy.Globals.GetHeight(90)),
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

$.lblBudgetActivity.text = Alloy.Globals.selectedLanguage.gfsRev_Exp + ": " + Alloy.Globals.GFSYear;

if (OS_IOS) {
	density = "dp";
} else {
	density = "px";
}

var chartType = "BAR";

/*$.winGFS_Rev_Exp.addEventListener("open", function(e) {
 Alloy.Globals.arrWindows.push($.winGFS_Rev_Exp);
 Ti.App.addEventListener("ChartData", highlightSelectedRow);
 $.slidingView.height = (Alloy.Globals.GetHeight(90) + density);
 $.slidingView.bottom = -(Alloy.Globals.GetHeight(90));
 $.budgetActivityView.height = (Alloy.Globals.GetHeight(35) + density);
 $.sectionView.height = (Alloy.Globals.GetHeight(30) + density);
 $.lblCode.width = "26%";
 $.lblDesc.width = "48%";
 $.lblTotal.width = "28%";
 $.budgetView.height = (Alloy.Globals.GetHeight(150) + density);
 });*/

if (Alloy.Globals.isIOS7Plus) {
	$.winGFS_Rev_Exp.extendEdges = [Ti.UI.EXTEND_EDGE_TOP];
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
		//showChartStyleView();
	}

}

function closeWindow() {
	Alloy.Globals.closeWindow($.winGFS_Rev_Exp);
}

function gotoHome() {
	Alloy.Globals.gotoHome();
}

var selectedIndex = 0;
function loadRows(arr, value) {

	var rowData = [];
	for (var i = 0; i < arr.length; i++) {

		var payLoad = {
			index : i,
		//	code : arrXAxis[i],
			desc : arr[i].name,
			total : Alloy.Globals.addCommas(arr[i].y)//arr[i].y,
		};

		var imgSeparator = Ti.UI.createImageView({
			width : "100%",
			height : 1,
			bottom : 0,
			backgroundColor : Alloy.Globals.path.grayColor,
			touchEnabled : false,
			isToExclude_contrast : true
		});

		var row = Alloy.createController("FinancialData/GFSReports/gfs_FederalUnionRow", payLoad).getView();

		if (value == arr[i].name) {
			row.backgroundColor = Alloy.Globals.path.graphTableSelectionColor;
			selectedIndex = i;
		}
		row.add(imgSeparator);
		row.doc = arr[i];
		rowData.push(row);
		row.addEventListener("click", function(e) {

			var payLoad;

			if (e.index == 0) {
				payLoad = {
					index : 0,
					arrData : arrRev,
					isFromDashboard : args.isFromDashboard
				};
			} else {
				payLoad = {
					index : 1,
					arrData : arrExp,
					isFromDashboard : args.isFromDashboard
				};
			}

			var win = Alloy.createController("FinancialData/GFSReports/winGFS_Rev_ExpDetails", payLoad).getView();
			if (OS_IOS) {
				Alloy.Globals.openWindow(win);
			} else {
				win.open();
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

function loadChartData() {

	arrXAxis = [];
	arrChartData = [];

	if (chartType == "BAR") {

		var colors = [{
			linearGradient : Alloy.Globals.gradiantLinearShape,
			stops : [[0, 'rgb(248, 152, 131)'], [1, 'rgb(217, 102, 102)']]
		}, {
			linearGradient : Alloy.Globals.gradiantLinearShape,
			stops : [[0, 'rgb(117, 246, 245)'], [1, 'rgb(7,192,192)']]
		}];

		Ti.API.info("======GFS REV_EXP======");

		selectedChartStyle = "GFS REV_EXP BAR";

		for (var i = 0; i < 5; i++) {

			if (arrRev[i].code == "1") {
				//arrXAxis.push(arrRev[i].code);
				arrXAxis.push((Alloy.Globals.isEnglish) ? arrRev[i].enDesc : arrRev[i].arDesc);
				arrChartData.push({
					name : (Alloy.Globals.isEnglish) ? arrRev[i].enDesc : arrRev[i].arDesc,
					y : parseFloat(arrRev[i].year3),
					sliced : false,
					selected : false,
					color : colors[0],
				});
			}

			if (arrExp[i].code == "2") {
				//arrXAxis.push(arrExp[i].code);
				arrXAxis.push((Alloy.Globals.isEnglish) ? arrExp[i].enDesc : arrExp[i].arDesc);
				arrChartData.push({
					name : (Alloy.Globals.isEnglish) ? arrExp[i].enDesc : arrExp[i].arDesc,
					y : parseFloat(arrExp[i].year3),
					sliced : false,
					selected : false,
					color : colors[1],
				});
			}

		}

		loadRows(arrChartData, "");
		arrRev_Exp = arrChartData;

	}
};

function changeLanguage() {

	loadChartData();
	var delay = setTimeout(function(e) {
		loadChartWithStyle(selectedChartStyle);
	}, 500);

	if (args.isFromDashboard) {
		$.lblNavTitle.text = Alloy.Globals.selectedLanguage.openFinancialData;
	} else {
		$.lblNavTitle.text = Alloy.Globals.selectedLanguage.gfsReports;
	}
	$.lblDesc.text = Alloy.Globals.selectedLanguage.description;
//	$.lblCode.text = Alloy.Globals.selectedLanguage.code;
	$.lblTotal.text = Alloy.Globals.selectedLanguage.total;

	var alignment;

	if (Alloy.Globals.isEnglish) {

		alignment = Titanium.UI.TEXT_ALIGNMENT_LEFT;
		$.imgClose.right = 5;
	//	$.lblCode.left = "1%";
		$.lblDesc.left = "2%";
		$.lblTotal.right = "2%";
		(Alloy.Globals.GetWidth(200) + density);
		$.imgClose.left = /*$.lblCode.right = */$.lblDesc.right = $.lblTotal.left = undefined;
	} else {
		alignment = Titanium.UI.TEXT_ALIGNMENT_RIGHT;
		$.imgClose.left = 5;

	//	$.lblCode.right = "1%";
		$.lblDesc.right = "2%";
		$.lblTotal.left = "2%";
		$.imgClose.right = /*$.lblCode.left = */$.lblDesc.left = $.lblTotal.right = undefined;
	}
	$.lblBudgetActivity.textAlign = alignment;
}

function loadChartWithStyle(style) {
	$.normalChart.loadChart(style, arrChartData, arrXAxis, Alloy.Globals.selectedLanguage.revenueExpenses, Alloy.Globals.selectedLanguage.values, (Alloy.isTablet) ? 120 : 100);
}

/*$.winGFS_Rev_Exp.addEventListener("close", function(e) {
 Alloy.Globals.arrWindows.pop();
 Ti.App.removeEventListener("ChartData", highlightSelectedRow);
 $.imgBackBtn = $.imgHomeBtn = $.imgChartStyle = $.normalChart = $.tableView = $.budgetTableView = $.imgClose = null;
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

$.winGFS_Rev_Exp.addEventListener("focus", function(e) {
	if (Alloy.Globals.currentTheme == "dark") {
		$.normalChart.backgroundColor = "black";
	} else {
		$.normalChart.backgroundColor = "white";
	}
	$.viewBottomToolbar.setDefaultTheme($.winGFS_Rev_Exp);
	Ti.Gesture.addEventListener("orientationchange", changeOrientation);
});

$.winGFS_Rev_Exp.addEventListener("blur", function(e) {
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
		$.viewBottomToolbar.changeFont($.winGFS_Rev_Exp);
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
		$.viewBottomToolbar.changeTheme($.winGFS_Rev_Exp);
	}
});
/**
 * Called on open of the window
 *
 * @param {Object} e
 */
var windowOpened = function(e) {
	Alloy.Globals.arrWindows.push($.winGFS_Rev_Exp);
	Ti.App.addEventListener("ChartData", highlightSelectedRow);
	$.slidingView.height = (Alloy.Globals.GetHeight(90) + density);
	$.slidingView.bottom = -(Alloy.Globals.GetHeight(90));
	$.budgetActivityView.height = (Alloy.Globals.GetHeight(35) + density);
	$.sectionView.height = (Alloy.Globals.GetHeight(30) + density);
//	$.lblCode.width = "26%";
	$.lblDesc.width = "48%";
	$.lblTotal.width = "45%";
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
	Ti.App.removeEventListener("ChartData", highlightSelectedRow);
	$.imgBackBtn = $.imgHomeBtn = $.imgChartStyle = $.normalChart = $.tableView = $.budgetTableView = $.imgClose = null;
	$.destroy();
};

$.viewBottomToolbar.setDefaultTheme($.winGFS_Rev_Exp); 