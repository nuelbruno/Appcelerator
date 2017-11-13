var args = arguments[0] || {};
//Require files....
var utilities = require("utilities");
var httpManager = require("httpManager");
// Activity indicator: use : While loading the help screens
var actHelp = Ti.UI.createActivityIndicator({
	color: 'white',
	font: {fontFamily:'Helvetica Neue', fontSize:15, fontWeight:'bold'},
	message: Alloy.Globals.selectedLanguage.helpscreensloading,
	style: 3, height:Ti.UI.SIZE, width:Ti.UI.SIZE,
	left:"5dp", bottom:"30dp", zIndex:465
});

//Chnage language function
function changeLanguage(){
	$.textfieldUserName.hintText = Alloy.Globals.selectedLanguage.userName;
	$.textfieldPassword.hintText = Alloy.Globals.selectedLanguage.password;
}
/// User Registration function/Event
function UserRegistration(){

	Ti.API.info(Ti.App.Properties.getString("isTermsCondtionSet")+'current window LOG page' + Alloy.Globals.currentWindow);
	
	if(Ti.App.Properties.getString("isTermsCondtionSet") == true || Ti.App.Properties.getString("isTermsCondtionSet") == "true")
	{   Ti.API.info('tru condition');
		if (Alloy.Globals.currentWindowMain == "winRegistrationRT") { 
			return;
		}
		Alloy.Globals.openWindow(Alloy.createController('UserManagement/Registration/winRegistration').getView());
	}else{
		if (Alloy.Globals.currentWindowMain == "winTermsCondition") { 
			return;
		}
		
		Alloy.Globals.openWindow(Alloy.createController('UserManagement/Registration/winTermsCondition').getView());
	}
}
//Activate account Function/Event
function activateAccount(){ 
	
	Ti.API.info('current window' + Alloy.Globals.currentWindow);
	
	if (Alloy.Globals.currentWindowMain == "winSubmitOTPRT") { Ti.API.info('cur win acti in loop' + Alloy.Globals.currentWindowMain);
		return;
	}
	Alloy.Globals.openWindow(Alloy.createController('UserManagement/Registration/winSubmitOTP', {title:"Activate"}).getView());
}
//SKIP Login function/Event
function SkipLogin(){
	Ti.App.Properties.setBool("isSecondTime",true);
	if(args.isFromLeftPanel){
		$.winLogin.close();	
	}else if(Ti.App.Properties.getString("isMenuDirection") != undefined){
		Alloy.Globals.userInfo = false;
		Alloy.Globals.openWindow(Alloy.createController('winHome',Ti.App.Properties.getString("isMenuDirection")).getView());
	}else {
		Alloy.Globals.userInfo = false;
		Alloy.Globals.openWindow(Alloy.createController('common/winMenuSelection').getView());
	}
}

// Validate the Mobile number : CURRENTLY NOT IN USED.... WILL BE REMOVED LATER
/*function validateMobile(e){
	 if (isNaN(e.source.value)) {
	  utilities.showAlert(Alloy.Globals.selectedLanguage.appTitle,Alloy.Globals.selectedLanguage.invalidMobile,function(){});
	  e.source.value = "";
	  return;
	 }else if (e.source.value.length !== 10 && e.source.value !== "") {
	  utilities.showAlert(Alloy.Globals.selectedLanguage.appTitle,Alloy.Globals.selectedLanguage.mobileLength,function(){});
	  e.source.value = "";
	  return;
	 }
}*/

/*
 * make a web service call for LOGIN -> make another call for GETACCOUNTDETAILS -> another last call for UPDATEREGISTRATION USER
 */

