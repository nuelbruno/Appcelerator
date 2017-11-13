var httpManager = require("httpManager");
//Alloy.createController('common/httpManager');
Ti.API.info('Edit Profile on load Params ==' + JSON.stringify(args));
var args = arguments[0] || {};
//Alloy.Globals.partnershipTotal = 0;
var doc = args.doc;

var paymentStatus = args.paymentStatus;
var noteToSupplier = args.noteToSupplier;
var supplierStatus = args.supplierStatus;

if (Alloy.Globals.isIOS7Plus) {
	//$.winPurchaseOrder.extendEdges = [Ti.UI.EXTEND_EDGE_TOP];
	$.statusBar.height = 20;
}

var isCompanyDone = true;
var isContactDone = true;
var isStep1Done = true;
var isStep2Done = false;
var isStep3Done = false;

function closeWindow() {
/*
	var alert = Ti.UI.createAlertDialog({
		title : Alloy.Globals.selectedLanguage.iSupplier,
		message : Alloy.Globals.selectedLanguage.exitRegistration,
		buttonNames : [Alloy.Globals.selectedLanguage.ok, Alloy.Globals.selectedLanguage.cancel]
	});
	alert.addEventListener('click', function(e) {
		if (e.index == 0) {
			Alloy.Globals.closeWindow($.winResumeRegistration);
		} else {
			alert.hide();
		}
	});
	alert.show();

	//$.winISupplierHome.close();
	*/
	Alloy.Globals.closeWindow($.winResumeRegistration);
}

var density = "";
if (OS_IOS) {
	density = "dp";
} else {
	density = "px";
}

function setViewsWidth() {
	Ti.API.info('Alloy.Globals.platformWidth===' + Alloy.Globals.platformWidth + density);

	if (OS_IOS) {
		if (Ti.Gesture.orientation == 3 || Ti.Gesture.orientation == 4) {

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

		} else if (Ti.Gesture.orientation == 1 || Ti.Gesture.orientation == 2) {
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
		if (Ti.Gesture.orientation == 2) {
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
		} else if (Ti.Gesture.orientation == 1) {
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
	}
}

$.winResumeRegistration.addEventListener("open", function(e) {
	// if (supplierStatus == "R") {
	// Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.iSupplier, noteToSupplier);
	// }
	Alloy.Globals.arrWindows.push($.winResumeRegistration);
//	setViewsWidth();
});

var currentViewIndex = 1;
var completedViewIndex = 1;

var showView = Ti.UI.createAnimation({
	left : 0,
	curve : Ti.UI.ANIMATION_CURVE_EASE_OUT,
	//	transform : Ti.UI.create2DMatrix().scale(0.9, 0.80),
	duration : 200,
});

var hideView = Ti.UI.createAnimation({
	left : (Alloy.Globals.platformWidth > Alloy.Globals.platformHeight) ? Alloy.Globals.platformWidth + density : Alloy.Globals.platformHeight + density,//Alloy.Globals.platformWidth + density,
	curve : Ti.UI.ANIMATION_CURVE_EASE_OUT,
	//	transform : Ti.UI.create2DMatrix().scale(0.9, 0.80),
	duration : 200,
});
$.saveBackView.visible = false;
function showView1() {
	
	Ti.API.info('1 currentViewIndex==' + currentViewIndex);
	
	$.saveBackView.visible = false;
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
			//currentViewIndex = 1;
		}, 300);

	} else if (currentViewIndex == 3) {
		$.step3View.backgroundImage = Alloy.Globals.path.icnStepDoneMiddle;
		$.lblStep3.color = Alloy.Globals.path.whiteColor;
		$.view3.animate(hideView);
	//	currentViewIndex = 2;
		var view1 = setTimeout(function() {
			$.view2.animate(hideView);
			//currentViewIndex = 1;
		}, 150);
	} else if (currentViewIndex == 2) {
		$.step2View.backgroundImage = Alloy.Globals.path.icnStepDoneMiddle;
		$.lblStep2.color = Alloy.Globals.path.whiteColor;
		$.view2.animate(hideView);
		//currentViewIndex = 1;
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

var step2Data = null;

var busReqId1;
var busReqId2;
var busReqId3;

function getStep2Data() {
	Ti.API.info('completedViewIndex==' + completedViewIndex);
	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading, false);
	httpManager.getSecondStepRegistration(mappingId, function(e) {
		Alloy.Globals.hideLoading();

		Ti.API.info('e==' + JSON.stringify(e));

		if (e == null) {
			return;
		}

		$.saveBackView.visible = true;
	
		if (e.status == "S") {
			
			isStep2Done = true;
			//	completedViewIndex = 2;

			step2Data = e;

			//	currentViewIndex = 2;

			if (completedViewIndex <= 2)
				completedViewIndex = 2;

			isDate1Selected = isDate2Selected = isDate3Selected = true;

			$.txtCertificate1.value = e.certificate1;
			$.txtCertificate2.value = e.certificate2;
			$.txtCertificate3.value = e.certificate3;

			$.lblExpiryDate1Value.text = e.expDate1;
			$.lblExpiryDate2Value.text = e.expDate2;
			$.lblExpiryDate3Value.text = e.expDate3;
			
			busReqId1 = e.busReqId1;
			busReqId2 = e.busReqId2;
			busReqId3 = e.busReqId3;

		}

		arrAddress = e.arrAddress;
		loadAddressItems(arrAddress);
		arrBank = e.arrBank;
		loadBankItems(arrBank);

		arrContact = e.arrContact;
		loadContactItems(arrContact);

		if (currentViewIndex == 4) {
			$.step4View.backgroundImage = Alloy.Globals.path.icnStepDoneMiddle;
			$.lblStep4.color = Alloy.Globals.path.whiteColor;
			$.view4.animate(hideView);
			currentViewIndex = 3;
			var view1 = setTimeout(function() {
				$.view3.animate(hideView);
				currentViewIndex = 2;
			}, 150);

		} else if (currentViewIndex == 3) {
			$.step3View.backgroundImage = Alloy.Globals.path.icnStepDoneMiddle;
			$.lblStep3.color = Alloy.Globals.path.whiteColor;
			$.view3.animate(hideView);
			currentViewIndex = 2;
		} else if (currentViewIndex == 2) {
			Ti.API.info('222');
			return;
		} else if (currentViewIndex == 1) {
			$.step1View.backgroundImage = Alloy.Globals.path.icnStepFirstDone;
			$.lblStep1.color = Alloy.Globals.path.whiteColor;
			$.view2.animate(showView);
			currentViewIndex = 2;
		}

		$.step2View.backgroundImage = Alloy.Globals.path.icnStepEditMiddle;
		$.lblStep2.color = Alloy.Globals.path.navBarColor;

		$.step2View.opacity = 1;
		//if (completedViewIndex < 1)
		//	return;

		//	showView2();

	});

}

