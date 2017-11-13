var httpManager = require("httpManager");
//Alloy.createController('common/httpManager');
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
if (Alloy.Globals.isIOS7Plus) {
	$.winContacts.extendEdges = [Ti.UI.EXTEND_EDGE_TOP];
	$.statusBar.height = 20;
}

$.lblDetail.color = Alloy.Globals.path.navBarColor;
$.lblDetail.isSelected = true;

function changeLanguage() {
	$.lblNavTitle.text = Alloy.Globals.selectedLanguage.contactMOFTitle;

	$.lblDetail.text = Alloy.Globals.selectedLanguage.details;
	$.lblMap.text = Alloy.Globals.selectedLanguage.map;

	$.lblBranchOneTitle.text = Alloy.Globals.selectedLanguage.abuDhabi;
	$.lblBranchTwoTitle.text = Alloy.Globals.selectedLanguage.dubai;

	$.lblPhoneTitleB1.text = $.lblPhoneTitleB2.text = Alloy.Globals.selectedLanguage.phone;
	$.lblPhoneValueB1.text = "+97126726000";
	$.lblPhoneValueB2.text = "+97143939000";

	$.lblFaxTitleB1.text = $.lblFaxTitleB2.text = Alloy.Globals.selectedLanguage.fax;
	$.lblFaxValueB1.text = "+97126768414";
	$.lblFaxValueB2.text = "+97143939738";

	$.lblPOBoxTitleB1.text = $.lblPOBoxTitleB2.text = Alloy.Globals.selectedLanguage.POBox;
	$.lblPOBoxValueB1.text = "433";
	$.lblPOBoxValueB2.text = "1565";

	$.lblEmail.text = Alloy.Globals.selectedLanguage.emailTitle;
	$.lblWeb.text = Alloy.Globals.selectedLanguage.website;

	var alignment;
	if (Alloy.Globals.isEnglish) {
		alignment = Titanium.UI.TEXT_ALIGNMENT_LEFT;

		$.imgPhoneB1.left = $.imgFaxB1.left = $.imgPOBoxB1.left = 0;
		$.imgPhoneB2.left = $.imgFaxB2.left = $.imgPOBoxB2.left = 0;

		$.lblPhoneTitleB1.left = $.lblFaxTitleB1.left = $.lblPOBoxTitleB1.left = 22;
		$.lblPhoneTitleB2.left = $.lblFaxTitleB2.left = $.lblPOBoxTitleB2.left = 22;

		$.lblPhoneColonB1.left = $.lblFaxColonB1.left = $.lblPOBoxColonB1.left = (Alloy.isTablet) ? 140 : 110;
		$.lblPhoneColonB2.left = $.lblFaxColonB2.left = $.lblPOBoxColonB2.left = (Alloy.isTablet) ? 140 : 110;

		$.lblPhoneValueB1.left = $.lblFaxValueB1.left = $.lblPOBoxValueB1.left = (Alloy.isTablet) ? 155 : 125;
		$.lblPhoneValueB2.left = $.lblFaxValueB2.left = $.lblPOBoxValueB2.left = (Alloy.isTablet) ? 155 : 125;
		$.lblPhoneValueB1.right = $.lblFaxValueB1.right = $.lblPOBoxValueB1.right = 10;
		$.lblPhoneValueB2.right = $.lblFaxValueB2.right = $.lblPOBoxValueB2.right = 10;

		$.emailView.left = $.webView.right = 0;
		$.imgEmail.left = $.imgWeb.left = 8;
		$.lblEmail.left = $.lblWeb.left = 30;

	} else {
		alignment = Titanium.UI.TEXT_ALIGNMENT_RIGHT;

		$.imgPhoneB1.right = $.imgFaxB1.right = $.imgPOBoxB1.right = 0;
		$.imgPhoneB2.right = $.imgFaxB2.right = $.imgPOBoxB2.right = 0;

		$.lblPhoneTitleB1.right = $.lblFaxTitleB1.right = $.lblPOBoxTitleB1.right = 22;
		$.lblPhoneTitleB2.right = $.lblFaxTitleB2.right = $.lblPOBoxTitleB2.right = 22;

		$.lblPhoneColonB1.right = $.lblFaxColonB1.right = $.lblPOBoxColonB1.right = (Alloy.isTablet) ? 140 : 110;
		$.lblPhoneColonB2.right = $.lblFaxColonB2.right = $.lblPOBoxColonB2.right = (Alloy.isTablet) ? 140 : 110;

		$.lblPhoneValueB1.right = $.lblFaxValueB1.right = $.lblPOBoxValueB1.right = (Alloy.isTablet) ? 155 : 125;
		$.lblPhoneValueB2.right = $.lblFaxValueB2.right = $.lblPOBoxValueB2.right = (Alloy.isTablet) ? 155 : 125;
		$.lblPhoneValueB1.left = $.lblFaxValueB1.left = $.lblPOBoxValueB1.left = 10;
		$.lblPhoneValueB2.left = $.lblFaxValueB2.left = $.lblPOBoxValueB2.left = 10;

		$.emailView.right = $.webView.left = 0;
		$.imgEmail.right = $.imgWeb.right = 8;
		$.lblEmail.right = $.lblWeb.right = 30;

	}
	$.lblBranchOneTitle.textAlign = $.lblBranchTwoTitle.textAlign = alignment;
	$.lblPhoneTitleB1.textAlign = $.lblFaxTitleB1.textAlign = $.lblPOBoxTitleB1.textAlign = alignment;
	$.lblPhoneValueB1.textAlign = $.lblFaxValueB1.textAlign = $.lblPOBoxValueB1.textAlign = alignment;
	$.lblPhoneTitleB2.textAlign = $.lblFaxTitleB2.textAlign = $.lblPOBoxTitleB2.textAlign = alignment;
	$.lblPhoneValueB2.textAlign = $.lblFaxValueB2.textAlign = $.lblPOBoxValueB2.textAlign = alignment;
}

