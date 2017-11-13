var httpManager = require("httpManager");//Alloy.createController('common/httpManager');

var args = arguments[0] || {};

var doc = args.obj;

var arrNationality = args.arr;

var callBackFunction = args.callBackFunction;
var partnership_percent_total = args.partnership_percent_total;
var partnership = (args.obj.partnership != undefined ) ? args.obj.partnership :0;
Ti.API.info("Total Percent :"+ partnership_percent_total + "\nCurrent record partnership :"+ partnership);
//alert(args.isUpdate);
//alert(args.mappingId);

if (Alloy.Globals.isIOS7Plus) {
	//$.winPurchaseOrder.extendEdges = [Ti.UI.EXTEND_EDGE_TOP];
	$.statusBar.height = 20;
}

function closeWindow() {
	Alloy.Globals.closeWindow($.winAddPartners);
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

var isNationalitySelected = false;
var selectedNationality = null;

function setNationalityLabel(e) {
	// show arabic only..
	Ti.API.info('ee===' + JSON.stringify(e));
	selectedNationality = e.obj.title;//(Alloy.Globals.isEnglish) ? e.obj.title : e.obj.titleAr;//e.obj.titleAr;
	
	isNationalitySelected = true;
	$.lblNationalityValue.text = e.labelTitle;
}

var isTapped = false;

function selectNationality(e) {

	if (isTapped) {
		return;
	}
	isTapped = true;
	Ti.API.info('innnn');
	if (arrNationality.length == 0) {

		httpManager.getMSupplierDirectorNationalityList(function(e) {

			Ti.API.info('e===' + JSON.stringify(e));
			if (e.length == 0) {
				isTapped = false;
				return;
			}
			arrNationality = e;

			var arrData = [];

			for (var i = 0; i < arrNationality.length; i++) {
				var title = (Alloy.Globals.isEnglish) ? arrNationality[i].title : arrNationality[i].title;
				arrData.push({
					title : arrNationality[i].title,
					titleAr : arrNationality[i].title,
					value : title,
					//	id : arrDirectorNationality[i].code,
					selected : ""
				});
			}

			var winSelection = Alloy.createController('winSelection', {
				data : arrData,
				title : Alloy.Globals.selectedLanguage.supplierRegistration,
				callBackFunction : setNationalityLabel,
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

		for (var i = 0; i < arrNationality.length; i++) {
			var title = (Alloy.Globals.isEnglish) ? arrNationality[i].title : arrNationality[i].title;
			arrData.push({
				title : arrNationality[i].title,
				titleAr : arrNationality[i].title,
				value : title,
				//	id : arrDirectorNationality[i].code,
				selected : ""
			});
		}

		var winSelection = Alloy.createController('winSelection', {
			data : arrData,
			title : Alloy.Globals.selectedLanguage.supplierRegistration,
			callBackFunction : setNationalityLabel,
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

function validateInteger(phone) {
	//var regex=/^[0-9]+$/;
	var regex = /^[0-9]+$/;
	return (regex.test(phone));
}

function submitForm() {
	
	if($.txtOwnerName.value.length == 0){
		Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.iSupplier, Alloy.Globals.selectedLanguage.enterOwnerName);
		return;
	}else if(!isNationalitySelected){
		Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.iSupplier, Alloy.Globals.selectedLanguage.mSupSelectNationality);
		return;
	}else if($.txtPartnership.value.length == 0){
		Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.iSupplier, Alloy.Globals.selectedLanguage.enterPartnership);
		return;
	}else if (!validateInteger($.txtPartnership.value.trim())) {
		Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.iSupplier, Alloy.Globals.selectedLanguage.invalidPartnership);
		return;
	}/*else if ($.txtPartnership.value.trim() > 100) {
		Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.iSupplier, Alloy.Globals.selectedLanguage.partnerShipGreater);
		return;
	}else if ([parseInt(Alloy.Globals.partnershipTotal) + parseInt($.txtPartnership.value)] > 100) {
		Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.iSupplier, Alloy.Globals.selectedLanguage.partnerShipGreater);
		return;
	}*/else if($.txtCitizenPartner.value.length == 0){
		Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.iSupplier, Alloy.Globals.selectedLanguage.enterCitizenPartner);
		return;
	}
	else if((parseInt(partnership_percent_total - partnership)  + parseInt($.txtPartnership.value) )> 100)
	{
		Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.iSupplier, Alloy.Globals.selectedLanguage.partnerShipGreater + " \n "+ Alloy.Globals.selectedLanguage.partnerShipMaxValueCanEnter +  (100- parseInt(partnership_percent_total - partnership)));
		return;
	}
	
	
	var obj = {
		registerId : args.registeredId,
		ownerName : $.txtOwnerName.value,
		nationality : selectedNationality,//$.lblNationalityValue.text,
		partnership : $.txtPartnership.value,
		citizenPartner : $.txtCitizenPartner.value,
		action : (args.isUpdate) ? "UPDATE" : "INSERT",
		extension : (args.isUpdate) ? doc.extension : ""
	};

	httpManager.addMSupplierPartnersDetails(obj, function(e) {

		Ti.API.info('e===' + JSON.stringify(e));
		
		if(e==null){
			return;
		}
		
		if (e.status == "S") {
			Ti.API.info('Alloy.Globals.partnershipTotal==='+Alloy.Globals.partnershipTotal);
			Alloy.Globals.partnershipTotal = parseInt(Alloy.Globals.partnershipTotal) + parseInt($.txtPartnership.value); 
			Ti.API.info('Alloy.Globals.partnershipTotal===Add Partner'+Alloy.Globals.partnershipTotal);
			showAlert(Alloy.Globals.selectedLanguage.dataSuccess);
		} else {
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.iSupplier, e.msg);
		//	alert(e.msg);
		}

	});

}

function changeLanguage() {

	$.lblNavTitle.text = Alloy.Globals.selectedLanguage.supplierRegistration,

	$.lblPartnersDetails.text = Alloy.Globals.selectedLanguage.partnersDetails;

	$.lblOwnerName.text = Alloy.Globals.selectedLanguage.ownerName;
	$.lblNationality.text = Alloy.Globals.selectedLanguage.nationality;
	$.lblPartnership.text = Alloy.Globals.selectedLanguage.partnership + "( % )";
	$.lblCitizenPartner.text = Alloy.Globals.selectedLanguage.citizenPartner;
	$.lblNationalityValue.text = Alloy.Globals.selectedLanguage._nationality;
	
	if(args.isUpdate){
		$.txtOwnerName.value = doc.ownerName;
		$.lblNationalityValue.text = doc.nationality;
		selectedNationality = doc.nationality;
		$.txtPartnership.value = doc.partnership;
		$.txtCitizenPartner.value = doc.citizen;
		isNationalitySelected = true;
	}
	
	var alignment;

	if (Alloy.Globals.isEnglish) {
		alignment = Ti.UI.TEXT_ALIGNMENT_LEFT;
		
		$.lblOwnerNameAstrik.left = $.lblNationalityAstrik.left = $.lblPartnershipAstrik.left = $.lblCitizenPartnerAstrik.left = 5;
		$.lblOwnerNameAstrik.right = $.lblNationalityAstrik.right = $.lblPartnershipAstrik.right = $.lblCitizenPartnerAstrik.right = undefined;
		

	} else {
		alignment = Ti.UI.TEXT_ALIGNMENT_RIGHT;
		
		$.lblOwnerNameAstrik.right = $.lblNationalityAstrik.right = $.lblPartnershipAstrik.right = $.lblCitizenPartnerAstrik.right = 5;
		$.lblOwnerNameAstrik.left = $.lblNationalityAstrik.left = $.lblPartnershipAstrik.left = $.lblCitizenPartnerAstrik.left = undefined;

	}
	
	$.lblPartnersDetails.textAlign = $.lblOwnerName.textAlign = $.txtOwnerName.textAlign = $.lblNationality.textAlign = $.lblNationalityValue.textAlign = alignment;
	$.lblPartnership.textAlign = $.txtPartnership.textAlign = $.lblCitizenPartner.textAlign = $.txtCitizenPartner.textAlign = alignment;
	

}

changeLanguage();
$.winAddPartners.addEventListener("focus",function(e){
	$.viewBottomToolbar.setDefaultTheme($.winAddPartners);
});
$.viewBottomToolbar.setDefaultTheme($.winAddPartners);


/**
 * Adding the eventlistener for the bottom bar view
 *
 * @param {Object} e
 */
$.viewBottomToolbar.getView().addEventListener('click', function(e) {
	if (e.source.buttonId == 'btnFontChange') {
		$.viewBottomToolbar.changeFont($.winAddPartners);
	} else if (e.source.buttonId == 'btnSystemFeedback') {
		$.viewBottomToolbar.openFeedbackScreen(e);
	} else if(e.source.buttonId == 'btnSystemChangeTheme'){
		$.viewBottomToolbar.changeTheme($.winAddPartners);
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



