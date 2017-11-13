var datePicker = require("picker");

var utilities = require("utilities");
var httpManager = require("httpManager");

var arrMediaTypes = [Ti.Media.MEDIA_TYPE_PHOTO];

var arrOptions = [];
var arrSelectedImage = [];
var attachmentType = "";

var selectedCitizenship = "";
var selectedResidence = "";
var selectedEmiratesIdInfo = "";
var selectedEmiratesBook = "";
var selectedEmiratesEstablish = "";
var selectedTradelicenseEst = "";

var mediaOptionDialog = Titanium.UI.createOptionDialog({
	options : arrOptions,
	cancel : 3,
});

/*mediaOptionDialog.addEventListener('click', function(e) {
	var ind = e.index;
	if (ind == 0) {
		showCamera();
	} else if (ind == 1) {
		choosePhotoGallery();
	}
	else if (ind == 2) {
		Alloy.Globals.openWindow(Alloy.createController('common/dropbox/winFilesAndFoldersList', {
			callback : dropBoxSuccess
		}).getView());
	}
});*/

//androidcamera
//$.winRegistration.

mediaOptionDialog.addEventListener('click', function(e) {
	var ind = e.index;
	if (ind == 0) {
		showCamera();
	} else if (ind == 1) {
		choosePhotoGallery();
	}
	
});

var alignment;
var preLang = null;
function changeLanguage() {
	if (preLang == Alloy.Globals.language) {
		return;
	}
	preLang = Alloy.Globals.language;

	//arrOptions = [Alloy.Globals.selectedLanguage.useCamera, Alloy.Globals.selectedLanguage.selectFromGallery, Alloy.Globals.selectedLanguage.dropbox];
	arrOptions = [Alloy.Globals.selectedLanguage.useCamera, Alloy.Globals.selectedLanguage.selectFromGallery];
	if (OS_IOS) {
		arrOptions.push(Alloy.Globals.selectedLanguage.cancel);
	}
	mediaOptionDialog.options = arrOptions;

	$.lblNavTitle.text = Alloy.Globals.selectedLanguage.registration;

	$.labelIndividCitizen.text = Alloy.Globals.selectedLanguage.individualCitizenLbl;
	$.labelIndividResident.text = Alloy.Globals.selectedLanguage.individualResidentLbl;
	$.labelIndividGCCcitizen.text = Alloy.Globals.selectedLanguage.individualGccCitizen;
	$.labelIndividGccResident.text = Alloy.Globals.selectedLanguage.individualGccResident;
	$.labelIndividVisitor.text = Alloy.Globals.selectedLanguage.indivlVisitor;
	$.labelEstablishment.text = Alloy.Globals.selectedLanguage.establishmentReg;
	$.textfieldFullName.hintText = Alloy.Globals.selectedLanguage.fullName;
	$.hintTextIDFullname.text = Alloy.Globals.selectedLanguage.fullNameHintText;
	$.textfieldNationality.hintText = Alloy.Globals.selectedLanguage.nationality;
	$.textCountryResidence.hintText = Alloy.Globals.selectedLanguage.countryResidence;
	$.textMobileNum.hintText = Alloy.Globals.selectedLanguage.mobileNum;
	$.textMobileNum2.hintText = Alloy.Globals.selectedLanguage.mobileNum2;
	$.txtAddressIndiv.hintText = Alloy.Globals.selectedLanguage.addressLabelen;
	$.landLine.hintText = Alloy.Globals.selectedLanguage.landlineNum;
	$.textfieldDOB.hintText = Alloy.Globals.selectedLanguage.dob;
	//$.textfieldNationalId.hintText = Alloy.Globals.selectedLanguage.nationalId + ":";
	$.textfieldIdExpiry.hintText = Alloy.Globals.selectedLanguage.nationalIdExpiry;
	$.textfieldUserName.hintText = Alloy.Globals.selectedLanguage.userName;
	$.textfieldPassword.hintText = Alloy.Globals.selectedLanguage.password;
	$.textfieldConfirmPassword.hintText = Alloy.Globals.selectedLanguage.confirmPassword;
	$.textfieldEmail.hintText = Alloy.Globals.selectedLanguage.emailAddress;
	$.textfieldEmailConfirm.hintText = Alloy.Globals.selectedLanguage.emailAddressConfirm;
	//$.textfieldMobile.hintText = Alloy.Globals.selectedLanguage.mobile + ":";
	$.labelSubscription.text = Alloy.Globals.selectedLanguage.subscriptionReg;
	$.textfieldEmirates.hintText = Alloy.Globals.selectedLanguage.chooseEmirates;
	$.textfieldEmiratesBook.hintText = Alloy.Globals.selectedLanguage.chooseEmirates;
	$.textfEmiratesId.hintText = Alloy.Globals.selectedLanguage.emiratedId;
	$.textfEmiratesIdEstb.hintText = Alloy.Globals.selectedLanguage.emiratedId;
	$.txtEmiratedFrontAttch.hintText = Alloy.Globals.selectedLanguage.emiratedIdFrontAttch;
	$.txtEmiratedBackAttch.hintText = Alloy.Globals.selectedLanguage.emiratedIdBackAttch;
	$.txtEmiratedFrontAttchEst.hintText = Alloy.Globals.selectedLanguage.emiratedIdFrontAttch;
	$.txtEmiratedBackAttchEst.hintText = Alloy.Globals.selectedLanguage.emiratedIdBackAttch;
	$.textfPassportNum.hintText = Alloy.Globals.selectedLanguage.passportNum;
	$.txtPassportFrontAttch.hintText = Alloy.Globals.selectedLanguage.passportFrontAttach;
	$.splitLblAccountdetails.text = Alloy.Globals.selectedLanguage.accountDetailsSplit;
	$.splitLblAccountdetailsEstablish.text = Alloy.Globals.selectedLanguage.accountDetailsSplit;
	$.splitCredentials.text = Alloy.Globals.selectedLanguage.credentialsSplit;
	$.splitIdInformation.text = Alloy.Globals.selectedLanguage.idInformationSplit;
	$.splitPassportInfo.text = Alloy.Globals.selectedLanguage.passportInformatioinSplit;
	$.splitFamilyBook.text = Alloy.Globals.selectedLanguage.familyBookSplit;
	$.labelHasFamilyBook.text = Alloy.Globals.selectedLanguage.hasFamilyBook;
	$.txtFullNameBook.hintText = Alloy.Globals.selectedLanguage.fullNameBook;
	//
	$.hintTextBookFName.text = Alloy.Globals.selectedLanguage.hintBookFullname;
	$.txtTownName.hintText = Alloy.Globals.selectedLanguage.townName;
	$.txtTownNumber.hintText = Alloy.Globals.selectedLanguage.townNumber;
	$.txtFamilyNum.hintText = Alloy.Globals.selectedLanguage.familyNumber;
	$.txtTribeName.hintText = Alloy.Globals.selectedLanguage.tribeName;
	$.txtClanNumber.hintText = Alloy.Globals.selectedLanguage.clanNumber;
	$.txtfIssueDate.hintText = Alloy.Globals.selectedLanguage.issueDateBook;
	$.txtMotherName.hintText = Alloy.Globals.selectedLanguage.motherNameTxt;
	$.txtMothersFatherNme.hintText = Alloy.Globals.selectedLanguage.motherFatherNameTxt;
	$.txtFamilyBookAttch.hintText = Alloy.Globals.selectedLanguage.familyBookAttch;
	$.fullNamePassport.hintText = Alloy.Globals.selectedLanguage.fullnamePassport;
	$.hintTextPassportName.text = Alloy.Globals.selectedLanguage.hintTxtPassPostName;
	$.txtPassportResidentpage.hintText = Alloy.Globals.selectedLanguage.passportResidentpage;
	$.txtVisaPage.hintText = Alloy.Globals.selectedLanguage.visapagetxt;
	$.txtFieldEstablishName.hintText = Alloy.Globals.selectedLanguage.establishNameAsStated;
	//
	$.hintTextEstFullname.text = Alloy.Globals.selectedLanguage.hintTextEstFullnamelbl;
	$.txtFieldEstablishMobileNum.hintText = Alloy.Globals.selectedLanguage.mobilenumberHinttxt;
	$.txtFieldOfficePhone.hintText = Alloy.Globals.selectedLanguage.officePhoneLabel;
	$.txtFieldEmailAddressEstabsh.hintText = Alloy.Globals.selectedLanguage.emailAddress;
	$.txtFieldEmailAddressEstabshConfirm.hintText = Alloy.Globals.selectedLanguage.emailAddressConfirm;
	$.txtAddressEstblsh.hintText = Alloy.Globals.selectedLanguage.addressLabelen;
	$.txtWebstieEstblsh.hintText = Alloy.Globals.selectedLanguage.websiteLabelEn;
	$.textEmiratesEstablish.hintText = Alloy.Globals.selectedLanguage.chooseEmirates;
	$.txtPostBoxEstblsh.hintText = Alloy.Globals.selectedLanguage.postBoxLabel;
	$.txtTradeLicNumEstblsh.hintText = Alloy.Globals.selectedLanguage.tradeLicenceNumber;
	$.txtTradeLicExpiry.hintText = Alloy.Globals.selectedLanguage.tradeLicenExpiryDate;
	$.textTradelicTypeEstablish.hintText = Alloy.Globals.selectedLanguage.tradeLicenseType;
	$.txtTradeLicenseAttch.hintText = Alloy.Globals.selectedLanguage.tradeLicenceLbl;
	$.txtSignatureAttest.hintText = Alloy.Globals.selectedLanguage.signatureAttest;

	$.textfieldPassword.passwordMask = $.textfieldConfirmPassword.passwordMask = true;

	if (Alloy.Globals.isEnglish) {
		$.btnSubmit.left = $.btnCancel.right = $.imageviewNationalityDropDown.right = $.imageviewDOBDropDown.right = $.imageviewIdExpiryDropDown.right = 0;
		$.btnSubmit.right = $.btnCancel.left = $.imageviewNationalityDropDown.left = $.imageviewDOBDropDown.left = $.imageviewIdExpiryDropDown.left = undefined;
		$.imageviewCountryResidence.right = $.imageviewEmirates.right = $.imageviewEmiratesFrontAttch.right = $.imageviewEmiratesBackAttch.right = $.imageviewEmiratesFrontAttchEst.right = 0;
		$.imageviewCountryResidence.left = $.imageviewEmirates.left = $.imageviewEmiratesFrontAttch.left = $.imageviewEmiratesBackAttch.left = $.imageviewEmiratesFrontAttchEst.left = undefined;
		$.imageviewPassportFontAttch.right = $.imageviewFamilybookAttch.right = $.imageviewDIsseuDate.right = $.imageviewEmiratesBook.right = 0;
		$.imageviewPassportFontAttch.left = $.imageviewFamilybookAttch.left = $.imageviewDIsseuDate.left = $.imageviewEmiratesBook.left = undefined;
		$.imageviewPassportResidentpage.right = $.imageviewVisaPage.right = $.imageviewEmiratesEstablish.right = $.imageviewTradeLicExpiry.right = $.imageviewEmiratesBackAttchEst.right = 0;
		$.imageviewPassportResidentpage.left = $.imageviewVisaPage.left = $.imageviewEmiratesEstablish.left = $.imageviewTradeLicExpiry.left = $.imageviewEmiratesBackAttchEst.left =undefined;
		$.imageviewTradelicTypeEstablish.right = $.imageviewSignatureAttest.right = 0;
		$.imageviewTradelicTypeEstablish.left = $.imageviewSignatureAttest.left = undefined;
		$.imageviewTradeLicenseAttch.right = $.validField.right = 0;
		$.imageviewTradeLicenseAttch.left = $.validField.left = undefined;
		$.textfieldNationality.left = $.textfieldDOB.left = $.textfieldIdExpiry.left = (OS_ANDROID) ? 20 : 20;
		$.textfieldNationality.right = $.textfieldDOB.right = $.textfieldIdExpiry.right = 30;
				
		alignment = Titanium.UI.TEXT_ALIGNMENT_LEFT;
	} else {
		$.btnSubmit.left = $.btnCancel.right = $.imageviewNationalityDropDown.right = $.imageviewDOBDropDown.right = $.imageviewIdExpiryDropDown.right = undefined;
		$.btnSubmit.right = $.btnCancel.left = $.imageviewNationalityDropDown.left = $.imageviewDOBDropDown.left = $.imageviewIdExpiryDropDown.left = 0;
		$.imageviewCountryResidence.right = $.imageviewEmirates.right = $.imageviewEmiratesFrontAttch.right = $.imageviewEmiratesBackAttch.right =  $.imageviewEmiratesFrontAttchEst.right = undefined;
		$.imageviewCountryResidence.left = $.imageviewEmirates.left = $.imageviewEmiratesFrontAttch.left = $.imageviewEmiratesBackAttch.left = $.imageviewEmiratesFrontAttchEst.left = 0;
		$.imageviewPassportFontAttch.right = $.imageviewFamilybookAttch.right = $.imageviewDIsseuDate.right = $.imageviewEmiratesBook.right = undefined;
		$.imageviewPassportFontAttch.left = $.imageviewFamilybookAttch.left = $.imageviewDIsseuDate.left = $.imageviewEmiratesBook.left = 0;
		$.imageviewPassportResidentpage.right = $.imageviewVisaPage.right = $.imageviewEmiratesEstablish.right = $.imageviewTradeLicExpiry.right = undefined;
		$.imageviewPassportResidentpage.left = $.imageviewVisaPage.left = $.imageviewEmiratesEstablish.left = $.imageviewTradeLicExpiry.left = 0;
		$.imageviewTradelicTypeEstablish.right = $.imageviewSignatureAttest.right = $.validField.right = $.imageviewEmiratesBackAttchEst.right = undefined;
		$.imageviewTradelicTypeEstablish.left = $.imageviewSignatureAttest.left = $.validField.left = $.imageviewEmiratesBackAttchEst.left = 0;
		$.imageviewTradeLicenseAttch.right = undefined;
		$.imageviewTradeLicenseAttch.left = 0;
		$.textfieldNationality.left = $.textfieldDOB.left = $.textfieldIdExpiry.left = 10;
		$.textfieldNationality.right = $.textfieldDOB.right = $.textfieldIdExpiry.right = (OS_ANDROID) ? 20 : 20;
        
		alignment = Titanium.UI.TEXT_ALIGNMENT_RIGHT;
	}
	$.textfieldFullName.textAlign = $.textfieldNationality.textAlign = $.textfieldDOB.textAlign = $.textfieldIdExpiry.textAlign = $.textfieldUserName.textAlign = alignment;
	$.textfieldPassword.textAlign = $.textfieldConfirmPassword.textAlign = $.textfieldEmail.textAlign = $.textfieldEmailConfirm.textAlign = alignment;

	$.viewDOB.txtFld = $.textfieldDOB;
	$.viewIdExpiry.txtFld = $.textfieldIdExpiry;
	$.viewIssueDate.txtFld = $.txtfIssueDate;
	$.viewTradeLicExp.txtFld = $.txtTradeLicExpiry;
	$.hiddenfiledtostore.hide();
	showCitizen();
}

