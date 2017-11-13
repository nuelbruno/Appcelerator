var args = arguments[0] || {};
if (Alloy.Globals.isIOS7Plus) {
	$.statusBar.height = 20;
	//$.statusBar.backgroundColor = Alloy.Globals.path.bgColor;
}
var selectedCountry=null,selectedUserType=null;

function closeWindow() {
	Alloy.Globals.closeWindow($.winUserRegistration);
}
function setSelectedUserType(e){
	$.lblUserType.text = e.obj.title;
	selectedUserType= e.obj;
}
function showUserTypes() {
	var arr = [{
		title : "abc",
		titleAr : "Abc"
	}, {
		title : "my",
		titleAr : "my"
	}, {
		title : "xyz",
		titleAr : "xyz"
	}];
	Alloy.createController("winSelection", {
		data : arr,
		title : Alloy.Globals.selectedLanguage.selectUserType,
		callBackFunction : setSelectedUserType
	}).getView().open();
}

function setSelectedCountry(e) {
	selectedCountry = e.obj;
	$.lblCountry.text = e.obj.title;
}

function showCoutry() {
	var arr = [{
		title : "India",
		titleAr : "India"
	}, {
		title : "UAE",
		titleAr : "UAE"
	}, {
		title : "US",
		titleAr : "US"
	}];
	Alloy.createController("winSelection", {
		data : arr,
		title : Alloy.Globals.selectedLanguage.selectCountry,
		callBackFunction : setSelectedCountry
	}).getView().open();
}
function validatePhone(phone) {
	//var regex=/^[0-9]+$/;
	var regex = /^[0-9]+$/;
	return (regex.test(phone) && (phone.length == 12) && (phone.substring(0, 4) == "9715"));
}

function doUserRegistation(){
	if($.txtUserName.value.trim().length == 0){
		Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.register,Alloy.Globals.selectedLanguage.enterUserName);
		return;
	}else if($.txtName.value.trim().length == 0){
		Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.register,Alloy.Globals.selectedLanguage.enterNameHint);
		return;
	}else if($.txtEmail.value.trim().length == 0){
		Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.register,Alloy.Globals.selectedLanguage.enterEmail);
		return;
	}else if(Alloy.Globals.validateEmail($.txtEmail.value) == false){
		Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.register,Alloy.Globals.selectedLanguage.enterValidEmailMsg);
		return;
	}else if($.txtMobile.value.trim().length == 0){
		Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.register,Alloy.Globals.selectedLanguage.enterMobileNo);
		return;
	}else if(!validatePhone($.txtMobile.value)){
		Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.register,Alloy.Globals.selectedLanguage.enterValidMobile);
		return;
	}else if($.txtPassword.value.trim().length ==0){
		Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.register,Alloy.Globals.selectedLanguage.enterPasswordHint);
		return;
	}else if(selectedUserType == null){
		Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.register,Alloy.Globals.selectedLanguage.selectUserType);
		return;
	}else if(selectedCountry == null){
		Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.register,Alloy.Globals.selectedLanguage.selectCountry);
		return;
	}
}

function changeLanguage() {
	$.lblNavTitle.text = Alloy.Globals.selectedLanguage.register;
	$.lblNewUserReg.text = Alloy.Globals.selectedLanguage.newUserRegister;
	$.lblInfo.text = Alloy.Globals.selectedLanguage.loginDescription;
	$.lblUserName.text = Alloy.Globals.selectedLanguage.userName + ":";
	$.lblName.text = Alloy.Globals.selectedLanguage.nameTitle + ":";
	$.lblEmail.text = Alloy.Globals.selectedLanguage.emailTitle + ":";
	$.lblMobile.text = Alloy.Globals.selectedLanguage.mobileNo + ":";
	$.lblPassword.text = Alloy.Globals.selectedLanguage.password + ":";
	$.lblUserType.text = Alloy.Globals.selectedLanguage.selectUserType;
	$.lblCountry.text = Alloy.Globals.selectedLanguage.selectCountry;
	$.btnRegister.title = Alloy.Globals.selectedLanguage.register;
	var alignment;
	if (Alloy.Globals.isEnglish) {
		alignment = Ti.UI.TEXT_ALIGNMENT_LEFT;
		$.lblUserName.left = $.lblName.left = $.lblEmail.left = $.lblMobile.left = $.lblPassword.left = 10;
		$.lblUserType.left = $.lblCountry.left = $.imgdownArrow.right = $.imgdownArrow2.right = 10;
		$.lblUserType.right = $.lblCountry.right = (Alloy.isTablet) ? 40 : 33;
		$.txtUserName.left = $.txtName.left = $.txtEmail.left = $.txtMobile.left = $.txtPassword.left = (Alloy.isTablet) ? 200 : 150;
		$.txtUserName.right = $.txtName.right = $.txtEmail.right = $.txtMobile.right = $.txtPassword.right = 10;

	} else {
		$.lblUserName.right = $.lblName.right = $.lblEmail.right = $.lblMobile.right = $.lblPassword.right = 10;
		$.lblUserType.right = $.lblCountry.right = $.imgdownArrow.left = $.imgdownArrow2.left = 10;
		$.lblUserType.left = $.lblCountry.left = (Alloy.isTablet) ? 40 : 33;
		$.txtUserName.right = $.txtName.right = $.txtEmail.right = $.txtMobile.right = $.txtPassword.right = (Alloy.isTablet) ? 200 : 150;
		$.txtUserName.left = $.txtName.left = $.txtEmail.left = $.txtMobile.left = $.txtPassword.left = 10;
		alignment = Ti.UI.TEXT_ALIGNMENT_RIGHT;
	}
	$.lblNewUserReg.textAlign = $.lblInfo.textAlign = $.lblUserName.textAlign = $.lblName.textAlign = $.lblEmail.textAlign = alignment;
	$.lblMobile.textAlign = $.lblPassword.textAlign = $.lblUserType.textAlign = $.lblCountry.textAlign = alignment;
	$.txtUserName.textAlign = $.txtName.textAlign = $.txtEmail.textAlign = $.txtMobile.textAlign = $.txtPassword.textAlign = alignment;
}

changeLanguage();
