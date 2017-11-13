
var utilities = require("utilities");
var httpManager = require("httpManager");
var responseData = arguments[0] || {};
var args = responseData.data;
var preLang = null;
var serviceId = null;


function changeLanguage() {
	//$.viewNavigationTools.viewMenu.width = 0;
   // $.viewNavigationTools.viewMenu.height = 0;
	if (preLang == Alloy.Globals.language) {
		return;
	}
	preLang = Alloy.Globals.language;

	$.viewLeftPanel.setLanguage();
	$.viewHappinessIndicator.changeLanguage();
	$.viewNotification.changeLanguage();

	$.lblNavTitle.text = Alloy.Globals.selectedLanguage.services;
	if(serviceId)
	{
		if (serviceId == "none") {
            $.winServices.close();
		} else {
			httpManager.getServicesDetailsInfo(function(response) {
				if (response == null)
					return;
				args = response;
				showServicesDetails();
			}, responseData.siteName, serviceId);
		}

	}
	else{
	 showServicesDetails(); 
	}  
}


function getServiceDtails() {
	showServicesDetails();   
}



function winOpen(e) {  
	Alloy.Globals.arrWindows.push($.winServices);
	
	$.viewNavigationTools.getView().win = $.mainView;
	$.viewNavigationTools.setHappinessView($.viewHappinessIndicator.getView());
	$.viewNavigationTools.setNotificationView($.viewNotification.getView());
	
	$.viewLeftPanel.getView().changeLanguage = changeLanguage;
	//$.viewBottomMenu.getView().viewBack = $.backView;
	$.viewNavigationTools.getView().transparentView = $.viewTransparent;
}

function closeLeftPanel(){
	$.viewNavigationTools.onMenu();
}

function winFocus(e) {
	Alloy.Globals.bottomMenu = $.backView;
	$.viewBottomMenu.addInnerMenu();
	Alloy.Globals.currentWindow = e.source.id;
	changeLanguage();

	$.viewLeftPanel.setMenuDirectionView({
		direction : Alloy.Globals.SelectedMenuDirection,
		menuCallback : undefined
	});
	// Alloy.Globals.manageEservicesNotification();
}

function closeWindow() {
	if(args.isFromMenu){
		Alloy.Globals.gotoHome();
		return;	
	  }
	Alloy.Globals.arrWindows.pop($.winServices);
	$.winServices.close();
}


