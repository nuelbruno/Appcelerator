var args = arguments[0] || {};
var httpManager = require("httpManager");
//Alloy.createController('common/httpManager');
if (Alloy.Globals.isIOS7Plus) {
	$.statusBar.height = 20;
}
var colorCode;
if (OS_IOS) {
	colorCode = Alloy.Globals.path.lblGrayColor;
} else {
	colorCode = "#888888";
}
function loadUserData() {
	$.txtName.value = args.userInfo.email;
	$.txtEmail.value = args.userInfo.email;
	$.txtAddress.value = args.userInfo.address;
	$.txtMobileNo.value = args.userInfo.mobileNumber;
	$.txtTelNo.value = args.userInfo.phoneNumber;
	$.txtFaxNo.value = args.userInfo.faxNumber;
	$.txtPOBox.value = args.userInfo.pOBox;
	$.txtAddress.color = Alloy.Globals.path.borderColor;
}

var alignment = "";
function changeLanguage() {
	$.lblNavTitle.text = Alloy.Globals.selectedLanguage.profile;
	$.txtAddress.value = Alloy.Globals.selectedLanguage.enterAddressHint;
	$.txtAddress.color = colorCode;
	if (Ti.App.Properties.getInt("isLoggedIn_Takamul") == true) {
		//$.btnNavLogin.title = Alloy.Globals.selectedLanguage.logout;
		$.btnRegister.title = Alloy.Globals.selectedLanguage.updateTitle;
		$.txtName.editable = false;
		$.txtEmail.editable = false;
		$.passwordView.visible = false;
		$.passwordView.height = 0;
		$.confPasswordView.visible = false;
		$.confPasswordView.height = 0;
		$.lblNavTitle.text = Alloy.Globals.selectedLanguage.profile;
		loadUserData();
	} else{
		$.btnRegister.title = Alloy.Globals.selectedLanguage.registerTitle;
		$.lblNavTitle.text = Alloy.Globals.selectedLanguage.registration;
	}

	$.lblName.text = Alloy.Globals.selectedLanguage.userName + ":";
	$.lblPassword.text = Alloy.Globals.selectedLanguage.password + ":";
	$.lblConfPassword.text = Alloy.Globals.selectedLanguage.confirmPassword + ":";
	$.lblEmail.text = Alloy.Globals.selectedLanguage.emailTitle + ":";
	$.lblSecQuestion.text = Alloy.Globals.selectedLanguage.securityQuestion + ":";
	$.lblAdress.text = Alloy.Globals.selectedLanguage.address + ":";
	$.lblMobileNo.text = Alloy.Globals.selectedLanguage.mobileNo;
	$.lblTelNo.text = Alloy.Globals.selectedLanguage.phoneNumber + ":";
	$.lblFaxNo.text = Alloy.Globals.selectedLanguage.faxNo + ":";
	$.lblPOBox.text = Alloy.Globals.selectedLanguage.POBox + ":";
	$.txtMobileNo.keyboardType = $.txtTelNo.keyboardType = $.txtFaxNo.keyboardType = Titanium.UI.KEYBOARD_PHONE_PAD;
	$.txtMobileNo.hintText = $.txtTelNo.hintText = $.txtFaxNo.hintText = $.txtPOBox.hintText = "xxxxxxxxxx";
	$.txtPOBox.keyboardType = Titanium.UI.KEYBOARD_NUMBER_PAD;
	$.txtEmail.keyboardType = Titanium.UI.KEYBOARD_EMAIL;
	$.txtEmail.hintText = Alloy.Globals.selectedLanguage.enterHintText + Alloy.Globals.selectedLanguage.emailAddress;
	$.txtPassword.hintText = Alloy.Globals.selectedLanguage.enterHintText + Alloy.Globals.selectedLanguage.password;
	$.txtConfPassword.hintText = Alloy.Globals.selectedLanguage.enterConfirmPasswordHint;

	if (Alloy.Globals.isEnglish) {
		$.lblEmailAstrik.left = $.lblPasswordAstrik.left = $.lblConfPasswordAstrik.left = $.lblAdressAstrik.left = $.lblMobileNoAstrik.left = $.lblPOBoxAstrik.left = $.lblSecQuestionAstrik.left = 8; 
		$.lblName.left = $.lblPassword.left = $.lblConfPassword.left = $.lblEmail.left = $.lblAdress.left = $.lblMobileNo.left = $.lblTelNo.left = $.lblFaxNo.left = $.lblPOBox.left = $.lblSecQuestion.left = 15;
		$.txtName.left = $.txtPassword.left = $.txtConfPassword.left = $.txtEmail.left = $.txtAddress.left = $.txtMobileNo.left = $.txtTelNo.left = $.txtFaxNo.left = $.txtPOBox.left = $.txtSecQuestion.left = (Alloy.isTablet) ? 200 : 150;
		$.txtName.right = $.txtPassword.right = $.txtConfPassword.right = $.txtEmail.right = $.txtAddress.right = $.txtMobileNo.right = $.txtTelNo.right = $.txtFaxNo.right = $.txtPOBox.right = 10;
		$.txtSecQuestion.right = 50;
		$.imgSecQuestion.right = 5;
		alignment = Titanium.UI.TEXT_ALIGNMENT_LEFT;
	} else {
		$.lblEmailAstrik.right = $.lblPasswordAstrik.right = $.lblConfPasswordAstrik.right = $.lblAdressAstrik.right = $.lblMobileNoAstrik.right = $.lblPOBoxAstrik.right = $.lblSecQuestionAstrik.right = 8;
		$.lblName.right = $.lblPassword.right = $.lblConfPassword.right = $.lblEmail.right = $.lblAdress.right = $.lblMobileNo.right = $.lblTelNo.right = $.lblFaxNo.right = $.lblPOBox.right = $.lblSecQuestion.right = 15;
		$.txtName.right = $.txtPassword.right = $.txtConfPassword.right = $.txtEmail.right = $.txtAddress.right = $.txtMobileNo.right = $.txtTelNo.right = $.txtFaxNo.right = $.txtPOBox.right = $.txtSecQuestion.right = (Alloy.isTablet) ? 200 : 150;
		$.txtName.left = $.txtPassword.left = $.txtConfPassword.left = $.txtEmail.left = $.txtAddress.left = $.txtMobileNo.left = $.txtTelNo.left = $.txtFaxNo.left = $.txtPOBox.left = 10;
		$.txtSecQuestion.left = 50;
		$.imgSecQuestion.left = 5;
		alignment = Titanium.UI.TEXT_ALIGNMENT_RIGHT;
	}

	$.lblName.textAlign = $.lblPassword.textAlign = $.lblConfPassword.textAlign = $.lblEmail.textAlign = $.lblAdress.textAlign = $.lblMobileNo.textAlign = $.lblTelNo.textAlign = $.lblFaxNo.textAlign = $.lblPOBox.textAlign = $.lblSecQuestion.textAlign = alignment;
	$.txtName.textAlign = $.txtPassword.textAlign = $.txtConfPassword.textAlign = $.txtEmail.textAlign = $.txtAddress.textAlign = $.txtMobileNo.textAlign = $.txtTelNo.textAlign = $.txtFaxNo.textAlign = $.txtPOBox.textAlign = $.txtSecQuestion.textAlign = alignment;
}

