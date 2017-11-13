var httpManager = require("httpManager");
//Alloy.createController('common/httpManager');
var isTapped;
var args = arguments[0] || {};
if (Alloy.Globals.isIOS7Plus) {
	//$.winPurchaseOrder.extendEdges = [Ti.UI.EXTEND_EDGE_TOP];
	$.statusBar.height = 20;
}

function closeWindow() {
	Alloy.Globals.closeWindow($.winMParticipationComment);
}

function gotoHome() {
	Alloy.Globals.gotoHome();
}

function showConfirmationAlert(message) {
	Ti.App.Properties.setString("tokenStatus", "Expired");
	var alert = Ti.UI.createAlertDialog({
		title : Alloy.Globals.selectedLanguage.mParticipation,
		message : message,
		buttonNames : [Alloy.Globals.selectedLanguage.ok]
	});
	alert.addEventListener('click', function(e) {
		closeWindow();
	});
	alert.show();
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

function submitComment() {

	if ($.txtDesc.value.length == 0) {
		Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.mParticipation, Alloy.Globals.selectedLanguage.invalidCompose);
		return;
	}else if ($.txtMobileNo.value.trim().length > 0 && $.txtMobileNo.value.trim().length < 10) {
		Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.mParticipation, Alloy.Globals.selectedLanguage.invalidMobileNo);
		return;
	}else if ($.txtMobileNo.value.trim().length > 0 && !validatePhone($.txtMobileNo.value)) {
		Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.mParticipation, Alloy.Globals.selectedLanguage.invalidMobileNo);
		return;
	}

	var obj = {
		firstName : $.txtFirstName.value,
		lastName : $.txtLastName.value,
		email : $.txtEmail.value,
		mobile : $.txtMobileNo.value,
		nationality : $.txtNationality.value,
		gender : $.txtGender.value,
		ageGroup : $.txtAgeGroup.value,
		subId : args,
		comment : $.txtDesc.value,
		language : (Alloy.Globals.isEnglish) ? "English" : "Arabic"
	};

	httpManager.addmParticipationComment(obj, function(e) {

		Ti.API.info('e==' + JSON.stringify(e));

		if (e == null) {
			return;
		}

		if (e.status == "SUCCESS") {
			Alloy.Globals.commentAdded = true;
			closeWindow();
		} else {
			showConfirmationAlert(e.msg);
		}

	});

}

var arrNationality = [{
	titleEn : "Emarati",
	titleAr : "اماراتي",
}, {
	titleEn : "Resident - Arabian",
	titleAr : "مقيم عربي",
}, {
	titleEn : "Resident - Asian",
	titleAr : "مقيم اسيوي",
}, {
	titleEn : "Resident - Other",
	titleAr : "مقيم أجنبي",
}];

function setNationalityLabel(e) {
	$.txtNationality.value = e.labelTitle;
}

