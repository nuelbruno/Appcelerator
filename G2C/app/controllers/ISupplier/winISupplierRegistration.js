var httpManager = require("httpManager");
//Alloy.createController('common/httpManager');

var args = arguments[0] || {};

if (Alloy.Globals.isIOS7Plus) {
	//$.winPurchaseOrder.extendEdges = [Ti.UI.EXTEND_EDGE_TOP];
	$.statusBar.height = 20;
}

var isCompanyDone = false;
var isContactDone = false;
var isStep1Done = false;
var isStep2Done = false;
var isStep3Done = false;

function closeWindow() {

	var alert = Ti.UI.createAlertDialog({
		title : Alloy.Globals.selectedLanguage.iSupplier,
		message : Alloy.Globals.selectedLanguage.exitRegistration,
		buttonNames : [Alloy.Globals.selectedLanguage.ok, Alloy.Globals.selectedLanguage.cancel]
	});
	alert.addEventListener('click', function(e) {
		if (e.index == 0) {
			Alloy.Globals.closeWindow($.winISupplierRegistration);
		} else {
			alert.hide();
		}
	});
	alert.show();

	//$.winISupplierHome.close();
}

var density = "";
if (OS_IOS) {
	density = "dp";
} else {
	density = "px";
}

function setViewsWidth() {
	if (OS_IOS) {
		if (Ti.Gesture.orientation == 3 || Ti.Gesture.orientation == 4) {// Landscape

			if (currentViewIndex < 2) {
				$.view2.left = Alloy.Globals.platformHeight + density;
			}
			if (currentViewIndex < 3) {
				$.view3.left = Alloy.Globals.platformHeight + density;
			}
			if (currentViewIndex < 4) {
				$.view4.left = Alloy.Globals.platformHeight + density;
			}
			$.view1.width = Alloy.Globals.platformHeight + density;
			$.view2.width = Alloy.Globals.platformHeight + density;
			$.view3.width = Alloy.Globals.platformHeight + density;
			$.view4.width = Alloy.Globals.platformHeight + density;

		} else if (Ti.Gesture.orientation == 1 || Ti.Gesture.orientation == 2) {// Portrait
			if (currentViewIndex < 2) {
				$.view2.left = Alloy.Globals.platformWidth + density;
			}
			if (currentViewIndex < 3) {
				$.view3.left = Alloy.Globals.platformWidth + density;
			}
			if (currentViewIndex < 4) {
				$.view4.left = Alloy.Globals.platformWidth + density;
			}
			$.view1.width = Alloy.Globals.platformWidth + density;
			$.view2.width = Alloy.Globals.platformWidth + density;
			$.view3.width = Alloy.Globals.platformWidth + density;
			$.view4.width = Alloy.Globals.platformWidth + density;
		}
	} else {
		if (Ti.Gesture.orientation == 2) {// Landscape
			Ti.API.info('Landscape');
			if (currentViewIndex < 2) {
				Ti.API.info('Alloy.Globals.platformHeight===' + Alloy.Globals.platformHeight);
				$.view2.left = Alloy.Globals.platformHeight + density;
			}
			if (currentViewIndex < 3) {
				$.view3.left = Alloy.Globals.platformHeight + density;
			}
			if (currentViewIndex < 4) {
				$.view4.left = Alloy.Globals.platformHeight + density;
			}
			$.view1.width = Alloy.Globals.platformHeight + density;
			$.view2.width = Alloy.Globals.platformHeight + density;
			$.view3.width = Alloy.Globals.platformHeight + density;
			$.view4.width = Alloy.Globals.platformHeight + density;
		} else if (Ti.Gesture.orientation == 1) {// Portrait
			Ti.API.info('Portrait');
			if (currentViewIndex < 2) {
				Ti.API.info('Alloy.Globals.platformWidth===' + Alloy.Globals.platformWidth);
				$.view2.left = Alloy.Globals.platformWidth + 48 + density;
			}
			if (currentViewIndex < 3) {
				$.view3.left = Alloy.Globals.platformWidth + 48 + density;
			}
			if (currentViewIndex < 4) {
				$.view4.left = Alloy.Globals.platformWidth + 48 + density;
			}
			$.view1.width = Alloy.Globals.platformWidth + 48 + density;
			$.view2.width = Alloy.Globals.platformWidth + 48 + density;
			$.view3.width = Alloy.Globals.platformWidth + 48 + density;
			$.view4.width = Alloy.Globals.platformWidth + 48 + density;
		}
	}
}

$.winISupplierRegistration.addEventListener("open", function(e) {
	Alloy.Globals.arrWindows.push($.winISupplierRegistration);

});

var currentViewIndex = 1;
var completedViewIndex = 0;

var showView = Ti.UI.createAnimation({
	left : 0,
	curve : Ti.UI.ANIMATION_CURVE_EASE_OUT,
	//	transform : Ti.UI.create2DMatrix().scale(0.9, 0.80),
	duration : 200,
});

var hideView = Ti.UI.createAnimation({
	left : (Alloy.Globals.platformWidth > Alloy.Globals.platformHeight) ? Alloy.Globals.platformWidth + density : Alloy.Globals.platformHeight + density,
	curve : Ti.UI.ANIMATION_CURVE_EASE_OUT,
	//	transform : Ti.UI.create2DMatrix().scale(0.9, 0.80),
	duration : 200,
});

function showView1() {

	if (currentViewIndex == 4) {
		$.step4View.backgroundImage = Alloy.Globals.path.icnStepDoneMiddle;
		$.lblStep4.color = Alloy.Globals.path.whiteColor;
		$.view4.animate(hideView);
		//	currentViewIndex = 3;
		var view1 = setTimeout(function() {
			$.view3.animate(hideView);
			//	currentViewIndex = 2;
		}, 150);
		var view2 = setTimeout(function() {
			$.view2.animate(hideView);
			//	currentViewIndex = 1;
		}, 300);

	} else if (currentViewIndex == 3) {
		$.step3View.backgroundImage = Alloy.Globals.path.icnStepDoneMiddle;
		$.lblStep3.color = Alloy.Globals.path.whiteColor;
		$.view3.animate(hideView);
		//	currentViewIndex = 2;
		var view1 = setTimeout(function() {
			$.view2.animate(hideView);
			//	currentViewIndex = 1;
		}, 150);
	} else if (currentViewIndex == 2) {
		$.step2View.backgroundImage = Alloy.Globals.path.icnStepDoneMiddle;
		$.lblStep2.color = Alloy.Globals.path.whiteColor;
		$.view2.animate(hideView);
		//	currentViewIndex = 1;
	} else if (currentViewIndex == 1) {
		return;
	}

	$.step1View.backgroundImage = Alloy.Globals.path.icnStepEditMiddle;
	$.lblStep1.color = Alloy.Globals.path.navBarColor;
	currentViewIndex = 1;

	/*if(currentViewIndex < completedViewIndex){
	 $.saveBackView.opacity = 0.5;
	 return;
	 }else{
	 $.saveBackView.opacity = 01;
	 }*/

}

function showView2() {

	if (completedViewIndex < 1)
		return;

	if (currentViewIndex == 4) {
		$.step4View.backgroundImage = Alloy.Globals.path.icnStepDoneMiddle;
		$.lblStep4.color = Alloy.Globals.path.whiteColor;
		$.view4.animate(hideView);
		//	currentViewIndex = 3;
		var view1 = setTimeout(function() {
			$.view3.animate(hideView);
			//	currentViewIndex = 2;
		}, 150);

	} else if (currentViewIndex == 3) {
		$.step3View.backgroundImage = Alloy.Globals.path.icnStepDoneMiddle;
		$.lblStep3.color = Alloy.Globals.path.whiteColor;
		$.view3.animate(hideView);
		//	currentViewIndex = 2;
	} else if (currentViewIndex == 2) {
		Ti.API.info('2222');
		return;
	} else if (currentViewIndex == 1) {
		$.step1View.backgroundImage = Alloy.Globals.path.icnStepFirstDone;
		$.lblStep1.color = Alloy.Globals.path.whiteColor;
		Ti.API.info('1111');
		$.view2.animate(showView);
		//	currentViewIndex = 2;
	}

	$.step2View.backgroundImage = Alloy.Globals.path.icnStepEditMiddle;
	$.lblStep2.color = Alloy.Globals.path.navBarColor;
	currentViewIndex = 2;

	/*if(currentViewIndex < completedViewIndex){
	 $.saveBackView.opacity = 0.5;
	 return;
	 }else{
	 $.saveBackView.opacity = 01;
	 }*/

}

function showView3() {

	if (completedViewIndex < 2)
		return;

	if (currentViewIndex == 4) {
		$.step4View.backgroundImage = Alloy.Globals.path.icnStepDoneMiddle;
		$.lblStep4.color = Alloy.Globals.path.whiteColor;
		$.view4.animate(hideView);
		//	currentViewIndex = 3;
	} else if (currentViewIndex == 3) {
		return;
	} else if (currentViewIndex == 2) {
		$.step2View.backgroundImage = Alloy.Globals.path.icnStepDoneMiddle;
		$.lblStep2.color = Alloy.Globals.path.whiteColor;
		$.view3.animate(showView);
		//	currentViewIndex = 3;
	} else if (currentViewIndex == 1) {
		$.step1View.backgroundImage = Alloy.Globals.path.icnStepFirstDone;
		$.lblStep1.color = Alloy.Globals.path.whiteColor;
		$.view2.animate(showView);
		//	currentViewIndex = 2;
		var view1 = setTimeout(function() {
			$.view3.animate(showView);
			//		currentViewIndex = 3;
		}, 150);
	}

	$.step3View.backgroundImage = Alloy.Globals.path.icnStepEditMiddle;
	$.lblStep3.color = Alloy.Globals.path.navBarColor;
	currentViewIndex = 3;

	/*if(currentViewIndex < completedViewIndex){
	 $.saveBackView.opacity = 0.5;
	 return;
	 }else{
	 $.saveBackView.opacity = 01;
	 }*/

}