function showView2() {
		
	Ti.API.info('2 currentViewIndex==' + currentViewIndex);
		
		
	Ti.API.info('step2Data==' + JSON.stringify(step2Data));
	if (step2Data == null) {
		getStep2Data();
	} else {
		
		$.saveBackView.visible = true;
		
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
			Ti.API.info('222');
			return;
		} else if (currentViewIndex == 1) {
			$.step1View.backgroundImage = Alloy.Globals.path.icnStepFirstDone;
			$.lblStep1.color = Alloy.Globals.path.whiteColor;
			$.view2.animate(showView);
		//	currentViewIndex = 2;
		}
		
		$.saveBackView.visible = true;
		
		$.step2View.backgroundImage = Alloy.Globals.path.icnStepEditMiddle;
		$.lblStep2.color = Alloy.Globals.path.navBarColor;
		currentViewIndex = 2;
		$.step2View.opacity = 1;

		/*if(currentViewIndex < completedViewIndex){
		 $.saveBackView.opacity = 0.5;
		 return;
		 }else{
		 $.saveBackView.opacity = 01;
		 }*/
	}

}

var step3Data = null;

function getStep3Data() {
	
	httpManager.getThirdStepRegistration(registerId, "Y", function(e) {

		Ti.API.info('e==' + JSON.stringify(e));

		if (e == null) {
			return;
		}

		//if (completedViewIndex < 1)
		//	return;

		if (e.status == "S") {
			
			$.saveBackView.visible = true;
			
			isStep3Done = true;
			//	completedViewIndex = 3;

			step3Data = e;
			if (completedViewIndex <= 3)
				completedViewIndex = 3;

			//	currentViewIndex = 3;

			isLegalEntitySelected = true;
			isDirectorNameSelected = true;
		
		
			$.lblLegalEntityValue.text = (e.legalEntity == "") ? Alloy.Globals.selectedLanguage.__selectLegalEntity : e.legalEntity;
			selectedLegalEntity = e.legalEntity;
			$.lblGeneralDirectorValue.text = (e.generalDirector == "") ? Alloy.Globals.selectedLanguage.__selectGeneralDirectorNationality : e.generalDirector;
			selectedDirectorNationality = e.generalDirector;
			$.txtGeneralDirectorName.value = e.directorName;

			arrActivitySelectedValues = [];

			for (var i = 0; i < e.arrActivity.length; i++) {
				arrActivitySelectedValues.push(e.arrActivity[i]);
				arrActivityWSValues.push(e.arrActivity[i]);
			}

			/*	for (var i = 0; i < e.arrPartners.length; i++) {
			Alloy.Globals.partnershipTotal = e.arrPartners[i].partnership;
			}
			*/
			//	Ti.API.info('Alloy.Globals.partnershipTotal==' + Alloy.Globals.partnershipTotal);

			//	Alloy.Globals.partnershipTotal = 100;
			loadActivityItems(arrActivitySelectedValues);
			arrPartner = e.arrPartners;
			loadPartnersItems(arrPartner);
		}

		if (currentViewIndex == 4) {
			$.step4View.backgroundImage = Alloy.Globals.path.icnStepDoneMiddle;
			$.lblStep4.color = Alloy.Globals.path.whiteColor;
			$.view4.animate(hideView);
			currentViewIndex = 3;
		} else if (currentViewIndex == 3) {
			return;
		} else if (currentViewIndex == 2) {
			$.step2View.backgroundImage = Alloy.Globals.path.icnStepDoneMiddle;
			$.lblStep2.color = Alloy.Globals.path.whiteColor;
			$.view3.animate(showView);
			currentViewIndex = 3;
		} else if (currentViewIndex == 1) {
			$.step1View.backgroundImage = Alloy.Globals.path.icnStepFirstDone;
			$.lblStep1.color = Alloy.Globals.path.whiteColor;
			$.view2.animate(showView);
			currentViewIndex = 2;
			var view1 = setTimeout(function() {
				$.view3.animate(showView);
				currentViewIndex = 3;
			}, 150);
		}

		$.step3View.backgroundImage = Alloy.Globals.path.icnStepEditMiddle;
		$.lblStep3.color = Alloy.Globals.path.navBarColor;

		$.step3View.opacity = 1;

		//	showView3();

	});

}

