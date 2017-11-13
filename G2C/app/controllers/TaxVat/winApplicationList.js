var httpManager = require("httpManager");
//Alloy.createController('common/httpManager');

var args = arguments[0] || {};
var isTaskList = (args.title == "task_list") ? true : false;

var userInfo = Ti.App.Properties.getObject("LoginDetaisObj_VatTax").userInfo;
var userTypeId = userInfo.userTypeId;

if (Alloy.Globals.isIOS7Plus) {
	$.statusBar.height = 20;
	//$.statusBar.backgroundColor = Alloy.Globals.path.bgColor;
	$.tblApplicationList.separatorInsets = {
		left : 0
	};

	// $.tableView.separatorInsets = {
	// left : 0
	// };
}

var appId = -1;
var appType = "";
$.btnNew.visible = false;

function changeLanguage() {
	$.lblNavTitle.text = (isTaskList) ? Alloy.Globals.VTaxSelectedLanguage.taskList : Alloy.Globals.VTaxSelectedLanguage.applicationList;
	$.btnNew.title = Alloy.Globals.VTaxSelectedLanguage.new;

	$.lblTitle.text = Alloy.Globals.VTaxSelectedLanguage.title;
	// $.lblDate.text = (isTaskList) ? Alloy.Globals.VTaxSelectedLanguage.status : Alloy.Globals.VTaxSelectedLanguage.dateTitle;
	$.lblDate.text = Alloy.Globals.VTaxSelectedLanguage.status;
	$.lblNoRecordFound.text = Alloy.Globals.VTaxSelectedLanguage.noRecordFound;

	if (Alloy.Globals.VATTAXisEnglish) {
		$.lblTitle.left = 10;
		$.lblDate.right = 0;
		$.lblDate.textAlign = Titanium.UI.TEXT_ALIGNMENT_LEFT;

		$.vSeperator.right = (Alloy.isTablet) ? 115 : 90;

	} else {
		$.lblTitle.right = 10;
		$.lblDate.left = 0;

		$.lblDate.textAlign = Titanium.UI.TEXT_ALIGNMENT_RIGHT;

		$.vSeperator.left = (Alloy.isTablet) ? 115 : 90;
	}
}

function showToolTip(e) {
	Ti.API.info('JSON = ' + JSON.stringify(e));
	var objPoint = $.imgHelp.convertPointToView({
		x : 30,
		y : 0
	}, $.transparentView);
	Ti.API.info('REcT = ' + e.x + "  " + e.y);

	var toolTipRight = Alloy.Globals.platformWidth - objPoint.x;
	var toolTipTop = (objPoint.y + ((OS_IOS) ? 25 : DPUnitsToPixels(25)));

	$.toolTipPopUp.top = (OS_IOS) ? toolTipTop : (toolTipTop + "px");
	if (Alloy.Globals.VATTAXisEnglish) {
		$.toolTipPopUp.right = 7;
	}
	$.toolTipPopUp.visible = true;
	$.transparentView.visible = true;
	$.toolTipPopUp.animate({
		opacity : 1,
		duration : 300
	});
	$.transparentView.animate({
		opacity : 1,
		duration : 300
	});

}

function hideToolTip() {
	$.toolTipPopUp.animate({
		opacity : 0,
		duration : 300
	}, function(e) {
		if (OS_ANDROID) {
			$.toolTipPopUp.visible = false;
		}
	});
	$.transparentView.animate({
		opacity : 0,
		duration : 300
	}, function(e) {
		if (OS_ANDROID) {
			$.transparentView.visible = false;
		}
	});
}

var animateLeftPanelToRight = Ti.UI.createAnimation({
	left : 0,
	curve : Ti.UI.ANIMATION_CURVE_EASE_OUT,
	//	transform : Ti.UI.create2DMatrix().scale(0.9, 0.80),
	duration : 300,
});

var animateLeftPanelToLeft = Ti.UI.createAnimation({
	left : -$.leftView.width,
	curve : Ti.UI.ANIMATION_CURVE_EASE_IN,
	//	transform : Ti.UI.create2DMatrix().scale(1.0, 1.0),
	duration : 300,
});

