var args = arguments[0] || {};
var isFromNavBar = false,
    selectedIndex;
var httpManager = require("httpManager");
//Alloy.createController('common/httpManager');
if (Alloy.Globals.isIOS7Plus) {
	//$.winPurchaseOrder.extendEdges = [Ti.UI.EXTEND_EDGE_TOP];
	$.statusBar.height = 20;
}

function closeWindow() {
	Alloy.Globals.closeWindow($.winTakamulHome);
}

function openRegistration() {
	selectedIndex = 2;
	if (Ti.App.Properties.getInt("isLoggedIn_Takamul")) {
		gotoNextScreen(selectedIndex);
	} else {
		var win = Alloy.createController("Takamul/winUserProfile").getView();
		Alloy.Globals.openWindow(win);
	}

}

function openRequestList() {
	selectedIndex = 1;
	if (Ti.App.Properties.getInt("isLoggedIn_Takamul")) {
		gotoNextScreen(selectedIndex);
	} else {
		$.backView.show();
		$.loginView.show();
		isFromNavBar = false;
	}

}

function openNewRequestList() {
	selectedIndex = 0;
	if (Ti.App.Properties.getInt("isLoggedIn_Takamul")) {
		gotoNextScreen(selectedIndex);
	} else {
		$.backView.show();
		$.loginView.show();
		isFromNavBar = false;
	}

}

var logoutAlert = Ti.UI.createAlertDialog({
	title : Alloy.Globals.selectedLanguage.logout,
	message : Alloy.Globals.selectedLanguage.logOutMessage,
	buttonNames : (OS_IOS) ? [Alloy.Globals.selectedLanguage.ok, Alloy.Globals.selectedLanguage.cancel] : [Alloy.Globals.selectedLanguage.cancel, Alloy.Globals.selectedLanguage.ok]
});
logoutAlert.addEventListener('click', function(e) {
	Ti.API.info('E>INDEX = ' + e.index);
	var successIndex = 0;
	if (OS_ANDROID) {
		successIndex = 1;
	}
	if (e.index == successIndex) {

		httpManager.userLogout(Ti.App.Properties.getObject("LoginDetaisObj_Takamul").tokenDetails, function(obj) {

			if (obj != null) {
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.logout, obj.serviceAlert);
				if (obj.status) {
					$.btnNavLogin.title = Alloy.Globals.selectedLanguage.login;
					$.changePasswordView.hide();
					$.changePasswordView.height = 0;
					$.lblRegistration.text = Alloy.Globals.selectedLanguage.userRegistration;
					Ti.App.Properties.setInt("isLoggedIn_Takamul", false);
				}
			}
		});

	} else {
		logoutAlert.hide();
	}
});

function PopUPLoginForm() {
	isFromNavBar = true;
	var isLoggedIn = Ti.App.Properties.getInt("isLoggedIn_Takamul");
	if (isLoggedIn) {
		logoutAlert.show();
	} else {
		$.backView.show();
		$.loginView.show();
	}

}

function setTokenData(e) {
	Ti.App.Properties.setInt("authenticationCode_Takamul", e.tokenDetails.tokenCode);
	Ti.App.Properties.setString("emailID_Takamul", e.tokenDetails.emailId);
	Ti.App.Properties.setString("createdDate_Takamul", e.tokenDetails.createdDate);
	Ti.App.Properties.setString("lastUpdatedDate_Takamul", e.tokenDetails.lastUpdatedDate);
	Ti.App.Properties.setString("status_Takamul", e.tokenDetails.tokenStatus);
	Ti.App.Properties.setString("roleType_Takamul", e.tokenDetails.roleType);
	Ti.App.Properties.setString("groupType_Takamul", e.tokenDetails.groupType);
}

