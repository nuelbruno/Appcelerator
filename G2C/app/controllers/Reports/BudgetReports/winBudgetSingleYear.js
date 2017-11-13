var httpManager = require("httpManager");//Alloy.createController('common/httpManager');

var args = arguments[0] || {};

//alert(args.data);
//alert(args.selectedChartStyle);

var arrData = args;
var arrXAxis = [];
var arrChartData = [];
var noOfYears = args.noOfYears;

var density;
var selectedChartStyle = "BUDGET SINGLE YEAR";
//args.selectedChartStyle;

var chartColor = "";
//args.chartColor;

// alert("args = "+JSON.stringify(args));
//Declaring and defining for highlight selected row
function highlightSelectedRow(e) {
 	loadRows(arrData, e.data);
}

$.lblBudgetActivity.text = "Budget By : 2014";

//$.lblBudgetTitle.text = "Budget By Activity " + args.budgetTitle;

if (OS_IOS) {
	density = "dp";
} else {
	density = "px";
}

$.winBudgetSingleYear.addEventListener("open", function(e) {

	Ti.App.addEventListener("ChartData", highlightSelectedRow);

	//$.navSectorBackView.right = (Alloy.Globals.GetWidth(65) + density);
	//	$.imgSector.width = (Alloy.Globals.GetWidth(22) + density);

	//$.navCarouselBackView.right = (Alloy.Globals.GetWidth(35) + density);
	//	$.imgCarousel.width = (Alloy.Globals.GetWidth(22) + density);

	//$.navChartBackView.right = (Alloy.Globals.GetWidth(5) + density);
	//	$.imgChartStyle.width = (Alloy.Globals.GetWidth(22) + density);

	$.budgetActivityView.height = (Alloy.Globals.GetHeight(30) + density);
	//	$.chartView.height = (Alloy.Globals.GetHeight(180) + density);
	$.sectionView.height = (Alloy.Globals.GetHeight(30) + density);
	$.lblCode.width = $.lblGroup21.width = $.lblGroup22.width = $.lblGroup31.width = $.lblTotal.width = (Alloy.Globals.GetWidth(60) + density);
	$.budgetView.height = (Alloy.Globals.GetHeight(150) + density);
	//	$.sectorTableView.height = (Alloy.Globals.GetHeight(90) + density);
	//	$.chartStyleTableView.height = (Alloy.Globals.GetHeight(60) + density);
	//	$.lblSector.height = (Alloy.Globals.GetHeight(30) + density);
	//	$.lblChart.height = (Alloy.Globals.GetHeight(30) + density);
	//	$.carouselBackView.height = Alloy.Globals.platformHeight - 45;

	// $.budgetView1.top = Alloy.Globals.platformHeight;
	// $.budgetView2.top = Alloy.Globals.platformHeight;
	// $.budgetView3.top = Alloy.Globals.platformHeight;
	// $.budgetView4.top = Alloy.Globals.platformHeight;
	// $.budgetView5.top = Alloy.Globals.platformHeight;
});

if (Alloy.Globals.isIOS7Plus) {
	//	$.winBudgetSingleYear.statusBarStyle = Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT;
	$.winBudgetSingleYear.extendEdges = [Ti.UI.EXTEND_EDGE_TOP];
	$.statusBar.height = 20;
	$.budgetView.top = 75;
	//	$.sectorView.top = 65;
	//	$.chartStyleView.top = 65;
	//	$.transparentView.top = 65;
	//	$.carouselBackView.height = Alloy.Globals.platformHeight - 65;
}

//Declaring variables for setting boolean for checking CarouselView, SectorView, ChartStyleview etc is opened or not
var isCarouselOpened = false;
var isSectorViewOpened = false;
var isChartStyleOpened = false;

