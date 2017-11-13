var args = arguments[0] || undefined;
var loginDetailsObj;
var isfromInvoice;
var isTablet = Alloy.isTablet;
var selectedRowInfo = undefined;
var isLoggedIn = Ti.App.Properties.getBool("isLoggedIn_mSupplier");
var objDetail;
$.imgTheme.isDefaultTheme = true;
if(isLoggedIn){
	objDetail = Ti.App.Properties.getObject("LoginDetaisObj");
	Ti.API.info('iSupplier Logged in user OBJ DETAIL === ' + JSON.stringify(objDetail));
	//As your registration not yet expired. so you will not access to use this service
}
var httpManager = require("httpManager");
if (Alloy.Globals.isIOS7Plus) {
	$.winISupplierHome.extendEdges = [Ti.UI.EXTEND_EDGE_TOP];
	$.statusBar.height = 20;
}
var htmlContent = "",
    htmlStep = "";
if (Alloy.Globals.isEnglish) {
	htmlContent += '<h1>Renew Supplier Registration</h1><p>Renew the registration of suppliers wishing to provide the federal government with their services after the end of their registration in the federal Suppliers’ record.</p>';
	htmlContent += '<h1>Renewal Fees</h1><p>500 Dirhams + 3 Dirhams, paid through e-Dirham Card</p>';


	htmlStep += '<h1>Requesting the Service</h1><ol><li>Login to Supplier account</li><li>Pay the fees through e-Dirham Card</li><li>In case a License is expired, renew it through uploading the new License and update its Expiry Date</li>';
	htmlStep += '</ol><h1>Beneficiary of the Service</h1><p>Federal Ministries and Bodies/Companies/Private Sector</p><h1>Responsible Department</h1><p>Support Desk Office</p>';
	htmlStep += '<h1>Responsible Officer</h1><p>Mr. Maadhad Ghanaim Al-Hamli / Mrs. Huda Mohammed Al-Hamadi</p><h1>Direct Number</h1><p>02-6987575</p>';

} else {
	htmlContent += '<h1>التجـديد في سـجـل الموردين</h1><p>تجديد تسجيل الموردين الراغبين في تقديم خدمات توريد للحكومة الاتحادية بعد انتهاء تسجيلهم في سجل الموردين الاتحادي.<br/><br/>ويتم التجديد بعد مرور سنة من التسجيل أو آخر تجديد.</p>';
	htmlContent += '<h1>رسـوم التجـديد</h1><p>500 درهم + 3 دراهم، تدفع عن طريق الدرهم الالكتروني</p>';


	htmlStep += '<h1>خـطوات تنفـيذ الخـدمة</h1><ol><li>الدخول إلى حساب المورد</li><li>دفع رسوم التجديد عن طريق بطاقة الدرهم الالكتروني</li><li>في حال انتهاء صلاحية المرفقات، يجب تحديث المرفقات وتاريخ الانتهاء</li></ol>';
	htmlStep += '<h1>الإدارة المسـؤولة</h1><p>مكتب الدعم الفني</p><h1>الجـهة المسـتفيدة من الخـدمة</h1><p>الوزارات / الهيئات الاتحادية / الشركات / قطاع خاص</p><h1>الموظـف المسـؤول</h1><p>السيد معضد عبيد الهاملي / السيدة هدى محمد الحمادي</p>';
	htmlStep += '<h1>الرقم المباشـر</h1><p>02-6987332 / 04-3110141</p>';	

}


var alert = Ti.UI.createAlertDialog({
	title : Alloy.Globals.selectedLanguage.iSupplier,
	buttonNames : [Alloy.Globals.selectedLanguage.ok, Alloy.Globals.selectedLanguage.cancelTitle]
});

alert.addEventListener('click', function(e) {
	if (e.index == 0) {
		closeOrdInvView();
		isFromNavBar = false;
		$.backView.visible = true;
		$.loginView.visible = true;
	}
});

function closeWindow() {
	Alloy.Globals.closeWindow($.winISupplierHome);
	//$.winISupplierHome.close();
}