function showLeftPanel() {
	if (!isLeftPanelOpened) {

		if (OS_IOS) {
			$.leftView.animate(animateLeftPanelToRight);
		} else {
			//	var matrix = Ti.UI.create2DMatrix();
			//	matrix = matrix.scale(1.0, 1.0, 0.9, 0.8);
			var a = Ti.UI.createAnimation({
				left : $.leftView.width,
				//	transform : matrix,
				duration : 300,
			});
			$.homeView.animate(a);
		}
		$.closeView.visible = true;
		isLeftPanelOpened = true;

	} else {

		if (OS_IOS) {
			$.leftView.animate(animateLeftPanelToLeft);
		} else {
			//	var matrix = Ti.UI.create2DMatrix();
			//	matrix = matrix.scale(0.9, 0.8, 1.0, 1.0);
			var a = Ti.UI.createAnimation({
				left : 0,
				//	transform : matrix,
				duration : 300,
			});
			$.homeView.animate(a);
		}
		$.closeView.visible = false;
		isLeftPanelOpened = false;

	}
}

function getColor(statusID) {
	if (statusID == 1) {
		return Alloy.Globals.path.orangeColor;
	} else {
		return Alloy.Globals.path.greenColor;
	}
}

function getStatusText(statusID) {
	if (statusID == 1) {
		return Alloy.Globals.VTaxSelectedLanguage.draft;
	} else if (statusID == 2) {
		return Alloy.Globals.VTaxSelectedLanguage.approval;
	}
}

function loadApplicationList(arr) {

	/*$.tableView.data = [];
	 var arrRows = [];
	 for (var i = 0,
	 len = arr.length; i < len; i++) {
	 var row = Ti.UI.createTableViewRow({
	 height : 55, //Titanium.UI.SIZE, // 40
	 width : "100%",
	 selectionStyle : 0,
	 isToExclude_contrast : true
	 });

	 var detailView = Ti.UI.createView({
	 // top : 8,
	 // bottom : 8,
	 left : 10,
	 right : 100,
	 height : Ti.UI.SIZE,
	 layout : "vertical"
	 });
	 row.add(detailView);

	 var lblTitle = Titanium.UI.createLabel({
	 // top : (Alloy.isTablet) ? 13 : 8,
	 // bottom : (Alloy.isTablet) ? 13 : 8,
	 left : 0,
	 right : 0,
	 height : Titanium.UI.SIZE,
	 color : Alloy.Globals.path.borderColor,
	 font : (Alloy.isTablet) ? Alloy.Globals.path.font15 : Alloy.Globals.path.font12,
	 textAlign : (Alloy.Globals.VATTAXisEnglish) ? Titanium.UI.TEXT_ALIGNMENT_LEFT : Titanium.UI.TEXT_ALIGNMENT_RIGHT,
	 text : arr[i].businessID
	 });
	 detailView.add(lblTitle);

	 var lblDate = Titanium.UI.createLabel({
	 left : 0,
	 right : 0,
	 height : Titanium.UI.SIZE,
	 color : Alloy.Globals.path.borderColor,
	 font : (Alloy.isTablet) ? Alloy.Globals.path.font15 : Alloy.Globals.path.font12,
	 textAlign : (Alloy.Globals.VATTAXisEnglish) ? Titanium.UI.TEXT_ALIGNMENT_LEFT : Titanium.UI.TEXT_ALIGNMENT_RIGHT,
	 text : arr[i].startDate
	 });
	 detailView.add(lblDate);

	 var statusColor = getColor(arr[i].statusID);
	 var statusTitle = getStatusText(arr[i].statusID);

	 var btnStatus = Titanium.UI.createButton({
	 width : (Alloy.isTablet) ? 90 : 65,
	 height : (Alloy.isTablet) ? 25 : 18,
	 right : 12,
	 // borderColor : statusColor,
	 // borderRadius : 3,
	 // borderWidth : 0.5,
	 appId : arr[i].id,
	 obj : arr[i],
	 style : "plain",
	 color : statusColor,
	 font : (Alloy.isTablet) ? Alloy.Globals.path.font18 : Alloy.Globals.path.font15,
	 title : (Alloy.Globals.VATTAXisEnglish) ? arr[i].state : arr[i].stateAr,
	 backgroundColor : "transparent"
	 });
	 row.add(btnStatus);

	 if (Alloy.Globals.VATTAXisEnglish) {
	 btnStatus.right = 12;
	 detailView.left = 10;
	 detailView.right = (Alloy.isTablet) ? 125 : 100;
	 } else {
	 btnStatus.left = 12;
	 detailView.left = (Alloy.isTablet) ? 125 : 100;
	 detailView.right = 10;
	 }

	 var vSeparator = Ti.UI.createView({
	 height : Ti.UI.FILL,
	 width : 0.5,
	 right : 90,
	 backgroundColor : Alloy.Globals.path.grayColor,
	 isToExclude_contrast : true
	 });
	 row.add(vSeparator);

	 if (Alloy.Globals.VATTAXisEnglish) {
	 vSeparator.right = (Alloy.isTablet) ? 115 : 90;
	 } else {
	 vSeparator.left = (Alloy.isTablet) ? 115 : 90;
	 }

	 var seperator = Ti.UI.createView({
	 left : 0,
	 right : 0,
	 height : 1,
	 bottom : 0,
	 isToExclude_contrast : true,
	 backgroundColor : Alloy.Globals.path.grayColor,
	 });

	 row.add(seperator);

	 arrRows.push(row);
	 }

	 $.tableView.data = arrRows;*/

}