/*
 var animCarouselView = Ti.UI.createAnimation({
 top : (Alloy.Globals.isIOS7Plus) ? 65 : 45,
 bottom : 0,
 curve : Ti.UI.ANIMATION_CURVE_EASE_OUT,
 //	transform : Ti.UI.create2DMatrix().scale(0.9, 0.80),
 duration : 300,
 });

 var hideCarouselView = Ti.UI.createAnimation({
 top : Alloy.Globals.platformHeight,
 bottom : 0,
 curve : Ti.UI.ANIMATION_CURVE_EASE_OUT,
 //	transform : Ti.UI.create2DMatrix().scale(0.9, 0.80),
 duration : 300,
 });

 var showBudgetView1 = Ti.UI.createAnimation({
 top : "30%",
 bottom : 0,
 curve : Ti.UI.ANIMATION_CURVE_EASE_OUT,
 //	transform : Ti.UI.create2DMatrix().scale(0.9, 0.80),
 duration : 300,
 });

 var showBudgetView2 = Ti.UI.createAnimation({
 top : "40%",
 bottom : 0,
 curve : Ti.UI.ANIMATION_CURVE_EASE_OUT,
 //	transform : Ti.UI.create2DMatrix().scale(0.9, 0.80),
 duration : 300,
 });

 var showBudgetView3 = Ti.UI.createAnimation({
 top : "50%",
 bottom : 0,
 curve : Ti.UI.ANIMATION_CURVE_EASE_OUT,
 //	transform : Ti.UI.create2DMatrix().scale(0.9, 0.80),
 duration : 300,
 });

 var showBudgetView4 = Ti.UI.createAnimation({
 top : "60%",
 bottom : 0,
 curve : Ti.UI.ANIMATION_CURVE_EASE_OUT,
 //	transform : Ti.UI.create2DMatrix().scale(0.9, 0.80),
 duration : 300,
 });

 var showBudgetView5 = Ti.UI.createAnimation({
 top : "70%",
 bottom : 0,
 curve : Ti.UI.ANIMATION_CURVE_EASE_OUT,
 //	transform : Ti.UI.create2DMatrix().scale(0.9, 0.80),
 duration : 300,
 });

 var hideBudgetView = Ti.UI.createAnimation({
 top : Alloy.Globals.platformHeight,
 bottom : 0,
 curve : Ti.UI.ANIMATION_CURVE_EASE_OUT,
 //	transform : Ti.UI.create2DMatrix().scale(0.9, 0.80),
 duration : 200,
 });
 */
/*
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
 $.imgChartStyle.backgroundImage = "";
 isChartStyleOpened = true;
 } else {

 $.transparentView.visible = false;
 $.chartStyleView.visible = false;

 $.navChartBackView.backgroundImage = "";
 $.imgChartStyle.backgroundImage = Alloy.Globals.path.icnChartStyleUnselected;
 isChartStyleOpened = false;
 }

 }

 function showCarouselView() {

 return;

 if (isSectorViewOpened) {
 showSectorView();
 return;
 } else if (isChartStyleOpened) {
 showChartStyleView();
 return;
 }

 if (!isCarouselOpened) {

 $.navCarouselBackView.backgroundImage = Alloy.Globals.path.bgIcnCarouselSelected;
 $.imgCarousel.backgroundImage = "";

 $.carouselBackView.animate(animCarouselView);
 var view1 = setTimeout(function() {
 $.budgetView1.animate(showBudgetView1);
 }, 100);
 var view2 = setTimeout(function() {
 $.budgetView2.animate(showBudgetView2);
 }, 150);
 var view3 = setTimeout(function() {
 $.budgetView3.animate(showBudgetView3);
 }, 200);
 var view4 = setTimeout(function() {
 $.budgetView4.animate(showBudgetView4);
 }, 250);
 var view5 = setTimeout(function() {
 $.budgetView5.animate(showBudgetView5);
 }, 300);
 isCarouselOpened = true;
 } else {
 $.navCarouselBackView.backgroundImage = "";
 $.imgCarousel.backgroundImage = Alloy.Globals.path.icnCarouselUnselected;

 var view5 = setTimeout(function() {
 $.budgetView5.animate(hideBudgetView);
 }, 50);
 var view4 = setTimeout(function() {
 $.budgetView4.animate(hideBudgetView);
 }, 100);
 var view3 = setTimeout(function() {
 $.budgetView3.animate(hideBudgetView);
 }, 150);
 var view2 = setTimeout(function() {
 $.budgetView2.animate(hideBudgetView);
 }, 200);
 var view1 = setTimeout(function() {
 $.budgetView1.animate(hideBudgetView);
 }, 250);
 var view1 = setTimeout(function() {
 $.carouselBackView.animate(hideCarouselView);
 }, 300);
 isCarouselOpened = false;
 }

 }

 function showSectorView() {

 return;

 if (isCarouselOpened) {
 showCarouselView();
 return;
 } else if (isChartStyleOpened) {
 showChartStyleView();
 return;
 }

 if (!isSectorViewOpened) {
 $.transparentView.visible = true;
 $.sectorView.visible = true;

 $.navSectorBackView.backgroundImage = Alloy.Globals.path.bgIcnSectorSelected;
 $.imgSector.backgroundImage = "";
 isSectorViewOpened = true;
 } else {
 $.transparentView.visible = false;
 $.sectorView.visible = false;

 $.navSectorBackView.backgroundImage = "";
 $.imgSector.backgroundImage = Alloy.Globals.path.icnSectorUnselected;
 isSectorViewOpened = false;
 }

 }

 */
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

		//	Ti.API.info('style = '+selectedChartStyle);
		//	Ti.API.info('isNavChartHidden = '+isNavChartHidden);

		/*if (isNavChartHidden) {
		 //	selectedChartStyle  = "STACKED BAR";
		 loadChartWithStyle("STACKED BAR");
		 } else {
		 loadChartWithStyle(selectedChartStyle);
		 }
		 */
	}

}