function showView3() {
	
	Ti.API.info('3 currentViewIndex==' + currentViewIndex);
	
	if (completedViewIndex < 2)
		return;

	Ti.API.info('step3Data==' + step3Data);
	
	$.saveBackView.visible = true;
	
	if (step3Data == null) {
		getStep3Data();
	} else {

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
			//	currentViewIndex = 3;
			}, 150);
		}
		
		$.saveBackView.visible = true;
		
		$.step3View.backgroundImage = Alloy.Globals.path.icnStepEditMiddle;
		$.lblStep3.color = Alloy.Globals.path.navBarColor;
		currentViewIndex = 3;
		
		$.step3View.opacity = 1;

		/*if(currentViewIndex < completedViewIndex){
		 $.saveBackView.opacity = 0.5;
		 return;
		 }else{
		 $.saveBackView.opacity = 01;
		 }*/
	}

}

function getStep4Data() {

	httpManager.getMSupplierAttachmentList(registerId, "", "", "Y", function(e) {

		Ti.API.info('e' + JSON.stringify(e));
		// if (e.length == 0) {
		// return;
		// }
		
		$.saveBackView.visible = false;
		
		if (currentViewIndex == 4) {
			return;
		} else if (currentViewIndex == 3) {
			$.step3View.backgroundImage = Alloy.Globals.path.icnStepDoneMiddle;
			$.lblStep3.color = Alloy.Globals.path.whiteColor;
			$.view4.animate(showView);
			currentViewIndex = 4;
		} else if (currentViewIndex == 2) {
			$.step2View.backgroundImage = Alloy.Globals.path.icnStepDoneMiddle;
			$.lblStep2.color = Alloy.Globals.path.whiteColor;
			$.view3.animate(showView);
			currentViewIndex = 3;
			var view1 = setTimeout(function() {
				$.view4.animate(showView);
				currentViewIndex = 4;
			}, 150);
		} else if (currentViewIndex == 1) {
			$.step1View.backgroundImage = Alloy.Globals.path.icnStepFirstDone;
			$.lblStep1.color = Alloy.Globals.path.whiteColor;
			$.view2.animate(showView);
			currentViewIndex = 2;
			var view1 = setTimeout(function() {
				$.view3.animate(showView);
				currentViewIndex = 3;
			}, 150);
			var view2 = setTimeout(function() {
				$.view4.animate(showView);
				currentViewIndex = 4;
			}, 150);
		}

		$.step4View.backgroundImage = Alloy.Globals.path.icnStepEditMiddle;
		$.lblStep4.color = Alloy.Globals.path.navBarColor;

		$.step4View.opacity = 1;

		arrAttachment = e;

		loadAttachmentItems(arrAttachment);
		if (completedViewIndex <= 3)
			completedViewIndex = 3;

		//	showView4();

	});

}

function showView4() {
	Ti.API.info('4 currentViewIndex==' + currentViewIndex);

	if (completedViewIndex < 3)
		return;

	
	if (arrAttachment.length == 0) {
		getStep4Data();
	} else {
		
		$.saveBackView.visible = false;
		
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
		$.step4View.opacity = 1;

	}

}

var mappingId = doc.mappingID;
var contactId;
var registerId = doc.registeredID;

function updateContactList() {

	httpManager.getMSupplierContactList(mappingId, registerId, function(e) {

		Ti.API.info('e' + JSON.stringify(e));

		if (e.length == 0) {
			return;
		}

		arrContact = e;

		loadContactItems(arrContact);

	});
}