function gotoNextScreen(selectedIndex) {
	if (selectedIndex == 0) {

		var win = Alloy.createController("Takamul/winCreateRequest", {
			isFromHome : true,
			callback : ""
		}).getView();
		Alloy.Globals.openWindow(win);

	} else if (selectedIndex == 1) {
		httpManager.getAllTakamulRequest(function(data) {
			Ti.API.info('data >> ' + JSON.stringify(data));
			if (data != null) {
				if (data.tokenDetails.status == "Success") {
					setTokenData(data);
					var win = Alloy.createController("Takamul/winRequestList", data.arrRequestList).getView();
					Alloy.Globals.openWindow(win);
				} else {
					Ti.App.Properties.setInt("isLoggedIn_Takamul", false);
					$.changePasswordView.hide();
					$.changePasswordView.height = 0;
					Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.takamulTitle, (Alloy.Globals.isEnglish) ? data.tokenDetails.description_EN : data.tokenDetails.description_AR);
				}
			}
		});
	} else {
		httpManager.takamulUser_GetUserProfile(Ti.App.Properties.getObject("LoginDetaisObj_Takamul").userInfo.userName, function(e) {
			if (e != null) {
				if (e.tokenDetails.status == "Success") {
					Ti.API.info('>>>>>>' + JSON.stringify(e));
					setTokenData(e);
					var win = Alloy.createController("Takamul/winUserProfile", e).getView();
					Alloy.Globals.openWindow(win);
				} else if (e.tokenDetails.tokenStatus == "Expired") {
					Ti.App.Properties.setInt("isLoggedIn_Takamul", false);
					$.changePasswordView.hide();
					$.changePasswordView.height = 0;
					Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.takamulTitle, (Alloy.Globals.isEnglish) ? e.tokenDetails.description_EN : e.tokenDetails.description_AR);
				} else {
					Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.takamulTitle, (Alloy.Globals.isEnglish) ? e.tokenDetails.description_EN : e.tokenDetails.description_AR);
				}

			}
		});
	}
}

var winQuestion = undefined;

function questionCallBack(e) {
	if (winQuestion != undefined) {
		winQuestion.close();
	}

	Ti.App.Properties.setInt("isLoggedIn_Takamul", true);
	setTokenData(e);
	Ti.API.info('e===' + JSON.stringify(e));

	/*if (OS_IOS) {
		var takamulUserDefault = Ti.App.iOS.createUserDefaults({
			suiteName : Alloy.Globals.suiteName
		});

		takamulUserDefault.setString("TAKAMUL_TOKEN_KEY", e.tokenDetails.tokenCode);
		takamulUserDefault.setString("TAKAMUL_USERNAME_KEY", e.tokenDetails.emailId);
		takamulUserDefault.setString("TAKAMUL_STARTDATE_KEY", e.tokenDetails.createdDate);
		takamulUserDefault.setString("TAKAMUL_UPDATEDATE_KEY", e.tokenDetails.lastUpdatedDate);
	}*/

	//	takamulUserDefault.setObject("takamulUserDefault", userDefault);

	Ti.App.Properties.setObject("LoginDetaisObj_Takamul", e);
	closeLoginView();
	$.btnNavLogin.title = Alloy.Globals.selectedLanguage.logout;
	$.btnNavLogin.width = Ti.UI.SIZE;
	$.changePasswordView.show();
	$.changePasswordView.height = 55;
	$.lblRegistration.text = Alloy.Globals.selectedLanguage.profile;
	if (!isFromNavBar) {
		gotoNextScreen(selectedIndex);
	}
}

function askForQuestion(e) {
	var payload = {};

	/*httpManager.getSecurityQuestionList({
	 serviceID : 1,
	 userName : e.userInfo.userName
	 }, function(arr) {
	 Ti.API.info('JSON ARR = ' + JSON.stringify(arr));*/

	payload.arrQuestion = e.arrQuestion;
	payload.callBack = questionCallBack;
	payload.pageTitle = $.lblNavTitle.text;

	payload.obj = {
		password : $.txtPassword.value.trim(),
		userName : $.txtUsername.value.trim(),
		typeOfService : "VTAX"
	};

	payload.serviceId = 5;
	winQuestion = Alloy.createController("TaxVat/winQuestion", payload).getView();
	// Alloy.Globals.openWindow(win);

	if (OS_IOS) {
		winQuestion.open({
			modal : true
		});
	} else {
		winQuestion.open();
	}

	// });
}

