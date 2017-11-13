var httpManager = require("httpManager");
//Alloy.createController('common/httpManager');

var isEnglish = (Alloy.Globals.isVATTAXModuleActive) ? Alloy.Globals.VATTAXisEnglish : Alloy.Globals.isEnglish;
var selectedLanguage = (Alloy.Globals.isVATTAXModuleActive) ? Alloy.Globals.VTaxSelectedLanguage : Alloy.Globals.selectedLanguage;

var args = arguments[0] || {};

var arr = args.data;

if (Alloy.Globals.isIOS7Plus) {
	//$.winPurchaseOrder.extendEdges = [Ti.UI.EXTEND_EDGE_TOP];
	$.statusBar.height = 20;
}

function closeWindow() {
	if (args.callBack != undefined) {
		if (args.serviceID == 5 && OS_IOS) {
			args.callBack(1);
		} else {
			args.callBack();
		}
	}
	Alloy.Globals.closeWindow($.winUserSatisfaction);
	if (args.fromPaymentStatus != undefined && OS_ANDROID) {
		if (args.serviceID == 5) {
			if (Ti.App.Properties.getInt("isLoggedIn_VatTax") == true) {
				httpManager.getDeviceTokenInfo(Ti.App.Properties.getObject("LoginDetaisObj_VatTax").tokenDetails, 2, function(e) {
					var win = Alloy.createController("TaxVat/winTaxVatHome").getView();
					Alloy.Globals.openWindow(win);
				});

			} else {
				var win = Alloy.createController("TaxVat/winTaxVatHome").getView();
				Alloy.Globals.openWindow(win);
			}
		} else if (args.serviceID == 6) {
			if (Ti.App.Properties.getInt("isLoggedIn_mSupplier") == true) {

				httpManager.getDeviceTokenInfo(Ti.App.Properties.getObject("LoginDetaisObj").tokenDetails, 1, function(e) {
					var win = Alloy.createController("ISupplier/winISupplierHome").getView();
					Alloy.Globals.openWindow(win);
				});

			} else {
				var win = Alloy.createController("ISupplier/winISupplierHome").getView();
				Alloy.Globals.openWindow(win);
			}
		}
	}

}

/*
 function loadQuestions(arr){

 for(var i=0 ; i<arr.length ; i++){

 var backView = Ti.UI.createView({
 top : 20,
 left : 10,
 right : 10,
 height : Ti.UI.SIZE,
 //	backgroundColor : "green",
 layout : "vertical"
 });

 var lblQuestion = Ti.UI.createLabel({
 width : "100%",
 height : Ti.UI.SIZE,
 //	backgroundColor : "red",
 font : Alloy.Globals.path.font15,
 color : Alloy.Globals.path.lblBlackColor
 });

 var viewDropDown = Ti.UI.createView({
 top : 10,
 width : "100%",
 //	backgroundColor : "blue",
 height : 35,
 borderColor : Alloy.Globals.path.grayColor
 });

 var lblAnswer = Ti.UI.createLabel({
 height : "100%",
 font : Alloy.Globals.path.font13,
 color : Alloy.Globals.path.lblBlackColor,
 touchEnabled : false,
 obj : i,
 });

 var imgArrow = Ti.UI.createView({
 width : 12,
 height : 8,
 backgroundImage : Alloy.Globals.path.arrowDown,
 touchEnabled : false,
 });

 if(isEnglish){
 lblQuestion.text = arr[i].enQuestion;
 lblAnswer.left = imgArrow.right = 10;
 lblAnswer.right = 50;
 imgArrow.left = undefined;
 lblQuestion.textAlign = lblAnswer.textAlign = Ti.UI.TEXT_ALIGNMENT_LEFT;
 }else{
 lblQuestion.text = arr[i].arQuestion;
 lblAnswer.right = imgArrow.left = 10;
 lblAnswer.left = 50;
 imgArrow.right = undefined;
 lblQuestion.textAlign = lblAnswer.textAlign = Ti.UI.TEXT_ALIGNMENT_RIGHT;
 }

 backView.add(lblQuestion);
 viewDropDown.add(lblAnswer);
 viewDropDown.add(imgArrow);
 backView.add(viewDropDown);

 $.scrollView.add(backView);

 //	viewDropDown.doc = arr[i];

 viewDropDown.addEventListener("click",function(e){

 alert(JSON.stringify(e.source));

 });

 }

 }
 */

var arrSubmitAnswers = [];
var arrSubmitQuestions = [];

var arrAnswers = [];
var isTapped = false;
var index;
var isAnswerSelected = false;

function setAnswerLabel(e) {

	arrSubmitAnswers[index] = e.obj.id;
	arrSubmitQuestions[index] = index + 1;
	Ti.API.info('arrSubmitAnswers==' + JSON.stringify(arrSubmitAnswers));
	Ti.API.info('arrSubmitQuestions==' + JSON.stringify(arrSubmitQuestions));

	isAnswerSelected = true;

	$.listSection.updateItemAt(index, {

		viewContents : {
			backgroundColor : "transparent",
		},
		lblQuestion : {
			text : (isEnglish) ? arr[index].enQuestion : arr[index].arQuestion,
			textAlign : (isEnglish) ? Ti.UI.TEXT_ALIGNMENT_LEFT : Ti.UI.TEXT_ALIGNMENT_RIGHT,
		},
		icnDropDown : {
			right : (isEnglish) ? 10 : undefined,
			left : (isEnglish) ? undefined : 10,
		},
		lblAnswer : {
			text : e.labelTitle,
			right : (isEnglish) ? 50 : 10,
			left : (isEnglish) ? 10 : 50,
			textAlign : (isEnglish) ? Ti.UI.TEXT_ALIGNMENT_LEFT : Ti.UI.TEXT_ALIGNMENT_RIGHT,
		},

	});

	if (Alloy.Globals.currentTheme == "dark") {
		$.navBarBackView.backgroundColor = Alloy.Globals.path.navBarColor;
	}
	Alloy.Globals.setDefaultTheme($.winUserSatisfaction);

}