/*
 function showHideView() {

 if (isSectorViewOpened) {
 showSectorView();
 } else if (isChartStyleOpened) {
 showChartStyleView();
 }

 }
 */
function closeWindow() {
	Alloy.Globals.closeWindow($.winBudgetSingleYear);
}
/*
var arr = [{
	name : "Program 1",
	strategicObjective : 142901,
	chapter2 : "9.52", //91650000,
	chapter3 : "5.25", //5252144,
	total : "9.85", //96902144,
	color : "#C92162"
}, {
	name : "Program 2",
	strategicObjective : 142902,
	chapter2 : "9.12", //91650000,
	chapter3 : "4.52", //5252144,
	total : "9.26", //96902145,
	color : "#659E2D"
}, {
	name : "Program 3",
	strategicObjective : 142903,
	chapter2 : "9.82", //91650000,
	chapter3 : "4.02", //5252144,
	total : "9.98", //96902146,
	color : "#F70F00"
}, {
	name : "Program 4",
	strategicObjective : 142904,
	chapter2 : "9.20", //91650000,
	chapter3 : "4.62", //5252144,
	total : "9.78", //96902147,
	color : "#93648E"
}, {
	name : "Program 5",
	strategicObjective : 142905,
	chapter2 : "9.23", //91650000,
	chapter3 : "5.23", //5252144,
	total : "9.81", //96902147,
	color : "#3BB5CB"
}];
*/
function loadRows(arr, value) {
		
	Ti.API.info('arr == '+JSON.stringify(arr));	
		
	var rowData = [];
	for (var i = 0; i < arr.length; i++) {
		
		var SO = arr[i].strategicObjective.slice(3,arr[i].strategicObjective.length);
			
		var payLoad = {
			code : SO,//arr[i].strategicObjective,
			group21 : arr[i].group21 / 1000000,
			group22 : arr[i].group22 / 1000000,
			group31 : arr[i].group31 / 1000000,
			total : arr[i].total / 1000000,
		};

		var imgSeparator = Ti.UI.createImageView({
			width : "100%",
			height : 1,
			bottom : 0,
			backgroundColor : Alloy.Globals.path.grayColor,
			touchEnabled : false
		});

		var row = Alloy.createController("Reports/BudgetReports/budgetSingleYearRow", payLoad).getView();

		if (value == arr[i].strategicObjective) {
			row.backgroundColor = "#3BB5CB";
		}

		//if (i < [arr.length - 1]) {
			row.add(imgSeparator);
		//}

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
	title : "2014",
	group : "FY14",
}, {
	title : "2015",
	group : "FY15",
}, {
	title : "2016",
	group : "FY16",
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

	//	if (i < [arrBudget.length - 1]) {
			row.add(imgSeparator);
	//	}

		row.doc = arrBudget[i];

		rowData.push(row);

		var prevRow = undefined;
		row.addEventListener("click", function(e) {
			
			var lbl = e.source.doc.title;
			
			httpManager.BudgetReportsBySingleYear(e.source.doc.group, function(e) {
				
				if(e.arrData.length == 1){
					if(e.arrData[0].ministry == ""){
						alert("No Records Found.");
						return;
					}
				}
				
				$.lblBudgetActivity.text = "Budget Execution By Cofog : " + lbl;
				arrData = e.arrData;
				Ti.API.info('e.arrData == '+JSON.stringify(e.arrData));
				
				showBudgetView();
				loadChartData(arrData);
				loadRows(arrData,"");
										
				var delay = setTimeout(function(e) {
					loadChartWithStyle(selectedChartStyle);
				}, 500);

			});

			/*
			 if (e.source.doc.isSingleYear) {// show bar and pie chart

			 var delay = setTimeout(function(e) {
			 $.navChartBackView.visible = true;
			 isNavChartHidden = false;
			 showBudgetView();
			 }, 50);

			 } else {// show only bar chart

			 var delay = setTimeout(function(e) {
			 $.navChartBackView.visible = false;
			 isNavChartHidden = true;
			 showBudgetView();
			 }, 50);
			 }
			 */
		});

	}

	$.budgetTableView.data = rowData;

}

