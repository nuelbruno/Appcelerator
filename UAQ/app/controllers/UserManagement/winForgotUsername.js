// Initialize the startup things: hint text, visible false, opacity0 etc....
$.userLicenseUserView.height = 0;
$.txtfieldLicense.hintText = Alloy.Globals.selectedLanguage.license;
$.txtfieldMail.hintText = Alloy.Globals.selectedLanguage.mail_forgotUsername;
$.txtfieldEmirateId.hintText = Alloy.Globals.selectedLanguage.emiratesid;
$.txtfieldMobile.hintText = Alloy.Globals.selectedLanguage.mobile;
$.txtfieldPassport.hintText = Alloy.Globals.selectedLanguage.passport;
$.labelUserMandatory.text = Alloy.Globals.selectedLanguage.or;
$.imgIndividual.image = Alloy.Globals.path.radioActive;
$.imgEstablishment.image = Alloy.Globals.path.radioInactive;
var utilities = require("utilities");
var httpManager = require("httpManager");
//Add DONE button toolbar in Keyboard
function addUserKeyBoard(){
	var flexSpace = Titanium.UI.createButton({systemButton : Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE});
	var btnDone = Titanium.UI.createButton({    
	    title : 'Done',width : 67,height : 32
	});
	btnDone.addEventListener('click',function(e){
	    $.txtfieldMobile.blur();
	});
	$.txtfieldMobile.keyboardToolbar = [flexSpace, flexSpace,flexSpace, btnDone];
}
//Add DONE button toolbar in Keyboard
function addUserEmirateKeyBoard(){
	var flexSpace = Titanium.UI.createButton({systemButton : Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE});
	var btnDone = Titanium.UI.createButton({    
	    title : 'Done',width : 67,height : 32
	});
	btnDone.addEventListener('click',function(e){
	    $.txtfieldEmirateId.blur();
	});
	$.txtfieldEmirateId.keyboardToolbar = [flexSpace, flexSpace,flexSpace, btnDone];
}
/////manage toggle Individual/Establishment
function hideuserLicense(){
	$.labelUserMandatory.visible = true;
	$.imgIndividual.image = Alloy.Globals.path.radioActive;
	$.imgEstablishment.image = Alloy.Globals.path.radioInactive;
	$.txtfieldEmirateId.value = $.txtfieldPassport.value = $.txtfieldMail.value = $.txtfieldMobile.value = "";
	$.userLicenseUserView.height = 0;
	$.userEmiratesView.height = 45;
	$.userPassportView.height = 45;
	$.userEmailView.top = 13;
	$.userEmailView.bottom = 0;
}
/////manage toggle Individual/Establishment
function hideuserEmirate(){
	$.labelUserMandatory.visible = false;
	$.imgIndividual.image = Alloy.Globals.path.radioInactive;
	$.imgEstablishment.image = Alloy.Globals.path.radioActive;
	$.txtfieldLicense.value = $.txtfieldMail.value = $.txtfieldMobile.value = "";
	$.userLicenseUserView.height = 70;
	$.userEmiratesView.height = 0;
	$.userPassportView.height = 0;
}
//Check email is valid or not?
function validateEmail(){
	var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    var result = re.test($.txtfieldMail.value);
    if(result == 0){
    	$.txtfieldMail.value = "";
    	utilities.showAlert(Alloy.Globals.selectedLanguage.forgotUsername,Alloy.Globals.selectedLanguage.invalidmail,function(){});
    }
}
// cancel : close window....
function cancelForgotUsername(){
	closeWindow();
}
// window OPEN function
function winOpen(e){
	if(OS_IOS){
	  addUserKeyBoard();
	  addUserEmirateKeyBoard();
	}
	Alloy.Globals.currentWindow = e.source.id;
	Alloy.Globals.arrWindows.push($.winForgotUsername);
}
///Window close function...
function closeWindow() {
	Alloy.Globals.arrWindows.pop($.winForgotUsername);
	$.winForgotUsername.close();
}
//Android Back event
$.winForgotUsername.addEventListener('android:back', function(e) {
	closeWindow();
});
//Focus event
function focusEvent_txtfieldEmirateId(e){
	$.txtfieldEmirateId.value = e.source.value.replace(/[-]/gi, "");
	$.txtfieldEmirateId.maxLength = 15;
};
//blur event
function blurEvent_txtfieldEmirateId(e){
	$.txtfieldEmirateId.maxLength = 18;
	var f_val = e.source.value.replace(/[^0-9+]/g, "");
	f_val = f_val.replace(/[_-]/g, " ");
	e.source.value = (f_val.length == 1 || f_val.length == 0) ? f_val : f_val.slice(0, 3) + "-" + f_val.slice(3, 7) + "-" + f_val.slice(7, 14) + "-" + f_val.slice(14, 15);
};
//blur event
function blurEvent_txtfieldMobile(e){
	$.txtfieldMobile.maxLength = 11;
	var f_val = e.source.value.replace(/[^0-9+]/g, "");
	f_val = f_val.replace(/[_-]/g, " ");
	e.source.value = (f_val.length == 1 || f_val.length == 0) ? f_val : f_val.slice(0, 3) + "-"+ f_val.slice(3, 10);
};
function focusMobileNumber1(e){
	$.txtfieldMobile.value = e.source.value.replace(/[-]/gi, "");
	$.txtfieldMobile.maxLength = 10;
}
/// Web service call : Submit user data to recovery forgot things
function submitForgotUsername(){
	try{
		var license = $.txtfieldLicense.value;
		license = license.replace(/&(?!amp;)/g, '&amp;'​);
	    var	mail = $.txtfieldMail.value;
	    var	emiratesid = $.txtfieldEmirateId.value.replace(/[-]/gi, "");
	    Ti.API.info('emiratesid '+emiratesid);
	    var	mobile = $.txtfieldMobile.value.replace(/[-]/gi, "");
	    var	passport = $.txtfieldPassport.value;
	        passport = passport.replace(/&(?!amp;)/g, '&amp;'​);
	    var lblEmiratesPassport;
	    
	if($.imgIndividual.image === Alloy.Globals.path.radioActive){
		if(emiratesid === "" && passport === ""){
			utilities.showAlert(Alloy.Globals.selectedLanguage.forgotUsername,Alloy.Globals.selectedLanguage.validateHintText,function(){});
		}else if(mail === ""){
		  	utilities.showAlert(Alloy.Globals.selectedLanguage.forgotUsername,Alloy.Globals.selectedLanguage.mailId,function(){});
		}else if(mobile === ""){
		    utilities.showAlert(Alloy.Globals.selectedLanguage.forgotUsername,Alloy.Globals.selectedLanguage.mobileNumber,function(){});
		}else if (emiratesid !== "" && emiratesid.length < 15) {
			$.txtfieldEmirateId.value = "";
		  	utilities.showAlert(Alloy.Globals.selectedLanguage.forgotUsername,Alloy.Globals.selectedLanguage.invalidEmiratesId,function(){});
		}
		else if (mobile.length !== 10 && mobile.value !== "") {
		  	utilities.showAlert(Alloy.Globals.selectedLanguage.forgotUsername,Alloy.Globals.selectedLanguage.mobileLength,function(){});
		}else{
			try{
				lblEmiratesPassport = (emiratesid !== "")?emiratesid:passport;
				httpManager.forgetUsername(function(result){
				var rootNode = result.getElementsByTagName("output");
				var ns ="http://ForgetUserName";
				//var subNode = result.response.getElementsByTagNameNS("ns1:Status");
				if(rootNode.length > 0){
					var status = result.getElementsByTagNameNS(ns, "Status").item(0).textContent;
					
					if(status === "Success"){
						Alloy.Globals.hideLoading();
						var alertView = Ti.UI.createAlertDialog({
							title : Alloy.Globals.selectedLanguage.appTitle,
							message : (Alloy.Globals.isEnglish)?result.getElementsByTagNameNS(ns, "Message_EN").item(0).textContent:result.getElementsByTagNameNS(ns, "Message_AR").item(0).textContent,
							buttonNames : [Alloy.Globals.selectedLanguage.ok]
						});
						alertView.addEventListener('click', function(e) {
							
							if (e.index == 0) {
								var winMenu = Alloy.createController('UserManagement/winLogin',{
									isFromLeftPanel : false
								}).getView();
								Alloy.Globals.openWindow(winMenu);
							}
						});
						alertView.show();
					}else if(status === "Failure"){
			    			Alloy.Globals.hideLoading();
			    			var alertView = Ti.UI.createAlertDialog({
								title : Alloy.Globals.selectedLanguage.appTitle,
								message : (Alloy.Globals.isEnglish)?result.getElementsByTagNameNS(ns, "Message_EN").item(0).textContent:result.getElementsByTagNameNS(ns, "Message_AR").item(0).textContent,
								buttonNames : [Alloy.Globals.selectedLanguage.ok]
							});
							
							alertView.show();
			    		}
				}else{
		    		var alertView = Ti.UI.createAlertDialog({
						title : Alloy.Globals.selectedLanguage.appTitle,
						message : Alloy.Globals.selectedLanguage.serviceError,
						buttonNames : [Alloy.Globals.selectedLanguage.ok]
				    });
				    alertView.show();
		    	    Alloy.Globals.hideLoading();
		    	}
				Alloy.Globals.hideLoading();
			},1,mail,mobile,lblEmiratesPassport);
			}catch(e){
				Ti.API.info('Error '+e.message);
			}
		}
	}else if($.imgEstablishment.image === Alloy.Globals.path.radioActive){
		if(license === ""){
		    utilities.showAlert(Alloy.Globals.selectedLanguage.forgotUsername,Alloy.Globals.selectedLanguage.licenseNumber,function(){});
	    }else if(mail === ""){
		  	utilities.showAlert(Alloy.Globals.selectedLanguage.forgotUsername,Alloy.Globals.selectedLanguage.mailId,function(){});
		}else if(mobile === ""){
		    utilities.showAlert(Alloy.Globals.selectedLanguage.forgotUsername,Alloy.Globals.selectedLanguage.mobileNumber,function(){});
		}
		// else if (isNaN(mobile)) {
		  	// utilities.showAlert(Alloy.Globals.selectedLanguage.forgotUsername,Alloy.Globals.selectedLanguage.invalidMobile,function(){});
		// }
		else if (mobile.length !== 10 && mobile.value !== "") {
		  	utilities.showAlert(Alloy.Globals.selectedLanguage.forgotUsername,Alloy.Globals.selectedLanguage.mobileLength,function(){});
		}else{
			try{
				httpManager.forgetUsername(function(result){
				var rootNode = result.getElementsByTagName("output");
				var ns ="http://ForgetUserName";
				//var subNode = result.getElementsByTagName("ns1:Status");
				var ns ="http://ForgetUserName";
		    	if(rootNode.length > 0){
		    			    		
		    		var status = result.getElementsByTagNameNS(ns, "Status").item(0).textContent;
		    		
		    		if(status === "Success"){
		    			
		    			var alert = Ti.UI.createAlertDialog({
							title : Alloy.Globals.selectedLanguage.appTitle,
							message : (Alloy.Globals.isEnglish)?result.getElementsByTagNameNS(ns, "Message_EN").item(0).textContent:result.getElementsByTagNameNS(ns, "Message_AR").item(0).textContent,
							buttonNames : [Alloy.Globals.selectedLanguage.ok]
						});
						alert.addEventListener('click', function(e) {
							
							if (e.index == 0) {
								var winMenu = Alloy.createController('UserManagement/winLogin',{
									isFromLeftPanel : false
								}).getView();
								Alloy.Globals.openWindow(winMenu);
							}
						});
						alert.show();
		    		}else if(status === "Failure"){
			    			Alloy.Globals.hideLoading();
			    			var alert = Ti.UI.createAlertDialog({
								title : Alloy.Globals.selectedLanguage.appTitle,
								message : (Alloy.Globals.isEnglish)?result.getElementsByTagNameNS(ns, "Message_EN").item(0).textContent:result.getElementsByTagNameNS(ns, "Message_AR").item(0).textContent,
								buttonNames : [Alloy.Globals.selectedLanguage.ok]
							});
							
							alert.show();
			    	}
		    	}else{
		    		var alert = Ti.UI.createAlertDialog({
					title : Alloy.Globals.selectedLanguage.appTitle,
					//title:"tset",
					message : Alloy.Globals.selectedLanguage.serviceError,
					buttonNames : [Alloy.Globals.selectedLanguage.ok]
				     });
				    alert.show();
		    	    Alloy.Globals.hideLoading();
		    	}
		    	Alloy.Globals.hideLoading();
			},2,mail,mobile,license);
			}catch(e){
				Ti.API.info('Error '+e.message);
			}
		}
	}
	}catch(e){
		Ti.API.info('Error in submit forget data function '+JSON.stringify(e));
	}
}