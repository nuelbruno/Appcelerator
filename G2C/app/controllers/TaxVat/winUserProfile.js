var args = arguments[0] || {};
var httpManager = require("httpManager");
//Alloy.createController('common/httpManager');
if (Alloy.Globals.isIOS7Plus) {
	$.statusBar.height = 20;
	//$.statusBar.backgroundColor = Alloy.Globals.path.bgColor;
}
var colorCode;

if (OS_IOS) {
	colorCode = Alloy.Globals.path.lblGrayColor;
} else {
	colorCode = "#888888";
}

function setTokenData(e) {
	Ti.App.Properties.setObject("LoginDetaisObj_VatTax", e);

	Ti.App.Properties.setInt("authenticationCode_VatTax", e.tokenDetails.tokenCode);
	Ti.App.Properties.setString("emailID_VatTax", e.tokenDetails.emailId);
	Ti.App.Properties.setString("createdDate_VatTax", e.tokenDetails.createdDate);
	Ti.App.Properties.setString("lastUpdatedDate_VatTax", e.tokenDetails.lastUpdatedDate);
	Ti.App.Properties.setString("status_VatTax", e.tokenDetails.tokenStatus);
	Ti.App.Properties.setString("roleType_VatTax", e.tokenDetails.roleType);
	Ti.App.Properties.setString("groupType_VatTax", e.tokenDetails.groupType);
}

function getUserTypeName(id) {
	if (id == 1) {
		return Alloy.Globals.VTaxSelectedLanguage.individual;
	} else if (id == 2) {
		return Alloy.Globals.VTaxSelectedLanguage.corporate;
	} else if (id == 3){
		return Alloy.Globals.VTaxSelectedLanguage.government;
	}
}

function loadUserData() {
	var data = args.userInfo;
	$.txtName.value = data.email;
	$.txtEmail.value = data.email;
	//.username
	$.txtAddress.value = data.address;
	$.txtUserType.value = getUserTypeName(data.userTypeId);
	$.txtUserType.custId = data.userTypeId;
	$.txtMobileNo.value = data.mobileNumber;
	$.txtTelNo.value = data.phoneNumber;
	$.txtFaxNo.value = (data.faxNumber == "N/A") ? "" : data.faxNumber;
	$.txtPOBox.value = data.pOBox;
	$.txtAddress.color = (Alloy.Globals.currentTheme == "dark") ? "#FFF" : Alloy.Globals.path.borderColor;

	secQuestionCallback();

	$.txtName.editable = false;
	$.txtEmail.editable = false;
}

var alignment = "";

function closePopUP() {
	closeWindow();
}

function openUserSatisfaction() {
	httpManager.getUserSatisfactionQuestions(function(e) {

		if (e == null) {
			return;
		}
		var win = Alloy.createController("UserSatisfaction/winUserSatisfaction", {
			callBack : closeWindow,
			data : e,
			serviceID : 5
		}).getView();
		Alloy.Globals.openWindow(win);

	});
}