function validatePhone(phone) {
	//var regex=/^[0-9]+$/;
	var regex = /^[0-9]+$/;
	return (regex.test(phone) && (phone.length == 9) && (phone.substring(0, 2) == "05"));
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
		firstName : $.txtContactName.value,//$.txtFirstName.value,
		contactEmail : $.txtEmailId.value,
		mobileNo : $.txtMobileNo.value,
		telPhoneNo : $.txtTelNo.value,
		actionCompany : "UPDATE", //(isCompanyDone) ? "UPDATE" : "INSERT",
		actionContact : "UPDATE",//(isContactDone) ? "UPDATE" : "INSERT",
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

		//	$.step2View.opacity = 1;

			registerId = e.registerId;
			mappingId = e.mappingId;
			contactId = e.contactId;
		//	$.view2.animate(showView);

			//	showView2();

			var delay = setTimeout(function(e) {
				Ti.API.info('delayy');
				getStep2Data();
			}, 400);

			//	isStep1Done = true;

			//	isCompanyDone = true;
			//	isContactDone = true;

			//	currentViewIndex = 2;
			if (completedViewIndex <= 1)
				completedViewIndex = 1;

			updateContactList();

		} else {
			//	if(completedViewIndex <= 1)
			//		completedViewIndex = 1;

			if (e.registrationStatus == "E") {
				//	isCompanyDone = true;
				alert(e.registrationMsg);
			} else if (e.contactStatus == "E") {
				//	isContactDone = true;
				alert(e.contactMsg);
			}

		}

	});

}

var isDate1Selected = false;
var isDate2Selected = false;
var isDate3Selected = false;

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

	Ti.API.info('completedViewIndex==' + completedViewIndex);

	var obj = {
		mappingId : mappingId,
		certificateNo1 : $.txtCertificate1.value,
		expiryDate1 : $.lblExpiryDate1Value.text, //timeStamp,
		busReqId1 : busReqId1,
		certificateNo2 : $.txtCertificate2.value,
		expiryDate2 : $.lblExpiryDate2Value.text, //timeStamp,
		busReqId2 : busReqId2,
		certificateNo3 : $.txtCertificate3.value,
		expiryDate3 : $.lblExpiryDate3Value.text, //timeStamp,
		busReqId3 : busReqId3,
		action : (isStep2Done) ? "UPDATE" : "INSERT",//(isStepTwoDone) ? "UPDATE" : "INSERT",
		requestType : "UPDATE",
	};

	httpManager.registerSecondStep(obj, function(e) {

		if (e == null) {
			return;
		}

		Ti.API.info('e===' + JSON.stringify(e));

		if (e.status1 == "S" && e.status2 == "S" && e.status3 == "S") {

			// $.step2View.backgroundImage = Alloy.Globals.path.icnStepDoneMiddle;
			// $.lblStep2.color = Alloy.Globals.path.whiteColor;
			// $.step3View.backgroundImage = Alloy.Globals.path.icnStepEditMiddle;
			// $.lblStep3.color = Alloy.Globals.path.navBarColor;

		//	$.step3View.opacity = 1;

			isStep2Done = true;

			//	currentViewIndex = 3;
			if (completedViewIndex <= 2)
				completedViewIndex = 2;

			//	$.view3.animate(showView);
			//	showView3();

			var delay = setTimeout(function(e) {
				Ti.API.info('delayy');
				getStep3Data();
			}, 400);

		} else {
			//	if(completedViewIndex <= 2)
			//		completedViewIndex = 2;

			//isStepTwoDone = true;
			if (e.status1 == "E") {
				alert(e.msg1);
			} else if (e.status2 == "E") {
				alert(e.msg2);
			} else if (e.status3 == "E") {
				alert(e.msg3);
			}

		}

	});

}

var isLegalEntitySelected = false;
var isDirectorNameSelected = false;

function callWSforThirdStep() {

	$.txtGeneralDirectorName.blur();

	//	Ti.API.info('Alloy.Globals.partnershipTotal===submit' + Alloy.Globals.partnershipTotal);

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
	}
	/* else if (Alloy.Globals.partnershipTotal !== 100) {
	 Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.iSupplier, Alloy.Globals.selectedLanguage.partnerMandatory);
	 return;
	 }*/

	var obj = {
		registeredId : registerId,
		legalEntity : selectedLegalEntity, //$.lblLegalEntityValue.text,
		directorNationality : selectedDirectorNationality, //$.lblGeneralDirectorValue.text,
		directorName : $.txtGeneralDirectorName.value,
		arrActivitySelectedValues : arrActivityWSValues,
		action : (isStep3Done) ? "UPDATE" : "INSERT",
		isProfile : "Y",
		lang : (Alloy.Globals.isEnglish) ? "ENG" : "",		
	};
	
	Ti.API.info('obj=='+JSON.stringify(obj));
	
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

		//	$.step4View.opacity = 
			$.saveBackView.opacity = 1;
			//	currentViewIndex = 4;
			if (completedViewIndex <= 3)
				completedViewIndex = 3;

			//	$.view4.animate(showView);
			isStep3Done = true;
			
			var delay = setTimeout(function(e) {
				Ti.API.info('delayy');
				getStep4Data();
			}, 400);
			
		} else {

			alert(e.msg);

		}

	});

}

