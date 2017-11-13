var httpManager = require("httpManager");
//Alloy.createController('common/httpManager');
var arrLanguage = [];
var selectedWindowPath;
var isWinFocus = true;
var isModuleClicked = false;
var isLeftPanelOpened = false;
var timeOut = null;
var timeInterval = null;
var arrModules = [],
    arrBanners = [],
    isFromDb = false;

if (Alloy.Globals.isIOS7Plus) {
	$.statusBar.height = 20;
	$.mainView.top = 20;

}

// var arrImages = [{
// images : Alloy.Globals.path.imgBanner
// }, {
// images : Alloy.Globals.path.imgBanner1
// }, {
// images : Alloy.Globals.path.imgBanner2
// }];

function getBannerImages() {
	httpManager.getBanners(function(e) {
		Ti.API.info('banners == ' + JSON.stringify(e));

		Alloy.Globals.DBManager.deleteHomeImages();

		arrBanners = e;
		isFromDb = false;
		loadBannerImages();
	});
}

function getHomeImagesFromDatabase() {
	arrBanners = Alloy.Globals.DBManager.getHomeImages();
	if (arrBanners.length == 0) {
		getBannerImages();
	} else if (arrBanners[0].total_images > arrBanners.length) {
		getBannerImages();
	} else {
		isFromDb = true;
		loadBannerImages();
	}

}

var arrPageViews = [];
var prePageIndex = 0;
function loadBannerImages() {

	if (arrBanners.length == 0) {
		$.imgBanBackView.visible = true;
	} else {
		$.imgBanBackView.visible = false;
	}
	$.pagecontrollerView.removeAllChildren();
	arrPageViews = [];
	prePageIndex = 0;
	$.imgBannerView.backgroundImage = "ab";
	if (timeInterval != null) {
		clearInterval(timeInterval);
		timeInterval = null;
	}

	var arr = [];

	for (var i = 0; i < arrBanners.length; i++) {

		var view = Ti.UI.createView({
			width : "100%",
			height : "100%",
			backgroundColor : "transparent",
		});

		var image = Ti.UI.createImageView({
			width : "100%",
			height : "100%",
			defaultImage : Alloy.Globals.path.defaultImageBanner,
			image : arrBanners[i].url,
			image_url : (isFromDb) ? arrBanners[i].image_url : arrBanners[i].url,
		});

		var viewPage = Ti.UI.createView({
			width : (Alloy.isTablet) ? 15 : 10,
			height : (Alloy.isTablet) ? 15 : 10,
			left : 3,
			right : 3,
			backgroundColor : Alloy.Globals.path.whiteColor,
			borderColor : Alloy.Globals.path.goldColor,
			borderRadius : (Alloy.isTablet) ? 7 : 5
		});
		$.pagecontrollerView.add(viewPage);
		arrPageViews.push(viewPage);
		if (i == 0) {
			viewPage.backgroundColor = Alloy.Globals.path.goldColor;
		}

		image.addEventListener("load", function(e) {

			Ti.API.info('isFrom ' + isFromDb + ' URL = ' + e.source.image_url);
			if (!Alloy.Globals.DBManager.isHomeImageExists(e.source.image_url)) {
				var imageBlob = "";
				try {
					if (OS_IOS) {
						imageBlob = Titanium.Utils.base64encode(e.source.toImage());
					} else {
						imageBlob = Titanium.Utils.base64encode(e.source.toImage().media);
					}
				} catch(e) {

				}
				Alloy.Globals.DBManager.saveHomeImages({
					url : e.source.image_url,
					imageData : imageBlob,
					total_image : arrBanners.length
				});
			}
		});

		view.add(image);

		arr.push(view);

	}

	$.scrollableBannerView.views = arr;
	$.scrollableBannerView.currentPage = 0;

	/*timeInterval = setInterval(function(e) {
	 // This function set the current page of the banner view in banner scrollview
	 if (($.scrollableBannerView.currentPage + 1) >= arrBanners.length) {
	 $.scrollableBannerView.scrollToView(0);
	 } else {
	 $.scrollableBannerView.scrollToView($.scrollableBannerView.currentPage + 1);
	 }
	 // t++;
	 }, 3000);*/

}