function showView4() {

	if (completedViewIndex < 3)
		return;

	if (currentViewIndex == 4) {
		return;
	} else if (currentViewIndex == 3) {
		$.step3View.backgroundImage = Alloy.Globals.path.icnStepDoneMiddle;
		$.lblStep3.color = Alloy.Globals.path.whiteColor;
		$.view4.animate(showView);
		//	currentViewIndex = 4;
	} else if (currentViewIndex == 2) {
		$.step2View.backgroundImage = Alloy.Globals.path.icnStepDoneMiddle;
		$.lblStep2.color = Alloy.Globals.path.whiteColor;
		$.view3.animate(showView);
		//	currentViewIndex = 3;
		var view1 = setTimeout(function() {
			$.view4.animate(showView);
			//	currentViewIndex = 4;
		}, 150);
	} else if (currentViewIndex == 1) {
		$.step1View.backgroundImage = Alloy.Globals.path.icnStepFirstDone;
		$.lblStep1.color = Alloy.Globals.path.whiteColor;
		$.view2.animate(showView);
		//	currentViewIndex = 2;
		var view1 = setTimeout(function() {
			$.view3.animate(showView);
			//		currentViewIndex = 3;
		}, 150);
		var view2 = setTimeout(function() {
			$.view4.animate(showView);
			//	currentViewIndex = 4;
		}, 150);
	}

	$.step4View.backgroundImage = Alloy.Globals.path.icnStepEditMiddle;
	$.lblStep4.color = Alloy.Globals.path.navBarColor;
	currentViewIndex = 4;

}

var mappingId;
var contactId = "";
var registerId;

function updateContactList() {

	httpManager.getMSupplierContactList(mappingId, registerId, function(e) {

		Ti.API.info('e' + JSON.stringify(e));
		arrContact = e;

		loadContactItems(arrContact);

	});
}

function validatePhone(phone) {
	/*	var result;
	result = phone.match(/^[\u0660-\u0669\u06F0-\u06F9]*$/);
	Ti.API.log('Ar result ' + result);
	if (result != null) {
	return true;
	}
	*/
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
	/*	var result;
	result = phone.match(/^[\u0660-\u0669\u06F0-\u06F9]*$/);
	Ti.API.log('Ar result ' + result);
	if (result != null) {
	return true;
	}
	*/
	//var regex=/^[0-9]+$/;
	var regex = /^[0-9]+$/;
	return (regex.test(phone));
}

function validateArabicName(str) {
	var result = str.match(/[\u0600-\u06FF]$/);
	Ti.API.log('result out ' + result);
	if (result == null) {
		return true;
	} else {
		return false;
	}
}

function callWSforFirstStep() {

	$.txtCompanyNameAr.blur();
	$.txtCompanyRegNo.blur();
	$.txtCompanyNameEn.blur();
	//	$.txtFirstName.blur();
	$.txtEmailId.blur();
	$.txtContactName.blur();
	$.txtMobileNo.blur();
	$.txtTelNo.blur();

	if ($.txtCompanyNameAr.value.length == 0) {
		Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.iSupplier, Alloy.Globals.selectedLanguage.enterCompanyAr);
		return;
	}/* else if (validateArabicName($.txtCompanyNameAr.value.trim())) {
	 Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.iSupplier, Alloy.Globals.selectedLanguage.enterValidCompanyAr);
	 return;
	 }*/ else if ($.txtCompanyRegNo.value.length == 0) {
		Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.iSupplier, Alloy.Globals.selectedLanguage.enterCompanyRegNo);
		return;
	}/* else if (!validateInteger($.txtCompanyRegNo.value.trim())) {
	 Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.iSupplier, Alloy.Globals.selectedLanguage.invalidRegisterNo);
	 return;
	 } */else if ($.txtCompanyNameEn.value.length == 0) {
		Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.iSupplier, Alloy.Globals.selectedLanguage.enterCompanyEn);
		return;
	}/* else if ($.txtFirstName.value.length == 0) {
	 Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.iSupplier, Alloy.Globals.selectedLanguage.enterFirstName);
	 return;
	 } */else if ($.txtEmailId.value.length == 0) {
		Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.iSupplier, Alloy.Globals.selectedLanguage.enterEmail);
		return;
	} else if (Alloy.Globals.validateEmail($.txtEmailId.value) == false) {
		Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.iSupplier, Alloy.Globals.selectedLanguage.enterValidEmailMsg);
		return;
	} else if ($.txtContactName.value.length == 0) {
		Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.iSupplier, Alloy.Globals.selectedLanguage.enterContactName);
		return;
	} else if ($.txtMobileNo.value.length == 0) {
		Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.iSupplier, Alloy.Globals.selectedLanguage.enterMobileNo);
		return;
	} else if (!validatePhone($.txtMobileNo.value.trim())) {
		Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.iSupplier, Alloy.Globals.selectedLanguage.invalidMobileNo);
		return;
	} else if ($.txtTelNo.value.length == 0) {
		Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.iSupplier, Alloy.Globals.selectedLanguage.enterTelPhNo);
		return;
	} else if (!validateInteger($.txtTelNo.value.trim())) {
		Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.iSupplier, Alloy.Globals.selectedLanguage.invalidTelPhoneNo);
		return;
	} else if (!validateTel($.txtTelNo.value.trim())) {
		Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.iSupplier, Alloy.Globals.selectedLanguage.invalidTelNo);
		return;
	}

	var obj = {
		registerId : (completedViewIndex >= 1) ? registerId : "",
		mappingId : (completedViewIndex >= 1) ? mappingId : "",
		companyNameAr : $.txtCompanyNameAr.value,
		companyNameEn : $.txtCompanyNameEn.value,
		companyRegNo : $.txtCompanyRegNo.value,
		contactName : $.txtContactName.value,
		firstName : $.txtContactName.value, //$.txtFirstName.value,
		contactEmail : $.txtEmailId.value,
		mobileNo : $.txtMobileNo.value,
		telPhoneNo : $.txtTelNo.value,
		actionContact : (isContactDone) ? "UPDATE" : "INSERT",
		actionCompany : (isCompanyDone) ? "UPDATE" : "INSERT",
		contactRequestId : contactId,
	};

	httpManager.registerFirstStep(obj, function(e) {

		if (e == null) {
			return;
		}

		Ti.API.info('e===' + JSON.stringify(e));

		if (e.registrationStatus == "S" && e.contactStatus == "S") {

			// $.step1View.backgroundImage = Alloy.Globals.path.icnStepFirstDone;
			// $.lblStep1.color = Alloy.Globals.path.whiteColor;
			// $.step2View.backgroundImage = Alloy.Globals.path.icnStepEditMiddle;
			// $.lblStep2.color = Alloy.Globals.path.navBarColor;

			$.txtCertificate2.value = $.txtCompanyRegNo.value;

			$.step2View.opacity = 1;

			registerId = e.registerId;
			mappingId = e.mappingId;
			contactId = e.contactId;
			//	$.view2.animate(showView);
			//	currentViewIndex = 2;

			if (completedViewIndex <= 1)
				completedViewIndex = 1;

			//	isStep1Done = true;
			isCompanyDone = true;
			isContactDone = true;

			showView2();

			updateContactList();

		} else {

			//	completedViewIndex = 1;
			if (e.registrationStatus == "E") {
				isCompanyDone = false;
				isContactDone = false;
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.iSupplier, e.registrationMsg);
				//	alert(e.registrationMsg);
			} else if (e.registrationStatus == "S" && e.contactStatus == "E") {
				isCompanyDone = true;
				isContactDone = false;
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.iSupplier, e.contactMsg);
				//	alert(e.contactMsg);
			}

			Ti.API.info('e.registrationStatus' + e.registrationStatus);
			Ti.API.info('e.isCompanyDone' + isCompanyDone);
			Ti.API.info('e.contactStatus' + e.contactStatus);
			Ti.API.info('e.isContactDone' + isContactDone);

		}

	});

}

var isDate1Selected = false;
var isDate2Selected = false;
var isDate3Selected = false;

var busReqId1;
var busReqId2;
var busReqId3;

//var isStepTwoDone = false;

function callWSforSecondStep() {

	$.txtCertificate1.blur();
	$.txtCertificate2.blur();
	$.txtCertificate3.blur();

	if (arrAddress.length == 0) {
		//	alert("Please fill address details.");
		Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.iSupplier, Alloy.Globals.selectedLanguage.fillAddressDetails);
		return;
	} else if (arrBank.length == 0) {
		//	alert("Please fill bank details.");
		Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.iSupplier, Alloy.Globals.selectedLanguage.fillBankDetails);
		return;
	} else if (arrContact.length == 0) {
		//	alert("Please fill contact details.");
		Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.iSupplier, Alloy.Globals.selectedLanguage.fillContactDetails);
		return;
	} else if ($.txtCertificate1.value.length == 0) {
		//	alert("Please enter Chamber of Commerce membership certificate number.");
		Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.iSupplier, Alloy.Globals.selectedLanguage.enterCerNo1);
		return;
	} else if (!isDate1Selected) {
		//	alert("Please select Chamber of Commerce membership expiration date.");
		Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.iSupplier, Alloy.Globals.selectedLanguage.enterExp1);
		return;
	} else if ($.txtCertificate2.value.length == 0) {
		//	alert("Please enter Commercial Registration certificate number.");
		Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.iSupplier, Alloy.Globals.selectedLanguage.enterCerNo2);
		return;
	} else if (!isDate2Selected) {
		//	alert("Please select Commercial Registration expiration date.");
		Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.iSupplier, Alloy.Globals.selectedLanguage.enterExp2);
		return;
	} else if ($.txtCertificate3.value.length == 0) {
		//	alert("Please enter Trade License certificate number.");
		Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.iSupplier, Alloy.Globals.selectedLanguage.enterCerNo3);
		return;
	} else if (!isDate3Selected) {
		//	alert("Please select Trade License expiration date.");
		Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.iSupplier, Alloy.Globals.selectedLanguage.enterExp3);
		return;
	} else if (isSecurityQuestionSelected == false) {
		Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.iSupplier, Alloy.Globals.selectedLanguage.invalidSecurityQuestion);
		return;
	}

	var obj = {
		mappingId : mappingId,
		certificateNo1 : $.txtCertificate1.value,
		expiryDate1 : $.lblExpiryDate1Value.text, //timeStamp,
		busReqId1 : (isStep2Done) ? busReqId1 : "",
		certificateNo2 : $.txtCertificate2.value,
		expiryDate2 : $.lblExpiryDate2Value.text, //timeStamp,
		busReqId2 : (isStep2Done) ? busReqId2 : "",
		certificateNo3 : $.txtCertificate3.value,
		expiryDate3 : $.lblExpiryDate3Value.text, //timeStamp,
		busReqId3 : (isStep2Done) ? busReqId3 : "",
		action : (isStep2Done) ? "UPDATE" : "INSERT", //(isStepTwoDone) ? "UPDATE" : "INSERT",
		requestType : "ADD",
	};

	httpManager.registerSecondStep(obj, function(e) {

		if (e == null) {
			return;
		}

		Ti.API.info('e===' + JSON.stringify(e));

		if (e.status1 == "S" && e.status2 == "S" && e.status3 == "S") {

			busReqId1 = e.requestId1;
			busReqId2 = e.requestId2;
			busReqId3 = e.requestId3;

			// $.step2View.backgroundImage = Alloy.Globals.path.icnStepDoneMiddle;
			// $.lblStep2.color = Alloy.Globals.path.whiteColor;
			// $.step3View.backgroundImage = Alloy.Globals.path.icnStepEditMiddle;
			// $.lblStep3.color = Alloy.Globals.path.navBarColor;

			$.step3View.opacity = 1;

			isStep2Done = true;
			//isStepTwoDone = true;

			//	currentViewIndex = 3;
			if (completedViewIndex <= 2)
				completedViewIndex = 2;
			//	$.view3.animate(showView);

			showView3();

		} else {
			//	isStepTwoDone = true;
			if (e.status1 == "E") {
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.iSupplier, e.msg1);
				//	alert(e.msg1);
			} else if (e.status2 == "E") {
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.iSupplier, e.msg2);
				//	alert(e.msg2);
			} else if (e.status3 == "E") {
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.iSupplier, e.msg3);
				//	alert(e.msg3);
			}

		}

	});

}