function showSubmitApplicationAlert(message) {
	Ti.App.Properties.setString("tokenStatus", "Expired");
	var alert = Ti.UI.createAlertDialog({
		title : Alloy.Globals.selectedLanguage.iSupplier,
		message : message,
		buttonNames : [Alloy.Globals.selectedLanguage.ok]
	});
	alert.addEventListener('click', function(e) {
		Alloy.Globals.gotoHome();
	});
	alert.show();
}

var paymentId = null;
var isOpen;

function submitForm() {

	Ti.API.info('Submit currentIndex==' + currentViewIndex);

	//	Ti.Platform.openURL('http://demoserver.tacme.net:3030/eDirhams/html/photo-purchase-details1.html');
	//					return;

	//	if (currentViewIndex < completedViewIndex) {
	//		return;
	//	}

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

		if (paymentStatus == "APPROVED" || paymentStatus == "PENDING_APPROVAL") {
			httpManager.submitMSupplierPayment(registerId, function(e) {

				Ti.API.info('e====' + JSON.stringify(e));

				if (e.length == 0) {
					return;
				} else {

					if (e[0].status == "F") {
						showSubmitApplicationAlert(e[0].msgData);
					} else {
						showSubmitApplicationAlert(e[0].msgData);
					}

				}

			});
			return;
		}

		isOpen = false;

		var obj = {
			serviceName : "mSupplier Registration",
			registerId : registerId
		};

		httpManager.getPaymentId(obj, function(e) {

			Ti.API.info('obj===' + JSON.stringify(e));

			if (e == null) {
				return;
			}

			paymentId = e.paymentId;

			if (e == null) {
				return;
			} else {

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

					var paymentUrl = "http://194.170.30.187:7001/mobipay/purchaseReview.html?languageCode=" + lan + "&id=" + e.paymentId + "&serviceCode=" + e.serviceCode + "&deviceType=" + deviceType + "&paymentType=" + "Pre-Auth";
					Ti.API.info('paymentUrl' + paymentUrl);

					Ti.Platform.openURL(paymentUrl);
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
			obj : e,
			serviceId : 6,
			isFromRenewal : false,
		};

		var win = Alloy.createController("ISupplier/winPaymentStatus", payLoad).getView();
		Alloy.Globals.openWindow(win);

	});

};

if (OS_IOS) {

	Ti.App.addEventListener('resume', function(event) {

		var delay = setTimeout(function(e) {
			var args = Ti.App.getArguments();
			Ti.API.info('Launched with resume: ' + JSON.stringify(args));

			if (args.url == "urlschemademo://?") {
				if (isOpen) {
					Ti.API.info('isOpen===if' + isOpen);
				} else {
					Ti.API.info('isOpen===else' + isOpen);
					isOpen = true;
					openTransactionDetails();
				}
			}
		}, 500);

	});
} else if (OS_ANDROID) {

	// On Android, somehow the app always opens as new
	Ti.API.info('resume android schema from the resume registration');
	Ti.API.info('Alloy.globals.url====' + Alloy.Globals.url);
	if (Alloy.Globals.url == "urlschemademo://") {
		if (isOpen) {

		} else {
			isOpen = true;
			openTransactionDetails();
		}
	}

}

function selectExpiryDate(e) {
	
	Ti.API.info('e==' + JSON.stringify(e));

	$.txtCertificate1.blur();
	$.txtCertificate2.blur();
	$.txtCertificate3.blur();

	if (e.source.obj == 1) {
		Alloy.Globals.mSupplierDatePicker($.lblExpiryDate1Value, $.winResumeRegistration);
		isDate1Selected = true;
	} else if (e.source.obj == 2) {
		Alloy.Globals.mSupplierDatePicker($.lblExpiryDate2Value, $.winResumeRegistration);
		isDate2Selected = true;
	} else {
		Alloy.Globals.mSupplierDatePicker($.lblExpiryDate3Value, $.winResumeRegistration);
		isDate3Selected = true;
	}

}

function updateAddressList() {

	httpManager.getMSupplierAddressList(mappingId, registerId, function(e) {

		Ti.API.info('e' + JSON.stringify(e));
		if (e.length == 0) {
			return;
		}
		arrAddress = e;

		loadAddressItems(arrAddress);

	});

}