var prePageIndex = 0;
$.scrollableBannerView.addEventListener("scrollend", function(e) {
	if (prePageIndex == e.currentPage)
		return;
	arrPageViews[e.currentPage].backgroundColor = Alloy.Globals.path.goldColor;
	arrPageViews[prePageIndex].backgroundColor = Alloy.Globals.path.whiteColor;
	prePageIndex = e.currentPage;
});

function getCertificateLanguage(canOpenPopup) {
	if (arrLanguage.length == 0) {
		httpManager.getCertificateLanguage(function(arr) {
			if (arr.length > 0) {

				arrLanguage = arr;
				loadOptions(arr);
				if (canOpenPopup) {
					$.instructionView.visible = true;
					$.instructionView.animate({
						opacity : 1,
						duration : 300
					});
				}
			}
		});
	} else {
		loadOptions(arrLanguage);
		$.instructionView.visible = true;
		$.instructionView.animate({
			opacity : 1,
			duration : 300
		});
	}
}

function openLanguageScreen() {

	if ($.instructionView.isOpen) {
		$.instructionView.animate({
			opacity : 0,
			duration : 300
		}, function() {
			if (OS_ANDROID) {
				$.instructionView.visible = false;
			}
		});

	} else {
		getCertificateLanguage(true);
	}
	$.instructionView.isOpen = !$.instructionView.isOpen;
}

var arrLanguageOption = [];
var preOption = undefined;
function loadOptions(data) {
	arrLanguageOption = [];
	var options = [];
	$.optionsDetailView.removeAllChildren();

	for (var index = 0; index < data.length; index++) {
		isLanguageSelected = false;
		var viewOption = Ti.UI.createView({
			top : 10,
			left : 0,
			right : 0,
			height : (Alloy.isTablet) ? 36 : 30,//'6%',
		});

		var viewOptionCheckBox = Ti.UI.createView({
			top : 0,
			left : Alloy.Globals.isEnglish ? 0 : undefined,
			right : Alloy.Globals.isEnglish ? undefined : 0,
			width : (Alloy.isTablet) ? 36 : 30, //'10%',
			height : (Alloy.isTablet) ? 36 : 30, //'100%',
			borderRadius : (Alloy.isTablet) ? 18 : 15, //6,
			borderWidth : 2,
			borderColor : Alloy.Globals.path.borderColor, //navBarColor,
			isSelected : false,
			obj : data[index]
		});

		viewOptionCheckBox.addEventListener('click', function(e) {
			if (e.source == preOption) {
				return;
			}

			if (preOption != undefined) {
				preOption.subViewSelected.backgroundColor = 'transparent';
				preOption.isSelected = false;
			}
			e.source.subViewSelected.backgroundColor = Alloy.Globals.path.navBarColor;
			e.source.isSelected = true;
			preOption = e.source;

		});

		var subViewSelected = Ti.UI.createView({
			// top : '20%',
			// left : Alloy.Globals.isEnglish ? '20%' : undefined,
			// right : Alloy.Globals.isEnglish ? undefined : '20%',
			width : (Alloy.isTablet) ? 24 : 20, //'60%',
			height : (Alloy.isTablet) ? 24 : 20, //'60%',
			borderRadius : (Alloy.isTablet) ? 12 : 10, //4,
			backgroundColor : 'transparent',
			touchEnabled : false
		});

		var labelOption = Ti.UI.createLabel({
			top : 0,
			left : Alloy.Globals.isEnglish ? (Alloy.isTablet) ? 45 : 40 : 0,
			right : Alloy.Globals.isEnglish ? 0 : (Alloy.isTablet) ? 45 : 40,
			width : '80%',
			height : '100%',
			color : Alloy.Globals.path.blackColor,
			textAlign : Alloy.Globals.isEnglish ? Ti.UI.TEXT_ALIGNMENT_LEFT : Ti.UI.TEXT_ALIGNMENT_RIGHT,
			text : data[index].title

		});

		viewOptionCheckBox.add(subViewSelected);
		viewOptionCheckBox.subViewSelected = subViewSelected;
		viewOption.add(viewOptionCheckBox);
		viewOption.add(labelOption);

		arrLanguageOption.push(viewOptionCheckBox);

		$.optionsDetailView.add(viewOption);
	}

};

