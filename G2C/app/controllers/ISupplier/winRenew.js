var httpManager = require("httpManager");

var args = arguments[0] || {};

if (Alloy.Globals.isIOS7Plus) {
	$.winRenew.extendEdges = [Ti.UI.EXTEND_EDGE_TOP];
	$.statusBar.height = 20;
}

function changeLanguage() {
	$.lblNavTitle.text = Alloy.Globals.selectedLanguage.renewal;
}

var arrRenewOption = [{
	icon : Alloy.Globals.path.icnProfile,
	text : Alloy.Globals.selectedLanguage.registrationFees,
	winPath : "",
}, /*{
 icon : Alloy.Globals.path.icnProfile,
 text : Alloy.Globals.selectedLanguage.uploadNewDoc,
 winPath : "ISupplier/winUploadNewDocs",
 },*/
{
	icon : Alloy.Globals.path.icnProfile,
	text : Alloy.Globals.selectedLanguage.businessClassification,
	winPath : "ISupplier/winBusinessClassification",
}];

function loadRenewList() {
	var arrTblRecords = [];

	for (var i = 0,
	    length = arrRenewOption.length; i < length; i++) {
		var tblRow = Alloy.createController('ISupplier/IsupplierServiceListRow', {
			title : arrRenewOption[i].text,
			icon : arrRenewOption[i].icon
		}).getView();
		arrTblRecords.push(tblRow);

	}

	$.tblRenew.data = arrTblRecords;
	
	if (Alloy.Globals.currentTheme == "dark") {
		$.navBarBackView.backgroundColor = Alloy.Globals.path.navBarColor;
	}
	Alloy.Globals.setDefaultTheme($.winRenew);
}

var loginDetail = Ti.App.Properties.getObject("LoginDetaisObj");
var registerId = loginDetail.general_Profile.isupplierRegisterId;
var	paymentId = null;

function showPaymentAlert(message) {

	var alert = Ti.UI.createAlertDialog({
		title : Alloy.Globals.selectedLanguage.renewal,
		message : message,
		buttonNames : [Alloy.Globals.selectedLanguage.yes, Alloy.Globals.selectedLanguage.no]
	});
	alert.addEventListener('click', function(e) {
		
		if(e.index == 0){
			//Alloy.Globals.gotoHome();
			getPaymentID();
		}else{
			alert.hide();
		}
		
		
	});
	alert.show();
}


function getPaymentID() {
	
//	Ti.Platform.openURL('http://demoserver.tacme.net:3030/eDirhams/html/photo-purchase-details1.html');
//	return;
	
	var loginDetail = Ti.App.Properties.getObject("LoginDetaisObj");

	var obj = {
		serviceName : "mSupplier Renewal",
		registerId : loginDetail.general_Profile.isupplierRegisterId
	};

	httpManager.getPaymentId(obj, function(e) {

		Ti.API.info('obj===' + JSON.stringify(e));


		if (e == null) {
			return;
		} else {

			paymentId = e.paymentId;
			if (e.paymentId == "") {
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.iSupplier, e.errorMsg);
			} else {

				var lan;
				if (Alloy.Globals.isEnglish) {
					lan = "en";
				} else {
					lan = "ar";
				}

				Ti.App.Properties.setObject("PaymentObject", {
					paymentId : paymentId,
					paymentType : "REN",
					supplierName :loginDetail.general_Profile.supplier_Name,//loginDetail.userInfo.userName,//As per chandra's confirmation we are passing email address instead of name "sadfasd",//loginDetail.general_Profile.supplier_Name,
					registerId : loginDetail.general_Profile.isupplierRegisterId,
					vendorId : loginDetail.general_Profile.vendor_id,
				});

				var deviceType;
				if (OS_IOS) {
					deviceType = "IOS";
				} else {
					deviceType = "Android";
				}
				
				
				var alert = Ti.UI.createAlertDialog({
						title : Alloy.Globals.selectedLanguage.feesPayment,
						message : Alloy.Globals.selectedLanguage.paymentMsg,
						buttonNames : [Alloy.Globals.selectedLanguage.ok]
					});
					alert.addEventListener('click', function(e) {
						if (e.index == 0) {
							var paymentUrl = "http://194.170.30.187:7001/mobipay/purchaseReview.html?languageCode=" + lan + "&id=" + e.paymentId + "&serviceCode=" + e.serviceCode + "&deviceType=" + deviceType + "&paymentType=" + "Direct";
							Ti.API.info('paymentUrl' + paymentUrl);

							Ti.Platform.openURL(paymentUrl);
						}
					});
					alert.show();
				
				
				// var paymentUrl = "http://194.170.30.187:7001/mobipay/purchaseReview.html?languageCode=" + lan + "&id=" + e.paymentId + "&serviceCode=" + e.serviceCode + "&deviceType=" + deviceType + "&paymentType=" + "Direct";
				// Ti.API.info('paymentUrl' + paymentUrl);
// 
				// Ti.Platform.openURL(paymentUrl);

			}

		}

	});
}