//Alloy.Globals.partnershipTotal = 0;
var isLegalEntitySelected = false;
var isDirectorNameSelected = false;

function callWSforThirdStep() {

	$.txtGeneralDirectorName.blur();

	//	Ti.API.info('Alloy.Globals.partnershipTotal====third step'+Alloy.Globals.partnershipTotal);

	if (!isLegalEntitySelected) {
		Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.iSupplier, Alloy.Globals.selectedLanguage.selectLegalEntity);
		return;
	} else if (!isDirectorNameSelected) {
		Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.iSupplier, Alloy.Globals.selectedLanguage.selectGeneralDirectorNationality);
		return;
	} else if ($.txtGeneralDirectorName.value.length == 0) {
		Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.iSupplier, Alloy.Globals.selectedLanguage.enterGeneralDirectorName);
		return;
	} else if (arrActivitySelectedValues.length == 0) {
		Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.iSupplier, Alloy.Globals.selectedLanguage.selectActivity);
		return;
	} else if (arrPartner.length == 0) {
		Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.iSupplier, Alloy.Globals.selectedLanguage.enterPartnerDetails);
		return;
	} else if (partnership_percent_total !== 100) {
		Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.iSupplier, Alloy.Globals.selectedLanguage.partnerMandatory);
		return;
	}

	var obj = {
		registeredId : registerId,
		legalEntity : selectedLegalEntity, //$.lblLegalEntityValue.text,
		directorNationality : selectedDirectorNationality, //$.lblGeneralDirectorValue.text,
		directorName : $.txtGeneralDirectorName.value,
		arrActivitySelectedValues : arrActivityWSValues,
		action : (isStep3Done) ? "UPDATE" : "INSERT",
		isProfile : "",
		lang : (Alloy.Globals.isEnglish) ? "ENG" : "",
	};

	httpManager.registerThirdStep(obj, function(e) {

		if (e == null) {
			return;
		}

		Ti.API.info('e===' + JSON.stringify(e));

		if (e.status == "S") {

			// $.step3View.backgroundImage = Alloy.Globals.path.icnStepDoneMiddle;
			// $.lblStep3.color = Alloy.Globals.path.whiteColor;
			// $.step4View.backgroundImage = Alloy.Globals.path.icnStepEditLast;
			// $.lblStep4.color = Alloy.Globals.path.navBarColor;

			$.step4View.opacity = $.saveBackView.opacity = 1;
			//	currentViewIndex = 4;
			if (completedViewIndex <= 3)
				completedViewIndex = 3;
			//	$.view4.animate(showView);

			isStep3Done = true;

			showView4();

		} else {
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.iSupplier, e.msg);
			//	alert(e.msg);

		}

	});

}

var paymentId = null;

function submitForm() {

	// if (currentViewIndex < completedViewIndex) {
	// return;
	// }

	if (currentViewIndex == 1) {

		//	 if(completedViewIndex >= 1)
		//			return;

		//	$.view2.animate(showView);
		//	currentViewIndex = 2;

		callWSforFirstStep();

	} else if (currentViewIndex == 2) {

		//if(completedViewIndex >= 2)
		//	return;

		//	currentViewIndex = 3;
		//	$.view3.animate(showView);

		callWSforSecondStep();
	} else if (currentViewIndex == 3) {

		//if(completedViewIndex >= 3)
		//	return;

		//	currentViewIndex = 4;
		//	$.view4.animate(showView);

		callWSforThirdStep();
	} else if (currentViewIndex == 4) {

		var obj = {
			serviceName : "mSupplier Registration",
			registerId : registerId
		};

		httpManager.getPaymentId(obj, function(e) {

			Ti.API.info('obj===' + JSON.stringify(e));

			if (e == null) {
				return;
			} else {

				paymentId = e.paymentId;
				if (e.paymentId == "") {
					Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.iSupplier, e.errorMsg);
				} else {

					var lan;
					if (Alloy.Globals.isEnglish) {
						lan = "en";
					} else {
						lan = "ar";
					}

					Ti.App.Properties.setObject("PaymentObject", {
						paymentId : paymentId,
						paymentType : "REG",
						supplierName : $.txtCompanyNameEn.value,
						registerId : registerId
					});

					var deviceType;
					if (OS_IOS) {
						deviceType = "IOS";
					} else {
						deviceType = "Android";
					}

					var alert = Ti.UI.createAlertDialog({
						title : Alloy.Globals.selectedLanguage.feesPayment,
						message : Alloy.Globals.selectedLanguage.paymentMsg,
						buttonNames : [Alloy.Globals.selectedLanguage.ok]
					});
					alert.addEventListener('click', function(e) {
						if (e.index == 0) {
							var paymentUrl = "http://194.170.30.187:7001/mobipay/purchaseReview.html?languageCode=" + lan + "&id=" + e.paymentId + "&serviceCode=" + e.serviceCode + "&deviceType=" + deviceType + "&paymentType=" + "Pre-Auth";
							Ti.API.info('paymentUrl' + paymentUrl);

							Ti.Platform.openURL(paymentUrl);
						}
					});
					alert.show();

					//	var paymentUrl = "http://194.170.30.187:7001/mobipay/purchaseReview.html?languageCode=" + lan + "&id=" + e.paymentId + "&serviceCode=" + e.serviceCode + "&deviceType=" + deviceType + "&paymentType=" + "Pre-Auth";
					//	Ti.API.info('paymentUrl' + paymentUrl);

					//	Ti.Platform.openURL(paymentUrl);

				}

			}

		});

	}

}

function openTransactionDetails() {

	var obj = {
		paymentId : paymentId,
		paymentType : "REG",
		supplierName : $.txtCompanyNameEn.value,
		registerId : registerId,
		vendorId : "",
	};
	Alloy.Globals.url = "";
	httpManager.getPaymentTransactionDetails(obj, function(e) {

		Ti.API.info('e' + JSON.stringify(e));
		if (e == null) {
			return;
		}

		var status;
		if (e.operationCode == "0000") {
			status = "SUCCESS";
		} else {
			status = "FAILURE";
		}

		var payLoad = {
			registerId : registerId,
			status : status,
			serviceId : 6,
			obj : e,
			isFromRenewal : false,
		};

		var win = Alloy.createController("ISupplier/winPaymentStatus", payLoad).getView();
		Alloy.Globals.openWindow(win);
	});

};

function resumeApp() {

	var delay = setTimeout(function(e) {
		var args = Ti.App.getArguments();
		Ti.API.info('Launched with: ' + JSON.stringify(args));

		if (args.url == "urlschemademo://?") {
			openTransactionDetails();
		}
	}, 500);

}

if (OS_IOS) {
	Ti.App.addEventListener('resume', resumeApp);

} else if (OS_ANDROID) {

	// On Android, somehow the app always opens as new

	Ti.API.info('Alloy.globals.url====' + Alloy.Globals.url);

	if (Alloy.Globals.url == "urlschemademo://") {
		openTransactionDetails();
	}

}

/*
 Ti.App.addEventListener('resume', function(event) {
 //alert('resume');

 Ti.API.info('event=====>>'+JSON.stringify(event));

 var obj = {
 paymentId : paymentId,
 paymentType : "REG",
 supplierName : $.txtCompanyNameEn.value,
 registerId : registerId
 };

 httpManager.getPaymentTransactionDetails(obj, function(e) {

 Ti.API.info('e' + JSON.stringify(e));
 var status;
 if (e == null) {
 status = "FAILURE";
 } else {
 status = "SUCCESS";
 }

 var payLoad = {
 registerId : registerId,
 status : status,
 obj : e,
 };

 var win = Alloy.createController("ISupplier/winPaymentStatus", payLoad).getView();
 Alloy.Globals.openWindow(win);

 });

 });
 */
function selectExpiryDate(e) {

	Ti.API.info('e==' + JSON.stringify(e));

	$.txtCertificate1.blur();
	$.txtCertificate2.blur();
	$.txtCertificate3.blur();

	if (e.source.obj == 1) {
		Alloy.Globals.mSupplierDatePicker($.lblExpiryDate1Value, $.winISupplierRegistration);
		isDate1Selected = true;
	} else if (e.source.obj == 2) {
		Alloy.Globals.mSupplierDatePicker($.lblExpiryDate2Value, $.winISupplierRegistration);
		isDate2Selected = true;
	} else {
		Alloy.Globals.mSupplierDatePicker($.lblExpiryDate3Value, $.winISupplierRegistration);
		isDate3Selected = true;
	}

}