var isLanguageSelected = false;
function VATTAXProceed() {
	for (var i = 0; i < arrLanguageOption.length; i++) {
		if (arrLanguageOption[i].isSelected) {
			if (arrLanguageOption[i].obj.id == 2) {
				Alloy.Globals.VATTAXisEnglish = true;
				Alloy.Globals.VTaxSelectedLanguage = Alloy.createController('common/english').language();
			} else {
				Alloy.Globals.VATTAXisEnglish = false;
				Alloy.Globals.VTaxSelectedLanguage = Alloy.createController('common/arabic').language();
			}
			isLanguageSelected = true;
		}
	}
	if (!isLanguageSelected) {
		Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.certificateLanguage, Alloy.Globals.selectedLanguage.selectLanguage);
		return;
	}
	openLanguageScreen();
	Alloy.Globals.isVATTAXModuleActive = true;
	if (Ti.App.Properties.getInt("isLoggedIn_VatTax") == true) {
		httpManager.getDeviceTokenInfo(Ti.App.Properties.getObject("LoginDetaisObj_VatTax").tokenDetails, 2, function(e) {
			Ti.API.info("iSupplier Logged in User Data :" + JSON.stringify(e));
			var win = Alloy.createController("TaxVat/winTaxVatHome", {
				callback : resetCallBack
			}).getView();
			Alloy.Globals.openWindow(win);
			isModuleClicked = true;
		});

	} else {
		var win = Alloy.createController("TaxVat/winTaxVatHome", {
			callback : resetCallBack
		}).getView();
		Alloy.Globals.openWindow(win);
		isModuleClicked = true;
	}
}

function loadUserData() {
	openLanguageScreen();
}

var openTaxVat = function(e) {
	Ti.API.info('VAT TAX CLICKED');
	if (isModuleClicked == false) {
		loadUserData();
	}
};
var openTakamul = function(e) {
	if (isModuleClicked == false) {
		isModuleClicked = true;
		var win = Alloy.createController("Takamul/winTakamulHome").getView();
		Alloy.Globals.openWindow(win);
	}

};
var openMyBudget = function(e) {
	if (isModuleClicked == false) {
		var status = syncBudgetCategories();
	}
};
var syncBudgetCategories = function() {
	var status = false;
	if (Ti.Network.online == false) {
		status = Alloy.Globals.DBManager.insertBudget_ExepenseCategories(Alloy.Globals.ExpenseCategories);
		var win = Alloy.createController("MyBudget/winMyBudgetLanding").getView();
		Alloy.Globals.openWindow(win);
		isModuleClicked = true;
	} else {
		httpManager.getBudgetExpenseCategories(function(arrOut) {
			Ti.API.info("returned BudgetExpensecategories  -----  >" + JSON.stringify(arrOut));
			status = Alloy.Globals.DBManager.insertBudget_ExepenseCategories(arrOut);
			var win = Alloy.createController("MyBudget/winMyBudgetLanding").getView();
			Alloy.Globals.openWindow(win);
			isModuleClicked = true;
		});
	}

};

function resetCallBack() {
	isModuleClicked = false;
	Alloy.Globals.isVATTAXModuleActive = false;
}

function loadiSupplierUserData() {
	if (Ti.App.Properties.getInt("isLoggedIn_mSupplier") == true) {
		/* Ramesh -- New Token service to be taken from SOA Guys Mar 30 */
		httpManager.getDeviceTokenInfo(Ti.App.Properties.getObject("LoginDetaisObj").tokenDetails, 1, function(e) {
			var win = Alloy.createController("ISupplier/winISupplierHome", {
				callback : resetCallBack
			}).getView();
			Alloy.Globals.openWindow(win);
			isModuleClicked = true;
		});
		// httpManager.ISupplierLogin(Ti.App.Properties.getObject("LoginDetaisObj").userInfo.userName, Ti.App.Properties.getObject("LoginDetaisObj").userInfo.password, function(e) {
		//
		// });
	} else {
		var win = Alloy.createController("ISupplier/winISupplierHome", {
			callback : resetCallBack
		}).getView();
		Alloy.Globals.openWindow(win);
		isModuleClicked = true;
	}
}