function changeLanguage() {
	$.lblNavTitle.text = Alloy.Globals.VTaxSelectedLanguage.registration;
	$.txtAddress.value = Alloy.Globals.VTaxSelectedLanguage.enterAddressHint;
	$.txtAddress.color = colorCode;
	if (Ti.App.Properties.getInt("isLoggedIn_VatTax") == true) {
		$.lblNavTitle.text = Alloy.Globals.VTaxSelectedLanguage.profile;
		//$.btnNavLogin.title = Alloy.Globals.VTaxSelectedLanguage.logout;
		$.btnRegister.title = Alloy.Globals.VTaxSelectedLanguage.updateTitle;
		$.passwordView.visible = false;
		$.passwordView.height = 0;
		$.confPasswordView.visible = false;
		$.confPasswordView.height = 0;

		$.imgUserType.height = 0;

		$.lblEmailAstrik.text = "";
		$.lblUserTypeAstrik.text = "";
		loadUserData();

	} else {
		$.btnRegister.title = Alloy.Globals.VTaxSelectedLanguage.registerTitle;
	}

	$.txtPassword.maxLength = $.txtConfPassword.maxLength = 15;

	$.lblName.text = Alloy.Globals.VTaxSelectedLanguage.userName;
	$.lblPassword.text = Alloy.Globals.VTaxSelectedLanguage.password;
	$.lblConfPassword.text = Alloy.Globals.VTaxSelectedLanguage.confirmPassword;
	$.lblEmail.text = Alloy.Globals.VTaxSelectedLanguage.emailTitle;

	$.lblUserType.text = Alloy.Globals.VTaxSelectedLanguage.userType;

	$.lblAdress.text = Alloy.Globals.VTaxSelectedLanguage.address;
	$.lblMobileNo.text = Alloy.Globals.VTaxSelectedLanguage.mobileNoNormal;
	$.lblTelNo.text = Alloy.Globals.VTaxSelectedLanguage.phoneNumber;
	$.lblFaxNo.text = Alloy.Globals.VTaxSelectedLanguage.faxNo;
	$.lblPOBox.text = Alloy.Globals.VTaxSelectedLanguage.POBox;
	$.lblSecQuestion.text = Alloy.Globals.VTaxSelectedLanguage.securityQuestion;

	// $.txtAddress.value = $.txtAddress.noteHintText = $.txtAddress._hintText = Alloy.Globals.VTaxSelectedLanguage.enterHintText;
	$.txtMobileNo.keyboardType = $.txtTelNo.keyboardType = $.txtFaxNo.keyboardType = Titanium.UI.KEYBOARD_PHONE_PAD;
	$.txtPOBox.keyboardType = Titanium.UI.KEYBOARD_NUMBER_PAD;
	$.txtEmail.keyboardType = Titanium.UI.KEYBOARD_EMAIL;
	$.lblUserSatisfaction.text = Alloy.Globals.VTaxSelectedLanguage.userSatisfaction;
	$.lblSuggestion.text = Alloy.Globals.VTaxSelectedLanguage.userSatisfactionSuggestion;
	$.lblFeedback.text = Alloy.Globals.VTaxSelectedLanguage.yes;
	$.lblSkip.text = Alloy.Globals.VTaxSelectedLanguage.skip;

	$.txtEmail.hintText = Alloy.Globals.VTaxSelectedLanguage.enterHintText + Alloy.Globals.VTaxSelectedLanguage.emailAddress;
	$.txtPassword.hintText = Alloy.Globals.VTaxSelectedLanguage.enterHintText + Alloy.Globals.VTaxSelectedLanguage.password;
	$.txtConfPassword.hintText = Alloy.Globals.VTaxSelectedLanguage.enterConfirmPasswordHint;
	$.txtName.hintText = Alloy.Globals.VTaxSelectedLanguage.enterNameHint;
	$.txtUserType.hintText = Alloy.Globals.VTaxSelectedLanguage.select + Alloy.Globals.VTaxSelectedLanguage.userType;
	$.txtMobileNo.hintText = $.txtTelNo.hintText = $.txtFaxNo.hintText = $.txtPOBox.hintText = "XXXXXXXXXX";
	//Alloy.Globals.VTaxSelectedLanguage.enterMobileNo;
	//Alloy.Globals.VTaxSelectedLanguage.selectUserType;
	$.txtSecQuestion.hintText = Alloy.Globals.VTaxSelectedLanguage.select + Alloy.Globals.VTaxSelectedLanguage.securityQuestion;

	if (Alloy.Globals.VATTAXisEnglish) {
		$.lblName.left = $.lblPassword.left = $.lblConfPassword.left = $.lblEmail.left = $.lblAdress.left = $.lblMobileNo.left = $.lblTelNo.left = $.lblFaxNo.left = $.lblPOBox.left = $.lblUserType.left = $.lblSecQuestion.left = 15;
		$.lblNameAstrik.left = $.lblPasswordAstrik.left = $.lblConfPasswordAstrik.left = $.lblEmailAstrik.left = $.lblUserTypeAstrik.left = $.lblAddressAstrik.left = $.lblMobileAstrik.left = $.lblPOBoxAstrik.left = $.lblSecQuestionAstrik.left = 8;

		$.nameColon.left = $.passwordColon.left = $.confirmPasswordColon.left = $.emailColon.left = $.addressColon.left = $.mobileNoColon.left = $.telNoColon.left = $.faxNoColon.left = $.POBoxColon.left = $.userTypeColon.left = $.SecQuestionColon.left = (Alloy.isTablet) ? 170 : 140;

		$.txtName.left = $.txtPassword.left = $.txtConfPassword.left = $.txtEmail.left = $.txtAddress.left = $.txtMobileNo.left = $.txtTelNo.left = $.txtFaxNo.left = $.txtPOBox.left = $.txtUserType.left = $.txtSecQuestion.left = (Alloy.isTablet) ? 190 : 150;
		$.txtName.right = $.txtPassword.right = $.txtConfPassword.right = $.txtEmail.right = $.txtAddress.right = $.txtMobileNo.right = $.txtTelNo.right = $.txtFaxNo.right = $.txtPOBox.right = $.imgUserType.right = $.imgSecQuestion.right = 10;
		$.txtUserType.right = 25;

		$.txtSecQuestion.right = (Alloy.isTablet) ? 36 : 31;

		$.lblMCountryCode.left = $.lblTCountryCode.left = $.lblFCountryCode.left = (Alloy.isTablet) ? 130 : 120;

		$.lblFeedback.left = $.lblSkip.right = 0;

		alignment = Titanium.UI.TEXT_ALIGNMENT_LEFT;
	} else {
		$.lblName.right = $.lblPassword.right = $.lblConfPassword.right = $.lblEmail.right = $.lblAdress.right = $.lblMobileNo.right = $.lblTelNo.right = $.lblFaxNo.right = $.lblPOBox.right = $.lblUserType.right = $.lblSecQuestion.right = 15;
		$.lblNameAstrik.right = $.lblPasswordAstrik.right = $.lblConfPasswordAstrik.right = $.lblEmailAstrik.right = $.lblUserTypeAstrik.right = $.lblAddressAstrik.right = $.lblMobileAstrik.right = $.lblPOBoxAstrik.right = $.lblSecQuestionAstrik.right = 8;

		$.nameColon.right = $.passwordColon.right = $.confirmPasswordColon.right = $.emailColon.right = $.addressColon.right = $.mobileNoColon.right = $.telNoColon.right = $.faxNoColon.right = $.POBoxColon.right = $.userTypeColon.right = $.SecQuestionColon.right = (Alloy.isTablet) ? 170 : 140;

		$.txtName.right = $.txtPassword.right = $.txtConfPassword.right = $.txtEmail.right = $.txtAddress.right = $.txtMobileNo.right = $.txtTelNo.right = $.txtFaxNo.right = $.txtPOBox.right = $.txtUserType.right = $.txtSecQuestion.right = (Alloy.isTablet) ? 190 : 150;
		$.txtName.left = $.txtPassword.left = $.txtConfPassword.left = $.txtEmail.left = $.txtAddress.left = $.txtMobileNo.left = $.txtTelNo.left = $.txtFaxNo.left = $.txtPOBox.left = $.imgUserType.left = $.imgSecQuestion.left = 10;
		$.txtUserType.left = 25;

		$.txtSecQuestion.left = (Alloy.isTablet) ? 36 : 31;

		$.lblMCountryCode.right = $.lblTCountryCode.right = $.lblFCountryCode.right = (Alloy.isTablet) ? 130 : 120;

		$.lblFeedback.right = $.lblSkip.left = 0;

		alignment = Titanium.UI.TEXT_ALIGNMENT_RIGHT;
	}

	$.lblName.textAlign = $.lblPassword.textAlign = $.lblConfPassword.textAlign = $.lblEmail.textAlign = $.lblAdress.textAlign = $.lblMobileNo.textAlign = $.lblTelNo.textAlign = $.lblFaxNo.textAlign = $.lblPOBox.textAlign = $.lblUserType.textAlign = $.lblSecQuestion.textAlign = alignment;
	$.txtName.textAlign = $.txtPassword.textAlign = $.txtConfPassword.textAlign = $.txtEmail.textAlign = $.txtAddress.textAlign = $.txtMobileNo.textAlign = $.txtTelNo.textAlign = $.txtFaxNo.textAlign = $.txtPOBox.textAlign = $.txtUserType.textAlign = $.txtSecQuestion.textAlign = alignment;

}