function updateAddressList() {

	httpManager.getMSupplierAddressList(mappingId, registerId, function(e) {

		Ti.API.info('e' + JSON.stringify(e));
		arrAddress = e;

		loadAddressItems(arrAddress);

	});

}

function updateBankList() {
	//  "17400090"
	httpManager.getMSupplierBankList(mappingId, function(e) {

		Ti.API.info('e' + JSON.stringify(e));
		arrBank = e;

		loadBankItems(arrBank);

	});

}

function openAddressWindow() {

	var payload = {
		isUpdate : false,
		mappingId : mappingId,
		obj : "",
		navTitle : Alloy.Globals.selectedLanguage.supplierRegistration,
		callBackFunction : updateAddressList,
	};

	var win = Alloy.createController("ISupplier/winAddress", payload).getView();
	Alloy.Globals.openWindow(win);

}

function openBankWindow() {

	var payload = {
		isUpdate : false,
		mappingId : mappingId,
		obj : "",
		navTitle : Alloy.Globals.selectedLanguage.supplierRegistration,
		callBackFunction : updateBankList,
	};

	var win = Alloy.createController("ISupplier/winAddBank", payload).getView();
	Alloy.Globals.openWindow(win);

}

function openContactWindow() {

	var payload = {
		isUpdate : false,
		mappingId : mappingId,
		contactId : contactId,
		obj : "",
		callBackFunction : updateContactList,
	};

	var win = Alloy.createController("ISupplier/winContact", payload).getView();
	Alloy.Globals.openWindow(win);

}

var arrAddress = [];
var arrBank = [];
var arrContact = [];

function loadAddressItems(arrDoc) {

	if (arrDoc.length == 0) {
		$.lblNoItemsAddress.visible = true;
	} else {
		$.lblNoItemsAddress.visible = false;
	}

	var rowData = [];
	for (var i = 0; i < arrDoc.length; i++) {

		rowData.push({
			lblRowAddressName : {
				font : (Alloy.isTablet) ? Alloy.Globals.path.font17 : Alloy.Globals.path.font14,
				text : arrDoc[i].addressName,
				color : (Alloy.Globals.currentTheme == "dark") ? "#FFF" : Alloy.Globals.path.blackColor,
				backgroundColor : "transparent"
			},
			lblRowAddressDetail : {
				font : (Alloy.isTablet) ? Alloy.Globals.path.font17 : Alloy.Globals.path.font14,
				text : arrDoc[i].addressLine1 + ", " + arrDoc[i].postalCode,
				color : (Alloy.Globals.currentTheme == "dark") ? "#FFF" : Alloy.Globals.path.blackColor,
				backgroundColor : "transparent"
			},
			properties : {
				obj : arrDoc[i]
			}
		});

	}

	$.addressListSection.setItems(rowData);

}

$.addressTableViewItems.addEventListener("itemclick", function(e) {
	var section = $.addressTableViewItems.sections[e.sectionIndex];
	var item = section.getItemAt(e.itemIndex);

	var payload = {
		isUpdate : true,
		mappingId : mappingId,
		obj : item.properties.obj,
		navTitle : Alloy.Globals.selectedLanguage.supplierRegistration,
		callBackFunction : updateAddressList,
	};

	var win = Alloy.createController("ISupplier/winAddress", payload).getView();
	Alloy.Globals.openWindow(win);

});

function loadBankItems(arrDoc) {

	if (arrDoc.length == 0) {
		$.lblNoItemsBank.visible = true;
	} else {
		$.lblNoItemsBank.visible = false;
	}

	var rowData = [];
	for (var i = 0; i < arrDoc.length; i++) {

		rowData.push({
			lblRowBankAccNo : {
				font : (Alloy.isTablet) ? Alloy.Globals.path.font17 : Alloy.Globals.path.font14,
				text : arrDoc[i].bankAccName,
				color : (Alloy.Globals.currentTheme == "dark") ? "#FFF" : Alloy.Globals.path.blackColor,
				backgroundColor : "transparent"
			},
			lblRowBankName : {
				font : (Alloy.isTablet) ? Alloy.Globals.path.font17 : Alloy.Globals.path.font14,
				text : arrDoc[i].bankName,
				color : (Alloy.Globals.currentTheme == "dark") ? "#FFF" : Alloy.Globals.path.blackColor,
				backgroundColor : "transparent"
			},

			properties : {
				obj : arrDoc[i]
			}
		});

	}

	$.bankListSection.setItems(rowData);

}

$.bankTableViewItems.addEventListener("itemclick", function(e) {
	var section = $.bankTableViewItems.sections[e.sectionIndex];
	var item = section.getItemAt(e.itemIndex);

	var payload = {
		isUpdate : true,
		mappingId : mappingId,
		obj : item.properties.obj,
		navTitle : Alloy.Globals.selectedLanguage.supplierRegistration,
		callBackFunction : updateBankList,
	};

	var win = Alloy.createController("ISupplier/winAddBank", payload).getView();
	Alloy.Globals.openWindow(win);

});

function loadContactItems(arrDoc) {

	if (arrDoc.length == 0) {
		$.lblNoItemsContact.visible = true;
	} else {
		$.lblNoItemsContact.visible = false;
	}

	var rowData = [];
	for (var i = 0; i < arrDoc.length; i++) {

		rowData.push({
			lblRowContactName : {
				font : (Alloy.isTablet) ? Alloy.Globals.path.font17 : Alloy.Globals.path.font14,
				text : arrDoc[i].contactName,
				color : (Alloy.Globals.currentTheme == "dark") ? "#FFF" : Alloy.Globals.path.blackColor,
				backgroundColor : "transparent"
			},
			lblRowContactPhNo : {
				font : (Alloy.isTablet) ? Alloy.Globals.path.font17 : Alloy.Globals.path.font14,
				text : arrDoc[i].mobileNumber,
				color : (Alloy.Globals.currentTheme == "dark") ? "#FFF" : Alloy.Globals.path.blackColor,
				backgroundColor : "transparent"
			},

			properties : {
				obj : arrDoc[i]
			}
		});

	}

	$.contactListSection.setItems(rowData);

}

$.contactTableViewItems.addEventListener("itemclick", function(e) {

	if (e.itemIndex == 0) {
		return;
	}

	var section = $.contactTableViewItems.sections[e.sectionIndex];
	var item = section.getItemAt(e.itemIndex);

	//	alert(JSON.stringify(item.properties.obj));

	var payload = {
		isUpdate : true,
		mappingId : mappingId,
		contactId : contactId,
		obj : item.properties.obj,
		callBackFunction : updateContactList,
	};

	var win = Alloy.createController("ISupplier/winContact", payload).getView();
	Alloy.Globals.openWindow(win);

});

var arrActivity = [];
var arrActivitySelectedValues = [];
var arrActivityWSValues = [];
var index;

function addActivityLabel(e) {

	var obj = {
		registeredId : registerId,
		isProfile : "",
		lang : (Alloy.Globals.isEnglish) ? "ENG" : "",
	};

	httpManager.getParticularMSupplierActivityList(obj, function(e) {

		Ti.API.info('e' + JSON.stringify(e));
		if (e.length == 0) {
			return;
		}
		arrActivitySelectedValues = e;

		loadActivityItems(arrActivitySelectedValues);

	});

	return;

	Ti.API.info('add activity SV==' + JSON.stringify(e));
	Ti.API.info('add activity WS==' + JSON.stringify(e));

	var title = (Alloy.Globals.isEnglish) ? e.obj.title : e.obj.titleAr;
	arrActivitySelectedValues.push(title);
	arrActivityWSValues.push(title);
	//e.obj.value

	loadActivityItems(arrActivitySelectedValues);
	Ti.API.info('arrActivityWSValues==' + JSON.stringify(arrActivityWSValues));
	Ti.API.info('arrActivitySelectedValues==' + JSON.stringify(arrActivitySelectedValues));
}

function updateActivityLabel(e) {

	var obj = {
		registeredId : registerId,
		isProfile : "",
		lang : (Alloy.Globals.isEnglish) ? "ENG" : "",
	};

	httpManager.getParticularMSupplierActivityList(obj, function(e) {

		Ti.API.info('e' + JSON.stringify(e));
		if (e.length == 0) {
			return;
		}
		arrActivitySelectedValues = e;

		loadActivityItems(arrActivitySelectedValues);

	});

	return;

	Ti.API.info('add activity SV==' + JSON.stringify(e));
	Ti.API.info('add activity WS==' + JSON.stringify(e));

	arrActivitySelectedValues[index] = (Alloy.Globals.isEnglish) ? e.obj.title : e.obj.titleAr;
	arrActivityWSValues[index] = (Alloy.Globals.isEnglish) ? e.obj.title : e.obj.titleAr;
	//e.obj.value;
	Ti.API.info('arrActivityWSValues==' + JSON.stringify(arrActivityWSValues));
	Ti.API.info('arrActivitySelectedValues==' + JSON.stringify(arrActivitySelectedValues));

	$.activityListSection.updateItemAt(index, {

		lblRowActivityName : {
			text : arrActivitySelectedValues[index]
		},

	});
}