var openSuppliers = function(e) {
	Ti.API.info('M SUPPLIER CLICKED');
	if (isModuleClicked == false) {
		loadiSupplierUserData();
		isModuleClicked = true;
		Ti.API.info('openSuppliers()');
	}
};
var openReports_GFSReports = function(e) {
	if (isModuleClicked == false) {
		var win = Alloy.createController("Reports/GFSReports/winGFSReports").getView();
		Alloy.Globals.openWindow(win);
		isModuleClicked = true;
	}
};

var openReports_FederalFinalReports = function() {
	if (isModuleClicked == false) {
		httpManager.getAllYearsForRevenueKPI_COFOG_G2C(function(e) {
			if (e == null) {
				return;
			} else if (e.tokenStatus == "Expired") {
				Ti.App.Properties.setString("tokenStatus", "Expired");
				//closeWindow();
				return;
			}

			var payLoad = {
				arrData : e
			};

			var win = Alloy.createController("Reports/FederalFinalAccountReports/winFederalFinalAccountReport", payLoad).getView();
			Alloy.Globals.openWindow(win);
			isModuleClicked = true;
		});
	}
};

var openAboutMOF = function(e) {
	if (isModuleClicked == false) {
		httpManager.getAboutUs("AboutUs", function(e) {
			if (e != null) {
				var win = Alloy.createController("AboutUs/winAboutUs", e).getView();
				Alloy.Globals.openWindow(win);
				isModuleClicked = true;
			}

		});
	}
};
var openContactMOF = function(e) {
	if (isModuleClicked == false) {
		var win = Alloy.createController("Contact/winContacts").getView();
		Alloy.Globals.openWindow(win);
		isModuleClicked = true;
	}
};

var openNews = function(e) {
	if (isModuleClicked == false) {
		httpManager.getNewsWebservices(1, 10, function(newsObj) {
			if (newsObj != null) {
				var win = Alloy.createController("News/winNewsList", newsObj).getView();
				Alloy.Globals.openWindow(win);
				isModuleClicked = true;
				Ti.API.info("TITLE  ----------> " + JSON.stringify(newsObj));
			}
		});
	}
};

function openRegistration() {
	if (isModuleClicked == false) {
		var winRegistration = Alloy.createController("winRegistration").getView();
		if (OS_IOS) {
			winRegistration.open({
				modal : true
			});
		} else {
			winRegistration.open();
		}
		isModuleClicked = true;
	}
}

/*
 function closeLoginView() {
 $.backView.visible = false;
 $.loginView.visible = false;
 }

 function showForgotPasswordView() {
 $.forgotPasswordView.visible = true;
 }

 function closeForgotPasswordView() {
 $.forgotPasswordView.visible = false;
 }
 */
var prevLang = null;

