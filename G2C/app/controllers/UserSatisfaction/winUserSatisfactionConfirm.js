var httpManager = require("httpManager");//Alloy.createController('common/httpManager');

var isEnglish = (Alloy.Globals.isVATTAXModuleActive) ? Alloy.Globals.VATTAXisEnglish : Alloy.Globals.isEnglish;
var selectedLanguage = (Alloy.Globals.isVATTAXModuleActive) ? Alloy.Globals.VTaxSelectedLanguage :  Alloy.Globals.selectedLanguage;

var args = arguments[0];

$.lblThankYou.text = selectedLanguage.thankYouUserSatisfaction;
$.lblDone.text = selectedLanguage.doneTitle;

if(args){
	$.lblThankYou.text = selectedLanguage.thankYouUserSatisfaction;
	$.lblNavTitle.text = selectedLanguage.userSatisfaction;
}else{
	$.lblThankYou.text = selectedLanguage.thankYouAddUser;
	$.lblNavTitle.text = selectedLanguage.addNewUser;
}


if (Alloy.Globals.isIOS7Plus) {
	//$.winPurchaseOrder.extendEdges = [Ti.UI.EXTEND_EDGE_TOP];
	$.statusBar.height = 20;
}

function closeWindow() {
	args.callBack();
	Alloy.Globals.closeWindow($.winUserSatisfactionConfirm);
	//$.winISupplierHome.close();
}

Alloy.Globals.setDefaultTheme($.winUserSatisfactionConfirm);

function changeLanguage() {

}

changeLanguage();
