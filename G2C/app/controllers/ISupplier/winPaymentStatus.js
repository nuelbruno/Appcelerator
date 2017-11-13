var httpManager = require("httpManager");

var isEnglish = (Alloy.Globals.isVATTAXModuleActive) ? Alloy.Globals.VATTAXisEnglish : Alloy.Globals.isEnglish;
var selectedLanguage = (Alloy.Globals.isVATTAXModuleActive) ? Alloy.Globals.VTaxSelectedLanguage :  Alloy.Globals.selectedLanguage;

var args = arguments[0];

var obj = args.obj;

var status = args.status;
//Ti.API.info('args===' + JSON.stringify(args));
Ti.API.info('args.isFromRenewal===' + args.isFromRenewal);

if (status == "SUCCESS") {
	$.lblThankYou.text = selectedLanguage.thankYouConfirmPayment;
	$.icnDone.image = Alloy.Globals.path.imgDoneUserSatisfaction;
} else {
	if (args.serviceId == 6) {
		$.retryView.visible = true;
		$.resumePayView.visible = true;
	}
	$.lblThankYou.text = selectedLanguage.paymentFailure;
	$.icnDone.image = Alloy.Globals.path.imgFailUserSatisfaction;
}

if (Alloy.Globals.isIOS7Plus) {
	//$.winPurchaseOrder.extendEdges = [Ti.UI.EXTEND_EDGE_TOP];
	$.statusBar.height = 20;
}

function closeWindow() {
	Alloy.Globals.closeWindow($.winPaymentStatus);
	//$.winISupplierHome.close();
}

function showTokenExpiredAlert(message) {
	Ti.App.Properties.setString("tokenStatus", "Expired");
	var alert = Ti.UI.createAlertDialog({
		title : selectedLanguage.iSupplier,
		message : message,
		buttonNames : [selectedLanguage.ok]
	});
	alert.addEventListener('click', function(e) {
		//Alloy.Globals.gotoHome();
		$.scrollBackView.show();
		$.popView.show();
	});
	alert.show();
}

function submitMSupplierPayment() {
	httpManager.submitMSupplierPayment(args.registerId, function(e) {

		Ti.API.info('e====' + JSON.stringify(e));

		if (e.length == 0) {
			return;
		} else {

			if (e[0].status == "F") {
				showTokenExpiredAlert(e[0].msgData);
			} else {
				showTokenExpiredAlert(e[0].msgData);
			}

		}

	});
}

function submitPayment(e) {

	//535165....args.registerId
	if (args.isFromRenewal) {
		$.scrollBackView.show();
		$.popView.show();
	} else if (args.serviceId == 6) {
		submitMSupplierPayment();
	} else {
		$.scrollBackView.show();
		$.popView.show();
	}
}

function loadiSupplierUserData() {
	if (Ti.App.Properties.getInt("isLoggedIn_mSupplier") == true) {
		/* Ramesh -- New Token service to be taken from SOA Guys Mar 30 */
		httpManager.getDeviceTokenInfo(Ti.App.Properties.getObject("LoginDetaisObj").tokenDetails, 1, function(e) {
			closeWindow();
			var win = Alloy.createController("ISupplier/winISupplierHome").getView();
			Alloy.Globals.openWindow(win);
		});
	} else {
		closeWindow();
		var win = Alloy.createController("ISupplier/winISupplierHome").getView();
		Alloy.Globals.openWindow(win);
	}
}

function loadUserData() {
	Ti.API.info(">>>>>" + Ti.App.Properties.getInt("isLoggedIn_VatTax"));
	if (Ti.App.Properties.getInt("isLoggedIn_VatTax") == true) {
		Ti.API.info('>>>>>info ram' + JSON.stringify(Ti.App.Properties.getObject("LoginDetaisObj_VatTax")));
		httpManager.getDeviceTokenInfo(Ti.App.Properties.getObject("LoginDetaisObj_VatTax").tokenDetails, 2, function(e) {
			closeWindow();
			var win = Alloy.createController("TaxVat/winTaxVatHome").getView();
			Alloy.Globals.openWindow(win);
		});

	} else {
		closeWindow();
		var win = Alloy.createController("TaxVat/winTaxVatHome").getView();
		Alloy.Globals.openWindow(win);
	}
}

function closePopUP() {
	if (OS_ANDROID) {
		if (args.serviceId == 5) {
			loadUserData();
		} else {
			loadiSupplierUserData();
		}

	} else {
		if (args.serviceId == 5) {
			Alloy.Globals.gotoHome(1);
		} else {
			Alloy.Globals.gotoHome();
		}
	}

}

function openUserSatisfaction() {
	httpManager.getUserSatisfactionQuestions(function(e) {
		if (e == null) {
			return;
		}
		var win = Alloy.createController("UserSatisfaction/winUserSatisfaction", {
			callBack : Alloy.Globals.gotoHome,
			data : e,
			serviceID : args.serviceId,
			fromPaymentStatus : true
		}).getView();
		Alloy.Globals.openWindow(win);

	});
}

var paymentId = null;

