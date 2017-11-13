var httpManager = require("httpManager");
//Alloy.createController('common/httpManager');

var args = arguments[0] || {};

if (Alloy.Globals.isIOS7Plus) {
	$.statusBar.height = 20;
}
var loginDetail = Ti.App.Properties.getObject("LoginDetaisObj");

var density = "";
if (OS_IOS) {
	density = "dp";
} else {
	density = "px";
}

function changeLanguage() {

	var d = new Date();
	var day = d.getDate();
	var month = d.getMonth() + 1;
	var year = d.getFullYear();

	if (day < 10)
		day = '0' + day;
	var newDate1 = year + "-" + month + "-" + day;

	$.lblExpiryDate1Value.text = $.lblExpiryDate2Value.text = $.lblExpiryDate3Value.text = newDate1;

	$.lblNavTitle.text = Alloy.Globals.selectedLanguage.renewal;

	$.btnSave.title = Alloy.Globals.selectedLanguage.saveTitle;

	$.lblHeaderCompanyDetails.text = Alloy.Globals.selectedLanguage.companyDetails;
	$.lblBasicClassification.text = Alloy.Globals.selectedLanguage.basicClassification;
	//	$.lblClassification.text = Alloy.Globals.selectedLanguage.classification;
	$.lblCertificate1.text = Alloy.Globals.selectedLanguage.classicCertificate1;
	$.lblExpiryDate1.text = Alloy.Globals.selectedLanguage.classicExpiryDate1;
	$.lblCertificate2.text = Alloy.Globals.selectedLanguage.classicCertificate2;
	$.lblExpiryDate2.text = Alloy.Globals.selectedLanguage.classicExpiryDate2;
	$.lblCertificate3.text = Alloy.Globals.selectedLanguage.classicCertificate3;
	$.lblExpiryDate3.text = Alloy.Globals.selectedLanguage.classicExpiryDate3;
	// $.lblAddressDetails.text = Alloy.Globals.selectedLanguage.addressDetails;
	// $.lblPlus.text = $.lblBankPlus.text = $.lblContactPlus.text = "(+)";
	// $.lblSecAddressName.text = Alloy.Globals.selectedLanguage.addressName;
	// $.lblSecAddressDetail.text = Alloy.Globals.selectedLanguage.addressDesc;
	// $.lblBankDetails.text = Alloy.Globals.selectedLanguage.bankDetails;
	// $.lblSecBankAccNo.text = Alloy.Globals.selectedLanguage.bankAccNo;
	// $.lblSecBankName.text = Alloy.Globals.selectedLanguage.bankName_branchName;
	// $.lblContactDetails.text = Alloy.Globals.selectedLanguage.contactDetails;
	// $.lblSecContactName.text = Alloy.Globals.selectedLanguage.contactName;
	// $.lblSecContactPhNo.text = Alloy.Globals.selectedLanguage.mobileNumber;

	$.lblAttachementsInfo.text = Alloy.Globals.selectedLanguage.attachmentDetails;
	$.lblAttachment.text = Alloy.Globals.selectedLanguage.attachments;
	$.lblSecAttachmentTitle.text = Alloy.Globals.selectedLanguage.title;
	$.lblSecAttachmentCategory.text = Alloy.Globals.selectedLanguage.categoryTitle;
	$.lblAttachmentPlus.text = "(+)";

	var alignment;

	if (Alloy.Globals.isEnglish) {
		alignment = Ti.UI.TEXT_ALIGNMENT_LEFT;

		//$.lblAddressDetails.left = $.lblPlus.right = $.lblBankDetails.left = $.lblBankPlus.right = $.lblContactDetails.left = $.lblContactPlus.right = 10;
		// $.lblAddressDetails.right = $.lblBankDetails.right = $.lblContactDetails.right = 80;

		// $.lblSecAddressName.left = $.lblSecBankAccNo.left = $.lblSecContactName.left = "2%";
		// $.lblSecAddressDetail.left = "33%";
		// $.lblSecBankName.left = $.lblSecContactPhNo.left = (Alloy.isTablet) ? "33%" : "43%";
		// $.lblSecAddressDetail.right = $.lblSecBankName.right = $.lblSecContactPhNo.right = "2%";

		// $.lblSecAddressName.right = $.lblSecBankAccNo.right = $.lblSecContactName.right = undefined;
		// $.lblSecAddressDetail.right = undefined;

		// $.lblPlus.textAlign = $.lblBankPlus.textAlign = $.lblContactPlus.textAlign = Ti.UI.TEXT_ALIGNMENT_RIGHT;

		//Attachment
		$.lblSecAttachmentTitle.left = "2%";
		$.lblSecAttachmentCategory.left = (Alloy.isTablet) ? "33%" : "43%";
		$.lblAttachment.left = 10;
		$.lblAttachment.right = 80;
		$.lblAttachmentPlus.right = 10;
		$.lblAttachmentPlus.textAlign = Ti.UI.TEXT_ALIGNMENT_RIGHT;

	} else {
		alignment = Ti.UI.TEXT_ALIGNMENT_RIGHT;

		// $.lblAddressDetails.right = $.lblPlus.left = $.lblBankDetails.right = $.lblBankPlus.left = $.lblContactDetails.right = $.lblContactPlus.left = 10;
		// $.lblAddressDetails.left = $.lblBankDetails.left = $.lblContactDetails.left = 80;
		// $.lblSecAddressName.right = $.lblSecBankAccNo.right = $.lblSecContactName.right = "2%";
		// $.lblSecAddressDetail.right = "33%";
		// $.lblSecBankName.right = $.lblSecContactPhNo.right = (Alloy.isTablet) ? "33%" : "43%";
		// $.lblSecAddressDetail.left = $.lblSecBankName.left = $.lblSecContactPhNo.left = "2%";
		//
		// $.lblSecAddressName.left = $.lblSecBankAccNo.left = $.lblSecContactName.left = undefined;
		// $.lblSecAddressDetail.left = undefined;

		// $.lblPlus.textAlign = $.lblBankPlus.textAlign = $.lblContactPlus.textAlign = Ti.UI.TEXT_ALIGNMENT_LEFT;

		//Attachment
		$.lblSecAttachmentTitle.right = "2%";
		$.lblSecAttachmentCategory.right = (Alloy.isTablet) ? "33%" : "43%";
		$.lblAttachment.right = 10;
		$.lblAttachment.left = 80;
		$.lblAttachmentPlus.left = 10;
		$.lblAttachmentPlus.textAlign = Ti.UI.TEXT_ALIGNMENT_LEFT;
	}

	// $.lblAddressDetails.textAlign = $.lblSecAddressName.textAlign = $.lblSecAddressDetail.textAlign = $.lblSecBankAccNo.textAlign = $.lblSecBankName.textAlign = alignment;
	// $.lblContactDetails.textAlign = $.lblSecContactName.textAlign = $.lblSecContactPhNo.textAlign = alignment;
	$.lblHeaderCompanyDetails.textAlign = $.lblBasicClassification.textAlign = /*$.lblClassification.textAlign = */alignment;
	$.lblCertificate1.textAlign = $.lblCertificate2.textAlign = $.lblCertificate3.textAlign = alignment;
	$.txtCertificate1.textAlign = $.txtCertificate2.textAlign = $.txtCertificate3.textAlign = alignment;
	$.lblExpiryDate1.textAlign = $.lblExpiryDate2.textAlign = $.lblExpiryDate3.textAlign = alignment;
	$.lblExpiryDate1Value.textAlign = $.lblExpiryDate2Value.textAlign = $.lblExpiryDate3Value.textAlign = alignment;
	$.lblAttachementsInfo.textAlign = $.lblAttachment.textAlign = alignment;
}