function secQuestionCallback() {
	$.txtSecQuestion.value = Alloy.Globals.selectedLanguage.doneTitle;
	$.txtSecQuestion.isSelected = true;
	$.imgSecQuestion.image = Alloy.Globals.path.icnDone;
}

var arrSecurityQue = [];
function selectSecQuestion() {
	if (arrSecurityQue.length == 0) {
		httpManager.getAllSecurityQuestion(function(e) {
			Ti.API.info('>>>>>>>' + JSON.stringify(e));
			if (e.length == 0) {
				return;
			}
			arrSecurityQue = e;
			var winGeneralQuestion = Alloy.createController("winGeneralQuestion", {
				arrQuestion : e,
				arrAnswer : [],
				callBack : secQuestionCallback,
				isLoggedIn : Ti.App.Properties.getInt("isLoggedIn_Takamul")
			}).getView();
			Alloy.Globals.openWindow(winGeneralQuestion);
		});
	} else {
		var winGeneralQuestion = Alloy.createController("winGeneralQuestion", {
			arrQuestion : arrSecurityQue,
			arrAnswer : [],
			callBack : secQuestionCallback,
			isLoggedIn : Ti.App.Properties.getInt("isLoggedIn_Takamul")
		}).getView();
		Alloy.Globals.openWindow(winGeneralQuestion);
	}
}