function retryPayment() {
	var obj = {
		serviceName : (args.isFromRenewal) ? "mSupplier Renewal" : "mSupplier Registration",
		registerId : Ti.App.Properties.getObject("PaymentObject").registerId
	};

	httpManager.getPaymentId(obj, function(e) {

		Ti.API.info('obj===' + JSON.stringify(e));

		if (e == null) {
			return;
		}


		if (e == null) {
			return;
		} else {

			paymentId = e.paymentId;
			if (e.paymentId == "") {
				Alloy.Globals.ShowAlert(selectedLanguage.iSupplier, e.errorMsg);
			} else {

				var lan;
				if (isEnglish) {
					lan = "en";
				} else {
					lan = "ar";
				}

				Ti.App.Properties.setObject("PaymentObject", {
					paymentId : paymentId,
					paymentType : (args.isFromRenewal) ? "REN" : "REG",
					supplierName : Ti.App.Properties.getObject("PaymentObject").supplierName,
					registerId : Ti.App.Properties.getObject("PaymentObject").registerId,
					vendorId : (args.isFromRenewal) ?  Ti.App.Properties.getObject("PaymentObject").vendor_id : "",
				});
				
				var deviceType;
				if (OS_IOS) {
					deviceType = "IOS";
				} else {
					deviceType = "Android";
				}
				
				var paymentType = (args.isFromRenewal) ? "Direct" : "Pre-Auth";
				
				var paymentUrl = "http://194.170.30.187:7001/mobipay/purchaseReview.html?languageCode=" + lan + "&id=" + e.paymentId + "&serviceCode=" + e.serviceCode + "&deviceType=" + deviceType + "&paymentType=" + paymentType;
				Ti.API.info('paymentUrl' + paymentUrl);

				Ti.Platform.openURL(paymentUrl);
				closeWindow();
			}

		}

	});

}

function resumePayment() {
	if (OS_IOS) {
		closeWindow();
	} else {
		
		if(args.isFromRenewal){
			var win = Alloy.createController("ISupplier/winRenew").getView();
			Alloy.Globals.openWindow(win);
			closeWindow();
		}else{
			httpManager.getFirstStepRegistration(Ti.App.Properties.getObject("PaymentObject").registerId, Ti.App.Properties.getString("mappingId"), function(e) {

			Ti.API.info('e==' + JSON.stringify(e));

			if (e == null) {
				return;
			}

			if (e.status == "S") {
				var win = Alloy.createController("ISupplier/winResumeRegistration", e).getView();
				Alloy.Globals.openWindow(win);
				closeWindow();
			} else {
				Alloy.Globals.ShowAlert(selectedLanguage.iSupplier, selectedLanguage.noRecordFound);
			}

		});
		}
		
		

	}
}

function changeLanguage() {
	$.lblNavTitle.text = selectedLanguage.paymentStatus;

	$.lblTransactionId.text = selectedLanguage.transactionId;
	$.lblTransactionAmount.text = selectedLanguage.transactionAmount;
	$.lblConfirmationId.text = selectedLanguage.confirmationId;
	$.lblConfirmationDate.text = selectedLanguage.confirmationDate;
	$.lblDescription.text = selectedLanguage.description;

	$.lblTransactionIdValue.text = obj.transactionId;
	$.lblTransactionAmountValue.text = obj.transactionAmount;
	$.lblConfirmationIdValue.text = obj.confirmationId;
	$.lblConfirmationDateValue.text = obj.transactionDate;
	$.lblDescriptionValue.text = (isEnglish) ? obj.enDesc : obj.arDesc;

	$.lblUserSatisfaction.text = selectedLanguage.userSatisfaction;
	$.lblSuggestion.text = selectedLanguage.userSatisfactionSuggestion;
	$.lblFeedback.text = selectedLanguage.yes;
	$.lblSkip.text = selectedLanguage.skip;
	
	$.lblDone.text = selectedLanguage.doneTitle;

	$.lblRetry.text = selectedLanguage.retry;
	
	if (args.isFromRenewal) {
		$.lblUpdateRegistration.text = selectedLanguage.renewFees;
	} else {
		$.lblUpdateRegistration.text = selectedLanguage.resumeRegistration;
	}
	var alignment;

	if (isEnglish) {
		alignment = Ti.UI.TEXT_ALIGNMENT_LEFT;

		$.lblFeedback.left = $.lblSkip.right = 0;

	} else {
		alignment = Ti.UI.TEXT_ALIGNMENT_RIGHT;
		$.lblFeedback.right = $.lblSkip.left = 0;

	}

	$.lblTransactionId.textAlign = $.lblTransactionIdValue.textAlign = $.lblTransactionAmount.textAlign = $.lblTransactionAmountValue.textAlign = alignment;
	$.lblConfirmationId.textAlign = $.lblConfirmationIdValue.textAlign = $.lblConfirmationDate.textAlign = $.lblConfirmationDateValue.textAlign = alignment;
	$.lblDescription.textAlign = $.lblDescriptionValue.textAlign = alignment;

}

$.winPaymentStatus.addEventListener("focus", function(e) {
	$.viewBottomToolbar.setDefaultTheme($.winPaymentStatus);
});
$.viewBottomToolbar.setDefaultTheme($.winPaymentStatus);

/**
 * Adding the eventlistener for the bottom bar view
 *
 * @param {Object} e
 */
$.viewBottomToolbar.getView().addEventListener('click', function(e) {
	if (e.source.buttonId == 'btnFontChange') {
		$.viewBottomToolbar.changeFont($.winPaymentStatus);
	} else if (e.source.buttonId == 'btnSystemFeedback') {
		$.viewBottomToolbar.openFeedbackScreen(e);
	} else if (e.source.buttonId == 'btnSystemChangeTheme') {
		$.viewBottomToolbar.changeTheme($.winPaymentStatus);
	}
});

/**
 * Called on open of the window
 *
 * @param {Object} e
 */
var windowOpened = function(e) {
	Alloy.Globals.arrWindows.push($.winPaymentStatus);
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
var windowClosed = function(e) {
	Alloy.Globals.arrWindows.pop();
	$.destroy();
};

changeLanguage();
$.winPaymentStatus.addEventListener("androidback", function() {
	if (args.serviceId == 5) {
		loadUserData();
	} else {
		loadiSupplierUserData();
	}
});
