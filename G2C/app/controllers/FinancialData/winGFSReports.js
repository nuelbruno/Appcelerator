var httpManager = require("httpManager");
//Alloy.createController("common/httpManager");
var args = arguments[0] || {};
var density;
var currentTime = new Date();
var year = currentTime.getFullYear();
if (OS_IOS) {
	density = "dp";
} else {
	density = "px";
}
//Initializing an array for storing data for search implementation
var searchArray = [];
if (Alloy.Globals.isIOS7Plus) {
	//	$.winDashboard.statusBarStyle = Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT;
	$.winGFSReports.extendEdges = [Ti.UI.EXTEND_EDGE_TOP];
	$.statusBar.height = 20;
}

function openFederalUnionWindow(e) {
	httpManager.getFederalUnion_Reports(year, "", function(e) {
		if (e == null) {
			return;
		}
		var win = Alloy.createController("FinancialData/GFSReports/winFederalBudget",e).getView();
		Alloy.Globals.openWindow(win);
	});

}


function openFGFinalAccountsWindow() {
	var win = Alloy.createController("FinancialData/FederalFinalAccountReports/winFGFinalAccountsReports").getView();
	Alloy.Globals.openWindow(win);
}

function openGFSReports_ListWindow() {
	var win = Alloy.createController("FinancialData/GFSReports/winGFSReports_List").getView();
	Alloy.Globals.openWindow(win);
}


function openGFS_OutLaysWindow(e) {
	var win = Alloy.createController("FinancialData/GFSReports/winGFS_OutlayCofogChart", e).getView();
	Alloy.Globals.openWindow(win);
}

function openGFS_IndiciesWindow(e) {
	var win = Alloy.createController("FinancialData/GFSReports/winGFS_Indicies", e).getView();
	Alloy.Globals.openWindow(win);
}

function openGFS_AsseLiaWindow(e) {
	var win = Alloy.createController("FinancialData/GFSReports/winGFS_Asse_Lia", e).getView();
	Alloy.Globals.openWindow(win);
}

function openGFS_RevExpWindow(e) {
	var win = Alloy.createController("FinancialData/GFSReports/winGFS_Rev_Exp", e).getView();
	Alloy.Globals.openWindow(win);
}

//Declaring an array for storing data
//var arr = [' البيانات المالية المجمعة على مستوى الدولة', ' البيانات المالية المجمعة على مستوى الدولة', ' التصنيف الوظيفي لنفقات الحكومة على مستوى الدولة'];

//var arr = ["Statements of Government Operations – Revenue & Expenses", "Statements of Government Operations – Assets & Liabilities", "Statements of Government Operations – Indicies", "Outlays Reports Functions By Government"];
var arr = [{//gfsFederalBudget
	title : Alloy.Globals.selectedLanguage.gfsFederalUnion,
},{
	title : Alloy.Globals.selectedLanguage.fgFinalAccount
}, {
	title : Alloy.Globals.selectedLanguage.gfsReports
}, 
/*{
	title : Alloy.Globals.selectedLanguage.budgetExecutionByRevenue
}, {
	title : Alloy.Globals.selectedLanguage.budgetExecutionByExpenditure
}, {
	title : Alloy.Globals.selectedLanguage.budgetExecutionByCofog
}, {
	title : Alloy.Globals.selectedLanguage.revenueExpenditureKPI
}, {
	title : Alloy.Globals.selectedLanguage.gfsRev_Exp
}, {
	title : Alloy.Globals.selectedLanguage.gfsAsse_Lia
}, {
	title : Alloy.Globals.selectedLanguage.gfsIndicies
}, {
	title : Alloy.Globals.selectedLanguage.gfsOutlays
}*/];

var arrRev = [];
var arrExp = [];
var arrAsse_Lia = [];
var arrIndicies = [];

