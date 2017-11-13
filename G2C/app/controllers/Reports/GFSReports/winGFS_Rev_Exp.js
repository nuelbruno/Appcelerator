var httpManager = require("httpManager");//Alloy.createController('common/httpManager');

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
		bottom : 0,
		curve : Ti.UI.ANIMATION_CURVE_EASE_OUT,
		duration : 300,
	});

	$.slidingView.animate(showCarouselView);
}


if (OS_IOS) {
	density = "dp";
} else {
	density = "px";
}

$.winGFS_Rev_Exp.addEventListener("open", function(e) {
    $.mainView.layout ='vertical';
	Ti.App.addEventListener("ChartData", highlightSelectedRow);
	
	$.slidingView.height = (Alloy.Globals.GetHeight(90) + density);
	$.slidingView.bottom = -(Alloy.Globals.GetHeight(90));
	$.lblCode.width = (Alloy.Globals.GetWidth(70) + density);
	$.lblDesc.width = (Alloy.Globals.GetWidth(135) + density);
	$.lblTotal.width = (Alloy.Globals.GetWidth(80) + density);
	
});

if (Alloy.Globals.isIOS7Plus) {
	$.winGFS_Rev_Exp.extendEdges = [Ti.UI.EXTEND_EDGE_TOP];
	$.statusBar.height = 20;
	
}

function closeWindow() {
	Alloy.Globals.closeWindow($.winGFS_Rev_Exp);
}


function loadRows(arr, value) {
	
	var rowData = [];
	for (var i = 0; i < arr.length; i++) {

		var payLoad = {
			code : arrXAxis[i],
			desc : arr[i].name,
			total : arr[i].y,
		};

		var imgSeparator = Ti.UI.createImageView({
			width : "100%",
			height : 1,
			bottom : 0,
			backgroundColor : Alloy.Globals.path.grayColor,
			touchEnabled : false
		});

		var row = Alloy.createController("Reports/GFSReports/gfs_Asse_LiaRow", payLoad).getView();

		if (value == arr[i].name) {
			row.backgroundColor = "#66b2ff";
		}

		//	if (i < [arr.length - 1]) {
		row.add(imgSeparator);
		//	}

		row.doc = arr[i];

		rowData.push(row);

		row.addEventListener("click", function(e) {
			
			var payLoad;
			
			if(e.index == 0){
				payLoad = {
					index : 0,
					arrData : arrRev
				};
			}else{
				payLoad = {
					index : 1,
					arrData : arrExp
				};
			}
			
			var win = Alloy.createController("Reports/GFSReports/winGFS_Rev_ExpDetails",payLoad).getView();
			if (OS_IOS) {
				Alloy.Globals.openWindow(win);
			} else {
				win.open();
			}

		});

	}

	$.tableView.data = rowData;

}

function loadChartData() {

	arrXAxis = [];
	arrChartData = [];

	for (var i = 0; i < 5; i++) {

		if (arrRev[i].code == "1") {
			arrXAxis.push(arrRev[i].code);
			arrChartData.push({
				name : arrRev[i].arDesc,
				y : parseFloat(arrRev[i].year3),
				sliced : false,
				selected : false,
				color : "#1e90ff",
			});
		} 
		
		if (arrExp[i].code == "2") {
			arrXAxis.push(arrExp[i].code);
			arrChartData.push({
				name : arrExp[i].arDesc,
				y : parseFloat(arrExp[i].year3),
				sliced : false,
				selected : false,
				color : "#1e90ff",
			});
		}

	}
	loadRows(arrChartData, "");
};

function changeLanguage() {
	loadChartData();

	

	var delay = setTimeout(function(e) {
		loadChartWithStyle(selectedChartStyle);
	}, 500);
	
	$.lblNavTitle.text = Alloy.Globals.selectedLanguage.gfsReports;
	$.lblReprotTitle.text = Alloy.Globals.selectedLanguage.gfsReportsByRevenueAndExpense; //Alloy.Globals.selectedLanguage.dashBoard;
	
	$.lblDesc.text = Alloy.Globals.selectedLanguage.descriptionTitle;
	$.lblCode.text = Alloy.Globals.selectedLanguage.codeTitle;
	$.lblTotal.text = Alloy.Globals.selectedLanguage.totalText;

	var alignment;

	if (Alloy.Globals.isEnglish) {

		alignment = Titanium.UI.TEXT_ALIGNMENT_LEFT;
		$.lblCode.left = (Alloy.Globals.GetWidth(5) + density);
		$.lblDesc.left = (Alloy.Globals.GetWidth(80) + density);
		$.lblTotal.left = (Alloy.Globals.GetWidth(220) + density);
		$.lblCode.right = $.lblDesc.right = $.lblTotal.right = undefined;
	} else {
		alignment = Titanium.UI.TEXT_ALIGNMENT_RIGHT;
		$.lblCode.right = (Alloy.Globals.GetWidth(5) + density);
		$.lblDesc.right = (Alloy.Globals.GetWidth(80) + density);
		$.lblTotal.right = (Alloy.Globals.GetWidth(220) + density);
		$.lblCode.left = $.lblDesc.left = $.lblTotal.left = undefined;
	}
	$.lblReprotTitle.textAlign = alignment;
}



function loadChartWithStyle(style) {

	
	if (style == "GFS REV_EXP BAR") {

	
		$.normalChart.loadChart(style, arrChartData, arrXAxis);

	}

}



$.winGFS_Rev_Exp.addEventListener("close", function(e) {
	Ti.App.removeEventListener("ChartData",highlightSelectedRow);
});

changeLanguage();