function doLogin(e) {

	if ($.txtUsername.value.trim().length == 0 || $.txtPassword.value.trim().length == 0) {
		Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.login, Alloy.Globals.selectedLanguage.enterLoginPassword);
		return;
	}
	httpManager.takamulUserLogin($.txtUsername.value.trim(), $.txtPassword.value.trim(), function(e) {
		if (e != null) {
			Ti.API.info(">>>>>Takamul object" + JSON.stringify(e));

			var questionTimeout = setTimeout(function() {
				askForQuestion(e);
				clearTimeout(questionTimeout);
			}, 400);
		}

	});

}

function closeLoginView() {
	$.backView.hide();
	$.loginView.hide();
	$.txtUsername.value = $.txtPassword.value = "";
	$.txtUsername.blur();
	$.txtPassword.blur();
}

function showForgotPasswordView() {
	$.forgotPasswordView.show();
	$.loginView.hide();
}

function closeForgotPasswordView() {
	$.loginView.show();
	$.forgotPasswordView.hide();
}

function callForgotPwd() {
	if ($.txtForgotUserName.value.trim().length == 0) {
		Alloy.Globals.ShowAlert($.lblNavTitle.text, Alloy.Globals.selectedLanguage.enterUserName);
		return;
	}

	httpManager.takamulForgotPassword($.txtForgotUserName.value.trim(), function(e) {
		if (e != null) {
			if (e.status == "Success") {
				Alloy.Globals.ShowAlert($.lblNavTitle.text, (Alloy.Globals.isEnglish) ? e.description_EN : e.description_AR);
				closeForgotPasswordView();
			} else {
				Alloy.Globals.ShowAlert($.lblNavTitle.text, (Alloy.Globals.isEnglish) ? e.description_EN : e.description_AR);
			}
		}
	});

}

function openChangePassword() {
	$.backView.show();
	$.changePwdPopupView.show();

}

function validatePassword(password) {
	Ti.API.info('password>>>' + password);
	var re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{5,}$/;
	Ti.API.info('>>>>>>' + re.test(password));
	return !(re.test(password));
}

function closeChangePwdView() {
	$.backView.hide();
	$.changePwdPopupView.hide();
	$.txtNewPwd.value = "";
	$.txtNewConfirmPwd.value = "";
	$.txtNewPwd.blur();
	$.txtOldPwd.value = "";
}

function callChangePwd() {
	if ($.txtOldPwd.value.trim().length == 0) {
		Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.changePassword, Alloy.Globals.selectedLanguage.enterOldPassword);
		return false;
	} else if ($.txtNewPwd.value.trim().length == 0) {
		Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.changePassword, Alloy.Globals.selectedLanguage.enterPassword);
		return false;
	} else if (validatePassword($.txtNewPwd.value.trim())) {
		Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.changePassword, Alloy.Globals.selectedLanguage.PasswordValidMsg);
		return false;
	} else if ($.txtNewConfirmPwd.value.trim().length == 0) {
		Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.changePassword, Alloy.Globals.selectedLanguage.enterConfirmPassword);
		return false;
	} else if ($.txtNewConfirmPwd.value != $.txtNewPwd.value) {
		Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.changePassword, Alloy.Globals.selectedLanguage.confirmPassMsg);
		return false;
	}

	httpManager.takamulUser_ChangePassword($.txtOldPwd.value.trim(), $.txtNewPwd.value.trim(), function(e) {
		Ti.API.info("Change pwd out put :" + JSON.stringify(e));
		if (e != null) {
			Ti.API.info(">>>>>Takamul user object" + JSON.stringify(e));
			if (e.tokenDetails.status == "Success") {
				setTokenData(e);
				Alloy.Globals.ShowAlert($.lblNavTitle.text, (Alloy.Globals.isEnglish) ? e.tokenDetails.description_EN : e.tokenDetails.description_AR);
				closeChangePwdView();
			} else {
				Ti.App.Properties.setInt("isLoggedIn_Takamul", false);
				$.changePasswordView.hide();
				$.changePasswordView.height = 0;
				Alloy.Globals.ShowAlert($.lblNavTitle.text, (Alloy.Globals.isEnglish) ? e.tokenDetails.description_EN : e.tokenDetails.description_AR);
			}

		}

	});

}