function secQuestionCallback() {
	$.txtSecQuestion.value = Alloy.Globals.VTaxSelectedLanguage.sQuestionSelected;
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
				isLoggedIn : Ti.App.Properties.getInt("isLoggedIn_VatTax")
			}).getView();
			Alloy.Globals.openWindow(winGeneralQuestion);
		});
	} else {
		var winGeneralQuestion = Alloy.createController("winGeneralQuestion", {
			arrQuestion : arrSecurityQue,
			arrAnswer : [],
			callBack : secQuestionCallback,
			isLoggedIn : Ti.App.Properties.getInt("isLoggedIn_VatTax")
		}).getView();
		Alloy.Globals.openWindow(winGeneralQuestion);
	}
}

var arrUserType = [{
	id : 1,
	title : "Individual",
	titleAr : "فرد",
}, {
	id : 2,
	title : "Corporate",
	titleAr : "شركة",
},{
	id : 3,
	title : "Government",
	titleAr : "جهة حكومية",
}];

function selectUserType(e) {
	if (Ti.App.Properties.getInt("isLoggedIn_VatTax") == true) {
		return;
	}
	openSelectionScreen(arrUserType, Alloy.Globals.VTaxSelectedLanguage.userType, $.txtUserType);
}

var setDropDownLabel = function(e) {
	e.label.value = e.labelTitle;
	e.label.custId = e.obj.id;
};
function openSelectionScreen(arr, title, txtField) {
	var payload = {
		data : arr,
		title : title,
		lbl : txtField,
		callBackFunction : setDropDownLabel
	};
	var winSelection = Alloy.createController("winSelection", payload).getView();
	winSelection.open();

}