function changeLanguage() {
	// if (prevLang == Alloy.Globals.language) {
	// return;
	// }
	//
	// prevLang = Alloy.Globals.language;

	$.lblNavTitle.text = "Ministry Of Finance";

	$.lblInstruction.text = Alloy.Globals.selectedLanguage.languageInstruction;
	$.lblInstructionTitle.text = Alloy.Globals.selectedLanguage.certificateLanguage;
	$.btnProceed.title = Alloy.Globals.selectedLanguage.proceed;

	var alignment;

	if (Alloy.Globals.isEnglish) {
		alignment = Ti.UI.TEXT_ALIGNMENT_LEFT;
		/*
		 $.imgUserName.left = $.imgPassword.left = 10;
		 $.txtUsername.left = $.txtPassword.left = 32;
		 $.txtUsername.right = $.txtPassword.right = 10;

		 $.imgUserName.right = $.imgPassword.right = undefined;
		 */

	} else {
		alignment = Ti.UI.TEXT_ALIGNMENT_RIGHT;

		/*
		 $.imgUserName.right = $.imgPassword.right = 10;
		 $.txtUsername.right = $.txtPassword.right = 32;
		 $.txtUsername.left = $.txtPassword.left = 10;

		 $.imgUserName.left = $.imgPassword.left = undefined;
		 */

	}
	$.lblInstruction.textAlign = Ti.UI.TEXT_ALIGNMENT_CENTER;
	//alignment;

	Alloy.Globals.RevenueSources = [{
		id : 1,
		title : Alloy.Globals.selectedLanguage.salary,
		value : "0"
	}, {
		id : 2,
		title : Alloy.Globals.selectedLanguage.dividend,
		value : "0"
	}, {
		id : 3,
		title : Alloy.Globals.selectedLanguage.rent,
		value : "0"
	}, {
		id : 4,
		title : Alloy.Globals.selectedLanguage.familySupport,
		value : "0"
	}, {
		id : 5,
		title : Alloy.Globals.selectedLanguage.saving,
		value : "0"
	}];

	arrModules = [{
		id : 0,
		name : Alloy.Globals.selectedLanguage.iSupplier,
		image : Alloy.Globals.path.icnSuppliers
	}, {
		id : 1,
		name : Alloy.Globals.selectedLanguage.taxVatTitle,
		image : Alloy.Globals.path.icnTaxVat
	}, {
		id : 2,
		name : Alloy.Globals.selectedLanguage.takamulTitle,
		image : Alloy.Globals.path.icnTakamul
	}, {
		id : 3,
		name : Alloy.Globals.selectedLanguage.mParticipation,
		image : Alloy.Globals.path.icnmParticipation
	}, {
		id : 4,
		name : Alloy.Globals.selectedLanguage.openFinancialData,
		image : Alloy.Globals.path.icnOpenFinacialData
	}, {
		id : 5,
		name : Alloy.Globals.selectedLanguage.gccStatisticalBook,
		image : Alloy.Globals.path.icnGCCBook
	}, {
		id : 6,
		name : Alloy.Globals.selectedLanguage.myBudgetTitle,
		image : Alloy.Globals.path.icnMyBudget
	}, {
		id : 7,
		name : Alloy.Globals.selectedLanguage.customerInquiry,
		image : Alloy.Globals.path.icnUserFeedback,//icnCustomerInteraction
		//		name : Alloy.Globals.selectedLanguage.customerInteraction,
		//		image : Alloy.Globals.path.icnCustomerInteraction
	}, {
		id : 8,
		name : Alloy.Globals.selectedLanguage.mChatting,
		image : Alloy.Globals.path.icnmChatting
	}, {
		id : 9,
		name : Alloy.Globals.selectedLanguage.locationFedEntity,
		image : Alloy.Globals.path.icnFederalEntity
	}, {
		id : 10,
		name : Alloy.Globals.selectedLanguage.aboutMOFTitle,
		image : Alloy.Globals.path.icnAbout
	}, {
		id : 11,
		name : Alloy.Globals.selectedLanguage.newsTitle,
		image : Alloy.Globals.path.icnNews
	}, {
		id : 12,
		name : Alloy.Globals.selectedLanguage.contactMOFTitle,
		image : Alloy.Globals.path.icnContact
	}, /* {
	 id : 13,
	 name : Alloy.Globals.selectedLanguage.userFeedback,
	 image : Alloy.Globals.path.icnUserFeedback
	 }, {
	 id : 14,
	 name : Alloy.Globals.selectedLanguage.customerInquiry,
	 image : Alloy.Globals.path.icnCustomerInteraction
	 }, {
	 id : 4,
	 name : Alloy.Globals.selectedLanguage.fgFinalAccount,
	 image : Alloy.Globals.path.icnReports,
	 }, {
	 id : 5,
	 name : Alloy.Globals.selectedLanguage.gfsReports,
	 image : Alloy.Globals.path.icnReports,
	 }, */
	{
		id : 13,
		name : (Alloy.Globals.isEnglish) ? Alloy.Globals.selectedLanguage.arabic : Alloy.Globals.selectedLanguage.english,
		image : (Alloy.Globals.isEnglish) ? Alloy.Globals.path.iconArabic : Alloy.Globals.path.iconEnglish
	}];

	//$.txtUsername.textAlign = $.txtPassword.textAlign = alignment;

};

