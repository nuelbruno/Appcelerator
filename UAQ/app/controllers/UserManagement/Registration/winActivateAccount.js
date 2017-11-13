
var httpManager = require("httpManager");
var utilities = require("utilities");

var args = arguments[0] || {};
var title = arguments[0].title;
var arrData = arguments[0].data;

var preLang = null;
function changeLanguage() {
	if (preLang == Alloy.Globals.language) {
		return;
	}
	preLang = Alloy.Globals.language;
	//alert(title); //ßalert(Alloy.Globals.selectedLanguage.CompleteRegProcess);

	Ti.API.info("ativation from front end data got :" + JSON.stringify(arrData));

	$.lblNavTitle.text = Alloy.Globals.selectedLanguage.activateAccount;

	$.splitAccountDetails.text = Alloy.Globals.selectedLanguage.accountDetailsSplit;
	
	$.passwordField.passwordMask = $.confirmPasswordField.passwordMask = true;

	if (title == "INDIVIDUAL") {
		$.fullnametLabel.text = Alloy.Globals.selectedLanguage.fullNameActivation;
		$.countryOfCitizenshipLBL.text = Alloy.Globals.selectedLanguage.nationality;
		$.cntryResidency.text = Alloy.Globals.selectedLanguage.countryResidence;
		$.mobileNum1Lbl.text = Alloy.Globals.selectedLanguage.mobileNum;
		$.mobileNum2Lbl.text = Alloy.Globals.selectedLanguage.mobileNum2;
		$.landLineNum.text = Alloy.Globals.selectedLanguage.landlineNum;
		$.emailaddressLabel.text = Alloy.Globals.selectedLanguage.mail;
        $.accountDetailsIndividualView.width = undefined;
		$.accountDetailsIndividualView.height = Titanium.UI.SIZE;
		$.establishAccountDetailsView.width = 0;
		$.establishAccountDetailsView.height = 0;
	} else {

		$.establishName.text = Alloy.Globals.selectedLanguage.establishNameLbl;
		$.tradeLicenceLabel.text = Alloy.Globals.selectedLanguage.tradeLicenceLbl;
		$.tradeLicenseExpiryDate.text = Alloy.Globals.selectedLanguage.tradeLicenExpiryDate;
		$.mobileNumLabel.text = Alloy.Globals.selectedLanguage.mobilenumberHinttxt;
		$.officePhoneLabel.text = Alloy.Globals.selectedLanguage.officePhoneLabel;
		$.emailAddressLabelEst.text = Alloy.Globals.selectedLanguage.mail;
		$.addressLabel.text = Alloy.Globals.selectedLanguage.addressLabelen;
		$.websiteLabel.text = Alloy.Globals.selectedLanguage.websiteLabelEn;
		$.emiratesChooseLBL.text = Alloy.Globals.selectedLanguage.chooseEmirates;
		$.postBoxLabel.text = Alloy.Globals.selectedLanguage.postBoxLabel;
		$.accountDetailsIndividualView.width = 0;
		$.accountDetailsIndividualView.height = 0;
		$.establishAccountDetailsView.width = undefined;
		$.establishAccountDetailsView.height = Titanium.UI.SIZE;
	}
	$.splitCredentails.text = Alloy.Globals.selectedLanguage.credentialsSplit;
	$.usernameLabel.text = Alloy.Globals.selectedLanguage.userName;
	$.passwordLabel.text = Alloy.Globals.selectedLanguage.password;
	$.confirPasswordLabel.text = Alloy.Globals.selectedLanguage.confirmPassword;

	if (Alloy.Globals.isEnglish) {

		alignment = Titanium.UI.TEXT_ALIGNMENT_LEFT;
	} else {

		alignment = Titanium.UI.TEXT_ALIGNMENT_RIGHT;
	}

	loadDataToActivationForm();
}

function showPasswordHint(e) {
	utilities.popupHint();
}

