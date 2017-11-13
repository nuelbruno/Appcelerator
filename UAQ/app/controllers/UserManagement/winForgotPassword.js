// Initialize the startup things: hint text, visible false, opacity0 etc....
$.pwdLicenseView.height = 0;
$.txtfieldUserName.hintText = Alloy.Globals.selectedLanguage.userName;
$.textfieldLicense.hintText = Alloy.Globals.selectedLanguage.license;
$.textfieldEmirateId.hintText = Alloy.Globals.selectedLanguage.emiratesid;
$.textfieldMobile.hintText = Alloy.Globals.selectedLanguage.mobile;
$.textfieldPassport.hintText = Alloy.Globals.selectedLanguage.passport;
$.labelPwdMandatory.text = Alloy.Globals.selectedLanguage.or;
var utilities = require("utilities");
var httpManager = require("httpManager");
var args = arguments[0] || {};
//Add iOS Keyboard Toolbar: DONE
function addPwdKeyBoard(){
	var flexSpace = Titanium.UI.createButton({
    	systemButton : Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
	});
	var btnDone = Titanium.UI.createButton({    
	    title : 'Done',width : 67,height : 32
	});
	btnDone.addEventListener('click',function(e){
	    $.textfieldMobile.blur();
	});
	$.textfieldMobile.keyboardToolbar = [flexSpace, flexSpace,flexSpace, btnDone];
}
//Add iOS Keyboard Toolbar: DONE
function addPwdEmirateKeyBoard(){
	var flexSpace = Titanium.UI.createButton({
    	systemButton : Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
	});
	var btnDone = Titanium.UI.createButton({    
	    title : 'Done',width : 67,height : 32
	});
	btnDone.addEventListener('click',function(e){
	    $.textfieldEmirateId.blur();
	});
	$.textfieldEmirateId.keyboardToolbar = [flexSpace, flexSpace,flexSpace, btnDone];
}
//Close window function
function closeWindow() {
	Alloy.Globals.arrWindows.pop($.winForgotPassword);
	$.winForgotPassword.close();
}
//Android Back event
$.winForgotPassword.addEventListener('android:back', function(e) {
	closeWindow();
});
//Window Open function/event
function winOpen(e){
	if (OS_IOS){
		addPwdKeyBoard();
		addPwdEmirateKeyBoard();
	}
	Alloy.Globals.currentWindow = e.source.id;
	Alloy.Globals.arrWindows.push($.winForgotPassword);
}
//Cancel function/event : Close this window..
function closeForgotPopup(){
	closeWindow();
}
//// manage toggle : Establishment/Individual
function hidepwdLicense(){
	$.labelPwdMandatory.visible = true;
	$.imgPwdIndividual.image = Alloy.Globals.path.radioActive;
	$.imgPwdEstablishment.image = Alloy.Globals.path.radioInactive;
	$.txtfieldUserName.value = $.textfieldEmirateId.value = $.textfieldPassport.value = $.textfieldMobile.value = "";
	$.pwdLicenseView.height = 0;
	$.pwdEmiratesView.height = 45;
	$.pwdPassportView.height = 45;
	$.pwdLicenseView.top = 13;
	$.pwdLicenseView.bottom = 0;
}
//// manage toggle : Establishment/Individual
function hidepwdEmirate(){
	$.labelPwdMandatory.visible = false;
	$.imgPwdIndividual.image = Alloy.Globals.path.radioInactive;
	$.imgPwdEstablishment.image = Alloy.Globals.path.radioActive;
	$.textfieldLicense.value = $.txtfieldUserName.value = $.textfieldMobile.value = "";
	$.pwdLicenseView.height = 60;
	$.pwdEmiratesView.height = 0;
	$.pwdPassportView.height = 0;
	$.pwdLicenseView.top = 0;
	$.pwdLicenseView.bottom = 15;
}
//Check Email address is valid or not
function validateEmail(){
	var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    var result = re.test($.txtfieldMail.value);
    if(result == 0){
    	$.txtfieldMail.value = "";
    	utilities.showAlert(Alloy.Globals.selectedLanguage.forgotUsername,Alloy.Globals.selectedLanguage.invalidmail,function(){});
    }
}
//Focus event
function focusEvent_txtfieldEmirateId(e){
	$.textfieldEmirateId.value = e.source.value.replace(/[-]/gi, "");
	$.textfieldEmirateId.maxLength = 15;
};
//blur event
function blurEvent_txtfieldEmirateId(e){
	$.textfieldEmirateId.maxLength = 18;
	var f_val = e.source.value.replace(/[^0-9+]/g, "");
	f_val = f_val.replace(/[_-]/g, " ");
	e.source.value = (f_val.length == 1 || f_val.length == 0) ? f_val : f_val.slice(0, 3) + "-" + f_val.slice(3, 7) + "-" + f_val.slice(7, 14) + "-" + f_val.slice(14, 15);
};
function blurEventtxtfieldMobile(e){
	$.textfieldMobile.maxLength = 11;
	var f_val = e.source.value.replace(/[^0-9+]/g, "");
	f_val = f_val.replace(/[_-]/g, " ");
	e.source.value = (f_val.length == 1 || f_val.length == 0) ? f_val : f_val.slice(0, 3) + "-"+ f_val.slice(3, 10);
};
function focusMobileNumber(e){
	$.textfieldMobile.value = e.source.value.replace(/[-]/gi, "");
	$.textfieldMobile.maxLength = 10;
}
// Make a web service call for recovering forgot data.
function submitForgotData(){
	try{ 
		var uname = $.txtfieldUserName.value; 
		    uname = uname.toLowerCase();
	    	emiratesid = $.textfieldEmirateId.value.replace(/[-]/gi, "");
	    	license = $.textfieldLicense.value;
	    	license = license.replace(/&(?!amp;)/g, '&amp;'​);
	    	mobile = $.textfieldMobile.value.replace(/[-]/gi, "");
	    	passport = $.textfieldPassport.value;
	    	passport = passport.replace(/&(?!amp;)/g, '&amp;'​);
	    var lblEmiratePassport;
	 
	    if($.imgPwdIndividual.image === Alloy.Globals.path.radioActive){
			if(passport === "" && emiratesid === ""){
				utilities.showAlert(Alloy.Globals.selectedLanguage.forgetPassword,Alloy.Globals.selectedLanguage.validateHintText,function(){});
			}else if(uname === ""){
		  	    utilities.showAlert(Alloy.Globals.selectedLanguage.forgetPassword,Alloy.Globals.selectedLanguage.enterUserName,function(){});
			}else if(mobile === ""){
			    utilities.showAlert(Alloy.Globals.selectedLanguage.forgetPassword,Alloy.Globals.selectedLanguage.mobileNumber,function(){});
			}else if (emiratesid.length < 15 && emiratesid !== "") {
				$.textfieldEmirateId.value = "";
			  	utilities.showAlert(Alloy.Globals.selectedLanguage.forgetPassword,Alloy.Globals.selectedLanguage.invalidEmiratesId,function(){});
			}
			else if (mobile.length !== 10 && mobile.value !== "") {
			  utilities.showAlert(Alloy.Globals.selectedLanguage.forgetPassword,Alloy.Globals.selectedLanguage.mobileLength,function(){});
			}else{
				try{
					lblEmiratePassport = (emiratesid !== "")?emiratesid:passport;
					httpManager.forgetPassword(function(result){					
						var rootNode = result.getElementsByTagName("output");
						var ns ="http://ForgetPassword";
						//var subNode = result.getElementsByTagName("uaq:Status");
				    	if(rootNode.length > 0){
				    		var status = result.getElementsByTagNameNS(ns, "Status").item(0).textContent;
				    		
				    		if(status === "Success"){
				    			Alloy.Globals.hideLoading();
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
								message : Alloy.Globals.selectedLanguage.serviceError,
								buttonNames : [Alloy.Globals.selectedLanguage.ok]
						    });
						    alert.show();
				    	    Alloy.Globals.hideLoading();
				    	}
					},1,uname,mobile,lblEmiratePassport);
				}catch(e){
					Ti.API.info('Error '+e.message);
				}
			}
		}else if($.imgPwdEstablishment.image === Alloy.Globals.path.radioActive){
			if(license === ""){
		  	    utilities.showAlert(Alloy.Globals.selectedLanguage.forgetPassword,Alloy.Globals.selectedLanguage.licenseNumber,function(){});
			}else if(uname === ""){
				utilities.showAlert(Alloy.Globals.selectedLanguage.forgetPassword,Alloy.Globals.selectedLanguage.enterUserName,function(){});
		    }else if(mobile === ""){
			    utilities.showAlert(Alloy.Globals.selectedLanguage.forgetPassword,Alloy.Globals.selectedLanguage.mobileNumber,function(){});
			}else if (emiratesid !== "" && emiratesid.length < 15) {
		  	    utilities.showAlert(Alloy.Globals.selectedLanguage.forgotUsername,Alloy.Globals.selectedLanguage.invalidEmiratesId,function(){});
			}
			else if (mobile.length !== 10 && mobile.value !== "") {
			  utilities.showAlert(Alloy.Globals.selectedLanguage.forgetPassword,Alloy.Globals.selectedLanguage.mobileLength,function(){});
			}else{				
				try{
					httpManager.forgetPassword(function(result){
						
						var rootNode = result.getElementsByTagName("output");
						var ns ="http://ForgetPassword";
						
				    	if(rootNode.length > 0 ){
				    	
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
								message : Alloy.Globals.selectedLanguage.serviceError,
								buttonNames : [Alloy.Globals.selectedLanguage.ok]
						    });
						    alert.show();
				    	    Alloy.Globals.hideLoading();
				    	}
				    	Alloy.Globals.hideLoading();
				},2,uname,mobile,license);
				}catch(e){
					Ti.API.info('Error '+e.message);
				}			
			}
		}
	}catch(e){
		Ti.API.info('Error in submit forget data function '+JSON.stringify(e));
	}
}