function openTransactionDetails() {

	Ti.API.info('Ti.App.Properties.getObject("PaymentObject").paymentType======>>>' + Ti.App.Properties.getObject("PaymentObject").paymentType);
	var type = Ti.App.Properties.getObject("PaymentObject").paymentType;
	Alloy.Globals.url = "";
	if (type == "VAT" || type == "TAX") {

		httpManager.getVatTaxPaymentTransactionDetails(Ti.App.Properties.getObject("PaymentObject"), function(e) {

			Ti.API.info('e' + JSON.stringify(e));
			if (e == null) {
				return;
			}
			var status;
			if (e.operationCode == "0000") {
				status = "SUCCESS";
			} else {
				status = "FAILURE";
			}

			var payLoad = {
				registerId : 1,
				status : status,
				serviceId : 5,
				obj : e,
				isFromRenewal : false,
			};
			Alloy.Globals.isVATTAXModuleActive = true;
			var win = Alloy.createController("ISupplier/winPaymentStatus", payLoad).getView();
			Alloy.Globals.openWindow(win);

		});
		appId = -1;
	} else {
		httpManager.getPaymentTransactionDetails(Ti.App.Properties.getObject("PaymentObject"), function(e) {

			Ti.API.info('e' + JSON.stringify(e));

			if (e == null) {
				return;
			}

			var status;
			if (e.operationCode == "0000") {
				status = "SUCCESS";
			} else {
				status = "FAILURE";
			}

			var payLoad = {
				registerId : Ti.App.Properties.getObject("PaymentObject").registerId,
				status : status,
				obj : e,
				serviceId : 6,
				isFromRenewal : (type != "REG") ? true : false,
			};

			var win = Alloy.createController("ISupplier/winPaymentStatus", payLoad).getView();
			Alloy.Globals.openWindow(win);
		});
	}
}

$.winHome.addEventListener("open", function(e) {
	getCertificateLanguage(false);

	Ti.API.info("OPEN---------------->");
	//loadMenu();
	if ((Alloy.Globals.url.indexOf("urlschemademo") != -1) && OS_ANDROID) {
		Ti.API.info('>>>>>>>>>>>>>>>>> urlshcemda demo method');
		openTransactionDetails();
	}
	getHomeImagesFromDatabase();
	// loadScrollableModule();

	if (Ti.App.Properties.getInt("isLoggedIn_VatTax") == true) {

		/*httpManager.getDeviceTokenInfo(Ti.App.Properties.getObject("LoginDetaisObj_VatTax").tokenDetails, function(e) {

		 });*/
	}

});

$.winHome.addEventListener("focus", function(e) {
	isModuleClicked = false;
	Alloy.Globals.isVATTAXModuleActive = false;
	Ti.API.info('inHome.addEventListener("focus');
});

$.winHome.addEventListener("blur", function(e) {
	if (timeInterval != null) {
		clearInterval(timeInterval);
		timeInterval = null;
	}
	isWinFocus = false;
});

$.winHome.addEventListener("androidback", function() {
	var alert = Ti.UI.createAlertDialog({
		title : Alloy.Globals.selectedLanguage.appTitle,
		message : Alloy.Globals.selectedLanguage.exitConfirm,
		buttonNames : (Alloy.Globals.isEnglish) ? [Alloy.Globals.selectedLanguage.cancel, Alloy.Globals.selectedLanguage.ok] : [Alloy.Globals.selectedLanguage.ok, Alloy.Globals.selectedLanguage.cancel]
	});
	alert.addEventListener('click', function(e) {
		var successIndex = 0;
		if (Alloy.Globals.isEnglish) {
			successIndex = 1;
		}
		if (e.index == successIndex) {
			//Ti.Android.currentActivity.finish();
			$.winHome.close();
		}
	});
	alert.show();
});