$.tblRenew.addEventListener("click", function(e) {
	if (e.index == 0) {
		Ti.API.info('loginDetail.general_Profile.isRenewalAllowed==='+loginDetail.general_Profile.isRenewalAllowed);
		if(loginDetail.general_Profile.isRenewalAllowed == "Y"){
			getPaymentID();
		}else {
			Ti.API.info('else');
			showPaymentAlert(Alloy.Globals.selectedLanguage.notAccessRenewal);
		//	Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.renewal, Alloy.Globals.selectedLanguage.notAccessRenewal);
				
		}
		return;
	}
	Alloy.Globals.openWindow(Alloy.createController(arrRenewOption[e.index].winPath, args).getView());
});

function closeWindow() {
	Alloy.Globals.closeWindow($.winRenew);
}
$.winRenew.addEventListener("focus",function(e){
	$.viewBottomToolbar.setDefaultTheme($.winRenew);
});
$.viewBottomToolbar.setDefaultTheme($.winRenew);


/**
 * Adding the eventlistener for the bottom bar view
 *
 * @param {Object} e
 */
$.viewBottomToolbar.getView().addEventListener('click', function(e) {
	if (e.source.buttonId == 'btnFontChange') {
		$.viewBottomToolbar.changeFont($.winRenew);
	} else if (e.source.buttonId == 'btnSystemFeedback') {
		$.viewBottomToolbar.openFeedbackScreen(e);
	} else if (e.source.buttonId == 'btnSystemInstruction') {
		$.viewInstructions.openHelpScreen(e);
	} else if (e.source.buttonId == 'btnSystemChangeTheme') {
		$.viewBottomToolbar.changeTheme($.winRenew);
	}
});

/**
 * Called on open of the window
 *
 * @param {Object} e
 */
var windowOpened = function(e) {
	loadRenewList();
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

$.winRenew.addEventListener("close", function(e) {
	Ti.App.removeEventListener('resume', resumeApp);
//	Alloy.Globals.arrWindows.pop();
	$.destroy();
});


function openTransactionDetails() {
	
	var loginDetail = Ti.App.Properties.getObject("LoginDetaisObj");
	
	var obj = {
		paymentId : paymentId,
		paymentType : "REN",
		supplierName : loginDetail.general_Profile.supplierName,
		registerId : loginDetail.general_Profile.isupplierRegisterId,
		vendorId : loginDetail.general_Profile.vendor_id,
	};
	
	Alloy.Globals.url = "";
	
	httpManager.getPaymentTransactionDetails(obj, function(e) {

		Ti.API.info('e' + JSON.stringify(e));
		if (e == null) {
			return;
		}

		var status;
		if (e.operationCode == "0000") {
			status = "SUCCESS";
			var loginDetail = Ti.App.Properties.getObject("LoginDetaisObj");	
			loginDetail.general_Profile.isRenewalAllowed = "N";
			Ti.App.Properties.setObject("LoginDetaisObj", loginDetail);
			Ti.API.info('Ti.App.Properties.getObject("LoginDetaisObj")==='+JSON.stringify(Ti.App.Properties.getObject("LoginDetaisObj")));
			
		} else {
			status = "FAILURE";
		}

		var payLoad = {
			registerId : Ti.App.Properties.getObject("PaymentObject").registerId,
			status : status,
			serviceId : 6,
			obj : e,
			isFromRenewal : true, 
		};

		var win = Alloy.createController("ISupplier/winPaymentStatus", payLoad).getView();
		Alloy.Globals.openWindow(win);
	});

};


function resumeApp(){

		var delay = setTimeout(function(e) {
			var args = Ti.App.getArguments();
			Ti.API.info('Launched with: ' + JSON.stringify(args));

			if (args.url == "urlschemademo://?") {
				openTransactionDetails();
			}
		}, 500);
	
}

if (OS_IOS) {
	Ti.App.addEventListener('resume', resumeApp);
} else if (OS_ANDROID) {

	// On Android, somehow the app always opens as new

	Ti.API.info('Alloy.globals.url====' + Alloy.Globals.url);

	if (Alloy.Globals.url == "urlschemademo://") {
		openTransactionDetails();
	}

}


$.winRenew.addEventListener("open", function(e) {
//	Alloy.Globals.arrWindows.push($.winRenew);

});


changeLanguage();
