var utilities = require("utilities");
var httpManager = require("httpManager");
var args = arguments[0] || {};

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
	// put the code into comment - start
	// $.viewLeftPanel.setLanguage();
	// $.viewHappinessIndicator.changeLanguage();
	// $.viewNotification.changeLanguage();
	// put the code into comment - end
	$.lblNavTitle.text = Alloy.Globals.selectedLanguage.myservices;

	if (Alloy.Globals.isEnglish) {

		alignment = Titanium.UI.TEXT_ALIGNMENT_LEFT;
	} else {

		alignment = Titanium.UI.TEXT_ALIGNMENT_RIGHT;
	}
	//$.webView.url = "http://demoserver.tacme.net:3030/MOFDIGI/Portal/new-waiste-container-mobile.html";
	//$.webViewMyservice.url ="http://demoserver.tacme.net:15100/en/proceedpayment.html?serviceId=304&requestNo=PS-304-15-38486&statusId=33&acountId=17056&token=41132&typeOfUser=1&status=Active&username=31373632383733333732353630373833";
	Ti.API.info('url webview my service +++'+args.url);
	$.webViewMyservice.url = args.url;
	//var pdfLink = "http://www.adobe.com/devnet/acrobat/pdfs/pdf_open_parameters.pdf";
    //$.webViewMyservice.url = "http://docs.google.com/gview?embedded=true&url=" + pdfLink;
    //$.webViewMyservice.url ="http://www.adobe.com/devnet/acrobat/pdfs/pdf_open_parameters.pdf&mobiledocview=true";
	//$.webViewMyservice.url = "gview/?url=http://83.111.136.7/cs/groups/public/documents/supportivedocument/dwfx/mdmy/~edisp/u01vuwcp01.uaq032318.pdf";
}

function winOpen(e) {
	Alloy.Globals.arrWindows.push($.servicesWebView);
	// put the code into comment - start
	// $.viewNavigationTools.getView().win = $.mainView;
	// $.viewNavigationTools.setHappinessView($.viewHappinessIndicator.getView());
	// $.viewNavigationTools.setNotificationView($.viewNotification.getView());

	// $.viewLeftPanel.getView().changeLanguage = changeLanguage;
	// $.viewBottomMenu.getView().viewBack = $.backView;

	// $.viewNavigationTools.getView().transparentView = $.viewTransparent;
	// put the code into comment - end
}

function closeLeftPanel() {
	// put the code into comment - start
	// $.viewNavigationTools.onMenu();
}

function winFocus(e) {
	// put the code into comment - start
	// $.viewBottomMenu.addInnerMenu();
	Alloy.Globals.currentWindow = e.source.id;
	changeLanguage();
	
}

function closeWindow() {
	if (args.isFromMenu) {
		Alloy.Globals.gotoHome();
		return;
	}
	Ti.API.info('curretn window close'+ Alloy.Globals.arrWindows.length);
	Alloy.Globals.arrWindows.pop($.servicesWebView);
	Alloy.Globals.currentWindow = "myServiceWebview";
	//$.winMyServices.close();
	$.servicesWebView.close();
}


function fileformathcheck(stringPass){
   
   if(stringPass.indexOf(".pdf") != "-1" || stringPass.indexOf(".pdf") != -1)
   		return true;
   else if(stringPass.indexOf(".docx") != "-1" || stringPass.indexOf(".docx") != -1)
   		return true;
   else if(stringPass.indexOf(".doc") != "-1" || stringPass.indexOf(".doc") != -1)
   		return true;
   else if(stringPass.indexOf(".rtf") != "-1" || stringPass.indexOf(".rtf") != -1)
   		return true;
   else if(stringPass.indexOf(".txt") != "-1" || stringPass.indexOf(".txt") != -1)
   		return true;
   else if(stringPass.indexOf(".zip") != "-1" || stringPass.indexOf(".zip") != -1)
   		return true;
   else if(stringPass.indexOf(".rar") != "-1" || stringPass.indexOf(".rar") != -1)
   		return true;
   else
		return false;
}