function changeLanguage() {
	$.lblNavTitle.text = Alloy.Globals.selectedLanguage.iSupplier;
	$.btnNavLogin.title = Alloy.Globals.selectedLanguage.login;
	$.helpBackView.right = (Alloy.isTablet) ? 75 : 60;
	if (Ti.App.Properties.getBool("isLoggedIn_mSupplier") == true) {
		$.btnNavLogin.title = Alloy.Globals.selectedLanguage.logout;
		$.helpBackView.right = (Alloy.isTablet) ? 85 : 70;
		
	}
	$.btnLogin.title = Alloy.Globals.selectedLanguage.login;
	$.btnCancel.title = Alloy.Globals.selectedLanguage.cancel;
	$.lblLoginDesc.text = Alloy.Globals.selectedLanguage.loginDescription;
	$.btnLoginBig.title = Alloy.Globals.selectedLanguage.login;
	$.lblForgotPassword.text = Alloy.Globals.selectedLanguage.forgotPassword;
	$.txtUsername.hintText = Alloy.Globals.selectedLanguage.emailAddress;
	$.txtPassword.hintText = Alloy.Globals.selectedLanguage.password;
	$.lblByPurchaseOrder.text = Alloy.Globals.selectedLanguage.byPurchaseOrder;
	$.lblByInvoiceNumber.text = Alloy.Globals.selectedLanguage.byInvoiceNumber;
	//$.btnOk.title = Alloy.Globals.selectedLanguage.ok;
	$.btnOrdInvCancel.title = $.btnEmailCancel.title = Alloy.Globals.selectedLanguage.cancel;
	//$.btnOkBig.title = Alloy.Globals.selectedLanguage.ok;
	var alignment;
	if (Alloy.Globals.isEnglish) {
		// $.viewInstructions.changeLanguage({
			// right : 10
		// });
		alignment = Titanium.UI.TEXT_ALIGNMENT_LEFT;
		$.byPurchaseOrderView.left = 0;
		$.byInvoiceNumberView.left = "50%";
		$.btnApply.left = $.btnNo.right = 0;
		$.btnLogin.left = $.btnCancel.right = 10;
		$.btnOk.left = $.btnOrdInvCancel.right = $.btnEmailCancel.right = $.btnEmail.left = 10;
		if (OS_ANDROID) {
			$.btnLogin.left = $.btnCancel.right = 0;
			$.btnOk.left = $.btnOrdInvCancel.right = $.btnEmailCancel.right = $.btnEmail.left = 0;
		}
		$.imgUserName.left = $.imgPassword.left = 10;
		$.txtUsername.left = $.txtPassword.left = 35;
		$.txtUsername.right = $.txtPassword.right = 5;
		$.lblForgotPassword.left = $.lblordInvDesc.left = $.lblEmailDesc.left = 10;
		$.lblByPurchaseOrder.left = $.lblByInvoiceNumber.left =  (isTablet) ? 32 : 22;

	} else {
		// $.viewInstructions.changeLanguage({
			// left : 10
		// });
		alignment = Titanium.UI.TEXT_ALIGNMENT_RIGHT;
		$.byPurchaseOrderView.right = 0;
		$.byInvoiceNumberView.right = "50%";
		$.btnOk.right = $.btnOrdInvCancel.left = $.btnEmailCancel.left = $.btnEmail.right = 10;
		$.btnLogin.right = $.btnCancel.left = 10;
		if (OS_ANDROID) {
			$.btnLogin.right = $.btnCancel.left = 0;
			$.btnOk.right = $.btnOrdInvCancel.left = $.btnEmailCancel.left = $.btnEmail.right = 0;
		}
		$.btnApply.right = $.btnNo.left = 0;
		$.imgUserName.right = $.imgPassword.right = 10;
		$.txtUsername.left = $.txtPassword.left = 5;
		$.txtUsername.right = $.txtPassword.right = 35;
		$.lblForgotPassword.right = $.lblordInvDesc.right = $.lblEmailDesc.right = 10;
		$.lblByPurchaseOrder.right = $.lblByInvoiceNumber.right =  (isTablet) ? 32 : 22;
		
		$.btnApply.width = 80;
		$.btnNo.width = 40; 
	}
	$.lblLoginDesc.textAlign = $.txtUsername.textAlign = $.txtPassword.textAlign = $.txtEmail.textAlign = $.lblForgotPassword.textAlign = $.lblByPurchaseOrder.textAlign = $.lblByInvoiceNumber.textAlign =alignment;
	$.lblordInvDesc.textAlign = $.txtOrdInvNo.textAlign = $.lblEmailDesc.textAlign = alignment;

}



/*
 *
 *
 */

var arrServiceList = [
{
	//1
	icon : Alloy.Globals.path.iconRegisterSupplier,
	text :  Alloy.Globals.selectedLanguage.newResumeRegistration, 
	winPath : "ISupplier/winISupplierRegistration",
	isRequireLogin : false,
	module:"SUP_REGISTER"
},


 {
	//2
	icon : Alloy.Globals.path.iconRenewal,
	text : Alloy.Globals.selectedLanguage.renewal,
	winPath : "ISupplier/winRenew",
	isRequireLogin : false,
	module:"SUP_RENEWAL"
}, 
/*
{
	//3
	icon : Alloy.Globals.path.iconAddNewUser,
	text : Alloy.Globals.selectedLanguage.addNewUser,
	winPath : "ISupplier/winAddNewUser",
	isRequireLogin : true,
	module:"ADD_NEWUSER"
},*/
{
	//4
	icon : Alloy.Globals.path.iconPurchaseOrder,
	text : Alloy.Globals.selectedLanguage.purchaseOrder,
	winPath : "ISupplier/winPurchaseOrder",
	isRequireLogin : true,
	module:"PURCHASEORDERS"
},
{
	//5
	icon : Alloy.Globals.path.icnNewVatCertificate,
	text : Alloy.Globals.selectedLanguage.invoices,
	winPath : "ISupplier/winInvoice",
	isRequireLogin : true,
	module:"GET_INVOICES"
},
{
	//6
	icon : Alloy.Globals.path.iconPayments,
	text : Alloy.Globals.selectedLanguage.payments,
	winPath : "ISupplier/winPayments",
	isRequireLogin : true,
	module:"GET_PAYMENTS"
},
{
	//7
	icon : Alloy.Globals.path.iconTenderBidsProcurements,
	text : Alloy.Globals.selectedLanguage.tenderBidsProcurements,
	winPath : "ISupplier/winTenders",
	isRequireLogin : false,
	module:"TENDERS"
},
{
	//8
	icon : Alloy.Globals.path.iconFmisSupport,
	text : Alloy.Globals.selectedLanguage.support,
	winPath : "ISupplier/winFMISSupport",
	isRequireLogin : true,
	module:"SUPPORT"
},
{
	//9
	icon : Alloy.Globals.path.icnProfile,
	text : Alloy.Globals.selectedLanguage.profile,
	//winPath : "ISupplier/winProfile",
	//isRequireLogin : true,
	//module:"PROFILE"
	winPath : "ISupplier/winEditRegistration",
	isRequireLogin : true,
	module: "PROFILE"
	
},      
];