function setViewsWidth() {
	if (OS_IOS) {
		if (Ti.Gesture.orientation == 3 || Ti.Gesture.orientation == 4) {
			$.view2.width = Alloy.Globals.platformHeight + density;
		} else if (Ti.Gesture.orientation == 1 || Ti.Gesture.orientation == 2) {
			$.view2.width = Alloy.Globals.platformWidth + density;
		}
	} else {
		if (Ti.Gesture.orientation == 2) {
			$.view2.width = Alloy.Globals.platformHeight + density;
		} else if (Ti.Gesture.orientation == 1) {
			$.view2.width = Alloy.Globals.platformWidth + density;
		}
	}
}

function selectExpiryDate(e) {

	Alloy.Globals.mSupplierDatePicker(e.source, $.winBusinessClassification);
	if (e.source.obj == 1) {
		isDate1Selected = true;
	} else if (e.source.obj == 2) {
		isDate2Selected = true;
	} else {
		isDate3Selected = true;
	}

}

var mappingId = loginDetail.general_Profile.isupplierMappingId;
var contactId = 1;
var registerId = loginDetail.general_Profile.isupplierRegisterId;

/*
 function updateContactList() {

 httpManager.getMSupplierContactList(mappingId, registerId, function(e) {

 Ti.API.info('e' + JSON.stringify(e));
 arrContact = e;

 loadContactItems(arrContact);

 });
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
 navTitle : Alloy.Globals.selectedLanguage.renewal,
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
 navTitle : Alloy.Globals.selectedLanguage.renewal,
 callBackFunction : updateBankList,
 };

 var win = Alloy.createController("ISupplier/winAddBank", payload).getView();
 Alloy.Globals.openWindow(win);

 }

 function openContactWindow() {

 return;

 var payload = {
 isUpdate : false,
 mappingId : mappingId,
 contactId : contactId,
 obj : "",
 navTitle : Alloy.Globals.selectedLanguage.renewal,
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
 text : arrDoc[i].addressName,
 },
 lblRowAddressDetail : {
 text : arrDoc[i].addressLine1 + arrDoc[i].addressLine2,
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
 navTitle : Alloy.Globals.selectedLanguage.renewal,
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
 text : arrDoc[i].bankAccName,
 },
 lblRowBankName : {
 text : arrDoc[i].bankName,
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
 navTitle : Alloy.Globals.selectedLanguage.renewal,
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
 text : arrDoc[i].contactName,
 },
 lblRowContactPhNo : {
 text : arrDoc[i].mobileNumber,
 },

 properties : {
 obj : arrDoc[i]
 }
 });

 }

 $.contactListSection.setItems(rowData);

 }

 $.contactTableViewItems.addEventListener("itemclick", function(e) {
 var section = $.contactTableViewItems.sections[e.sectionIndex];
 var item = section.getItemAt(e.itemIndex);

 //	alert(JSON.stringify(item.properties.obj));

 var payload = {
 isUpdate : true,
 mappingId : mappingId,
 contactId : contactId,
 obj : item.properties.obj,
 navTitle : Alloy.Globals.selectedLanguage.renewal,
 callBackFunction : updateContactList,
 };

 var win = Alloy.createController("ISupplier/winContact", payload).getView();
 Alloy.Globals.openWindow(win);

 });*/