var multilineTextBoxFocus = function(e) {
	if (e.source.value == Alloy.Globals.selectedLanguage.enterAddressHint) {
		e.source.value = "";
		e.source.color = Alloy.Globals.path.borderColor;
	}
};
var multilineTextBoxBlur = function(e) {
	if (e.source.value == "") {
		e.source.value = Alloy.Globals.selectedLanguage.enterAddressHint;
		e.source.color = colorCode;
	} else {
		e.source.color = Alloy.Globals.path.borderColor;
	}
};

function validatePassword(password) {
	Ti.API.info('password>>>' + password);
	var re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{5,}$/;
	Ti.API.info('>>>>>>' + re.test(password));
	return !(re.test(password));

}

function validateData() {
	if (Ti.App.Properties.getInt("isLoggedIn_Takamul") != true) {
		if ($.txtEmail.value.trim().length == 0) {
			Alloy.Globals.ShowAlert($.lblNavTitle.text, Alloy.Globals.selectedLanguage.enterEmail);
			return false;
		} else if (Alloy.Globals.validateEmail($.txtEmail.value) == false) {
			Alloy.Globals.ShowAlert($.lblNavTitle.text, Alloy.Globals.selectedLanguage.invalidEmail);
			return false;
		} else if ($.txtPassword.value.trim().length == 0) {
			Alloy.Globals.ShowAlert($.lblNavTitle.text, Alloy.Globals.selectedLanguage.enterPassword);
			return false;
		} else if (validatePassword($.txtPassword.value.trim())) {
			Alloy.Globals.ShowAlert($.lblNavTitle.text, Alloy.Globals.selectedLanguage.PasswordValidMsg);
			return false;
		} else if ($.txtConfPassword.value.trim().length == 0) {
			Alloy.Globals.ShowAlert($.lblNavTitle.text, Alloy.Globals.selectedLanguage.enterConfirmPassword);
			return false;
		} else if ($.txtConfPassword.value != $.txtPassword.value) {
			Alloy.Globals.ShowAlert($.lblNavTitle.text, Alloy.Globals.selectedLanguage.confirmPassMsg);
			return false;
		}
	}
	if ($.txtAddress.value.trim().length == 0 || $.txtAddress.value == Alloy.Globals.selectedLanguage.enterAddressHint) {
		Alloy.Globals.ShowAlert($.lblNavTitle.text, Alloy.Globals.selectedLanguage.enterAddress);
		return false;
	} else if ($.txtAddress.value.trim().length == 0) {
		Alloy.Globals.ShowAlert($.lblNavTitle.text, Alloy.Globals.selectedLanguage.enterAddress);
		return false;
	} else if ($.txtMobileNo.value.trim().length == 0) {
		Alloy.Globals.ShowAlert($.lblNavTitle.text, Alloy.Globals.selectedLanguage.enterMobileNo);
		return false;
	} else if ($.txtMobileNo.value.trim().length < 10) {
		Alloy.Globals.ShowAlert($.lblNavTitle.text, Alloy.Globals.selectedLanguage.invalidMobileNo);
		return false;
	} else if (!validatePhone($.txtMobileNo.value)) {
		Alloy.Globals.ShowAlert($.lblNavTitle.text, Alloy.Globals.selectedLanguage.invalidMobileNo);
		return false;
	} else if (($.txtTelNo.value.trim().length > 0 && $.txtTelNo.value.trim().length < 8) || !validatePhone($.txtTelNo.value)) {
		Alloy.Globals.ShowAlert($.lblNavTitle.text, Alloy.Globals.selectedLanguage.invalidPhoneNo);
		return false;
	} else if (($.txtFaxNo.value.trim().length > 0 && $.txtFaxNo.value.trim().length < 8 ) || !validatePhone($.txtFaxNo.value)) {
		Alloy.Globals.ShowAlert($.lblNavTitle.text, Alloy.Globals.selectedLanguage.invalidFaxNo);
		return false;
	} else if ($.txtPOBox.value.trim().length == 0) {
		Alloy.Globals.ShowAlert($.lblNavTitle.text, Alloy.Globals.selectedLanguage.enterPOBox);
		return false;
	} else if (!validatePhone($.txtPOBox.value.trim())) {
		Alloy.Globals.ShowAlert($.lblNavTitle.text, Alloy.Globals.selectedLanguage.invalidPOBox);
		return false;
	} else if (!($.txtPOBox.value.length >= 3 && $.txtPOBox.value.length <= 10)) {
		Alloy.Globals.ShowAlert($.lblNavTitle.text, Alloy.Globals.selectedLanguage.invalidPOBox);
		return false;
	} else if ($.txtSecQuestion.isSelected == false) {
		Alloy.Globals.ShowAlert($.lblNavTitle.text, Alloy.Globals.selectedLanguage.invalidSecurityQuestion);
		return false;
	}
	return true;
}