var arrTblRecords = [];
function loadISupplierSerViceList() {
	$.tblISupplierList.data = [];
	isLoggedIn = Ti.App.Properties.getBool("isLoggedIn_mSupplier");
	
	
	arrTblRecords = [];
	for (var i = 0,
	    length = arrServiceList.length; i < length; i++) {
		var tblRow = Alloy.createController('ISupplier/IsupplierServiceListRow', {
			title : arrServiceList[i].text,
			icon : arrServiceList[i].icon,
			winPath : arrServiceList[i].winPath,
			doc :arrServiceList[i]
		}).getView();
		tblRow.doc = arrServiceList[i];
		
		if(!(i==0 && isLoggedIn) )//if the user logged in we will remove the New User registration option which is in first place
		{
			  arrTblRecords.push(tblRow);
		}  
	}

	$.tblISupplierList.data = arrTblRecords;
	
	setFontsAccordingToLogin();
}
var  setFontsAccordingToLogin = function(){
	
	/*var */isLoggedIn = Ti.App.Properties.getBool("isLoggedIn_mSupplier");
	var fontColor = (isLoggedIn) ? Alloy.Globals.path.vatButtonTitleColor : Alloy.Globals.path.vatButtonTitleColor_disabled;
	Ti.API.info(fontColor + "-" + $.tblISupplierList.sections[0].rows.length);
	for(var i=0,l=$.tblISupplierList.sections[0].rows.length;i<l;i++)
	{
		var currentRow = $.tblISupplierList.sections[0].rows[i];
		//Ti.API.info(currentRow.doc);
		
		if(currentRow.doc.isRequireLogin)
		{
			//currentRow.backgroundColor ="#C0C0C0";
			currentRow.children[0].children[1].color = fontColor;
		}
	}
	
	
	if (Alloy.Globals.currentTheme == "dark") {
		$.navBarBackView.backgroundColor = Alloy.Globals.path.navBarColor;
	}
	Alloy.Globals.setDefaultTheme($.winISupplierHome);
	
};

var logoutAlert = Ti.UI.createAlertDialog({
	title : Alloy.Globals.selectedLanguage.logout,
	message : Alloy.Globals.selectedLanguage.logOutMessage,
	buttonNames : (OS_IOS) ? [Alloy.Globals.selectedLanguage.ok, Alloy.Globals.selectedLanguage.cancel] : [Alloy.Globals.selectedLanguage.cancel, Alloy.Globals.selectedLanguage.ok]
});

if(Alloy.Globals.isEnglish){
	logoutAlert.buttonNames = (OS_IOS) ? [Alloy.Globals.selectedLanguage.ok, Alloy.Globals.selectedLanguage.cancel] : [Alloy.Globals.selectedLanguage.cancel, Alloy.Globals.selectedLanguage.ok];
} else {
	logoutAlert.buttonNames = (OS_IOS) ? [Alloy.Globals.selectedLanguage.cancel, Alloy.Globals.selectedLanguage.ok] : [Alloy.Globals.selectedLanguage.ok, Alloy.Globals.selectedLanguage.cancel];
}


logoutAlert.addEventListener('click', function(e) {
	
	var successIndex = (Alloy.Globals.isEnglish) ? 0 : 1;
	if (OS_ANDROID) {
		successIndex = (Alloy.Globals.isEnglish) ? 1 : 0;
	}
	if (e.index == successIndex) {
		
		httpManager.userLogout(Ti.App.Properties.getObject("LoginDetaisObj").tokenDetails, function(obj) {

			if (obj != null) {
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.iSupplier, obj.serviceAlert);
				if (obj.status) {
					$.btnNavLogin.title = Alloy.Globals.selectedLanguage.login;
					$.helpBackView.right = (Alloy.isTablet) ? 75 : 60;
					Ti.App.Properties.setBool("isLoggedIn_mSupplier", false);
					isLoggedIn =false;
					
					loadISupplierSerViceList();
					
					
				}
			}
		});
		
		
		
	} else {
		logoutAlert.hide();
	}
});

var isFromNavBar = false;
function PopUPLoginForm(isFromNav) {

	isFromNavBar = (isFromNav != undefined) ? isFromNav : true;

	/*var */isLoggedIn = Ti.App.Properties.getBool("isLoggedIn_mSupplier");
	if (isLoggedIn) {
		logoutAlert.show();
	} else {
		$.backView.visible = true;
		$.loginView.visible = true;
	}

}

function setTokenData(e) {
	Ti.API.info("iSupplier Logged User Token Data Set :"+ JSON.stringify(e));
	
	Ti.App.Properties.setInt("authenticationCode", e.tokenDetails.tokenCode);
	Ti.App.Properties.setString("emailID", e.tokenDetails.emailId);
	Ti.App.Properties.setString("status", e.tokenDetails.tokenStatus);
	Ti.App.Properties.setString("roleType", e.tokenDetails.roleType);
	Ti.App.Properties.setString("groupType", e.tokenDetails.groupType);
	Ti.App.Properties.setString("createdDate", e.tokenDetails.createdDate);
	Ti.App.Properties.setString("lastUpdatedDate", e.tokenDetails.lastUpdatedDate);
}


var currentToken = undefined;
var winQuestion = undefined;

function questionCallBack(e) {
	if (winQuestion != undefined) {
		winQuestion.close();
	}
	Ti.App.Properties.setBool("isLoggedIn_mSupplier", true);
	isLoggedIn = true;
	
	Ti.App.Properties.setObject("LoginDetaisObj", e);
	setTokenData(e);
	closeLoginView();
	
	$.btnNavLogin.title = Alloy.Globals.selectedLanguage.logout;
	$.helpBackView.right = (Alloy.isTablet) ? 85 : 70;
	$.btnNavLogin.width = Ti.UI.SIZE;
	loadISupplierSerViceList();
	objDetail = Ti.App.Properties.getObject("LoginDetaisObj");
	
	if (!isFromNavBar) {
		gotoNextScreen(selectedRowInfo);
	}
}


function askForQuestion(e) {
		
	var payload = {};
	payload.arrQuestion = e.arrQuestion;
	payload.callBack = questionCallBack;
	payload.pageTitle = Alloy.Globals.selectedLanguage.iSupplier;

	payload.obj = {
		password : $.txtPassword.value.trim(),
		userName : $.txtUsername.value.trim(),
		typeOfService : "mSupp"
	};

	payload.serviceId = 6;
	winQuestion = Alloy.createController("TaxVat/winQuestion", payload).getView();
	// Alloy.Globals.openWindow(win);

	if (OS_IOS) {
		winQuestion.open({
			modal : true
		});
	} else {
		winQuestion.open();
	}
}