function gotoRegistration(e) {
	closeLoginView();
	openRegistration();
}

function changeLanguage() {
	if (Ti.App.Properties.getInt("isLoggedIn_Takamul") == true) {
		$.btnNavLogin.title = Alloy.Globals.selectedLanguage.logout;
		$.lblRegistration.text = Alloy.Globals.selectedLanguage.profile;
		$.changePasswordView.show();
	} else {
		$.btnNavLogin.title = Alloy.Globals.selectedLanguage.login;
		$.lblRegistration.text = Alloy.Globals.selectedLanguage.userRegistration;
		$.changePasswordView.hide();
		$.changePasswordView.height = 0;
	}
	$.lblNavTitle.text = Alloy.Globals.selectedLanguage.takamulTitle;
	$.btnRegistrationBig.title = Alloy.Globals.selectedLanguage.createNewAccount;
	$.lblNewRequest.text = Alloy.Globals.selectedLanguage.createNewRequest;
	$.lblRequest.text = Alloy.Globals.selectedLanguage.requestList;
	$.btnLogin.title = Alloy.Globals.selectedLanguage.login;
	$.btnCancel.title = Alloy.Globals.selectedLanguage.cancel;
	$.lblLoginDesc.text = Alloy.Globals.selectedLanguage.loginDescription;
	$.btnLoginBig.title = Alloy.Globals.selectedLanguage.login;
	$.lblForgotPassword.text = Alloy.Globals.selectedLanguage.forgotPassword;
	$.txtUsername.hintText = Alloy.Globals.selectedLanguage.emailAddress;
	$.txtPassword.hintText = Alloy.Globals.selectedLanguage.password;
	$.btnChangePwd.title = Alloy.Globals.selectedLanguage.changePassword;
	$.btnChangePwdCancel.title = Alloy.Globals.selectedLanguage.cancel;
	$.btnChangePwdBig.title = Alloy.Globals.selectedLanguage.changePassword;
	$.lblChangePassword.text = Alloy.Globals.selectedLanguage.changePassword;
	$.lblChangePwd.text = Alloy.Globals.selectedLanguage.newPassword;
	$.btnForgotPwd.title = Alloy.Globals.selectedLanguage.lblForgotPassword;
	$.btnForgotPwdCancel.title = Alloy.Globals.selectedLanguage.cancel;
	$.btnForgotPwdBig.title = Alloy.Globals.selectedLanguage.submitTitle;
	$.lblForgotUserName.text = Alloy.Globals.selectedLanguage.emailAddress;
	$.lblOldPwd.text = Alloy.Globals.selectedLanguage.oldPassword;
	$.lblChangeConfirmPwd.text = Alloy.Globals.selectedLanguage.confirmPassword;
	var alignment;
	if (Alloy.Globals.isEnglish) {
		alignment = Ti.UI.TEXT_ALIGNMENT_LEFT;
		$.lblRegistration.left = $.lblRequest.left = $.lblNewRequest.left = $.lblChangePassword.left = (Alloy.isTablet) ? 85 : 65;
		$.btnLogin.left = $.btnCancel.right = $.btnForgotPwd.left = $.btnForgotPwdCancel.right = 10;
		$.imgRequest.left = $.imgNewRequest.left = $.imgvRegistration.left = $.imgChangePassword.left = 20;
		$.imgUserName.left = $.imgPassword.left = 10;
		$.txtUsername.left = $.txtPassword.left = 35;
		$.txtUsername.right = $.txtPassword.right = 5;
		$.lblForgotPassword.left = $.lblChangePwd.left = $.lblForgotUserName.left = $.lblChangeConfirmPwd.left = $.lblOldPwd.left = 10;

		$.btnChangePwd.left = $.btnChangePwdCancel.right = 10;
	} else {
		alignment = Ti.UI.TEXT_ALIGNMENT_RIGHT;
		$.lblRegistration.right = $.lblRequest.right = $.lblNewRequest.right = $.lblChangePassword.right = (Alloy.isTablet) ? 85 : 65;
		$.btnLogin.right = $.btnCancel.left = $.btnForgotPwd.right = $.btnForgotPwdCancel.left = 10;
		$.imgRequest.right = $.imgNewRequest.right = $.imgvRegistration.right = $.imgChangePassword.right = 20;
		$.imgUserName.right = $.imgPassword.right = 10;
		$.txtUsername.left = $.txtPassword.left = 5;
		$.txtUsername.right = $.txtPassword.right = 35;
		$.lblForgotPassword.right = $.lblChangePwd.right = 10;
		$.btnChangePwd.right = $.btnChangePwdCancel.left = $.lblForgotUserName.right = $.lblChangeConfirmPwd.right = $.lblOldPwd.right = 10;
	}
	$.lblRegistration.textAlign = $.lblRequest.textAlign = $.lblNewRequest.textAlign = alignment;
	$.lblLoginDesc.textAlign = $.txtUsername.textAlign = $.txtPassword.textAlign = $.lblForgotPassword.textAlign = /*$.lblChangePassword.textAlign =*/alignment;
	$.lblChangePwd.textAlign = $.txtNewPwd.textAlign = $.txtForgotUserName.textAlign = $.lblForgotUserName.textAlign = $.lblOldPwd.textAlign = $.txtOldPwd.textAlign = alignment;
	$.lblChangeConfirmPwd.textAlign = $.txtNewConfirmPwd.textAlign = alignment;
}