function openActivityWindow() {

	if (isTapped) {
		return;
	}
	isTapped = true;

	if (arrActivity.length == 0) {

		httpManager.getMSupplierActivityList(function(e) {

			Ti.API.info('e===' + JSON.stringify(e));
			if (e.length == 0) {
				isTapped = false;
				return;
			}
			arrActivity = e;

			var arrData = [];

			for (var i = 0; i < arrActivity.length; i++) {
				var title = (Alloy.Globals.isEnglish) ? arrActivity[i].title : arrActivity[i].title;
				arrData.push({
					title : arrActivity[i].title,
					titleAr : arrActivity[i].title,
					value : title,
					//	id : arrDirectorNationality[i].code,
					selected : ""
				});
			}

			var winSelection = Alloy.createController('ISupplier/winAddActivity', {
				data : arrData,
				title : "select", //Alloy.Globals.selectedLanguage.selectFederalEntity,
				callBackFunction : addActivityLabel,
				value : "",
				isUpdate : false,
				registerId : registerId,
				extensionId : "",
				isProfile : false,
			}).getView();

			Alloy.Globals.openWindow(winSelection);

			isTapped = false;

		});

	} else {
		var arrData = [];

		for (var i = 0; i < arrActivity.length; i++) {
			var title = /*(Alloy.Globals.isEnglish) ? arrActivity[i].titleEn : */
			arrActivity[i].title;
			arrData.push({
				title : arrActivity[i].title,
				titleAr : arrActivity[i].title,
				value : title,
				//	id : arrDirectorNationality[i].code,
				selected : ""
			});
		}

		var winSelection = Alloy.createController('ISupplier/winAddActivity', {
			data : arrData,
			title : Alloy.Globals.selectedLanguage.options,
			callBackFunction : addActivityLabel,
			value : "",
			isUpdate : false,
			registerId : registerId,
			extensionId : "",
			isProfile : false,
		}).getView();

		Alloy.Globals.openWindow(winSelection);

		isTapped = false;
	}

}

function loadActivityItems(arrDoc) {

	if (arrDoc.length == 0) {
		$.lblNoItemsActivity.visible = true;
	} else {
		$.lblNoItemsActivity.visible = false;
	}

	var rowData = [];
	for (var i = 0; i < arrDoc.length; i++) {

		Ti.API.info('loadActivityItems' + arrDoc[i].title);

		rowData.push({
			lblRowActivityName : {
				font : (Alloy.isTablet) ? Alloy.Globals.path.font17 : Alloy.Globals.path.font14,
				text : arrDoc[i].title,
				color : (Alloy.Globals.currentTheme == "dark") ? "#FFF" : Alloy.Globals.path.blackColor,
				backgroundColor : "transparent"
			},
			properties : {
				obj : arrDoc[i]
			}
		});

	}

	$.activityListSection.setItems(rowData);

}

$.activityTableViewItems.addEventListener("itemclick", function(e) {
	var section = $.activityTableViewItems.sections[e.sectionIndex];
	var item = section.getItemAt(e.itemIndex);

	index = e.itemIndex;
	
	
	if (e.bindId == "deleteActivityView" || e.bindId == "icnDeleteActivity") {

		var alert = Ti.UI.createAlertDialog({
			title : Alloy.Globals.selectedLanguage.iSupplier,
			message : Alloy.Globals.selectedLanguage.deleteActivity,
			buttonNames : [Alloy.Globals.selectedLanguage.ok, Alloy.Globals.selectedLanguage.cancel]
		});
		alert.addEventListener('click', function(e) {
			if (e.index == 0) {
				var obj = {
					registeredId : registerId,
					action : "DELETE",
					title : item.properties.obj.title,
					extensionId : item.properties.obj.extension,
					isProfile : false,
					lang : (Alloy.Globals.isEnglish) ? "ENG" : "",
				};

				httpManager.deleteParticularMSupplierActivity(obj, function(e) {

					Ti.API.info('e' + JSON.stringify(e));

					if (e == null) {
						return;
					}
					Ti.API.info('e.status===' + e.status);

					if (e.status == "S") {

						var alert = Ti.UI.createAlertDialog({
							title : Alloy.Globals.selectedLanguage.iSupplier,
							message : Alloy.Globals.selectedLanguage.dataSuccess,
							buttonNames : [Alloy.Globals.selectedLanguage.ok]
						});
						alert.addEventListener('click', function(e) {

							if (e.index == 0) {
								updateActivityLabel();
							}
						});
						alert.show();

					} else {
						Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.iSupplier, e.msg);
					}

				});
			} else {
				alert.hide();
			}
		});
		alert.show();

		return;
	}
	
	
	
	if (arrActivity.length == 0) {

		httpManager.getMSupplierActivityList(function(e) {

			Ti.API.info('e===' + JSON.stringify(e));
			if (e.length == 0) {
				return;
			}
			arrActivity = e;

			var arrData = [];

			for (var i = 0; i < arrActivity.length; i++) {
				var title = /*(Alloy.Globals.isEnglish) ? arrActivity[i].titleEn : */
				arrActivity[i].title;
				arrData.push({
					title : arrActivity[i].title,
					titleAr : arrActivity[i].title,
					value : title,
					id : arrActivity[i],
					selected : ""
				});
			}

			var winSelection = Alloy.createController('ISupplier/winAddActivity', {
				data : arrData,
				title : Alloy.Globals.selectedLanguage.options,
				callBackFunction : updateActivityLabel,
				value : item.lblRowActivityName.text,
				isUpdate : true,
				registerId : registerId,
				extensionId : item.properties.obj.extension,
				isProfile : false,
			}).getView();

			Alloy.Globals.openWindow(winSelection);

		});

	} else {
		var arrData = [];

		for (var i = 0; i < arrActivity.length; i++) {
			var title = /*(Alloy.Globals.isEnglish) ? arrActivity[i].titleEn : */
			arrActivity[i].title;
			arrData.push({
				title : arrActivity[i].title,
				titleAr : arrActivity[i].title,
				value : title,
				id : arrActivity[i],
				selected : ""
			});
		}

		var winSelection = Alloy.createController('ISupplier/winAddActivity', {
			data : arrData,
			title : Alloy.Globals.selectedLanguage.options,
			callBackFunction : updateActivityLabel,
			value : item.lblRowActivityName.text,
			isUpdate : true,
			registerId : registerId,
			extensionId : item.properties.obj.extension,
			isProfile : false,
		}).getView();

		Alloy.Globals.openWindow(winSelection);
	}

});

var isTapped = false;
var arrLegalEntity = [];
var selectedLegalEntity = null;

function setLegalEntityLabel(e) {
	Ti.API.info('ee===' + JSON.stringify(e));
	selectedLegalEntity = e.obj.title;
	//(Alloy.Globals.isEnglish) ? e.obj.title : e.obj.titleAr;//e.obj.value;
	//e.obj.value;
	isLegalEntitySelected = true;
	$.lblLegalEntityValue.text = e.obj.title;
	//(Alloy.Globals.isEnglish) ? e.obj.title : e.obj.titleAr;
}

function selectLegalEntity() {
	if (isTapped) {
		return;
	}
	isTapped = true;

	if (arrLegalEntity.length == 0) {

		httpManager.getMSupplierLegalEntityList(function(e) {

			Ti.API.info('e===' + JSON.stringify(e));
			if (e.length == 0) {
				isTapped = false;
				return;
			}
			arrLegalEntity = e;

			var arrData = [];

			for (var i = 0; i < arrLegalEntity.length; i++) {
				var title = /*(Alloy.Globals.isEnglish) ? arrLegalEntity[i].titleAr : */
				arrLegalEntity[i].title;
				arrData.push({
					title : arrLegalEntity[i].title,
					titleAr : arrLegalEntity[i].title,
					value : title,
					//	id : arrLegalEntity[i].code,
					selected : ""
				});
			}

			var winSelection = Alloy.createController('winSelection', {
				data : arrData,
				title : Alloy.Globals.selectedLanguage.supplierRegistration,
				callBackFunction : setLegalEntityLabel,
			}).getView();
			if (OS_IOS) {
				winSelection.open({
					modal : true
				});
			} else {
				winSelection.open();
			}

			isTapped = false;

		});

	} else {

		Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading, false);
		var arrData = [];

		for (var i = 0; i < arrLegalEntity.length; i++) {
			var title = /*(Alloy.Globals.isEnglish) ? arrLegalEntity[i].titleAr : */
			arrLegalEntity[i].title;
			arrData.push({
				title : arrLegalEntity[i].title,
				titleAr : arrLegalEntity[i].title,
				value : title,
				//	id : arrLegalEntity[i].code,
				selected : ""
			});
		}

		var winSelection = Alloy.createController('winSelection', {
			data : arrData,
			title : Alloy.Globals.selectedLanguage.supplierRegistration,
			callBackFunction : setLegalEntityLabel,
		}).getView();
		if (OS_IOS) {
			winSelection.open({
				modal : true
			});
		} else {
			winSelection.open();
		}

		Alloy.Globals.hideLoading();
		isTapped = false;
	}

}

var arrDirectorNationality = [];
var selectedDirectorNationality = null;

function setDirectorNationalityLabel(e) {
	Ti.API.info('dirextor===' + JSON.stringify(e));
	selectedDirectorNationality = e.obj.title;
	//(Alloy.Globals.isEnglish) ? e.obj.title : e.obj.titleAr;//e.obj.value;
	//e.obj.value;

	isDirectorNameSelected = true;
	$.lblGeneralDirectorValue.text = e.obj.title;
	//(Alloy.Globals.isEnglish) ? e.obj.title : e.obj.titleAr;
}

function selectGeneralDirectory() {

	if (isTapped) {
		return;
	}
	isTapped = true;

	if (arrDirectorNationality.length == 0) {

		httpManager.getMSupplierDirectorNationalityList(function(e) {

			Ti.API.info('e===' + JSON.stringify(e));
			if (e.length == 0) {
				isTapped = false;
				return;
			}
			arrDirectorNationality = e;

			var arrData = [];

			for (var i = 0; i < arrDirectorNationality.length; i++) {
				var title = /*(Alloy.Globals.isEnglish) ? arrDirectorNationality[i].titleEn : */
				arrDirectorNationality[i].title;
				arrData.push({
					title : arrDirectorNationality[i].title,
					titleAr : arrDirectorNationality[i].title,
					value : title,
					//	id : arrDirectorNationality[i].code,
					selected : ""
				});
			}

			var winSelection = Alloy.createController('winSelection', {
				data : arrData,
				title : Alloy.Globals.selectedLanguage.supplierRegistration,
				callBackFunction : setDirectorNationalityLabel,
			}).getView();
			if (OS_IOS) {
				winSelection.open({
					modal : true
				});
			} else {
				winSelection.open();
			}

			isTapped = false;

		});

	} else {

		Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading, false);
		var arrData = [];

		for (var i = 0; i < arrDirectorNationality.length; i++) {
			//	var title = arrDirectorNationality[i].name;
			var title = /*(Alloy.Globals.isEnglish) ? arrDirectorNationality[i].titleEn : */
			arrDirectorNationality[i].title;
			arrData.push({
				title : arrDirectorNationality[i].title,
				titleAr : arrDirectorNationality[i].title,
				value : title,
				//	id : arrDirectorNationality[i].code,
				selected : ""
			});
		}

		var winSelection = Alloy.createController('winSelection', {
			data : arrData,
			title : Alloy.Globals.selectedLanguage.supplierRegistration,
			callBackFunction : setDirectorNationalityLabel,
		}).getView();
		if (OS_IOS) {
			winSelection.open({
				modal : true
			});
		} else {
			winSelection.open();
		}

		Alloy.Globals.hideLoading();
		isTapped = false;
	}

}

