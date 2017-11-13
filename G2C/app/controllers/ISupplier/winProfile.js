var args = arguments[0] || {};
var iscompanyDataLoad = false;
var isloadAttachments = false;
var density;
if (OS_ANDROID) {
	density = "px";
} else {
	density = "dp";
}
var btnWidth = (Alloy.Globals.platformWidth / 3);
var moment = require('alloy/moment');
if (Alloy.Globals.isIOS7Plus) {
	$.winProfile.extendEdges = [Ti.UI.EXTEND_EDGE_TOP];
	$.statusBar.height = 20;
	$.tblGeneral.separatorInsets = {
		left : 0
	};
}

function closeWindow() {
	Alloy.Globals.closeWindow($.winProfile);
	//$.winISupplierHome.close();
}

function changeLanguage() {
	$.lblNavTitle.text = Alloy.Globals.selectedLanguage.profile;
	$.lblGeneral.text = Alloy.Globals.selectedLanguage.general;
	$.lblAttachment.text = Alloy.Globals.selectedLanguage.attachments;
	$.lblComProfile.text = Alloy.Globals.selectedLanguage.companyProfile;
	$.lblLegal.text = Alloy.Globals.selectedLanguage.legal;
	$.lblEntityTitle.text = Alloy.Globals.selectedLanguage.entity;
	$.lblDirectorTitle.text = Alloy.Globals.selectedLanguage.genDirectorName;
	$.lblNationalityTitle.text = Alloy.Globals.selectedLanguage.nationality;
	$.lblEntityValue.text = args.company_profile.organization.legal_entity;
	$.lblDirectorValue.text = args.company_profile.organization.general_director_Name;
	$.lblNationalityValue.text = args.company_profile.organization.general_director_nationality;
	$.lblActivity.text = Alloy.Globals.selectedLanguage.activity;
	$.lblActivityValue.text = args.company_profile.organization.activity;
	$.lblPartners.text = Alloy.Globals.selectedLanguage.partners;
	$.lblclassification.text = Alloy.Globals.selectedLanguage.busClassification;
	$.lblContacts.text = Alloy.Globals.selectedLanguage.contacts;
	$.lblBankDetails.text = Alloy.Globals.selectedLanguage.bankDetails;
	$.btnGeneralView.width = $.btnAttachView.width = $.btnComProView.width = $.imgselection.width = btnWidth + density;
	var alignment;
	if (Alloy.Globals.isEnglish) {
		alignment = Ti.UI.TEXT_ALIGNMENT_LEFT;
		$.btnGeneralView.left = $.imgselection.left = 0;
		$.btnAttachView.left = btnWidth + density;
		$.btnComProView.left = (btnWidth * 2) + density;
		$.lblNationalityTitle.left = $.lblEntityTitle.left = $.lblDirectorTitle.left = $.lblclassification.left = 10;
		$.lblNationalityValue.left = 140;
		$.lblNationalityValue.right = 10;
	} else {
		alignment = Ti.UI.TEXT_ALIGNMENT_RIGHT;
		$.btnGeneralView.right = $.imgselection.right = 0;
		$.btnAttachView.right = btnWidth + density;
		$.btnComProView.right = (btnWidth * 2) + density;
		$.lblNationalityTitle.right = $.lblEntityTitle.right = $.lblDirectorTitle.right = $.lblclassification.right = 10;
		$.lblNationalityValue.left = 10;
		$.lblNationalityValue.right = 140;
	}
	$.lblLegal.textAlign = $.lblEntityTitle.textAlign = $.lblDirectorTitle.textAlign = $.lblNationalityTitle.textAlign = alignment;
	$.lblEntityValue.textAlign = $.lblDirectorValue.textAlign = $.lblNationalityValue.textAlign = alignment;
	$.lblActivity.textAlign = $.lblActivityValue.textAlign = $.lblPartners.textAlign = $.lblclassification.textAlign = alignment;
	$.lblContacts.textAlign = $.lblBankDetails.textAlign = alignment;
}

