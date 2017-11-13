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


var arrEmirate = [{
	titleEn : "Abu Dhabi",
	titleAr : "أبوظبي"
},{
	titleEn : "Dubai",
	titleAr : "دبي"
},{
	titleEn : "Sharjah",
	titleAr : "الشارقة"
},{
	titleEn : "Ajman",
	titleAr : "عجمان"
},{
	titleEn : "Al Fujaira",
	titleAr : "الفجيرة"
},{
	titleEn : "Ras Al Khaima",
	titleAr : "رأس الخيمة"
},{
	titleEn : "Umm Al Queain",
	titleAr : "أم القيوين"
},{
	titleEn : "Al Ain",
	titleAr : "العين"
},{
	titleEn : "West Area",
	titleAr : "المنطقة الغربية"
}];

var isEmirateSelected = false;

function setEmirateLabel(e){
	isEmirateSelected = true;
	$.lblEmirateValue.text = e.labelTitle;
}

var isTapped = false;

function selectEmirate(e) {

	if (isTapped) {
		return;
	}
	isTapped = true;
		
		
		Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading, false);
		var arrData = [];

		for (var i = 0; i < arrEmirate.length; i++) {
			var title = Alloy.Globals.isEnglish ? arrEmirate[i].titleEn : arrEmirate[i].titleAr;
			arrData.push({
				title : arrEmirate[i].titleEn,
				titleAr : arrEmirate[i].titleAr,
				value : title,
				selected : ""
			});
		}

		var winSelection = Alloy.createController('winSelection', {
			data : arrData,
			title : Alloy.Globals.selectedLanguage.supplierRegistration,
			callBackFunction : setEmirateLabel,
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

function validateInteger(phone) {
	//var regex=/^[0-9]+$/;
	var regex = /^[0-9]+$/;
	return (regex.test(phone));
}

function submitForm(){
	
	if($.txtAddressName.value.length == 0){
		Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.iSupplier, Alloy.Globals.selectedLanguage.enterAddressName);
		return;
	}else if($.txtAddressLine1.value.length == 0){
		Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.iSupplier, Alloy.Globals.selectedLanguage.enterAddressLine1);
		return;
	}else if(!isEmirateSelected){
		Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.iSupplier, Alloy.Globals.selectedLanguage.selectEmirate);
		return;
	}else if($.txtCity.value.length == 0){
		Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.iSupplier, Alloy.Globals.selectedLanguage.enterCity);
		return;
	}else if ($.txtPOBOX.value.length == 0) {
		Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.iSupplier, Alloy.Globals.selectedLanguage.mSupEnterPOBox);
		return;
	}else if (!validateInteger($.txtPOBOX.value.trim())) {
		Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.iSupplier, Alloy.Globals.selectedLanguage.mSupInvalidPOBox);
		return;
	}
	 
	var obj = {
		mappingId : args.mappingId,
		addressName : $.txtAddressName.value,
		addressLine1 : $.txtAddressLine1.value,
		addressLine2 : $.txtAddressLine2.value,
		country : "AE",
		emirate : $.lblEmirateValue.text,
		city : $.txtCity.value,
		poBox : $.txtPOBOX.value,
		action : (args.isUpdate) ? "UPDATE" : "INSERT",
		requestId : (args.isUpdate) ? doc.addressReqId : ""
	};
	
	httpManager.addMSupplierAddressDetails(obj,function(e){
		Ti.API.info('e==='+JSON.stringify(e));
			
		if(e == null){
			return;
		}	
		
		if(e.requestStatus == "S"){
			showAlert(Alloy.Globals.selectedLanguage.dataSuccess);
		}else{
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.iSupplier, e.requestMsg);
		//	alert(e.requestMsg);
		}
		
	});
	
}

function changeLanguage() {
	
	$.txtCountry.touchEnabled = false;
	
	$.lblNavTitle.text = Alloy.Globals.selectedLanguage.supplierRegistration,

	$.lblAdressDetails.text = Alloy.Globals.selectedLanguage.addressDetails;
	
	$.lblAddressName.text = Alloy.Globals.selectedLanguage.addressName;
	$.lblAddressLine1.text = Alloy.Globals.selectedLanguage.addressLine1;
	$.lblAddressLine2.text = Alloy.Globals.selectedLanguage.addressLine2;
	$.lblCountry.text = Alloy.Globals.selectedLanguage.country;
	$.lblEmirate.text = Alloy.Globals.selectedLanguage.emirate;
	$.lblCity.text = Alloy.Globals.selectedLanguage.city;
	$.lblPOBox.text = Alloy.Globals.selectedLanguage.poBox;
	
	$.txtCountry.value = (Alloy.Globals.isEnglish) ? "United Arab Emirates" : "دولة الإمارات العربية";
	$.txtAddressName.value = (Alloy.Globals.isEnglish) ? "HQ" : "المقر الرئيسي";
	$.lblEmirateValue.text = Alloy.Globals.selectedLanguage._selectEmirate;
		
	if(args.isUpdate){
		isEmirateSelected = true;
		$.txtAddressName.value = doc.addressName;
		$.txtAddressLine1.value = doc.addressLine1;
		$.txtAddressLine2.value = doc.addressLine2;
		$.txtCountry.text = "United Arab Emirates";
		$.lblEmirateValue.text = doc.emirate;
		$.txtCity.value = doc.city;
		$.txtPOBOX.value = doc.postalCode;
	}		
		
	var alignment;
	
	if (Alloy.Globals.isEnglish) {
		alignment = Ti.UI.TEXT_ALIGNMENT_LEFT;
		
		$.lblAddressNameAstrik.left = $.lblAddressLine1Astrik.left = $.lblCountryAstrik.left = $.lblEmirateAstrik.left = $.lblCityAstrik.left = $.lblPOBoxAstrik.left = 5;
		$.lblAddressNameAstrik.right = $.lblAddressLine1Astrik.right = $.lblCountryAstrik.right = $.lblEmirateAstrik.right = $.lblCityAstrik.right = $.lblPOBoxAstrik.right = undefined;
		
	
	} else {
		alignment = Ti.UI.TEXT_ALIGNMENT_RIGHT;
		
		$.lblAddressNameAstrik.right = $.lblAddressLine1Astrik.right = $.lblCountryAstrik.right = $.lblEmirateAstrik.right = $.lblCityAstrik.right = $.lblPOBoxAstrik.right = 5;
		$.lblAddressNameAstrik.left = $.lblAddressLine1Astrik.left = $.lblCountryAstrik.left = $.lblEmirateAstrik.left = $.lblCityAstrik.left = $.lblPOBoxAstrik.left = undefined;
		
	}

	$.lblAdressDetails.textAlign = $.lblAddressName.textAlign = $.txtAddressName.textAlign = $.lblAddressLine1.textAlign = $.txtAddressLine1.textAlign = alignment;
	$.lblAddressLine2.textAlign = $.txtAddressLine2.textAlign = $.lblCountry.textAlign = $.txtCountry.textAlign = $.lblEmirate.textAlign = $.lblEmirateValue.textAlign = alignment;
	$.lblCity.textAlign = $.txtCity.textAlign = $.lblPOBox.textAlign = $.txtPOBOX.textAlign = alignment;

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