/*
 arrSector = [{
 image : "",
 title : "Ministry Of Defence"
 }, {
 image : "",
 title : "Ministry Of Health"
 }, {
 image : "",
 title : "Ministry Of Education"
 }];

 function loadSectorRows() {

 var rowData = [];
 for (var i = 0; i < arrSector.length; i++) {

 var row = Ti.UI.createTableViewRow({
 width : "100%",
 height : (Alloy.Globals.GetHeight(30) + density),
 isSelected : false,
 selectedBackgroundColor : "transparent"
 });

 var img = Ti.UI.createImageView({
 left : 10,
 width : 25,
 height : 20,
 //	backgroundImage : arrSector[i].image
 backgroundColor : Alloy.Globals.path.goldColor,
 touchEnabled : false
 });

 var lblTitle = Ti.UI.createLabel({
 left : 45,
 right : 10,
 height : "100%",
 color : Alloy.Globals.path.blackColor,
 font : Alloy.Globals.path.font13,
 text : arrSector[i].title,
 touchEnabled : false
 });

 if (Alloy.Globals.isEnglish) {
 lblTitle.textAlign = Ti.UI.TEXT_ALIGNMENT_LEFT;
 img.left = 10;
 lblTitle.left = 10;
 //45;
 img.right = lblTitle.right = undefined;
 } else {
 lblTitle.textAlign = Ti.UI.TEXT_ALIGNMENT_RIGHT;
 img.right = 10;
 lblTitle.right = 10;
 //45;
 img.left = lblTitle.left = undefined;
 }

 row.lbl = lblTitle;

 //	row.add(img);
 row.add(lblTitle);

 var imgSeparator = Ti.UI.createImageView({
 width : "100%",
 height : 1,
 bottom : 0,
 backgroundColor : Alloy.Globals.path.grayColor
 });

 if (i < [arrSector.length - 1]) {
 row.add(imgSeparator);
 }

 row.doc = arrSector[i];

 rowData.push(row);
 var prevRow = undefined;

 row.addEventListener("click", function(e) {
 if (!(e.source.isSelected)) {
 e.source.backgroundColor = Alloy.Globals.path.selectedRowColor;
 e.source.isSelected = true;
 if (prevRow != undefined) {
 prevRow.backgroundColor = "transparent";
 prevRow.isSelected = false;
 }

 } else {
 e.source.backgroundColor = "transparent";
 e.source.isSelected = false;

 prevRow = undefined;
 }
 prevRow = e.source;

 });

 }

 $.sectorTableView.data = rowData;

 }

 var arrChartStyle = [{
 image : Alloy.Globals.path.icnBarChart,
 title : Alloy.Globals.selectedLanguage.barGraph
 }, {
 image : Alloy.Globals.path.icnPieChart,
 title : Alloy.Globals.selectedLanguage.pieChart
 }];

 function loadChartStyleRows() {
 var rowData = [];
 for (var i = 0; i < arrChartStyle.length; i++) {

 var row = Ti.UI.createTableViewRow({
 width : "100%",
 height : (Alloy.Globals.GetHeight(30) + density),
 isSelected : false,
 selectedBackgroundColor : "transparent"
 });

 var img = Ti.UI.createImageView({
 width : Ti.UI.SIZE,
 height : Ti.UI.SIZE,
 image : arrChartStyle[i].image,
 //	backgroundColor : Alloy.Globals.path.goldColor,
 touchEnabled : false
 });

 var lblTitle = Ti.UI.createLabel({
 right : 10,
 height : "100%",
 color : Alloy.Globals.path.blackColor,
 font : Alloy.Globals.path.font13,
 text : arrChartStyle[i].title,
 touchEnabled : false
 });

 if (Alloy.Globals.isEnglish) {
 lblTitle.textAlign = Ti.UI.TEXT_ALIGNMENT_LEFT;
 img.left = 10;
 lblTitle.left = 40;
 img.right = lblTitle.right = undefined;
 } else {
 lblTitle.textAlign = Ti.UI.TEXT_ALIGNMENT_RIGHT;
 img.right = 10;
 lblTitle.right = 40;
 img.left = lblTitle.left = undefined;
 }

 row.lbl = lblTitle;

 row.add(img);
 row.add(lblTitle);

 var imgSeparator = Ti.UI.createImageView({
 width : "100%",
 height : 1,
 bottom : 0,
 backgroundColor : Alloy.Globals.path.grayColor
 });

 if (i < [arrChartStyle.length - 1]) {
 row.add(imgSeparator);
 }

 row.doc = arrChartStyle[i];

 rowData.push(row);

 var prevRow = undefined;

 row.addEventListener("click", function(e) {

 if (e.index == 0) {
 selectedChartStyle = "BAR";
 } else {
 selectedChartStyle = "PIE";
 }

 if (!(e.source.isSelected)) {
 e.source.backgroundColor = Alloy.Globals.path.selectedRowColor;
 e.source.isSelected = true;

 if (prevRow != undefined) {
 prevRow.backgroundColor = "transparent";
 prevRow.isSelected = false;
 }

 } else {
 e.source.backgroundColor = "transparent";
 e.source.isSelected = false;

 prevRow = undefined;
 }

 prevRow = e.source;

 });

 }

 $.chartStyleTableView.data = rowData;
 }
 */