function SubmitLogin(){
	var username = $.textfieldUserName.value;
	var password = $.textfieldPassword.value;
	
	username = username.replace(/&(?!amp;)/g, '&amp;'​);
	password = password.replace(/&(?!amp;)/g, '&amp;'​);
	username = username.toLowerCase();
	
	Ti.API.info('caps change username ====='+username);
	if(username === "" || password === ""){
		var alertmsg = (username === "")? Alloy.Globals.selectedLanguage.plzEnterUserName : Alloy.Globals.selectedLanguage.plzEnterPassword;
		utilities.showAlert(alertmsg);
	}else{
        httpManager.userLogin(username,password,function(response) {
		    if(response != null)
			{
				Ti.API.info("-----user object" + JSON.stringify(response));
				Ti.App.Properties.setObject("LoginDetaisObj", response);
				getAccountdetailsCall();	
	     	    return;
     	   }else{
     	   	   $.textfieldUserName.value = "";
		       $.textfieldPassword.value =	"";
     	   }
        });
	}
}
//web service call for getting account detail of user
function getAccountdetailsCall(){
	httpManager.getUserAccountDetails(function(response) {
		if(response != null)
		{
			setUserData(response);
		    return;
     	}else{
     		$.textfieldUserName.value = "";
		    $.textfieldPassword.value =	"";
     	}
	});
}
///set user data into properties
function setUserData(e) {
	Ti.API.info("Logged User Token Data Set :"+ JSON.stringify(e));
	
	Ti.App.Properties.setInt("accountID", e.user_Details.accountId);
	Ti.App.Properties.setString("emailID", e.user_Details.emailAddress);
	Ti.API.info("Logged User Token Data Set :"+ e.account_details.firstName);
	var str = e.account_details.firstName;
    //var storeFirstname = str.substr(0,str.indexOf(' '));
    Ti.App.Properties.setString("firstName", str);
    //Ti.API.info("Logged User Token Data Set :"+ storeFirstname);
	call_web_serivce_updateRegistrationWithUser(e);	
}
///// open a forgot username window.... function/event
function showForgotUsernamePopup(){
	Alloy.Globals.openWindow(Alloy.createController("UserManagement/winForgotUsername").getView());
}
///// open a forgot password window.... function/event
function showForgotPopup(){
	Alloy.Globals.openWindow(Alloy.createController("UserManagement/winForgotPassword").getView());
}
//////window OPEN function/event
function winOpen(){
	Alloy.Globals.currentWindowMain == "";
	
	Ti.API.info('RETURN URL: 1111111::: '+Alloy.Globals.returnbackURL);
	
	if (OS_ANDROID && Alloy.Globals.returnbackURL)
	{
		try{
			Ti.API.info('PROPERTY USER DATA:'+ JSON.stringify(Ti.App.Properties.getObject("LoginDetaisObj")));
		
			if (Ti.App.Properties.getObject("LoginDetaisObj")){
				$.textfieldUserName.value = Ti.App.Properties.getObject("LoginDetaisObj").username;
				$.textfieldPassword.value =	Ti.App.Properties.getObject("LoginDetaisObj").password;	
			}
			
			
			if (Alloy.Globals.returnbackURL == "cancelPayment")
				return;
			
			setTimeout(function(){
				Alloy.Globals.openWindow(Alloy.createController("Services/servicesWebView", {url : Alloy.Globals.returnbackURL}).getView());
			},1000);
			Alloy.Globals.returnbackURL = null;
		}
		catch(e){
			Ti.API.info('EXCEPTION : '+ e)
		}
		
	}
	else if (OS_IOS){
		if (Alloy.Globals.isAppOpened == false){
			Ti.API.info('ARGUMENTS: '+JSON.stringify(Titanium.App.getArguments()) +'ISOPENED -- Val---?????????'+Alloy.Globals.isAppOpened);
			var resumedAppData = Titanium.App.getArguments();
			if (resumedAppData.UIApplicationLaunchOptionsRemoteNotificationKey && resumedAppData.UIApplicationLaunchOptionsRemoteNotificationKey.custom_message) 
			{
				var customMsg = JSON.parse(resumedAppData.UIApplicationLaunchOptionsRemoteNotificationKey.custom_message);
					if (parseInt(customMsg.nTypeId)==5)
						Ti.API.info('NO NEED TO OPEN LOGIN SCREEN TWICE..');
					else
						Alloy.Globals.navigateToScreen(customMsg);
			}
		}
	}
	
	// pritam176/welcome1 : dev
	// nkestnew/12345678 : dev
	// estbruno/12345678 : dev
	//pritamest1/welcome1! : dev
	
	// nk/123NK45nk@ : stg
	//pritamest5/welcome1! : stg
	// nbrunoind/12345678 : stg
	
	//mohan/12345678 : stg -> establishment
	//pritamzz/welcome1 : stg-> Individual 
	// esta/Test1234! ->establishment
	// nkestnew/12345678
	
	$.textfieldUserName.value="mohan";
	$.textfieldPassword.value="12345678";
	
	setTimeout(function(){
		Alloy.Globals.isAppOpened = true;
		Ti.API.info('IS APP OPENED:(LOGIN.js): '+Alloy.Globals.isAppOpened);
	},2000);
}

