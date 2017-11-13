Alloy.Globals.SetModelWindow($.winUserFeedback);

var isEnglish = (Alloy.Globals.isVATTAXModuleActive) ? Alloy.Globals.VATTAXisEnglish : Alloy.Globals.isEnglish;
var selectedLanguage = (Alloy.Globals.isVATTAXModuleActive) ? Alloy.Globals.VTaxSelectedLanguage :  Alloy.Globals.selectedLanguage;

var args = arguments[0] || {};
var isTablet = Alloy.isTablet;
var colorCode,
    selectedReqType = null,
    isSubmitClicked = false;
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
	Alloy.Globals.closeWindow($.winUserFeedback);
}

function clearText() {
	if ($.txtComments.value == selectedLanguage.enterComments) {
		$.txtComments.value = "";
		$.txtComments.color = (Alloy.Globals.currentTheme == "dark") ? "#FFF" : Alloy.Globals.path.borderColor;
	}
}

function putHintText() {
	if ($.txtComments.value.trim().length == 0) {
		$.txtComments.color = colorCode;
		$.txtComments.value = selectedLanguage.enterComments;
	} else {
		$.txtComments.color = (Alloy.Globals.currentTheme == "dark") ? "#FFF" : Alloy.Globals.path.borderColor;
	}
}

function setSelectedRequestType(e) {
	$.lblrequestType.text = (isEnglish) ? e.obj.title : e.obj.titleAr;
	selectedReqType = e.obj;
}