function loadChartData(arr) {
	
	Ti.API.info('arr Load Chart Data == '+JSON.stringify(arr));
	
	arrXAxis = [];
	arrChartData = [];

	for (var i = 0; i < arr.length; i++) {

	//	var SO = arr[i].strategicObjective.indexOf(":");
	//	SO = arr[i].strategicObjective.slice(0,SO);
		
	//	arrXAxis.push("SO" + "" + (i+1));
		
		var SO = arr[i].strategicObjective.slice(3,arr[i].strategicObjective.length);
		arrXAxis.push(SO);
		
		arrChartData.push({
			name : arr[i].strategicObjective,
			y : parseFloat(arr[i].total),
			sliced : false,
			selected : false,
			color : "#3BB5CB",
		});

	}

};

function changeLanguage() {

	loadChartData(arrData);

	loadRows(arrData, "");
	loadBudgetRows();
	//	loadSectorRows();
	//	loadChartStyleRows();

	var delay = setTimeout(function(e) {
		loadChartWithStyle(selectedChartStyle);
	}, 500);

	$.lblNavTitle.text = Alloy.Globals.selectedLanguage.dashBoard;
	//	$.lblSector.text = Alloy.Globals.selectedLanguage.selectSector;
	//	$.lblChart.text = Alloy.Globals.selectedLanguage.presentationStyle;
	$.lblCode.text = "Code";
	$.lblGroup21.text = "21";
	$.lblGroup22.text = "22";
	$.lblGroup31.text = "31";
	$.lblTotal.text = Alloy.Globals.selectedLanguage.total;

	var alignment;

	if (Alloy.Globals.isEnglish) {

		alignment = Titanium.UI.TEXT_ALIGNMENT_LEFT;
		$.imgClose.right = 5;
		$.lblBudgetActivity.left = $.arrowView.right = 10;
		$.lblBudgetActivity.right = 40;
		$.lblCode.left = (Alloy.Globals.GetWidth(0) + density);
		$.lblGroup21.left = (Alloy.Globals.GetWidth(65) + density);
		$.lblGroup22.left = (Alloy.Globals.GetWidth(125) + density);
		$.lblGroup31.left = (Alloy.Globals.GetWidth(195) + density);
		$.lblTotal.left = (Alloy.Globals.GetWidth(255) + density);

		$.imgClose.left = $.arrowView.left = $.lblCode.right = $.lblGroup21.right = $.lblGroup22.right = $.lblGroup31.right = $.lblTotal.right = undefined;

		$.arrowView.backgroundImage = Alloy.Globals.path.icnArrowBrownRight;
	} else {
		alignment = Titanium.UI.TEXT_ALIGNMENT_RIGHT;
		$.imgClose.left = 5;
		$.lblBudgetActivity.right = $.arrowView.left = 10;
		$.lblBudgetActivity.left = 40;

		$.lblCode.right = (Alloy.Globals.GetWidth(0) + density);
		$.lblGroup21.right = (Alloy.Globals.GetWidth(65) + density);
		$.lblGroup22.right = (Alloy.Globals.GetWidth(125) + density);
		$.lblGroup31.right = (Alloy.Globals.GetWidth(195) + density);
		$.lblTotal.right = (Alloy.Globals.GetWidth(255) + density);

		$.imgClose.right = $.arrowView.right = $.lblCode.left = $.lblGroup21.left = $.lblGroup22.right = $.lblGroup31.right = $.lblTotal.left = undefined;
		$.arrowView.backgroundImage = Alloy.Globals.path.icnArrowBrownLeft;
	}

	/*$.lblChart.textAlign = */
	$.lblBudgetActivity.textAlign = /*$.lblBudgetTitle.textAlign = */
	/*$.lblCode.textAlign = $.lblGroup21.textAlign = $.lblTotal.textAlign =
	$.lblSector.textAlign = */alignment;
}