function selectAnswer(e) {

	//	Ti.API.info('selectAnswer==' + JSON.stringify(e));
	index = e.itemIndex;

	if (isTapped) {
		return;
	}
	isTapped = true;

	if (arrAnswers.length == 0) {

		httpManager.getUserSatisfactionAnswersType(function(e) {

			//	Ti.API.info('e===' + JSON.stringify(e));
			arrAnswers = e;

			var arrData = [];

			for (var i = 0; i < arrAnswers.length; i++) {
				var title = (isEnglish) ? arrAnswers[i].enAnswer : arrAnswers[i].arAnswer;
				arrData.push({
					title : title,
					titleAr : title,
					value : title,
					id : arrAnswers[i].id,
					selected : ""
				});
			}

			var winSelection = Alloy.createController('winSelection', {
				data : arrData,
				title : selectedLanguage.userSatisfaction,
				callBackFunction : setAnswerLabel,
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
		var arrData = [];

		for (var i = 0; i < arrAnswers.length; i++) {
			var title = isEnglish ? arrAnswers[i].enAnswer : arrAnswers[i].arAnswer;
			arrData.push({
				title : title,
				titleAr : title,
				value : title,
				id : arrAnswers[i].id,
				selected : ""
			});
		}

		var winSelection = Alloy.createController('winSelection', {
			data : arrData,
			title : selectedLanguage.userSatisfaction,
			callBackFunction : setAnswerLabel,
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

}

function loadRows(arr) {
	// TODO found error arr.length - undefined is not an object
	// Just added the following if statement.
	if ( typeof arr == 'undefined' || arr == null || arr == "")
		return;
	arrSubmitAnswers[arr.length - 1] = null;
	arrSubmitQuestions[arr.length - 1] = null;

	Ti.API.info('LoadRows arrSubmitAnswers==' + JSON.stringify(arrSubmitAnswers));
	Ti.API.info('LoadRows arrSubmitQuestions==' + JSON.stringify(arrSubmitQuestions));

	var rowData = [];
	for (var i = 0; i < arr.length; i++) {

		rowData.push({
			lblQuestion : {
				text : (isEnglish) ? arr[i].enQuestion : arr[i].arQuestion,
				textAlign : (isEnglish) ? Ti.UI.TEXT_ALIGNMENT_LEFT : Ti.UI.TEXT_ALIGNMENT_RIGHT,
			},
			icnDropDown : {
				right : (isEnglish) ? 10 : undefined,
				left : (isEnglish) ? undefined : 10,
			},
			lblAnswer : {
				right : (isEnglish) ? 50 : 10,
				left : (isEnglish) ? 10 : 50,
				textAlign : (isEnglish) ? Ti.UI.TEXT_ALIGNMENT_LEFT : Ti.UI.TEXT_ALIGNMENT_RIGHT,
			},

			properties : {
				obj : arr[i]
			}
		});

	}

	$.listSection.setItems(rowData);

	if (Alloy.Globals.currentTheme == "dark") {
		$.navBarBackView.backgroundColor = Alloy.Globals.path.navBarColor;
	}
	Alloy.Globals.setDefaultTheme($.winUserSatisfaction);
}

Alloy.Globals.setDefaultTheme($.winUserSatisfaction);

function submitUserSatisfaction() {

	if (!isAnswerSelected) {
		Alloy.Globals.ShowAlert(selectedLanguage.userSatisfaction, selectedLanguage.invalidAnswer);
		return;
	}

	Ti.API.info('arrSubmitAnswers==' + JSON.stringify(arrSubmitAnswers));

	var obj = {
		questionData : arrSubmitQuestions,
		answerData : arrSubmitAnswers,
		userName : "ANONYMOUS",
		serviceID : args.serviceID
	};

	httpManager.submitUserSatisfaction(obj, function(e) {

		//	Ti.API.info('e===' + JSON.stringify(e));

		if (e == null) {
			return;
		}

		var isFromUserSatisfaction = true;

		if (e == "Success") {
			var win = Alloy.createController("UserSatisfaction/winUserSatisfactionConfirm", {
				isFromUserSatisfaction : isFromUserSatisfaction,
				callBack : closeWindow
			}).getView();
			Alloy.Globals.openWindow(win);
		}

	});

}

function changeLanguage() {
	loadRows(arr);
	$.lblNavTitle.text = selectedLanguage.userSatisfaction;
	$.lblCancel.text = selectedLanguage.cancel;
	$.lblSubmit.text = selectedLanguage.submitTitle;

	var alignment;
	if (isEnglish) {
		$.submitView.left = $.cancelView.right = 0;

		alignment = Ti.UI.TEXT_ALIGNMENT_LEFT;
	} else {
		$.submitView.right = $.cancelView.left = 0;

		alignment = Ti.UI.TEXT_ALIGNMENT_RIGHT;
	}

}

changeLanguage();