var arrRows = [];
function loadData(arr) {
	for (var i = 0; i < arr.length; i++) {
		arrRows.push({
			imgDown : {
				image : Alloy.Globals.path.iconArrow2Down
			},
			lblListTitle : {
				font : Alloy.Globals.path.font15,
				text : arr[i].businessID, //"VAT/17562/46",
				textAlign : (Alloy.Globals.VATTAXisEnglish) ? Titanium.UI.TEXT_ALIGNMENT_LEFT : Titanium.UI.TEXT_ALIGNMENT_RIGHT
			},
			lblRequestStatus : {
				font : Alloy.Globals.path.font14,
				text : (Alloy.Globals.VATTAXisEnglish) ? arr[i].state : arr[i].stateAr,
				textAlign : (Alloy.Globals.VATTAXisEnglish) ? Titanium.UI.TEXT_ALIGNMENT_LEFT : Titanium.UI.TEXT_ALIGNMENT_RIGHT
			},
			lblApplicationStatus : {
				font : Alloy.Globals.path.font14,
				text : arr[i].startDate,
				textAlign : (Alloy.Globals.VATTAXisEnglish) ? Titanium.UI.TEXT_ALIGNMENT_LEFT : Titanium.UI.TEXT_ALIGNMENT_RIGHT
			},
			btnPayView : {
				height : ((arr[i].statusID == 4 && userTypeId != 3) || (arr[i].statusID == 4 && userTypeId == 3 && arr[i].typeOfApplication == "VAT") || arr[i].statusID == 5 || arr[i].statusID == 2 || arr[i].statusID == 3) ? 30 : 0,
				bottom : 8,
				top : (((arr[i].statusID == 4 && userTypeId != 3) || (arr[i].statusID == 4 && userTypeId == 3 && arr[i].typeOfApplication == "VAT")) || arr[i].statusID == 5 || arr[i].statusID == 2 || arr[i].statusID == 3) ? 4 : 0,
				appId : arr[i].id,
				obj : arr[i],
				// title : Alloy.Globals.VTaxSelectedLanguage.pay
			},
			lblPay : {
				height : (((arr[i].statusID == 4 && userTypeId != 3) || (arr[i].statusID == 4 && userTypeId == 3 && arr[i].typeOfApplication == "VAT")) || arr[i].statusID == 5 || arr[i].statusID == 2 || arr[i].statusID == 3) ? 30 : 0,
				appId : arr[i].id,
				obj : arr[i],
				touchEnabled : false,
				font : Alloy.Globals.path.font16,
				text : ((arr[i].statusID == 4 && userTypeId != 3) || (arr[i].statusID == 4 && userTypeId == 3 && arr[i].typeOfApplication == "VAT")) ? Alloy.Globals.VTaxSelectedLanguage.pay : (arr[i].statusID == 2 || arr[i].statusID == 3) ? Alloy.Globals.VTaxSelectedLanguage.viewApplication : Alloy.Globals.VTaxSelectedLanguage.editApplication
			},
			properties : {
				isClicked : false,
				appId : arr[i].id,
				obj : arr[i],
			}
		});
	}
	$.listSection.setItems(arrRows);
	if (Alloy.Globals.currentTheme == "dark") {
		$.navBarBackView.backgroundColor = Alloy.Globals.path.navBarColor;
	}
	Alloy.Globals.setDefaultTheme($.winApplicationList);

}