var multilineTextBoxFocus = function(e) {
	//Ti.API.info("Focus");
	if (e.source.value == Alloy.Globals.VTaxSelectedLanguage.enterAddressHint) {
		e.source.value = "";
		e.source.color = (Alloy.Globals.currentTheme == "dark") ? "#FFF" : Alloy.Globals.path.borderColor;
	}
};
var multilineTextBoxBlur = function(e) {
	if (e.source.value == "") {
		e.source.value = Alloy.Globals.VTaxSelectedLanguage.enterAddressHint;
		e.source.color = colorCode;
	} else {
		e.source.color = (Alloy.Globals.currentTheme == "dark") ? "#FFF" : Alloy.Globals.path.borderColor;
	}
};

var animateLeftPanelToRight = Ti.UI.createAnimation({
	left : 0,
	curve : Ti.UI.ANIMATION_CURVE_EASE_OUT,
	//	transform : Ti.UI.create2DMatrix().scale(0.9, 0.80),
	duration : 300,
});

var animateLeftPanelToLeft = Ti.UI.createAnimation({
	left : -$.leftView.width,
	curve : Ti.UI.ANIMATION_CURVE_EASE_IN,
	//	transform : Ti.UI.create2DMatrix().scale(1.0, 1.0),
	duration : 300,
});

