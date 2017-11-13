var args = arguments[0] || {};
var isTablet = Alloy.isTablet;
var colorCode;
var httpManager = require("httpManager");
//Alloy.createController('common/httpManager');
if (OS_IOS) {
	colorCode = Alloy.Globals.path.lblGrayColor;
} else {
	colorCode = "#888888";
}

if (Alloy.Globals.isIOS7Plus) {
	$.statusBar.height = 20;
}

function closeWindow() {
	Alloy.Globals.closeWindow($.winCustomerInqReq);
}

function clearText() {
	if ($.txtComments.value == Alloy.Globals.selectedLanguage.enterComments) {
		$.txtComments.value = "";
		$.txtComments.color = Alloy.Globals.path.borderColor;
	}
}

function putHintText() {
	if ($.txtComments.value.trim().length == 0) {
		$.txtComments.color = colorCode;
		$.txtComments.value = Alloy.Globals.selectedLanguage.enterComments;
	}
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

function sendFeedback() {
	if ($.txtName.value.trim().length == 0) {
		Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.customerInquiry, Alloy.Globals.selectedLanguage.enterNameHint);
		return;
	} else if ($.txtEmail.value.trim().length == 0) {
		Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.customerInquiry, Alloy.Globals.selectedLanguage.enterEmail);
		return;
	} else if (Alloy.Globals.validateEmail($.txtEmail.value) == false) {
		Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.customerInquiry, Alloy.Globals.selectedLanguage.enterValidEmailMsg);
		return;
	} else if ($.txtMobile.value.trim().length == 0) {
		Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.customerInquiry, Alloy.Globals.selectedLanguage.enterPhoneNumber);
		return;
	} else if ($.txtMobile.value.trim().length < 10) {
		Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.customerInquiry, Alloy.Globals.selectedLanguage.invalidTelNo);
		return false;
	} else if (!validatePhone($.txtMobile.value)) {
		Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.customerInquiry, Alloy.Globals.selectedLanguage.invalidTelNo);
		return;
	} else if ($.txtSubject.value.trim().length == 0) {
		Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.customerInquiry, Alloy.Globals.selectedLanguage.enterSubjectHint);
		return;
	} else if ($.txtComments.value.trim().length == 0 || $.txtComments.value == Alloy.Globals.selectedLanguage.enterComments) {
		Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.customerInquiry, Alloy.Globals.selectedLanguage.enterComments);
		return;
	}
	httpManager.createCustomerInquiryRequest($.txtSubject.value.trim(), $.txtComments.value.trim(), $.txtName.value.trim(), $.txtEmail.value.trim(), $.txtMobile.value.trim(), function(data) {
		if (data != null) {
			if (data.status == "Success") {
				var alertDg = Ti.UI.createAlertDialog({
					title : Alloy.Globals.selectedLanguage.customerInquiry,
					message : (Alloy.Globals.isEnglish) ? data.description_En : data.description_Ar,
					buttonNames : [Alloy.Globals.selectedLanguage.ok],
				});
				alertDg.addEventListener('click', function(e) {
					closeWindow();
				});
				alertDg.show();
			} else {
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.createRequest, (Alloy.Globals.isEnglish) ? data.description_En : data.description_Ar);
			}
		}
	});
}

function openGovUrl() {
	Ti.Platform.openURL("http://mygov.ae/mygov/index.aspx");
}