function doLogin(e) {
	$.txtUsername.blur();
	$.txtPassword.blur();
	if ($.txtUsername.value.trim().length == 0 || $.txtPassword.value.trim().length == 0) {
		Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.login, Alloy.Globals.selectedLanguage.enterLoginPassword);
		return;
	}
	//"imtantawi@mof.gov.ae","123456"
	httpManager.ISupplierLogin($.txtUsername.value.trim(), $.txtPassword.value.trim(), function(e) {
		/*
		if (e != null) {
			if (e.tokenDetails.status != "Success") {
				if (Alloy.Globals.isEnglish) {
					Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.iSupplier, e.tokenDetails.description_En);
				} else {
					Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.iSupplier, e.tokenDetails.description_Ar);
				}
			} else {
				var questionTimeout = setTimeout(function() {
					currentAttempt = 0;
					askForQuestion(e);
					clearTimeout(questionTimeout);
				}, 400);
				currentToken = e;
			}
		}
		*/
		if (e != null) {
			Ti.API.info(">>>>>iSupplier user object" + JSON.stringify(e));

			var questionTimeout = setTimeout(function() {
				askForQuestion(e);
				clearTimeout(questionTimeout);
			}, 400);
			// currentToken = e;
			return;

		}
	});

}

function getPurchaseOrder(rowInfo) {
	httpManager.ISupplierPurchaseOrder(Ti.App.Properties.getObject("LoginDetaisObj").general_Profile.vendor_id, function(e) {
		Ti.API.info(JSON.stringify(e));
		if (e != null) {
			if (e.tokenDetails.tokenResponseStatus == "Success") {
				setTokenData(e);
				var NextWindow = Alloy.createController(rowInfo.winPath, e).getView();
				Alloy.Globals.openWindow(NextWindow);
			} else {
				if (e.tokenDetails.tokenStatus.toLowerCase() == "expired") {
					alert.message = (Alloy.Globals.isEnglish) ? e.tokenDetails.tokenResponseDescription_En : e.tokenDetails.tokenResponseDescription_Ar;
					alert.show();
				} else {
					if (Alloy.Globals.isEnglish) {
						Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.iSupplier, e.tokenDetails.tokenResponseDescription_En);
					} else {
						Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.iSupplier, e.tokenDetails.tokenResponseDescription_Ar);
					}
				}
			}
		}

	});
}

function gotoNextScreen(rowInfo) {
	
	//Ti.API.info("msupplier Home selected index :" + index);
	Ti.API.info("msupplier Home selected Row Info :" + JSON.stringify(rowInfo));
	var objDetail = Ti.App.Properties.getObject("LoginDetaisObj");
	Ti.API.info("iSupp user obj :" + JSON.stringify(objDetail));
	switch(rowInfo.module) {
	case "SUP_REGISTER":
		//new
		$.btnEmail.title = Alloy.Globals.selectedLanguage.userRegistration;
		$.btnSubmit.title = Alloy.Globals.selectedLanguage.submitTitle;
		showEmailPopupView();
		break;
		
		
	case "SUP_RENEWAL":
	    //new
		// Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.iSupplier, "Renewal Work in progress");
			// return;
		if (!Ti.App.Properties.getBool("isLoggedIn_mSupplier")) {
			openHelpScreen();
		} else {
		/*	if(objDetail.general_Profile.isRenewalAllowed != "Y"){
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.renewal, Alloy.Globals.selectedLanguage.notAccessRenewal);
				return;
			}*/
			var NextWindow = Alloy.createController(rowInfo.winPath).getView();
			Alloy.Globals.openWindow(NextWindow);
		}
		break;
	case "ADD_NEWUSER":
	    //new
	    if (!Ti.App.Properties.getBool("isLoggedIn_mSupplier")) {
			PopUPLoginForm(false);
		} else {
			//var NextWindow = Alloy.createController(rowInfo.winPath).getView();
			//Alloy.Globals.openWindow(NextWindow);
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.iSupplier, Alloy.Globals.selectedLanguage.noDataAvailableAtTheMoment);
			
		}
		break;
	case "PURCHASEORDERS":
	   //new
	   if (!Ti.App.Properties.getBool("isLoggedIn_mSupplier")) {
			PopUPLoginForm(false);
		} else {
			getPurchaseOrder(rowInfo);
		}
		break;
		
	case "GET_INVOICES":
	    //new
	    if (!Ti.App.Properties.getBool("isLoggedIn_mSupplier")) {
			PopUPLoginForm(false);
		} else {
		    $.btnOk.title = Alloy.Globals.selectedLanguage.invoices;
			$.btnOkBig.title = Alloy.Globals.selectedLanguage.getInvoices;
			isfromInvoice = true;
			showOrdInvPopupView();
		}
		break;
		
	   
    case "GET_PAYMENTS":
      //new
       if (!Ti.App.Properties.getBool("isLoggedIn_mSupplier")) {
			PopUPLoginForm(false);
		} else {
	        $.btnOk.title = Alloy.Globals.selectedLanguage.payments;
			$.btnOkBig.title = Alloy.Globals.selectedLanguage.getPayments;
			isfromInvoice = false;
			showOrdInvPopupView();
		}
		break;
	case "TENDERS":
		//new
		var NextWindow = Alloy.createController(rowInfo.winPath).getView();
		Alloy.Globals.openWindow(NextWindow);
		break;
	case "SUPPORT":
	    //new
	    if (!Ti.App.Properties.getBool("isLoggedIn_mSupplier")) {
			PopUPLoginForm(false);
		} else {
			httpManager.getAllFMISTickets(function(e) {
				if (e != null) {
					Ti.API.info(e);
					var nextWindow = Alloy.createController(rowInfo.winPath, e.arrData).getView();
					Alloy.Globals.openWindow(nextWindow);
				}
			});
		}
		break;
		
			
    case "PROFILE":
    //new
      if (!Ti.App.Properties.getBool("isLoggedIn_mSupplier")) {
			PopUPLoginForm(false);
		} else {
			/*
			var NextWindow = Alloy.createController(rowInfo.winPath, Ti.App.Properties.getObject("LoginDetaisObj")).getView();
			Alloy.Globals.openWindow(NextWindow);
			*/
			
			
			
			Ti.App.Properties.setString("mappingId",objDetail.general_Profile.isupplierMappingId);
			
			httpManager.getFirstStepRegistration(objDetail.general_Profile.isupplierRegisterId, objDetail.general_Profile.isupplierMappingId, function(e) {
				
				Ti.API.info('e=='+JSON.stringify(e));
				
				if (e == null) {
						return;
				}
				
				if (e.status == "S") {
					
					var payLoad = {
						doc : e,
						noteToSupplier : "",
						paymentStatus : "",
						supplierStatus :"R" //e.status,
					};
					
					var win = Alloy.createController(rowInfo.winPath, payLoad).getView();
					Alloy.Globals.openWindow(win);
				
				
				}else{
					Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.iSupplier, Alloy.Globals.selectedLanguage.noRecordFound);	
					
				}
				
			});
			
			/*
			httpManager.getFirstStepRegistration(Ti.App.Properties.getObject("LoginDetaisObj").general_Profile.isupplierRegisterId, Ti.App.Properties.getObject("LoginDetaisObj").general_Profile.isupplierMappingId, function(e) {
				
				Ti.API.info('e=='+JSON.stringify(e));
				
				if (e == null) {
					return;
				}
				
				//if (e.status == "S") {
					var win = Alloy.createController(rowInfo.winPath, e).getView();
					Alloy.Globals.openWindow(win);
				
				//}else{
					//Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.iSupplier, Alloy.Globals.selectedLanguage.noRecordFound);	
				//}
			});
			*/
		}
		break;
	default :
		var NextWindow = Alloy.createController(rowInfo.winPath).getView();
		Alloy.Globals.openWindow(NextWindow);
		break;
	}
}