var arrPartner = [];

function updatePartnerList() {
	//......539077
	httpManager.getMSupplierPartnersList(registerId, "", function(e) {

		Ti.API.info('e=== ' + JSON.stringify(e));
		arrPartner = e;

		loadPartnersItems(arrPartner);

	});

}

var partnership_percent_total = 0;
function openPartnerWindow() {

	//	Ti.API.info('regisss==Alloy.Globals.partnershipTotal=='+Alloy.Globals.partnershipTotal);
	if (partnership_percent_total < 100) {
		var payload = {
			isUpdate : false,
			arr : arrDirectorNationality,
			registeredId : registerId,
			obj : "",
			partnership_percent_total : partnership_percent_total,
			callBackFunction : updatePartnerList,
		};

		var win = Alloy.createController("ISupplier/winAddPartners", payload).getView();
		Alloy.Globals.openWindow(win);
	} else {
		Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.iSupplier, Alloy.Globals.selectedLanguage.cannotAddNewPartner);

	}
}

function loadPartnersItems(arrDoc) {
	partnership_percent_total = 0;
	if (arrDoc.length == 0) {
		$.lblNoItemsPartners.visible = true;
	} else {
		$.lblNoItemsPartners.visible = false;
	}

	var rowData = [];
	for (var i = 0; i < arrDoc.length; i++) {
		partnership_percent_total = parseInt(partnership_percent_total) + parseInt(arrDoc[i].partnership);
		rowData.push({
			lblRowPartnersName : {
				font : (Alloy.isTablet) ? Alloy.Globals.path.font17 : Alloy.Globals.path.font14,
				text : arrDoc[i].ownerName,
				color : (Alloy.Globals.currentTheme == "dark") ? "#FFF" : Alloy.Globals.path.blackColor,
				backgroundColor : "transparent"
			},
			lblRowPartnersNationality : {
				font : (Alloy.isTablet) ? Alloy.Globals.path.font17 : Alloy.Globals.path.font14,
				text : arrDoc[i].nationality,
				color : (Alloy.Globals.currentTheme == "dark") ? "#FFF" : Alloy.Globals.path.blackColor,
				backgroundColor : "transparent"
			},

			properties : {
				obj : arrDoc[i]
			}
		});

	}

	$.partnersListSection.setItems(rowData);

}

$.partnersTableViewItems.addEventListener("itemclick", function(e) {
	var section = $.partnersTableViewItems.sections[e.sectionIndex];
	var item = section.getItemAt(e.itemIndex);
	
	if (e.bindId == "deletePartnerView" || e.bindId == "icnDeletePartner") {

		var alert = Ti.UI.createAlertDialog({
			title : Alloy.Globals.selectedLanguage.iSupplier,
			message : Alloy.Globals.selectedLanguage.deletePartner,
			buttonNames : [Alloy.Globals.selectedLanguage.ok, Alloy.Globals.selectedLanguage.cancel]
		});
		alert.addEventListener('click', function(e) {
			if (e.index == 0) {
				var obj = {
					registerId : registerId,
					ownerName : item.properties.obj.ownerName,
					nationality : item.properties.obj.nationality,
					partnership : item.properties.obj.partnership,
					citizenPartner : item.properties.obj.citizen,
					action : "DELETE",
					extension : item.properties.obj.extension,
				};


				httpManager.deleteMSupplierPartnersDetails(obj, function(e) {

					Ti.API.info('e' + JSON.stringify(e));

					if (e == null) {
						return;
					}
					Ti.API.info('e.status===' + e.status);

					if (e.status == "S") {

						var alert = Ti.UI.createAlertDialog({
							title : Alloy.Globals.selectedLanguage.iSupplier,
							message : Alloy.Globals.selectedLanguage.dataSuccess,
							buttonNames : [Alloy.Globals.selectedLanguage.ok]
						});
						alert.addEventListener('click', function(e) {

							if (e.index == 0) {
								updatePartnerList();
							}
						});
						alert.show();

					} else {
						Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.iSupplier, e.msg);
					}

				});
			} else {
				alert.hide();
			}
		});
		alert.show();

		return;
	}
	
	
	
	var payload = {
		isUpdate : true,
		arr : arrDirectorNationality,
		registeredId : registerId,
		obj : item.properties.obj,
		partnership_percent_total : partnership_percent_total,
		callBackFunction : updatePartnerList,
	};

	var win = Alloy.createController("ISupplier/winAddPartners", payload).getView();
	Alloy.Globals.openWindow(win);

});

var arrAttachment = [];

function updateAttachmentList() {
	// registerId
	httpManager.getMSupplierAttachmentList(registerId, "", "", "", function(e) {

		Ti.API.info('e' + JSON.stringify(e));
		arrAttachment = e;

		loadAttachmentItems(arrAttachment);

	});

}

function openAttachmentsWindow() {

	var payload = {
		isUpdate : false,
		arr : arrDirectorNationality,
		registeredId : registerId,
		obj : "",
		navTitle : Alloy.Globals.selectedLanguage.supplierRegistration,
		callBackFunction : updateAttachmentList,
	};

	var win = Alloy.createController("ISupplier/winAddAttachments", payload).getView();
	Alloy.Globals.openWindow(win);

}

function loadAttachmentItems(arrDoc) {

	if (arrDoc.length == 0) {
		$.lblNoItemsAttachment.visible = true;
	} else {
		$.lblNoItemsAttachment.visible = false;
	}

	var rowData = [];
	for (var i = 0; i < arrDoc.length; i++) {

		rowData.push({
			lblRowAttachmentsTitle : {
				font : (Alloy.isTablet) ? Alloy.Globals.path.font17 : Alloy.Globals.path.font14,
				text : arrDoc[i].title,
				color : (Alloy.Globals.currentTheme == "dark") ? "#FFF" : Alloy.Globals.path.blackColor,
				backgroundColor : "transparent"
			},
			lblRowAttachmentCategory : {
				font : (Alloy.isTablet) ? Alloy.Globals.path.font17 : Alloy.Globals.path.font14,
				text : arrDoc[i].categoryName,
				color : (Alloy.Globals.currentTheme == "dark") ? "#FFF" : Alloy.Globals.path.blackColor,
				backgroundColor : "transparent"
			},

			properties : {
				obj : arrDoc[i]
			}
		});

	}

	$.attachmentListSection.setItems(rowData);

}

$.attachmentsTableViewItems.addEventListener("itemclick", function(e) {
	var section = $.attachmentsTableViewItems.sections[e.sectionIndex];
	var item = section.getItemAt(e.itemIndex);

	Ti.API.info('item.properties.obj===' + JSON.stringify(item.properties.obj));

	var title = item.properties.obj.title;

	httpManager.getMSupplierAttachmentList("", title, "", "", function(e) {

		//	Ti.API.info('e' + JSON.stringify(e));

		if (e.length == 0) {
			return;
		}

		var payload = {
			isUpdate : true,
			arr : arrDirectorNationality,
			registeredId : registerId,
			obj : e[0],
			navTitle : Alloy.Globals.selectedLanguage.supplierRegistration,
			callBackFunction : updateAttachmentList,
		};

		var win = Alloy.createController("ISupplier/winAddAttachments", payload).getView();
		Alloy.Globals.openWindow(win);

	});

});

var isSecurityQuestionSelected = false;

function secQuestionCallback() {
	//	$.txtSecQuestion.value = Alloy.Globals.selectedLanguage.doneTitle;
	//	$.txtSecQuestion.isSelected = true;
	//	$.imgSecQuestion.image = Alloy.Globals.path.icnDone;
	isSecurityQuestionSelected = true;
}

var arrSecurityQue = [];
function openSecurityWindow() {
	if (arrSecurityQue.length == 0) {
		httpManager.getAllSecurityQuestion(function(e) {
			Ti.API.info('>>>>>>>' + JSON.stringify(e));
			if (e.length == 0) {
				return;
			}
			arrSecurityQue = e;
			var winGeneralQuestion = Alloy.createController("winGeneralQuestion", {
				registerId : registerId,
				emailAddress : $.txtEmailId.value,
				arrQuestion : e,
				arrAnswer : [],
				callBack : secQuestionCallback
			}).getView();
			Alloy.Globals.openWindow(winGeneralQuestion);
		});
	} else {
		var winGeneralQuestion = Alloy.createController("winGeneralQuestion", {
			registerId : registerId,
			emailAddress : $.txtEmailId.value,
			arrQuestion : arrSecurityQue,
			arrAnswer : [],
			callBack : secQuestionCallback
		}).getView();
		Alloy.Globals.openWindow(winGeneralQuestion);
	}
}

function showStartUpAlert() {

	var alert = Ti.UI.createAlertDialog({
		title : Alloy.Globals.selectedLanguage.mSupplierReminderTitle,
		message : Alloy.Globals.selectedLanguage.mSupplierReminderMsg,
		buttonNames : [Alloy.Globals.selectedLanguage.ok]
	});
	alert.addEventListener('click', function(e) {
		if (e.index == 0) {
			alert.hide();
		}
	});
	alert.show();

	//$.winISupplierHome.close();
}

