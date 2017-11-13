var args = arguments[0] || {};
var moment = require('alloy/moment');
var httpManager = require("httpManager");
//Alloy.createController('common/httpManager');
if (Alloy.Globals.isIOS7Plus) {
	$.statusBar.height = 20;
}

function closeWindow() {
	Alloy.Globals.closeWindow($.winViewRequest);
}

function gotoHome() {
	Alloy.Globals.gotoHome();
}

function reloadViewRequest() {
	httpManager.getTakamulRequestInfoByID(args.requestID, function(data) {
		if (data != null) {
			if (data.tokenDetails.status == "Success") {
				setTokenData(data.tokenDetails);
				loadViewRequest(data.arrTaskList);
			} else {
				Ti.App.Properties.setInt("isLoggedIn_Takamul", false);
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.createRequest, (Alloy.Globals.isEnglish) ? data.tokenDetails.description_EN : data.tokenDetails.description_AR);
			}
		}
	});
}

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

function replyRequest() {
	var win = Alloy.createController('Takamul/winCreateRequest', {
		isFromHome : false,
		callback : reloadViewRequest,
		data : args
	}).getView();
	Alloy.Globals.openWindow(win);
}

function loadViewRequest(requestList) {
	Ti.API.info('>>>>>>>>' + JSON.stringify(requestList));
	var arrRow = [];
	var userName = args.data.initiatorName;
	for (var i = 0,
	    length = requestList.length; i < length; i++) {
		arrRow.push({
			lblSubjTit : {
				text : (requestList[i].initiatorName == userName) ? Alloy.Globals.selectedLanguage.subjectTitle + " - " : Alloy.Globals.selectedLanguage.mof + " - ",
				color : (requestList[i].initiatorName == userName) ? Alloy.Globals.path.blackColor : Alloy.Globals.path.navBarColor
			},
			lblSubject : {
				text : (requestList[i].initiatorName == userName) ? args.data.subject : requestList[i].status_En
			},
			lblDate : {
				text : moment(requestList[i].startDate).format("DD-MM-YYYY")//(requestList[i].assignRoleId == 1) ? moment(args.data.submitDate).format("DD-MM-YYYY") :
			},
			lblTime : {
				text : moment(requestList[i].startDate).format("hh:mm a"),//(requestList[i].assignRoleId == 1) ? moment(args.data.submitDate).format("DD-MM-YYYY") :
			},
			lblComments : {
				text : requestList[i].comment//(requestList[i].assignRoleId == 1) ? args.data.description :
			},
		});
	}
	if (args.data.wfStateId != 10) {
		arrRow.push({
			template : "template1",
		});
	}
	$.listSection.setItems(arrRow);
}

function changedLanguage() {
	$.lblNavTitle.text = Alloy.Globals.selectedLanguage.viewRequest;
	$.lblViewReq.text = Alloy.Globals.selectedLanguage.viewRequest;
	loadViewRequest(args.data.arrTaskList);
}

changedLanguage();

$.winViewRequest.addEventListener("focus", function(e) {
	$.viewBottomToolbar.setDefaultTheme($.winViewRequest);
});
$.viewBottomToolbar.setDefaultTheme($.winViewRequest);

// var openHelpScreen = $.viewInstructions.openHelpScreen;

/**
 * Adding the eventlistener for the bottom bar view
 *
 * @param {Object} e
 */
$.viewBottomToolbar.getView().addEventListener('click', function(e) {
	if (e.source.buttonId == 'btnFontChange') {
		$.viewBottomToolbar.changeFont($.winViewRequest);
	} else if (e.source.buttonId == 'btnSystemFeedback') {
		$.viewBottomToolbar.openFeedbackScreen(e);
	} else/*if (e.source.buttonId == 'btnSystemInstruction') {
	 $.viewInstructions.openHelpScreen(e);
	 } else*/
	if (e.source.buttonId == 'btnSystemChangeTheme') {
		$.viewBottomToolbar.changeTheme($.winViewRequest);
	}
});

/**
 * Called on open of the window
 *
 * @param {Object} e
 */
function windowOpened(e) {
	Alloy.Globals.arrWindows.push($.winViewRequest);
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