function closeLoginView() {
	$.backView.visible = false;
	$.loginView.visible = false;
	$.txtUsername.value = $.txtPassword.value = "";
	$.txtUsername.blur();
	$.txtPassword.blur();
}

function showForgotPasswordView() {
	//$.forgotPasswordView.visible = true;
}

function closeForgotPasswordView() {
	$.forgotPasswordView.visible = false;
}

function openRegistration() {
	var winRegistration = Alloy.createController("winRegistration").getView();
	if (OS_IOS) {
		winRegistration.open({
			modal : true
		});
	} else {
		winRegistration.open();
	}
}
var prevOption = 0;
$.imgByPurchaseOrderTick.backgroundImage = Alloy.Globals.path.icnChecked;
function optionSelected(e) {

	if (e.source.obj == prevOption) {
		$.imgByPurchaseOrderTick.backgroundImage = Alloy.Globals.path.icnUnChecked;
		$.imgByInvoiceNumberTick.backgroundImage = Alloy.Globals.path.icnUnChecked;
		prevOption = 0;
		$.txtOrdInvNo.value = "";
		return;
	}

	if (e.source.obj == 1 && $.imgByPurchaseOrderTick.backgroundImage == Alloy.Globals.path.icnUnChecked) {
		$.imgByPurchaseOrderTick.backgroundImage = Alloy.Globals.path.icnChecked;
		$.imgByInvoiceNumberTick.backgroundImage = Alloy.Globals.path.icnUnChecked;
		prevOption = e.source.obj;
		$.txtOrdInvNo.value = "";
		$.lblordInvDesc.text = Alloy.Globals.selectedLanguage.enterOrderNo;

	} else if (e.source.obj == 2 && $.imgByInvoiceNumberTick.backgroundImage == Alloy.Globals.path.icnUnChecked) {
		$.imgByPurchaseOrderTick.backgroundImage = Alloy.Globals.path.icnUnChecked;
		$.imgByInvoiceNumberTick.backgroundImage = Alloy.Globals.path.icnChecked;
		prevOption = e.source.obj;
		$.txtOrdInvNo.value = "";
		$.lblordInvDesc.text = Alloy.Globals.selectedLanguage.enterInvoiceNo;
	} 

}
function closeEmailView() {
	$.backView.visible = false;
	$.emailPopupView.visible = false;
	$.txtEmail.value = "";
	$.txtEmail.blur();
}

function showEmailPopupView() {

	$.lblEmailDesc.text = Alloy.Globals.selectedLanguage.enterEmailAddress;

	$.backView.visible = true;
	$.emailPopupView.visible = true;
}