function changeLanguage() {

	setViewsWidth();

	var d = new Date(moment().add(1, 'days'));
	var day = d.getDate();
	var month = d.getMonth() + 1;

	month = parseInt(month);
	if (month < 10)
		month = '0' + month;

	var year = d.getFullYear();
	if (day < 10)
		day = '0' + day;
	var newDate1 = year + "-" + month + "-" + day;

	$.txtEmailId.value = args;

	$.lblExpiryDate1Value.text = $.lblExpiryDate2Value.text = $.lblExpiryDate3Value.text = newDate1;

	$.lblNavTitle.text = Alloy.Globals.selectedLanguage.supplierRegistration;

	$.lblBasicInfo.text = Alloy.Globals.selectedLanguage.basicInfo;
	$.lblCompanyDetails.text = Alloy.Globals.selectedLanguage.companyDetails;
	$.lblCompanyNameAr.text = Alloy.Globals.selectedLanguage.companyNameAr;
	$.lblCompanyRegNo.text = Alloy.Globals.selectedLanguage.companyRegistrationNo;
	$.lblCompanyNameEn.text = Alloy.Globals.selectedLanguage.companyNameEn;

	$.lblContactInfo.text = Alloy.Globals.selectedLanguage.contactInfo;
	//	$.lblFirstName.text = Alloy.Globals.selectedLanguage.firstName;
	$.lblEmailId.text = Alloy.Globals.selectedLanguage.emailAddress;
	$.lblContactName.text = Alloy.Globals.selectedLanguage.contactName;
	$.lblMobileNo.text = Alloy.Globals.selectedLanguage.mobileNumberColon;
	$.lblTelNo.text = Alloy.Globals.selectedLanguage.telephoneColon;

	$.lblHeaderCompanyDetails.text = Alloy.Globals.selectedLanguage.companyDetails;
	$.lblBasicClassification.text = Alloy.Globals.selectedLanguage.basicClassification;
	//	$.lblClassification.text = Alloy.Globals.selectedLanguage.classification;
	$.lblCertificate1.text = Alloy.Globals.selectedLanguage.classicCertificate1;
	$.lblExpiryDate1.text = Alloy.Globals.selectedLanguage.classicExpiryDate1;
	$.lblCertificate2.text = Alloy.Globals.selectedLanguage.classicCertificate2;
	$.lblExpiryDate2.text = Alloy.Globals.selectedLanguage.classicExpiryDate2;
	$.lblCertificate3.text = Alloy.Globals.selectedLanguage.classicCertificate3;
	$.lblExpiryDate3.text = Alloy.Globals.selectedLanguage.classicExpiryDate3;
	$.lblAddressDetails.text = Alloy.Globals.selectedLanguage.addressDetails;
	$.lblPlus.text = $.lblBankPlus.text = $.lblContactPlus.text = $.lblActivityPlus.text = $.lblPartnerPlus.text = $.lblAttachmentPlus.text = $.lblSecurityQuestionPlus.text = "(+) " + Alloy.Globals.selectedLanguage.add;
	$.lblSecAddressName.text = Alloy.Globals.selectedLanguage.addressName;
	$.lblSecAddressDetail.text = Alloy.Globals.selectedLanguage.addressDesc;

	$.lblBankDetails.text = Alloy.Globals.selectedLanguage.bankDetails;
	$.lblSecurityQuestion.text = Alloy.Globals.selectedLanguage.securityQuestion;

	$.lblSecBankAccNo.text = Alloy.Globals.selectedLanguage.bankAccNo;
	$.lblSecBankName.text = Alloy.Globals.selectedLanguage.bankName_branchName;

	$.lblContactDetails.text = Alloy.Globals.selectedLanguage.contactDetails;
	$.lblSecContactName.text = Alloy.Globals.selectedLanguage.contactName;
	$.lblSecContactPhNo.text = Alloy.Globals.selectedLanguage.mobileNumber;

	$.lblAdditionalInfo.text = Alloy.Globals.selectedLanguage.additionalInfo;
	$.lblCompanyAdditionalDetails.text = Alloy.Globals.selectedLanguage.companyAddInfo;
	$.lblLegalEntity.text = Alloy.Globals.selectedLanguage.legalEntity;
	$.lblLegalEntityValue.text = Alloy.Globals.selectedLanguage.__selectLegalEntity;
	$.lblGeneralDirector.text = Alloy.Globals.selectedLanguage.generalDirectorNationality;
	$.lblGeneralDirectorValue.text = Alloy.Globals.selectedLanguage.__selectGeneralDirectorNationality;
	$.lblGeneralDirectorName.text = Alloy.Globals.selectedLanguage.generalDirectorName;
	$.lblActivity.text = $.lblSecActivity.text = Alloy.Globals.selectedLanguage.activity;
	$.lblPartner.text = Alloy.Globals.selectedLanguage.partners;
	$.lblSecPartnerOwnerName.text = Alloy.Globals.selectedLanguage.ownerName;
	$.lblSecPartnerNationality.text = Alloy.Globals.selectedLanguage.nationality;
	$.lblAttachementsInfo.text = Alloy.Globals.selectedLanguage.attachmentDetails;
	$.lblAttachment.text = Alloy.Globals.selectedLanguage.attachments;
	$.lblSecAttachmentTitle.text = Alloy.Globals.selectedLanguage.title;
	$.lblSecAttachmentCategory.text = Alloy.Globals.selectedLanguage.categoryTitle;

	$.lblAddressMandatory.text = Alloy.Globals.selectedLanguage.addressMandatory;
	//	$.lblCompanyMandatory.text = Alloy.Globals.selectedLanguage.companyMandatory;
	$.lblBankMandatory.text = Alloy.Globals.selectedLanguage.bankMandatory;
	$.lblActivityMandatory.text = Alloy.Globals.selectedLanguage.activityMandatory;
	$.lblPartnerMandatory.text = Alloy.Globals.selectedLanguage.partnerMandatory;

	var alignment;

	if (Alloy.Globals.isEnglish) {
		alignment = Ti.UI.TEXT_ALIGNMENT_LEFT;

		$.lblMobileNo.left = $.lblTelNo.left = 5;
		$.txtMobileNo.left = $.txtTelNo.left = (Alloy.isTablet) ? "37%" : "47%";
		$.lblMobileNo.right = $.txtMobileNo.right = $.lblTelNo.right = $.txtTelNo.right = undefined;

		$.lblCompanyNameArAstrik.left = $.lblCompanyRegNoArAstrik.left = $.lblCompanyNameEnArAstrik.left = /*$.lblFirstNameAstrik.left = */
		$.lblEmailIdAstrik.left = $.lblContactNameAstrik.left = 5;
		$.lblMobileNoAstrik.left = $.lblTelNoAstrik.left = $.lblCertificate1Astrik.left = $.lblCertificate2Astrik.left = $.lblCertificate3Astrik.left = 5;
		$.lblExpiryDate1Astrik.left = $.lblExpiryDate2Astrik.left = $.lblExpiryDate3Astrik.left = $.lblLegalEntityAstrik.left = $.lblGeneralDirectorAstrik.left = $.lblGeneralDirectorNameAstrik.left = 5;
		$.lblCompanyNameArAstrik.right = $.lblCompanyRegNoArAstrik.right = $.lblCompanyNameEnArAstrik.right = /*$.lblFirstNameAstrik.right = */
		$.lblEmailIdAstrik.right = $.lblContactNameAstrik.right = undefined;
		$.lblMobileNoAstrik.right = $.lblTelNoAstrik.right = $.lblCertificate1Astrik.right = $.lblCertificate1Astrik.right = $.lblCertificate3Astrik.right = undefined;
		$.lblExpiryDate1Astrik.right = $.lblExpiryDate2Astrik.right = $.lblExpiryDate3Astrik.right = $.lblLegalEntityAstrik.right = $.lblGeneralDirectorAstrik.right = $.lblGeneralDirectorNameAstrik.right = undefined;

		$.lblAddressDetails.left = $.lblPlus.right = $.lblBankDetails.left = $.lblBankPlus.right = $.lblContactDetails.left = $.lblContactPlus.right = $.lblActivity.left = $.lblPartner.left = $.lblAttachment.left = $.lblSecurityQuestion.left = 10;
		$.lblActivityPlus.right = $.lblPartnerPlus.right = $.lblAttachmentPlus.right = $.lblSecurityQuestionPlus.right = 10;
		$.lblAddressDetails.right = $.lblBankDetails.right = $.lblContactDetails.right = $.lblActivity.right = $.lblPartner.right = $.lblAttachment.right = $.lblSecurityQuestion.right = 80;
		// $.lblPlus.left = $.lblBankPlus.left = $.lblContactPlus.left = $.lblActivityPlus.left = $.lblPartnerPlus.left = $.lblAttachmentPlus.left = 100;

		$.lblSecAddressName.left = $.lblSecBankAccNo.left = $.lblSecContactName.left = $.lblSecPartnerOwnerName.left = $.lblSecAttachmentTitle.left = "2%";
		$.lblSecAddressDetail.left = "40%";
		$.lblSecBankName.left = $.lblSecContactPhNo.left = $.lblSecPartnerNationality.left = $.lblSecAttachmentCategory.left = (Alloy.isTablet) ? "33%" : "43%";
		$.lblSecAddressDetail.right = $.lblSecBankName.right = $.lblSecContactPhNo.right = $.lblSecPartnerNationality.right = $.lblSecAttachmentCategory.right = "2%";

		$.lblSecAddressName.right = $.lblSecBankAccNo.right = $.lblSecContactName.right = $.lblSecPartnerOwnerName.right = $.lblSecPartnerNationality.right = $.lblSecAttachmentTitle.right = $.lblSecAttachmentCategory.right = undefined;
		// $.lblSecAddressDetail.right = undefined;

		$.lblPlus.textAlign = $.lblBankPlus.textAlign = $.lblContactPlus.textAlign = $.lblActivityPlus.textAlign = $.lblPartnerPlus.textAlign = $.lblAttachmentPlus.textAlign = $.lblSecurityQuestionPlus.textAlign = Ti.UI.TEXT_ALIGNMENT_RIGHT;

	} else {
		alignment = Ti.UI.TEXT_ALIGNMENT_RIGHT;

		$.lblMobileNo.right = $.lblTelNo.right = 5;
		$.txtMobileNo.right = $.txtTelNo.right = (Alloy.isTablet) ? "37%" : "47%";
		$.lblMobileNo.left = $.txtMobileNo.left = $.lblTelNo.left = $.txtTelNo.left = undefined;

		$.lblCompanyNameArAstrik.right = $.lblCompanyRegNoArAstrik.right = $.lblCompanyNameEnArAstrik.right = /*$.lblFirstNameAstrik.right = */
		$.lblEmailIdAstrik.right = $.lblContactNameAstrik.right = 5;
		$.lblMobileNoAstrik.right = $.lblTelNoAstrik.right = $.lblCertificate1Astrik.right = $.lblCertificate2Astrik.right = $.lblCertificate3Astrik.right = 5;
		$.lblExpiryDate1Astrik.right = $.lblExpiryDate2Astrik.right = $.lblExpiryDate3Astrik.right = $.lblLegalEntityAstrik.right = $.lblGeneralDirectorAstrik.right = $.lblGeneralDirectorNameAstrik.right = 5;
		$.lblCompanyNameArAstrik.left = $.lblCompanyRegNoArAstrik.left = $.lblCompanyNameEnArAstrik.left = /*$.lblFirstNameAstrik.left = */
		$.lblEmailIdAstrik.left = $.lblContactNameAstrik.left = undefined;
		$.lblMobileNoAstrik.left = $.lblTelNoAstrik.left = $.lblCertificate1Astrik.left = $.lblCertificate2Astrik.left = $.lblCertificate3Astrik.left = undefined;
		$.lblExpiryDate1Astrik.left = $.lblExpiryDate2Astrik.left = $.lblExpiryDate3Astrik.left = $.lblLegalEntityAstrik.left = $.lblGeneralDirectorAstrik.left = $.lblGeneralDirectorNameAstrik.left = undefined;

		$.lblAddressDetails.right = $.lblPlus.left = $.lblBankDetails.right = $.lblBankPlus.left = $.lblContactDetails.right = $.lblContactPlus.left = $.lblActivity.right = $.lblPartner.right = $.lblAttachment.right = $.lblSecurityQuestion.right = 10;
		$.lblActivityPlus.left = $.lblPartnerPlus.left = $.lblAttachmentPlus.left = $.lblSecurityQuestionPlus.left = 10;
		$.lblAddressDetails.left = $.lblBankDetails.left = $.lblContactDetails.left = $.lblActivity.left = $.lblPartner.left = $.lblAttachment.left = $.lblSecurityQuestion.left = 80;
		// $.lblPlus.right = $.lblBankPlus.right = $.lblContactPlus.right = $.lblActivityPlus.right = $.lblPartnerPlus.right = $.lblAttachmentPlus.right = 100;

		$.lblSecAddressName.right = $.lblSecBankAccNo.right = $.lblSecContactName.right = $.lblSecPartnerOwnerName.right = $.lblSecAttachmentTitle.right = "2%";
		$.lblSecAddressDetail.right = "40%";
		$.lblSecBankName.right = $.lblSecContactPhNo.right = $.lblSecPartnerNationality.right = $.lblSecAttachmentCategory.right = (Alloy.isTablet) ? "33%" : "43%";
		$.lblSecAddressDetail.left = $.lblSecBankName.left = $.lblSecContactPhNo.left = "2%";

		$.lblSecAddressName.left = $.lblSecBankAccNo.left = $.lblSecContactName.left = $.lblSecPartnerOwnerName.left = $.lblSecPartnerNationality.left = $.lblSecAttachmentTitle.left = $.lblSecAttachmentCategory.left = undefined;
		// $.lblSecAddressDetail.left = undefined;

		$.lblPlus.textAlign = $.lblBankPlus.textAlign = $.lblContactPlus.textAlign = $.lblActivityPlus.textAlign = $.lblPartnerPlus.textAlign = $.lblAttachmentPlus.textAlign = $.lblSecurityQuestionPlus.textAlign = Ti.UI.TEXT_ALIGNMENT_LEFT;
	}

	$.lblBasicInfo.textAlign = $.lblCompanyDetails.textAlign = $.lblCompanyNameAr.textAlign = $.lblCompanyRegNo.textAlign = $.lblCompanyNameEn.textAlign = alignment;
	$.txtCompanyNameAr.textAlign = $.txtCompanyRegNo.textAlign = $.txtCompanyNameEn.textAlign = $.lblHeaderCompanyDetails.textAlign = $.lblBasicClassification.textAlign = /*$.lblClassification.textAlign = */alignment;
	$.lblContactInfo.textAlign = /*$.lblFirstName.textAlign = */
	$.lblEmailId.textAlign = $.lblContactName.textAlign = /*$.txtFirstName.textAlign = */
	$.txtEmailId.textAlign = $.txtContactName.textAlign = alignment;
	$.lblMobileNo.textAlign = $.txtMobileNo.textAlign = $.lblTelNo.textAlign = $.txtTelNo.textAlign = $.lblActivityMandatory.textAlign = $.lblPartnerMandatory.textAlign = alignment;
	$.lblLegalEntity.textAlign = $.lblLegalEntityValue.textAlign = $.lblGeneralDirector.textAlign = $.lblGeneralDirectorValue.textAlign = $.lblGeneralDirectorName.textAlign = $.txtGeneralDirectorName.textAlign = alignment;
	$.lblCertificate1.textAlign = $.txtCertificate1.textAlign = $.lblExpiryDate1.textAlign = $.lblExpiryDate1Value.textAlign = alignment;
	$.lblCertificate2.textAlign = $.txtCertificate2.textAlign = $.lblExpiryDate2.textAlign = $.lblExpiryDate2Value.textAlign = alignment;
	$.lblCertificate3.textAlign = $.txtCertificate3.textAlign = $.lblExpiryDate3.textAlign = $.lblExpiryDate3Value.textAlign = alignment;
	$.lblAddressDetails.textAlign = $.lblSecAddressName.textAlign = $.lblSecAddressDetail.textAlign = $.lblSecBankAccNo.textAlign = $.lblSecBankName.textAlign = alignment;
	$.lblContactDetails.textAlign = $.lblSecContactName.textAlign = $.lblSecContactPhNo.textAlign = $.lblBankDetails.textAlign = $.lblBankMandatory.textAlign = $.lblAddressMandatory.textAlign = /*$.lblCompanyMandatory.textAlign =*/alignment;
	$.lblAdditionalInfo.textAlign = $.lblCompanyAdditionalDetails.textAlign = $.lblActivity.textAlign = $.lblSecActivity.textAlign = $.lblPartner.textAlign = $.lblSecPartnerOwnerName.textAlign = $.lblSecPartnerNationality.textAlign = alignment;
	$.lblAttachementsInfo.textAlign = $.lblAttachment.textAlign = $.lblSecAttachmentTitle.textAlign = $.lblSecAttachmentCategory.textAlign = $.lblSecurityQuestion.textAlign = alignment;

	showStartUpAlert();

	//	$.view2.left = Alloy.Globals.platformHeight + density;
	//	$.view3.left = Alloy.Globals.platformHeight + density;
	//	$.view4.left = Alloy.Globals.platformHeight + density;
}

