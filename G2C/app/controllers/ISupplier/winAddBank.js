var httpManager = require("httpManager");//Alloy.createController('common/httpManager');

var args = arguments[0] || {};
var doc = args.obj;
var callBackFunction = args.callBackFunction;

//alert(args.isUpdate);
//alert(args.mappingId);

if (Alloy.Globals.isIOS7Plus) {
	//$.winPurchaseOrder.extendEdges = [Ti.UI.EXTEND_EDGE_TOP];
	$.statusBar.height = 20;
}

function closeWindow() {
	Alloy.Globals.closeWindow($.winAddress);
}

function showAlert(message) {

    var alert = Ti.UI.createAlertDialog({
       title : Alloy.Globals.selectedLanguage.iSupplier,
       message : message,
       buttonNames : [Alloy.Globals.selectedLanguage.ok]
    });
   alert.addEventListener('click', function(e) {
   		callBackFunction();
        closeWindow();
    });
   alert.show();
}


var isTapped = false;
var arrCountry = [];
var countryCode = null;
var isCountrySelected = false;

function setCountryLabel(e){
	isCountrySelected = true;
	$.lblCountryValue.text = e.obj.title;
	countryCode = e.obj.id;
	
	isBankNameSelected = false;
	$.lblBankNameValue.text = Alloy.Globals.selectedLanguage._selectBankName;
//	Ti.API.info('e.obj.id====id===='+e.obj.id);
	arrBankName = [];
	bankId = null;
//	Ti.API.info('bankId id===='+bankId);
	isBranchNameSelected = false;
	$.lblBranchNameValue.text = Alloy.Globals.selectedLanguage._selectBranchName;
//	arrBranchName = [];
	branchId = null;
	
}