function checkEmailRegistration() {

	$.txtEmail.blur();
//	$.txtPassword.blur();
	if ($.txtEmail.value.trim().length == 0) {
		Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.userRegistration, Alloy.Globals.selectedLanguage.enterEmail);
		return;
	} else if (Alloy.Globals.validateEmail($.txtEmail.value.trim()) == false) {
		Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.userRegistration, Alloy.Globals.selectedLanguage.enterValidEmailMsg);
		return;
	}
	
	var paymentStatus;
	var noteToSupplier;	
	var registerId;
	var mappingId;
	
	httpManager.checkEmailRegistration($.txtEmail.value.trim(), function(e) {
		Ti.API.info(JSON.stringify(e));

		if (e == null) {
			return;
		}
		
		paymentStatus = e.paymentStatus;
		noteToSupplier = e.noteToSupplier;	
		
		registerId = e.registeredId;
		mappingId = e.mappingId;
		
	if (e.status == "D") {	// Draft user
			
			
			Ti.App.Properties.setString("mappingId",mappingId);
			var delay = setTimeout(function(e) {
				httpManager.getFirstStepRegistration(registerId, mappingId, function(e) {
				
				Ti.API.info('e=='+JSON.stringify(e));
				
				if (e == null) {
						return;
				}
				
				if (e.status == "S") {
					
					var payLoad = {
						doc : e,
						noteToSupplier : "",
						paymentStatus : "",
						supplierStatus : "D",
					};
					
					
					var win = Alloy.createController("ISupplier/winResumeRegistration", payLoad).getView();
					Alloy.Globals.openWindow(win);
					$.backView.visible = false;
					$.emailPopupView.visible = false;
				
				}else{
					Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.iSupplier, Alloy.Globals.selectedLanguage.noRecordFound);	
					
				}
				
			});
			
		}, 400);
			

	 } else if(e.status == "N") {	// New user
			
			//	var win = Alloy.createController("ISupplier/winPaymentStatus").getView();

			var win = Alloy.createController("ISupplier/winISupplierRegistration",$.txtEmail.value).getView();
			Alloy.Globals.openWindow(win);
			$.backView.visible = false;
			$.emailPopupView.visible = false;
			
	}else if(e.status == "R") { // MoF wants more details from user
			
			var alert = Ti.UI.createAlertDialog({
				title : Alloy.Globals.selectedLanguage.iSupplier,
				message : (Alloy.Globals.isEnglish) ? e.enMsg : e.arMsg,
				buttonNames : [Alloy.Globals.selectedLanguage.ok]
			});
			alert.addEventListener('click', function(e) {
			
			Ti.App.Properties.setString("mappingId",mappingId);
			var delay = setTimeout(function(e) {
			httpManager.getFirstStepRegistration(registerId, mappingId, function(e) {
				
				Ti.API.info('e=='+JSON.stringify(e));
				
				if (e == null) {
						return;
				}
				
				if (e.status == "S") {
					
					var payLoad = {
						doc : e,
						noteToSupplier : noteToSupplier,
						paymentStatus : paymentStatus,
						supplierStatus : "R",
					};
					
					var win = Alloy.createController("ISupplier/winResumeRegistration", payLoad).getView();
					Alloy.Globals.openWindow(win);
					$.backView.visible = false;
					$.emailPopupView.visible = false;
				
				}else{
					Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.iSupplier, Alloy.Globals.selectedLanguage.noRecordFound);	
					
				}
				
			});
			
		}, 200);
			});
			alert.show();
			
			
			
	}else if(e.status == "RE") { // MoF rejected its request.
			
		//	Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.iSupplier, (Alloy.Globals.isEnglish) ? e.enMsg : e.arMsg);
			
			var alert = Ti.UI.createAlertDialog({
				title : Alloy.Globals.selectedLanguage.iSupplier,
				message : (Alloy.Globals.isEnglish) ? e.enMsg : e.arMsg,
				buttonNames : [Alloy.Globals.selectedLanguage.ok]
			});
			alert.addEventListener('click', function(e) {
			
			Ti.App.Properties.setString("mappingId",mappingId);
			var win = Alloy.createController("ISupplier/winISupplierRegistration",$.txtEmail.value).getView();
			Alloy.Globals.openWindow(win);
			$.backView.visible = false;
			$.emailPopupView.visible = false;
			
			});
			alert.show();
			
			
	}else {
		
		// (e.status == "P") { // Payment is done but Pending for approval from MoF
		// if(e.status == "A") { // Approved user
		
		Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.iSupplier, (Alloy.Globals.isEnglish) ? e.enMsg : e.arMsg);
	}

	});

}

function closeOrdInvView() {
	$.backView.visible = false;
	$.ordInvPopupView.visible = false;
	$.txtOrdInvNo.value = "";
	$.txtOrdInvNo.blur();
}

function showOrdInvPopupView() {
	if (isfromInvoice) {
		$.lblordInvDesc.text = Alloy.Globals.selectedLanguage.enterOrderNo;
		//$.optionView.height = 40;
		$.optionView.height = 0;
		
	} else {
		$.lblordInvDesc.text = Alloy.Globals.selectedLanguage.enterInvoiceNo;
		$.optionView.height = 0;
	}
	$.backView.visible = true;
	$.ordInvPopupView.visible = true;
}

function callOrdInvService() {
	$.txtOrdInvNo.blur();
	if ($.txtOrdInvNo.value.trim().length == 0) {
		Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.iSupplier, Alloy.Globals.selectedLanguage.enterValidNo);
		return;
	}
	if (isfromInvoice) {
		httpManager.ISupplierInvoices_By_PurchaseOrderNumber(Ti.App.Properties.getObject("LoginDetaisObj").general_Profile.vendor_id,$.txtOrdInvNo.value.trim()/*'1221420000011'*/, function(e) {
			Ti.API.info(JSON.stringify(e));
			if (e != null) {
				if (e.tokenDetails.tokenResponseStatus == "Success") {
					setTokenData(e);
					var NextWindow = Alloy.createController("ISupplier/winInvoice", {
						data : e,
						orderNo : $.txtOrdInvNo.value.trim()//'1221420000011'
					}).getView();
					closeOrdInvView();
					Alloy.Globals.openWindow(NextWindow);
				} else {
					if (e.tokenDetails.tokenStatus.toLowerCase() == "expired") {
						alert.message = (Alloy.Globals.isEnglish) ? e.tokenDetails.tokenResponseDescription_En : e.tokenDetails.tokenResponseDescription_Ar;
						alert.show();
					} else {
						if (Alloy.Globals.isEnglish) {
							Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.iSupplier, e.tokenDetails.tokenResponseDescription_En);
						} else {
							Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.iSupplier, e.tokenDetails.tokenResponseDescription_Ar);
						}
					}
				}

			}

		});

	} else {
		httpManager.ISupplierPayments(Ti.App.Properties.getObject("LoginDetaisObj").general_Profile.vendor_id,$.txtOrdInvNo.value.trim()/*'286554'*/, function(e) {
			Ti.API.info(JSON.stringify(e));
			if (e != null) {
				if (e.tokenDetails.tokenResponseStatus == "Success") {
					setTokenData(e);
					var NextWindow = Alloy.createController("ISupplier/winPayments", {
						data : e,
						invoiceNo : $.txtOrdInvNo.value.trim()//'286554'
					}).getView();
					closeOrdInvView();
					Alloy.Globals.openWindow(NextWindow);
				} else {
					if (e.tokenDetails.tokenStatus.toLowerCase() == "expired") {
						alert.message = (Alloy.Globals.isEnglish) ? e.tokenDetails.tokenResponseDescription_En : e.tokenDetails.tokenResponseDescription_Ar;
						alert.show();
					} else {
						if (Alloy.Globals.isEnglish) {
							Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.iSupplier, e.tokenDetails.tokenResponseDescription_En);
						} else {
							Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.iSupplier, e.tokenDetails.tokenResponseDescription_Ar);
						}
					}
				}
			}
		});
	}
}