var preOrientation = undefined;
function changeOrientation(e) {
	if (preOrientation == e.orientation || e.orientation == 5) {
		return;
	}
	preOrientation = Ti.Gesture.orientation;
	setViewsWidth();
}

if (Alloy.isTablet) {
	$.winISupplierRegistration.addEventListener("focus", function(e) {
		Ti.Gesture.addEventListener("orientationchange", changeOrientation);
	});

	$.winISupplierRegistration.addEventListener("blur", function(e) {
		Ti.Gesture.removeEventListener("orientationchange", changeOrientation);
	});

}
changeLanguage();
/*
$.winISupplierRegistration.addEventListener("androidback", function() {

var alert = Ti.UI.createAlertDialog({
title : Alloy.Globals.selectedLanguage.iSupplier,
message : Alloy.Globals.selectedLanguage.exitRegistration,
buttonNames : [Alloy.Globals.selectedLanguage.ok, Alloy.Globals.selectedLanguage.cancel]
});
alert.addEventListener('click', function(e) {
if (e.index == 0) {
Alloy.Globals.closeWindow($.winISupplierRegistration);
} else {
alert.hide();
}
});
alert.show();

});

$.winISupplierRegistration.addEventListener("close", function(e) {
Alloy.Globals.arrWindows.pop();
});
*/

/**
 * Called on click of back button of android device
 * @param {Object} e
 */
$.winISupplierRegistration.addEventListener('androidback', function(e) {
	if (OS_ANDROID) {
		var alert = Ti.UI.createAlertDialog({
			title : Alloy.Globals.selectedLanguage.iSupplier,
			message : Alloy.Globals.selectedLanguage.exitRegistration,
			buttonNames : [Alloy.Globals.selectedLanguage.ok, Alloy.Globals.selectedLanguage.cancel]
		});
		alert.addEventListener('click', function(e) {
			if (e.index == 0) {
				Alloy.Globals.closeWindow($.winISupplierRegistration);
			} else {
				alert.hide();
			}
		});
		alert.show();
	}
});

$.winISupplierRegistration.addEventListener("focus", function(e) {
	$.viewBottomToolbar.setDefaultTheme($.winISupplierRegistration);
});
$.viewBottomToolbar.setDefaultTheme($.winISupplierRegistration);

/**
 * Adding the eventlistener for the bottom bar view
 *
 * @param {Object} e
 */
$.viewBottomToolbar.getView().addEventListener('click', function(e) {
	if (e.source.buttonId == 'btnFontChange') {
		$.viewBottomToolbar.changeFont($.winISupplierRegistration);
	} else if (e.source.buttonId == 'btnSystemFeedback') {
		$.viewBottomToolbar.openFeedbackScreen(e);
	} else if (e.source.buttonId == 'btnSystemInstruction') {
		$.viewInstructions.openHelpScreen(e);
	} else if (e.source.buttonId == 'btnSystemChangeTheme') {
		$.viewBottomToolbar.changeTheme($.winISupplierRegistration);
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

$.winISupplierRegistration.addEventListener("close", function(e) {
	Ti.App.removeEventListener('resume', resumeApp);
	Alloy.Globals.arrWindows.pop();
	$.destroy();
});