function goForPayment(e) {

}

$.tblApplicationList.addEventListener('itemclick', function(e) {
	Ti.API.info('LIST CLICK == ' + JSON.stringify(e));

	var section = $.tblApplicationList.sections[e.sectionIndex];
	var item = section.getItemAt(e.itemIndex);
	Ti.API.info('item.properties.statusID == ' + item.properties.obj.statusID + "   " + isTaskList);

	if (e.bindId == "btnPayView" || e.bindId == "lblPay") {

		if (item.properties.obj.statusID == 5 || item.properties.obj.statusID == 2 || item.properties.obj.statusID == 3) {//EDIT APPLICATION

			httpManager.getVatTaxApplication({
				appId : item.properties.appId,
				userName : userInfo.userName
			}, function(obj, isExpired, alertMessage) {
				if (obj == null && isExpired) {
					expireAlert.title = alertMessage;
					expireAlert.show();
					return;
				} else if (obj != null) {
					Ti.API.info('OBJJJJ DETAIL == ' + JSON.stringify(obj));
					if (obj.certificateType_en == "VAT") {
						var winVatApplication = Alloy.createController("TaxVat/winCorTaxApplication", {
							data : obj,
							callBack : appCallBack,
							updateCallBack : getTaskOrApplication,
							isEdit : (item.properties.obj.statusID == 2 || item.properties.obj.statusID == 3) ? false : true
						}).getView();
						Alloy.Globals.openWindow(winVatApplication);
					} else {
						var winTaxApplication = Alloy.createController("TaxVat/winIndTaxApplication", {
							data : obj,
							callBack : appCallBack,
							updateCallBack : getTaskOrApplication,
							isEdit : (item.properties.obj.statusID == 2 || item.properties.obj.statusID == 3) ? false : true
						}).getView();
						Alloy.Globals.openWindow(winTaxApplication);
					}
				}
			});
		} else if ((item.properties.obj.statusID == 4 && userTypeId != 3) || (item.properties.obj.statusID == 4 && userTypeId == 3 && item.properties.obj.typeOfApplication == "VAT")) {// READY TO PAY

			appId = item.properties.appId;
			appType = item.properties.obj.typeOfApplication;

			Ti.API.info('APP TYPE = ' + appType + " App ID = " + appId);
			Ti.API.info('e.source.obj.Business Id = ' + item.properties.obj.businessID);
			Ti.App.Properties.setObject("PaymentObject", {
				appId : appId,
				paymentType : appType,
				serviceId : 5,
			});
			var osType = (OS_IOS) ? "IOS" : "Android";
			var paymentUrl = "http://194.170.30.187:7001/mobipay/purchaseReview.html?languageCode=" + Alloy.Globals.languageCode + "&id=" + appId + "&serviceCode=" + item.properties.obj.paymentServiceCode + "&deviceType=" + osType + "&paymentType=Direct";
			Ti.API.info('payment URL = ' + paymentUrl);
			Ti.Platform.openURL(paymentUrl);
			// openTransactionDetails();

		}
	}
	/*if (e.bindId == "titleView" || e.bindId == "lblListTitle" || e.bindId == "imgDown") {
	 if (item.properties.isClicked == false) {
	 item.properties.height = Ti.UI.SIZE;
	 item.imgDown.image = Alloy.Globals.path.iconArrow2Up;
	 item.properties.isClicked = true;
	 } else {
	 item.properties.isClicked = false;
	 item.imgDown.image = Alloy.Globals.path.iconArrow2Down;
	 item.properties.height = (Alloy.isTablet) ? 55 : 46;
	 }
	 section.updateItemAt(e.itemIndex, item);
	 }*/
});