function imageURlcheck(stringPass){
	if(stringPass.indexOf(".png") != "-1" || stringPass.indexOf(".png") != -1)
   		return true;
   else if(stringPass.indexOf(".jpg") != "-1" || stringPass.indexOf(".jpg") != -1)
   		return true;
   else if(stringPass.indexOf(".jpeg") != "-1" || stringPass.indexOf(".jpeg") != -1)
   		return true;
   else if(stringPass.indexOf(".gif") != "-1" || stringPass.indexOf(".gif") != -1)
   		return true;
   else if(stringPass.indexOf(".tif") != "-1" || stringPass.indexOf(".tif") != -1)
   		return true;
   else if(stringPass.indexOf(".raw") != "-1" || stringPass.indexOf(".raw") != -1)
   		return true;
   else if(stringPass.indexOf(".bmp") != "-1" || stringPass.indexOf(".bmp") != -1)
   		return true;
   else
   		return false;
}

$.webViewMyservice.addEventListener('beforeload', function(e) {
	
	//Ti.API.info(args.statusId+'curretn url inwebview'+ JSON.stringify(e));
	Ti.API.info(' URL  loading: ' + e.url);
	
	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading);
	
	var url = e.url;
	
	var returnMatch = fileformathcheck(url);
	
	var  returnImage =  imageURlcheck(url);
	
	if (returnMatch == true) {  // .docx , .doc , .rtf, .txt
		     
		    $.webViewMyservice.stopLoading();
			Alloy.Globals.hideLoading();
			Alloy.Globals.myService = "myserviceWeb";
						
			var subUrl = url.split("&mobiledocview=true");
			Ti.API.info('SUBURL : ' + JSON.stringify(subUrl[0]));
			
			setTimeout(function(){
				Ti.Platform.openURL("http://drive.google.com/viewerng/viewer?embedded=true&url="+subUrl[0]);	
				return;	
			},250);
			
			//closeWindow();
			
	}
	if(returnImage == true){
		    e.bubble = false;
		    $.webViewMyservice.stopLoading();
			Alloy.Globals.hideLoading();
			Alloy.Globals.myService = "myserviceWeb";
					
			setTimeout(function(){
				Ti.Platform.openURL(url);
				return;	
			},250);
			// Ti.API.info('Current window: '+Alloy.Globals.currentWindow);
			
	}
	
	if(args.statusId == '18' || args.statusId == '33')
	{
		// $.webViewMyservice.loading = true;
		Ti.API.info(' URL before load: ' + e.url);
		var url = e.url;
		Ti.API.info('INDEX OF : proceedpayment.html ::: ' + url.indexOf("proceedpayment.html?"));
	
		if (url.indexOf("proceedpayment.html?") != "-1" || url.indexOf("proceedpayment.html?") != -1) {
			$.webViewMyservice.stopLoading();
			Alloy.Globals.hideLoading();
			Alloy.Globals.myService = "myserviceWeb";
			Ti.Platform.openURL(url);
			closeWindow();
			Alloy.Globals.arrWindows[Alloy.Globals.arrWindows.length - 1].close({
				animated : true
			});
		}
	} //loginstatus=Failure
});

Ti.App.addEventListener('cancelEvent', function(e) {
	closeWindow();
});


$.webViewMyservice.addEventListener('load', function(e) {
	Ti.API.info('---------load finished--------');
	Alloy.Globals.hideLoading();
	var url = e.url;
	var  returnImage =  imageURlcheck(url);
	 Ti.API.info('imageview stoped loading=====LOAD2');
	if(returnImage == true){
		   if ($.webViewMyservice.canGoBack() && Ti.Platform.osname != 'android'){
			Ti.API.debug('force first URL.');
			$.webViewMyservice.goBack( );
		}
	}
});
$.webViewMyservice.addEventListener('error', function(e) {
	Ti.API.info('---------load error finished--------');
	Alloy.Globals.hideLoading();
	a.show();
	//closeWindow();
});
if (OS_ANDROID){
	$.webViewMyservice.addEventListener('sslerror', function(e) {
		Ti.API.info('SSL ERROR OCCUR:: '+JSON.stringify(e));
	});	
}

