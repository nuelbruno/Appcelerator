var httpManager = require("httpManager");//Alloy.createController("common/httpManager");

var args = arguments[0] || {};
var density;
if (OS_IOS) {
	density = "dp";
} else {
	density = "px";
}
//Initializing an array for storing data for search implementation
var searchArray = [];
if (Alloy.Globals.isIOS7Plus) {
	//	$.winDashboard.statusBarStyle = Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT;
	$.winBudgetReports.extendEdges = [Ti.UI.EXTEND_EDGE_TOP];
	$.statusBar.height = 20;
}

//var arr = ["Budget By Year", "Budget By Group", "Cofog By Entity", "Budget Ceiling (Caps)", "Project Capitals", "Program Structure By Entity"];
var arr = ["Budget By Year", "Budget By Group"];

function openReportsBySingleYear() {
	httpManager.BudgetReportsBySingleYear("FY14", function(e) {
		if (e.tokenStatus == "Expired") {
			closeWindow();
			return;
		}
		if (e.status == "Success") {

			Ti.API.info('data ==' + JSON.stringify(e.arrData));

			var win = Alloy.createController("Reports/BudgetReports/winBudgetSingleYear", e.arrData).getView();
			if (OS_IOS) {
				Alloy.Globals.openWindow(win);
			} else {
				win.open();
			}
		} else if (e.status == "Failure") {
			alert(e.description);
			return;
		}
	});
}

function openReportsByMultipleYear() {
	httpManager.BudgetReportsByMultipleYear("FY14","FY15","FY16", function(e) {
		
		if (e.tokenStatus == "Expired") {
			closeWindow();
			return;
		}
		if (e.status == "Success") {

			Ti.API.info('data ==' + JSON.stringify(e.arrData));

			var win = Alloy.createController("Reports/BudgetReports/winBudgetMultipleYear", e.arrData).getView();
			if (OS_IOS) {
				Alloy.Globals.openWindow(win);
			} else {
				win.open();
			}
		} else if (e.status == "Failure") {
			alert(e.description);
			return;
		}
	});
}

function openExpenditureByFunctionAndMinistry() {
	httpManager.expenditureByFunctionAndMinistry(function(e) {
		if (e.tokenStatus == "Expired") {
			closeWindow();
			return;
		}
		if (e.status == "Success") {

			Ti.API.info('data ==' + JSON.stringify(e.arrData));

			var win = Alloy.createController("Reports/BudgetReports/winCofogByEntity", e.arrData).getView();
			if (OS_IOS) {
				Alloy.Globals.openWindow(win);
			} else {
				win.open();
			}
		} else if (e.status == "Failure") {
			if (Alloy.Globals.isEnglish) {
				alert(e.enDescription);
			} else {
				alert(e.arDescription);
			}
			return;
		}
	});
}

function openBudgetCeilingSummary() {
	httpManager.budgetCeilingSummaryReports(function(e) {
		if (e.tokenStatus == "Expired") {
			closeWindow();
			return;
		}
		if (e.status == "Success") {

			Ti.API.info('data ==' + JSON.stringify(e.arrData));

			var win = Alloy.createController("Reports/BudgetReports/winBudgetCeilingChart", e.arrData).getView();
			if (OS_IOS) {
				Alloy.Globals.openWindow(win);
			} else {
				win.open();
			}
		} else if (e.status == "Failure") {
			if (Alloy.Globals.isEnglish) {
				alert(e.enDescription);
			} else {
				alert(e.arDescription);
			}
			return;
		}
	});
}


function openProgramStructureByEntity() {
	httpManager.budgetProgramStructureByEntity(function(e) {
		
		Ti.API.info('e == '+JSON.stringify(e));
		
		if (e.tokenStatus == "Expired") {
			closeWindow();
			return;
		}
		if (e.status == "Success") {

			Ti.API.info('data ==' + JSON.stringify(e.arrData));
			var win = Alloy.createController("Reports/BudgetReports/winStructureByEntity", e.arrData).getView();
			if (OS_IOS) {
				Alloy.Globals.openWindow(win);
			} else {
				win.open();
			}
		} else if (e.status == "Failure") {
			if (Alloy.Globals.isEnglish) {
				alert(e.enDescription);
			} else {
				alert(e.arDescription);
			}
			return;
		}
	});
}

//Defining function for loading data from webservice and add to tableview
function loadItems(arrDoc, isFirstLoad) {
	$.lblNoItems.visible = false;
	var rowData = [];
	Ti.API.info('LENGTH = ' + arrDoc.length);
	for (var i = 0; i < arrDoc.length; i++) {
		//Check if it is loading first time and then assigned the data to search array
		if (isFirstLoad) {
			searchArray.push(arrDoc[i]);
		}
		var row = Alloy.createController("Reports/reportRow", arrDoc[i]).getView();
		row.doc = arrDoc[i];
		rowData.push(row);

		row.addEventListener("click", function(e) {

			if (e.index == 0) {
				openReportsBySingleYear();
			} else if (e.index == 1) {
				openReportsByMultipleYear();
			} else if (e.index == 2) {
				openExpenditureByFunctionAndMinistry();
			} else if (e.index == 3) {
				openBudgetCeilingSummary();
			} else if (e.index == 5) {
				openProgramStructureByEntity();
			}

		});

	}
	$.tableViewItems.data = rowData;
	if (arrDoc.length == 0) {
		$.lblNoItems.visible = true;
	}
}

function closeWindow() {
	Alloy.Globals.closeWindow($.winBudgetReports);
}

//Defining function for implementing search event
var searchList = function(e) {
	var pattern = e.source.value;
	var tempArray = PatternMatch(searchArray, pattern);
	// calling method for loading remote data
	loadItems(tempArray, false);
};

function PatternMatch(arrayToSearch, pattern) {
	var searchLen = pattern.length;
	arrayToSearch.sort();
	var tempArray = [];
	for (var index = 0,
	    len = arrayToSearch.length; index < len; index++) {
		if (arrayToSearch[index].substring(0, searchLen).toUpperCase() === pattern.toUpperCase()) {
			tempArray.push(arrayToSearch[index]);
		}
	}
	return tempArray;
}

function changeLanguage() {
	loadItems(arr, true);
	$.lblNavTitle.text = Alloy.Globals.selectedLanguage.bugetReports;
	var alignment;
	if (Alloy.Globals.isEnglish) {
		alignment = Titanium.UI.TEXT_ALIGNMENT_LEFT;
		$.imgSearch.left = 5;
		$.imgSearch.right = undefined;
		if (OS_IOS) {
			$.txtSearch.right = 10;
			$.txtSearch.left = 25;
		} else {
			$.txtSearch.right = 0;
			$.txtSearch.left = 20;
		}
	} else {
		alignment = Titanium.UI.TEXT_ALIGNMENT_RIGHT;
		$.imgSearch.right = 5;
		$.imgSearch.left = undefined;
		if (OS_IOS) {
			$.txtSearch.left = 10;
			$.txtSearch.right = 25;
		} else {
			$.txtSearch.left = 0;
			$.txtSearch.right = 20;
		}
	}
	$.txtSearch.textAlign = alignment;
}

changeLanguage();