/*
 * make a web service call for update User with registration
 */
function call_web_serivce_updateRegistrationWithUser(e)
{
	try{
		Ti.API.info('eeeeeeeee '+ JSON.stringify(e));
		var dataObj = e;
		Ti.API.info(' USER ID/NAME: '+dataObj.user_Details.userName);
		
		httpManager.updateRegistrationWithUser(function(result){
				Ti.API.info(' RESPONSE OF call_web_serivce_updateRegistrationWithUser  :::: ' + result);
				if (result.status == "success"){
					if(Ti.App.Properties.hasProperty("isMenuDirection")){
						Alloy.Globals.openWindow(Alloy.createController('winHome',Ti.App.Properties.getString("isMenuDirection")).getView());
					}else{
						Alloy.Globals.openWindow(Alloy.createController('common/winMenuSelection').getView());
					}
				}else{
					utilities.showAlert(Alloy.Globals.selectedLanguage.appTitle, Alloy.Globals.selectedLanguage.not_reg_push_error, null);
					Ti.App.Properties.setString('deviceToken', null);
					Alloy.Globals.openWindow(Alloy.createController('winHome','left').getView());
					Ti.API.info('DEVICE IS NOT REGISTRED FOR RECEIVEING PUSH NOTIFICATION..');
				}
				
		},dataObj.user_Details.userName);
	}
	catch(e){
		Ti.API.info(' Error in making call of update Registration with user web service call'+ JSON.stringify(e));
	}
};
////Confirm aler dialog in android while exiting screen
if(OS_ANDROID)
{
	$.winLogin.addEventListener("androidback", function(){
		if(args.isFromLeftPanel==false){
			var alert = Ti.UI.createAlertDialog({
				title : Alloy.Globals.selectedLanguage.appTitle,
				message : Alloy.Globals.selectedLanguage.exitConfirm,
				buttonNames : [Alloy.Globals.selectedLanguage.no, Alloy.Globals.selectedLanguage.yes]
			});
			alert.addEventListener('click', function(e) {
				if (e.index == 1) {
					$.winLogin.close();
				}
			});
			alert.show();
		}
		else{
			$.winLogin.close();
		}
	});
	
}
//call chnage language function....
changeLanguage();

