var utilities = require("utilities");

var args = arguments[0] || {};
Ti.API.info('+++++++++View my services myRequestDetails'+ JSON.stringify(args));
var preLang = null;

var a = Ti.UI.createAlertDialog({
	title : Alloy.Globals.selectedLanguage.appTitle,
	message : Alloy.Globals.selectedLanguage.error_loading_eService_page,
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
		
	$.lblNavTitle.text = Alloy.Globals.selectedLanguage.myservices;
	
	$.headerLabel.text = Alloy.Globals.selectedLanguage.myservices;
	
					
	if(Alloy.Globals.isEnglish){

		
		alignment = Titanium.UI.TEXT_ALIGNMENT_LEFT;
	} else {

		
		alignment = Titanium.UI.TEXT_ALIGNMENT_RIGHT;
	}
	//$.noRecordsFound.hide();
	//$.noRecordsFound.text = Alloy.Globals.selectedLanguage.noRecordsFound;
	myRequestDetails(args);
	/*if (Alloy.Globals.currentWindow == "winMyServices") {
		httpManager.getMyRequestService(function(response) {
			if(response == null)
				return;
			var data = {"response":response, "idToExpand":"", "isNoRecord":response};	
			myRequestDetails(data);
	    });
	}*/
	 
   
}

function myRequestDetails(args) {
	//noRecordsFound
	Ti.API.info('url loaded for my Requet '+ args.idToExpand);
	var langCode = (Alloy.Globals.isEnglish)? "/en": "/ar";
	if(args.idToExpand != ""){
	  //$.webViewMyservice.url = Alloy.Globals.sitesUrl+langCode +"/myrequest.html?isNative=true&"+"acountId=" + Ti.App.Properties.getObject("LoginDetaisObj").accountID + "&token=" + Ti.App.Properties.getObject("LoginDetaisObj").tokenCode + "&typeOfUser=" + Ti.App.Properties.getObject("LoginDetaisObj").typeOfuser + "&status=" + Ti.App.Properties.getObject("LoginDetaisObj").status + "&username=" + Ti.App.Properties.getObject("LoginDetaisObj").userName+"&requestNo="+args.idToExpand;
	  $.webViewMyservice.url = Alloy.Globals.webserviceUrl+langCode +"/myrequest.html?isNative=true&"+"acountId=" + Ti.App.Properties.getObject("LoginDetaisObj").accountID + "&token=" + Ti.App.Properties.getObject("LoginDetaisObj").tokenCode + "&typeOfUser=" + Ti.App.Properties.getObject("LoginDetaisObj").typeOfuser + "&status=" + Ti.App.Properties.getObject("LoginDetaisObj").status + "&username=" + Ti.App.Properties.getObject("LoginDetaisObj").userName+"&requestNo="+args.idToExpand;
    }else {
    	//$.webViewMyservice.url = Alloy.Globals.sitesUrl+langCode +"/myrequest.html?isNative=true&"+"acountId=" + Ti.App.Properties.getObject("LoginDetaisObj").accountID + "&token=" + Ti.App.Properties.getObject("LoginDetaisObj").tokenCode + "&typeOfUser=" + Ti.App.Properties.getObject("LoginDetaisObj").typeOfuser + "&status=" + Ti.App.Properties.getObject("LoginDetaisObj").status + "&username=" + Ti.App.Properties.getObject("LoginDetaisObj").userName;
    	$.webViewMyservice.url = Alloy.Globals.webserviceUrl+langCode +"/myrequest.html?isNative=true&"+"acountId=" + Ti.App.Properties.getObject("LoginDetaisObj").accountID + "&token=" + Ti.App.Properties.getObject("LoginDetaisObj").tokenCode + "&typeOfUser=" + Ti.App.Properties.getObject("LoginDetaisObj").typeOfuser + "&status=" + Ti.App.Properties.getObject("LoginDetaisObj").status + "&username=" + Ti.App.Properties.getObject("LoginDetaisObj").userName;
    }
	
	
	//Ti.API.info('url myreq' + Alloy.Globals.webserviceUrl+langCode +"/myrequest.html?isNative=true&"+"acountId=" + Ti.App.Properties.getObject("LoginDetaisObj").accountID + "&token=" + Ti.App.Properties.getObject("LoginDetaisObj").tokenCode + "&typeOfUser=" + Ti.App.Properties.getObject("LoginDetaisObj").typeOfuser + "&status=" + Ti.App.Properties.getObject("LoginDetaisObj").status + "&username=" + Ti.App.Properties.getObject("LoginDetaisObj").userName)	;
	// if(args.isNoRecord == 1){
		//$.noRecordsFound.show();
	// }else{
	    // $.winMyserviceList.loadServices(args.response, args.idToExpand);
	   // $.winMyserviceList.scrollToPosition();
	// }		
}


$.webViewMyservice.addEventListener('beforeload', function(e) {
	Ti.API.info(' URL before load: ' + e.url);
	var url = e.url;
	
	if (url.indexOf("proceedpayment.html?") != "-1" || url.indexOf("proceedpayment.html?") != -1) {
		Alloy.Globals.hideLoading();
		$.webViewMyservice.stopLoading();
		
		url = url + "&acountId=" + Ti.App.Properties.getObject("LoginDetaisObj").accountID +
				    "&token=" + Ti.App.Properties.getObject("LoginDetaisObj").tokenCode +
				    "&typeOfUser=" + Ti.App.Properties.getObject("LoginDetaisObj").typeOfuser +
				    "&status=" + Ti.App.Properties.getObject("LoginDetaisObj").status +
				    "&username=" + Ti.App.Properties.getObject("LoginDetaisObj").userName;
		
		Ti.API.info('FULL(APPDENDED) URL FOR PAYMENT: '+url); 
		Ti.Platform.openURL(url);
		// Alloy.Globals.hideLoading();
		closeWindow();
	}  //myrequest.html
	
	if ((url.indexOf(".html?") != "-1" || url.indexOf(".html?") != -1) && (url.indexOf("myrequest.html?") == "-1" || url.indexOf("myrequest.html?") == -1)) {
	    Alloy.Globals.hideLoading();
	    payLoad = {
							url : url + "&acountId=" + Ti.App.Properties.getObject("LoginDetaisObj").accountID +
				    "&token=" + Ti.App.Properties.getObject("LoginDetaisObj").tokenCode +
				    "&typeOfUser=" + Ti.App.Properties.getObject("LoginDetaisObj").typeOfuser +
				    "&status=" + Ti.App.Properties.getObject("LoginDetaisObj").status +
				    "&username=" + Ti.App.Properties.getObject("LoginDetaisObj").userName,
							statusId : "",
				   };
	    Alloy.Globals.openWindow(Alloy.createController("Services/MyServices/myServicesWebView", payLoad).getView());
	    closeWindow();
	}
	
	
});

$.webViewMyservice.addEventListener('load', function(e) {
	Alloy.Globals.hideLoading();
	//a.show();
});
$.webViewMyservice.addEventListener('error', function(e) {
	Alloy.Globals.hideLoading();
	a.show();
});
if (OS_ANDROID){
	$.webViewMyservice.addEventListener('sslerror', function(e) {
		Ti.API.info('SSL ERROR OCCUR:: '+JSON.stringify(e));
	});	
}


function closeLeftPanel(){
	$.viewNavigationTools.onMenu();
}
function winOpen(e){
	
	Alloy.Globals.arrWindows.push($.winMyServices);
	Alloy.Globals.currentWindow = e.source.id;
	$.viewNavigationTools.getView().win = $.mainView;
	$.viewNavigationTools.setHappinessView($.viewHappinessIndicator.getView());
	$.viewNavigationTools.setNotificationView($.viewNotification.getView());
	//$.viewBottomMenu.getView().viewBack = $.backView;
	$.viewLeftPanel.getView().changeLanguage = changeLanguage;
	$.viewNavigationTools.getView().transparentView = $.viewTransparent;
	setTimeout(function(){
		Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading);
	},500);
	//.viewLeftPanel.getView().closeLeftPanel = $.viewNavigationTools.onMenu();
} 

function winFocus(e){
	Ti.API.info('FOCUS ****  FOCUS **** FOCUS **** FOCUS **** FOCUS ****my service win got fouc');
	if(Alloy.Globals.currentWindow == "myServiceWebview"){
		//httpManager.getMyRequestService(function(response) {
			//if(response == null)
				//return;
				
			//var data = {"response":response, "idToExpand":"", "isNoRecord":response};	
	     	//$.winMyserviceList.loadServices(response, "");
	   // });
	}
	
	Alloy.Globals.bottomMenu = $.backView;
	changeLanguage();
	$.viewBottomMenu.addInnerMenu();
	$.viewLeftPanel.setMenuDirectionView({
		direction : Alloy.Globals.SelectedMenuDirection,
		menuCallback : undefined
	});
}

function closeWindow(){
	Alloy.Globals.arrWindows.pop($.winMyServices);
	$.winMyServices.close();
}
changeLanguage();