function updateBankList() {
	//  "17400090"
	httpManager.getMSupplierBankList(mappingId, function(e) {

		Ti.API.info('e' + JSON.stringify(e));
		if (e.length == 0) {
			return;
		}
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

		if (arrDoc[i].addressName == "") {
			arrAddress = [];
			return;
		}

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

		if (arrDoc[i].iban == "") {
			arrBank = [];
			return;
		}
		Ti.API.info('arrDoc'+JSON.stringify(arrDoc));
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
	Ti.API.info('rowData'+JSON.stringify(rowData));
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
	
	if(e.itemIndex == 0){
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
		registeredId :registerId,
		isProfile : "Y",
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
	var title = (Alloy.Globals.isEnglish) ? e.obj.title : e.obj.titleAr;
	arrActivitySelectedValues.push(title);
	arrActivityWSValues.push(title);//;e.obj.value

	loadActivityItems(arrActivitySelectedValues);
	Ti.API.info('arrActivityWSValues==0' + JSON.stringify(arrActivityWSValues));
	Ti.API.info('arrActivitySelectedValues==' + JSON.stringify(arrActivitySelectedValues));
}

function updateActivityLabel(e) {
		
	var obj = {
		registeredId :registerId,
		isProfile : "Y",
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
		
	Ti.API.info('add activity WS==' + JSON.stringify(e));
	arrActivitySelectedValues[index] = (Alloy.Globals.isEnglish) ? e.obj.title : e.obj.titleAr;
	arrActivityWSValues[index] = (Alloy.Globals.isEnglish) ? e.obj.title : e.obj.titleAr;//e.obj.value;
	Ti.API.info('arrActivityWSValues===' + JSON.stringify(arrActivityWSValues));
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
				var title = /*(Alloy.Globals.isEnglish) ? arrActivity[i].titleEn : */
				arrActivity[i].title;
				arrData.push({
					title : arrActivity[i].title,
					titleAr : arrActivity[i].title,
					value : title,
					//	id : arrDirectorNationality[i].code,
					selected : "",
					isUpdate : false,
					registerId : registerId,
					extensionId : ""
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
				isProfile : true,
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
			isProfile : true,
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
		
		Ti.API.info('arrDoc' + arrDoc[i]);
		
		if (arrDoc[i] == "") {
			arrActivity = [];
			arrActivitySelectedValues = [];
			arrActivityWSValues = [];
			return;
		}

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
		
		return;
		
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
				isProfile : true,
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
			isProfile : true,
		}).getView();

		Alloy.Globals.openWindow(winSelection);
	}

});

var isTapped = false;
var arrLegalEntity = [];
var selectedLegalEntity = null;

function setLegalEntityLabel(e) {
	Ti.API.info('ee===' + JSON.stringify(e));
	selectedLegalEntity = e.obj.title;//(Alloy.Globals.isEnglish) ? e.obj.title : e.obj.titleAr;//e.obj.value;
	isLegalEntitySelected = true;
	$.lblLegalEntityValue.text = e.obj.title;//(Alloy.Globals.isEnglish) ? e.obj.title : e.obj.titleAr;
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
				var title = /*(Alloy.Globals.isEnglish) ? arrLegalEntity[i].titleEn : */
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
	selectedDirectorNationality = e.obj.title;//(Alloy.Globals.isEnglish) ? e.obj.title : e.obj.titleAr;//e.obj.value;

	isDirectorNameSelected = true;
	$.lblGeneralDirectorValue.text = e.obj.title;//(Alloy.Globals.isEnglish) ? e.obj.title : e.obj.titleAr;
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
			var title = arrDirectorNationality[i].name;
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

	httpManager.getMSupplierPartnersList(registerId, "Y", function(e) {

		Ti.API.info('e=== ' + JSON.stringify(e));

		if (e.length == 0) {
			return;
		}
		arrPartner = e;

		loadPartnersItems(arrPartner);

	});

}
var partnership_percent_total = 0;
function openPartnerWindow() {
	//	Ti.API.info('resume==Alloy.Globals.partnershipTotal=='+Alloy.Globals.partnershipTotal);
	if(partnership_percent_total <100)
	{
		var payload = {
			isUpdate : false,
			arr : arrDirectorNationality,
			registeredId : registerId,
			obj : "",
			partnership_percent_total:partnership_percent_total,
			callBackFunction : updatePartnerList,
		};
	
		var win = Alloy.createController("ISupplier/winAddPartners", payload).getView();
		Alloy.Globals.openWindow(win);
	}
	else
	{
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
		
		return;
		
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
		partnership_percent_total:partnership_percent_total,
		callBackFunction : updatePartnerList,
	};

	var win = Alloy.createController("ISupplier/winAddPartners", payload).getView();
	Alloy.Globals.openWindow(win);

});

var arrAttachment = [];

function updateAttachmentList() {
	// registerId
	httpManager.getMSupplierAttachmentList(registerId, "", "", "Y", function(e) {

		Ti.API.info('e' + JSON.stringify(e));
		if (e.length == 0) {
			return;
		}

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

	httpManager.getMSupplierAttachmentList("", title, "", "Y", function(e) {

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

var isSecurityQuestionSelected = true;
//false; in edit profile we disabled the security question options.ramesh Mar 31,2015.

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
				callBack : secQuestionCallback
			}).getView();
			Alloy.Globals.openWindow(winGeneralQuestion);
		});
	} else {
		var winGeneralQuestion = Alloy.createController("winGeneralQuestion", {
			isFromMSupplier : true,
			registerId : registerId,
			emailAddress : $.txtEmailId.value,
			arrQuestion : arrSecurityQue,
			callBack : secQuestionCallback
		}).getView();
		Alloy.Globals.openWindow(winGeneralQuestion);
	}
}