var isDate1Selected = false;
var isDate2Selected = false;
var isDate3Selected = false;

var successAlert = Ti.UI.createAlertDialog({
	title : Alloy.Globals.selectedLanguage.renewal,
	message : Alloy.Globals.selectedLanguage.dataSuccess,
	buttonNames : [Alloy.Globals.selectedLanguage.ok]
});
successAlert.addEventListener("click", function() {
	closeWindow();
});

var busReqId1;
var busReqId2;
var busReqId3;

function saveBusinessInfo() {

	if ($.txtCertificate1.value.trim().length == 0) {
		Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.renewal, Alloy.Globals.selectedLanguage.enterCerNo1);
		return;
	} else if (!isDate1Selected) {
		Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.renewal, Alloy.Globals.selectedLanguage.enterExp1);
		return;
	} else if ($.txtCertificate2.value.trim().length == 0) {
		Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.renewal, Alloy.Globals.selectedLanguage.enterCerNo2);
		return;
	} else if (!isDate2Selected) {
		Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.renewal, Alloy.Globals.selectedLanguage.enterExp2);
		return;
	} else if ($.txtCertificate3.value.trim().length == 0) {
		Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.renewal, Alloy.Globals.selectedLanguage.enterCerNo3);
		return;
	} else if (!isDate3Selected) {
		Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.renewal, Alloy.Globals.selectedLanguage.enterExp3);
		return;
	}

	var obj = {
		mappingId : mappingId, //args.mappingId,
		certificateNo1 : $.txtCertificate1.value,
		expiryDate1 : $.lblExpiryDate1Value.text, //timeStamp,
		busReqId1 : busReqId1,
		certificateNo2 : $.txtCertificate2.value,
		expiryDate2 : $.lblExpiryDate2Value.text, //timeStamp,
		busReqId2 : busReqId2,
		certificateNo3 : $.txtCertificate3.value,
		expiryDate3 : $.lblExpiryDate3Value.text, //timeStamp,
		busReqId3 : busReqId3,
		action : "UPDATE",
		requestType : "UPDATE",
	};

	httpManager.registerSecondStep(obj, function(e) {

		if (e == null) {
			return;
		}

		Ti.API.info('e===' + JSON.stringify(e));

		if (e.status1 == "S" && e.status2 == "S" && e.status3 == "S") {
			// Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.renewal, Alloy.Globals.selectedLanguage.dataSuccess);
			successAlert.show();
		} else {
			isStepTwoDone = true;
			if (e.status1 == "E") {
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.renewal, e.msg1);
			//	alert(e.msg1);
			} else if (e.status2 == "E") {
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.renewal, e.msg2);
			//	alert(e.msg2);
			} else if (e.status3 == "E") {
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.renewal, e.msg3);
			//	alert(e.msg3);
			}

		}

	});
}