function openmChatting() {
	var win = Alloy.createController('winmChatting').getView();
	Alloy.Globals.openWindow(win);
}

function openUserFeedback() {
	var win = Alloy.createController('UserFeedback/winUserFeedback').getView();
	Alloy.Globals.openWindow(win);
}

function openCustomerInquiry() {
	var win = Alloy.createController('CustomerInquiry/winCustomerInqReq').getView();
	Alloy.Globals.openWindow(win);
}

var changeInterfaceLanguage = function() {
	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading);
	if (Alloy.Globals.isEnglish) {
		Alloy.Globals.changeLanguage('arabic');

	} else {
		Alloy.Globals.changeLanguage('english');

	}
	changeLanguage();
	var delay = setTimeout(function(e) {
		// loadScrollableModule();
		changeOrientation(false);
		clearTimeout(delay);
		delay = null;
	}, 500);
	Alloy.Globals.hideLoading();
};

function openFederalLocationWindow() {

	httpManager.getFederalLocation("Location", function(e) {

		if (e.length == 0) {
			return;
		}
		//    callWSAndOpenSelectedWindow(selectedWindowPath, e.arrData);
		var win = Alloy.createController("FederalEntities/winLocationFederal", e.arrData).getView();
		Alloy.Globals.openWindow(win);

	});

}

function userSatisfactionCallback() {

}

function openUserSatisfaction() {

	httpManager.getUserSatisfactionQuestions(function(e) {

		if (e.length == 0) {
			return;
		}

		var win = Alloy.createController("UserSatisfaction/winUserSatisfaction", {
			callBack : userSatisfactionCallback,
			data : e,
			serviceID : 6
		}).getView();
		Alloy.Globals.openWindow(win);

	});

}

function openmParticpationList() {

	httpManager.getmParticipationList(function(e) {

		if (e == null) {
			return;
		}

		var win = Alloy.createController("mParticipation/winMParticipationList", e).getView();
		Alloy.Globals.openWindow(win);

	});

}

function openFinancialData(e) {
	httpManager.getGFSReportsYear(function(e) {
		Alloy.Globals.GFSYear = e;
		if (e == null) {
			return;
		}
		var win = Alloy.createController("FinancialData/winGFSReports").getView();
		Alloy.Globals.openWindow(win);
	});

}

function openGCCBook() {
	httpManager.getGuidesPageCount(function(data) {
		if (data.length > 0) {
			var win = Alloy.createController("GCCBooks/winBudgetGuidesDetail", {
				pageCount : data[0],
				pageUrl : "http://demoserver.tacme.net:3030/MOFDIGI/GCC_Report/"
			}).getView();
			Alloy.Globals.openWindow(win);
		}
	});
}