function dropBoxSuccess(byteData) { //alert("test call");
	Ti.API.info('phot dropbox'+ byteData);
	AddImageToView({
		mediaType : "dropbox",
		media : byteData
	});
}

function AddImageToView(e) {
	Ti.API.info(' open =========== AddImageToView ');
	//var selected_Image = e.media;
	var mediaFileName;

	//Ti.API.info('image : ' + JSON.stringify(e) + 'attachmentType'+attachmentType + "size iage" +selected_Image.size);

	//var heightOfImage = selected_Image.height;
	//var widthOfImage = selected_Image.width;

	//var newHeight = 500;

	var mime_type = e.media.mimeType;
	var arr = Array();
	arr = mime_type.split('/');
	var image_type = arr[1];
	var image_name = arr[1];
	mediaFileName = new Date().getTime() + "." + arr[1];

	//Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading, false);
	//Alloy.Globals.hideLoading();

	try {
		//Ti.API.info('image size'+ selected_Image.size);
		//if (heightOfImage > newHeight) {
		//selected_Image.imageAsResized(400, 480);
		//}
	   var resized;
	   if(e.mediaType == "dropbox"){
	   	resized = e.media;
	   }else{
	       if (Ti.Platform.osname == "android") 
	       {
	       	selected_Image = e.media;
	       	selected_Image.imageAsResized(200, 200);
	       	resized = selected_Image;
	       }
	       else
	       {
			var imageView = Ti.UI.createImageView({
				image : e.media,
				width : 200,
				height : 200
			});
	
		       resized = imageView.toImage();
			}
		}	
		selected_Image = null;
		Ti.API.info("image size second one" + resized.size);

		if (resized.size > 6242880) {
			Alloy.Globals.hideLoading();
			utilities.showAlert(Alloy.Globals.selectedLanguage.registration, Alloy.Globals.selectedLanguage.fileSizeExceed);
			return;
		}
		
		
		for (var p = 0; p < arrSelectedImage.length; p++) {
			Ti.API.info(arrSelectedImage[p].imgType + ' images type in array match: ' + attachmentType);
			if (arrSelectedImage[p].imgType == attachmentType) {
				arrSelectedImage.splice(p, 1);
			}
		}

		var objAttch = {
			filename : mediaFileName,
			data : Ti.Utils.base64encode(resized).toString(),
			docName : mediaFileName,
			docTitle : attachmentType,
			docType : image_type
		};
		 Ti.API.info('OBJ DATA BEFORE::: '+JSON.stringify(objAttch));
		// httpManager.uploadDocumentList(objAttch, function(responce) {
		httpManager.sendUploadedPhotoToServer(function(responce) {
			Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading);
			if (responce != null) {
                
                setTimeout(function()
				{
				  httpManager.getWeburlfromDID(responce, function(responce){
                	 if (responce != null) {
                	 	
                	 	onUploadMedia(responce);
                	 }
                	 Alloy.Globals.hideLoading();
                });
				},7000);
				//onUploadMedia(responce);
			} else {
				//utilities.showAlert(Alloy.Globals.selectedLanguage.registration, Alloy.Globals.selectedLanguage.uploadDocfailed);
			}
			selected_Image = null;
			// imageView = null;
			objAttch = {
				filename : undefined,
				data : undefined,
				docName : undefined,
				docTitle : undefined,
				docType : undefined
			};
		},objAttch);

		//$.imageviewProfile.image = selected_Image;
	} catch(ex) {
		Ti.API.info('Exception: ' + ex);
	}
}

function onUploadMedia(responce) {
	arrSelectedImage.push({
		imgType : responce.attachmentType,
		fileName : responce.mediaFileName,
		did : responce.did,
		url : responce.url,
	});
	Ti.API.info("attch type " + attachmentType + "" + responce.message_En + 'arrSelectedImage images in array: ' + JSON.stringify(arrSelectedImage));
	switch(attachmentType) {
	case "Emirate Id Front":
		$.txtEmiratedFrontAttch.value = responce.mediaFileName;
		$.txtEmiratedFrontAttchEst.value = responce.mediaFileName;
		break;
	case "Emirate Id Back":
		$.txtEmiratedBackAttch.value = responce.mediaFileName;
		$.txtEmiratedBackAttchEst.value = responce.mediaFileName;
		break;
	case "Passport Front":
		$.txtPassportFrontAttch.value = responce.mediaFileName;
		break;
	case "Passport Residency Page":
		$.txtPassportResidentpage.value = responce.mediaFileName;
		break;
	case "Visa Page":
		$.txtVisaPage.value = responce.mediaFileName;
		break;
	case "Family Book":
		$.txtFamilyBookAttch.value = responce.mediaFileName;
		break;
	case "Trade License": 
		$.txtTradeLicenseAttch.value = responce.mediaFileName;
		break;
	case "Signatories Attestation":
		$.txtSignatureAttest.value = responce.mediaFileName;
		break;
	}
	utilities.showAlert(Alloy.Globals.selectedLanguage.registration, Alloy.Globals.selectedLanguage.uploadDocSuccess);
}

// This is open camera and attached capture image
function showCamera(arg) {

	try {
		Ti.API.info(' error =========== camera success ');
		Titanium.API.info('Available memory:' + Titanium.Platform.availableMemory);
		Titanium.Media.showCamera({
			success : AddImageToView,
			cancel : function() {
				Ti.API.info(' Cancelled ');
			},
			error : function(error) {
				Ti.API.info(' error =========== camera ');
				//if (error.code == 2) {
				utilities.showAlert(Alloy.Globals.selectedLanguage.attachMedia, Alloy.Globals.selectedLanguage.cameraNotAvail);
				//}
			},
			allowEditing : false,
			saveToPhotoGallery : false,
			mediaTypes : arrMediaTypes,
		});

	} catch(ex) {
	}

}

// This function is open device gallery for select image to attached
function choosePhotoGallery(arg) {
	try {
		Titanium.API.info('Available memory:' + Titanium.Platform.availableMemory);
		Titanium.Media.openPhotoGallery({
			success : AddImageToView, // end of success block
			cancel : function() {
				Ti.API.info(' Cancelled ');
			},
			error : function(error) {
				Ti.API.info(' An error occurred!! ');
			},
			allowEditing : true,
			mediaTypes : arrMediaTypes,

		});
	} catch(ex) {
	}

}

function validateImageUpload() {

	arrSelectedImage = [];
	$.txtEmiratedFrontAttchEst.value = "";
	$.txtEmiratedBackAttchEst.value = "";
	$.txtEmiratedFrontAttch.value = "";
	$.txtEmiratedBackAttch.value = "";
	$.txtPassportResidentpage.value = "";
	$.txtVisaPage.hintText.value = "";
	$.txtTradeLicenseAttch.value = "";
	$.txtSignatureAttest.value = "";
	$.txtFamilyBookAttch.value = "";
	$.txtPassportFrontAttch.value = "";
	$.textfieldNationality.value = "";

	$.textCountryResidence.value = "";
	$.textMobileNum.value = "";
	$.textMobileNum2.value = "";
	$.landLine.value = "";
	$.txtAddressIndiv.value = "";
	$.textfieldEmail.value = "";
	$.textfieldEmailConfirm.value = "";
	$.txtFieldEstablishName.value = "";
	$.txtFieldEstablishMobileNum.value = "";
	$.txtFieldOfficePhone.value = "";
	$.txtFieldEmailAddressEstabsh.value = "";
	$.txtFieldEmailAddressEstabshConfirm.value = "";
	$.txtAddressEstblsh.value = "";
	$.textEmiratesEstablish.value = "";

	$.txtPostBoxEstblsh.value = "";
	$.txtTradeLicNumEstblsh.value = "";
	$.txtTradeLicExpiry.value = "";
	$.textTradelicTypeEstablish.value = "";
	$.txtTradeLicenseAttch.value = "";
	$.txtSignatureAttest.value = "";
	$.textfieldUserName.value = "";
	$.textfieldPassword.value = "";
	$.passwordStrength.value = "";
	$.textfieldConfirmPassword.value = "";
	$.textfieldFullName.value = "";

	$.textfEmiratesId.value = "";
	$.textfEmiratesIdEstb.value = "";
	$.textfieldIdExpiry.value = "";
	$.textfieldEmirates.value = "";
	$.textfieldDOB.value = "";
	$.txtEmiratedFrontAttch.value = "";
	$.txtEmiratedBackAttch.value = "";
	$.fullNamePassport.value = "";
	$.textfPassportNum.value = "";

	$.txtPassportFrontAttch.value = "";
	$.txtPassportResidentpage.value = "";
	$.imageviewVisaPage.value = "";
	$.txtFullNameBook.value = "";
	$.textfieldEmiratesBook.value = "";
	$.txtTownName.value = "";
	$.txtTownNumber.value = "";
	$.txtFamilyNum.value = "";

	$.txtTribeName.value = "";
	$.txtClanNumber.value = "";
	$.txtfIssueDate.value = "";
	$.txtMotherName.value = "";

	$.txtMothersFatherNme.value = "";
	$.txtFamilyBookAttch.value = "";
	
	$.passwordStrength.text = " ";

}

function AttachImage(e) {
	Ti.API.info("===========" + JSON.stringify(e.source));
	attachmentType = e.source.imgType;
	mediaOptionDialog.show();
}

function doSubscribe(e) {
	if (e.source.isSelected) {
		$.imageviewSubscription.backgroundImage = Alloy.Globals.path.checkInactive;
	} else {
		$.imageviewSubscription.backgroundImage = Alloy.Globals.path.checkActive;
	}
	e.source.isSelected = !e.source.isSelected;
}

function doHasFamilybook(e) {
	if (e.source.isSelected) {
		$.imageviewHasfamilyBook.backgroundImage = Alloy.Globals.path.checkInactive;
		$.viewShowHideFamilyBook.visible = false;
		$.viewShowHideFamilyBook.height = 0;
		$.viewShowHideFamilyBook.width = 0;
	} else {
		$.imageviewHasfamilyBook.backgroundImage = Alloy.Globals.path.checkActive;
		$.viewShowHideFamilyBook.visible = true;
		$.viewShowHideFamilyBook.height = Titanium.UI.SIZE;
		$.viewShowHideFamilyBook.width = undefined;
	}
	e.source.isSelected = !e.source.isSelected;
}

function doIndivCitizen(e) {
	changeUserState(e.source.isSelected, "citizen");
	Ti.API.info("individual citizen choosen or not" + e.source.isSelected);
}

function doIndivResident(e) {
	changeUserState(e.source.isSelected, "resident");
	Ti.API.info("resident choosen or not" + e.source.isSelected);
}

function doIndivlVisitor(e) {
	changeUserState(e.source.isSelected, "visitor");
	Ti.API.info("visitor choosen or not" + e.source.isSelected);
}