var arrAttachment = [];

function updateAttachmentList() {
	// registerId
	httpManager.getMSupplierAttachmentList(registerId, "", "Existing User", "", function(e) {

		Ti.API.info('e' + JSON.stringify(e));
		Alloy.Globals.hideLoading();

		arrAttachment = e;

		loadAttachmentItems(arrAttachment);

	});

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
				text : arrDoc[i].title,
				font : (Alloy.isTablet) ? Alloy.Globals.path.font17 : Alloy.Globals.path.font14,
				color : (Alloy.Globals.currentTheme == "dark") ? "#FFF" : "#000"
			},
			lblRowAttachmentCategory : {
				text : arrDoc[i].categoryName,
				font : (Alloy.isTablet) ? Alloy.Globals.path.font17 : Alloy.Globals.path.font14,
				color : (Alloy.Globals.currentTheme == "dark") ? "#FFF" : "#000"
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

	var title = item.properties.obj.title;

	httpManager.getMSupplierAttachmentList("", title, "Existing User", "", function(e) {

		//	Ti.API.info('e' + JSON.stringify(e));

		if (e.length == 0) {
			return;
		}

		var payload = {
			isUpdate : true,
			arr : [],
			registeredId : registerId,
			obj : e[0],
			navTitle : Alloy.Globals.selectedLanguage.renewal,
			callBackFunction : updateAttachmentList,
		};

		var win = Alloy.createController("ISupplier/winAddAttachments", payload).getView();
		Alloy.Globals.openWindow(win);

	});

});

var isDate1Selected = false;
var isDate2Selected = false;
var isDate3Selected = false;

function getBsuinessInfo() {
	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading, false);
	httpManager.getSecondStepRegistration(mappingId, function(e) {

		updateAttachmentList();

		Ti.API.info('e==' + JSON.stringify(e));
		if (e == null) {
			return;
		}

		if (e.status == "S") {
			isDate1Selected = isDate2Selected = isDate3Selected = true;
			setClassificationInfo(e);
		}

		/*completedViewIndex = 2;
		 isDate1Selected = isDate2Selected = isDate3Selected = true;

		 $.txtCertificate1.value = e.certificate1;
		 $.txtCertificate2.value = e.certificate2;
		 $.txtCertificate3.value = e.certificate3;

		 $.lblExpiryDate1Value.text = e.expDate1;
		 $.lblExpiryDate2Value.text = e.expDate2;
		 $.lblExpiryDate3Value.text = e.expDate3;

		 arrAddress = e.arrAddress;
		 loadAddressItems(arrAddress);
		 arrBank = e.arrBank;
		 loadBankItems(arrBank);
		 arrContact = e.arrContact;
		 loadContactItems(arrContact);

		 showView2();*/

	});
}

function openAttachmentsWindow() {

	var payload = {
		isUpdate : false,
		arr : [],
		registeredId : registerId,
		obj : "",
		navTitle : Alloy.Globals.selectedLanguage.renewal,
		callBackFunction : updateAttachmentList,
	};

	var win = Alloy.createController("ISupplier/winAddAttachments", payload).getView();
	Alloy.Globals.openWindow(win);

}

function closeWindow() {
	Alloy.Globals.closeWindow($.winBusinessClassification);
}

function parseDate(str) {
	var mdy = str.split('-');
	return new Date(mdy[0], mdy[1] - 1, mdy[2]);
}

function daydiff(first, second) {
	return (first - second) / (1000 * 60 * 60 * 24);
}

var moment = require('alloy/moment');