function showGeneralView(e) {
	$.lblGeneral.color = Alloy.Globals.path.whiteColor;
	$.lblAttachment.color = $.lblComProfile.color = Alloy.Globals.path.borderColor;
	$.btnGeneralView.backgroundColor = "#999999";
	$.btnAttachView.backgroundColor = $.btnComProView.backgroundColor = "transparent";
	if (Alloy.Globals.isEnglish) {
		$.imgselection.animate({
			left : 0,
			duration : 250
		});
	} else {
		$.imgselection.animate({
			right : 0,
			duration : 250
		});
	}
	// $.generalView.visible = true;
	// $.attachmentView.visible = false;
	// $.companyProView.visible = false;
	$.generalView.show();
	$.attachmentView.hide();
	$.companyProView.hide();
	if (e == null) {
		loadGeneralData();
	}
}

function showAttachmentView() {
	$.lblAttachment.color = Alloy.Globals.path.whiteColor;
	$.lblGeneral.color = $.lblComProfile.color = Alloy.Globals.path.borderColor;
	$.btnAttachView.backgroundColor = "#999999";
	$.btnGeneralView.backgroundColor = $.btnComProView.backgroundColor = "transparent";
	if (Alloy.Globals.isEnglish) {
		$.imgselection.animate({
			left : btnWidth + density,
			duration : 250
		});
	} else {
		$.imgselection.animate({
			right : btnWidth + density,
			duration : 250
		});
	}
	// $.attachmentView.visible = true;
	// $.generalView.visible = false;
	// $.companyProView.visible = false;
	if (!isloadAttachments) {
		Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading);
		loadBusClassificatnion();
		loadAttachments();
		Alloy.Globals.hideLoading();
		isloadAttachments = true;
	}
	$.generalView.hide();
	$.attachmentView.show();
	$.companyProView.hide();
}

function showCompanyView() {
	$.lblComProfile.color = Alloy.Globals.path.whiteColor;
	$.lblGeneral.color = $.lblAttachment.color = Alloy.Globals.path.borderColor;
	$.btnComProView.backgroundColor = "#999999";
	$.btnAttachView.backgroundColor = $.btnGeneralView.backgroundColor = "transparent";
	if (Alloy.Globals.isEnglish) {
		$.imgselection.animate({
			left : (btnWidth * 2) + density,
			duration : 250
		});
	} else {
		$.imgselection.animate({
			right : (btnWidth * 2) + density,
			duration : 250
		});
	}
	// $.companyProView.visible = true;
	// $.generalView.visible = false;
	// $.attachmentView.visible = false;
	if (!iscompanyDataLoad) {
		Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading);
		loadCompanyData(0, $.partnerBackView);
		loadCompanyData(1, $.contactBackView);
		loadCompanyData(2, $.bankDetailsBackView);
		iscompanyDataLoad = true;
		Alloy.Globals.hideLoading();
	}
	$.generalView.hide();
	$.attachmentView.hide();
	$.companyProView.show();

}

