var httpManager = require("httpManager");//Alloy.createController('common/httpManager');
var args = arguments[0] || {};
var density,
    colorCode;

if (OS_IOS) {
	density = "dp";
	colorCode = Alloy.Globals.path.lblGrayColor;
} else {
	density = "px";
	colorCode = "#888888";
}
$.imgTop.height = Alloy.Globals.GetHeight(130) + density;

if (Alloy.Globals.isIOS7Plus) {
	//	$.winDashboard.statusBarStyle = Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT;
	$.winContacts.extendEdges = [Ti.UI.EXTEND_EDGE_TOP];
	$.statusBar.height = 20;
}

function closeWindow() {
	Alloy.Globals.closeWindow($.winContacts);
}

var onSend = function() {

	var errorMessage = '';
	var name,
	    email,
	    phone,
	    comments = '';
	if ($.txtNameValue != null) {
		if (($.txtNameValue.value.trim()).length == 0) {
			errorMessage = errorMessage + Alloy.Globals.selectedLanguage.nameTitle + '\n';
		} else
			name = $.txtNameValue.value.trim();

	}
	if ($.txtEmailValue != null) {
		if (($.txtEmailValue.value.trim()).length == 0) {
			errorMessage = errorMessage + Alloy.Globals.selectedLanguage.emailTitle + '\n';
		} else {
			var emailvaildate = validateEmail($.txtEmailValue.value.trim());

			if ((emailvaildate == false)) {
				errorMessage = errorMessage + Alloy.Globals.selectedLanguage.enterValidEmailMsg + '\n';
			} else
				email = $.txtEmailValue.value.trim();

		}
	}

	if ($.txtPhoneValue != null) {
		if (($.txtPhoneValue.value.trim()).length == 0) {
			errorMessage = errorMessage + Alloy.Globals.selectedLanguage.phoneNumber + '\n';
		} else {
			var phoneTxt = $.txtPhoneValue.value.trim();
			var phonevaildate = validatePhone(phoneTxt);
			if (phonevaildate == false) {
				errorMessage = errorMessage + Alloy.Globals.selectedLanguage.enterValidPhoneMsg + '\n';
			} else
				phone = '+' + phoneTxt;

		}
	}

	if ($.txtCommentsValue != null) {
		if (($.txtCommentsValue.value.trim()).length == 0) {
			errorMessage = errorMessage + Alloy.Globals.selectedLanguage.comments + '\n';
		} else
			comments = $.txtCommentsValue.value.trim();

	}
	if (errorMessage.length > 0) {
		Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.contactMOFTitle, Alloy.Globals.selectedLanguage.plzEnterMissingFieldsMsg + "\n" + errorMessage);
		//alert("Error");
	} else {

		httpManager.saveContactMOF(name, email, phone, comments, function(arrOut) {
			if (arrOut != null) {
				if (arrOut == "Success") {
					Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.contactMOFTitle, Alloy.Globals.selectedLanguage.contactReqMsg);
					clearTextData();

				} else {
					Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.contactMOFTitle, Alloy.Globals.selectedLanguage.contactErroMsg);
					clearTextData();
				}
			}
		});

	}

};

function clearTextData() {
	$.txtNameValue.value = $.txtEmailValue.value = $.txtPhoneValue.value = "";
	$.txtCommentsValue.value = Alloy.Globals.selectedLanguage.enterHintText;
	$.txtCommentsValue.color = colorCode;
}

function validateEmail(email) {
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
}

function validatePhone(phone) {
	//var regex=/^[0-9]+$/;
	var regex = /^[0-9]+$/;
	return (regex.test(phone) && (phone.length == 12) && (phone.substring(0, 4) == "9715"));
}

function showKeyboard(e) {
	// This function shows done button to close keyboard for ios only.
	if (OS_IOS) {
		$.btnDone.animate({
			right : 10,
			duration : 200
		});
	}
}

function closeKeyboard() {
	// This function close keyboard and hide done button when click on done button.
	if (OS_IOS) {
		$.btnDone.animate({
			right : -47,
			duration : 200
		});
		$.txtPhoneValue.blur();
	} else {
		return;
	}
}

var multilineTextBoxFocus = function(e) {
	//Ti.API.info("Focus");
	if (e.source.value == Alloy.Globals.selectedLanguage.enterHintText) {
		e.source.value = "";
		e.source.color = Alloy.Globals.path.borderColor;
	}

};
var multilineTextBoxBlur = function(e) {
	//Ti.API.info("Blur");
	if (e.source.value == "") {
		e.source.value = Alloy.Globals.selectedLanguage.enterHintText;
		e.source.color = colorCode;
	}
};

function changeLanguage() {
	$.lblNavTitle.text = Alloy.Globals.selectedLanguage.contactMOFTitle;
	//$.lblTitle.text = Alloy.Globals.selectedLanguage.contactContent;
	$.lblName.text = Alloy.Globals.selectedLanguage.nameTitle;
	$.lblEmail.text = Alloy.Globals.selectedLanguage.emailTitle;
	$.lblPhone.text = Alloy.Globals.selectedLanguage.phoneNumber;
	$.lblComments.text = Alloy.Globals.selectedLanguage.comments;
	$.lblSave.text = Alloy.Globals.selectedLanguage.send;
	$.txtNameValue.hintText = $.txtEmailValue.hintText = Alloy.Globals.selectedLanguage.enterHintText;
	$.txtPhoneValue.hintText = "9715xxxxxxxx";
	$.txtCommentsValue.value = $.txtCommentsValue.noteHintText = $.txtCommentsValue._hintText = Alloy.Globals.selectedLanguage.enterHintText;
	$.txtCommentsValue.color = colorCode; 
	var alignment;
	if (Alloy.Globals.isEnglish) {
		alignment = Titanium.UI.TEXT_ALIGNMENT_LEFT;
		$.lblName.left = $.lblEmail.left = $.lblPhone.left = $.lblComments.left = 10;
		$.lblName.right = $.lblEmail.right = $.lblPhone.right = $.lblComments.right = undefined;
		$.NameColon.left = $.EmailColon.left = $.PhoneColon.left = $.commentsColon.left = 140;
		$.txtNameValue.left = $.txtEmailValue.left = $.txtPhoneValue.left = $.txtCommentsValue.left = (Alloy.isTablet) ? 170 : 155;
		$.txtNameValue.right = $.txtEmailValue.right = $.txtPhoneValue.right = $.txtCommentsValue.right = 10;

	} else {
		alignment = Titanium.UI.TEXT_ALIGNMENT_RIGHT;
		$.lblName.left = $.lblEmail.left = $.lblPhone.left = $.lblComments.left = undefined;
		$.lblName.right = $.lblEmail.right = $.lblPhone.right = $.lblComments.right = 10;
		$.NameColon.right = $.EmailColon.right = $.PhoneColon.right = $.commentsColon.right = 140;
		$.txtNameValue.left = $.txtEmailValue.left = $.txtPhoneValue.left = $.txtCommentsValue.left = 10;
		$.txtNameValue.right = $.txtEmailValue.right = $.txtPhoneValue.right = $.txtCommentsValue.right = (Alloy.isTablet) ? 170 : 155;
	}

	/*$.lblTitle.textAlign =*/
	$.lblName.textAlign = alignment;
	$.lblEmail.textAlign = $.lblPhone.textAlign = $.lblComments.textAlign = alignment;
	$.txtNameValue.textAlign = alignment;
	$.txtEmailValue.textAlign = $.txtPhoneValue.textAlign = $.txtCommentsValue.textAlign = alignment;

}

changeLanguage();