function showLeftPanel() {
	if (!isLeftPanelOpened) {

		if (OS_IOS) {
			$.leftView.animate(animateLeftPanelToRight);
		} else {
			//	var matrix = Ti.UI.create2DMatrix();
			//	matrix = matrix.scale(1.0, 1.0, 0.9, 0.8);
			var a = Ti.UI.createAnimation({
				left : $.leftView.width,
				//	transform : matrix,
				duration : 300,
			});
			$.homeView.animate(a);
		}
		$.closeView.visible = true;
		isLeftPanelOpened = true;

	} else {

		if (OS_IOS) {
			$.leftView.animate(animateLeftPanelToLeft);
		} else {
			//	var matrix = Ti.UI.create2DMatrix();
			//	matrix = matrix.scale(0.9, 0.8, 1.0, 1.0);
			var a = Ti.UI.createAnimation({
				left : 0,
				//	transform : matrix,
				duration : 300,
			});
			$.homeView.animate(a);
		}
		$.closeView.visible = false;
		isLeftPanelOpened = false;

	}
}

function validatePassword(password) {
	Ti.API.info('password>>>' + password);
	var re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,}$/;
	Ti.API.info('>>>>>>' + re.test(password));
	return !(re.test(password));

}

function isLetterAndDigit(str) {
	var result;
	result = str.match(/^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FF\u0020]*$/);
	Ti.API.log('Ar result ' + result);
	if (result != null) {
		return false;
	}
	return str.match(/[^a-zA-Z0-9 ]/g);
}

function isNumber(nolNo) {
	return !nolNo.match(/[^0-9]/g);
}

function isDigit(str) {
	var result;
	result = str.match(/^[\u0660-\u0669\u06F0-\u06F9]*$/);
	Ti.API.log('Ar result ' + result);
	if (result != null) {
		return true;
	}
	var regex = /^[0-9]+$/;
	return (regex.test(str));
}

function validateOptionalPhone(phone) {
	if (phone.length == 0)
		return true;
	var regex = /^[0-9]+$/;
	// return (regex.test(phone) && (phone.length == 12) && (phone.substring(0, 3) == "971"));
	return (regex.test(phone));
}