$.tblISupplierList.addEventListener('click', function(e) {
	
	//selectedIndex = e.index;
	selectedRowInfo = e.row.doc;
	if (e.row.doc.module  == "TENDERS") {
		httpManager.ISupplierTenders('Tenders,Bids', function(e) {
			if (e.length > 0) {
				var NextWindow = Alloy.createController(selectedRowInfo.winPath, e).getView();
				Alloy.Globals.openWindow(NextWindow);
			}
		});
	} else {
		isFromNavBar = false;
		
		
			gotoNextScreen(selectedRowInfo);
		
	}

});


$.winISupplierHome.addEventListener("androidback", function(e) {
	if ($.loginView.visible) {
		$.loginView.visible = false;
		$.backView.visible = false;
		return;
	} else if ($.ordInvPopupView.visible) {
		$.ordInvPopupView.visible = false;
		$.backView.visible = false;
		return;
	} else if ($.emailPopupView.visible) {
		$.emailPopupView.visible = false;
		$.backView.visible = false;
		return;
	} else if ($.instructionView.opacity == 1) {
		$.instructionView.animate({
			opacity : 0,
			duration : 300
		}, function() {
			if (OS_ANDROID) {
				$.instructionView.visible = false;
			}
		});
		$.instructionView.isOpen = false;
		return;
	}
	closeWindow();
	
});

/*
 * Instruction
 */

var density;
if (OS_IOS) {
	density = "dp";
} else {
	density = "px";
}

$.lblInstTitle.text = "DESCRIPTION The standard Lorem Ipsum passage";
$.lblInstContent.text = "The standard Lorem Ipsum passage, used since the 1500s Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Section 1.10.32 of de Finibus Bonorum et Malorum, written by Cicero in 45 BC Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? 1914 translation by H. Rackham But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?Section 1.10.33 of de Finibus Bonorum et Malorum, written by Cicero in 45 BC At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.1914 translation by H. Rackham On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains.";

/*function getServiceDescription() {
 if (serviceDescription == null) {
 httpManager.getServiceDescription(106, function(e) {
 Ti.API.info('>>>>>>>'+JSON.stringify(e))
 if (e == null) {
 return;
 }
 serviceDescription = e;
 });
 } else {
 openHelpScreen();
 }
 }*/

$.btnApply.addEventListener("click", function(arg) {
	openHelpScreen();
	PopUPLoginForm(false);
});
$.btnNo.addEventListener("click", function(arg) {
	openHelpScreen();
});

function openHelpScreen() {
	
	if ($.instructionView.isOpen) {
		// $.instructionView.opacity = 0;
		$.instructionView.animate({
			opacity : 0,
			duration : 300
		}, function() {
			showDescription();
			if (OS_ANDROID) {
				$.instructionView.visible = false;
			}
		});

	} else {
		$.instructionView.visible = true;
		//$.wb.html = Alloy.Globals.GetFormattedHtml((Alloy.Globals.isEnglish) ? 1 : 2,(Alloy.Globals.isEnglish) ? serviceDescription.descriptionEn : serviceDescription.descriptionAr ,0);
		$.wb.html = Alloy.Globals.GetFormattedHtml((Alloy.Globals.isEnglish) ? 1 : 2, htmlContent, parseInt($.fontSlider.value) / 100,!$.imgTheme.isDefaultTheme);
		$.instructionView.animate({
			opacity : 1,
			duration : 300
		});

	}
	$.instructionView.isOpen = !$.instructionView.isOpen;
}

function changeTheme() {
	if ($.imgTheme.isDefaultTheme) {
		$.sliderView.backgroundColor = "black";
		$.imgTheme.image = Alloy.Globals.path.icnThemeLight;
		$.imgFontSize.image = Alloy.Globals.path.icnFontChangeWhite;
		$.lblAMinus.color = $.lblAPlus.color = $.instructionSeparator.backgroundColor = "white";
		$.wb.backgroundColor = "#000";
		
		if (OS_ANDROID) {
			$.instructionPopup.backgroundColor = "black";
		} else {
			$.instructionPopup.animate({
				backgroundColor : "black",
				duration : 600
			});
		}
		$.lblInstTitle.color = $.lblInstContent.color = "white";
	} else {
		$.sliderView.backgroundColor = "white";
		$.imgTheme.image = Alloy.Globals.path.icnThemeDark;
		$.imgFontSize.image = Alloy.Globals.path.icnFontChangeDark;
		$.lblAMinus.color = $.lblAPlus.color = $.instructionSeparator.backgroundColor = Alloy.Globals.path.grayColor;
		$.wb.backgroundColor = "#FFF";
		
		if (OS_ANDROID) {
			$.instructionPopup.backgroundColor = "white";
		} else {

			$.instructionPopup.animate({
				backgroundColor : "white",
				duration : 600
			});
		}
		$.lblInstTitle.color = $.lblInstContent.color = "black";
	}
	if ($.lblSteps.isSelected) {
		$.wb.html = Alloy.Globals.GetFormattedHtml((Alloy.Globals.isEnglish) ? 1 : 2, htmlStep, parseInt($.fontSlider.value) / 100,$.imgTheme.isDefaultTheme);
	} else {
		$.wb.html = Alloy.Globals.GetFormattedHtml((Alloy.Globals.isEnglish) ? 1 : 2, htmlContent, parseInt($.fontSlider.value) / 100,$.imgTheme.isDefaultTheme);
	}
	$.imgTheme.isDefaultTheme = !$.imgTheme.isDefaultTheme;
}

function showSlider() {
	if ($.sliderView.isOpen) {
		$.sliderView.animate({
			bottom : -60,
			duration : 500
		});
	} else {
		$.sliderView.animate({
			bottom : 0,
			duration : 500
		});
	}
	$.sliderView.isOpen = !$.sliderView.isOpen;
}