function loadDataToActivationForm() {

	var resData = arrData.account_details;

	var typeOfUser = resData.typeOfUser;
	if (title == "INDIVIDUAL") {
		$.fullnameTxtFld.value = resData.firstName;
		$.cntryCitizenShipField.value = resData.countryidofcitizenship;
		$.cntryResidenceField.value = resData.countryidofresidency;
		$.mobilenum1Field.value = resData.mobileNo;
		$.mobilenum2Field.value = resData.mobileno2;
		$.landLineNumField.value = resData.homePhone;
		// TO DO mising in web service
		$.emailAddressField.value = resData.emailAddress;
	} else {
		$.establishNameField.value = resData.firstName;
		$.tradeLicenceField.value = resData.tradeLienceNo;
		$.tradeLicenceExpField.value = resData.tradeLienceExpiry;
		$.mobileNumFieldEst.value = resData.mobileNo;
		$.officePhoneField.value = resData.homePhone;
		// TO DO mising in web service
		$.emailAddressFieldEst.value = resData.emailAddress;
		$.addressField.value = resData.addressline1;
		$.websiteField.value = resData.website;
		$.textfieldEmirates.value = resData.emiratesName;
		$.postBoxField.value = resData.postbox;
	}

}

$.userNameField.addEventListener('blur', function(e) {
	username();
});

$.passwordField.addEventListener('blur', function(e) {	
   passwordvalidate();
});