function doEstablishment(e) {
	changeUserState(e.source.isSelected, "establish");
	Ti.API.info("establish choosen or not" + e.source.isSelected);
}

function doIndivGccCitizen(e) {
	changeUserState(e.source.isSelected, "GccCitizen");
	Ti.API.info("GccCitizen choosen or not" + e.source.isSelected);
}

function doIndividGccResident(e) {
	changeUserState(e.source.isSelected, "GccResident");
	Ti.API.info("GccResident choosen or not" + e.source.isSelected);
}

function changeUserState(status, userType) {

	$.viewShowHideFamilyBook.height = 0;
	$.viewShowHideFamilyBook.width = 0;

    validateImageUpload();
	$.textfieldNationality.value = "";
	$.textCountryResidence.value = "";
	$.textfieldNationality.color = Alloy.Globals.path.darkGray;
	$.textCountryResidence.color = Alloy.Globals.path.darkGray;
	((userType == "citizen") && (status == false)) ? showCitizen() : "";
	((userType == "resident") && (status == false)) ? showResident() : "";
	((userType == "visitor") && (status == false)) ? showVisistor() : "";
	((userType == "establish") && (status == false)) ? showEstablish() : "";
	((userType == "GccCitizen") && (status == false)) ? showGccCitizen() : "";
	((userType == "GccResident") && (status == false)) ? showGccResident() : "";
	
    //$.textfieldNationality.hintText = Alloy.Globals.selectedLanguage.nationality;
}

function showCitizen() {
	$.viewIndividualCitz.isSelected = true;
	$.imageviewIndividCitizen.backgroundImage = Alloy.Globals.path.radioActive;
	$.viewIndivResident.isSelected = false;
	$.imageviewIndividResident.backgroundImage = Alloy.Globals.path.radioInactive;
	$.viewIndivGccCitizen.isSelected = false;
	$.imageviewIndividGCCcitizen.backgroundImage = Alloy.Globals.path.radioInactive;
	$.viewIndivGccResident.isSelected = false;
	$.imageviewIndividGccResident.backgroundImage = Alloy.Globals.path.radioInactive;
	$.viewIndivVisitor.isSelected = false;
	$.imageviewIndividVisitor.backgroundImage = Alloy.Globals.path.radioInactive;
	$.viewEstablishment.isSelected = false;
	$.imageviewEstablishment.backgroundImage = Alloy.Globals.path.radioInactive;
	$.viewShowHideAccountDetailsIndivid.width = undefined;
	$.viewShowHideAccountDetailsIndivid.height = Titanium.UI.SIZE;
	$.viewShowHidePassportInformation.width = undefined;
	$.viewShowHidePassportInformation.height = Titanium.UI.SIZE;
	$.viewShowHideIDInformation.width = undefined;
	$.viewShowHideIDInformation.height = Titanium.UI.SIZE;
	$.viewHideFamilyBookSplitter.width = 0;
	$.viewHideFamilyBookSplitter.height = 0;
	$.viewShowAccountDetailsEstablish.width = 0;
	$.viewShowAccountDetailsEstablish.height = 0;
	$.passportFullnameShow.width = 0;
	$.passportFullnameShow.height = 0;
	$.pssportBackShow.width = 0;
	$.pssportBackShow.height = 0;
	$.visaPageHide.width = 0;
	$.visaPageHide.height = 0;
	$.showImageDetailsView1.width = 30;
	$.showImageDetailsView1.height = undefined;
	$.hintTextViewFullname.width = undefined;
	$.hintTextViewFullname.height = 10;
	$.hintTextViewPassport.widht = 0;
	$.hintTextViewPassport.height = 0;
	$.hintTextViewFullnameEst.widht = 0;
	$.hintTextViewFullnameEst.height = 0;
	$.hintTextViewBook.width = undefined;
	$.hintTextViewBook.height = 10;
	$.viewfamilbookSubscription.isSelected = false;
	$.viewShowHideFamilyBook.height = 0;
	$.viewShowHideFamilyBook.width = 0;
	$.imageviewHasfamilyBook.backgroundImage = Alloy.Globals.path.checkInactive;

	$.lblidFulName.show();
	$.lblEmiratesId.show();
	$.lblIdExpiry.show();
	$.lblEmiratesCh.show();
	$.lblDOBvalid.show();
	$.lblEmiFront.show();
	$.lblEmiBack.show();

	$.lblRegUserTypeStore.text = 1;
	$.lblRegApplicantTypeStore.text = 1;

	$.textfieldNationality.value = (Alloy.Globals.isEnglish) ? "United Arab Emirates" : "الإمارات العربية المتحدة";
	selectedCitizenship = 1;

}

function showResident() {
	$.viewIndivResident.isSelected = true;
	$.imageviewIndividResident.backgroundImage = Alloy.Globals.path.radioActive;
	$.viewIndividualCitz.isSelected = false;
	$.imageviewIndividCitizen.backgroundImage = Alloy.Globals.path.radioInactive;
	$.viewIndivGccCitizen.isSelected = false;
	$.imageviewIndividGCCcitizen.backgroundImage = Alloy.Globals.path.radioInactive;
	$.viewIndivGccResident.isSelected = false;
	$.imageviewIndividGccResident.backgroundImage = Alloy.Globals.path.radioInactive;
	$.viewIndivVisitor.isSelected = false;
	$.imageviewIndividVisitor.backgroundImage = Alloy.Globals.path.radioInactive;
	$.viewEstablishment.isSelected = false;
	$.imageviewEstablishment.backgroundImage = Alloy.Globals.path.radioInactive;
	$.viewShowHideIDInformation.width = undefined;
	$.viewShowHideIDInformation.height = Titanium.UI.SIZE;
	$.viewShowHideAccountDetailsIndivid.width = undefined;
	$.viewShowHideAccountDetailsIndivid.height = Titanium.UI.SIZE;
	$.viewShowHidePassportInformation.width = undefined;
	$.viewShowHidePassportInformation.height = Titanium.UI.SIZE;
	$.viewShowAccountDetailsEstablish.width = 0;
	$.viewShowAccountDetailsEstablish.height = 0;
	$.viewHideFamilyBookSplitter.width = 0;
	$.viewHideFamilyBookSplitter.height = 0;
	$.viewShowHideFamilyBook.height = 0;
	$.viewShowHideFamilyBook.width = 0;
	$.passportFullnameShow.width = 0;
	$.passportFullnameShow.height = 0;
	$.pssportBackShow.width = undefined;
	$.pssportBackShow.height = (Alloy.isTablet) ? 45 : 45;
	$.visaPageHide.width = 0;
	$.visaPageHide.height = 0;
	$.showImageDetailsView1.width = 30;
	$.showImageDetailsView1.height = undefined;
	$.hintTextViewFullname.width = undefined;
	$.hintTextViewFullname.height = 10;
	$.hintTextViewPassport.widht = 0;
	$.hintTextViewPassport.height = 0;
	$.hintTextViewFullnameEst.widht = 0;
	$.hintTextViewFullnameEst.height = 0;
	$.hintTextViewBook.width = 0;
	$.hintTextViewBook.height = 0;
	$.viewfamilbookSubscription.isSelected = false;
	$.imageviewHasfamilyBook.backgroundImage = Alloy.Globals.path.checkInactive;

	$.lblidFulName.show();
	$.lblEmiratesId.show();
	$.lblIdExpiry.show();
	$.lblEmiratesCh.show();
	$.lblDOBvalid.show();
	$.lblEmiFront.show();
	$.lblEmiFront.show();
	$.lblEmiBack.show();

	$.lblRegUserTypeStore.text = 1;
	$.lblRegApplicantTypeStore.text = 2;
	
	$.textCountryResidence.value = (Alloy.Globals.isEnglish) ? "United Arab Emirates" : "الإمارات العربية المتحدة";
	selectedResidence = 1;
}

function showGccCitizen() {
	$.viewIndivGccCitizen.isSelected = true;
	$.imageviewIndividGCCcitizen.backgroundImage = Alloy.Globals.path.radioActive;
	$.viewIndivGccResident.isSelected = false;
	$.imageviewIndividGccResident.backgroundImage = Alloy.Globals.path.radioInactive;
	$.viewIndivVisitor.isSelected = false;
	$.imageviewIndividVisitor.backgroundImage = Alloy.Globals.path.radioInactive;
	$.viewIndividualCitz.isSelected = false;
	$.imageviewIndividCitizen.backgroundImage = Alloy.Globals.path.radioInactive;
	$.viewIndivResident.isSelected = false;
	$.imageviewIndividResident.backgroundImage = Alloy.Globals.path.radioInactive;
	$.viewEstablishment.isSelected = false;
	$.imageviewEstablishment.backgroundImage = Alloy.Globals.path.radioInactive;
	$.viewShowHideIDInformation.width = undefined;
	$.viewShowHideIDInformation.height = Titanium.UI.SIZE;
	$.viewShowHideAccountDetailsIndivid.width = undefined;
	$.viewShowHideAccountDetailsIndivid.height = Titanium.UI.SIZE;
	$.viewShowHidePassportInformation.width = undefined;
	$.viewShowHidePassportInformation.height = Titanium.UI.SIZE;
	$.viewShowAccountDetailsEstablish.width = 0;
	$.viewShowAccountDetailsEstablish.height = 0;
	$.viewHideFamilyBookSplitter.width = 0;
	$.viewHideFamilyBookSplitter.height = 0;
	$.viewShowHideFamilyBook.height = 0;
	$.viewShowHideFamilyBook.width = 0;
	$.passportFullnameShow.width = undefined;
	$.passportFullnameShow.height = (Alloy.isTablet) ? 55 : 45;
	$.pssportBackShow.width = 0;
	$.pssportBackShow.height = 0;
	$.visaPageHide.width = 0;
	$.visaPageHide.height = 0;
	$.showImageDetailsView1.width = 30;
	$.showImageDetailsView1.height = undefined;
	$.hintTextViewFullname.width = undefined;
	$.hintTextViewFullname.height = 10;
	$.hintTextViewPassport.widht = undefined;
	$.hintTextViewPassport.height = 10;
	$.hintTextViewFullnameEst.widht = 0;
	$.hintTextViewFullnameEst.height = 0;
	$.hintTextViewBook.width = 0;
	$.hintTextViewBook.height = 0;
	$.viewfamilbookSubscription.isSelected = false;
	$.imageviewHasfamilyBook.backgroundImage = Alloy.Globals.path.checkInactive;

	$.lblidFulName.hide();
	$.lblEmiratesId.hide();
	$.lblIdExpiry.hide();
	$.lblEmiratesCh.hide();
	$.lblDOBvalid.hide();
	$.lblEmiFront.hide();
	$.lblEmiFront.hide();
	$.lblEmiBack.hide();

	$.lblRegUserTypeStore.text = 1;
	$.lblRegApplicantTypeStore.text = 3;
}

function showGccResident() {

	$.viewIndivGccCitizen.isSelected = false;
	$.imageviewIndividGCCcitizen.backgroundImage = Alloy.Globals.path.radioInactive;
	$.viewIndivGccResident.isSelected = true;
	$.imageviewIndividGccResident.backgroundImage = Alloy.Globals.path.radioActive;
	$.viewIndivResident.isSelected = false;
	$.imageviewIndividResident.backgroundImage = Alloy.Globals.path.radioInactive;
	$.viewIndividualCitz.isSelected = false;
	$.imageviewIndividCitizen.backgroundImage = Alloy.Globals.path.radioInactive;
	$.viewIndivVisitor.isSelected = false;
	$.imageviewIndividVisitor.backgroundImage = Alloy.Globals.path.radioInactive;
	$.viewEstablishment.isSelected = false;
	$.imageviewEstablishment.backgroundImage = Alloy.Globals.path.radioInactive;
	$.viewShowHideAccountDetailsIndivid.width = undefined;
	$.viewShowHideAccountDetailsIndivid.height = Titanium.UI.SIZE;
	$.viewShowHidePassportInformation.width = undefined;
	$.viewShowHidePassportInformation.height = Titanium.UI.SIZE;
	$.viewShowAccountDetailsEstablish.width = 0;
	$.viewShowAccountDetailsEstablish.height = 0;
	// to do
	//$.viewShowHideIDInformation.hide();
	//$.viewShowHideIDInformation.width =0;
	$.viewShowHideIDInformation.height = 0;
	$.viewHideFamilyBookSplitter.width = 0;
	$.viewHideFamilyBookSplitter.height = 0;
	$.viewShowHideFamilyBook.height = 0;
	$.viewShowHideFamilyBook.width = 0;
	$.passportFullnameShow.width = undefined;
	$.passportFullnameShow.height = (Alloy.isTablet) ? 45 : 45;
	;
	$.pssportBackShow.width = undefined;
	$.pssportBackShow.height = (Alloy.isTablet) ? 45 : 45;
	$.visaPageHide.width = 0;
	$.visaPageHide.height = 0;
	$.showImageDetailsView1.width = 0;
	$.showImageDetailsView1.height = 0;
	//$.hintTextViewFullname.width = 0;
	//$.hintTextViewFullname.height = 0;
	$.hintTextViewPassport.widht = undefined;
	$.hintTextViewPassport.height = 10;
	$.hintTextViewFullnameEst.widht = 0;
	$.hintTextViewFullnameEst.height = 0;
	$.hintTextViewBook.width = 0;
	$.hintTextViewBook.height = 0;
	$.viewfamilbookSubscription.isSelected = false;
	$.imageviewHasfamilyBook.backgroundImage = Alloy.Globals.path.checkInactive;

	$.lblRegUserTypeStore.text = 1;
	$.lblRegApplicantTypeStore.text = 4;
}

