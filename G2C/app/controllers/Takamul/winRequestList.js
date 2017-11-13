var args = arguments[0] || {};
var moment = require('alloy/moment');
var httpManager = require("httpManager");//Alloy.createController('common/httpManager'); 
var isClicked = false;
if (Alloy.Globals.isIOS7Plus) {
	$.statusBar.height = 20;
}

function closeWindow() {
	Alloy.Globals.closeWindow($.winRequestList);
}

function gotoHome() {
	Alloy.Globals.gotoHome();
}

function searchList(){
	var arrSearch = [];
	if ($.txtSearch.value.trim().length == 0) {
		arrSearch = args;
	} else {
		arrSearch = args.filter(function(obj) {
			return obj.subject.toLowerCase().indexOf($.txtSearch.value.trim().toLowerCase()) != -1;
		});
	}
	loadRequestList(arrSearch);
}
function loadRequestList(requestList) {
	var requestRow = [];
	$.listSection.setItems([]);
	if (requestList.length == 0) {
		$.lblNoRecord.visible = true;
	} else {
		$.lblNoRecord.visible = false;
	}
	for (var i = 0,
	    length = requestList.length; i < length; i++) {
		requestRow.push({
			lblName : {
				text : requestList[i].subject,
				font :(Alloy.isTablet) ? Alloy.Globals.path.font17 : Alloy.Globals.path.font13 
			},
			lblDate : {
				text : moment(requestList[i].submitDate).format("DD/MM/YYYY"),
				font :(Alloy.isTablet) ? Alloy.Globals.path.font17 : Alloy.Globals.path.font13
			},
			lblStatus : {
				text : (Alloy.Globals.isEnglish) ? requestList[i].wfStateDes_En :  requestList[i].wfStateDes_Ar,
				font :(Alloy.isTablet) ? Alloy.Globals.path.font17 : Alloy.Globals.path.font13
			},
			properties : {
				obj : requestList[i],
			}
		});
	}
	$.listSection.setItems(requestRow);
}
$.listView.addEventListener('itemclick', function(e) {
	if(isClicked == true){
		return;
	}
	isClicked = true;
	var item = $.listSection.getItemAt(e.itemIndex);
	httpManager.getTakamulRequestInfoByID(item.properties.obj.requestId,function(data){
		Ti.API.info('data >>'+JSON.stringify(data));
		if(data != null){
			if(data.tokenDetails.status == "Success"){
				setTokenData(data.tokenDetails);
				var win = Alloy.createController('Takamul/winViewRequest',{requestID : item.properties.obj.requestId,data:data}).getView();
				Alloy.Globals.openWindow(win);
			}else{
				Ti.App.Properties.setInt("isLoggedIn_Takamul", false);
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.createRequest, (Alloy.Globals.isEnglish) ? data.tokenDetails.description_EN : data.tokenDetails.description_AR);
			}
		}
		isClicked = false;
	});
	
});

function setTokenData(e) {
	//Ti.App.Properties.setObject("LoginDetaisObj_Takamul", e);

	Ti.App.Properties.setInt("authenticationCode_Takamul", e.tokenCode);
	Ti.App.Properties.setString("emailID_Takamul", e.emailId);
	Ti.App.Properties.setString("createdDate_Takamul", e.createdDate);
	Ti.App.Properties.setString("lastUpdatedDate_Takamul", e.lastUpdatedDate);
	Ti.App.Properties.setString("status_Takamul", e.tokenStatus);
	Ti.App.Properties.setString("roleType_Takamul", e.roleType);
	Ti.App.Properties.setString("groupType_Takamul", e.groupType);
}