/*
* statusID = 2 = Approval
* statusID = 1 = Draft
*
*/

//Get APPLICATION DETAIL
/**/

 var expireAlert = Ti.UI.createAlertDialog({
 title : "",
 buttonNames : [Alloy.Globals.VTaxSelectedLanguage.ok]
 });
 expireAlert.addEventListener("click", function(e) {
 Ti.App.Properties.setInt("isLoggedIn_VatTax", false);
 args.callBack();
 closeWindow();
 });

 function appCallBack() {

 }

 /*$.tableView.addEventListener("click", function(e) {

 Ti.API.info('OBJECT = ' + e.source);
 if (isTaskList) {
 // var win = Alloy.createController("TaxVat/winEditApplication").getView();
 // Alloy.Globals.openWindow(win);

 if (e.source == "[object TiUIButton]" || e.source == "[object Button]") {

 var userInfo = Ti.App.Properties.getObject("LoginDetaisObj_VatTax").userInfo;
 httpManager.getVatTaxApplication({
 appId : e.source.appId,
 userName : userInfo.userName
 }, function(obj, isExpired, alertMessage) {
 if (obj == null && isExpired) {
 expireAlert.title = alertMessage;
 expireAlert.show();
 return;
 } else if (obj == null) {
 Alloy.Globals.ShowAlert(Alloy.Globals.VTaxSelectedLanguage.taxApplication, alertMessage);
 } else if (obj != null) {
 Ti.API.info('OBJJJJ DETAIL == ' + JSON.stringify(obj));
 if (obj.certificateType_en == "VAT") {
 var winVatApplication = Alloy.createController("TaxVat/winCorTaxApplication", {
 data : obj,
 callBack : appCallBack
 }).getView();
 Alloy.Globals.openWindow(winVatApplication);
 } else {
 var winTaxApplication = Alloy.createController("TaxVat/winIndTaxApplication", {
 data : obj,
 callBack : appCallBack
 }).getView();
 Alloy.Globals.openWindow(winTaxApplication);
 }
 }
 });
 }

 } else if (e.source == "[object TiUIButton]" || e.source == "[object Button]") {
 Ti.API.info('e.source.obj.statusID ' + e.source.obj.statusID);
 if (e.source.obj.statusID != 3) {
 return;
 }
 appId = e.source.appId;
 appType = e.source.obj.typeOfApplication;

 Ti.API.info('APP TYPE = ' + appType + " App ID = " + appId);
 Ti.App.Properties.setObject("PaymentObject", {
 appId : appId,
 paymentType : appType,
 serviceId : 5,
 });
 var osType = (OS_IOS) ? "IOS" : "Android";
 var paymentUrl = "http://194.170.30.187:7001/mobipay/purchaseReview.html?languageCode=" + Alloy.Globals.languageCode + "&id=" + appId + "&serviceCode=" + e.source.obj.paymentServiceCode + "&deviceType=" + osType + "&paymentType=Direct";
 Ti.API.info('payment URL = ' + paymentUrl);
 Ti.Platform.openURL(paymentUrl);
 }
 });*/

function closeWindow() {
	Alloy.Globals.closeWindow($.winApplicationList);
}