function showVisistor() {
	$.viewIndivVisitor.isSelected = true;
	$.imageviewIndividVisitor.backgroundImage = Alloy.Globals.path.radioActive;
	$.viewIndividualCitz.isSelected = false;
	$.imageviewIndividCitizen.backgroundImage = Alloy.Globals.path.radioInactive;
	$.viewIndivResident.isSelected = false;
	$.imageviewIndividResident.backgroundImage = Alloy.Globals.path.radioInactive;
	$.viewIndivGccCitizen.isSelected = false;
	$.imageviewIndividGCCcitizen.backgroundImage = Alloy.Globals.path.radioInactive;
	$.viewIndivGccResident.isSelected = false;
	$.imageviewIndividGccResident.backgroundImage = Alloy.Globals.path.radioInactive;
	$.viewEstablishment.isSelected = false;
	$.imageviewEstablishment.backgroundImage = Alloy.Globals.path.radioInactive;
	$.viewShowHideAccountDetailsIndivid.width = undefined;
	$.viewShowHideAccountDetailsIndivid.height = Titanium.UI.SIZE;
	$.viewShowHidePassportInformation.width = undefined;
	$.viewShowHidePassportInformation.height = Titanium.UI.SIZE;
	$.viewShowAccountDetailsEstablish.width = 0;
	$.viewShowAccountDetailsEstablish.height = 0;
	//test
	$.viewShowHideIDInformation.width = 0;
	$.viewShowHideIDInformation.height = 0;
	$.viewHideFamilyBookSplitter.width = 0;
	$.viewHideFamilyBookSplitter.height = 0;
	//test
	$.viewShowHideFamilyBook.height = 0;
	$.viewShowHideFamilyBook.width = 0;
	$.passportFullnameShow.width = undefined;
	$.passportFullnameShow.height = (Alloy.isTablet) ? 45 : 45;
	$.pssportBackShow.width = 0;
	$.pssportBackShow.height = 0;

	$.visaPageHide.width = undefined;
	$.visaPageHide.height = (Alloy.isTablet) ? 45 : 45;
	$.showImageDetailsView1.width = 0;
	$.showImageDetailsView1.height = 0;
	//$.hintTextViewFullname.width = 0;
	//$.hintTextViewFullname.height = 0;
	$.hintTextViewPassport.widht = undefined;
	$.hintTextViewPassport.height = 10;
	$.hintTextViewFullnameEst.widht = 0;
	$.hintTextViewFullnameEst.height = 0;
	$.hintTextViewBook.width = 0;
	$.hintTextViewBook.height = 0;
	$.viewfamilbookSubscription.isSelected = false;
	$.imageviewHasfamilyBook.backgroundImage = Alloy.Globals.path.checkInactive;

	$.lblRegUserTypeStore.text = 1;
	$.lblRegApplicantTypeStore.text = 5;
}

function showEstablish() {
	$.viewEstablishment.isSelected = true;
	$.imageviewEstablishment.backgroundImage = Alloy.Globals.path.radioActive;
	$.viewIndividualCitz.isSelected = false;
	$.imageviewIndividCitizen.backgroundImage = Alloy.Globals.path.radioInactive;
	$.viewIndivResident.isSelected = false;
	$.imageviewIndividResident.backgroundImage = Alloy.Globals.path.radioInactive;
	$.viewIndivGccCitizen.isSelected = false;
	$.imageviewIndividGCCcitizen.backgroundImage = Alloy.Globals.path.radioInactive;
	$.viewIndivGccResident.isSelected = false;
	$.imageviewIndividGccResident.backgroundImage = Alloy.Globals.path.radioInactive;
	$.viewIndivVisitor.isSelected = false;
	$.imageviewIndividVisitor.backgroundImage = Alloy.Globals.path.radioInactive;
	$.viewShowAccountDetailsEstablish.width = undefined;
	$.viewShowAccountDetailsEstablish.height = Titanium.UI.SIZE;
	$.viewShowHideAccountDetailsIndivid.width = 0;
	$.viewShowHideAccountDetailsIndivid.height = 0;
	$.viewShowHidePassportInformation.width = 0;
	$.viewShowHidePassportInformation.height = 0;
	$.viewShowHideIDInformation.width = 0;
	$.viewShowHideIDInformation.height = 0;
	$.viewHideFamilyBookSplitter.width = 0;
	$.viewHideFamilyBookSplitter.height = 0;
	$.viewShowHideFamilyBook.height = 0;
	$.viewShowHideFamilyBook.width = 0;
	//$.hintTextViewFullname.width = 0;
	//$.hintTextViewFullname.height = 0;
	$.hintTextViewPassport.widht = 0;
	$.hintTextViewPassport.height = 0;
	$.hintTextViewFullnameEst.widht = undefined;
	$.hintTextViewFullnameEst.height = 10;
	$.hintTextViewBook.width = 0;
	$.hintTextViewBook.height = 0;
	$.viewfamilbookSubscription.isSelected = false;
	$.imageviewHasfamilyBook.backgroundImage = Alloy.Globals.path.checkInactive;

	$.lblRegUserTypeStore.text = 2;
	$.lblRegApplicantTypeStore.text = 6;

}

function hideAlluserFields() {

}

var suggestionPayload = {
	data : [],
	title : Alloy.Globals.selectedLanguage.suggestions
};
function selectSuggestion() {
	var winSelection = Alloy.createController("winSelection", suggestionPayload).getView();
	winSelection.open();
}

function setSelectedCitizenShip(e) {
	$.textfieldNationality.value = (Alloy.Globals.isEnglish) ? e.obj.title : e.obj.titleAr;
	selectedCitizenship = e.obj.id;
}

var arrCitizenList = [];
var arrUAECntryList = [];
var arrGCCCntryList = [];
var arrALLCntryList = [];

function CountrySetSwitch() {

	if ($.lblRegApplicantTypeStore.text == 1) {
		return arrUAECntryList;
	}
	if ($.lblRegApplicantTypeStore.text == 2) {
		return arrALLCntryList;
	}
	if ($.lblRegApplicantTypeStore.text == 3) {
		return arrGCCCntryList;
	}
	if ($.lblRegApplicantTypeStore.text == 4) {
		return arrALLCntryList;
	}
	if ($.lblRegApplicantTypeStore.text == 5) {
		return arrALLCntryList;
	}

}

function selectCitizenShip() {
	Ti.API.info('citizencaled on click');

	var returnArry = CountrySetSwitch();
	Ti.API.info('citizencaled on click');

	if (returnArry.length == 0) {
		httpManager.getNationalityLookup($.lblRegApplicantTypeStore.text, "cntryCitizen", function(responce) {
			if (responce != null) {
				Ti.API.info('>>>>>>>' + JSON.stringify(responce));
				returnArry = responce;
				Alloy.createController("winSelection", {
					data : returnArry,
					title : Alloy.Globals.selectedLanguage.nationality,
					callBackFunction : setSelectedCitizenShip
				}).getView().open();
			}
		});
	} else {
		Alloy.createController("winSelection", {
			data : arrCitizenList,
			title : Alloy.Globals.selectedLanguage.nationality,
			callBackFunction : setSelectedCitizenShip
		}).getView().open();
	}

}

function setSelectedCntryResidence(e) {
	$.textCountryResidence.value = (Alloy.Globals.isEnglish) ? e.obj.title : e.obj.titleAr;
	selectedResidence = e.obj.id;
}

function selectCtryResidence() {
	var returnArry = CountrySetSwitch();
	if (returnArry.length == 0) {
		httpManager.getNationalityLookup($.lblRegApplicantTypeStore.text, "cntryResidence", function(responce) {
			if (responce != null) {
				Ti.API.info('>>>>>>>' + JSON.stringify(responce));
				returnArry = responce;
				Alloy.createController("winSelection", {
					data : returnArry,
					title : Alloy.Globals.selectedLanguage.countryResidence,
					callBackFunction : setSelectedCntryResidence
				}).getView().open();
			}
		});
	} else {
		Alloy.createController("winSelection", {
			data : arrCitizenList,
			title : Alloy.Globals.selectedLanguage.countryResidence,
			callBackFunction : setSelectedCntryResidence
		}).getView().open();
	}
}

function setSelectedEmiratesIdInfo(e) {
	$.textfieldEmirates.value = (Alloy.Globals.isEnglish) ? e.obj.title : e.obj.titleAr;
	selectedEmiratesIdInfo = e.obj.id;
}

function setSelectedEmiratesBook(e) {
	$.textfieldEmiratesBook.value = (Alloy.Globals.isEnglish) ? e.obj.title : e.obj.titleAr;
	selectedEmiratesBook = e.obj.id;
}

function setSelectedEmiratesEstablish(e) {
	$.textEmiratesEstablish.value = (Alloy.Globals.isEnglish) ? e.obj.title : e.obj.titleAr;
	selectedEmiratesEstablish = e.obj.id;
}

var arrEmiratesList = [];

function selectEmiratesReg(e) {
	var emirateChoosenType = e.source.emiratesId;
	var functionnametocall;
	if (emirateChoosenType == 1) {
		functionnametocall = setSelectedEmiratesIdInfo;
	} else if (emirateChoosenType == 2) {
		functionnametocall = setSelectedEmiratesBook;
	} else {
		functionnametocall = setSelectedEmiratesEstablish;
	}
	if (arrEmiratesList.length == 0) {
		httpManager.getEmiratesLookUp(function(responce) {
			if (responce != null) {
				Ti.API.info('>>>>>>>' + JSON.stringify(responce));
				arrEmiratesList = responce;
				Alloy.createController("winSelection", {
					data : arrEmiratesList,
					title : Alloy.Globals.selectedLanguage.chooseEmirates,
					callBackFunction : functionnametocall
				}).getView().open();
			}
		});
	} else {
		Alloy.createController("winSelection", {
			data : arrEmiratesList,
			title : Alloy.Globals.selectedLanguage.chooseEmirates,
			callBackFunction : functionnametocall
		}).getView().open();
	}

}

var arrTradeLiceList = [];

function setSelectTradeLicense(e) {
	$.textTradelicTypeEstablish.value = (Alloy.Globals.isEnglish) ? e.obj.title : e.obj.titleAr;
	selectedTradelicenseEst = e.obj.id;
}

function selectTradeLicType() {
	if (arrTradeLiceList.length == 0) {
		httpManager.getTradeLicenseType(function(responce) {
			if (responce != null) {
				Ti.API.info('>>>>>>>' + JSON.stringify(responce));
				arrTradeLiceList = responce;
				Alloy.createController("winSelection", {
					data : arrTradeLiceList,
					title : Alloy.Globals.selectedLanguage.tradeLicenseType,
					callBackFunction : setSelectTradeLicense
				}).getView().open();
			}
		});
	} else {
		Alloy.createController("winSelection", {
			data : arrTradeLiceList,
			title : Alloy.Globals.selectedLanguage.chooseEmirates,
			callBackFunction : setSelectTradeLicense
		}).getView().open();
	}

}

function submitRegistration() {
	//Alloy.Globals.openWindow(Alloy.createController('UserManagement/Registration/winSubmitOTP', {title:"OTP"}).getView());
	//httpClient.userLogin(username,password);

	Ti.API.info('submit regsitration usertype store' + $.lblRegUserTypeStore.text);

	if ($.lblRegUserTypeStore.text == 1) {
		Ti.API.info('submit regsitration usertype store' + $.lblRegUserTypeStore.text);
		switch($.lblRegApplicantTypeStore.text) {
		case 1:
			validateIndUaeCitizen();
			break;
		case 2:
			validateIndUaeResident();
			break;
		case 3:
			validateIndGccCitizen();
			break;
		case 4:
			validateIndGccResident();
			break;
		case 5:
			validateIndVisitor();
			break;
		}
	} else {
		Ti.API.info('submit regsitration usertype store' + $.lblRegUserTypeStore.text);
		validateEstablishment();
	}

}

