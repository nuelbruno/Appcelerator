Alloy.Globals.SetModelWindow($.winQuestion);

var args = arguments[0] || {};
var arrQuestionAnswer = args.arrQuestion;

var isEnglish = (Alloy.Globals.isVATTAXModuleActive) ? Alloy.Globals.VATTAXisEnglish : Alloy.Globals.isEnglish;
var selectedLanguage = (Alloy.Globals.isVATTAXModuleActive) ? Alloy.Globals.VTaxSelectedLanguage :  Alloy.Globals.selectedLanguage;

Ti.API.info('ARGS = ' + JSON.stringify(args));

var httpManager = require("httpManager");
if (Alloy.Globals.isIOS7Plus) {
	$.statusBar.height = 20;
}

function shuffleArray(o) {//v1.0
	for (var j,
	    x,
	    i = o.length; i; j = Math.floor(Math.random() * i),
	x = o[--i], o[i] = o[j], o[j] =
	x);

	return o;
};

var alignment;
function changeLanguage() {

	$.lblNavTitle.text = args.pageTitle;
	$.txtAnswer.hintText = selectedLanguage.answer;
	$.btnNext.title = selectedLanguage.submitTitle;
	$.btnRetry.title = selectedLanguage.retry;

	if (isEnglish) {
		alignment = Ti.UI.TEXT_ALIGNMENT_LEFT;
		$.btnNext.left = 0;
		$.btnRetry.right = 0;
	} else {
		alignment = Ti.UI.TEXT_ALIGNMENT_RIGHT;
		$.btnNext.right = 0;
		$.btnRetry.left = 0;
	}
	$.lblQuestion.textAlign = $.txtAnswer.textAlign = alignment;

	arrQuestionAnswer = shuffleArray(arrQuestionAnswer);
	if (arrQuestionAnswer.length == 1) {
		$.btnRetry.width = 0;
		$.btnNext.left = $.btnNext.right = undefined;
	}
	showQuestion();
}

var arrAnswer = [];
var currentTry = 0;
function showQuestion() {
	if (arrQuestionAnswer.length > 0) {
		if (currentTry == 0) {
			$.lblQuestion.text = (isEnglish) ? arrQuestionAnswer[0].question_En : arrQuestionAnswer[0].question_Ar;
			
			$.txtAnswer.value = "";
		} else {
			$.mainView.animate({
				opacity : 0,
				duration : 400
			}, function() {
				$.lblQuestion.text = (isEnglish) ? arrQuestionAnswer[0].question_En : arrQuestionAnswer[0].question_Ar;
				if (arrQuestionAnswer.length == 1) {
					$.btnRetry.width = 0;
					$.btnNext.left = $.btnNext.right = undefined;
				}

				$.txtAnswer.value = "";
				$.mainView.animate({
					opacity : 1,
					duration : 400
				});
			});
		}
		
		if(args.serviceId == 5 || args.serviceId == 6){
			$.lblQuestion.questionId = arrQuestionAnswer[0].questionId;
		}
	}

}

function skipQuestion() {
	if (arrQuestionAnswer.length > 0) {
		arrQuestionAnswer.shift();
	}

	currentTry++;
	arrQuestionAnswer = shuffleArray(arrQuestionAnswer);
	showQuestion();
}

function SubmitQuestion() {

	if ($.txtAnswer.value.trim().length == 0) {
		Alloy.Globals.ShowAlert(selectedLanguage.enterAnswer);
		return;
	}
	if (args.serviceId == 5) {
		var objQuestion = {
			userName : args.obj.userName,
			typeOfService : args.obj.typeOfService,
			arrQuestion : [{
				questionId : $.lblQuestion.questionId,
				answer : $.txtAnswer.value	
			}]
		};
		httpManager.submitLoginAnswer(objQuestion, args.obj.password, function(e) {
			if (e != null) {
				args.callBack(e);
			}
		});
	} else {
		
		/*if ($.txtAnswer.value.toLowerCase() != arrQuestionAnswer[0].answer.toLowerCase()) {
			Alloy.Globals.ShowAlert(selectedLanguage.incorrectAnswer);
			return;
		}
		args.callBack();
		*/
		var objQuestion = {
			userName : args.obj.userName,
			password:args.obj.password,
			typeOfService : args.obj.typeOfService,
			arrQuestion : [{
				questionId : $.lblQuestion.questionId,
				answer : $.txtAnswer.value	
			}]
		};
		httpManager.ISupplierLogin_SubmitAnswer(objQuestion, args.obj.password, function(e) {
			if (e != null) {
				args.callBack(e);
			}
		});
	}

}

function gotoHome() {
	Alloy.Globals.gotoHome();
	Alloy.Globals.arrWindows.pop();
}

function closeWindow() {
	Alloy.Globals.arrWindows.pop();
	Alloy.Globals.closeWindow($.winQuestion);
}

$.winQuestion.addEventListener("focus",function(e){
	$.viewBottomToolbar.setDefaultTheme($.winQuestion);
});
$.viewBottomToolbar.setDefaultTheme($.winQuestion);

/**
 * Adding the eventlistener for the bottom bar view
 *
 * @param {Object} e
 */
$.viewBottomToolbar.getView().addEventListener('click', function(e) {
	if (e.source.buttonId == 'btnFontChange') {
		$.viewBottomToolbar.changeFont($.winQuestion);
	} else if (e.source.buttonId == 'btnSystemFeedback') {
		$.viewBottomToolbar.openFeedbackScreen(e);
	} else if (e.source.buttonId == 'btnSystemInstruction') {
		$.viewInstructions.openHelpScreen(e);
	} else if (e.source.buttonId == 'btnSystemChangeTheme') {
		$.viewBottomToolbar.changeTheme($.winQuestion);
	}
});

/**
 * Called on open of the window
 *
 * @param {Object} e
 */
var windowOpened = function(e) {
	Alloy.Globals.arrWindows.push($.winQuestion);
	showQuestion();
	$.viewBottomToolbar.setOptions({
		showThemeButton : true,
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
	$.destroy();
};

changeLanguage();
