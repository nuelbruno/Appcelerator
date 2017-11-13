var httpManager = require("httpManager");
//Alloy.createController('common/httpManager');

var args = arguments[0] || {};

var doc = args.obj;
var callBackFunction = args.callBackFunction;

Ti.API.info('doc' + JSON.stringify(doc));

//alert(args.isUpdate);
//alert(args.mappingId);

if (Alloy.Globals.isIOS7Plus) {
	//$.winPurchaseOrder.extendEdges = [Ti.UI.EXTEND_EDGE_TOP];
	$.statusBar.height = 20;
}

function closeWindow() {
	Alloy.Globals.closeWindow($.winContact);
}

function showAlert(message) {

	var alert = Ti.UI.createAlertDialog({
		title : Alloy.Globals.selectedLanguage.iSupplier,
		message : message,
		buttonNames : [Alloy.Globals.selectedLanguage.ok]
	});
	alert.addEventListener('click', function(e) {
		callBackFunction();
		closeWindow();
	});
	alert.show();
}

var arrContactTitle = [{
	titleEn : "Mr",
	titleAr : "السيد"
}, {
	titleEn : "Mrs",
	titleAr : "السيدة"
}, {
	titleEn : "Miss",
	titleAr : "الآنسة"
}];

function setContactTitleLabel(e) {
	$.lblContactTitleValue.text = e.labelTitle;
}

var isTapped = false;

function selectContactTitle(e) {

	if (isTapped) {
		return;
	}
	isTapped = true;

	var arrData = [];

	for (var i = 0; i < arrContactTitle.length; i++) {

		arrData.push({
			title : arrContactTitle[i].titleEn,
			titleAr : arrContactTitle[i].titleAr,
			selected : ""
		});
	}

	var winSelection = Alloy.createController('winSelection', {
		data : arrData,
		title : Alloy.Globals.selectedLanguage.supplierRegistration,
		callBackFunction : setContactTitleLabel,
	}).getView();
	if (OS_IOS) {
		winSelection.open({
			modal : true
		});
	} else {
		winSelection.open();
	}

	isTapped = false;

}

function validatePhone(phone) {
	//var regex=/^[0-9]+$/;
	var regex = /^[0-9]+$/;
	return (regex.test(phone) && (phone.length == 10) && (phone.substring(0, 2) == "05"));
}

function validateTel(phone) {
	//var regex=/^[0-9]+$/;
	var regex = /^[0-9]+$/;
	return (regex.test(phone) && (phone.length >= 9));
}

function validateInteger(phone) {
	//var regex=/^[0-9]+$/;
	var regex = /^[0-9]+$/;
	return (regex.test(phone));
}

function submitForm() {

	/*if ($.txtFirstName.value.length == 0) {
		Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.iSupplier, Alloy.Globals.selectedLanguage.mSuppFirstName);
		return;
	} else */if ($.txtContactName.value.length == 0) {
		Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.iSupplier, Alloy.Globals.selectedLanguage.enterContactName);
		return;
	}/* else if ($.txtMiddleName.value.length == 0) {
		Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.iSupplier, Alloy.Globals.selectedLanguage.enterMiddleName);
		return;
	} else if($.txtJobTitle.value.length == 0){
	 Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.iSupplier, Alloy.Globals.selectedLanguage.enterJobTitle);
	 return;
	 }*/else if ($.txtEmail.value.length == 0) {
		Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.iSupplier, Alloy.Globals.selectedLanguage.enterEmail);
		return;
	} else if (Alloy.Globals.validateEmail($.txtEmail.value) == false) {
		Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.iSupplier, Alloy.Globals.selectedLanguage.enterValidEmailMsg);
		return;
	} else if ($.txtMobile.value.length == 0) {
		Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.iSupplier, Alloy.Globals.selectedLanguage.enterMobileNo);
		return;
	} else if (!validatePhone($.txtMobile.value.trim())) {
		Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.iSupplier, Alloy.Globals.selectedLanguage.invalidMobileNo);
		return;
	} else if ($.txtPhoneNo.value.length == 0) {
		Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.iSupplier, Alloy.Globals.selectedLanguage.enterTelPhNo);
		return;
	} else if (!validateInteger($.txtPhoneNo.value.trim())) {
		Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.iSupplier, Alloy.Globals.selectedLanguage.invalidPhNo);
		return;
	} else if (!validateTel($.txtPhoneNo.value.trim())) {
		Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.iSupplier, Alloy.Globals.selectedLanguage.invalidPhoneNo);
		return;
	}

	var obj = {
		mappingId : args.mappingId,
		contactTitle : $.lblContactTitleValue.text,
		firstName : $.txtContactName.value,//$.txtFirstName.value,
		contactName : $.txtContactName.value,
		middleName : "",//$.txtMiddleName.value,
		jobTitle : $.txtJobTitle.value,
		email : $.txtEmail.value,
		mobileNo : $.txtMobile.value,
		phoneNo : $.txtPhoneNo.value,
		department : $.txtDepartment.value,
		action : (args.isUpdate) ? "UPDATE" : "INSERT",
		contactId : (args.isUpdate) ? doc.contactId : "",
	};
	
	httpManager.addMSupplierContactDetails(obj, function(e) {

		Ti.API.info('e===' + JSON.stringify(e));

		if (e == null) {
			return;
		}

		if (e.requestStatus == "S") {
			showAlert(Alloy.Globals.selectedLanguage.dataSuccess);

		} else {
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.iSupplier, e.requestMsg);
		//	alert(e.requestMsg);
		}

	});

}

