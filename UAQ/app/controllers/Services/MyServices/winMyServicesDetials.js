var utilities = require("utilities");

var args = arguments[0] || {};

var preLang = null;
function changeLanguage() {
	if (preLang == Alloy.Globals.language) {
		return;
	}
	preLang = Alloy.Globals.language;
		
	//$.lblNavTitle.text = Alloy.Globals.selectedLanguage.registration;
	$.headerLabel.text ="test";
	$.lblSplitRequestNumber.text ="Dearibtion";	 $.lblRequestNumber.text ="label descriobtion";
	//$.lblSplitServiceName.text ="Dearibtion";
	/*$.lblSplitCreatedDate.text ="Dearibtion";
	$.lblSplitModifiedDate.text ="Dearibtion";
	$.lblSplitStatus.text ="Dearibtion";
	$.lblSplitAction.text ="Dearibtion";
	
	
	$.lblRequestNumber.text ="label descriobtion";
	$.lblServiceName.text ="label descriobtion";
	$.lblCreatedDate.text ="label descriobtion";
	$.lblModifiedDate.text ="label descriobtion";
	$.lblStatus.text ="label descriobtion";
	$.lblAction.text ="label descriobtion";*/
	
					
	if(Alloy.Globals.isEnglish){

		
		alignment = Titanium.UI.TEXT_ALIGNMENT_LEFT;
	} else {

		
		alignment = Titanium.UI.TEXT_ALIGNMENT_RIGHT;
	}

}
function closeLeftPanel(){
	$.viewNavigationTools.onMenu();
}
function winOpen(){
	Alloy.Globals.arrWindows.push($.winMyServicesDetials);
	$.viewNavigationTools.getView().win = $.mainView;
	$.viewNavigationTools.setHappinessView($.viewHappinessIndicator.getView());
	$.viewNavigationTools.setNotificationView($.viewNotification.getView());
	$.viewLeftPanel.getView().changeLanguage = changeLanguage;
	$.viewNavigationTools.getView().transparentView = $.viewTransparent;
}

function winFocus(e){
	Alloy.Globals.currentWindow = e.source.id;
	Alloy.Globals.bottomMenu = $.backView;
	changeLanguage();
	$.viewBottomMenu.addInnerMenu();
	$.viewLeftPanel.setMenuDirectionView({
		direction : Alloy.Globals.SelectedMenuDirection,
		menuCallback : undefined
	});
}

function closeWindow(){
	Alloy.Globals.arrWindows.pop($.winMyServicesDetials);
	$.winMyServicesDetials.close();
}
changeLanguage();