function loadGeneralData() {
	var arrGeneralData = [{
		title : Alloy.Globals.selectedLanguage.supplierName,
		value : args.general_Profile.supplier_Name
	}, {
		title : Alloy.Globals.selectedLanguage.supplierNo,
		value : args.general_Profile.supplier_Number
	}, {
		title : Alloy.Globals.selectedLanguage.registrationDate,
		value : moment(args.general_Profile.registration_Date).format("DD-MM-YYYY")
	}, {
		title : Alloy.Globals.selectedLanguage.renewalDate,
		value : moment(args.general_Profile.renewal_Date).format("DD-MM-YYYY")
	}, {
		title : Alloy.Globals.selectedLanguage.expirationDate,
		value : moment(args.general_Profile.renewal_Date).add('years', 1).format("DD-MM-YYYY")
	}];

	var arrGeneralRow = [];
	for (var i = 0,
	    length = arrGeneralData.length; i < length; i++) {
		var row = Ti.UI.createTableViewRow({
			height : Ti.UI.SIZE,
			backgroundColor : Alloy.Globals.path.whiteColor
		});
		var lblTitle = Ti.UI.createLabel({
			top : 15,
			font : Alloy.Globals.path.font12,
			color : Alloy.Globals.path.blackColor,
			height : Ti.UI.SIZE,
			text : arrGeneralData[i].title
		});
		row.add(lblTitle);
		var lblValue = Ti.UI.createLabel({
			top : 15,
			font : Alloy.Globals.path.font12,
			color : Alloy.Globals.path.vatButtonTitleColor,
			height : Ti.UI.SIZE,
			bottom : 15,
			text : arrGeneralData[i].value
		});
		row.add(lblValue);
		var imgSeparator = Ti.UI.createView({
			bottom : 0,
			left : 0,
			right : 0,
			height : 1,
			backgroundColor : Alloy.Globals.path.grayColor,
				isToExclude_contrast: true
		});
		row.add(imgSeparator);
		if (Alloy.Globals.isEnglish) {
			lblTitle.textAlign = lblValue.textAlign = Ti.UI.TEXT_ALIGNMENT_LEFT;
			lblTitle.left = 10;
			lblValue.left = 130;
			lblValue.right = 10;
		} else {
			lblTitle.textAlign = lblValue.textAlign = Ti.UI.TEXT_ALIGNMENT_RIGHT;
			lblTitle.right = 10;
			lblValue.right = 130;
			lblValue.left = 10;
		}
		arrGeneralRow.push(row);
	}
	$.tblGeneral.data = arrGeneralRow;
}

function loadCompanyData(index, backView) {
	var arrPartnerList = [];
	var arrTitle = [];
	if (index == 0) {
		arrPartnerList = args.company_profile.organization.partners;
		arrTitle = [Alloy.Globals.selectedLanguage.nameTitle + ":", Alloy.Globals.selectedLanguage.nationality + ":", Alloy.Globals.selectedLanguage.partnership, Alloy.Globals.selectedLanguage.workplace + ":"];
	} else if (index == 1) {
		arrPartnerList = args.company_profile.contactList;
		arrTitle = [Alloy.Globals.selectedLanguage.nameTitle + ":", Alloy.Globals.selectedLanguage.phoneNumber + ":", Alloy.Globals.selectedLanguage.email + ":", Alloy.Globals.selectedLanguage.status + ":"];
		// , Alloy.Globals.selectedLanguage.userAccount + ":", Alloy.Globals.selectedLanguage.isUserRemovable + ":"
	} else {
		arrPartnerList = args.company_profile.banking_Detail;
		arrTitle = [Alloy.Globals.selectedLanguage.accountNumber + ":", Alloy.Globals.selectedLanguage.iban + ":", Alloy.Globals.selectedLanguage.currency + ":", Alloy.Globals.selectedLanguage.bankName + ":", Alloy.Globals.selectedLanguage.status + ":", Alloy.Globals.selectedLanguage.startDateTitle + ":", Alloy.Globals.selectedLanguage.endDateTitle + ":"];
	}
	if (arrPartnerList.length == 0) {
		var lblNodata = Ti.UI.createLabel({
			top : 10,
			bottom : 10,
			left : 10,
			right : 10,
			height : Titanium.UI.SIZE,
			font : Alloy.Globals.path.font12,
			color : Alloy.Globals.path.vatButtonTitleColor,
			text : Alloy.Globals.selectedLanguage.noDetailsFound,
			textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER
		});
		backView.add(lblNodata);
		backView.height = Ti.UI.SIZE;
		return;
	}
	for (var i = 0; i < arrPartnerList.length; i++) {

		var arrRecord = [];
		if (index == 0) {
			arrRecord = [arrPartnerList[i].owner_Name, arrPartnerList[i].owner_nationality, arrPartnerList[i].partnership, arrPartnerList[i].citizen_partner_work];
		} else if (index == 1) {
			arrRecord = [arrPartnerList[i].name, arrPartnerList[i].phone_Number, arrPartnerList[i].email_ID, arrPartnerList[i].status];
			//, arrPartnerList[i].userAcc, arrPartnerList[i].remove
		} else {
			arrRecord = [arrPartnerList[i].account_Number, arrPartnerList[i].IBAN, arrPartnerList[i].currency, arrPartnerList[i].bankName, arrPartnerList[i].status, arrPartnerList[i].start_Date, arrPartnerList[i].end_Date];
		}

		for (var j = 0; j < arrTitle.length; j++) {
			var view = Ti.UI.createView({
				top : 10,
				width : "100%",
				height : Ti.UI.SIZE,
			});
			var lblTitle = Ti.UI.createLabel({
				width : Titanium.UI.SIZE,
				height : Titanium.UI.SIZE,
				font : Alloy.Globals.path.font12,
				color : Alloy.Globals.path.blackColor,
				text : arrTitle[j]
			});
			view.add(lblTitle);
			var lblValue = Ti.UI.createLabel({
				height : Titanium.UI.SIZE,
				font : Alloy.Globals.path.font12,
				color : Alloy.Globals.path.vatButtonTitleColor,
				text : arrRecord[j]
			});
			view.add(lblValue);
			if (Alloy.Globals.isEnglish) {
				lblTitle.textAlign = lblValue.textAlign = Ti.UI.TEXT_ALIGNMENT_LEFT;
				lblTitle.left = lblValue.right = 10;
				lblValue.left = 130;
			} else {
				lblTitle.textAlign = lblValue.textAlign = Ti.UI.TEXT_ALIGNMENT_RIGHT;
				lblTitle.right = lblValue.left = 10;
				lblValue.right = 130;
			}
			backView.add(view);
		}
		var imgSeparator = Ti.UI.createView({
			top : 10,
			height : 1,
			width : "100%",
			backgroundColor : Alloy.Globals.path.grayColor,
				isToExclude_contrast: true
		});
		backView.add(imgSeparator);
	}
	backView.height = Ti.UI.SIZE;
}