$.fontSlider.addEventListener("change", function(e) {
	var value = e.value;
	Ti.API.info('>>>>>>>>' + value / 10);
	//$.wb.html = Alloy.Globals.GetFormattedHtml((Alloy.Globals.isEnglish) ? 1 : 2, parseInt(value) / 100);
	if ($.lblSteps.isSelected) {
		$.wb.html = Alloy.Globals.GetFormattedHtml((Alloy.Globals.isEnglish) ? 1 : 2, htmlStep, parseInt(value) / 100,!$.imgTheme.isDefaultTheme);
	} else {
		$.wb.html = Alloy.Globals.GetFormattedHtml((Alloy.Globals.isEnglish) ? 1 : 2, htmlContent, parseInt(value) / 100,!$.imgTheme.isDefaultTheme);
	}
	// $.lblInstTitle.font = {
	// fontSize : (parseFloat(value) + 3) + "sp"
	// };
	// $.lblInstContent.font = {
	// fontSize : parseFloat(value) + "sp"
	// };
});

function showDescription() {
	if ($.lblDescription.isSelected) {
		return;
	}
	$.lblDescription.isSelected = true;
	$.lblDescription.color = Alloy.Globals.path.navBarColor;

	$.scrInstruction.animate({
		opacity : 0,
		duration : 300
	}, function(e) {
		$.lblInstTitle.text = "DESCRIPTION The standard Lorem Ipsum passage";
		$.lblInstContent.text = "The standard Lorem Ipsum passage, used since the 1500s Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Section 1.10.32 of de Finibus Bonorum et Malorum, written by Cicero in 45 BC Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? 1914 translation by H. Rackham But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?Section 1.10.33 of de Finibus Bonorum et Malorum, written by Cicero in 45 BC At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.1914 translation by H. Rackham On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains.";
		//$.wb.html = Alloy.Globals.GetFormattedHtml((Alloy.Globals.isEnglish) ? 1 : 2,(Alloy.Globals.isEnglish) ? serviceDescription.descriptionEn : serviceDescription.descriptionAr ,0);
		$.wb.html = Alloy.Globals.GetFormattedHtml((Alloy.Globals.isEnglish) ? 1 : 2, htmlContent, parseInt($.fontSlider.value) / 100,!$.imgTheme.isDefaultTheme);
		$.scrInstruction.animate({
			opacity : 1,
			duration : 300
		});
	});

	$.lblSteps.isSelected = false;
	$.lblSteps.color = Alloy.Globals.path.darkGrayColor;

	$.tabSeparator.animate({
		left : 0,
		duration : 300
	});
}

function showSteps() {
	if ($.lblSteps.isSelected) {
		return;
	}
	$.lblDescription.isSelected = false;
	$.lblDescription.color = Alloy.Globals.path.darkGrayColor;

	$.lblSteps.isSelected = true;
	$.lblSteps.color = Alloy.Globals.path.navBarColor;

	$.scrInstruction.animate({
		opacity : 0,
		duration : 300
	}, function(e) {
		$.lblInstTitle.text = "STEPS The standard Lorem Ipsum passage";
		$.lblInstContent.text = "The standard Lorem Ipsum passage, used since the 1500s Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Section 1.10.32 of de Finibus Bonorum et Malorum, written by Cicero in 45 BC Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? 1914 translation by H. Rackham But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?Section 1.10.33 of de Finibus Bonorum et Malorum, written by Cicero in 45 BC At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.1914 translation by H. Rackham On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains.";
		//$.wb.html = Alloy.Globals.GetFormattedHtml((Alloy.Globals.isEnglish) ? 1 : 2,(Alloy.Globals.isEnglish) ? serviceDescription.stepsEn : serviceDescription.stepsAr ,0);
		$.wb.html = Alloy.Globals.GetFormattedHtml((Alloy.Globals.isEnglish) ? 1 : 2, htmlStep, parseInt($.fontSlider.value) / 100,!$.imgTheme.isDefaultTheme);
		$.scrInstruction.animate({
			opacity : 1,
			duration : 300
		});
	});

	var separatorLeft;
	if (OS_IOS) {
		if (Ti.Gesture.orientation == 3 || Ti.Gesture.orientation == 4) {
			separatorLeft = ((Alloy.Globals.platformHeight - 10) / 2);
		} else if (Ti.Gesture.orientation == 1 || Ti.Gesture.orientation == 2) {
			separatorLeft = ((Alloy.Globals.platformWidth - 10) / 2);
		}
	} else {
		if (Ti.Gesture.orientation == 2) {
			separatorLeft = ((Alloy.Globals.platformHeight - 10) / 2);
		} else if (Ti.Gesture.orientation == 1) {
			separatorLeft = ((Alloy.Globals.platformWidth - 10) / 2);
		}
	}
	if (Alloy.isTablet) {
		separatorLeft = 300;
	} else {
		separatorLeft += density;
	}

	$.tabSeparator.animate({
		left : separatorLeft,
		duration : 300
	});
}

/*
 *
 *
 */
//var openHelpScreen = $.viewInstructions.openHelpScreen;


$.winISupplierHome.addEventListener("focus",function(e){
	$.viewBottomToolbar.setDefaultTheme($.winISupplierHome);
});
$.viewBottomToolbar.setDefaultTheme($.winISupplierHome);



/**
 * Adding the eventlistener for the bottom bar view
 * 
 * @param {Object} e
 */
$.viewBottomToolbar.getView().addEventListener('click',function(e){
	if(e.source.buttonId == 'btnFontChange'){
		$.viewBottomToolbar.changeFont($.winISupplierHome);
	}else if(e.source.buttonId == 'btnSystemFeedback'){
		$.viewBottomToolbar.openFeedbackScreen(e);
	}else if(e.source.buttonId == 'btnSystemInstruction'){
		//$.viewInstructions.openHelpScreen(e);
	}else if(e.source.buttonId == 'btnSystemChangeTheme'){
		$.viewBottomToolbar.changeTheme($.winISupplierHome);
	}
});

/**
 * Called on open of the window
 * 
 * @param {Object} e
 */
var windowOpened = function(e){
	$.viewBottomToolbar.setOptions({
		showThemeButton : true,
		showInstructions : false,
		showFeedBack :true,
		showFontResize:true
	});
};

/**
 * Window is closed
 * 
 * @param {Object} e
 */
var windowClosed = function(e){
	if(args != undefined){
		args.callback();
	}
	$.destroy();
};


loadISupplierSerViceList();

changeLanguage();