var SaveVatTaxUser = function() {
	if (!validateData()) {
		return;
	}

	$.btnRegister.touchEnabled = false;
	var errorMessage = '';
	var _UserId,
	    _Username,
	    _Password,
	    _confirmPass,
	    _EmailId,
	    _userType,
	    _UserTitle,
	    _UserAddress,
	    _MobileNo,
	    _PhoneNo,
	    _FaxNo,
	    _POBox = "";
	_userType = "1";

	_UserId = _Username = _UserTitle = $.txtEmail.value;
	_Password = $.txtPassword.value;
	_confirmPass = $.txtConfPassword.value;
	_EmailId = $.txtEmail.value;
	_UserAddress = $.txtAddress.value;
	_MobileNo = $.txtMobileNo.value;
	_PhoneNo = $.txtTelNo.value;
	_FaxNo = $.txtFaxNo.value;
	_POBox = $.txtPOBox.value;

	/*if ($.txtName != null) {
	if ($.txtName.value.length == 0) {
	errorMessage = errorMessage + $.lblName.text + '\n';
	} else
	_UserId = _Username = _UserTitle = $.txtName.value;
	}

	if (Ti.App.Properties.getInt("isLoggedIn_Takamul") != true) {
	if ($.txtPassword != null) {
	if ($.txtPassword.value.trim().length == 0) {
	errorMessage = errorMessage + $.lblPassword.text + '\n';
	} else if (validatePassword($.txtPassword.value.trim())) {
	errorMessage = errorMessage + Alloy.Globals.selectedLanguage.PasswordValidMsg + '\n';
	} else {
	_Password = $.txtPassword.value;
	}
	}
	if ($.txtConfPassword != null) {
	if ($.txtConfPassword.value.trim().length == 0) {
	errorMessage = errorMessage + $.lblConfPassword.text + '\n';
	} else if ($.txtConfPassword.value != $.txtPassword.value) {
	errorMessage = errorMessage + Alloy.Globals.selectedLanguage.confirmPassMsg + '\n';
	} else
	_confirmPass = $.txtConfPassword.value;
	}
	}

	if ($.txtEmail != null) {
	if ($.txtEmail.value.trim().length == 0) {
	errorMessage = errorMessage + $.lblEmail.text + '\n';
	} else if (Alloy.Globals.validateEmail($.txtEmail.value) == false) {
	errorMessage = errorMessage + Alloy.Globals.selectedLanguage.enterValidEmailMsg + '\n';
	} else
	_EmailId = $.txtEmail.value;
	}

	if ($.txtAddress != null) {
	if ($.txtAddress.value.trim().length == 0) {
	errorMessage = errorMessage + $.lblAdress.text + '\n';
	} else
	_UserAddress = $.txtAddress.value;
	}

	if ($.txtMobileNo != null) {
	if ($.txtMobileNo.value.trim().length == 0) {
	errorMessage = errorMessage + $.lblMobileNo.text + '\n';
	} else if (!validatePhone($.txtMobileNo.value)) {
	errorMessage = errorMessage + Alloy.Globals.selectedLanguage.enterValidMobile + '\n';
	} else {
	_MobileNo = $.txtMobileNo.value;
	}
	}

	if ($.txtTelNo != null) {
	if ($.txtTelNo.value.trim().length > 0 && !validatePhone($.txtTelNo.value)) {
	errorMessage = errorMessage + Alloy.Globals.selectedLanguage.enterValidPhone + '\n';
	} else {
	_PhoneNo = $.txtTelNo.value;
	}

	}
	if ($.txtFaxNo != null) {
	if ($.txtFaxNo.value.trim().length > 0 && !validatePhone($.txtFaxNo.value)) {
	errorMessage = errorMessage + Alloy.Globals.selectedLanguage.enterValidFax + '\n';
	} else {
	_FaxNo = $.txtFaxNo.value;
	}

	}

	if ($.txtPOBox != null) {
	if ($.txtPOBox.value.trim().length == 0) {
	errorMessage = errorMessage + $.lblPOBox.text + '\n';
	} else if ($.txtPOBox.value.trim().length > 0 && !($.txtPOBox.value.length >= 3 && $.txtPOBox.value.length <= 6)) {
	errorMessage = errorMessage + Alloy.Globals.selectedLanguage.enterValidPOBox + '\n';
	} else {
	_POBox = $.txtPOBox.value;
	}
	}

	if (errorMessage.length > 0) {

	Alloy.Globals.ShowAlert($.lblNavTitle.text, Alloy.Globals.selectedLanguage.plzEnterMissingFieldsMsg + "\n" + errorMessage);
	} else {*/
	//Alloy.Globals.showLoading('loading', false);
	var user = {
		UserId : _UserId,
		Username : _Username,
		Password : _Password,
		confirmPass : _confirmPass,
		EmailId : _EmailId,
		userType : _userType,
		UserTitle : _UserTitle,
		UserAddress : _UserAddress,
		MobileNo : _MobileNo,
		PhoneNo : (_PhoneNo.trim().length == 0) ? _MobileNo : _PhoneNo,
		FaxNo : _FaxNo,
		POBox : _POBox,
		arrSecurityQue : arrSecurityQue
	};
	if (Ti.App.Properties.getInt("isLoggedIn_Takamul") == true) {
		httpManager.takamulUser_Update(user, function(e) {
			if (e != null) {
				Ti.API.info("==>Takamul User Update Profile success ==>" + JSON.stringify(e));
				if (e.tokenDetails.status == "Success") {
					var alertDialog = Ti.UI.createAlertDialog({
						title : $.lblNavTitle.text,
						message : (Alloy.Globals.isEnglish) ? e.tokenDetails.description_EN : e.tokenDetails.description_AR,
						buttonNames : [Alloy.Globals.selectedLanguage.ok],
					});
					alertDialog.show();
					alertDialog.addEventListener('click', function(data) {
						//updateUserProfile(user);
						setTokenData(e.tokenDetails);
						reset();
						closeWindow();
					});
				} else {
					Ti.App.Properties.setInt("isLoggedIn_Takamul", false);
					Alloy.Globals.ShowAlert($.lblNavTitle.text, (Alloy.Globals.isEnglish) ? e.tokenDetails.description_EN : e.tokenDetails.description_AR);
				}
			}
		});
	} else {
		httpManager.takamulUserRegister(user, function(e) {
			if (e != null) {
				Ti.API.info("==>Takamul User create success ==>" + JSON.stringify(e));
				if (e.status == "Success" || e.status == "true") {
					var alertDialog = Ti.UI.createAlertDialog({
						title : $.lblNavTitle.text,
						message : (Alloy.Globals.isEnglish) ? e.description_EN : e.description_AR,
						buttonNames : [Alloy.Globals.selectedLanguage.ok],
					});
					alertDialog.show();
					alertDialog.addEventListener('click', function(e) {
						reset();
						closeWindow();
					});
				} else {
					Alloy.Globals.ShowAlert($.lblNavTitle.text, (Alloy.Globals.isEnglish) ? e.description_EN : e.description_AR);
				}
			}

		});
	}

	// }

	$.btnRegister.touchEnabled = true;
};