function selectCountry(e) {

	//	Ti.API.info('selectAnswer==' + JSON.stringify(e));
	if (isTapped) {
		return;
	}
	isTapped = true;

	if (arrCountry.length == 0) {

		httpManager.getMSupplierCountryList(function(e) {

			Ti.API.info('e===' + JSON.stringify(e));
			arrCountry = e;

			var arrData = [];

			for (var i = 0; i < arrCountry.length; i++) {
				var title = arrCountry[i].name;
				arrData.push({
					title : arrCountry[i].name,
					titleAr : arrCountry[i].name,
					value : title,
					id : arrCountry[i].code,
					selected : ""
				});
			}

			var winSelection = Alloy.createController('winSelection', {
				data : arrData,
				title : Alloy.Globals.selectedLanguage.supplierRegistration,
				callBackFunction : setCountryLabel,
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
		
		Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading, false);
		
		var arrData = [];

		for (var i = 0; i < arrCountry.length; i++) {
			var title = arrCountry[i].name;
			arrData.push({
				title : arrCountry[i].name,
				titleAr : arrCountry[i].name,
				value : title,
				id : arrCountry[i].code,
				selected : ""
			});
		}

		var winSelection = Alloy.createController('winSelection', {
			data : arrData,
			title : Alloy.Globals.selectedLanguage.supplierRegistration,
			callBackFunction : setCountryLabel,
		}).getView();
		if (OS_IOS) {
			winSelection.open({
				modal : true
			});
		} else {
			winSelection.open();
		}
		
		Alloy.Globals.hideLoading();
		isTapped = false;
	}

}

var arrBankName = [];
var bankId = null;
var isBankNameSelected = false;
var branchId = null;

function setBankLabel(e){
	isBankNameSelected = true;
	$.lblBankNameValue.text = e.obj.title;
//	Ti.API.info('e.obj.id====id===='+e.obj.id);
	bankId = e.obj.id;
//	Ti.API.info('bankId id===='+bankId);
	isBranchNameSelected = false;
	$.lblBranchNameValue.text = Alloy.Globals.selectedLanguage._selectBranchName;
	branchId = null;
}

function selectBankName(e) {
	
	if(!isCountrySelected){
		Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.iSupplier, Alloy.Globals.selectedLanguage.selectCountryName);
		return;
	}
	
	//	Ti.API.info('selectAnswer==' + JSON.stringify(e));
	if (isTapped) {
		return;
	}
	isTapped = true;

	if (arrBankName.length == 0) {

		httpManager.getMSupplierBankNameList(countryCode, function(e) {

			Ti.API.info('e===' + JSON.stringify(e));
			arrBankName = e;

			var arrData = [];

			for (var i = 0; i < arrBankName.length; i++) {
				var title = arrBankName[i].name;
				arrData.push({
					title : arrBankName[i].name,
					titleAr : arrBankName[i].name,
					value : title,
					id : arrBankName[i].id,
					selected : ""
				});
			}

			var winSelection = Alloy.createController('winSelection', {
				data : arrData,
				title : Alloy.Globals.selectedLanguage.supplierRegistration,
				callBackFunction : setBankLabel,
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
		
		Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading, false);
		
		var arrData = [];

		for (var i = 0; i < arrBankName.length; i++) {
			var title = arrBankName[i].name;
			arrData.push({
				title : arrBankName[i].name,
				titleAr : arrBankName[i].name,
				value : title,
				id : arrBankName[i].id,
				selected : ""
			});
		}

		var winSelection = Alloy.createController('winSelection', {
			data : arrData,
			title : Alloy.Globals.selectedLanguage.supplierRegistration,
			callBackFunction : setBankLabel,
		}).getView();
		if (OS_IOS) {
			winSelection.open({
				modal : true
			});
		} else {
			winSelection.open();
		}
		
		Alloy.Globals.hideLoading();
		isTapped = false;
	}

}


var arrBranchName = [];
var isBranchNameSelected = false;

function setBranchLabel(e){
	isBranchNameSelected = true;
	$.lblBranchNameValue.text = e.obj.title;
	branchId = e.obj.id;
}

function selectBranchName(e) {
	
	if(!isBankNameSelected){
		Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.iSupplier, Alloy.Globals.selectedLanguage.selectBankName);
		return;
	}
	
	//	Ti.API.info('selectAnswer==' + JSON.stringify(e));
	if (isTapped) {
		return;
	}
	isTapped = true;

	//if (arrBranchName.length == 0) {

		httpManager.getMSupplierBranchNameList(bankId,function(e) {
			
			Ti.API.info('bankId sub===='+bankId);
			
			Ti.API.info('e===' + JSON.stringify(e));
			arrBranchName = e;

			var arrData = [];

			for (var i = 0; i < arrBranchName.length; i++) {
				var title = arrBranchName[i].name;
				arrData.push({
					title : arrBranchName[i].name,
					titleAr : arrBranchName[i].name,
					value : title,
					id : arrBranchName[i].id,
					selected : ""
				});
			}

			var winSelection = Alloy.createController('winSelection', {
				data : arrData,
				title : Alloy.Globals.selectedLanguage.supplierRegistration,
				callBackFunction : setBranchLabel,
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

/*	} else {
		var arrData = [];

		for (var i = 0; i < arrBranchName.length; i++) {
			var title = arrBranchName[i].name;
			arrData.push({
				title : arrBranchName[i].name,
				titleAr : arrBranchName[i].name,
				value : title,
				id : arrBranchName[i].id,
				selected : ""
			});
		}

		var winSelection = Alloy.createController('winSelection', {
			data : arrData,
			title : Alloy.Globals.selectedLanguage.options,
			callBackFunction : setBranchLabel,
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
*/
}


var arrCurrency = [];
var currencyCode;
var isCurrencySelected = false;

function setCurrencyLabel(e){
	isCurrencySelected = true;
	$.lblCurrencyValue.text = e.obj.title;
	currencyCode = e.obj.id;
}

function selectCurrency(e) {
	
	//	Ti.API.info('selectAnswer==' + JSON.stringify(e));
	if (isTapped) {
		return;
	}
	isTapped = true;

	if (arrCurrency.length == 0) {

		httpManager.getMSupplierCurrencyCodeList(function(e) {

			Ti.API.info('e===' + JSON.stringify(e));
			arrCurrency = e;

			var arrData = [];

			for (var i = 0; i < arrCurrency.length; i++) {
				var title = arrCurrency[i].desc;
				arrData.push({
					title : arrCurrency[i].desc,
					titleAr : arrCurrency[i].desc,
					value : title,
					id : arrCurrency[i].code,
					selected : ""
				});
			}

			var winSelection = Alloy.createController('winSelection', {
				data : arrData,
				title : Alloy.Globals.selectedLanguage.supplierRegistration,
				callBackFunction : setCurrencyLabel,
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
		
		Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading, false);
		var arrData = [];

		for (var i = 0; i < arrCurrency.length; i++) {
			var title = arrCurrency[i].desc;
			arrData.push({
				title : arrCurrency[i].desc,
				titleAr : arrCurrency[i].desc,
				value : title,
				id : arrCurrency[i].code,
				selected : ""
			});
		}

		var winSelection = Alloy.createController('winSelection', {
			data : arrData,
			title : Alloy.Globals.selectedLanguage.supplierRegistration,
			callBackFunction : setCurrencyLabel,
		}).getView();
		if (OS_IOS) {
			winSelection.open({
				modal : true
			});
		} else {
			winSelection.open();
		}
		
		Alloy.Globals.hideLoading();
		isTapped = false;
	}

}

$.txtIBANNO.addEventListener("change",function(e){
		
	Ti.API.info('e==='+JSON.stringify(e));	
	var iban = e.value;
	Ti.API.info('iban==='+iban);
	$.txtIBANNO.value = iban.toUpperCase();
	 
	
});

function submitForm(){
	
	if(countryCode == null){
		Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.iSupplier, Alloy.Globals.selectedLanguage.selectCountryName);
		return;
	}else if(!isBankNameSelected){
		Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.iSupplier, Alloy.Globals.selectedLanguage.selectBankName);
		return;
	}else if(!isBranchNameSelected){
		Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.iSupplier, Alloy.Globals.selectedLanguage.selectBranchName);
		return;
	}else if($.txtAccountNameValue.value.length == 0){
		Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.iSupplier, Alloy.Globals.selectedLanguage.enterAccountName);
		return;
	}else if($.txtBankAccNo.value.length == 0){
		Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.iSupplier, Alloy.Globals.selectedLanguage.enterBankAccountNo);
		return;
	}else if(!isCurrencySelected){
		Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.iSupplier, Alloy.Globals.selectedLanguage.selectCurrency);
		return;
	}else if($.txtIBANNO.value.length == 0){
		Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.iSupplier, Alloy.Globals.selectedLanguage.enterIBANNo);
		return;
	}
	
	
//	var iban = $.txtIBANNO.value;
	
	// "17400090"
	var obj = {
		mappingId : args.mappingId,
		country : countryCode,
		branchId : (args.isUpdate) ? doc.branchId : branchId,
		bankId : (args.isUpdate) ? doc.bankId : bankId,
	//	branchNo : $.txtBranchNoValue.value,
	//	bankNo : $.txtBankNoValue.value,
		bankName : $.lblBankNameValue.text,
		branchName : $.lblBranchNameValue.text,
		accountName : $.txtAccountNameValue.value,
		bankAccNo : $.txtBankAccNo.value,
		currency : currencyCode,
		iban : /*iban.toUpperCase(),//*/$.txtIBANNO.value,
		action : (args.isUpdate) ? "UPDATE" : "INSERT",
		requestId : (args.isUpdate) ? doc.bankAccId : ""
	};
	
	
	httpManager.addMSupplierBankDetails(obj,function(e){
		
		if(e==null){
			return;
		}
		
		Ti.API.info('e==='+JSON.stringify(e));
		
		if(e.requestStatus == "S"){
			showAlert(Alloy.Globals.selectedLanguage.dataSuccess);
		}else{
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.iSupplier, e.requestMsg);
		//	alert(e.requestMsg);
		}
		
		
	});
	
	
}
function changeLanguage() {

	$.lblNavTitle.text = Alloy.Globals.selectedLanguage.supplierRegistration,

	$.lblAdressDetails.text = Alloy.Globals.selectedLanguage.bankDetails;
	
	$.lblCountry.text = Alloy.Globals.selectedLanguage.country;
//	$.lblBranchNo.text = Alloy.Globals.selectedLanguage.branchNo;
//	$.lblBankNo.text = Alloy.Globals.selectedLanguage.bankNo;
	$.lblBankName.text = Alloy.Globals.selectedLanguage.bankName;
	$.lblBranchName.text = Alloy.Globals.selectedLanguage.branchName;
	$.lblAccountName.text = Alloy.Globals.selectedLanguage.accountName;
	$.lblBankAccNo.text = Alloy.Globals.selectedLanguage.bankAccNo;
	$.lblCurrency.text = Alloy.Globals.selectedLanguage.currency;
	$.lblIBANNo.text = Alloy.Globals.selectedLanguage.ibanNo;
	
	$.lblCountryValue.text = Alloy.Globals.selectedLanguage._selectCountry;
	$.lblBankNameValue.text = Alloy.Globals.selectedLanguage._selectBankName;
	$.lblBranchNameValue.text = Alloy.Globals.selectedLanguage._selectBranchName;
	$.lblCurrencyValue.text = Alloy.Globals.selectedLanguage._selectCurrency;
			
			
	if(args.isUpdate){
		countryCode = doc.countryCode;
		$.lblCountryValue.text = doc.countryDescription;
	//	$.txtBranchNoValue.value = doc.firstName;
		$.lblBankNameValue.text = doc.bankName;
		$.lblBranchNameValue.text = doc.branchName;
		$.txtAccountNameValue.value = doc.bankAccName;
		$.txtBankAccNo.value = doc.bankAccNo;
		$.lblCurrencyValue.text = doc.currencyDescription;
		$.txtIBANNO.value = doc.iban;
		currencyCode = doc.currencyCode;
		isBankNameSelected = true;
		isBranchNameSelected = true;
		isCurrencySelected = true;
	}		
			
			
	var alignment;
	
	if (Alloy.Globals.isEnglish) {
		alignment = Ti.UI.TEXT_ALIGNMENT_LEFT;
		
		$.lblCountryAstrik.left = $.lblBankNameAstrik.left = $.lblBranchNameAstrik.left = $.lblAccountNameAstrik.left = $.lblBankAccNoAstrik.left = $.lblCurrencyAstrik.left = $.lblIBANNoAstrik.left = 5;
		$.lblCountryAstrik.right = $.lblBankNameAstrik.right = $.lblBranchNameAstrik.right = $.lblAccountNameAstrik.right = $.lblBankAccNoAstrik.right = $.lblCurrencyAstrik.right = $.lblIBANNoAstrik.right = undefined;
	
	} else {
		alignment = Ti.UI.TEXT_ALIGNMENT_RIGHT;
		$.lblCountryAstrik.right = $.lblBankNameAstrik.right = $.lblBranchNameAstrik.right = $.lblAccountNameAstrik.right = $.lblBankAccNoAstrik.right = $.lblCurrencyAstrik.right = $.lblIBANNoAstrik.right = 5;
		$.lblCountryAstrik.left = $.lblBankNameAstrik.left = $.lblBranchNameAstrik.left = $.lblAccountNameAstrik.left = $.lblBankAccNoAstrik.left = $.lblCurrencyAstrik.left = $.lblIBANNoAstrik.left = undefined;
		
	}
	
	$.lblAdressDetails.textAlign = $.lblCountry.textAlign = $.lblCountryValue.textAlign = $.lblBankName.textAlign = $.lblBankNameValue.textAlign = $.lblBranchName.textAlign = $.lblBranchNameValue.textAlign = alignment;
	$.lblAccountName.textAlign = $.txtAccountNameValue.textAlign = $.lblBankAccNo.textAlign = $.txtBankAccNo.textAlign = $.lblCurrency.textAlign = $.lblCurrencyValue.textAlign = alignment;
	$.lblIBANNo.textAlign = $.txtIBANNO.textAlign = alignment;
	
}

changeLanguage();

$.winAddress.addEventListener("focus",function(e){
	$.viewBottomToolbar.setDefaultTheme($.winAddress);
});
$.viewBottomToolbar.setDefaultTheme($.winAddress);

/**
 * Adding the eventlistener for the bottom bar view
 *
 * @param {Object} e
 */
$.viewBottomToolbar.getView().addEventListener('click', function(e) {
	if (e.source.buttonId == 'btnFontChange') {
		$.viewBottomToolbar.changeFont($.winAddress);
	} else if (e.source.buttonId == 'btnSystemFeedback') {
		$.viewBottomToolbar.openFeedbackScreen(e);
	} else if(e.source.buttonId == 'btnSystemChangeTheme'){
		$.viewBottomToolbar.changeTheme($.winAddress);
	}
});

/**
 * Called on open of the window
 *
 * @param {Object} e
 */
var windowOpened = function(e) {
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
var windowClosed = function(e){
	$.destroy();
};