function openWebView() {
	if (Alloy.Globals.userInfo === false) {
		Alloy.Globals.openWindow(Alloy.createController("UserManagement/winLogin", {
			isFromLeftPanel : true
		}).getView());
	} else {
		httpManager.userValidation(function(response) {
			if (response == "Active") 
			{
				if (args.externalLink == "" || args.externalLink == null || args.externalLink == undefined)
				{
					utilities.showAlert(Alloy.Globals.selectedLanguage.appTitle, Alloy.Globals.selectedLanguage.comingSoon);
					return;
				}
				
				    var location = args.externalLink;
				if(location.indexOf("serviceId") > -1) {
				    Ti.API.info('####  test url');
				    var payLoad = {
				       //url :  Alloy.Globals.sitesUrl + args.externalLink + "&isNative=true&" +"acountId=" + Ti.App.Properties.getObject("LoginDetaisObj").accountID + "&token=" + Ti.App.Properties.getObject("LoginDetaisObj").tokenCode + "&typeOfUser=" + Ti.App.Properties.getObject("LoginDetaisObj").typeOfuser + "&status=" + Ti.App.Properties.getObject("LoginDetaisObj").status + "&username=" + Ti.App.Properties.getObject("LoginDetaisObj").userName
				       url :  Alloy.Globals.webserviceUrl + args.externalLink + "&isNative=true&" +"acountId=" + Ti.App.Properties.getObject("LoginDetaisObj").accountID + "&token=" + Ti.App.Properties.getObject("LoginDetaisObj").tokenCode + "&typeOfUser=" + Ti.App.Properties.getObject("LoginDetaisObj").typeOfuser + "&status=" + Ti.App.Properties.getObject("LoginDetaisObj").status + "&username=" + Ti.App.Properties.getObject("LoginDetaisObj").userName
				    };
				}else{
					Ti.API.info('###   not found test');
					 var payLoad = {
						//Pritam's local machine URL: add land request
						// url: "http://demoserver.tacme.net:15100" + "/en/addlandrequest.html?" +"acountId=" + Ti.App.Properties.getObject("LoginDetaisObj").accountID + "&token=" + Ti.App.Properties.getObject("LoginDetaisObj").tokenCode + "&typeOfUser=" + Ti.App.Properties.getObject("LoginDetaisObj").typeOfuser + "&status=" + Ti.App.Properties.getObject("LoginDetaisObj").status + "&username=" + Ti.App.Properties.getObject("LoginDetaisObj").userName
					  // url : "http://94.57.252.237/en/myrequest.html?isNative=true&"+"acountId=" + Ti.App.Properties.getObject("LoginDetaisObj").accountID + "&token=" + Ti.App.Properties.getObject("LoginDetaisObj").tokenCode + "&typeOfUser=" + Ti.App.Properties.getObject("LoginDetaisObj").typeOfuser + "&status=" + Ti.App.Properties.getObject("LoginDetaisObj").status + "&username=" + Ti.App.Properties.getObject("LoginDetaisObj").userName
					   // Live URL but hard coded checking issue site plan // issuesiteplandoc
					   // url :  Alloy.Globals.webserviceUrl + "/en/addlandrequest.html?" +"acountId=" + Ti.App.Properties.getObject("LoginDetaisObj").accountID + "&token=" + Ti.App.Properties.getObject("LoginDetaisObj").tokenCode + "&typeOfUser=" + Ti.App.Properties.getObject("LoginDetaisObj").typeOfuser + "&status=" + Ti.App.Properties.getObject("LoginDetaisObj").status + "&username=" + Ti.App.Properties.getObject("LoginDetaisObj").userName
					    //url : "http://94.57.252.237/en/showServicePhase.html?serviceId=401&isNative=true&acountId=" + Ti.App.Properties.getObject("LoginDetaisObj").accountID + "&token=" + Ti.App.Properties.getObject("LoginDetaisObj").tokenCode + "&typeOfUser=" + Ti.App.Properties.getObject("LoginDetaisObj").typeOfuser + "&status=" + Ti.App.Properties.getObject("LoginDetaisObj").status + "&username=" + Ti.App.Properties.getObject("LoginDetaisObj").userName,
					    // 100% Live URL
					    //url :  Alloy.Globals.sitesUrl + args.externalLink + "?isNative=true&" +"acountId=" + Ti.App.Properties.getObject("LoginDetaisObj").accountID + "&token=" + Ti.App.Properties.getObject("LoginDetaisObj").tokenCode + "&typeOfUser=" + Ti.App.Properties.getObject("LoginDetaisObj").typeOfuser + "&status=" + Ti.App.Properties.getObject("LoginDetaisObj").status + "&username=" + Ti.App.Properties.getObject("LoginDetaisObj").userName
					    url :  Alloy.Globals.webserviceUrl + args.externalLink + "?isNative=true&" +"acountId=" + Ti.App.Properties.getObject("LoginDetaisObj").accountID + "&token=" + Ti.App.Properties.getObject("LoginDetaisObj").tokenCode + "&typeOfUser=" + Ti.App.Properties.getObject("LoginDetaisObj").typeOfuser + "&status=" + Ti.App.Properties.getObject("LoginDetaisObj").status + "&username=" + Ti.App.Properties.getObject("LoginDetaisObj").userName
					    
					   };
				}
				
				/*if(args.id == 1437028526932 || args.id == 1441203849317 || args.id == 1441203916731 || args.id == 1444653743377 ){
					
					var payLoad = {
				    url :  Alloy.Globals.webserviceUrl + args.externalLink + "&isNative=true&" +"acountId=" + Ti.App.Properties.getObject("LoginDetaisObj").accountID + "&token=" + Ti.App.Properties.getObject("LoginDetaisObj").tokenCode + "&typeOfUser=" + Ti.App.Properties.getObject("LoginDetaisObj").typeOfuser + "&status=" + Ti.App.Properties.getObject("LoginDetaisObj").status + "&username=" + Ti.App.Properties.getObject("LoginDetaisObj").userName
				    };
				} else  {
				
				  var payLoad = {
					//Pritam's local machine URL: add land request
					// url: "http://demoserver.tacme.net:15100" + "/en/addlandrequest.html?" +"acountId=" + Ti.App.Properties.getObject("LoginDetaisObj").accountID + "&token=" + Ti.App.Properties.getObject("LoginDetaisObj").tokenCode + "&typeOfUser=" + Ti.App.Properties.getObject("LoginDetaisObj").typeOfuser + "&status=" + Ti.App.Properties.getObject("LoginDetaisObj").status + "&username=" + Ti.App.Properties.getObject("LoginDetaisObj").userName
				  // url : "http://94.57.252.237/en/myrequest.html?isNative=true&"+"acountId=" + Ti.App.Properties.getObject("LoginDetaisObj").accountID + "&token=" + Ti.App.Properties.getObject("LoginDetaisObj").tokenCode + "&typeOfUser=" + Ti.App.Properties.getObject("LoginDetaisObj").typeOfuser + "&status=" + Ti.App.Properties.getObject("LoginDetaisObj").status + "&username=" + Ti.App.Properties.getObject("LoginDetaisObj").userName
				   // Live URL but hard coded checking issue site plan // issuesiteplandoc
				   // url :  Alloy.Globals.webserviceUrl + "/en/addlandrequest.html?" +"acountId=" + Ti.App.Properties.getObject("LoginDetaisObj").accountID + "&token=" + Ti.App.Properties.getObject("LoginDetaisObj").tokenCode + "&typeOfUser=" + Ti.App.Properties.getObject("LoginDetaisObj").typeOfuser + "&status=" + Ti.App.Properties.getObject("LoginDetaisObj").status + "&username=" + Ti.App.Properties.getObject("LoginDetaisObj").userName
				    //url : "http://94.57.252.237/en/showServicePhase.html?serviceId=401&isNative=true&acountId=" + Ti.App.Properties.getObject("LoginDetaisObj").accountID + "&token=" + Ti.App.Properties.getObject("LoginDetaisObj").tokenCode + "&typeOfUser=" + Ti.App.Properties.getObject("LoginDetaisObj").typeOfuser + "&status=" + Ti.App.Properties.getObject("LoginDetaisObj").status + "&username=" + Ti.App.Properties.getObject("LoginDetaisObj").userName,
				    // 100% Live URL
				    url :  Alloy.Globals.webserviceUrl + args.externalLink + "?isNative=true&" +"acountId=" + Ti.App.Properties.getObject("LoginDetaisObj").accountID + "&token=" + Ti.App.Properties.getObject("LoginDetaisObj").tokenCode + "&typeOfUser=" + Ti.App.Properties.getObject("LoginDetaisObj").typeOfuser + "&status=" + Ti.App.Properties.getObject("LoginDetaisObj").status + "&username=" + Ti.App.Properties.getObject("LoginDetaisObj").userName
				   };
				}*/
				Ti.API.info(args.id+'URL FOR eSERVICE 2 OPEN::: '+ payLoad.url);
				Alloy.Globals.openWindow(Alloy.createController("Services/servicesWebView", payLoad).getView());
			}
			else 
			{
				Alloy.Globals.openWindow(Alloy.createController("UserManagement/winLogin", {
					isFromLeftPanel : true
				}).getView());
			}
		});
	}
}