function loadScrollableModule(wid, hei) {
	$.scrollableMenuView.removeAllChildren();
	var arrView = [];
	for (var i = 0,
	    length = arrModules.length; i < length; i++) {
		var mainView;
		if (i % 12 == 0) {
			mainView = Ti.UI.createView({
				width : "100%",
				height : "100%",
				layout : "horizontal",
			});
			arrView.push(mainView);
			mainView.addEventListener('click', function(e) {

				switch(e.source.id) {
				case 0 :
					openSuppliers();
					break;
				case 1 :
					openTaxVat();
					break;
				case 2 :
					openTakamul();
					break;
				case 3 :
					openmParticpationList();
					break;
				case 4 :
					openFinancialData();
					break;
				case 5 :
					// Guides..
					openGCCBook();
					break;
				case 6 :
					openMyBudget();
					break;
				case 7 :
					openCustomerInquiry();
					// User interaction..
					//	openUserSatisfaction();
					//openReports_FederalFinalReports();
					break;
				case 8 :
					//mChatting..
					openmChatting();
					break;
				case 9 :
					//Federal Entities..
					openFederalLocationWindow();
					break;
				case 10 :
					openAboutMOF();
					break;
				case 11 :
					openNews();
					break;
				case 12 :
					openContactMOF();
					break;
				/*case 13 :
				 openUserFeedback();
				 break;
				 case 14 :
				 openCustomerInquiry();
				 break;*/
				case 13 :
					changeInterfaceLanguage();
					break;
				}
			});
		}
		var moduleBackView = Ti.UI.createView({
			top : "1%",
			width : wid, //"33%",
			height : hei, //"23.50%",
			backgroundColor : "transparent",
			id : arrModules[i].id
		});
		mainView.add(moduleBackView);
		var backView = Ti.UI.createView({
			width : Ti.UI.SIZE,
			height : Ti.UI.SIZE,
			layout : "vertical",
			touchEnabled : false
		});
		moduleBackView.add(backView);
		var imgView = Ti.UI.createImageView({
			top : 1,
			image : arrModules[i].image,
			width : (Alloy.isTablet) ? 85 : 60, //(Alloy.isTablet) ? Ti.UI.SIZE : 59,
			height : (Alloy.isTablet) ? 85 : 60, //(Alloy.isTablet) ? Ti.UI.SIZE : 59,
			touchEnabled : false
		});
		backView.add(imgView);
		var lblTitle = Ti.UI.createLabel({
			top : (OS_IOS) ? 0 : 4,
			left : 1,
			right : 1,
			bottom : 1,
			color : Alloy.Globals.path.circleButtonsTextColor,
			text : arrModules[i].name,
			font : (Alloy.isTablet) ? Alloy.Globals.path.font18 : Alloy.Globals.path.font13,
			textAlign : "center",
			touchEnabled : false
		});
		backView.add(lblTitle);

		if (Alloy.Globals.is7InchTablet || Alloy.Globals.is8InchTablet) {
			if (Ti.Gesture.orientation == 2) {
				imgView.width = 52;
				imgView.height = 52;
			} else {
				imgView.width = 70;
				imgView.height = 70;

			}
		}

	}
	$.scrollableMenuView.views = arrView;
}

$.scrollableMenuView.addEventListener("scrollend", function(e) {

	//    var currPage = $.scrollableMenuView.getCurrentPage();

	if ($.scrollableMenuView.getCurrentPage() == 0) {
		$.img1.backgroundColor = Alloy.Globals.path.goldColor;
		$.img1.borderColor = Alloy.Globals.path.whiteColor;
		$.img2.backgroundColor = Alloy.Globals.path.whiteColor;
		$.img2.borderColor = Alloy.Globals.path.goldColor;

	} else {
		$.img1.backgroundColor = Alloy.Globals.path.whiteColor;
		$.img1.borderColor = Alloy.Globals.path.goldColor;
		$.img2.backgroundColor = Alloy.Globals.path.goldColor;
		$.img2.borderColor = Alloy.Globals.path.whiteColor;
	}

});

var preOrientation = undefined;

function changeOrientation(isChanged) {

	if (isChanged && preOrientation == Ti.Gesture.orientation) {
		return;
	}
	Ti.API.info('>>>>>>>>>>>>' + Ti.Gesture.orientation);
	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading, false);
	preOrientation = Ti.Gesture.orientation;

	if (OS_IOS) {
		if (Ti.Gesture.orientation == 3 || Ti.Gesture.orientation == 4) {
			if (Alloy.isTablet) {
				loadScrollableModule("24.20%", "31.33%");
			} else {
				loadScrollableModule("33%", "23.50%");
			}
		} else {
			loadScrollableModule("33%", "23.50%");
		}
	} else {
		if (Ti.Gesture.orientation == 2) {
			if (Alloy.isTablet) {
				loadScrollableModule("24.20%", "31.33%");
			} else {
				loadScrollableModule("33%", "23.50%");
			}
		} else {
			loadScrollableModule("33%", "23.50%");
		}
	}
	Alloy.Globals.hideLoading();
}

$.winHome.addEventListener("postlayout", function(e) {
	Ti.API.info('POST LAYOUT ');
	isModuleClicked = false;
	Alloy.Globals.isVATTAXModuleActive = false;
	changeOrientation(true);
});

changeLanguage();