var arrRequestType = [];
function showRequestTypes() {
	if (arrRequestType.length == 0) {
		httpManager.getUserFeedbackRequestType(function(data) {
			if (data != null) {
				Ti.API.info('>>>>>>>' + JSON.stringify(data));
				if (data.status == "Success") {
					arrRequestType = data.arrRequestList;
					Alloy.createController("winSelection", {
						data : data.arrRequestList,
						title : selectedLanguage.selectFeedbacktype,
						callBackFunction : setSelectedRequestType
					}).getView().open();
				} else {
					Alloy.Globals.ShowAlert(selectedLanguage.createRequest, (isEnglish) ? data.description_En : data.description_Ar);
				}
			}
		});
	} else {
		Alloy.createController("winSelection", {
			data : arrRequestType,
			title : selectedLanguage.selectFeedbacktype,
			callBackFunction : setSelectedRequestType
		}).getView().open();
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
	if (selectedReqType == null) {
		Alloy.Globals.ShowAlert(selectedLanguage.userFeedback, selectedLanguage.plsSelectRequestType);
		return;
	} else if ($.txtName.value.trim().length == 0) {
		Alloy.Globals.ShowAlert(selectedLanguage.userFeedback, selectedLanguage.enterTaxName);
		return;
	} else if ($.txtEmail.value.trim().length == 0) {
		Alloy.Globals.ShowAlert(selectedLanguage.userFeedback, selectedLanguage.enterEmail);
		return;
	} else if (Alloy.Globals.validateEmail($.txtEmail.value) == false) {
		Alloy.Globals.ShowAlert(selectedLanguage.userFeedback, selectedLanguage.invalidEmail);
		return;
	} else if ($.txtMobile.value.trim().length == 0) {
		Alloy.Globals.ShowAlert(selectedLanguage.userFeedback, selectedLanguage.enterPhoneNumber);
		return;
	} else if ($.txtMobile.value.trim().length < 8) {
		Alloy.Globals.ShowAlert(selectedLanguage.userFeedback, selectedLanguage.invalidTelNo);
		return false;
	} else if (!validatePhone($.txtMobile.value)) {
		Alloy.Globals.ShowAlert(selectedLanguage.userFeedback, selectedLanguage.invalidTelNo);
		return;
	} else if ($.txtSubject.value.trim().length == 0) {
		Alloy.Globals.ShowAlert(selectedLanguage.userFeedback, selectedLanguage.enterSubject);
		return;
	} else if ($.txtComments.value.trim().length == 0 || $.txtComments.value == selectedLanguage.enterComments) {
		Alloy.Globals.ShowAlert(selectedLanguage.userFeedback, selectedLanguage.plsEnterComments);
		return;
	}
	if (isSubmitClicked == true) {
		return;
	}
	isSubmitClicked = true;
	httpManager.createUserFeedbackRequest(selectedReqType.id, $.txtSubject.value.trim(), $.txtComments.value.trim(), $.txtName.value.trim(), $.txtEmail.value.trim(), $.txtMobile.value.trim(), function(data) {
		isSubmitClicked = false;
		if (data != null) {
			if (data.status == "Success") {
				var alertDg = Ti.UI.createAlertDialog({
					title : selectedLanguage.userFeedback,
					message : (isEnglish) ? data.description_En : data.description_Ar,
					buttonNames : [selectedLanguage.ok],
				});
				alertDg.addEventListener('click', function(e) {
					Ti.API.info('>>>>>>>>>>');
					closeWindow();
				});
				alertDg.show();
			} else {
				Alloy.Globals.ShowAlert(selectedLanguage.createRequest, (isEnglish) ? data.description_En : data.description_Ar);
			}
		}
	});
}

// function openGovUrl(){
// Ti.Platform.openURL("http://mygov.ae/mygov/index.aspx");
// }

function changeLanguage() {
	$.lblNavTitle.text = selectedLanguage.userFeedback;
	$.lblrequestType.text = selectedLanguage.selectFeedbacktype;
	$.lblName.text = selectedLanguage.nameTitle;
	$.lblEmail.text = selectedLanguage.emailTitle;
	$.lblMobile.text = selectedLanguage.phoneNumber;
	$.lblSubject.text = selectedLanguage.subjectTitle;
	$.lblcomments.text = selectedLanguage.comments;

	$.txtName.hintText = selectedLanguage.enterNameHint;
	$.txtEmail.hintText = selectedLanguage.enterHintText + selectedLanguage.emailAddress;
	$.txtMobile.hintText = "XXXXXXXXXX";
	$.txtSubject.hintText = selectedLanguage.enterHintText + selectedLanguage.subjectTitle;
	$.txtComments.value = selectedLanguage.enterComments;
	$.txtComments.color = colorCode;

	$.btnSend.title = selectedLanguage.send;

	var alignment;
	if (isEnglish) {
		alignment = Ti.UI.TEXT_ALIGNMENT_LEFT;
		$.lblrequestTypeAstrik.left = $.lblNameAstrik.left = $.lblEmailAstrik.left = $.lblMobileAstrik.left = $.lblSubjectAstrik.left = $.lblcommentsAstrik.left = 8;
		$.lblrequestType.left = $.imgdownArrow.right = $.lblName.left = $.lblEmail.left = $.lblMobile.left = $.lblSubject.left = $.lblcomments.left = 17;
		$.txtName.left = $.txtEmail.left = $.txtMobile.left = $.txtSubject.left = (Alloy.isTablet) ? 200 : 150;

		if (Alloy.isTablet) {
			$.txtComments.left = (OS_IOS) ? 195 : 200;
		} else {
			$.txtComments.left = (OS_IOS) ? 145 : 150;
		}

		$.txtName.right = $.txtEmail.right = $.txtMobile.right = $.txtSubject.right = $.txtComments.right = 10;
		$.lblrequestType.right = (isTablet) ? 40 : 33;

		$.nameColon.left = $.emailColon.left = $.mobileColon.left = $.subjectColon.left = $.commentsColon.left = (Alloy.isTablet) ? 170 : 140;
	} else {
		$.lblrequestTypeAstrik.right = $.lblNameAstrik.right = $.lblEmailAstrik.right = $.lblMobileAstrik.right = $.lblSubjectAstrik.right = $.lblcommentsAstrik.right = 8;
		$.lblrequestType.right = $.imgdownArrow.left = $.lblName.right = $.lblEmail.right = $.lblMobile.right = $.lblSubject.right = $.lblcomments.right = 17;
		$.txtName.right = $.txtEmail.right = $.txtMobile.right = $.txtSubject.right = (Alloy.isTablet) ? 200 : 150;

		if (Alloy.isTablet) {
			$.txtComments.right = (OS_IOS) ? 195 : 200;
		} else {
			$.txtComments.right = (OS_IOS) ? 145 : 150;
		}

		$.txtName.left = $.txtEmail.left = $.txtMobile.left = $.txtSubject.left = $.txtComments.left = 10;
		alignment = Ti.UI.TEXT_ALIGNMENT_RIGHT;
		$.lblrequestType.left = (isTablet) ? 40 : 33;

		$.nameColon.right = $.emailColon.right = $.mobileColon.right = $.subjectColon.right = $.commentsColon.right = (Alloy.isTablet) ? 170 : 140;
	}
	$.lblrequestType.textAlign = $.lblName.textAlign = $.lblEmail.textAlign = $.lblMobile.textAlign = $.lblSubject.textAlign = $.lblcomments.textAlign = alignment;
	$.txtName.textAlign = $.txtEmail.textAlign = $.txtMobile.textAlign = $.txtSubject.textAlign = $.txtComments.textAlign = alignment;
}

if (Alloy.Globals.currentTheme == "dark") {
	$.navBarBackView.backgroundColor = Alloy.Globals.path.navBarColor;
}
Alloy.Globals.setDefaultTheme($.winUserFeedback);

$.winUserFeedback.addEventListener("open", function(e) {
	Alloy.Globals.SetModelWindow($.winUserFeedback);
});

changeLanguage();