////////////////////////////////////
//////SHOWING HELP SCREEN//////////
//////////////////////////////////
Ti.API.info('is APP opened second Time>>>>>>??? : '+Ti.App.Properties.getBool("isSecondTime"));
///helpscreen function : call itself
var showHelpScreen = function(){
	try{
		if (Ti.App.Properties.getBool("isSecondTime") == true){
			$.winLogin.remove($.scrllableviewHelpScreen);
			$.winLogin.remove($.lblFinishRight5);
			$.winLogin.remove(actHelp);
		}
		else{
			if (Ti.Network.online){
				if (Alloy.Globals.HELPSCREEN_COUNT==0 || Alloy.Globals.HELPSCREEN_COUNT==null){
					$.winLogin.remove($.scrllableviewHelpScreen);
					$.winLogin.remove($.lblFinishRight5);
					$.winLogin.remove(actHelp);
				}
				else{
					actHelp.show();
					$.lblFinishRight5.text = Alloy.Globals.selectedLanguage.next;
					var helpScreenViews = [];
					for (var i=0; i<Alloy.Globals.HELPSCREEN_COUNT; i++){
						var imgHelp = Ti.UI.createImageView({
							height:"100%",
							width:"100%",
							defaultImage:Alloy.Globals.path.bg,
							//image:getAppHelpscreenImagesFromFileSys(Alloy.Globals.isEnglish?"en_helpscreens":"ar_helpscreens", parseInt(i+1) +".png") - get resources from filesys. saved
							image:Alloy.Globals.webserviceUrl.replace("https", "http") + "/img/mhelp/help_"+ (Alloy.Globals.isEnglish?"en/":"ar/") + parseInt(i+1) +".png"
							// image:Alloy.Globals.sitesUrl.replace("https", "http") + "/img/mhelp/help_"+ (Alloy.Globals.isEnglish?"en/":"ar/") + parseInt(i+1) +".png"
						});
						imgHelp.addEventListener("load",function(){
							actHelp.hide();
						});
						imgHelp.add(actHelp);
						helpScreenViews.push(imgHelp);
						Ti.API.info('IMAGE '+parseInt(i+1)+" "+imgHelp.image);
					}
					$.scrllableviewHelpScreen.setViews(helpScreenViews);
					$.scrllableviewHelpScreen.animate({opacity:1, duration:1000},function(){
						actHelp.show();
						$.lblFinishRight5.animate({opacity:1, duration:2000});
					});
				}
			}
			else
			{
				utilities.showAlert(Alloy.Globals.selectedLanguage.internet_err);
				cameraPermission();
			}
		}
	}
	catch(e){
		Ti.API.info('Error in showHelp screen function');
	}
}();
/*var getAppHelpscreenImagesFromFileSys = function(langCode, imgName){
	var getFile = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory+ langCode, imgName);
	Ti.API.info('final and fulll path : '+getFile.nativePath);
	return getFile.nativePath;
};*/
///Close helpscreen on clicking on Label(End)
var currentPage = 0;
var _eventCloseHelpScreen = function(){
	try{
		if ($.lblFinishRight5.text == Alloy.Globals.selectedLanguage.end){
			$.lblFinishRight5.animate({opacity:0, duration:500},function(){
				$.scrllableviewHelpScreen.animate({opacity:0, duration:500},function(){
					$.winLogin.remove($.scrllableviewHelpScreen);
					$.winLogin.remove($.lblFinishRight5);
					$.winLogin.remove(actHelp);
					Ti.App.Properties.setBool("isSecondTime",true);
					
					cameraPermission();
				});
			});	
		}
		else{
			$.scrllableviewHelpScreen.scrollToView(currentPage+1);
		}
	}
	catch(e){
		Ti.API.info('Error in close Help screen....');
	}
};
//Managing Next & End Label
function _eventScrollableViewScroll(e){
	try{
		currentPage = e.currentPage;
		if (currentPage==Alloy.Globals.HELPSCREEN_COUNT-1){
			$.lblFinishRight5.text = Alloy.Globals.selectedLanguage.end;
		}
		else
		{
			$.lblFinishRight5.text = Alloy.Globals.selectedLanguage.next;
		}
	}
	catch(e){
		Ti.API.info('Error in Scrollableview Scroll....');
	}
}
$.winLogin.add(actHelp);

function cameraPermission(){
	if (OS_ANDROID){
		Ti.Media.requestCameraPermissions(function(e) {
			Ti.API.info('Ti.Media.requestCameraPermissions', JSON.stringify(e));
			if (e.success) {
				Ti.API.info('>>>>>>>>>>>>>>>YOU GRANTED THE PERMISSION>>>>>>>>>>>>>>>');
			}
			else {
				// We already check AUTHORIZATION_DENIED earlier so we can be sure it was denied now and not before
				Ti.API.info('>>>>>>>>>>>>>>>YOU DENIED THE PERMISSION>>>>>>>>>>>>>>>');
			}
		});
	}
	else
	{
		Ti.API.info('NO NEED TO GIVE CAMERA PERMISSION FOR iOS DEVICE');
		return;
	}
}