var isClicked = false;
//Defining function for loading data from webservice and add to tableview
function loadItems(arrDoc, isFirstLoad) {
	$.lblNoItems.visible = false;
	var rowData = [];
	for (var i = 0; i < arrDoc.length; i++) {
		//Check if it is loading first time and then assigned the data to search array
		if (isFirstLoad) {
			searchArray.push(arrDoc[i]);
		}
		var row = Alloy.createController("FinancialData/GFSRow", arrDoc[i].title).getView();
		row.doc = arrDoc[i];
		rowData.push(row);
		//	Click event for navigating to dasboard
		row.addEventListener("click", function(e) {
			if (isClicked) {
				return;
			}
			isClicked = true;
			var index = e.index;

			switch(index) {
			case 0 :
				openFederalUnionWindow(e);
				break;
			case 1:
				openFGFinalAccountsWindow();
				break;
			case 2 :
				openGFSReports_ListWindow();
			//	openbudgetExecutionByRevenue(1);
				break;
			case 3:
				openBudegetExecutionByCofog();
				break;
			case 4 :
				opneRevenueExpenseKpi();
				break;
			case 5:
				openGfsRevenueExpenses();
				break;
			case 6:
				openGfsAssetsLiabilities();
				break;
			case 7 :
				openGfsAnalyticIndicator();
				break;
			case 8 :
				openGfsOutLayes();
				break;
			}

		});

	}
	$.tableViewItems.data = rowData;
	if (arrDoc.length == 0) {
		$.lblNoItems.visible = true;
	}
}

function openGfsOutLayes() {
	httpManager.getGFS_Reports_Outlays(Alloy.Globals.GFSYear, function(e) {
		Ti.API.info('GFS Reports Cofog == ' + JSON.stringify(e));

		if (e == null) {
			isClicked = false;
			return;
		}

		/*if (e.arrData == undefined) {
		 return;
		 }*/
		openGFS_OutLaysWindow(e);
	});
}

function openGfsAnalyticIndicator() {
	if (arrIndicies.length == 0) {
		httpManager.getGFS_Reports(Alloy.Globals.GFSYear, function(e) {
			Ti.API.info('GFS Reports == ' + JSON.stringify(e));

			if (e == null) {
				isClicked = false;
				return;
			}

			/*if (e.arrIndicies == undefined) {
			 return;
			 }*/
			arrRev = e.arrRev;
			arrExp = e.arrExp;
			arrAsse_Lia = e.arrAsse_Lia;
			arrIndicies = e.arrIndicies;
			var payLoad = {
				arrData : arrIndicies,
			};
			openGFS_IndiciesWindow(payLoad);
		});
	} else {
		var payLoad = {
			arrData : arrIndicies,
		};
		openGFS_IndiciesWindow(payLoad);
	}

}

function openGfsAssetsLiabilities() {
	if (arrAsse_Lia.length == 0) {
		httpManager.getGFS_Reports(Alloy.Globals.GFSYear, function(e) {
			Ti.API.info('GFS Reports == ' + JSON.stringify(e));

			if (e == null) {
				isClicked = false;
				return;
			}

			/*if (e.arrAsse_Lia == undefined) {
			 return;
			 }*/
			arrRev = e.arrRev;
			arrExp = e.arrExp;
			arrAsse_Lia = e.arrAsse_Lia;
			arrIndicies = e.arrIndicies;
			var payLoad = {
				arrData : arrAsse_Lia,
			};

			openGFS_AsseLiaWindow(payLoad);
		});
	} else {
		var payLoad = {
			arrData : arrAsse_Lia,
		};

		openGFS_AsseLiaWindow(payLoad);
	}
}

function openGfsRevenueExpenses() {
	if (arrRev.length == 0 || arrExp.length == 0) {
		httpManager.getGFS_Reports(Alloy.Globals.GFSYear, function(e) {
			Ti.API.info('GFS Reports == ' + JSON.stringify(e));

			if (e == null) {
				isClicked = false;
				return;
			}
			arrRev = e.arrRev;
			arrExp = e.arrExp;
			arrAsse_Lia = e.arrAsse_Lia;
			arrIndicies = e.arrIndicies;
			var payLoad = {
				arrRev : arrRev,
				arrExp : arrExp,
			};
			Ti.API.info('arrRev == ' + JSON.stringify(arrRev));
			Ti.API.info('arrExp == ' + JSON.stringify(arrExp));
			openGFS_RevExpWindow(payLoad);
		});
	} else {
		var payLoad = {
			arrRev : arrRev,
			arrExp : arrExp,
		};
		openGFS_RevExpWindow(payLoad);
	}
}