function selectNationality() {
	isTapped = true;
	var arrList = [];
	for (var i = 0; i < arrNationality.length; i++) {
		var title = Alloy.Globals.isEnglish ? arrNationality[i].titleEn : arrNationality[i].titleAr;
		arrList.push({
			title : title,
			titleAr : title,
			value : title,
			//	id : arrNationality[i].id,
			selected : ""
		});
	}

	var winSelection = Alloy.createController('winSelection', {
		data : arrList,
		title : Alloy.Globals.selectedLanguage.selectFederalEntity,
		callBackFunction : setNationalityLabel,
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

var arrAgeGroup = [{
	title : "18-30",
}, {
	title : "31-40",
}, {
	title : "41-50",
}, {
	title : "51-60",
}, {
	title : "61-70",
}];

function setAgeGroupLabel(e) {
	$.txtAgeGroup.value = e.labelTitle;
}

function selectAgeGroup() {
	isTapped = true;

	var arrList = [];

	for (var i = 0; i < arrAgeGroup.length; i++) {
		var title = arrAgeGroup[i].title;
		arrList.push({
			title : title,
			titleAr : title,
			value : title,
			//	id : arrAgeGroup[i].id,
			selected : ""
		});
	}

	var winSelection = Alloy.createController('winSelection', {
		data : arrList,
		title : Alloy.Globals.selectedLanguage.selectFederalEntity,
		callBackFunction : setAgeGroupLabel,
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

var arrGender = [{
	titleEn : "Male",
	titleAr : "ذكر",
}, {
	titleEn : "Female",
	titleAr : "انثى",
}];

function setGenderLabel(e) {
	$.txtGender.value = e.labelTitle;
}

function selectGender() {
	isTapped = true;
	var arrList = [];
	for (var i = 0; i < arrGender.length; i++) {
		var title = Alloy.Globals.isEnglish ? arrGender[i].titleEn : arrGender[i].titleAr;
		arrList.push({
			title : title,
			titleAr : title,
			value : title,
			//	id : arrGender[i].id,
			selected : ""
		});
	}

	var winSelection = Alloy.createController('winSelection', {
		data : arrList,
		title : Alloy.Globals.selectedLanguage.selectFederalEntity,
		callBackFunction : setGenderLabel,
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

function changeLanguage() {

	$.lblNavTitle.text = Alloy.Globals.selectedLanguage.mParticipation;

	$.lblCompose.text = Alloy.Globals.selectedLanguage.compose;
	$.lblPersonalDetails.text = Alloy.Globals.selectedLanguage.personalDetails;
	$.lblFirstName.text = Alloy.Globals.selectedLanguage.firstName;
	$.lblLastName.text = Alloy.Globals.selectedLanguage.lastName;
	$.lblEmail.text = Alloy.Globals.selectedLanguage.emailAddress;
	$.lblMobileNo.text = Alloy.Globals.selectedLanguage.mobileNoNormal;
	$.lblNationality.text = Alloy.Globals.selectedLanguage.nationality;
	$.lblGender.text = Alloy.Globals.selectedLanguage.gender;
	$.lblAgeGroup.text = Alloy.Globals.selectedLanguage.ageGroup;
	$.lblComment.text = Alloy.Globals.selectedLanguage.comments;
	$.btnSubmit.title = Alloy.Globals.selectedLanguage.submitTitle;

	$.txtFirstName.hintText = Alloy.Globals.selectedLanguage.enterHintText +  Alloy.Globals.selectedLanguage.firstName;
	$.txtLastName.hintText = Alloy.Globals.selectedLanguage.enterHintText +  Alloy.Globals.selectedLanguage.lastName;
	$.txtEmail.hintText = Alloy.Globals.selectedLanguage.enterHintText +  Alloy.Globals.selectedLanguage.emailAddress;
	$.txtMobileNo.hintText = Alloy.Globals.selectedLanguage.enterHintText +  Alloy.Globals.selectedLanguage.mobileNoNormal; 
	$.txtNationality.hintText = Alloy.Globals.selectedLanguage.select +  Alloy.Globals.selectedLanguage.nationality; 
	$.txtAgeGroup.hintText = Alloy.Globals.selectedLanguage.select +  Alloy.Globals.selectedLanguage.ageGroup; 
	$.txtGender.hintText = Alloy.Globals.selectedLanguage.select +  Alloy.Globals.selectedLanguage.gender; 
	$.txtComment.hintText = Alloy.Globals.selectedLanguage.enterComments; 

	var alignment;
	if (Alloy.Globals.isEnglish) {

		alignment = Ti.UI.TEXT_ALIGNMENT_LEFT;
		$.lblComposeAstrik.left = 10;
		$.lblCompose.left = 20;
		
		$.lblFirstName.left = $.lblLastName.left = $.lblEmail.left = $.lblMobileNo.left = $.lblNationality.left = $.lblGender.left = $.lblAgeGroup.left = $.lblComment.left = 0;
		$.txtFirstName.right = $.txtLastName.right = $.txtEmail.right = $.txtMobileNo.right = $.txtNationality.right = $.txtGender.right = $.txtAgeGroup.right = $.txtComment.right = 0;
		$.lblFirstName.right = $.lblLastName.right = $.lblEmail.right = $.lblMobileNo.right = $.lblNationality.right = $.lblGender.right = $.lblAgeGroup.right = $.lblComment.right = undefined;
		$.txtFirstName.left = $.txtLastName.left = $.txtEmail.left = $.txtMobileNo.left = $.txtNationality.left = $.txtGender.left = $.txtAgeGroup.left = $.txtComment.left = undefined;
		
		$.imgNationality.right =  $.imgGender.right = $.imgAgeGroup.right = 0;
	} else {

		alignment = Ti.UI.TEXT_ALIGNMENT_RIGHT;
		
		$.lblComposeAstrik.right = 10;
		$.lblCompose.right = 20;
		
		$.lblFirstName.right = $.lblLastName.right = $.lblEmail.right = $.lblMobileNo.right = $.lblNationality.right = $.lblGender.right = $.lblAgeGroup.right = $.lblComment.right = 0;
		$.txtFirstName.left = $.txtLastName.left = $.txtEmail.left = $.txtMobileNo.left = $.txtNationality.left = $.txtGender.left = $.txtAgeGroup.left = $.txtComment.left = 0;
		$.lblFirstName.left = $.lblLastName.left = $.lblEmail.left = $.lblMobileNo.left = $.lblNationality.left = $.lblGender.left = $.lblAgeGroup.left = $.lblComment.left = undefined;
		$.txtFirstName.right = $.txtLastName.right = $.txtEmail.right = $.txtMobileNo.right = $.txtNationality.right = $.txtGender.right = $.txtAgeGroup.right = $.txtComment.right = undefined;
		
		$.imgNationality.left =  $.imgGender.left = $.imgAgeGroup.left = 0;
	}

	$.lblCompose.textAlign = $.lblPersonalDetails.textAlign = $.lblFirstName.textAlign = $.lblLastName.textAlign = $.lblEmail.textAlign = $.lblMobileNo.textAlign = $.lblNationality.textAlign = $.lblGender.textAlign = $.lblAgeGroup.textAlign = $.lblComment.textAlign = alignment;
	$.txtFirstName.textAlign = $.txtLastName.textAlign = $.txtEmail.textAlign = $.txtMobileNo.textAlign = $.txtNationality.textAlign = $.txtGender.textAlign = $.txtAgeGroup.textAlign = $.txtComment.textAlign = $.txtDesc.textAlign = alignment;

}

changeLanguage();


$.winMParticipationComment.addEventListener("focus", function(e) {
	$.viewBottomToolbar.setDefaultTheme($.winMParticipationComment);
});

$.viewBottomToolbar.setDefaultTheme($.winMParticipationComment);


/**
 * Adding the eventlistener for the bottom bar view
 *
 * @param {Object} e
 */
$.viewBottomToolbar.getView().addEventListener('click', function(e) {
	if (e.source.buttonId == 'btnFontChange') {
		$.viewBottomToolbar.changeFont($.winMParticipationComment);
	} else if (e.source.buttonId == 'btnSystemFeedback') {
		$.viewBottomToolbar.openFeedbackScreen(e);
	} else/*if (e.source.buttonId == 'btnSystemInstruction') {
	 $.viewInstructions.openHelpScreen(e);
	 } else*/
	if (e.source.buttonId == 'btnSystemChangeTheme') {
		$.viewBottomToolbar.changeTheme($.winMParticipationComment);
	}
});

/**
 * Called on open of the window
 *
 * @param {Object} e
 */
function windowOpened(e) {
	Alloy.Globals.arrWindows.push($.winMParticipationComment);
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
function windowClosed(e) {
	Alloy.Globals.arrWindows.pop();
	$.mainView.removeAllChildren();
	$.imgBackBtn = $.imgHomeBtn = $.mainView = $.winMParticipationComment = null;
	$.destroy();
};