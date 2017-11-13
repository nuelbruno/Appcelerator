var httpManager = require("httpManager");

var args = arguments[0] || {};

Ti.API.info('args===='+JSON.stringify(args));

var isEnglish = (Alloy.Globals.isVATTAXModuleActive) ? Alloy.Globals.VATTAXisEnglish : Alloy.Globals.isEnglish;
var selectedLanguage = (Alloy.Globals.isVATTAXModuleActive) ? Alloy.Globals.VTaxSelectedLanguage :  Alloy.Globals.selectedLanguage;

var arrQuestion = args.arrQuestion;
var arrAnswer = args.arrAnswer;

Ti.API.info('arrQues=='+JSON.stringify(arrQuestion));
Ti.API.info('arrAnswer=='+JSON.stringify(arrAnswer));



if (Alloy.Globals.isIOS7Plus) {
	$.statusBar.height = 20;
}

function closeWindow() {
	$.winGeneralQuestion.close();
}

var arrTxtAnswer = [];
function loadRows(arr) {
	Ti.API.info('QUESTION LIST = ' + JSON.stringify(arr));
	for (var i = 0,
	    len = arr.length; i < len; i++) {
		var rowView = Ti.UI.createView({
			top : 20,
			left : 10,
			right : 10,
			height : Ti.UI.SIZE,
			backgroundColor : "transparent",
			layout : "vertical"
		});
		$.qusAnswerView.add(rowView);

		var strQuestion = (isEnglish) ? arr[i].questionEn : arr[i].questionAr;
		var lblQuestion = Ti.UI.createLabel({
			left : 0,
			right : 0,
			height : Titanium.UI.SIZE,
			font : (Alloy.isTablet) ? Alloy.Globals.path.font20 : Alloy.Globals.path.font15,
			color : "black", //Alloy.Globals.path.lblBlackColor,
			touchEnabled : false,
			text : ((i + 1) + ". " + strQuestion),
			textAlign : (isEnglish) ? Ti.UI.TEXT_ALIGNMENT_LEFT : Ti.UI.TEXT_ALIGNMENT_RIGHT
		});
		rowView.add(lblQuestion);

		var questionView = Ti.UI.createView({
			top : 10,
			left : 0,
			right : 0,
			height : 35,
			borderColor : Alloy.Globals.path.grayColor
		});
		rowView.add(questionView);

		var txtAnswer = Ti.UI.createTextField({
			height : "100%",
			left : 5,
			right : 5,
			font : (Alloy.isTablet) ? Alloy.Globals.path.font13 : Alloy.Globals.path.font18,
			color : "black", //Alloy.Globals.path.lblBlackColor,
			textAlign : (isEnglish) ? Ti.UI.TEXT_ALIGNMENT_LEFT : Ti.UI.TEXT_ALIGNMENT_RIGHT,
			value : arr[i].answer,
			backgroundColor : "transparent"
		});
		arrTxtAnswer.push(txtAnswer);
		
		if(arrAnswer.length > 0){
			if(arrAnswer[i].id == arr[i].id){
				txtAnswer.value = arrAnswer[i].answer;
			}
		}
		
		questionView.add(txtAnswer);

	}
	if (Alloy.Globals.currentTheme == "dark") {
		$.navBarBackView.backgroundColor = Alloy.Globals.path.navBarColor;
	}
	Alloy.Globals.setDefaultTheme($.winGeneralQuestion);
}

Alloy.Globals.setDefaultTheme($.winGeneralQuestion);

var totalAnswer = 0;
function validateData() {
	totalAnswer = 0;
	for (var i = 0,
	    len = arrTxtAnswer.length; i < len; i++) {
		if (arrTxtAnswer[i].value.trim().length > 0) {
			totalAnswer++;
		}
	}
}

function submitSecurityQuestion() {
	validateData();
	if (totalAnswer < 3) {
		// if (totalAnswer != arrTxtAnswer.length) {
		if (args.registerId == undefined && args.isLoggedIn) {

		} else {
			Alloy.Globals.ShowAlert(selectedLanguage.securityQuestion, selectedLanguage.invalidSecurityQuestion);
			return;
		}
	}
	for (var i = 0,
	    len = arrTxtAnswer.length; i < len; i++) {
		if (arrTxtAnswer[i].value.trim().length > 0) {
			// arrQuestion[i].answer = arrTxtAnswer[i].value.trim();
			totalAnswer++;
		}
		arrQuestion[i].answer = arrTxtAnswer[i].value.trim();

	}
	if (args.registerId != undefined) {
		httpManager.IsuppSecurityAnsSubmit(args.registerId, args.emailAddress, arrQuestion, function(e) {
			if (e == null) {
				return;
			}
			if (e.registerStatus == "Success") {
				args.callBack();
				closeWindow();
			} else {
				//Alloy.Globals.ShowAlert(selectedLanguage.iSupplier, )
			}

		});
	} else {
		args.callBack();
		closeWindow();
	}
}



function changeLanguage() {
	loadRows(arrQuestion);
	$.lblNavTitle.text = selectedLanguage.securityQuestion;
	
	$.btnSubmit.title = selectedLanguage.submitTitle;
	$.btnCancel.title = selectedLanguage.cancel;
	
	if (isEnglish) {
		$.btnSubmit.left = $.btnCancel.right = 0;
	} else {
		$.btnSubmit.right = $.btnCancel.left = 0;
	}
}

changeLanguage();