function showDetail() {
	if ($.lblDetail.isSelected) {
		return;
	}
	$.lblDetail.isSelected = true;
	$.lblDetail.color = Alloy.Globals.path.navBarColor;

	$.lblMap.isSelected = false;
	$.lblMap.color = Alloy.Globals.path.darkGrayColor;

	$.mapBackView.animate({
		opacity : 0,
		duration : 300
	}, function(e) {
		if (OS_ANDROID) {
			$.mapBackView.visible = false;
		}
	});

	$.tabSeparator.animate({
		left : 0,
		duration : 300
	});
}

function showMap() {
	if ($.lblMap.isSelected) {
		return;
	}
	$.lblDetail.isSelected = false;
	$.lblDetail.color = Alloy.Globals.path.darkGrayColor;

	$.lblMap.isSelected = true;
	$.lblMap.color = Alloy.Globals.path.navBarColor;
	if (OS_ANDROID) {
		$.mapBackView.visible = true;
	}

	$.mapBackView.animate({
		opacity : 1,
		duration : 300
	});

	var separatorLeft;
	if (OS_IOS) {
		if (Ti.Gesture.orientation == 3 || Ti.Gesture.orientation == 4) {
			separatorLeft = (Alloy.Globals.platformHeight / 2);
		} else if (Ti.Gesture.orientation == 1 || Ti.Gesture.orientation == 2) {
			separatorLeft = (Alloy.Globals.platformWidth / 2);
		}
	} else {
		if (Ti.Gesture.orientation == 2) {
			separatorLeft = (Alloy.Globals.platformHeight / 2);
		} else if (Ti.Gesture.orientation == 1) {
			separatorLeft = (Alloy.Globals.platformWidth / 2);
		}
	}
	separatorLeft += density;

	$.tabSeparator.animate({
		left : separatorLeft,
		duration : 300
	});
}

function addAnnotation() {
	var annotationAbuDhabi = Alloy.Globals.Map.createAnnotation({
		latitude : "24.360981",
		longitude : "54.494473",
		title : Alloy.Globals.selectedLanguage.abuDhabi,
		subtitle : (Alloy.Globals.isEnglish) ? "Al Falah Street, Abudhabi, UAE " : "شارع الفلاح، أبوظبي",
		animate : false,
		image : Alloy.Globals.path.icnMapPin

	});

	var annotationDubai = Alloy.Globals.Map.createAnnotation({
		latitude : "25.264417",
		longitude : "55.290666",
		title : Alloy.Globals.selectedLanguage.dubai,
		subtitle : (Alloy.Globals.isEnglish) ? "3 A Street-Dubai-United Arab Emirates" : "شارع ٣ -أ دبي",
		animate : false,
		image : Alloy.Globals.path.icnMapPin
	});

	$.mapView.addAnnotations([annotationAbuDhabi, annotationDubai]);
	$.mapView.region = Alloy.Globals.getFitZoomMapRegionWithCoords([annotationAbuDhabi, annotationDubai]);

}

function makeCall(e) {
	Alloy.Globals.makeCall(e.source.text);
}

function sendMail() {
	Alloy.Globals.sendMail("estifsarat@mof.gov.ae", "", function(e) {

	});
}

