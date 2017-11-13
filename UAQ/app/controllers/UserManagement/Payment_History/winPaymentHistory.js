var utilities = require("utilities");
var httpManager = require("httpManager");
var args = arguments[0] || {};
var preLang = null;
var a = Ti.UI.createAlertDialog({
	title : Alloy.Globals.selectedLanguage.appTitle,
	message : Alloy.Globals.selectedLanguage.noRecordsFound,
	buttonNames : [Alloy.Globals.selectedLanguage.ok]
});
a.addEventListener('click', function(eA) {
	if (eA.index == 0){
		closeWindow();
	}
});
function changeLanguage() {
	if (preLang == Alloy.Globals.language) {
		return;
	}
	preLang = Alloy.Globals.language;
	$.viewLeftPanel.setLanguage();
	$.viewHappinessIndicator.changeLanguage();
	$.viewNotification.changeLanguage();
	$.lblNavTitle.text = Alloy.Globals.selectedLanguage.viewMyPayment;
	/*if (Alloy.Globals.isEnglish) {
		alignment = Titanium.UI.TEXT_ALIGNMENT_LEFT;
	} else {
		alignment = Titanium.UI.TEXT_ALIGNMENT_RIGHT;
	}*/
	$.listViewPaymentHistory.removeData();
	$.listViewPaymentHistory.listviewServices.sections = [];
	getResponseData();
}


function getResponseData() {
	httpManager.getPaymentHistory(function(response){
		Ti.API.info('Payment History Response in callback::: '+response.length);
		if (response.length>0){
			$.listViewPaymentHistory.loadServices(response);
		}
		else{
			a.show();
		}
	});
}


function winOpen(e) {  
	Alloy.Globals.arrWindows.push($.winPaymentHistory);
	
	$.viewNavigationTools.getView().win = $.mainView;
	$.viewNavigationTools.setHappinessView($.viewHappinessIndicator.getView());
	$.viewNavigationTools.setNotificationView($.viewNotification.getView());
	
	$.viewLeftPanel.getView().changeLanguage = changeLanguage;
	$.viewNavigationTools.getView().transparentView = $.viewTransparent;
	changeLanguage();
}


function closeLeftPanel(){
	$.viewNavigationTools.onMenu();
}

function winFocus(e) {
	// Alloy.Globals.manageEservicesNotification();
	Alloy.Globals.bottomMenu = $.backView;
	$.viewBottomMenu.addInnerMenu();
	Alloy.Globals.currentWindow = e.source.id;
	
	$.viewLeftPanel.setMenuDirectionView({
		direction : Alloy.Globals.SelectedMenuDirection,
		menuCallback : undefined
	});
	if (preLang == Alloy.Globals.language) {
		return;
	}else{
		changeLanguage();	
	}
}

function closeWindow() {
	// if(args.isFromMenu){
		// Alloy.Globals.gotoHome();
		// return;
	  // }
	Alloy.Globals.arrWindows.pop($.winPaymentHistory);
	$.winPaymentHistory.close();
}