function setClassificationInfo(e) {
	var date = new Date();
	//
	var day = date.getDate();
	var month = date.getMonth();
	var year = date.getFullYear();
	if (day < 10)
		day = '0' + day;

	month = parseInt(month) + 1;
	if (month < 10)
		month = '0' + month;

	//		var currDate = year + "-" + month + "-" + day;

	$.txtCertificate1.value = e.certificate1;
	$.lblExpiryDate1Value.text = e.expDate1;

	// var day1 = moment().diff(new Date(e.expDate1), "days");
	// Ti.API.info('day1'+day1);
	// if(parseInt(day1) < 30){
	// Ti.API.info('30000');
	// $.lblExpiryDate1Value.color = Alloy.Globals.path.navBarColor;
	// $.lblExpiryDate1Value.touchEnabled = true;
	// }

	$.txtCertificate2.value = e.certificate2;
	$.lblExpiryDate2Value.text = e.expDate2;

	// var day2 = moment().diff(e.expDate2, "days");
	// Ti.API.info('day1'+day2);
	// if(parseInt(day2) < 30){
	// $.lblExpiryDate2Value.color = Alloy.Globals.path.navBarColor;
	// $.lblExpiryDate2Value.touchEnabled = true;
	// }

	$.txtCertificate3.value = e.certificate3;
	$.lblExpiryDate3Value.text = e.expDate3;

	// var day3 = moment().diff(e.expDate3, "days");
	// Ti.API.info('day1'+day3);
	// if(parseInt(day3) < 30){
	// $.lblExpiryDate3Value.color = Alloy.Globals.path.navBarColor;
	// $.lblExpiryDate3Value.touchEnabled = true;
	// }
	
	busReqId1 = e.busReqId1;
	busReqId2 = e.busReqId2;
	busReqId3 = e.busReqId3;
	
	/*var objInfo = Ti.App.Properties.getObject("LoginDetaisObj");
	 Ti.API.info('obj INFO = ' + JSON.stringify(objInfo));

	 if (objInfo.company_profile.bussiness_Classification.length > 0) {
	 $.txtCertificate1.value = objInfo.company_profile.bussiness_Classification[0].certificate_Number;
	 var date1 = new Date(objInfo.company_profile.bussiness_Classification[0].expiration_Date);
	 $.lblExpiryDate1Value.text = date1.getFullYear() + "-" + (date1.getMonth() + 1) + "-" + date1.getDate();
	 isDate1Selected = true;
	 }
	 if (objInfo.company_profile.bussiness_Classification.length > 1) {
	 $.txtCertificate2.value = objInfo.company_profile.bussiness_Classification[1].certificate_Number;
	 var date2 = new Date(objInfo.company_profile.bussiness_Classification[1].expiration_Date);
	 $.lblExpiryDate2Value.text = date2.getFullYear() + "-" + (date2.getMonth() + 1) + "-" + date2.getDate();
	 isDate2Selected = true;
	 }

	 if (objInfo.company_profile.bussiness_Classification.length > 2) {
	 $.txtCertificate3.value = objInfo.company_profile.bussiness_Classification[2].certificate_Number;
	 var date3 = new Date(objInfo.company_profile.bussiness_Classification[2].expiration_Date);
	 $.lblExpiryDate3Value.text = date3.getFullYear() + "-" + (date3.getMonth() + 1) + "-" + date3.getDate();
	 isDate3Selected = true;
	 }*/
}

$.winBusinessClassification.addEventListener("focus", function(e) {
	$.viewBottomToolbar.setDefaultTheme($.winBusinessClassification);
});
$.viewBottomToolbar.setDefaultTheme($.winBusinessClassification);

/**
 * Adding the eventlistener for the bottom bar view
 *
 * @param {Object} e
 */
$.viewBottomToolbar.getView().addEventListener('click', function(e) {
	if (e.source.buttonId == 'btnFontChange') {
		$.viewBottomToolbar.changeFont($.winBusinessClassification);
	} else if (e.source.buttonId == 'btnSystemFeedback') {
		$.viewBottomToolbar.openFeedbackScreen(e);
	} else if (e.source.buttonId == 'btnSystemChangeTheme') {
		$.viewBottomToolbar.changeTheme($.winBusinessClassification);
	}
});

/**
 * Called on open of the window
 *
 * @param {Object} e
 */
var windowOpened = function(e) {
	var openTimeout = setTimeout(function(e) {
		clearTimeout(openTimeout);
		setViewsWidth();
		getBsuinessInfo();
	}, 400);

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
var windowClosed = function(e) {
	$.destroy();
};

var preOrientation = undefined;
function changeOrientation(e) {
	if (preOrientation == e.orientation || e.orientation == 5) {
		return;
	}
	preOrientation = Ti.Gesture.orientation;
	setViewsWidth();
}

if (Alloy.isTablet) {
	$.winBusinessClassification.addEventListener("focus", function(e) {
		Ti.Gesture.addEventListener("orientationchange", changeOrientation);
	});

	$.winBusinessClassification.addEventListener("blur", function(e) {
		Ti.Gesture.removeEventListener("orientationchange", changeOrientation);
	});

}
changeLanguage();
