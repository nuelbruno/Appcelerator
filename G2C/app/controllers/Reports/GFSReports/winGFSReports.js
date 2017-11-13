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
	$.winGFSReports.extendEdges = [Ti.UI.EXTEND_EDGE_TOP];
	$.statusBar.height = 20;
}

function openGFS_OutLaysWindow(e) {
	var win = Alloy.createController("Reports/GFSReports/winGFS_OutlayCofogChart", e).getView();
	if (OS_IOS) {
		Alloy.Globals.openWindow(win);
	} else {
		win.open();
	}
}

function openGFS_IndiciesWindow(e) {
	var win = Alloy.createController("Reports/GFSReports/winGFS_Indicies", e).getView();
	if (OS_IOS) {
		Alloy.Globals.openWindow(win);
	} else {
		win.open();
	}
}

function openGFS_AsseLiaWindow(e) {
	var win = Alloy.createController("Reports/GFSReports/winGFS_Asse_Lia", e).getView();
	if (OS_IOS) {
		Alloy.Globals.openWindow(win);
	} else {
		win.open();
	}
}

function openGFS_RevExpWindow(e) {
	var win = Alloy.createController("Reports/GFSReports/winGFS_Rev_Exp", e).getView();
	if (OS_IOS) {
		Alloy.Globals.openWindow(win);
	} else {
		win.open();
	}
}


var arr = [ Alloy.Globals.selectedLanguage.gfsReportsByRevenueAndExpense,
 		Alloy.Globals.selectedLanguage.statementsOfGovtOperationsAssetsAndLiabilities,
   		Alloy.Globals.selectedLanguage.statementsOfGovtOperationsIndices,
    	Alloy.Globals.selectedLanguage.outlaysReportsFunctionsByGovt];

var arrRev = [];
var arrExp = [];
var arrAsse_Lia = [];
var arrIndicies = [];

//Defining function for loading data from webservice and add to tableview
function loadItems(arrDoc, isFirstLoad) {
	$.lblNoItems.visible = false;
	var rowData = [];
	for (var i = 0; i < arrDoc.length; i++) {
		if (isFirstLoad) {
			searchArray.push(arrDoc[i]);
		}
		var row = Alloy.createController("Reports/reportRow", arrDoc[i]).getView();
		row.doc = arrDoc[i];
		rowData.push(row);
		row.addEventListener("click", function(e) {
			var index = e.index;
			if (index == 0) {
				if (arrRev.length == 0 || arrExp.length == 0) {
					httpManager.getGFS_Reports(function(e) {
						Ti.API.info('GFS Reports == ' + JSON.stringify(e));

						if (e.arrRev == undefined || e.arrExp == undefined) {
							return;
						}
						arrRev = e.arrRev;
						arrExp = e.arrExp;
						arrAsse_Lia = e.arrAsse_Lia;
						arrIndicies = e.arrIndicies;
						var payLoad = {
							arrRev : arrRev,
							arrExp : arrExp,
							title:arr[index]
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

			} else if (index == 1) {

				if (arrAsse_Lia.length == 0) {
					httpManager.getGFS_Reports(function(e) {
						Ti.API.info('GFS Reports == ' + JSON.stringify(e));

						if (e.arrAsse_Lia == undefined) {
							return;
						}
						arrRev = e.arrRev;
						arrExp = e.arrExp;
						arrAsse_Lia = e.arrAsse_Lia;
						arrIndicies = e.arrIndicies;
						var payLoad = {
							arrData : arrAsse_Lia,
							title:arr[index]
						};

						openGFS_AsseLiaWindow(payLoad);
					});
				} else {
					var payLoad = {
						arrData : arrAsse_Lia,
						title:arr[index]
					};

					openGFS_AsseLiaWindow(payLoad);
				}

			} else if (index == 2) {

				if (arrIndicies.length == 0) {
					httpManager.getGFS_Reports(function(e) {
						Ti.API.info('GFS Reports == ' + JSON.stringify(e));

						if (e.arrIndicies == undefined) {
							return;
						}
						arrRev = e.arrRev;
						arrExp = e.arrExp;
						arrAsse_Lia = e.arrAsse_Lia;
						arrIndicies = e.arrIndicies;
						var payLoad = {
							arrData : arrIndicies,
							title:arr[index]
						};
						openGFS_IndiciesWindow(payLoad);
					});
				} else {
					var payLoad = {
						arrData : arrIndicies,
						title:arr[index]
					};
					openGFS_IndiciesWindow(payLoad);
				}

			} else if (index == 3) {
				httpManager.getGFS_Reports_Outlays(function(e) {
					Ti.API.info('GFS Reports Cofog == ' + JSON.stringify(e));

					if (e.arrData == undefined) {
						return;
					}
					openGFS_OutLaysWindow(e);
				});
			}
			
		});

	}
	$.tableViewItems.data = rowData;
	if (arrDoc.length == 0) {
		$.lblNoItems.visible = true;
	}
}

function closeWindow() {
	Alloy.Globals.closeWindow($.winGFSReports);
}

var searchList = function(e) {
	var pattern = e.source.value;
	var tempArray = PatternMatch(searchArray, pattern);
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
	$.lblNavTitle.text = Alloy.Globals.selectedLanguage.gfsReports;
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