function changeLanguage() {

	$.lblNavTitle.text = Alloy.Globals.selectedLanguage.supplierRegistration;
	$.lblContactDetails.text = Alloy.Globals.selectedLanguage.contactDetails;

	$.lblContactTitle.text = Alloy.Globals.selectedLanguage.contactTitle;
//	$.lblFirstName.text = Alloy.Globals.selectedLanguage._firstName;
	$.lblContactName.text = Alloy.Globals.selectedLanguage.contactName;
//	$.lblMiddleName.text = Alloy.Globals.selectedLanguage.middleName;
	$.lblJobTitle.text = Alloy.Globals.selectedLanguage.jobTile;
	$.lblEmail.text = Alloy.Globals.selectedLanguage.emailAddress;
	$.lblMobile.text = Alloy.Globals.selectedLanguage.mobileNumber;
	$.lblPhoneNo.text = Alloy.Globals.selectedLanguage.phoneNumber;
	$.lblDepartment.text = Alloy.Globals.selectedLanguage.department;

	$.lblContactTitleValue.text = Alloy.Globals.selectedLanguage.__selectContactTitle;

	if (args.isUpdate) {
		$.lblContactTitleValue.text = doc.contactTitle;
	//	$.txtFirstName.value = doc.firstName;
		$.txtContactName.value = doc.contactName;
	//	$.txtMiddleName.value = doc.middleName;
		$.txtJobTitle.value = doc.jobTitle;
		$.txtEmail.value = doc.emailId;
		$.txtMobile.value = doc.mobileNumber;
		$.txtPhoneNo.value = doc.telPhoneNumber;
		$.txtDepartment.value = doc.department;
	}

	var alignment;

	if (Alloy.Globals.isEnglish) {
		alignment = Ti.UI.TEXT_ALIGNMENT_LEFT;

		/*$.lblFirstNameAstrik.left = */$.lblContactNameAstrik.left = /*$.lblMiddleNameAstrik.left = */$.lblEmailAstrik.left = $.lblMobileAstrik.left = $.lblPhoneNoAstrik.left = 5;
		/*$.lblFirstNameAstrik.right = */$.lblContactNameAstrik.right = /*$.lblMiddleNameAstrik.right = */$.lblEmailAstrik.right = $.lblMobileAstrik.right = $.lblPhoneNoAstrik.right = undefined;
		
	} else {
		alignment = Ti.UI.TEXT_ALIGNMENT_RIGHT;

		/*$.lblFirstNameAstrik.right = */$.lblContactNameAstrik.right =/* $.lblMiddleNameAstrik.right = */$.lblEmailAstrik.right = $.lblMobileAstrik.right = $.lblPhoneNoAstrik.right = 5;
		/*$.lblFirstNameAstrik.left = */$.lblContactNameAstrik.left = /*$.lblMiddleNameAstrik.left = */$.lblEmailAstrik.left = $.lblMobileAstrik.left = $.lblPhoneNoAstrik.left = undefined;
		
	}

	$.lblContactDetails.textAlign = $.lblContactTitle.textAlign = $.lblContactTitleValue.textAlign = /*$.lblFirstName.textAlign = $.txtFirstName.textAlign = */alignment;
	$.lblContactTitle.textAlign = $.lblContactTitleValue.textAlign = /*$.lblFirstName.textAlign = $.txtFirstName.textAlign = */alignment;
	$.lblContactName.textAlign = $.txtContactName.textAlign = /*$.lblMiddleName.textAlign = $.txtMiddleName.textAlign = */alignment;
	$.lblJobTitle.textAlign = $.txtJobTitle.textAlign = $.lblEmail.textAlign = $.txtEmail.textAlign = alignment;
	$.lblMobile.textAlign = $.txtMobile.textAlign = $.lblPhoneNo.textAlign = $.txtPhoneNo.textAlign = alignment;
	$.lblDepartment.textAlign = $.txtDepartment.textAlign = alignment;

}

changeLanguage();

$.winContact.addEventListener("focus",function(e){
	$.viewBottomToolbar.setDefaultTheme($.winContact);
});
$.viewBottomToolbar.setDefaultTheme($.winContact);

/**
 * Adding the eventlistener for the bottom bar view
 *
 * @param {Object} e
 */
$.viewBottomToolbar.getView().addEventListener('click', function(e) {
	if (e.source.buttonId == 'btnFontChange') {
		$.viewBottomToolbar.changeFont($.winContact);
	} else if (e.source.buttonId == 'btnSystemFeedback') {
		$.viewBottomToolbar.openFeedbackScreen(e);
	} else if(e.source.buttonId == 'btnSystemChangeTheme'){
		$.viewBottomToolbar.changeTheme($.winContact);
	}
});

/**
 * Called on open of the window
 *
 * @param {Object} e
 */
var windowOpened = function(e) {
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
var windowClosed = function(e){
	$.destroy();
};