function changeLanguage() {
	$.lblNavTitle.text = Alloy.Globals.selectedLanguage.customerInquiry;
	$.lblName.text = Alloy.Globals.selectedLanguage.nameTitle;
	$.lblEmail.text = Alloy.Globals.selectedLanguage.emailTitle;
	$.lblMobile.text = Alloy.Globals.selectedLanguage.phoneNumber;
	$.lblSubject.text = Alloy.Globals.selectedLanguage.subjectTitle;
	$.lblcomments.text = Alloy.Globals.selectedLanguage.comments;
	$.txtComments.value = Alloy.Globals.selectedLanguage.enterComments;
	$.txtComments.color = colorCode;
	$.btnSend.title = Alloy.Globals.selectedLanguage.send;
	$.lblContactGov.text = Alloy.Globals.selectedLanguage.contactGov;
	$.txtName.hintText = Alloy.Globals.selectedLanguage.enterNameHint;
	$.txtEmail.hintText = Alloy.Globals.selectedLanguage.enterHintText + Alloy.Globals.selectedLanguage.emailAddress;
	$.txtMobile.hintText = "XXXXXXXXXX";
	$.txtSubject.hintText = Alloy.Globals.selectedLanguage.enterHintText + Alloy.Globals.selectedLanguage.subjectTitle;
	var alignment;
	if (Alloy.Globals.isEnglish) {
		alignment = Ti.UI.TEXT_ALIGNMENT_LEFT;
		$.lblNameAstrik.left = $.lblEmailAstrik.left = $.lblMobileAstrik.left = $.lblSubjectAstrik.left = $.lblcommentsAstrik.left = 8;
		$.lblName.left = $.lblEmail.left = $.lblMobile.left = $.lblSubject.left = $.lblcomments.left = 17;
		$.txtName.left = $.txtEmail.left = $.txtMobile.left = $.txtSubject.left = (Alloy.isTablet) ? 200 : 140;
		$.txtComments.left = (Alloy.isTablet) ? 195 : 135;
		$.txtName.right = $.txtEmail.right = $.txtMobile.right = $.txtSubject.right = $.txtComments.right = 10;
	} else {
		$.lblNameAstrik.right = $.lblEmailAstrik.right = $.lblMobileAstrik.right = $.lblSubjectAstrik.right = $.lblcommentsAstrik.right = 8;
		$.lblName.right = $.lblEmail.right = $.lblMobile.right = $.lblSubject.right = $.lblcomments.right = 15;
		$.txtName.right = $.txtEmail.right = $.txtMobile.right = $.txtSubject.right = (Alloy.isTablet) ? 200 : 140;
		$.txtComments.right = (Alloy.isTablet) ? 195 : 135;
		$.txtName.left = $.txtEmail.left = $.txtMobile.left = $.txtSubject.left = $.txtComments.left = 10;
		alignment = Ti.UI.TEXT_ALIGNMENT_RIGHT;
	}
	$.lblName.textAlign = $.lblEmail.textAlign = $.lblMobile.textAlign = $.lblSubject.textAlign = $.lblcomments.textAlign = alignment;
	$.txtName.textAlign = $.txtEmail.textAlign = $.txtMobile.textAlign = $.txtSubject.textAlign = $.txtComments.textAlign = alignment;
}

$.winCustomerInqReq.addEventListener("focus", function(e) {
	$.viewBottomToolbar.setDefaultTheme($.winCustomerInqReq);
});
$.viewBottomToolbar.setDefaultTheme($.winCustomerInqReq);

/**
 * Adding the eventlistener for the bottom bar view
 *
 * @param {Object} e
 */
$.viewBottomToolbar.getView().addEventListener('click', function(e) {
	if (e.source.buttonId == 'btnFontChange') {
		$.viewBottomToolbar.changeFont($.winCustomerInqReq);
	} else if (e.source.buttonId == 'btnSystemFeedback') {
		$.viewBottomToolbar.openFeedbackScreen(e);
	} else/*if(e.source.buttonId == 'btnSystemInstruction'){
	 $.viewInstructions.openHelpScreen(e);
	 }*/
	if (e.source.buttonId == 'btnSystemChangeTheme') {
		$.viewBottomToolbar.changeTheme($.winCustomerInqReq);
	}
});

var windowOpened = function(e) {
	$.viewBottomToolbar.setOptions({
		showThemeButton : true,
		showInstructions : false,
		showFeedBack : false,
		showFontResize : true
	});
};

var windowClosed = function(e) {
	$.destroy();
};

changeLanguage();