//var arrXAxis = ['Program 1', 'Program 2', 'Program 3', 'Program 4', 'Program 5'];

function loadChartWithStyle(style) {

	/*if (style == "PIE") {

	 var region = [{
	 name : 'Program 1',
	 y : 20.0,
	 sliced : false,
	 selected : false,
	 color : "#C92162"
	 }, {
	 name : 'Program 2',
	 y : 15.8,
	 sliced : false,
	 selected : false,
	 color : "#659E2D"
	 }, {
	 name : 'Program 3',
	 y : 15.0,
	 sliced : false,
	 selected : false,
	 color : "#F70F00"
	 }, {
	 name : 'Program 4',
	 y : 8.7,
	 sliced : false,
	 selected : false,
	 color : "#93648E"
	 }, {
	 name : 'Program 5',
	 y : 6.9,
	 sliced : false,
	 selected : false,
	 color : "#3BB5CB"
	 }];

	 //	$.pieChartView.visible = true;
	 //  $.normalChartView.visible = false;
	 //	$.stackedChartView.visible = false;

	 $.pieChart.loadChart(style, region, arrXAxis);
	 } else if (style == "BAR") {

	 var region = [{
	 name : 'Program 1',
	 y : 30,
	 sliced : false,
	 selected : false,
	 color : chartColor
	 }, {
	 name : 'Program 2',
	 y : 20,
	 sliced : false,
	 selected : false,
	 color : chartColor
	 }, {
	 name : 'Program 3',
	 y : 30,
	 sliced : false,
	 selected : false,
	 color : chartColor
	 }, {
	 name : 'Program 4',
	 y : 15,
	 sliced : false,
	 selected : false,
	 color : chartColor
	 }, {
	 name : 'Program 5',
	 y : 10,
	 sliced : false,
	 selected : false,
	 color : chartColor
	 }];

	 //  $.normalChartView.visible = true;
	 //	$.pieChartView.visible = false;
	 //	$.stackedChartView.visible = false;

	 $.normalChart.loadChart(style, arrChartData, arrXAxis);

	 } else if (style == "STACKED BAR") {
	 var region = [{
	 name : 'Program 1',
	 y : 30,
	 sliced : false,
	 selected : false,
	 color : "#C92162"
	 }, {
	 name : 'Program 2',
	 y : 20,
	 sliced : false,
	 selected : false,
	 color : "#C92162"
	 }, {
	 name : 'Program 3',
	 y : 30,
	 sliced : false,
	 selected : false,
	 color : "#C92162"
	 }, {
	 name : 'Program 4',
	 y : 15,
	 sliced : false,
	 selected : false,
	 color : "#C92162"
	 }, {
	 name : 'Program 5',
	 y : 10,
	 sliced : false,
	 selected : false,
	 color : "#C92162"
	 }];

	 //	$.pieChartView.visible = false;
	 //	$.normalChartView.visible = false;
	 //	$.stackedChartView.visible = true;

	 $.stackedChart.loadChart(style, region, arrXAxis);

	 }*/
	if (style == "BUDGET SINGLE YEAR") {

		//  $.normalChartView.visible = true;
		//	$.pieChartView.visible = false;
		//	$.stackedChartView.visible = false;

		//	alert(arrChartData);
		//	alert(arrXAxis);

		$.normalChart.loadChart(style, arrChartData, arrXAxis);

	}

}

/*
 function chartTypeSelected() {
 loadChartWithStyle(selectedChartStyle);

 showHideView();
 loadRows(arr, "");
 }*/

$.winBudgetSingleYear.addEventListener("close", function(e) {
	Ti.App.removeEventListener("ChartData",highlightSelectedRow);
});

changeLanguage();