function validateData() {
	var alertTitle = "";
	if (Ti.App.Properties.getInt("isLoggedIn_VatTax") != true) {
		alertTitle = Alloy.Globals.VTaxSelectedLanguage.registration;
	} else {
		alertTitle = Alloy.Globals.VTaxSelectedLanguage.profile;
	}

	if (Ti.App.Properties.getInt("isLoggedIn_VatTax") != true) {
		/*if ($.txtName.value.trim() == "") {
		 Alloy.Globals.ShowAlert(alertTitle, Alloy.Globals.VTaxSelectedLanguage.enterName);
		 return false;
		 }*//* else if (isLetterAndDigit($.txtName.value.trim())) {
		 Alloy.Globals.ShowAlert(alertTitle, Alloy.Globals.VTaxSelectedLanguage.invalidName);
		 return false;
		 } */
		if ($.txtEmail.value.trim().length == 0) {
			Alloy.Globals.ShowAlert(alertTitle, Alloy.Globals.VTaxSelectedLanguage.enterEmail);
			return false;
		} else if (Alloy.Globals.validateEmail($.txtEmail.value) == false) {
			Alloy.Globals.ShowAlert(alertTitle, Alloy.Globals.VTaxSelectedLanguage.invalidEmail);
			return false;
		} else if ($.txtPassword.value.trim().length == 0) {
			Alloy.Globals.ShowAlert(alertTitle, Alloy.Globals.VTaxSelectedLanguage.enterPassword);
			return false;
		} else if (validatePassword($.txtPassword.value.trim())) {
			Alloy.Globals.ShowAlert(alertTitle, Alloy.Globals.VTaxSelectedLanguage.PasswordValidMsg);
			return false;
		} else if ($.txtConfPassword.value.trim().length == 0) {
			Alloy.Globals.ShowAlert(alertTitle, Alloy.Globals.VTaxSelectedLanguage.enterConfirmPassword);
			return false;
		} else if ($.txtConfPassword.value != $.txtPassword.value) {
			Alloy.Globals.ShowAlert(alertTitle, Alloy.Globals.VTaxSelectedLanguage.confirmPassMsg);
			return false;
		} else if ($.txtUserType.value.trim().length == 0) {
			Alloy.Globals.ShowAlert(alertTitle, Alloy.Globals.VTaxSelectedLanguage.invalidUserType);
			return false;
		}
	}

	if ($.txtAddress.value.trim().length == 0 || $.txtAddress.value == Alloy.Globals.VTaxSelectedLanguage.enterAddressHint) {
		Alloy.Globals.ShowAlert(alertTitle, Alloy.Globals.VTaxSelectedLanguage.enterAddress);
		return false;
	} else if ($.txtMobileNo.value.trim().length == 0) {
		Alloy.Globals.ShowAlert(alertTitle, Alloy.Globals.VTaxSelectedLanguage.enterMobile);
		return false;
	} else if ($.txtMobileNo.value.trim().length < 10) {
		Alloy.Globals.ShowAlert(alertTitle, Alloy.Globals.VTaxSelectedLanguage.invalidMobileNo);
		return false;
	} else if (!validatePhone($.txtMobileNo.value)) {
		Alloy.Globals.ShowAlert(alertTitle, Alloy.Globals.VTaxSelectedLanguage.invalidMobileNo);
		return false;
	} else if (($.txtTelNo.value.trim().length > 0 && $.txtTelNo.value.trim().length < 8) || !validatePhone($.txtTelNo.value)) {
		Alloy.Globals.ShowAlert(alertTitle, Alloy.Globals.VTaxSelectedLanguage.invalidPhoneNo);
		return false;
	} else if (($.txtFaxNo.value.trim().length > 0 && $.txtFaxNo.value.trim().length < 8 ) || !validatePhone($.txtFaxNo.value)) {
		Alloy.Globals.ShowAlert(alertTitle, Alloy.Globals.VTaxSelectedLanguage.invalidFaxNo);
		return false;
	} else if ($.txtPOBox.value.trim().length == 0) {
		Alloy.Globals.ShowAlert(alertTitle, Alloy.Globals.VTaxSelectedLanguage.enterPOBox);
		return false;
	} else if (!validatePhone($.txtPOBox.value.trim())) {
		Alloy.Globals.ShowAlert(alertTitle, Alloy.Globals.VTaxSelectedLanguage.invalidPOBox);
		return false;
	} else if (!($.txtPOBox.value.length >= 3 && $.txtPOBox.value.length <= 10)) {
		Alloy.Globals.ShowAlert(alertTitle, Alloy.Globals.VTaxSelectedLanguage.invalidPOBox);
		return false;
	} else if ($.txtSecQuestion.isSelected == false && !Ti.App.Properties.getInt("isLoggedIn_VatTax")) {
		Alloy.Globals.ShowAlert(alertTitle, Alloy.Globals.VTaxSelectedLanguage.invalidSecurityQuestion);
		return false;
	}
	return true;
}

var preTextField = undefined;
function closeKeyboard(e) {
	preTextField = e.source;
}

var alertDialog = Ti.UI.createAlertDialog({
	title : $.lblNavTitle.text,
	message : Alloy.Globals.VTaxSelectedLanguage.userCreatedSuccessMsg, //(Alloy.Globals.VATTAXisEnglish) ? e.description_EN : e.description_AR,
	buttonNames : [Alloy.Globals.VTaxSelectedLanguage.ok],
});

alertDialog.addEventListener('click', function(e) {
	// reset();
	// closeWindow();
	$.backView.show();
	$.popView.show();
});