function callRegistrationwebserive(obj) {

	httpManager.regstrationAllUserType(obj, function(responce) {

		if (responce != null) {
			Ti.API.info('reg responce ===' + JSON.stringify(responce));
			try {
				var regiSucess = Ti.UI.createAlertDialog({
					title : Alloy.Globals.selectedLanguage.registration,
					message : Alloy.Globals.selectedLanguage.registrationSuccessful + " " + responce.requestno,
					cancel : 0,
					buttonNames : [Alloy.Globals.selectedLanguage.ok]
				});
				regiSucess.addEventListener('click', function(e) {
					closeWindow();
				});
				regiSucess.show();
			} catch(e) {
				var regiSucess = Ti.UI.createAlertDialog({
					title : Alloy.Globals.selectedLanguage.registration,
					message : Alloy.Globals.selectedLanguage.registrationSuccessful,
					cancel : 0,
					buttonNames : [Alloy.Globals.selectedLanguage.ok]
				});
				regiSucess.addEventListener('click', function(e) {
					closeWindow();
				});
				regiSucess.show();
			}
			//utilities.showAlert(Alloy.Globals.selectedLanguage.registration, Alloy.Globals.selectedLanguage.registrationSuccessful);

		}

	});

}

function callGenerateOTP() {
	//utilities.showAlert(Alloy.Globals.selectedLanguage.registration, "Registration Successful");
	/*httpManager.generateOTPwebservice(objOTP, function(responce) {
	 if (responce != null) {
	 Ti.API.info('generate otp in winreg responce ===' + JSON.stringify(responce));
	 Alloy.createController('UserManagement/Registration/winSubmitOTP', {
	 data : responce,
	 title : "OTP"
	 //callBackFunction : setSelectTradeLicense
	 }).getView().open();

	 } else {
	 //utilities.showAlert(Alloy.Globals.selectedLanguage.registration, e.msg);
	 }

	 });	*/

}

function checkNumber(no) {
	return !no.match(/[^0-9+]/g);
}

function removeSpaces(string) {
	return string.split(' ').join('');
}

$.winRegistration.addEventListener('click', function(e) {
	/*$.textMobileNum.blur();
	 $.textMobileNum2.blur();
	 $.landLine.blur();
	 $.txtFieldEstablishMobileNum.blur();
	 $.txtFieldOfficePhone.blur();
	 $.textfEmiratesId.blur();*/
});

function addKeyDoneMob1(){
	var flexSpace = Titanium.UI.createButton({
    	systemButton : Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
	});
	
	var btnDone = Titanium.UI.createButton({    
	    title : Alloy.Globals.selectedLanguage.doneTitle,
	    width : 67,
	    height : 32
	});
	
	btnDone.addEventListener('click',function(e){
	    $.textMobileNum.blur();
	});
	
	
	$.textMobileNum.keyboardToolbar = [flexSpace, flexSpace,flexSpace, btnDone];
}
Ti.Platform.name == 'android' ? '' : addKeyDoneMob1();
function addKeyDoneMob2(){
	var flexSpace = Titanium.UI.createButton({
    	systemButton : Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
	});
	
	var btnDone = Titanium.UI.createButton({    
	    title : Alloy.Globals.selectedLanguage.doneTitle,
	    width : 67,
	    height : 32
	});
	
	btnDone.addEventListener('click',function(e){
	    $.textMobileNum2.blur();
	});
	
	
	$.textMobileNum2.keyboardToolbar = [flexSpace, flexSpace,flexSpace, btnDone];
}
Ti.Platform.name == 'android' ? '' : addKeyDoneMob2();
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
	    $.landLine.blur();
	});
	
	
	$.landLine.keyboardToolbar = [flexSpace, flexSpace,flexSpace, btnDone];
}
Ti.Platform.name == 'android' ? '' : addKeyDoneLand1();
function addKeyDoneMobEst1(){
	var flexSpace = Titanium.UI.createButton({
    	systemButton : Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
	});
	
	var btnDone = Titanium.UI.createButton({    
	    title : Alloy.Globals.selectedLanguage.doneTitle,
	    width : 67,
	    height : 32
	});
	
	btnDone.addEventListener('click',function(e){
	    $.txtFieldEstablishMobileNum.blur();
	});
	
	
	$.txtFieldEstablishMobileNum.keyboardToolbar = [flexSpace, flexSpace,flexSpace, btnDone];
}
Ti.Platform.name == 'android' ? '' : addKeyDoneMobEst1();
function addKeyDoneOffice1(){
	var flexSpace = Titanium.UI.createButton({
    	systemButton : Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
	});
	
	var btnDone = Titanium.UI.createButton({    
	    title : Alloy.Globals.selectedLanguage.doneTitle,
	    width : 67,
	    height : 32
	});
	
	btnDone.addEventListener('click',function(e){
	    $.txtFieldOfficePhone.blur();
	});
	
	
	$.txtFieldOfficePhone.keyboardToolbar = [flexSpace, flexSpace,flexSpace, btnDone];
}
Ti.Platform.name == 'android' ? '' : addKeyDoneOffice1();
function addKeyDoneEmiratesId(){
	var flexSpace = Titanium.UI.createButton({
    	systemButton : Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
	});
	
	var btnDone = Titanium.UI.createButton({    
	    title : Alloy.Globals.selectedLanguage.doneTitle,
	    width : 67,
	    height : 32
	});
	
	btnDone.addEventListener('click',function(e){
	    $.textfEmiratesId.blur();
	});
	
	
	$.textfEmiratesId.keyboardToolbar = [flexSpace, flexSpace,flexSpace, btnDone];
}
Ti.Platform.name == 'android' ? '' : addKeyDoneEmiratesId();
function addKeyDoneEmiratesIdEstb(){
	var flexSpace = Titanium.UI.createButton({
    	systemButton : Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
	});
	
	var btnDone = Titanium.UI.createButton({    
	    title : Alloy.Globals.selectedLanguage.doneTitle,
	    width : 67,
	    height : 32
	});
	
	btnDone.addEventListener('click',function(e){
	    $.textfEmiratesIdEstb.blur();
	});
	
	
	$.textfEmiratesIdEstb.keyboardToolbar = [flexSpace, flexSpace,flexSpace, btnDone];
}
Ti.Platform.name == 'android' ? '' : addKeyDoneEmiratesIdEstb();
function addKeyDonePostBox(){
	var flexSpace = Titanium.UI.createButton({
    	systemButton : Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
	});
	
	var btnDone = Titanium.UI.createButton({    
	    title : Alloy.Globals.selectedLanguage.doneTitle,
	    width : 67,
	    height : 32
	});
	
	btnDone.addEventListener('click',function(e){
	    $.txtPostBoxEstblsh.blur();
	});
	
	
	$.txtPostBoxEstblsh.keyboardToolbar = [flexSpace, flexSpace,flexSpace, btnDone];
}
Ti.Platform.name == 'android' ? '' : addKeyDonePostBox();