changeLanguage();
$.winTakamulHome.addEventListener('focus', function(e) {
	if (Ti.App.Properties.getInt("isLoggedIn_Takamul") == true) {
		$.btnNavLogin.title = Alloy.Globals.selectedLanguage.logout;
		$.lblRegistration.text = Alloy.Globals.selectedLanguage.profile;
		$.changePasswordView.show();
	} else {
		$.btnNavLogin.title = Alloy.Globals.selectedLanguage.login;
		$.lblRegistration.text = Alloy.Globals.selectedLanguage.userRegistration;
		$.changePasswordView.hide();
		$.changePasswordView.height = 0;
	}
});

$.winTakamulHome.addEventListener("focus", function(e) {
	$.viewBottomToolbar.setDefaultTheme($.winTakamulHome);
});

$.viewBottomToolbar.setDefaultTheme($.winTakamulHome);

// var openHelpScreen = $.viewInstructions.openHelpScreen;

/**
 * Adding the eventlistener for the bottom bar view
 *
 * @param {Object} e
 */
$.viewBottomToolbar.getView().addEventListener('click', function(e) {
	if (e.source.buttonId == 'btnFontChange') {
		$.viewBottomToolbar.changeFont($.winTakamulHome);
	} else if (e.source.buttonId == 'btnSystemFeedback') {
		$.viewBottomToolbar.openFeedbackScreen(e);
	} else/*if (e.source.buttonId == 'btnSystemInstruction') {
	 $.viewInstructions.openHelpScreen(e);
	 } else*/
	if (e.source.buttonId == 'btnSystemChangeTheme') {
		$.viewBottomToolbar.changeTheme($.winTakamulHome);
	}
});

/**
 * Called on open of the window
 *
 * @param {Object} e
 */
function windowOpened(e) {
	Alloy.Globals.arrWindows.push($.winTakamulHome);
	$.viewBottomToolbar.setOptions({
		showThemeButton : true,
		showInstructions : false,
		showFeedBack : true,
		showFontResize : true,
	});
	$.viewBottomToolbar.height = 0;
};

/**
 * Window is closed
 *
 * @param {Object} e
 */
function windowClosed(e) {
	Alloy.Globals.arrWindows.pop();
	$.winTakamulHome.removeAllChildren();
	$.destroy();
};