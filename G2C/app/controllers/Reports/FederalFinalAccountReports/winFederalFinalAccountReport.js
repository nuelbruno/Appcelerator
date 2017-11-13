var httpManager = require("httpManager");//Alloy.createController('common/httpManager');

var args = arguments[0] || {};
var density;

if (OS_IOS) {
	density = "dp";
} else {
	density = "px";
}

if (Alloy.Globals.isIOS7Plus) {
	//	$.winDashboard.statusBarStyle = Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT;
	$.winFGFinalAccount.extendEdges = [Ti.UI.EXTEND_EDGE_TOP];
	$.statusBar.height = 20;
}

Ti.API.info("onload " + JSON.stringify(args));
//Declaring an array for storing static data
var strExpenseRevenueYears_KPI = args.arrData.arrYearsData_RevenueKPI[0].year + ' - ' +  args.arrData.arrYearsData_RevenueKPI[args.arrData.arrYearsData_RevenueKPI.length-1].year;
var strCofogYears = args.arrData.arrYearsData_Cofog[0].year + ' - ' +  args.arrData.arrYearsData_Cofog[args.arrData.arrYearsData_Cofog.length-1].year;

var arr = [Alloy.Globals.selectedLanguage.budgetExecutionRevenue+ ' '+ strExpenseRevenueYears_KPI,Alloy.Globals.selectedLanguage.budgetExecutionExpense+ ' '+ strExpenseRevenueYears_KPI,Alloy.Globals.selectedLanguage.budgetExecutionByCofog + ' '+ strCofogYears, Alloy.Globals.selectedLanguage.expenseRevenueKPI+' '+ strExpenseRevenueYears_KPI];
//Defining function for loading data and add to tableview row
function loadItems(arrDoc) {
	$.lblNoItems.visible = false;
	var rowData = [];
	for (var i = 0; i < arrDoc.length; i++) {
		var row = Alloy.createController("Reports/reportRow", arrDoc[i]).getView();
		row.doc = arrDoc[i];
		rowData.push(row);
		//Navigate to dashborad
		row.addEventListener("click", function(e) {
			var index = e.index;
			if (e.index == 0 || e.index == 1) {

				httpManager.budgetExecutionWithRevenueAndExpenditure(function(e) {
						
					if(e.arrData == undefined){
						return;
					}
					else if (e.tokenStatus == "Expired") {
						Ti.App.Properties.setString("tokenStatus", "Expired");
						closeWindow();
						return;
					}

					var payLoad = {
						title : arr[index],
						arrData : e.arrData,
						obj : index,
						
					};
					
					var winDetail = Alloy.createController("Reports/FederalFinalAccountReports/winRevAndExpChart", payLoad).getView();
					Alloy.Globals.openWindow(winDetail);
				});
			} else if (e.index == 2) {
				httpManager.budgetExecutionByCofog_Avg_YearWise_G2C(function(e) {

					if(e.arrData == undefined){
						return;
					}else if (e.tokenStatus == "Expired") {
						Ti.App.Properties.setString("tokenStatus", "Expired");
						closeWindow();
						return;
					}

					var payLoad = {
						title : arr[index],
						arrData : e.arrData,
						obj : index
					};
					var winDetail = Alloy.createController("Reports/FederalFinalAccountReports/winCofogByYearsChart", payLoad).getView();
					Alloy.Globals.openWindow(winDetail);
				});
			}  else if (e.index == 3) {
				httpManager.revenueExpenditureKPI_Avg_for3Years_G2C(function(e) {
					
					if(e == undefined){
						return;
					}else if (e.tokenStatus == "Expired") {
						Ti.App.Properties.setString("tokenStatus", "Expired");
						closeWindow();
						return;
					}

					
					var payLoad = {
						title : arr[index],
						arrData : e.arrData,
						obj : index,
						noOfYears : 3
					};

					var winDetail = Alloy.createController("Reports/FederalFinalAccountReports/winCofogByGroupsChart", payLoad).getView();
					Alloy.Globals.openWindow(winDetail);
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
	Alloy.Globals.closeWindow($.winFGFinalAccount);
}

function changeLanguage() {
	loadItems(arr);
	$.lblNavTitle.text = Alloy.Globals.selectedLanguage.fgFinalAccount;
	var alignment;
	if (Alloy.Globals.isEnglish) {
		alignment = Titanium.UI.TEXT_ALIGNMENT_LEFT;
	} else {
		alignment = Titanium.UI.TEXT_ALIGNMENT_RIGHT;
	}
}

changeLanguage();