function loadServices() {
	var arrSection = [];
	var length;
	var feesResponse;
	if (args.serviceFees) {
		if (Object.prototype.toString.call(args.serviceFees) == "[object Array]") {
			feesResponse = args.serviceFees;
		} else {
			feesResponse = [args.serviceFees];
		}
		length = feesResponse.length;
	} 
	else {
		length = 0;
		$.serviceFeesView.height = 0;
	}
	
	for (var j = 0; j < length; j++) {
		var feesData = feesResponse[j];
        var feesValues = feesData.split('|');
     
		
		var lstSection = Ti.UI.createListSection();
		var headerView = Ti.UI.createView({
			height : Titanium.UI.SIZE,
			width : "100%",
			backgroundColor : "white",
			isExpanded : false,
			layout : "vertical",
			lIndex : j,
		});
		
		var bodyView = Ti.UI.createView({
		    height : Titanium.UI.SIZE,
			width : "100%",
			backgroundColor : "white",
			isExpanded : false,
		});
		
		var spaceView = Ti.UI.createView({
			height : 10,
			width : "100%",
			backgroundColor : "white",
			bottom : 0
		
		});

		var descriptionLabel = Ti.UI.createLabel({
			left : "2%",
		    width : "30%",
			height : Titanium.UI.SIZE,
			font : Alloy.Globals.path.font14,
			text : feesValues[0],
			textAlign : (Alloy.Globals.isEnglish) ? Titanium.UI.TEXT_ALIGNMENT_LEFT : Titanium.UI.TEXT_ALIGNMENT_RIGHT,
			top :3,
			color : "black"
		});
		
		var paymentLabel = Ti.UI.createLabel({
			left : "34%",
			width : "39%",
			height : Titanium.UI.SIZE,
			font : Alloy.Globals.path.font14,
			text : feesValues[1],
			textAlign : (Alloy.Globals.isEnglish) ? Titanium.UI.TEXT_ALIGNMENT_LEFT : Titanium.UI.TEXT_ALIGNMENT_RIGHT,
			top :3,
			color : "black"
		});

		var amountLabel = Ti.UI.createLabel({
			// left : "66%",
			left:"75%",
			right:1,
			// width: "30%",
			// width:"26%",
			height : Titanium.UI.SIZE,
			font : Alloy.Globals.path.font14,
		    text : feesValues[2],
			textAlign : (Alloy.Globals.isEnglish) ? Titanium.UI.TEXT_ALIGNMENT_LEFT : Titanium.UI.TEXT_ALIGNMENT_RIGHT,
			top :3,
			color : "black"
		});

		bodyView.add(descriptionLabel);
		bodyView.add(paymentLabel);
		bodyView.add(amountLabel);
		headerView.add(bodyView);
		headerView.add(spaceView);
		
		lstSection.headerView = headerView;
		arrSection.push(lstSection);
	}
	
	$.listviewFees.sections = arrSection;
}