var SaveVatTaxUser = function() {
	if (preTextField != undefined) {
		preTextField.blur();
	}

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
	_userType = $.txtUserType.custId;
	_UserAddress = $.txtAddress.value;
	_MobileNo = $.txtMobileNo.value;
	_PhoneNo = $.txtTelNo.value;
	_FaxNo = $.txtFaxNo.value;
	_POBox = $.txtPOBox.value;

	/*if (errorMessage.length > 0) {

	Alloy.Globals.ShowAlert($.lblNavTitle.text, Alloy.Globals.VTaxSelectedLanguage.plzEnterMissingFieldsMsg + "\n" + errorMessage);
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
		PhoneNo : ($.txtTelNo.value.trim().length == 0) ? _MobileNo : _PhoneNo,
		FaxNo : _FaxNo,
		POBox : _POBox,
		arrSecurityQue : arrSecurityQue
	};

	if (Ti.App.Properties.getInt("isLoggedIn_VatTax") == true) {
		httpManager.vatTaxUser_Update(user, function(e) {
			if (e != null) {
				Ti.API.info("==>Vat tax User Update Profile success ==>" + JSON.stringify(e));
				//Alloy.Globals.hideLoading();

				//Alloy.Globals.ShowAlert($.lblNavTitle.text, Alloy.Globals.VTaxSelectedLanguage.userUpdatedSuccessMsg);
				// $.backView.show();
				// $.popView.show();
				alertDialog.title = Alloy.Globals.VTaxSelectedLanguage.profile;
				alertDialog.message = Alloy.Globals.VTaxSelectedLanguage.userUpdatedSuccessMsg;
				alertDialog.show();
				setTokenData(e);
				// reset();
				// closeWindow();
			}
		});
	} else {
		httpManager.vatTaxUserRegister(user, function(e) {
			if (e != null) {
				Ti.API.info("==>Vat tax User create success ==>" + JSON.stringify(e));
				//Alloy.Globals.hideLoading();

				// Alloy.Globals.ShowAlert($.lblNavTitle.text, Alloy.Globals.VTaxSelectedLanguage.userCreatedSuccessMsg);
				alertDialog.title = Alloy.Globals.VTaxSelectedLanguage.registration;
				alertDialog.message = Alloy.Globals.VTaxSelectedLanguage.userCreatedSuccessMsg;
				alertDialog.show();
				// $.backView.show();
				// $.popView.show();
				// reset();
				// closeWindow();
			}

		});
	}

	// }

	$.btnRegister.touchEnabled = true;
};
function validatePhone(str) {
	/*//var regex=/^[0-9]+$/;
	 var regex = /^[0-9]+$/;
	 // return (regex.test(phone) && (phone.length == 12) && (phone.substring(0, 4) == "9715"));
	 return (regex.test(phone));*/

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
	$.txtUserType.value = "";
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

// $.btnSave.addEventListener("click",function(e){
// var winGeneralQuestion = Alloy.createController("winGeneralQuestion").getView();
// Alloy.Globals.openWindow(winGeneralQuestion);
// });

function gotoHome() {
	Alloy.Globals.gotoHome();
}


$.viewBottomToolbar.getView().addEventListener('click', function(e) {
	if (e.source.buttonId == 'btnFontChange') {
		$.viewBottomToolbar.changeFont($.winUserProfile);
	} else if (e.source.buttonId == 'btnSystemFeedback') {
		$.viewBottomToolbar.openFeedbackScreen(e);
	} else if (e.source.buttonId == 'btnSystemInstruction') {
		$.viewInstructions.openHelpScreen(e);
	} else if (e.source.buttonId == 'btnSystemChangeTheme') {
		$.viewBottomToolbar.changeTheme($.winUserProfile);
	}
});

$.winUserProfile.addEventListener("focus", function(e) {
	$.viewBottomToolbar.setDefaultTheme($.winUserProfile);
});
$.viewBottomToolbar.setDefaultTheme($.winUserProfile);

function windowOpened(e) {
	Alloy.Globals.arrWindows.push($.winUserProfile);
	if (OS_ANDROID) {
		$.txtEmail.focus();
	}
	$.viewBottomToolbar.setOptions({
		showThemeButton : true,
		showInstructions : false,
		showFeedBack : true,
		showFontResize : true
	});

};

function windowClosed(e) {
	Alloy.Globals.arrWindows.pop();
	$.destroy();
};

changeLanguage();