function changeLanguage() {
	
	setViewsWidth();
	
	var d = new Date();
	var day = d.getDate();
	var month = d.getMonth() + 1;
	var year = d.getFullYear();
	if (day < 10)
		day = '0' + day;
	var newDate1 = year + "-" + month + "-" + day;
	
	$.txtCompanyNameAr.value = (doc.supplierNameAr == "") ? "--" : doc.supplierNameAr;
	$.txtCompanyRegNo.value = $.txtCertificate2.value = (doc.registrationNumber == "") ? "--" : doc.registrationNumber;
	$.txtCompanyNameEn.value = (doc.supplierNameEn == "") ? "--" : doc.supplierNameEn;
//	$.txtFirstName.value = (doc.firstName == "") ? "--" : doc.firstName;
	$.txtEmailId.value = (doc.emailId == "") ? "--" : doc.emailId;
	$.txtContactName.value = (doc.contactName == "") ? "--" : doc.contactName;
	$.txtMobileNo.value = (doc.mobileNo == "") ? "--" : doc.mobileNo;
	$.txtTelNo.value = (doc.telPhoneNo == "") ? "--" : doc.telPhoneNo;

	$.lblExpiryDate1Value.text = $.lblExpiryDate2Value.text = $.lblExpiryDate3Value.text = newDate1;

	$.lblNavTitle.text = Alloy.Globals.selectedLanguage.profile;

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
	$.lblSecurityQuestion.text = Alloy.Globals.selectedLanguage.securityQuestion;
	$.lblBankDetails.text = Alloy.Globals.selectedLanguage.bankDetails;

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
	$.lblBankMandatory.text = Alloy.Globals.selectedLanguage.bankMandatory;
	$.lblActivityMandatory.text = Alloy.Globals.selectedLanguage.activityMandatory;
	$.lblPartnerMandatory.text = Alloy.Globals.selectedLanguage.partnerMandatory;

	var alignment;

	if (Alloy.Globals.isEnglish) {
		alignment = Ti.UI.TEXT_ALIGNMENT_LEFT;

		$.lblMobileNo.left = $.lblTelNo.left = 5;
		$.txtMobileNo.left = $.txtTelNo.left = (Alloy.isTablet) ? "37%" : "47%";
		$.lblMobileNo.right = $.txtMobileNo.right = $.lblTelNo.right = $.txtTelNo.right = undefined;

		$.lblCompanyNameArAstrik.left = $.lblCompanyRegNoArAstrik.left = $.lblCompanyNameEnArAstrik.left = /*$.lblFirstNameAstrik.left = */$.lblEmailIdAstrik.left = $.lblContactNameAstrik.left = 5;
		$.lblMobileNoAstrik.left = $.lblTelNoAstrik.left = $.lblCertificate1Astrik.left = $.lblCertificate2Astrik.left = $.lblCertificate3Astrik.left = 5;
		$.lblExpiryDate1Astrik.left = $.lblExpiryDate2Astrik.left = $.lblExpiryDate3Astrik.left = $.lblLegalEntityAstrik.left = $.lblGeneralDirectorAstrik.left = $.lblGeneralDirectorNameAstrik.left = 5;
		$.lblCompanyNameArAstrik.right = $.lblCompanyRegNoArAstrik.right = $.lblCompanyNameEnArAstrik.right = /*$.lblFirstNameAstrik.right = */$.lblEmailIdAstrik.right = $.lblContactNameAstrik.right = undefined;
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

		$.lblCompanyNameArAstrik.right = $.lblCompanyRegNoArAstrik.right = $.lblCompanyNameEnArAstrik.right = /*$.lblFirstNameAstrik.right = */$.lblEmailIdAstrik.right = $.lblContactNameAstrik.right = 5;
		$.lblMobileNoAstrik.right = $.lblTelNoAstrik.right = $.lblCertificate1Astrik.right = $.lblCertificate2Astrik.right = $.lblCertificate3Astrik.right = 5;
		$.lblExpiryDate1Astrik.right = $.lblExpiryDate2Astrik.right = $.lblExpiryDate3Astrik.right = $.lblLegalEntityAstrik.right = $.lblGeneralDirectorAstrik.right = $.lblGeneralDirectorNameAstrik.right = 5;
		$.lblCompanyNameArAstrik.left = $.lblCompanyRegNoArAstrik.left = $.lblCompanyNameEnArAstrik.left = /*$.lblFirstNameAstrik.left = */$.lblEmailIdAstrik.left = $.lblContactNameAstrik.left = undefined;
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
	$.lblContactInfo.textAlign = /*$.lblFirstName.textAlign = */$.lblEmailId.textAlign = $.lblContactName.textAlign = /*$.txtFirstName.textAlign = */$.txtEmailId.textAlign = $.txtContactName.textAlign = alignment;
	$.lblMobileNo.textAlign = $.txtMobileNo.textAlign = $.lblTelNo.textAlign = $.txtTelNo.textAlign = $.lblActivityMandatory.textAlign = $.lblPartnerMandatory.textAlign = alignment;
	$.lblLegalEntity.textAlign = $.lblLegalEntityValue.textAlign = $.lblGeneralDirector.textAlign = $.lblGeneralDirectorValue.textAlign = $.lblGeneralDirectorName.textAlign = $.txtGeneralDirectorName.textAlign = alignment;
	$.lblCertificate1.textAlign = $.txtCertificate1.textAlign = $.lblExpiryDate1.textAlign = $.lblExpiryDate1Value.textAlign = alignment;
	$.lblCertificate2.textAlign = $.txtCertificate2.textAlign = $.lblExpiryDate2.textAlign = $.lblExpiryDate2Value.textAlign = alignment;
	$.lblCertificate3.textAlign = $.txtCertificate3.textAlign = $.lblExpiryDate3.textAlign = $.lblExpiryDate3Value.textAlign = alignment;
	$.lblAddressDetails.textAlign = $.lblSecAddressName.textAlign = $.lblSecAddressDetail.textAlign = $.lblSecBankAccNo.textAlign = $.lblSecBankName.textAlign = alignment;
	$.lblContactDetails.textAlign = $.lblSecContactName.textAlign = $.lblSecContactPhNo.textAlign = $.lblBankDetails.textAlign = $.lblBankMandatory.textAlign = $.lblAddressMandatory.textAlign = alignment;
	$.lblAdditionalInfo.textAlign = $.lblCompanyAdditionalDetails.textAlign = $.lblActivity.textAlign = $.lblSecActivity.textAlign = $.lblPartner.textAlign = $.lblSecPartnerOwnerName.textAlign = $.lblSecPartnerNationality.textAlign = alignment;
	$.lblAttachementsInfo.textAlign = $.lblAttachment.textAlign = $.lblSecAttachmentTitle.textAlign = $.lblSecAttachmentCategory.textAlign = alignment;

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

	$.winResumeRegistration.addEventListener("blur", function(e) {
		Ti.Gesture.removeEventListener("orientationchange", changeOrientation);
	});

}
changeLanguage();

$.winResumeRegistration.addEventListener("androidback", function() {
/*
	var alert = Ti.UI.createAlertDialog({
		title : Alloy.Globals.selectedLanguage.iSupplier,
		message : Alloy.Globals.selectedLanguage.exitRegistration,
		buttonNames : [Alloy.Globals.selectedLanguage.ok, Alloy.Globals.selectedLanguage.cancel]
	});
	alert.addEventListener('click', function(e) {
		if (e.index == 0) {
			Alloy.Globals.closeWindow($.winResumeRegistration);
		} else {
			alert.hide();
		}
	});
	alert.show();
*/
Alloy.Globals.closeWindow($.winResumeRegistration);
});

$.winResumeRegistration.addEventListener("focus", function(e) {
	if (Alloy.isTablet) {
		Ti.Gesture.addEventListener("orientationchange", changeOrientation);
	}
	$.viewBottomToolbar.setDefaultTheme($.winResumeRegistration);
});
$.viewBottomToolbar.setDefaultTheme($.winResumeRegistration);

/**
 * Adding the eventlistener for the bottom bar view
 *
 * @param {Object} e
 */
$.viewBottomToolbar.getView().addEventListener('click', function(e) {
	if (e.source.buttonId == 'btnFontChange') {
		$.viewBottomToolbar.changeFont($.winResumeRegistration);
	} else if (e.source.buttonId == 'btnSystemFeedback') {
		$.viewBottomToolbar.openFeedbackScreen(e);
	} else if (e.source.buttonId == 'btnSystemChangeTheme') {
		$.viewBottomToolbar.changeTheme($.winResumeRegistration);
	}
});

/**
 * Called on open of the window
 *
 * @param {Object} e
 */
var windowOpened = function(e) {
	Alloy.Globals.arrWindows.push($.winResumeRegistration);
	//	showQuestion();
	$.viewBottomToolbar.setOptions({
		showInstructions : false,
		showFeedBack : true,
		showFontResize : true
	});
};

/**
 * Window closed
 *
 * @param {Object} e
 */
var windowClosed = function(e) {
	Alloy.Globals.arrWindows.pop();
	$.destroy();
};