function reloadRequestList(){
	httpManager.getAllTakamulRequest(function(data) {
			Ti.API.info('data >> '+JSON.stringify(data));
			if (data != null) {
				if (data.tokenDetails.status == "Success") {
					loadRequestList(data.arrRequestList);
				} else {
					Ti.App.Properties.setInt("isLoggedIn_Takamul", false);
					Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.takamulTitle, (Alloy.Globals.isEnglish) ? data.tokenDetails.description_EN : data.tokenDetails.description_AR);
				}
			}
		}); 
}
function openCreateRequest(){
	var win = Alloy.createController('Takamul/winCreateRequest',{
		isFromHome : false,
		callback : reloadRequestList
	}).getView();
	Alloy.Globals.openWindow(win);
}
function changeLanguage(){
	$.lblNavTitle.text = Alloy.Globals.selectedLanguage.requestList;
	$.lblNameTit.text = Alloy.Globals.selectedLanguage.subjectTitle;
	$.lblDateTit.text = Alloy.Globals.selectedLanguage.dateTitle;
	$.lblStatusTit.text = Alloy.Globals.selectedLanguage.status;
	$.lblCreateReq.text = Alloy.Globals.selectedLanguage.createNewRequest;
	$.lblNoRecord.text = Alloy.Globals.selectedLanguage.noRecordFound;
	$.lblRequestList.text = Alloy.Globals.selectedLanguage.requestList;
	var alignment;
	if (Alloy.Globals.isEnglish) {
		alignment = Titanium.UI.TEXT_ALIGNMENT_LEFT;
		$.imgSearch.left = 10;
		$.lblNameTit.left = "2%";
		$.seperatorHea1.left = "47%";
		$.lblDateTit.left = "49%";
		$.seperatorHea2.left = "74%";
		$.lblStatusTit.left = "76%";
		$.lblCreateReq.left = 0;
		//$.imgPlus.left = (Alloy.isTablet) ? 200 : 150;
		if (OS_IOS) {
			$.txtSearch.left = (Alloy.isTablet) ? 40 :30;
			$.txtSearch.right = 10;
		} else {
			$.txtSearch.left = (Alloy.isTablet) ? 35 :25;
			$.txtSearch.right = 0;
		}
		$.imgSearch.right = undefined;
	} else {
		alignment = Titanium.UI.TEXT_ALIGNMENT_RIGHT;
		$.imgSearch.right = 10;
		$.lblNameTit.right = "2%";
		$.seperatorHea1.right = "47%";
		$.lblDateTit.right = "49%";
		$.seperatorHea2.right = "74%";
		$.lblStatusTit.right = "76%";
		$.lblCreateReq.right = 0;
		//$.imgPlus.right = (Alloy.isTablet) ? 200 : 150;
		if (OS_IOS) {
			$.txtSearch.right = (Alloy.isTablet) ? 40 : 30;
			$.txtSearch.left = 10;
		} else {
			$.txtSearch.right = (Alloy.isTablet) ? 35 : 25;
			$.txtSearch.left = 0;
		}
		$.imgSearch.left = undefined;
	}
	$.txtSearch.textAlign = $.lblNameTit.textAlign = $.lblDateTit.textAlign = $.lblStatusTit.textAlign = $.lblCreateReq.textAlign = alignment;
	$.lblRequestList.textAlign = alignment;
}
changeLanguage();

$.winRequestList.addEventListener("focus", function(e) {
	$.viewBottomToolbar.setDefaultTheme($.winRequestList);
});

$.viewBottomToolbar.setDefaultTheme($.winRequestList);

// var openHelpScreen = $.viewInstructions.openHelpScreen;

/**
 * Adding the eventlistener for the bottom bar view
 *
 * @param {Object} e
 */
$.viewBottomToolbar.getView().addEventListener('click', function(e) {
	if (e.source.buttonId == 'btnFontChange') {
		$.viewBottomToolbar.changeFont($.winRequestList);
	} else if (e.source.buttonId == 'btnSystemFeedback') {
		$.viewBottomToolbar.openFeedbackScreen(e);
	} else/*if (e.source.buttonId == 'btnSystemInstruction') {
	 $.viewInstructions.openHelpScreen(e);
	 } else*/
	if (e.source.buttonId == 'btnSystemChangeTheme') {
		$.viewBottomToolbar.changeTheme($.winRequestList);
	}
});

/**
 * Called on open of the window
 *
 * @param {Object} e
 */
function windowOpened(e) {
	Alloy.Globals.arrWindows.push($.winRequestList);
	loadRequestList(args);
	$.viewBottomToolbar.setOptions({
		showThemeButton : true,
		showInstructions : false,
		showFeedBack : true,
		showFontResize : true
	});
};

/**
 * Window is closed
 *
 * @param {Object} e
 */
function windowClosed(e) {
	Alloy.Globals.arrWindows.pop();
	$.destroy();
};