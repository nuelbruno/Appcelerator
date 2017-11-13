var args = arguments[0] || {};
var utilities = require("utilities");
var mapModule = require('ti.map');

var annotation = mapModule.createAnnotation({
	latitude : 25.572547,
	longitude : 55.566583,
	title : Alloy.Globals.selectedLanguage.govtUAQ,
	subtitle : Alloy.Globals.selectedLanguage.deptUAQ,
	pincolor : mapModule.ANNOTATION_RED
});

var mapview = null;
var preLang = null;

function changeLanguage() {
	try {
		if (preLang == Alloy.Globals.language) {
			return;
		}
		preLang = Alloy.Globals.language;
		$.viewLeftPanel.setLanguage();
		$.viewHappinessIndicator.changeLanguage();
		$.viewNotification.changeLanguage();
		///// Display labels and : (columns) after text
		$.lblNavTitle.text = Alloy.Globals.selectedLanguage.contactUs;
		$.labelTitle.text = Alloy.Globals.selectedLanguage.deptUAQ;
		$.labelWorkingHour.text = Alloy.Globals.selectedLanguage.workingHour + ":";
		$.labelRamadanHour.text = Alloy.Globals.selectedLanguage.ramadan + ":";
		$.labelContactUs.text = Alloy.Globals.selectedLanguage.contactUs + ":";
		////Display fixed static content
		$.labelWorkingHourValue.text = "From 7:00 AM to 2:00 PM";
		$.labelRamadanHourValue.text = "From 9:00 AM to 2:00 PM";
		$.labelPhoneNumber.text = "067641000";
		$.labelFaxNumber.text = "067641777";
		$.labelMail.text = "info@uaqgov.ae";
		$.labelWeb.text = "www.uaq.ae/ar/home.html";
		$.labelFacebook.text = "www.facebook.com/Um-Al-Quwain-EGov-292347434296161/timeline";
		$.labelTwitter.text = "www.twitter.com/uaq_egov";
		
		///UI Alignment of window label and texts
		$.labelFacebook.left = (Alloy.Globals.isEnglish?30:undefined);
		$.labelFacebook.right = (Alloy.Globals.isEnglish?undefined:30);
		$.labelPhoneNumber.left = (Alloy.Globals.isEnglish?30:undefined);
		$.labelPhoneNumber.right = (Alloy.Globals.isEnglish?undefined:30);
		$.labelFaxNumber.left = (Alloy.Globals.isEnglish?30:undefined);
		$.labelFaxNumber.right = (Alloy.Globals.isEnglish?undefined:30);
		$.labelMail.left = (Alloy.Globals.isEnglish?30:undefined);
		$.labelMail.right = (Alloy.Globals.isEnglish?undefined:30);
		$.labelWeb.left = (Alloy.Globals.isEnglish?30:undefined);
		$.labelWeb.right = (Alloy.Globals.isEnglish?undefined:30);
		$.labelTwitter.left = (Alloy.Globals.isEnglish?30:undefined);
		$.labelTwitter.right = (Alloy.Globals.isEnglish?undefined:30);
		
		$.labelFacebook.textAlign = (Alloy.Globals.isEnglish?Titanium.UI.TEXT_ALIGNMENT_LEFT:Titanium.UI.TEXT_ALIGNMENT_RIGHT);
		
		$.labelWorkingHour.left = (Alloy.Globals.isEnglish?15:undefined);
		$.labelWorkingHour.right = (Alloy.Globals.isEnglish?undefined:15);
		$.labelRamadanHour.left = (Alloy.Globals.isEnglish?15:undefined);
		$.labelRamadanHour.right = (Alloy.Globals.isEnglish?undefined:15);
		$.labelContactUs.left = (Alloy.Globals.isEnglish?15:undefined);
		$.labelContactUs.right = (Alloy.Globals.isEnglish?undefined:15);
		
		$.labelTitle.left = (Alloy.Globals.isEnglish?0:undefined);
		$.labelTitle.right = (Alloy.Globals.isEnglish?undefined:0);
		$.imageviewWeb.left = (Alloy.Globals.isEnglish?0:undefined);
		$.imageviewWeb.right = (Alloy.Globals.isEnglish?undefined:0);
		$.imageviewPhone.left = (Alloy.Globals.isEnglish?0:undefined);
		$.imageviewPhone.right = (Alloy.Globals.isEnglish?undefined:0);
		$.imageviewFax.left = (Alloy.Globals.isEnglish?0:undefined);
		$.imageviewFax.right = (Alloy.Globals.isEnglish?undefined:0);
		$.imageviewMail.left = (Alloy.Globals.isEnglish?0:undefined);
		$.imageviewMail.right = (Alloy.Globals.isEnglish?undefined:0);
		$.imageviewFacebook.left = (Alloy.Globals.isEnglish?0:undefined);
		$.imageviewFacebook.right = (Alloy.Globals.isEnglish?undefined:0);
		$.imageviewTwitter.left = (Alloy.Globals.isEnglish?0:undefined);
		$.imageviewTwitter.right = (Alloy.Globals.isEnglish?undefined:0);
	} catch(e) {
		Ti.API.info('Error ' + e.message);
	}
}