$.viewBottomToolbar.getView().addEventListener('click', function(e) {
	if (e.source.buttonId == 'btnFontChange') {
		$.viewBottomToolbar.changeFont($.winApplicationList);
	} else if (e.source.buttonId == 'btnSystemFeedback') {
		$.viewBottomToolbar.openFeedbackScreen(e);
	} else if (e.source.buttonId == 'btnSystemInstruction') {
		$.viewInstructions.openHelpScreen(e);
	} else if (e.source.buttonId == 'btnSystemChangeTheme') {
		$.viewBottomToolbar.changeTheme($.winApplicationList);
	}
});

function getTaskOrApplication() {
	if (isTaskList) {
		httpManager.getMyTasks(userInfo.userName, function(arr, isExpired, alertMessage) {
			if (arr.length > 0) {
				$.lblNoRecordFound.opacity = 0.0;
				// loadApplicationList(arr);
				loadData(arr);
			} else if (isExpired) {
				expireAlert.title = alertMessage;
				expireAlert.show();
			} else {
				$.lblNoRecordFound.opacity = 1.0;
				// loadApplicationList([]);
				loadData([]);
			}
		});
	} else {
		httpManager.getMyApplicationList(userInfo.userName, function(arr, isExpired, alertMessage) {
			Ti.API.info('APplication List = ' + JSON.stringify(arr));
			if (arr.length > 0) {
				$.lblNoRecordFound.opacity = 0.0;
				// loadApplicationList(arr);
				loadData(arr);
			} else if (isExpired) {
				expireAlert.title = alertMessage;
				expireAlert.show();
			} else {
				// loadApplicationList([]);
				loadData([]);
				$.lblNoRecordFound.opacity = 1.0;
			}
		});
	}
}

$.winApplicationList.addEventListener("focus", function(e) {
	$.viewBottomToolbar.setDefaultTheme($.winApplicationList);
});
$.viewBottomToolbar.setDefaultTheme($.winApplicationList);

$.winApplicationList.addEventListener("open", function(e) {

	Alloy.Globals.arrWindows.push($.winApplicationList);

	var wsTimeOut = setTimeout(function(e) {
		clearTimeout(wsTimeOut);
		getTaskOrApplication();
	}, 400);

	$.viewBottomToolbar.setOptions({
		showThemeButton : true,
		showInstructions : false,
		showFeedBack : true,
		showFontResize : true
	});
});

$.winApplicationList.addEventListener("close", function(e) {
	Ti.API.info('WIN APPLICATION LIST IS CLOSED');

	Ti.App.removeEventListener('resume', appResume);
	Alloy.Globals.arrWindows.pop();
	$.destroy();

});
function gotoHome() {
	Alloy.Globals.gotoHome();
}

changeLanguage();

function openTransactionDetails() {

	var obj = {
		appId : appId,
		paymentType : appType,
	};
	if (appId == -1) {
		return;
	}

	Alloy.Globals.url = "";

	httpManager.getVatTaxPaymentTransactionDetails(obj, function(e) {
		// appId = -1;
		appType = "";
		isOpen = false;
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

		var win = Alloy.createController("ISupplier/winPaymentStatus", payLoad).getView();
		Alloy.Globals.openWindow(win);

	});

};

function appResume(event) {
	if (isOpen) {
		return;
	}

	var delay = setTimeout(function(e) {
		var args = Ti.App.getArguments();
		Ti.API.info('Launched with: ' + JSON.stringify(args));

		if (args.url == "urlschemademo://?") {
			isOpen = true;
			openTransactionDetails();
		} else {
			isOpen = false;
		}
	}, 500);

}

var isOpen = false;

if (OS_IOS) {
	Ti.App.addEventListener('resume', appResume);
} else if (OS_ANDROID) {

	// On Android, somehow the app always opens as new

	Ti.API.info('Alloy.globals.url====' + Alloy.Globals.url);

	if (Alloy.Globals.url == "urlschemademo://") {
		if (!isOpen) {
			isOpen = true;
			// openTransactionDetails();
		}
	}

}