function openWebsite() {
	var url = "http://www.mof.gov.ae";
	if (OS_IOS) {
		if (Ti.Platform.canOpenURL(url)) {
			Ti.Platform.openURL(url);
		}
	} else {
		Ti.Platform.openURL(url);
	}
}

function openSocialSite(e) {
	var url;
	if (e.source.socialID == "facebook") {
		url = "https://www.facebook.com/pages/UAE-Ministry-of-Finance-%D9%88%D8%B2%D8%A7%D8%B1%D8%A9-%D8%A7%D9%84%D9%85%D8%A7%D9%84%D9%8A%D8%A9-%D9%81%D9%8A-%D8%AF%D9%88%D9%84%D8%A9-%D8%A7%D9%84%D8%A7%D9%85%D8%A7%D8%B1%D8%A7%D8%AA-%D8%A7%D9%84%D8%B9%D8%B1%D8%A8%D9%8A%D8%A9-%D8%A7%D9%84%D9%85%D8%AA%D8%AD%D8%AF%D8%A9/110734665679004";
	} else if (e.source.socialID == "twitter") {
		url = "https://twitter.com/MOFUAE";
	} else if (e.source.socialID == "youtube") {
		url = "http://www.youtube.com/user/UAEMinistryofFinance";
	} else if (e.source.socialID == "instagram") {
		url = "https://instagram.com/mofuae/";
	}

	if (OS_IOS) {
		if (Ti.Platform.canOpenURL(url)) {
			Ti.Platform.openURL(url);
		}
	} else {
		Ti.Platform.openURL(url);
	}
}

function closeWindow() {
	Alloy.Globals.closeWindow($.winContacts);
}

function validateEmail(email) {
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
}

var preOrientation = undefined;
function changeOrientation(e) {
	if (preOrientation == e.orientation || e.orientation == 5) {
		return;
	}
	preOrientation = Ti.Gesture.orientation;

	if ($.lblMap.isSelected) {
		var separatorLeft;
		if (OS_IOS) {
			if (Ti.Gesture.orientation == 3 || Ti.Gesture.orientation == 4) {
				separatorLeft = (Alloy.Globals.platformHeight / 2);
			} else if (Ti.Gesture.orientation == 1 || Ti.Gesture.orientation == 2) {
				separatorLeft = (Alloy.Globals.platformWidth / 2);
			}
		} else {
			if (Ti.Gesture.orientation == 2) {
				separatorLeft = (Alloy.Globals.platformHeight / 2);
			} else if (Ti.Gesture.orientation == 1) {
				separatorLeft = (Alloy.Globals.platformWidth / 2);
			}
		}
		separatorLeft += density;
		$.tabSeparator.left = separatorLeft;

	}
}

if (Alloy.isTablet) {
	$.winContacts.addEventListener("blur", function(e) {
		Ti.Gesture.removeEventListener("orientationchange", changeOrientation);
	});

}
changeLanguage();
$.winContacts.addEventListener("focus", function(e) {
	if(Alloy.isTablet){
		Ti.Gesture.addEventListener("orientationchange", changeOrientation);
	}
	$.viewBottomToolbar.setDefaultTheme($.winContacts);
});

$.viewBottomToolbar.setDefaultTheme($.winContacts);

// var openHelpScreen = $.viewInstructions.openHelpScreen;

/**
 * Adding the eventlistener for the bottom bar view
 *
 * @param {Object} e
 */
$.viewBottomToolbar.getView().addEventListener('click', function(e) {
	if (e.source.buttonId == 'btnFontChange') {
		$.viewBottomToolbar.changeFont($.winContacts);
	} else if (e.source.buttonId == 'btnSystemFeedback') {
		$.viewBottomToolbar.openFeedbackScreen(e);
	} else/*if (e.source.buttonId == 'btnSystemInstruction') {
	 $.viewInstructions.openHelpScreen(e);
	 } else*/
	if (e.source.buttonId == 'btnSystemChangeTheme') {
		$.viewBottomToolbar.changeTheme($.winContacts);
	}
});

/**
 * Called on open of the window
 *
 * @param {Object} e
 */
function windowOpened(e) {
	addAnnotation();
	Alloy.Globals.arrWindows.push($.winContacts);
	$.viewBottomToolbar.setOptions({
		showThemeButton : true,
		showInstructions : false,
		showFeedBack : true,
		showFontResize : true,
	});
};

/**
 * Window is closed
 *
 * @param {Object} e
 */
function windowClosed(e) {
	Alloy.Globals.arrWindows.pop();
	$.destroy();
};