/*function updateUserProfile(user) {
	var userObj = Ti.App.Properties.getObject("LoginDetaisObj_Takamul");
	Ti.App.Properties.setObject("LoginDetaisObj_Takamul", {
		id : userObj.id,
		address : user.UserAddress,
		email : user.EmailId,
		faxNumber : user.FaxNo,
		fullName : user.EmailId,
		mobileNumber : user.MobileNo,
		pOBox : user.POBox,
		phoneNumber : user.PhoneNo,
		userID : userObj.UserId,
		userName : user.EmailId,
		userTypeId : user.userType, //userObj.userTypeId,
		password : userObj.password
	});
	Ti.API.info('>>>>>>>>' + JSON.stringify(Ti.App.Properties.getObject("LoginDetaisObj_Takamul")));
}*/

function setTokenData(e) {

	Ti.App.Properties.setInt("authenticationCode_Takamul", e.tokenCode);
	Ti.App.Properties.setString("emailID_Takamul", e.emailId);
	Ti.App.Properties.setString("createdDate_Takamul", e.createdDate);
	Ti.App.Properties.setString("lastUpdatedDate_Takamul", e.lastUpdatedDate);
	Ti.App.Properties.setString("status_Takamul", e.tokenStatus);
	Ti.App.Properties.setString("roleType_Takamul", e.roleType);
	Ti.App.Properties.setString("groupType_Takamul", e.groupType);
}