$.textfieldUserName.addEventListener('blur', function(e) {
	if (e.source.value.length == 0) {
		return;
	}
	var exp = /^[a-z0-9_ .-]*$/i;
	if (exp.test(e.source.value)) {
	} else {

		utilities.showAlert(Alloy.Globals.selectedLanguage.registration, Alloy.Globals.selectedLanguage.userNameValid);
		// TO do
		e.source.value = "";
		//$.textfieldUserName.focus();
	}
	var patt1 = /\s/g;
	if (patt1.test(e.source.value)) {
		utilities.showAlert(Alloy.Globals.selectedLanguage.registration, Alloy.Globals.selectedLanguage.userNameValid);
		// TO do
		e.source.value = "";
		//$.textfieldUserName.focus();
	}
});
if(Ti.Platform.name != 'android'){
		
	/*$.textfieldFullName.addEventListener('change', function(e) {
		e.source.value = e.source.value.replace(/[^a-zA-Z]+\s/g, "");
	});	
	$.fullNamePassport.addEventListener('change', function(e) {
		e.source.value = e.source.value.replace(/[^a-zA-Z]+\s/g, "");
	});
	$.txtFieldEstablishName.addEventListener('change', function(e) {
		e.source.value = e.source.value.replace(/[^a-zA-Z]+\s/g, "");
	});*/
}
$.textfieldFullName.addEventListener('blur', function(e) {
    if (e.source.value.length == 0) {
		return;
	}
	var exp = /^[^!@#$%^&*_=+()«\/<>?:;|=.,0123456789\-]*$/i;
	if (exp.test(e.source.value)) {
	} else {
		e.source.value = "";
		utilities.showAlert(Alloy.Globals.selectedLanguage.registration, Alloy.Globals.selectedLanguage.fullNameValid);
	}
	//var result = str.replace(/^[a-z0-9_ .-]*$/i, "");
});
$.textMobileNum.addEventListener('focus', function(e) {
	$.textMobileNum.value = e.source.value.replace(/[-]/gi, "");
	$.textMobileNum.maxLength = 10;
	
});	
$.textMobileNum.addEventListener('blur', function(e) {

	if (e.source.value.length == 0) {
		return;
	}
	$.textMobileNum.maxLength = 11;
	var f_val = e.source.value.replace(/[^0-9]/g, "");
	e.source.value = (f_val.length == 0) ? f_val : f_val.slice(0, 3) + "-" + f_val.slice(3, 10);

});
$.textMobileNum2.addEventListener('focus', function(e) {
	$.textMobileNum2.value = e.source.value.replace(/[-]/gi, "");
	$.textMobileNum2.maxLength = 10;
	
});	
$.textMobileNum2.addEventListener('blur', function(e) {
     if (e.source.value.length == 0) {
		return;
	}
	$.textMobileNum2.maxLength = 11;
	var f_val = e.source.value.replace(/[^0-9]/g, "");
	e.source.value = (f_val.length == 0) ? f_val : f_val.slice(0, 3) + "-" + f_val.slice(3, 10);
});
$.landLine.addEventListener('focus', function(e) {
	$.landLine.value = e.source.value.replace(/[-]/gi, "");
	$.landLine.maxLength = 9;
	
});	
$.landLine.addEventListener('blur', function(e) {
   if (e.source.value.length == 0) {
		return;
	}
	$.landLine.maxLength = 10;
	var f_val = e.source.value.replace(/[^0-9]/g, "");
	e.source.value = (f_val.length == 0) ? f_val : f_val.slice(0, 2) + "-" + f_val.slice(2, 9);
});
$.textfieldPassword.addEventListener('focus', function(e) {
	$.passwordStrength.text = "";
	
});
$.textfieldPassword.addEventListener('blur', function(e) {
	if (e.source.value.length == 0) {
		$.passwordStrength.text = "";
		return;
	}
    if (e.source.value.length >= 8 && e.source.value.length <= 15) {
    	var expNumbers = /[0-9]/g;
    	var expcharacter = /[a-z]/g;
    	var expcharacterCap = /[A-Z]/g;
    	var expSpecailChar = /[!@#\$%\^\&*\)\(+=._-]/g;
    	var score   = 0;
    	var passwordContent = 0;
    	
    	if((expNumbers.test(e.source.value))){	
    		 score++;
    	}
    	if((expcharacter.test(e.source.value))){	
    		 score++;
    	}
    	if((expcharacterCap.test(e.source.value))){	
    		 score++;
    	}
    	if((expSpecailChar.test(e.source.value))){	
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
		
		      e.source.value = "";
		      $.passwordStrength.text = "";
		}
    		   		  		    	
    	
    }
     else if (e.source.value.length < 8) {
		utilities.showAlert(Alloy.Globals.selectedLanguage.registration, Alloy.Globals.selectedLanguage.passwordValidate2);
		// TO do
		e.source.value = "";
		$.passwordStrength.text = "";
		//$.textfieldPassword.focus();
	}
	/*if (e.source.value.length >= 8 && e.source.value.length < 10) {
		$.passwordStrength.text = Alloy.Globals.selectedLanguage.weakTxt;
		var exp = /^[a-zA-Z0-9]+$/;
		if (exp.test(e.source.value)) {
            $.passwordStrength.text = "medium";
		} else {
			e.source.value = "";
			$.passwordStrength.text = "";
			//$.textfieldPassword.focus();
			utilities.showAlert(Alloy.Globals.selectedLanguage.registration, Alloy.Globals.selectedLanguage.passwordValidate);
			// TO do
		}

	} else if (e.source.value.length > 10 && e.source.value.length <= 15) {
		$.passwordStrength.text = Alloy.Globals.selectedLanguage.strongTxt;
	} else if (e.source.value.length < 8) {
		utilities.showAlert(Alloy.Globals.selectedLanguage.registration, Alloy.Globals.selectedLanguage.passwordValidate2);
		// TO do
		e.source.value = "";
		//$.textfieldPassword.focus();
	}*/

});
$.textfieldConfirmPassword.addEventListener('blur', function(e) {
	if (e.source.value.length == 0) {
		return;
	}
	if (e.source.value != $.textfieldPassword.value) {
		e.source.value = "";
		utilities.showAlert(Alloy.Globals.selectedLanguage.registration, Alloy.Globals.selectedLanguage.passwordMisMatch);
		//$.textfieldConfirmPassword.focus();
	}
});
//### establisj ## /
$.txtFieldEstablishMobileNum.addEventListener('focus', function(e) {
	$.txtFieldEstablishMobileNum.value = e.source.value.replace(/[-]/gi, "");
	$.txtFieldEstablishMobileNum.maxLength = 10;
	
});
$.txtFieldEstablishMobileNum.addEventListener('blur', function(e) {
    if (e.source.value.length == 0) {
		return;
	}
	$.txtFieldEstablishMobileNum.maxLength = 11;
	var f_val = e.source.value.replace(/[^0-9]/g, "");
	e.source.value = (f_val.length == 0) ? f_val : f_val.slice(0, 3) + "-" + f_val.slice(3, 10);
});
$.txtFieldOfficePhone.addEventListener('focus', function(e) {
	$.txtFieldOfficePhone.value = e.source.value.replace(/[-]/gi, "");
	$.txtFieldOfficePhone.maxLength = 9;
	
});
$.txtFieldOfficePhone.addEventListener('blur', function(e) {
    if (e.source.value.length == 0) {
		return;
	}
	$.txtFieldOfficePhone.maxLength = 10;
	var f_val = e.source.value.replace(/[^0-9]/g, "");
	e.source.value = (f_val.length == 0) ? f_val : f_val.slice(0, 3) + "-" + f_val.slice(3, 10);
});

$.txtFieldEstablishName.addEventListener('blur', function(e) {
	if (e.source.value.length == 0) {
		return;
	}
	var exp = /^[^!@#$%^&*_=+()«\/<>?:;|=.,0123456789\-]*$/i;
	Ti.API.info('validation full name' + exp.test(e.source.value));
	if (!exp.test(e.source.value)) {
		e.source.value = "";
		utilities.showAlert(Alloy.Globals.selectedLanguage.registration, Alloy.Globals.selectedLanguage.fullNameValid);
	} 

});

//#### passport  ## //
$.fullNamePassport.addEventListener('blur', function(e) {
	if (e.source.value.length == 0) {
		return;
	}
	var exp = /^[^!@#$%^&*_=+()«\/<>?:;|=.,0123456789\-]*$/i;
	if (exp.test(e.source.value)) {
	} else {
		e.source.value = "";
		utilities.showAlert(Alloy.Globals.selectedLanguage.registration, Alloy.Globals.selectedLanguage.fullNameValid);
	}

});
// ##### emisttea id
function emiratesClose(){
	 //$.textfEmiratesId.blur();
}
function emiratesCloseEstb(){
	$.textfEmiratesIdEstb.blur();
}
$.textfEmiratesId.addEventListener('focus', function(e) {
	$.textfEmiratesId.value = e.source.value.replace(/[-]/gi, "");
	$.textfEmiratesId.maxLength = 15;
	
});	
$.textfEmiratesId.addEventListener('blur', function(e) {
	if (e.source.value.length == 0) {
		return;
	}
	$.textfEmiratesId.maxLength = 18;
	var f_val = e.source.value.replace(/[^0-9]/g, "");
	f_val = f_val.replace(/[_-]/g, " ");
	e.source.value = (f_val.length == 0) ? f_val : f_val.slice(0, 3) + "-" + f_val.slice(3, 7) + "-" + f_val.slice(7, 14) + "-" + f_val.slice(14, 15);

});
$.textfEmiratesIdEstb.addEventListener('focus', function(e) {
	$.textfEmiratesIdEstb.value = e.source.value.replace(/[-]/gi, "");
	$.textfEmiratesIdEstb.maxLength = 15;
	
});	
$.textfEmiratesIdEstb.addEventListener('blur', function(e) {
	if (e.source.value.length == 0) {
		return;
	}
	$.textfEmiratesIdEstb.maxLength = 18;
	var f_val = e.source.value.replace(/[^0-9]/g, "");
	f_val = f_val.replace(/[_-]/g, " ");
	e.source.value = (f_val.length == 0) ? f_val : f_val.slice(0, 3) + "-" + f_val.slice(3, 7) + "-" + f_val.slice(7, 14) + "-" + f_val.slice(14, 15);

});

$.txtFullNameBook.addEventListener('blur', function(e) {
	if (e.source.value.length == 0) {
		return;
	}
	var exp = /^([a-zA-Z]+\s)*[a-zA-Z]+$/;
	if (exp.test(e.source.value)) {
	} else {
		e.source.value = "";
		utilities.showAlert(Alloy.Globals.selectedLanguage.registration, Alloy.Globals.selectedLanguage.fullNameValid);
	}

});
$.txtMothersFatherNme.addEventListener('blur', function(e) {
	if (e.source.value.length == 0) {
		return;
	}
	var exp = /^([a-zA-Z]+\s)*[a-zA-Z]+$/;
	if (exp.test(e.source.value)) {
	} else {
		e.source.value = "";
		utilities.showAlert(Alloy.Globals.selectedLanguage.registration, Alloy.Globals.selectedLanguage.fullNameValid);
	}
});
$.txtMotherName.addEventListener('blur', function(e) {
	if (e.source.value.length == 0) {
		return;
	}
	var exp = /^([a-zA-Z]+\s)*[a-zA-Z]+$/;
	if (exp.test(e.source.value)) {
	} else {
		e.source.value = "";
		utilities.showAlert(Alloy.Globals.selectedLanguage.registration, Alloy.Globals.selectedLanguage.fullNameValid);
	}
});

$.textfieldEmailConfirm.addEventListener('touchend', function(e) {
    Ti.UI.Clipboard.clearText();
});

$.txtFieldEmailAddressEstabshConfirm.addEventListener('touchend', function(e) {
    Ti.UI.Clipboard.clearText();
});
function commonValidationADCredential() {

	var statusValid = true;

	if ($.textfieldNationality.value.trim().length == 0) {
		utilities.showAlert(Alloy.Globals.selectedLanguage.registration, Alloy.Globals.selectedLanguage.plzCountryOfCitizenship);
		statusValid = false;
		return statusValid;
	}
	if ($.textCountryResidence.value.trim().length == 0) {
		utilities.showAlert(Alloy.Globals.selectedLanguage.registration, Alloy.Globals.selectedLanguage.plzCountryOfResidence);
		statusValid = false;
		return statusValid;
	}
	if ($.textMobileNum.value.trim().length == 0) {
		utilities.showAlert(Alloy.Globals.selectedLanguage.registration, Alloy.Globals.selectedLanguage.plzMobileNumber);
		statusValid = false;
		return statusValid;
	}
	//alert($.textMobileNum.value.length);

	/*if(checkNumber($.textMobileNum.value.trim()) == false  && $.textMobileNum.value.length !=11)
	 {
	 utilities.showAlert(Alloy.Globals.selectedLanguage.registration, Alloy.Globals.selectedLanguage.enterValidMobile);
	 statusValid = false;
	 return  statusValid;
	 }*/
	var textMobileNum = $.textMobileNum.value.replace(/[-]/gi, "");
	if (textMobileNum.trim().length != 10) {
		utilities.showAlert(Alloy.Globals.selectedLanguage.registration, Alloy.Globals.selectedLanguage.enterValidMobile);
		$.textMobileNum.value = "";
		statusValid = false;
		return statusValid;
	}
	var textMobileNum2 = $.textMobileNum2.value.replace(/[-]/gi, "");
	if (checkNumber($.textMobileNum2.value.trim()) == false  && textMobileNum2.trim().length != 10) {
		utilities.showAlert(Alloy.Globals.selectedLanguage.registration, Alloy.Globals.selectedLanguage.enterValidMobile);
		statusValid = false;
		return statusValid;
	}
    var landLineVal = $.landLine.value.replace(/[-]/gi, "");
    if(landLineVal.trim().length >=1){
		if(landLineVal.trim().length != 9){
		 utilities.showAlert(Alloy.Globals.selectedLanguage.registration, Alloy.Globals.selectedLanguage.enterValidlandline);
		 statusValid = false;
		 return  statusValid;
		 }
    }		 
	if ($.txtAddressIndiv.value.trim().length == 0) {
		utilities.showAlert(Alloy.Globals.selectedLanguage.registration, Alloy.Globals.selectedLanguage.plzAddressEstablish);
		statusValid = false;
		return statusValid;
	}
	if (utilities.isValidEmail($.textfieldEmail.value) == false) {
		utilities.showAlert(Alloy.Globals.selectedLanguage.registration, Alloy.Globals.selectedLanguage.enterValidEmail);
		statusValid = false;
		return statusValid;
	}
	if($.textfieldEmailConfirm.value.trim() != $.textfieldEmail.value.trim()){
		utilities.showAlert(Alloy.Globals.selectedLanguage.registration, Alloy.Globals.selectedLanguage.emailNotMatch);
		statusValid = false;
		return statusValid;
	}

	return statusValid;
}

function credientialValid() {
	var statusValid = true;
	if ($.textfieldUserName.value.trim().length == 0) {
		utilities.showAlert(Alloy.Globals.selectedLanguage.registration, Alloy.Globals.selectedLanguage.plzUserName);
		statusValid = false;
		return statusValid;
	}
	if ($.textfieldPassword.value.trim().length == 0) {
		utilities.showAlert(Alloy.Globals.selectedLanguage.registration, Alloy.Globals.selectedLanguage.plzPassword);
		statusValid = false;
		return statusValid;
	}
	if ($.textfieldPassword.value != $.textfieldConfirmPassword.value) {
		utilities.showAlert(Alloy.Globals.selectedLanguage.registration, Alloy.Globals.selectedLanguage.passwordMisMatch);
		statusValid = false;
		return statusValid;
	}
	return statusValid;
}

function idInformationValidate() {

	var statusValid = true;

	if ($.textfieldFullName.value.trim().length == 0) {
		utilities.showAlert(Alloy.Globals.selectedLanguage.registration, Alloy.Globals.selectedLanguage.plzFullNameIndiv);
		statusValid = false;
		return statusValid;
	}
	//$.textMobileNum2.value.replace(/[-]/gi, "")
	if ($.textfEmiratesId.value.trim().length == 0) {
		utilities.showAlert(Alloy.Globals.selectedLanguage.registration, Alloy.Globals.selectedLanguage.plzEmiratesId);
		statusValid = false;
		return statusValid;
	}
	
	var emiratesidcount = $.textfEmiratesId.value.replace(/[-]/gi, "");
	if (emiratesidcount.length != 15) {
		utilities.showAlert(Alloy.Globals.selectedLanguage.registration, Alloy.Globals.selectedLanguage.plzValidEmiratesId);
		$.textfEmiratesId.value = "";
		statusValid = false;
		return statusValid;
	}  //imageviewIdExpiryDropDown
	if ($.textfieldIdExpiry.value.trim().length == 0) {
		utilities.showAlert(Alloy.Globals.selectedLanguage.registration, Alloy.Globals.selectedLanguage.plzEmiratesExpdate);
		statusValid = false;
		return statusValid;
	}
	if ($.textfieldEmirates.value.trim().length == 0) {
		utilities.showAlert(Alloy.Globals.selectedLanguage.registration, Alloy.Globals.selectedLanguage.plzChooseEmirates);
		statusValid = false;
		return statusValid;
	}
	if ($.textfieldDOB.value.trim().length == 0) {
		utilities.showAlert(Alloy.Globals.selectedLanguage.registration, Alloy.Globals.selectedLanguage.plzChooseDOB);
		statusValid = false;
		return statusValid;
	}
	if ($.txtEmiratedFrontAttch.value.trim().length == 0) {
		utilities.showAlert(Alloy.Globals.selectedLanguage.registration, Alloy.Globals.selectedLanguage.plzEmiratedIDfrontAttch);
		statusValid = false;
		return statusValid;
	}//txtPassportFrontAttch
	if ($.txtEmiratedBackAttch.value.trim().length == 0) {
		utilities.showAlert(Alloy.Globals.selectedLanguage.registration, Alloy.Globals.selectedLanguage.plzEmiratesIdBackAttch);
		statusValid = false;
		return statusValid;
	}
	return statusValid;
}

function validateIndUaeCitizen() {

	var commonValid = commonValidationADCredential();
	if (commonValid == false) {
		return;
	}
	var credientValid = credientialValid();
	if (credientValid == false) {
		return;
	}
	var idInfoValid = idInformationValidate();
	if (idInfoValid == false) {
		return;
	}

	if ($.textfPassportNum.value.trim().length == 0) {
		utilities.showAlert(Alloy.Globals.selectedLanguage.registration, Alloy.Globals.selectedLanguage.plzPassportNum);
		return;
	}
	if ($.txtPassportFrontAttch.value.trim().length == 0) {
		utilities.showAlert(Alloy.Globals.selectedLanguage.registration, Alloy.Globals.selectedLanguage.plzAttchPassportFront);
		return;
	}
	if ($.viewfamilbookSubscription.isSelected) {
		if ($.txtFullNameBook.value.trim().length == 0) {
			utilities.showAlert(Alloy.Globals.selectedLanguage.registration, Alloy.Globals.selectedLanguage.plzFullnameBook);
			return;
		}
		if ($.textfieldEmiratesBook.value.trim().length == 0) {
			utilities.showAlert(Alloy.Globals.selectedLanguage.registration, Alloy.Globals.selectedLanguage.plzCooseEmirtesBook);
			return;
		}
		if ($.txtTownName.value.trim().length == 0) {
			utilities.showAlert(Alloy.Globals.selectedLanguage.registration, Alloy.Globals.selectedLanguage.plzTownNameBook);
			return;
		}
		if ($.txtTownNumber.value.trim().length == 0) {
			utilities.showAlert(Alloy.Globals.selectedLanguage.registration, Alloy.Globals.selectedLanguage.plzTownNumber);
			return;
		}
		if ($.txtFamilyNum.value.trim().length == 0) {
			utilities.showAlert(Alloy.Globals.selectedLanguage.registration, Alloy.Globals.selectedLanguage.plzFamilyNumber);
			return;
		}
		if ($.txtTribeName.value.trim().length == 0) {
			utilities.showAlert(Alloy.Globals.selectedLanguage.registration, Alloy.Globals.selectedLanguage.plzTribeName);
			return;
		}
		if ($.txtClanNumber.value.trim().length == 0) {
			utilities.showAlert(Alloy.Globals.selectedLanguage.registration, Alloy.Globals.selectedLanguage.plzClanNumber);
			return;
		}
		if ($.txtfIssueDate.value.trim().length == 0) {
			utilities.showAlert(Alloy.Globals.selectedLanguage.registration, Alloy.Globals.selectedLanguage.plzChooseIssuedateBook);
			return;
		}
		if ($.txtMotherName.value.trim().length == 0) {
			utilities.showAlert(Alloy.Globals.selectedLanguage.registration, Alloy.Globals.selectedLanguage.plzMotherName);
			return;
		}
		if ($.txtMothersFatherNme.value.trim().length == 0) {
			utilities.showAlert(Alloy.Globals.selectedLanguage.registration, Alloy.Globals.selectedLanguage.plzMotherFatherName);
			return;
		}
		if ($.txtFamilyBookAttch.value.trim().length == 0) {
			utilities.showAlert(Alloy.Globals.selectedLanguage.registration, Alloy.Globals.selectedLanguage.plzAttchFamilyBook);
			return;
		}
	}

	//validateImageUpload($.lblRegApplicantTypeStore.text);  $.textMobileNum2.value.replace(/[-]/gi, "")

	 //var mobileNum1set  = $.textMobileNum.value.replace(/[-]/gi, "");
    // mobileNum1set = (mobileNum1set.length == 0) ? mobileNum1set : mobileNum1set.slice(0, 3) + "-" + mobileNum1set.slice(3, 10);
     //Ti.API.info('mobile number1' + mobileNum1set);
	var obj = {
		cntryOfCitizen : selectedCitizenship,
		cntryOfResident : selectedResidence,
		mobileNum1 : $.textMobileNum.value.replace(/[-]/gi, ""),
		mobileNum2 : $.textMobileNum2.value.replace(/[-]/gi, ""),
		landlineNum : $.landLine.value.replace(/[-]/gi, ""),
		addressIndivid : $.txtAddressIndiv.value,
		emailAddress : $.textfieldEmail.value,
		username : $.textfieldUserName.value,
		password : $.textfieldPassword.value,
		fullname : $.textfieldFullName.value,
		emiratedId : $.textfEmiratesId.value.replace(/[-]/gi, ""),
		emiratedIdexpiry : $.textfieldIdExpiry.value,
		choosenEmirates : selectedEmiratesIdInfo,
		DOB : $.textfieldDOB.value,
		emiratesIDFront : $.txtEmiratedFrontAttch.value,
		emiratesIDBack : $.txtEmiratedBackAttch.value,
		passportNumber : $.textfPassportNum.value,
		passportFirstPage : $.txtPassportFrontAttch.value,
		hasFamilyBook : $.viewfamilbookSubscription.isSelected,
		fullnameBook : $.txtFullNameBook.value,
		chooseEmiratesBook : selectedEmiratesBook,
		townName : $.txtTownName.value,
		townNumber : $.txtTownNumber.value,
		familyNumber : $.txtFamilyNum.value,
		tribeName : $.txtTribeName.value,
		clanNumber : $.txtClanNumber.value,
		issuanceDate : $.txtfIssueDate.value,
		mothersName : $.txtMotherName.value,
		motherFatherNm : $.txtMothersFatherNme.value,
		familyBookAtttch : $.txtFamilyBookAttch.value,
		subscribeSet : $.viewSubscription.isSelected,
		arrMedia : arrSelectedImage,
		lang : (Alloy.Globals.isEnglish) ? 1 : 2,
		typeOfUser : $.lblRegUserTypeStore.text,
		applicantType : $.lblRegApplicantTypeStore.text,

	};
	
	Ti.API.info('registratoni obj pass==='+ JSON.stringify(obj));

	callRegistrationwebserive(obj);

}

function validateIndUaeResident() {
	var commonValid = commonValidationADCredential();
	if (commonValid == false) {
		return;
	}
	var credientValid = credientialValid();
	if (credientValid == false) {
		return;
	}
	var idInfoValid = idInformationValidate();
	if (idInfoValid == false) {
		return;
	}

	if ($.textfPassportNum.value.trim().length == 0) {
		utilities.showAlert(Alloy.Globals.selectedLanguage.registration, Alloy.Globals.selectedLanguage.plzPassportNum);
		return;
	}
	if ($.txtPassportFrontAttch.value.trim().length == 0) {
		utilities.showAlert(Alloy.Globals.selectedLanguage.registration, Alloy.Globals.selectedLanguage.plzAttchPassportFront);
		return;
	}
	if ($.txtPassportResidentpage.value.trim().length == 0) {
		utilities.showAlert(Alloy.Globals.selectedLanguage.registration, Alloy.Globals.selectedLanguage.plzAttchPassportResident);
		return;
	}

	//validateImageUpload($.lblRegApplicantTypeStore.text);
	//var mobileNum1set  = $.textMobileNum.value.replace(/[-]/gi, "");
    //mobileNum1set = (mobileNum1set.length == 0) ? mobileNum1set : mobileNum1set.slice(0, 3) + "-" + mobileNum1set.slice(3, 10);
    //Ti.API.info('mobile number1' + mobileNum1set);

	var obj = {
		cntryOfCitizen : selectedCitizenship,
		cntryOfResident : selectedResidence,
		mobileNum1 : $.textMobileNum.value.replace(/[-]/gi, ""),
		mobileNum2 : $.textMobileNum2.value.replace(/[-]/gi, ""),
		landlineNum : $.landLine.value.replace(/[-]/gi, ""),
		addressIndivid : $.txtAddressIndiv.value,
		emailAddress : $.textfieldEmail.value,
		username : $.textfieldUserName.value,
		password : $.textfieldPassword.value,
		fullname : $.textfieldFullName.value,
		emiratedId : $.textfEmiratesId.value.replace(/[-]/gi, ""),
		emiratedIdexpiry : $.textfieldIdExpiry.value,
		choosenEmirates : selectedEmiratesIdInfo,
		DOB : $.textfieldDOB.value,
		emiratesIDFront : $.txtEmiratedFrontAttch.value,
		emiratesIDBack : $.txtEmiratedBackAttch.value,
		passportNumber : $.textfPassportNum.value,
		passportFirstPage : $.txtPassportFrontAttch.value,
		passportResidentPage : $.txtPassportResidentpage.value,
		subscribeSet : $.viewSubscription.isSelected,
		arrMedia : arrSelectedImage,
		lang : (Alloy.Globals.isEnglish) ? 1 : 2,
		typeOfUser : $.lblRegUserTypeStore.text,
		applicantType : $.lblRegApplicantTypeStore.text,

	};
	callRegistrationwebserive(obj);
}

function validateIndGccCitizen() {
	var commonValid = commonValidationADCredential();
	if (commonValid == false) {
		return;
	}
	var credientValid = credientialValid();
	if (credientValid == false) {
		return;
	}
	//var idInfoValid = idInformationValidate();
	//if(idInfoValid == false){
	//return;
	//}

	if ($.fullNamePassport.value.trim().length == 0) {
		utilities.showAlert(Alloy.Globals.selectedLanguage.registration, Alloy.Globals.selectedLanguage.plzPassportNamefull);
		return;
	}
	if ($.textfPassportNum.value.trim().length == 0) {
		utilities.showAlert(Alloy.Globals.selectedLanguage.registration, Alloy.Globals.selectedLanguage.plzPassportNum);
		return;
	}
	if ($.txtPassportFrontAttch.value.trim().length == 0) {
		utilities.showAlert(Alloy.Globals.selectedLanguage.registration, Alloy.Globals.selectedLanguage.plzAttchPassportFront);
		return;
	}

	//validateImageUpload($.lblRegApplicantTypeStore.text);


	var obj = {
		cntryOfCitizen : selectedCitizenship,
		cntryOfResident : selectedResidence,
		mobileNum1 : $.textMobileNum.value.replace(/[-]/gi, ""),
		mobileNum2 : $.textMobileNum2.value.replace(/[-]/gi, ""),
		landlineNum : $.landLine.value.replace(/[-]/gi, ""),
		addressIndivid : $.txtAddressIndiv.value,
		emailAddress : $.textfieldEmail.value,
		username : $.textfieldUserName.value,
		password : $.textfieldPassword.value,
		fullname : $.textfieldFullName.value,
		emiratedId : $.textfEmiratesId.value.replace(/[-]/gi, ""),
		emiratedIdexpiry : $.textfieldIdExpiry.value,
		choosenEmirates : selectedEmiratesIdInfo,
		DOB : $.textfieldDOB.value,
		emiratesIDFront : $.txtEmiratedFrontAttch.value,
		emiratesIDBack : $.txtEmiratedBackAttch.value,
		passportFullName : $.fullNamePassport.value,
		passportNumber : $.textfPassportNum.value,
		passportFirstPage : $.txtPassportFrontAttch.value,

		subscribeSet : $.viewSubscription.isSelected,
		arrMedia : arrSelectedImage,
		lang : (Alloy.Globals.isEnglish) ? 1 : 2,
		typeOfUser : $.lblRegUserTypeStore.text,
		applicantType : $.lblRegApplicantTypeStore.text,

	};

	callRegistrationwebserive(obj);
}

function validateIndGccResident() {
	var commonValid = commonValidationADCredential();
	if (commonValid == false) {
		return;
	}
	var credientValid = credientialValid();
	if (credientValid == false) {
		return;
	}

	if ($.fullNamePassport.value.trim().length == 0) {
		utilities.showAlert(Alloy.Globals.selectedLanguage.registration, Alloy.Globals.selectedLanguage.plzPassportNamefull);
		return;
	}
	if ($.textfPassportNum.value.trim().length == 0) {
		utilities.showAlert(Alloy.Globals.selectedLanguage.registration, Alloy.Globals.selectedLanguage.plzPassportNum);
		return;
	}
	if ($.txtPassportFrontAttch.value.trim().length == 0) {
		utilities.showAlert(Alloy.Globals.selectedLanguage.registration, Alloy.Globals.selectedLanguage.plzAttchPassportFront);
		return;
	}
	if ($.txtPassportResidentpage.value.trim().length == 0) {
		utilities.showAlert(Alloy.Globals.selectedLanguage.registration, Alloy.Globals.selectedLanguage.plzAttchPassportResident);
		return;
	}

	//validateImageUpload($.lblRegApplicantTypeStore.text);
	var mobileNum1set  = $.textMobileNum.value.replace(/[-]/gi, "");
    mobileNum1set = (mobileNum1set.length == 0) ? mobileNum1set : mobileNum1set.slice(0, 3) + "-" + mobileNum1set.slice(3, 10);
    Ti.API.info('mobile number1' + mobileNum1set);

	var obj = {
		cntryOfCitizen : selectedCitizenship,
		cntryOfResident : selectedResidence,
		mobileNum1 : $.textMobileNum.value.replace(/[-]/gi, ""),
		mobileNum2 : $.textMobileNum2.value.replace(/[-]/gi, ""),
		landlineNum : $.landLine.value.replace(/[-]/gi, ""),
		addressIndivid : $.txtAddressIndiv.value,
		emailAddress : $.textfieldEmail.value,
		username : $.textfieldUserName.value,
		password : $.textfieldPassword.value,
		passportFullName : $.fullNamePassport.value,
		passportNumber : $.textfPassportNum.value,
		passportFirstPage : $.txtPassportFrontAttch.value,
		passportResidentPage : $.txtPassportResidentpage.value,
		subscribeSet : $.viewSubscription.isSelected,
		arrMedia : arrSelectedImage,
		lang : (Alloy.Globals.isEnglish) ? 1 : 2,
		typeOfUser : $.lblRegUserTypeStore.text,
		applicantType : $.lblRegApplicantTypeStore.text,

	};
	callRegistrationwebserive(obj);
}

function validateIndVisitor() {
	var commonValid = commonValidationADCredential();
	if (commonValid == false) {
		return;
	}
	var credientValid = credientialValid();
	if (credientValid == false) {
		return;
	}

	if ($.fullNamePassport.value.trim().length == 0) {
		utilities.showAlert(Alloy.Globals.selectedLanguage.registration, Alloy.Globals.selectedLanguage.plzPassportNamefull);
		return;
	}
	if ($.textfPassportNum.value.trim().length == 0) {
		utilities.showAlert(Alloy.Globals.selectedLanguage.registration, Alloy.Globals.selectedLanguage.plzPassportNum);
		return;
	}
	if ($.txtPassportFrontAttch.value.trim().length == 0) {
		utilities.showAlert(Alloy.Globals.selectedLanguage.registration, Alloy.Globals.selectedLanguage.plzAttchPassportFront);
		return;
	}
	if ($.txtVisaPage.value.trim().length == 0) {
		utilities.showAlert(Alloy.Globals.selectedLanguage.registration, Alloy.Globals.selectedLanguage.plzPassportVisaPage);
		return;
	}

	//validateImageUpload($.lblRegApplicantTypeStore.text);
    var mobileNum1set  = $.textMobileNum.value.replace(/[-]/gi, "");
    mobileNum1set = (mobileNum1set.length == 0) ? mobileNum1set : mobileNum1set.slice(0, 3) + "-" + mobileNum1set.slice(3, 10);
    Ti.API.info('mobile number1' + mobileNum1set);
    
	var obj = {
		cntryOfCitizen : selectedCitizenship,
		cntryOfResident : selectedResidence,
		mobileNum1 : $.textMobileNum.value.replace(/[-]/gi, ""),
		mobileNum2 : $.textMobileNum2.value.replace(/[-]/gi, ""),
		landlineNum : $.landLine.value.replace(/[-]/gi, ""),
		addressIndivid : $.txtAddressIndiv.value,
		emailAddress : $.textfieldEmail.value,
		username : $.textfieldUserName.value,
		password : $.textfieldPassword.value,
		passportFullName : $.fullNamePassport.value,
		passportNumber : $.textfPassportNum.value,
		passportFirstPage : $.txtPassportFrontAttch.value,
		passportVisaPage : $.txtVisaPage.value,
		subscribeSet : $.viewSubscription.isSelected,
		arrMedia : arrSelectedImage,
		lang : (Alloy.Globals.isEnglish) ? 1 : 2,
		typeOfUser : $.lblRegUserTypeStore.text,
		applicantType : $.lblRegApplicantTypeStore.text,

	};
	callRegistrationwebserive(obj);
}

function validateEstablishment() {

	if ($.txtFieldEstablishName.value.trim().length == 0) {
		utilities.showAlert(Alloy.Globals.selectedLanguage.registration, Alloy.Globals.selectedLanguage.plzEstablishName);
		return;
	}
	if ($.txtFieldEstablishMobileNum.value.trim().length == 0) {
		utilities.showAlert(Alloy.Globals.selectedLanguage.registration, Alloy.Globals.selectedLanguage.plzMobileNumber);
		return;
	}
    var txtFieldEstablishMobileNum = $.txtFieldEstablishMobileNum.value.replace(/[-]/gi, "");
	if (txtFieldEstablishMobileNum.trim().length != 10) {
		utilities.showAlert(Alloy.Globals.selectedLanguage.registration, Alloy.Globals.selectedLanguage.enterValidMobile);
		$.txtFieldEstablishMobileNum.value = "";
		statusValid = false;
		return statusValid;
	}
	if ($.txtFieldOfficePhone.value.trim().length == 0) {
		utilities.showAlert(Alloy.Globals.selectedLanguage.registration, Alloy.Globals.selectedLanguage.plzOfficephone);
		return;
	}
	var txtFieldOfficePhone = $.txtFieldOfficePhone.value.replace(/[-]/gi, "");
	if (txtFieldOfficePhone.trim().length != 9) {
		utilities.showAlert(Alloy.Globals.selectedLanguage.registration, Alloy.Globals.selectedLanguage.enterValidofficePhone);
		$.txtFieldOfficePhone.value = "";
		return;
	}
	if ($.txtFieldEmailAddressEstabsh.value.trim().length == 0) {
		utilities.showAlert(Alloy.Globals.selectedLanguage.registration, Alloy.Globals.selectedLanguage.plzEmailAddress);
		return;
	}
	if (utilities.isValidEmail($.txtFieldEmailAddressEstabsh.value) == false) {
		utilities.showAlert(Alloy.Globals.selectedLanguage.registration, Alloy.Globals.selectedLanguage.enterValidEmail);
		return;
	}
	if($.txtFieldEmailAddressEstabshConfirm.value.trim() != $.txtFieldEmailAddressEstabsh.value.trim()){
		utilities.showAlert(Alloy.Globals.selectedLanguage.registration, Alloy.Globals.selectedLanguage.emailNotMatch);
		return;
	}
	if ($.txtAddressEstblsh.value.trim().length == 0) {
		utilities.showAlert(Alloy.Globals.selectedLanguage.registration, Alloy.Globals.selectedLanguage.plzAddressEstablish);
		return;
	}

	if ($.textEmiratesEstablish.value.trim().length == 0) {
		utilities.showAlert(Alloy.Globals.selectedLanguage.registration, Alloy.Globals.selectedLanguage.plzChooseEmirates);
		return;
	}
	if ($.textfEmiratesIdEstb.value.trim().length == 0) {
		utilities.showAlert(Alloy.Globals.selectedLanguage.registration, Alloy.Globals.selectedLanguage.plzEmiratesId);
		statusValid = false;
		return statusValid;
	}
	
	var emiratesidcountEst = $.textfEmiratesIdEstb.value.replace(/[-]/gi, "");
	if (emiratesidcountEst.length != 15) {
		utilities.showAlert(Alloy.Globals.selectedLanguage.registration, Alloy.Globals.selectedLanguage.plzValidEmiratesId);
		$.textfEmiratesIdEstb.value = "";
		statusValid = false;
		return statusValid;
	}
	if ($.txtPostBoxEstblsh.value.trim().length == 0) {
		utilities.showAlert(Alloy.Globals.selectedLanguage.registration, Alloy.Globals.selectedLanguage.plzPostBox);
		return;
	}
	if (checkNumber($.txtPostBoxEstblsh.value.trim()) == false) {
		utilities.showAlert(Alloy.Globals.selectedLanguage.registration, Alloy.Globals.selectedLanguage.plzPostBoxvalid);
		return;
	}
	if ($.txtTradeLicNumEstblsh.value.trim().length == 0) {
		utilities.showAlert(Alloy.Globals.selectedLanguage.registration, Alloy.Globals.selectedLanguage.plzTradeLicNum);
		return;
	}
	if ($.txtTradeLicExpiry.value.trim().length == 0) {
		utilities.showAlert(Alloy.Globals.selectedLanguage.registration, Alloy.Globals.selectedLanguage.plzTradeLicExpiry);
		return;
	}
	if ($.textTradelicTypeEstablish.value.trim().length == 0) {
		utilities.showAlert(Alloy.Globals.selectedLanguage.registration, Alloy.Globals.selectedLanguage.plzChooseTradeLicType);
		return;
	}
	if ($.txtTradeLicenseAttch.value.trim().length == 0) {
		utilities.showAlert(Alloy.Globals.selectedLanguage.registration, Alloy.Globals.selectedLanguage.plzAttachTradeLic);
		return;
	}
	if ($.txtSignatureAttest.value.trim().length == 0) {
		//utilities.showAlert(Alloy.Globals.selectedLanguage.registration, Alloy.Globals.selectedLanguage.plzAttachSignature);
		//return;
	}
	if ($.txtEmiratedFrontAttchEst.value.trim().length == 0) {
		utilities.showAlert(Alloy.Globals.selectedLanguage.registration, Alloy.Globals.selectedLanguage.plzEmiratedIDfrontAttch);
		return;
	}//txtPassportFrontAttch
	if ($.txtEmiratedBackAttchEst.value.trim().length == 0) {
		utilities.showAlert(Alloy.Globals.selectedLanguage.registration, Alloy.Globals.selectedLanguage.plzEmiratesIdBackAttch);
		return;
	}

	var commonValid = credientialValid();
	if (commonValid == false) {
		return;
	}

	//validateImageUpload($.lblRegApplicantTypeStore.text);
	var mobileNumEstb  = $.txtFieldEstablishMobileNum.value.replace(/[-]/gi, "");
    mobileNumEstb = (mobileNumEstb.length == 0) ? mobileNumEstb : mobileNumEstb.slice(0, 3) + "-" + mobileNumEstb.slice(3, 10);
    Ti.API.info('mobile number1' + mobileNumEstb);
    
    var mobileNumOffice  = $.txtFieldOfficePhone.value.replace(/[-]/gi, "");
    mobileNumOffice = (mobileNumOffice.length == 0) ? mobileNumOffice : mobileNumOffice.slice(0, 3) + "-" + mobileNumOffice.slice(3, 10);
    Ti.API.info('office number1' + mobileNumOffice);

	var obj = {
		establishName : $.txtFieldEstablishName.value,
		establishMobileNum : $.txtFieldEstablishMobileNum.value.replace(/[-]/gi, ""),
		officePhone : $.txtFieldOfficePhone.value.replace(/[-]/gi, ""),
		emailAddressEst : $.txtFieldEmailAddressEstabsh.value,
		addressEst : $.txtAddressEstblsh.value,
		websiteEst : $.txtWebstieEstblsh.value,
		emiratesEst : selectedEmiratesEstablish,
		emiratedIdEstblish : $.textfEmiratesIdEstb.value.replace(/[-]/gi, ""),
		postboxEst : $.txtPostBoxEstblsh.value,
		tradeLicNumberEst : $.txtTradeLicNumEstblsh.value,
		tradeLicExpiryEst : $.txtTradeLicExpiry.value,
		tradeLicTypeEst : selectedTradelicenseEst,
		tradeLicAttchEst : $.txtTradeLicenseAttch.value,
		tradeSignEst : $.txtSignatureAttest.value,
		username : $.textfieldUserName.value,
		password : $.textfieldPassword.value,
		passportFullName : $.fullNamePassport.value,
		subscribeSet : $.viewSubscription.isSelected,
		arrMedia : arrSelectedImage,
		lang : (Alloy.Globals.isEnglish) ? 1 : 2,
		typeOfUser : $.lblRegUserTypeStore.text,
		applicantType : $.lblRegApplicantTypeStore.text,

	};
	callRegistrationwebserive(obj);
}

function cancelRegistration() {
	closeWindow();
	//Alloy.Globals.openWindow(Alloy.createController('UserManagement/Registration/winSubmitOTP', {title:"Activate"}).getView());
}

function selectDate(e) {
	$.txthiddenfocusFiled.focus();
	$.txthiddenfocusFiled.blur();
	Ti.API.info('e.source.txtFld === ' + JSON.stringify(e.source.txtFld));
	if (e.source.txtFld == $.textfieldDOB || e.source.txtFld == $.txtfIssueDate) {
		datePicker.generateDatePicker(e.source.txtFld, $.winRegistration, undefined, new Date(), undefined, Alloy.Globals.path.titleRedColor);
	} else {
		datePicker.generateDatePicker(e.source.txtFld, $.winRegistration, new Date(), undefined, undefined, Alloy.Globals.path.titleRedColor);
	}
	//dateFormatChange("05/11/2015");
}



function showIDcardImage(e) {
	Ti.API.info("show image id card fn call == " + e.source.cIndex);
	var pathForimage;
	switch(e.source.cIndex) {
	case 1:
		pathForimage = Alloy.Globals.path.emiratesId1;
		break;
	case 2:
		pathForimage = Alloy.Globals.path.emiratesId2;
		break;
	case 3:
		pathForimage = Alloy.Globals.path.emiratesId3;
		break;
	case 4:
		pathForimage = Alloy.Globals.path.emiratesId4;
		break;
	case 5:
		pathForimage = Alloy.Globals.path.emiratesId5;
		break;
	}

	utilities.popup(pathForimage);
}
function showPasswordHint(e) {
	utilities.popupHint();
}

function winOpen() {
	Alloy.Globals.hideLoading();
	Alloy.Globals.currentWindowMain = "winRegistrationRT";
	Alloy.Globals.arrWindows.push($.winRegistration);
	Ti.API.info(Alloy.Globals.currentWindow + 'window leng' + Alloy.Globals.arrWindows.length);

}

function winFocus(e) {
	Alloy.Globals.currentWindow = e.source.id;
	changeLanguage();
}

function closeWindow() {
	
	Alloy.Globals.arrWindows.pop($.winRegistration);
	try{
		Ti.API.info('Close window '+ Alloy.Globals.arrWindows[Alloy.Globals.arrWindows.length - 1]);
		Alloy.Globals.arrWindows[Alloy.Globals.arrWindows.length - 1].close({
					animated : true
		});
	}catch(e) {
		Ti.API.info('Close window  error in closing tersm window');	
	}
	Alloy.Globals.currentWindowMain = "";
	$.winRegistration.close();
	Ti.API.info(Alloy.Globals.currentWindowMain + ' window reg page leng' + Alloy.Globals.arrWindows.length);
}

$.winRegistration.addEventListener('android:back', function(e) {
	closeWindow();
});
changeLanguage(); 