function opneRevenueExpenseKpi() {
	httpManager.revenueExpenditureKPI_Avg_for3Years_G2C(function(e) {

		if (e == undefined) {
			isClicked = false;
			return;
		}

		var payLoad = {
			arrData : e.arrData,
		};

		var winDetail = Alloy.createController("FinancialData/FederalFinalAccountReports/winCofogByGroupsChart", payLoad).getView();
		Alloy.Globals.openWindow(winDetail);
	});
}

function openBudegetExecutionByCofog() {
	httpManager.budgetExecutionByCofog_Avg_YearWise_G2C(function(e) {

		if (e.arrData == undefined) {
			isClicked = false;
			return;
		}
		var payLoad = {
			arrData : e.arrData,
		};
		var winDetail = Alloy.createController("FinancialData/FederalFinalAccountReports/winCofogByYearsChart", payLoad).getView();
		Alloy.Globals.openWindow(winDetail);
	});
}

function openbudgetExecutionByRevenue(index) {
	httpManager.budgetExecutionWithRevenueAndExpenditure(function(e) {

		if (e.arrData == undefined) {
			isClicked = false;
			return;
		}
		var payLoad = {
			arrData : e.arrData,
			obj : index,
		};

		var winDetail = Alloy.createController("FinancialData/FederalFinalAccountReports/winRevAndExpChart", payLoad).getView();
		Alloy.Globals.openWindow(winDetail);
	});
}

function closeWindow() {
	Alloy.Globals.closeWindow($.winGFSReports);
}

function searchList() {
	var arrSearchs = [];
	if ($.txtSearch.value.trim().length == 0) {
		arrSearchs = searchArray;
	} else {
		for (var i = 0; i < searchArray.length; i++) {
			if (searchArray[i].toUpperCase().indexOf($.txtSearch.value.toUpperCase().trim()) != -1) {
				arrSearchs.push(searchArray[i]);
			}
		}
	}
	loadItems(arrSearchs, false);
}

function changeLanguage() {
	loadItems(arr, true);
	$.lblNavTitle.text = Alloy.Globals.selectedLanguage.openFinancialData;
}

/**
 * Adding the eventlistener for the bottom bar view
 *
 * @param {Object} e
 */
$.viewBottomToolbar.getView().addEventListener('click', function(e) {
	if(e.source.buttonId == 'btnFontChange'){
		$.viewBottomToolbar.changeFont($.winGFSReports);
	}else if(e.source.buttonId == 'btnSystemFeedback'){
		$.viewBottomToolbar.openFeedbackScreen(e);
	}else/* if(e.source.buttonId == 'btnSystemInstruction'){
		$.viewInstructions.openHelpScreen(e);
	}*/if (e.source.buttonId == 'btnSystemChangeTheme') {
		$.viewBottomToolbar.changeTheme($.winGFSReports);
	}
});
/**
 * Called on open of the window
 * 
 * @param {Object} e
 */
var windowOpened = function(e){
	Alloy.Globals.arrWindows.push($.winGFSReports);
	$.viewBottomToolbar.setOptions({
		showThemeButton : true,
		showInstructions : false,
		showFeedBack :true,
		showFontResize:true
	});
};

/**
 * Window is closed
 * 
 * @param {Object} e
 */
var windowClosed = function(e){
	Alloy.Globals.arrWindows.pop();
	$.imgBackBtn = $.tableViewItems = null;
	$.destroy();
};


changeLanguage();

$.winGFSReports.addEventListener("focus", function(e) {
	isClicked = false;
	$.viewBottomToolbar.setDefaultTheme($.winGFSReports);
});
$.viewBottomToolbar.setDefaultTheme($.winGFSReports);