function validatePhone(str) {
	//var regex=/^[0-9]+$/;
	var result;
	result = str.match(/^[\u0660-\u0669\u06F0-\u06F9]*$/);
	Ti.API.log('Ar result ' + result);
	if (result != null) {
		return true;
	}
	var regex = /^[0-9]+$/;
	return (regex.test(str));
}

var reset = function() {
	$.txtName.value = "";
	$.txtEmail.value = "";
	$.txtAddress.value = "";
	$.txtMobileNo.value = "";
	$.txtTelNo.value = "";
	$.txtFaxNo.value = "";
	$.txtPOBox.value = "";
	$.txtPassword.value = "";
	$.txtConfPassword.value = "";
};

function closeWindow() {
	Alloy.Globals.closeWindow($.winUserProfile);
}

function gotoHome() {
	Alloy.Globals.gotoHome();
}

changeLanguage();

$.winUserProfile.addEventListener("focus", function(e) {
	$.viewBottomToolbar.setDefaultTheme($.winUserProfile);
});
$.viewBottomToolbar.setDefaultTheme($.winUserProfile);

// var openHelpScreen = $.viewInstructions.openHelpScreen;

/**
 * Adding the eventlistener for the bottom bar view
 *
 * @param {Object} e
 */
$.viewBottomToolbar.getView().addEventListener('click', function(e) {
	if (e.source.buttonId == 'btnFontChange') {
		$.viewBottomToolbar.changeFont($.winUserProfile);
	} else if (e.source.buttonId == 'btnSystemFeedback') {
		$.viewBottomToolbar.openFeedbackScreen(e);
	} else/*if (e.source.buttonId == 'btnSystemInstruction') {
	 $.viewInstructions.openHelpScreen(e);
	 } else*/
	if (e.source.buttonId == 'btnSystemChangeTheme') {
		$.viewBottomToolbar.changeTheme($.winUserProfile);
	}
});

/**
 * Called on open of the window
 *
 * @param {Object} e
 */
function windowOpened(e) {
	Alloy.Globals.arrWindows.push($.winUserProfile);
	$.viewBottomToolbar.setOptions({
		showThemeButton : true,
		showInstructions : false,
		showFeedBack : true,
		showFontResize : true,
	});
};

/**
 * Window is closed
 *
 * @param {Object} e
 */
function windowClosed(e) {
	Alloy.Globals.arrWindows.pop();
	$.scrollView.removeAllChildren();
	$.destroy();
};