function showServicesDetails() {
	 if(args.translatedAssetId == "")
	 {
		 serviceId = "none";
	 }
	 else
	 {
		serviceId = args.translatedAssetId;
	 }
	if (Alloy.Globals.isEnglish) {
		
		alignment = Titanium.UI.TEXT_ALIGNMENT_LEFT;
		
		$.emailImage.left = 10;
		$.emailLabel.left = 35;
		$.emailImage.right = undefined;
		$.emailLabel.right = undefined;
	
		$.faxImage.left = 10;
		$.faxLabel.left = 35;
		$.faxImage.right = undefined;
		$.faxLabel.right = undefined;
	
		
		$.calImage.left = 10;
		$.calLabel.left = 35;
		$.calImage.right = undefined;
		$.calLabel.right = undefined;
				
	} else {

		alignment = Titanium.UI.TEXT_ALIGNMENT_RIGHT;
		
		$.emailImage.right = 10;
		$.emailLabel.right = 35;
		$.emailImage.left = undefined;
		$.emailLabel.left = undefined;
	
		
		$.faxImage.right = 10;
		$.faxLabel.right = 35;
		$.faxImage.left = undefined;
		$.faxLabel.left = undefined;
		
		
		$.calImage.right = 10;
		$.calLabel.right = 35;
		$.calImage.left = undefined;
		$.calLabel.left = undefined;
	
	}
	loadServices();

	    $.desTitleLabel.textAlign = alignment;
		$.descriptionData.textAlign = alignment;
		$.timeTitleLabel.textAlign = alignment;
		$.timeLable.textAlign = alignment;
		$.benTitleLabel.textAlign = alignment;
		$.beneficiaryData.textAlign = alignment;
		
		$.docTitleLabel.textAlign = alignment;
		$.documentsData.textAlign = alignment;
		
		$.proTitleLabel.textAlign = alignment;
		$.proceduresData.textAlign = alignment;
		
		$.serviceTitleLabel.textAlign = alignment;
		
		$.serviceRequestLabel.textAlign = alignment;
		
		$.contactsCustomerLabel.textAlign = alignment;
		$.emailLabel.textAlign = alignment;
		$.faxLabel.textAlign = alignment;
		$.calLabel.textAlign = alignment;
	
	
	$.headerLabel.text = args.title;
	$.desTitleLabel.text = Alloy.Globals.selectedLanguage.description;
	$.descriptionData.value = utilities.cleanHtml(args.description);
	$.descriptionData.height = Ti.UI.SIZE;
	
	$.timeTitleLabel.text = Alloy.Globals.selectedLanguage.submitTime;
	$.timeLable.text = args.timings;

	$.benTitleLabel.text = Alloy.Globals.selectedLanguage.serviceBeneficiary;
	$.beneficiaryData.value = utilities.cleanHtml(args.benificiary);
	$.beneficiaryData.height = Ti.UI.SIZE;

	$.docTitleLabel.text = Alloy.Globals.selectedLanguage.requiredDocuments;
	$.documentsData.value = utilities.cleanHtml(args.requiredDocuments);
	$.documentsData.height = Ti.UI.SIZE;

	$.proTitleLabel.text = Alloy.Globals.selectedLanguage.procedures;
	$.proceduresData.value =utilities.cleanHtml(args.procedures);
	$.proceduresData.height = Ti.UI.SIZE;

	$.serviceTitleLabel.text = Alloy.Globals.selectedLanguage.servicesFees;
	$.startServicesButton.title = Alloy.Globals.selectedLanguage.startService;

	$.emailLabel.text = args.emailID;
	$.faxLabel.text = args.fax;
	$.calLabel.text = args.telephoneNumber;
	
	$.contactsCustomerLabel.text = Alloy.Globals.selectedLanguage.contactsCustomerService;
    $.serviceRequestLabel.text =  Alloy.Globals.selectedLanguage.serviceRequestForm;
    
    $.desTitle.textAlign = alignment;
    $.paymentTitle.textAlign = alignment;
    $.amountTitle.textAlign = alignment;
    
    $.desTitle.text = Alloy.Globals.selectedLanguage.serviceDescription;
    $.paymentTitle.text = Alloy.Globals.selectedLanguage.servicePayment;
    $.amountTitle.text = Alloy.Globals.selectedLanguage.serviceAmount;
    
    //Check service neeed to display or not...
    if(args.serviceEnabled == "False")
    {
    	$.startServicesButton.height = 0;
    }
    
    if($.emailLabel.text == " ")
    {
    	$.emailView.height = 0;
    }
    if($.faxLabel.text == " ")
    {
    	$.faxView.height = 0;
    }
    
    if($.calLabel.text == " ")
    {
    	$.calView.height = 0;
    }
    
     if(($.calLabel.text == "") && ($.faxLabel.text == "") && ($.emailLabel.text == ""))
     {
        $.contactsView.height =0;
     } 
     
     if($.descriptionData.value == "")
     {
     	$.descriptionView.height = 0;
     }
     
     if($.timeLable.text == "")
     {
     	$.timeView.height = 0;
     }
     
     if($.beneficiaryData.value == "")
     {
     	$.beneficiaryView.height = 0;
     }
     
      if($.documentsData.value == "")
     {
     	$.documentsView.height = 0;
     }
     
      if($.proceduresData.value == "")
     {
     	$.proceduresView.height = 0;
     }
	$.scrollView.animate({opacity:1, duration:1000});
}









