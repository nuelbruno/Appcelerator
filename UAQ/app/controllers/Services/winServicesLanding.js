var utilities = require("utilities");
var httpManager = require("httpManager");

var args = arguments[0] || {};

var viewDepartmentList = undefined;
var alignment;
var preLang = null;
var citizenList = null;
var businessList = null;
var departmentList = [];
var selectedTabName = "department";



function changeLanguage() {
	if (preLang == Alloy.Globals.language) {
		return;
	}
	preLang = Alloy.Globals.language;
	
	$.viewLeftPanel.getView().changeLanguage = changeLanguage;
	$.viewLeftPanel.setMenuDirectionView({
		direction : Alloy.Globals.SelectedMenuDirection,
		menuCallback : undefined
	});
    $.viewLeftPanel.changeLangLeft();
	$.viewLeftPanel.setLanguage();
	$.viewHappinessIndicator.changeLanguage();
	$.viewNotification.changeLanguage();

	$.lblNavTitle.text = Alloy.Globals.selectedLanguage.services;

	$.labelDepartment.text = Alloy.Globals.selectedLanguage.departmentCap;
	$.labelCitizen.text = Alloy.Globals.selectedLanguage.citizenCap;
	$.labelBusiness.text = Alloy.Globals.selectedLanguage.businessCap;

	/*if (viewDepartmentList != undefined) {
	 $.viewDepartmentParent.remove(viewDepartmentList);
	 viewDepartmentList = null;
	 }
	 viewDepartmentList = Alloy.createController("Department/viewDepartmentList").getView();
	 $.viewDepartmentParent.add(viewDepartmentList);*/

	if (Alloy.Globals.isEnglish) {

		alignment = Titanium.UI.TEXT_ALIGNMENT_LEFT;
	} else {
		

		alignment = Titanium.UI.TEXT_ALIGNMENT_RIGHT;
	}

   getResponseData();

}


var preSelection = $.viewDepartment;
$.imageviewDepartmentArrow.visible = true;
var preViewId = 1;


function getResponseData() {
	if (selectedTabName == "department")
		updateDepartmentDetails();
	else if (selectedTabName == "citizen")
		updateCitizenDetails();
	else
		updateBusinessDetails();
	
}



function updateBusinessDetails() {
	try{
	departmentList = [];
	selectedTabName = "business";
    var responseData; 
	httpManager.getBusinessServicesDetails(function(response) {
		if(response == null)
			return;
	
		if (Object.prototype.toString.call(response.ServiceInfo) == "[object Array]") {
		    responseData = response.ServiceInfo;
		} else {
			responseData = [response.ServiceInfo];
		}
	
		for (var j = 0; j < responseData.length; j++) {
			if (responseData[j].site) {
				if(responseData[j].site == "Business")
				{
				  //departmentList.push(responseData[j].services);
				  $.viewDepartmentList.loadServices(responseData[j].services, "business");
				}
			}
		}
    });
   }
   catch(e){
   		Ti.API.info('Error : '+ e.message);
   }
}


function updateCitizenDetails() {
	try{
	departmentList = [];
	selectedTabName = "citizen";
	var responseData; 
	httpManager.getBusinessServicesDetails(function(response) {
		if(response == null)
			return;
	
		if (Object.prototype.toString.call(response.ServiceInfo) == "[object Array]") {
		    responseData = response.ServiceInfo;
		} else {
			responseData = [response.ServiceInfo];
		}
	
		for (var j = 0; j < responseData.length; j++) {
			if (responseData[j].site) {
				if(responseData[j].site == "Citizen")
				{
				  //departmentList.push(responseData[j].services);
				  $.viewDepartmentList.loadServices(responseData[j].services, "citizen");
				}
			}
		}
    });
   }
   catch(e)
   {
   	Ti.API.info('Error : '+ e.message);
   }
}


function updateDepartmentDetails() {
	try{
	departmentList = [];
	selectedTabName = "department";
	var responseData; 
	
	httpManager.getDepartmentDetails(function(response) {
		if(response == null)
			return;
	
		if (Object.prototype.toString.call(response.ServiceInfo) == "[object Array]") {
		    responseData = response.ServiceInfo;
		} else {
			responseData = [response.ServiceInfo];
		}
	
		for (var j = 0; j < responseData.length; j++) {
			if (responseData[j].name) {
				departmentList.push(responseData[j]);
			}
		}
		
		$.viewDepartmentList.loadServices(departmentList, "department");
    });
   }
   catch(e)
   {
   		Ti.API.info('Error : '+ e.message);
   }
}


function selectOption(e) {
	if (preViewId == e.source.viewId) {
		return;
	}
	$.viewDepartmentList.listEmpty();
	preViewId = e.source.viewId;
	e.source.children[1].visible = true;
	preSelection.children[1].visible = false;

	e.source.children[0].backgroundColor = Alloy.Globals.path.titleRedColor;
	preSelection.children[0].backgroundColor = Alloy.Globals.path.silverColor;

	e.source.children[0].color = Alloy.Globals.path.whiteColor;
	preSelection.children[0].color = Alloy.Globals.path.darkestGray;

	//e.source.detailView.show();
	//preSelection.detailView.hide();
	
	preSelection = e.source;
	
	if (e.source.viewId == 1) {
		updateDepartmentDetails();
	}

	if (e.source.viewId == 2) {
		updateCitizenDetails();
	}

	if (e.source.viewId == 3) {
		updateBusinessDetails();
	}

	
}

function winOpen(e) {
	Alloy.Globals.arrWindows.push($.winServicesLanding);
	
	$.viewNavigationTools.getView().win = $.mainView;
	$.viewNavigationTools.setHappinessView($.viewHappinessIndicator.getView());
	$.viewNavigationTools.setNotificationView($.viewNotification.getView());

	
	//$.viewBottomMenu.getView().viewBack = $.backView;
	$.viewDepartment.detailView = $.viewDepartmentParent;
	$.viewCitizen.detailView = $.viewDepartmentParent;
	$.viewBusiness.detailView = $.viewDepartmentParent;
	$.viewNavigationTools.getView().transparentView = $.viewTransparent;
	
}

function closeLeftPanel() {
	$.viewNavigationTools.onMenu();
}

function winFocus(e) {
	Alloy.Globals.bottomMenu = $.backView;
	$.viewBottomMenu.addInnerMenu();
	changeLanguage();
	// Alloy.Globals.manageEservicesNotification();
	Alloy.Globals.currentWindow = e.source.id;
    
	
}

function closeWindow() {
	if (args.isFromMenu) {
		Alloy.Globals.gotoHome();
		return;
	}
	Alloy.Globals.arrWindows.pop($.winServicesLanding);
	$.winServicesLanding.close();
}