function mapClicked(e) {
	try {
		if (!Ti.Network.online) {
			utilities.showAlert(Alloy.Globals.selectedLanguage.networkError, Alloy.Globals.selectedLanguage.noInternet);
			return;
		}
		Ti.Platform.openURL((OS_IOS?"Maps://http:":"http:")+"//maps.google.com/maps?q=25.572547,55.566583");	
	}
	catch(e) {
		Ti.API.info('Error ' + e.message);
	}
}

function winOpen() {
	try {
		Alloy.Globals.arrWindows.push($.winContactUs);
		$.viewNavigationTools.getView().win = $.mainView;
		$.viewNavigationTools.setHappinessView($.viewHappinessIndicator.getView());
		$.viewNavigationTools.setNotificationView($.viewNotification.getView());
		$.viewLeftPanel.getView().changeLanguage = changeLanguage;
		$.viewNavigationTools.getView().transparentView = $.viewTransparent;
		
		mapview = mapModule.createView({
			mapType:mapModule.NORMAL_TYPE,
			height:400,
			width:"100%",
			region:{
				latitudeDelta : 0.12,
				longitudeDelta : 0.12,
				latitude : 25.572547,
				longitude : 55.566583,
			},
    		animate:true,
    		regionFit:true,
    		userLocation:false,
		});
		mapview.addEventListener("click", mapClicked);
		$.scrollviewContactUs.add(mapview);
		setTimeout(function(){
			if (mapview==null)
				return;
			mapview.addAnnotations([annotation]);
		},2000);
	} catch(e) {
		Ti.API.info('Error ' + e.message);
	}
}

function closeLeftPanel() {
	$.viewNavigationTools.onMenu();
}

function winFocus(e) {
	try {
		Alloy.Globals.bottomMenu = $.backView;
		$.viewBottomMenu.addInnerMenu();
		Alloy.Globals.currentWindow = e.source.id;
		changeLanguage();

		$.viewLeftPanel.setMenuDirectionView({
			direction : Alloy.Globals.SelectedMenuDirection,
			menuCallback : undefined
		});
	} catch(e) {
		Ti.API.info('Error ' + e.message);
	}

}

function closeWindow() {
	
	try {
		if (mapview!=null){
			$.scrollviewContactUs.remove(mapview);
			mapview=null;
		}
		
		if (args.isFromMenu) {
			Alloy.Globals.gotoHome();
			return;
		}
		Alloy.Globals.arrWindows.pop($.winContactUs);
		$.winContactUs.close();
	} catch(e) {
		Ti.API.info('Error ' + e.message);
	}
}

/*
 * Ravindra Changes
 */

function contactUAQ() {
	try {
		var device = Ti.Platform.model;
		device = device.substr(0, 4);
		if (device === "iPod") {
			var dialog = Ti.UI.createAlertDialog({
				ok : 0,
				title : Alloy.Globals.selectedLanguage.appTitle,
				message : Alloy.Globals.selectedLanguage.notAvailable,
				buttonNames : [Alloy.Globals.selectedLanguage.ok]
			});

			dialog.show();
		} else {
			utilities.makeCall($.labelPhoneNumber.text);
		}
	} catch(e) {
		Ti.API.info('Error ' + e.message);
	}
}

function emailCallBack() {

}

function mailUAQ() {
	try{
		utilities.sendMail($.labelMail.text, Alloy.Globals.selectedLanguage.contactInfo, "", emailCallBack);		
	}catch(e){
		Ti.API.info('Error ' + e.message);
	}
}

function openWebsite() {
	try{
		utilities.openWebsite($.labelWeb.text,  "contact");		
	}catch(e){
		Ti.API.info('Error ' + e.message);
	}
}

function openFaceBook() {
	utilities.openWebsite($.labelFacebook.text, "contact");
}

function openTwitter() {
	utilities.openWebsite($.labelTwitter.text, "contact");
}

function langSettings(){
	
}