function username(){
	if ($.userNameField.value.length == 0) {
		return;
	}
	var exp = /^[a-z0-9_ .-]*$/i;
	if (exp.test($.userNameField.value)) {
	} else {

		utilities.showAlert(Alloy.Globals.selectedLanguage.registration, Alloy.Globals.selectedLanguage.userNameValid);
		// TO do
		$.userNameField.value = "";
		return false;
		//$.textfieldUserName.focus();
	}
	var patt1 = /\s/g;
	if (patt1.test($.userNameField.value)) {
		utilities.showAlert(Alloy.Globals.selectedLanguage.registration, Alloy.Globals.selectedLanguage.userNameValid);
		// TO do
		$.userNameField.value = "";
		return false;
		//$.textfieldUserName.focus();
	}
}
function passwordvalidate(){
	if ($.passwordField.value.length == 0) {
		$.passwordField.value = "";
		$.passwordStrength.text = "";
		return;
	}
	try {
		if ($.passwordField.value.length >= 8 && $.passwordField.value.length <= 15) {
	    	var expNumbers = /[0-9]/g;
	    	var expcharacter = /[a-z]/g;
	    	var expcharacterCap = /[A-Z]/g;
	    	var expSpecailChar = /[!@#\$%\^\&*\)\(+=._-]/g;
	    		
	    	var score   = 0;
	    	var passwordContent = 0;
    	
	    	if((expNumbers.test($.passwordField.value))){	
	    		 score++;
	    	}
	    	if((expcharacter.test($.passwordField.value))){	
	    		 score++;
	    	}
	    	if((expcharacterCap.test($.passwordField.value))){	
	    		 score++;
	    	}
	    	if((expSpecailChar.test($.passwordField.value))){	
	    		 score++;
	    		 passwordContent = 1;
	    	}
	    	
	    	Ti.API.info('password strength'+ score);
	    	switch(score) {
				case 1:
					$.passwordStrength.text = Alloy.Globals.selectedLanguage.weakTxt;
	                $.passwordStrength.color = Alloy.Globals.path.redColor;
					break;
				case 2:
					$.passwordStrength.text = Alloy.Globals.selectedLanguage.mediumTxt;
	    		    $.passwordStrength.color = Alloy.Globals.path.yellowPsw;
					break;
				case 3:
					$.passwordStrength.text = Alloy.Globals.selectedLanguage.mediumTxt;
	    		    $.passwordStrength.color = Alloy.Globals.path.yellowPsw;
					break;
				case 4:
					$.passwordStrength.text = Alloy.Globals.selectedLanguage.strongTxt;
	    		    $.passwordStrength.color = Alloy.Globals.path.greenColor;
					break;		
			}
			
			if(passwordContent == 0){
			  
			  utilities.showAlert(Alloy.Globals.selectedLanguage.registration, Alloy.Globals.selectedLanguage.passwordValidate3);
		      $.passwordField.value = "";
			  $.passwordStrength.text = "";
		    }
	    		
	    	
	    }
	     else if ($.passwordField.value.length < 8) {
			utilities.showAlert(Alloy.Globals.selectedLanguage.registration, Alloy.Globals.selectedLanguage.passwordValidate2);
			// TO do
			$.passwordField.value = "";
			$.passwordStrength.text = "";
			//$.textfieldPassword.focus();
		}
	} catch(ex) {
		$.passwordStrength.text = Alloy.Globals.selectedLanguage.weakTxt;
	}

	/*if ($.passwordField.value.length >= 8 && $.passwordField.value.length < 10) {
		$.passwordStrength.text = Alloy.Globals.selectedLanguage.weakTxt;
		var exp = /^[a-zA-Z0-9]+$/;
		if (exp.test($.passwordField.value)) {

		} else {
			$.passwordField.value = "";
			$.passwordStrength.text = "";
			//$.textfieldPassword.focus();
			utilities.showAlert(Alloy.Globals.selectedLanguage.registration, Alloy.Globals.selectedLanguage.passwordValidate);
			return false;
			// TO do
		}

	} else if ($.passwordField.value.length > 10 && $.passwordField.value.length <= 15) {
		   $.passwordStrength.text = Alloy.Globals.selectedLanguage.strongTxt;
	} else if ($.passwordField.value.length < 8) {
		utilities.showAlert(Alloy.Globals.selectedLanguage.registration, Alloy.Globals.selectedLanguage.passwordValidate2);
		// TO do
		$.passwordField.value = "";
		return false;
		//$.textfieldPassword.focus();           
	}*/
}
function addKeyDoneLand1(){
	var flexSpace = Titanium.UI.createButton({
    	systemButton : Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
	});
	
	var btnDone = Titanium.UI.createButton({    
	    title : Alloy.Globals.selectedLanguage.doneTitle,
	    width : 67,
	    height : 32
	});
	
	btnDone.addEventListener('click',function(e){
	    $.mobilenum1Field.blur();
	});
	
	
	$.mobilenum1Field.keyboardToolbar = [flexSpace, flexSpace,flexSpace, btnDone];
}
Ti.Platform.name == 'android' ? '' : addKeyDoneLand1();
function addKeyDoneLand2(){
	var flexSpace = Titanium.UI.createButton({
    	systemButton : Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
	});
	
	var btnDone = Titanium.UI.createButton({    
	    title : Alloy.Globals.selectedLanguage.doneTitle,
	    width : 67,
	    height : 32
	});
	
	btnDone.addEventListener('click',function(e){
	    $.mobileNumFieldEst.blur();
	});
	
	
	$.mobileNumFieldEst.keyboardToolbar = [flexSpace, flexSpace,flexSpace, btnDone];
}
Ti.Platform.name == 'android' ? '' : addKeyDoneLand2();

$.mobilenum1Field.addEventListener('focus', function(e) {
	$.mobilenum1Field.value = e.source.value.replace(/[-]/gi, "");
	$.mobilenum1Field.maxLength = 10;
	
});	
$.mobilenum1Field.addEventListener('blur', function(e) {

	if (e.source.value.length == 0) {
		return;
	}
	$.mobilenum1Field.maxLength = 11;
	var f_val = e.source.value.replace(/[^0-9]/g, "");
	e.source.value = (f_val.length == 0) ? f_val : f_val.slice(0, 3) + "-" + f_val.slice(3, 10);

});
$.mobileNumFieldEst.addEventListener('focus', function(e) {
	$.mobileNumFieldEst.value = e.source.value.replace(/[-]/gi, "");
	$.mobileNumFieldEst.maxLength = 10;
	
});	
$.mobileNumFieldEst.addEventListener('blur', function(e) {
     if (e.source.value.length == 0) {
		return;
	}
	$.mobileNumFieldEst.maxLength = 11;
	var f_val = e.source.value.replace(/[^0-9]/g, "");
	e.source.value = (f_val.length == 0) ? f_val : f_val.slice(0, 3) + "-" + f_val.slice(3, 10);
});

function onSubmitActivationForm() {
	
	if (title == "INDIVIDUAL") {
		if ($.mobilenum1Field.value.trim().length == 0) {
			utilities.showAlert(Alloy.Globals.selectedLanguage.registration, Alloy.Globals.selectedLanguage.plzMobileNumber);
			return false;
		}
		var textMobileNum = $.mobilenum1Field.value.replace(/[-]/gi, "");
		if (textMobileNum.trim().length != 10) {
			utilities.showAlert(Alloy.Globals.selectedLanguage.registration, Alloy.Globals.selectedLanguage.enterValidMobile);
			//$.mobilenum1Field.value = "";
			return false;
		}
		if (utilities.isValidEmail($.emailAddressField.value) == false) {
		utilities.showAlert(Alloy.Globals.selectedLanguage.registration, Alloy.Globals.selectedLanguage.enterValidEmail);
		return false;
	    }
	}else {
		if ($.mobileNumFieldEst.value.trim().length == 0) {
			utilities.showAlert(Alloy.Globals.selectedLanguage.registration, Alloy.Globals.selectedLanguage.plzMobileNumber);
			return false;
		}
		var textMobileNum = $.mobileNumFieldEst.value.replace(/[-]/gi, "");
		if (textMobileNum.trim().length != 10) {
			utilities.showAlert(Alloy.Globals.selectedLanguage.registration, Alloy.Globals.selectedLanguage.enterValidMobile);
			//$.mobileNumFieldEst.value = "";
			return false;
		}
		if (utilities.isValidEmail($.emailAddressFieldEst.value) == false) {
		utilities.showAlert(Alloy.Globals.selectedLanguage.registration, Alloy.Globals.selectedLanguage.enterValidEmail);
		return false;
		}
	}

	if ($.userNameField.value.length == 0) {
		utilities.showAlert(Alloy.Globals.selectedLanguage.registration, Alloy.Globals.selectedLanguage.plzUserName);
		return false;
	}
	if ($.passwordField.value.length == 0) {
		utilities.showAlert(Alloy.Globals.selectedLanguage.registration, Alloy.Globals.selectedLanguage.plzPassword);
		return false;
	}
	if ($.passwordField.value != $.confirmPasswordField.value) {
		utilities.showAlert(Alloy.Globals.selectedLanguage.registration, Alloy.Globals.selectedLanguage.passwordMisMatch);
		return false;
	}
	
	username();
	passwordvalidate();

	var resData = arrData.account_details;
	var typeOfUser = resData.typeOfUser;
	var obj = [];
	
    var accountIdGet = "";

	if (title == "INDIVIDUAL") {
		var obj = {
			accountID : arrData.user_Details.accountId,
			userType : typeOfUser,
			loginusername : $.userNameField.value.trim(),
			password : $.passwordField.value.trim(),
			mobileno :$.mobilenum1Field.value.replace(/[-]/gi, ""),
			email : $.emailAddressField.value.trim(),
		};
		accountIdGet = arrData.user_Details.accountId;
	} else {
		var obj = {
			accountID : arrData.user_Details.accountId,
			userType : typeOfUser,
			loginusername : $.userNameField.value.trim(),
			password : $.passwordField.value.trim(),
			mobileno : $.mobileNumFieldEst.value.replace(/[-]/gi, ""),
			postbox : resData.postbox,
			email : $.emailAddressFieldEst.value.trim(),
		};
		accountIdGet = arrData.user_Details.accountId;
	}

	httpManager.activateAccountFrontEnd(obj, function(responce) {
		if (responce != null) {
			Ti.API.info('>>>>>>>' + JSON.stringify(responce));
			
			//callGenerateOTPfrontend(responce);
			try {
				var regiSucess = Ti.UI.createAlertDialog({
					title : Alloy.Globals.selectedLanguage.appTitle,
					message : responce.messageTo,
					cancel : 0,
					buttonNames : [Alloy.Globals.selectedLanguage.ok]
				});
				regiSucess.addEventListener('click', function(e) {
					closeWindow();
					Alloy.Globals.openWindow(Alloy.createController('UserManagement/Registration/winSubmitOTP', {title:"OTP", walking :"true", accountIdw : accountIdGet }).getView());
				});
				regiSucess.show();
			} catch(e) {
				var regiSucess = Ti.UI.createAlertDialog({
					title : Alloy.Globals.selectedLanguage.appTitle,
					message : "",
					cancel : 0,
					buttonNames : [Alloy.Globals.selectedLanguage.ok]
				});
				regiSucess.addEventListener('click', function(e) {
					closeWindow();
					Alloy.Globals.openWindow(Alloy.createController('UserManagement/Registration/winSubmitOTP', {title:"OTP",  walking :"true", accountIdw : accountIdGet}).getView());
				});
				regiSucess.show();
			}
			//
		}
	});

}

function callGenerateOTPfrontend(responce){
	
	httpManager.generateOTPresendFRONT(responce, function(responce) {
		if (responce != null) {
			Ti.API.info('>>>>>>>' + JSON.stringify(responce));
			closeWindow();
		}
	});
}

function winOpen() {
	Alloy.Globals.arrWindows.push($.winActivateAccount);

}

function closeWindow() {
	Alloy.Globals.arrWindows.pop($.winActivateAccount);
	$.winActivateAccount.close();
}
$.winActivateAccount.addEventListener('android:back', function(e) {
	closeWindow();
});

changeLanguage(); 