function loadBusClassificatnion() {
	var arrClassification = args.company_profile.bussiness_Classification;
	var arrTblClassification = [];
	for (var i = 0,
	    length = arrClassification.length; i <= length; i++) {
		var row = Ti.UI.createView({
			//height : (i==0) ? 40 : Ti.UI.SIZE,
			height : Ti.UI.SIZE,
			left : 0,
			right : 0,
			backgroundColor : (i == 0) ? "#999999" : "transparent"
		});
		var lblCertificate = Ti.UI.createLabel({
			top : 10,
			bottom : 10,
			height : Ti.UI.SIZE,
			width : Alloy.Globals.GetWidth(120) + density,
			color : (i == 0) ? Alloy.Globals.path.whiteColor : Alloy.Globals.path.vatButtonTitleColor,
			font : (i == 0) ? Alloy.Globals.path.font12Bold : Alloy.Globals.path.font11,
			verticalAlign : "top",
			text : (i == 0) ? Alloy.Globals.selectedLanguage.certificate : arrClassification[i - 1].classification
		});
		row.add(lblCertificate);
		var vseparator = Ti.UI.createView({
			height : row.toImage().height + density, //"100%",
			width : 1,
			backgroundColor : (i == 0) ? Alloy.Globals.path.borderColor : Alloy.Globals.path.grayColor,
				isToExclude_contrast: true
		});
		row.add(vseparator);
		var lblReference = Ti.UI.createLabel({
			top : 10,
			bottom : 10,
			height : Ti.UI.SIZE,
			width : Alloy.Globals.GetWidth(70) + density,
			color : (i == 0) ? Alloy.Globals.path.whiteColor : Alloy.Globals.path.vatButtonTitleColor,
			font : (i == 0) ? Alloy.Globals.path.font12Bold : Alloy.Globals.path.font11,
			verticalAlign : "top",
			text : (i == 0) ? Alloy.Globals.selectedLanguage.reference : arrClassification[i - 1].certificate_Number
		});
		row.add(lblReference);
		var vseparatorSec = Ti.UI.createView({
			height : row.toImage().height + density, //"100%",
			width : 1,
			backgroundColor : (i == 0) ? Alloy.Globals.path.borderColor : Alloy.Globals.path.grayColor,
				isToExclude_contrast: true
		});
		row.add(vseparatorSec);
		var lblExpireDate = Ti.UI.createLabel({
			top : 10,
			bottom : 10,
			height : Ti.UI.SIZE,
			width : Alloy.Globals.GetWidth(70) + density,
			color : (i == 0) ? Alloy.Globals.path.whiteColor : Alloy.Globals.path.vatButtonTitleColor,
			font : (i == 0) ? Alloy.Globals.path.font12Bold : Alloy.Globals.path.font11,
			verticalAlign : "top",
			text : (i == 0) ? Alloy.Globals.selectedLanguage.expDate : moment(arrClassification[i - 1].expiration_Date).format("DD-MM-YYYY")
		});
		row.add(lblExpireDate);
		var hSeparator = Ti.UI.createView({
			height : 0.5,
			width : "100%",
			bottom : 0,
			isToExclude_contrast: true,
			backgroundColor : Alloy.Globals.path.grayColor
		});
		row.add(hSeparator);
		var alignment;
		if (Alloy.Globals.isEnglish) {
			alignment = Ti.UI.TEXT_ALIGNMENT_LEFT;
			lblCertificate.left = 10;
			vseparator.left = Alloy.Globals.GetWidth(140) + density;
			lblReference.left = Alloy.Globals.GetWidth(150) + density;
			vseparatorSec.left = Alloy.Globals.GetWidth(230) + density;
			lblExpireDate.left = Alloy.Globals.GetWidth(240) + density;
		} else {
			alignment = Ti.UI.TEXT_ALIGNMENT_RIGHT;
			lblCertificate.right = 10;
			vseparator.right = Alloy.Globals.GetWidth(140) + density;
			lblReference.right = Alloy.Globals.GetWidth(150) + density;
			vseparatorSec.right = Alloy.Globals.GetWidth(230) + density;
			lblExpireDate.right = Alloy.Globals.GetWidth(240) + density;
		}
		lblCertificate.textAlign = lblReference.textAlign = lblExpireDate.textAlign = alignment;
		$.tblClassification.add(row);
		//row.height = Ti.UI.SIZE;
		//arrTblClassification.push(row);
	}
	//$.tblClassification.data = arrTblClassification;
	//$.tblClassification.height = Ti.UI.SIZE;
}

function loadAttachments() {
	var arrAttachments = args.general_Profile.attachments;
	for (var i = 0,
	    length = arrAttachments.length; i < length; i++) {
		var row = Alloy.createController('ISupplier/attachmentsRow', arrAttachments[i]).getView();
		$.attachmentView.add(row);
	}

}

showGeneralView(null);
changeLanguage();

$.winProfile.addEventListener("focus",function(e){
	$.viewBottomToolbar.setDefaultTheme($.winProfile);
});
$.viewBottomToolbar.setDefaultTheme($.winProfile);

/**
 * Adding the eventlistener for the bottom bar view
 *
 * @param {Object} e
 */
$.viewBottomToolbar.getView().addEventListener('click', function(e) {
	if (e.source.buttonId == 'btnFontChange') {
		$.viewBottomToolbar.changeFont($.winProfile);
	} else if (e.source.buttonId == 'btnSystemFeedback') {
		$.viewBottomToolbar.openFeedbackScreen(e);
	} else if(e.source.buttonId == 'btnSystemChangeTheme'){
		$.viewBottomToolbar.changeTheme($.winProfile);
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
