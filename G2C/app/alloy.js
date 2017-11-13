Alloy.Globals.path = Alloy.createController('common/path').path();
Alloy.Globals.G2C_CommonEntityCode = "999";
Alloy.Globals.G2C_CommonServiceCode = "60";
Alloy.Globals.SOADomainServiceUrl = "http://194.170.30.187:7777/soa-infra/services/";

Alloy.Globals.SOAProductionDomainServiceUrl = "http://mgov.mof.gov.ae/soa-infra/services/";

Alloy.Globals.SOADomainUrl = "http://194.170.30.187/";
Alloy.Globals.SOAProductionDomainUrl = "http://194.170.30.187/";

Alloy.Globals.isProduction = false;
Alloy.Globals.isVATTAXModuleActive = false;

Alloy.Globals.VATTAXisEnglish = false;
Alloy.Globals.VTaxSelectedLanguage = Alloy.createController('common/english').language();

//true;

Alloy.Globals.strStatusInfo = "[Draft] : This form still not submitted\n[Submitted] : This for has been submitted and you will receive notification email once the form submitted\n[Application back to initiator with note] : There are notes on your application by the ministry, Open your application from My Task List for more detail";


Alloy.Globals.maxAttempt = 3;

Alloy.Globals.currentTheme = "light";
Alloy.Globals.contentFontSize = "N";

// manu
Alloy.Globals.baseNewsUrl = "http://z3works.cloudapp.net:8080/";

Alloy.Globals.platformHeight = Ti.Platform.displayCaps.platformHeight;
Alloy.Globals.platformWidth = Ti.Platform.displayCaps.platformWidth;

Alloy.Globals.moment = require("alloy/moment");
Alloy.Globals.GFSYear = null;
//For identifying the device width and height

// Dropbox module
Alloy.Globals.dropbox = require('dropbox');

// Getting the dropbox client
Alloy.Globals.createDropboxClient = function() {
	Alloy.Globals.client = Alloy.Globals.dropbox.createClient({
		app_key : Alloy.CFG.dropbox.key,
		app_secret : Alloy.CFG.dropbox.secret,
		root : Alloy.CFG.dropbox.root
	});
};
//Creating the dropbox client
Alloy.Globals.createDropboxClient();

Alloy.Globals.Map = require('ti.map');

Alloy.Globals.GetWidth = function(value) {
	var temp = (value * 100) / 320;
	return parseInt((Alloy.Globals.platformWidth * temp) / 100);
};
Alloy.Globals.GetHeight = function(value) {
	var temp = (value * 100) / 480;
	return parseInt((Alloy.Globals.platformHeight * temp) / 100);
};

if (Alloy.Globals.platformWidth > Alloy.Globals.platformHeight) {
	var temp = Alloy.Globals.platformWidth;
	Alloy.Globals.platformWidth = Alloy.Globals.platformHeight;
	Alloy.Globals.platformHeight = temp;
}

Alloy.Globals.isFullHDTablet = ((Alloy.Globals.platformWidth > 1000) && OS_ANDROID) ? true : false;

//Global function for show alert from any screen
Alloy.Globals.ShowAlert = function(title, message) {
	Ti.API.info("alert msg :"+ title + "-->"+ message);
	
	var selectedLanguage = (Alloy.Globals.isVATTAXModuleActive) ? Alloy.Globals.VTaxSelectedLanguage :  Alloy.Globals.selectedLanguage;
	
	var alert = Ti.UI.createAlertDialog({
		title : title,
		message : message,
		buttonNames : [selectedLanguage.ok]
	});
	alert.show();
};

//Set current window as a main window. it is used for showing loading in current window
Alloy.Globals.SetMainWindow = function(win) {
	if (Ti.Platform.osname == 'android') {
		var actInd = Titanium.UI.Android.createProgressIndicator({
			height : 50,
			width : 10,
			message : 'Loading...'
		});
		Alloy.Globals.showLoading = function(message) {
			Ti.API.error("----" + message);
			if(Alloy.Globals.isVATTAXModuleActive){
				message = Alloy.Globals.VTaxSelectedLanguage.loading;
			}
			actInd.message = message;
			actInd.show();
		};
		Alloy.Globals.hideLoading = function() {
			actInd.hide();
		};
	} else {
		var progressView = Alloy.createController('common/progressView');
		progressView.initWithWindow(win);

		Alloy.Globals.showLoading = function(message, isError) {
			if(Alloy.Globals.isVATTAXModuleActive){
				message = Alloy.Globals.VTaxSelectedLanguage.loading;
			}
			
			progressView.show({
				text : message,
				error : isError,
			});
		};
		Alloy.Globals.changeLoading = function(message, success) {
			if(Alloy.Globals.isVATTAXModuleActive){
				message = Alloy.Globals.VTaxSelectedLanguage.loading;
			}
			progressView.change({
				text : message,
				success : success
			});
		};
		Alloy.Globals.hideLoading = function() {
			progressView.hide();
		};
	}
};

Alloy.Globals.SetModelWindow = function(win) {
	if (Ti.Platform.osname == 'android') {
		var actInd = Titanium.UI.Android.createProgressIndicator({
			height : 50,
			width : 10,
			message : 'Loading...'
		});
		Alloy.Globals.showModelLoading = function(message) {
			Ti.API.error("----" + message);
			if(Alloy.Globals.isVATTAXModuleActive){
				message = Alloy.Globals.VTaxSelectedLanguage.loading;
			}
			actInd.message = message;
			actInd.show();
		};
		Alloy.Globals.hideModelLoading = function() {
			actInd.hide();
		};
	} else {

		var progressView1 = Alloy.createController('common/progressView');
		progressView1.initWithWindow(win);
		Ti.API.info('MODAL WINDOW = ' + win);
		Alloy.Globals.showModelLoading = function(message, isError) {
			if(Alloy.Globals.isVATTAXModuleActive){
				message = Alloy.Globals.VTaxSelectedLanguage.loading;
			}
			progressView1.show({
				text : message,
				error : isError,
			});
		};
		Alloy.Globals.changeLoading = function(message, success) {
			if(Alloy.Globals.isVATTAXModuleActive){
				message = Alloy.Globals.VTaxSelectedLanguage.loading;
			}
			progressView1.change({
				text : message,
				success : success
			});
		};
		Alloy.Globals.hideModelLoading = function() {
			progressView1.hide();
		};
	}
};

/*
 Alloy.Globals.selectedLanguage = Alloy.createController('english').language();
 Alloy.Globals.isEnglish = true;
 Alloy.Globals.language = "english";
 Alloy.Globals.languageCode = "en";
 */

Alloy.Globals.changeLanguage = function(language) {

	if (language == "english") {
		Alloy.Globals.selectedLanguage = Alloy.createController('common/english').language();
		Alloy.Globals.VTaxSelectedLanguage = Alloy.createController('common/english').language();
		Alloy.Globals.language = "english";
		Alloy.Globals.languageCode = "en";
		Alloy.Globals.languageId = 1;
		Alloy.Globals.isEnglish = Alloy.Globals.VATTAXisEnglish = true;
		Ti.App.Properties.setBool("isEnglishSelected", true);
	} else {
		Alloy.Globals.selectedLanguage = Alloy.createController('common/arabic').language();
		Alloy.Globals.VTaxSelectedLanguage = Alloy.createController('common/arabic').language();
		Alloy.Globals.language = "arabic";
		Alloy.Globals.languageCode = "ar";
		Alloy.Globals.languageId = 2;
		Alloy.Globals.isEnglish = Alloy.Globals.VATTAXisEnglish = false;
		Ti.App.Properties.setBool("isEnglishSelected", false);
	}

	Alloy.Globals.path = Alloy.createController('common/path').path();
};

if (Ti.App.Properties.hasProperty("isEnglishSelected")) {
	if (Ti.App.Properties.getBool("isEnglishSelected")) {
		Alloy.Globals.changeLanguage('english');
	} else {
		Alloy.Globals.changeLanguage('arabic');
	}
} else {
	Alloy.Globals.changeLanguage('english');
}

//Alloy.Globals.changeLanguage("english");
//Alloy.Globals.changeLanguage("arabic");

/*
 if (Ti.App.Properties.hasProperty("isEnglishSelected")) {
 if (Ti.App.Properties.getBool("isEnglishSelected") == true) {
 Alloy.Globals.selectedLanguage = Alloy.createController('english').language();
 Alloy.Globals.language = "english";
 Alloy.Globals.languageCode = "en";
 Alloy.Globals.isEnglish = true;
 } else {
 Alloy.Globals.selectedLanguage = Alloy.createController('arabic').language();
 Alloy.Globals.language = "arabic";
 Alloy.Globals.languageCode = "ar";
 Alloy.Globals.isEnglish = false;
 }
 } else {
 Alloy.Globals.selectedLanguage = Alloy.createController('english').language();
 Alloy.Globals.language = "english";
 Alloy.Globals.languageCode = "en";
 Alloy.Globals.isEnglish = true;
 }
 */

Alloy.Globals.openWindow = function(win) {
	if (OS_IOS) {
		Alloy.Globals.tab.open(win);
	} else {
		win.open();
	}
};

Alloy.Globals.closeWindow = function(win, isAnim) {
	if (isAnim == undefined || isAnim == null) {
		isAnim = true;
	}
	if (OS_IOS) {
		Alloy.Globals.tab.close(win, {
			animated : isAnim
		});
	} else {
		win.close();
	}
	win = null;
};

function isIOS7Plus() {
	// This function Checks whether the Operating system version is 7 in IPhone or not.This function is for Iphone only.
	if (Titanium.Platform.name == 'iPhone OS') {
		var version = Titanium.Platform.version.split(".");
		var major = parseInt(version[0], 10);
		if (major >= 7) {
			return true;
		}
	}
	return false;
}

Alloy.Globals.isIOS7Plus = isIOS7Plus();
Ti.API.info('Alloy.Globals.isIOS7Plus = ' + Alloy.Globals.isIOS7Plus);

//This checks for the ios7 condition and return boolean.
var moment = require('alloy/moment');
Alloy.Globals.makeCall = function(number) {

	number = number.replace(" ", "");

	if (Ti.Platform.osname == 'android') {
		var phoneNum = "tel:" + number;
		var confomAlert = Ti.UI.createAlertDialog({
			title : Alloy.Globals.selectedLanguage.callTitle,
			//message : Alloy.Globals.selectedLanguage.callConformAlert + number + ((Alloy.Globals.isArabic) ? "؟" : "?"),
			message : number + ((Alloy.Globals.isArabic) ? "؟" : "?"),
			buttonNames : [Alloy.Globals.selectedLanguage.cancel, Alloy.Globals.selectedLanguage.call]
		});
		confomAlert.addEventListener('click', function(e) {
			if (e.index == 1) {
				Ti.Platform.openURL(phoneNum);
			}
		});
		confomAlert.show();
	} else {
		var phoneNum = "telprompt:" + number;

		if (Ti.Platform.canOpenURL(phoneNum)) {
			Ti.Platform.openURL(phoneNum);
		} else {
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.call, Alloy.Globals.selectedLanguage.noCallAlert);
		}
	}
};

Alloy.Globals.generateDatePicker = function(objdestinationLabel, objdestinationLabelValue1, win, objBudget, isEdit) {
	Ti.App.fireEvent("HideKeyBoard");
	if (OS_IOS) {

		var d = new Date();

		var todayDay = d.getDate();
		var todayMonth = d.getMonth();
		var todayYear = d.getFullYear();

		Ti.API.info("Today    ========" + todayDay + " " + todayMonth + "  " + todayYear);
		var minDate = new Date();
		minDate.setFullYear(todayYear);
		minDate.setMonth(todayMonth);
		minDate.setDate(todayDay);

		//======
		var picker = Ti.UI.createPicker({
			type : Ti.UI.PICKER_TYPE_DATE,
			width : '100%',
			selectionIndicator : true,
		});

		if (objBudget != undefined) {
			var startDate = objBudget.StartDate.split("-");
			var endDate = objBudget.EndDate.split("-");
			Ti.API.info("Budget dates - " + objBudget.StartDate + " - " + objBudget.EndDate);

			var min_startDate = new Date(startDate[0], startDate[1] - 1, startDate[2]);
			var max_endDate = new Date(endDate[0], endDate[1] - 1, endDate[2]);
			if (isEdit != undefined && objBudget.Expenses.length > 0) {
				if (isEdit == "startDate") {
					picker.maxDate = min_startDate;
				} else {
					picker.minDate = max_endDate;
				}
			} else {
				// picker.minDate = min_startDate;
				// picker.maxDate = max_endDate;
			}

		}

		if (objdestinationLabelValue1.text.length > 0 && objdestinationLabelValue1.text != '0') {
			var date = objdestinationLabelValue1.text.split('-');
			picker.value = new Date(date[0], (date[1] - 1), date[2]);
		}

		var topBackView = Ti.UI.createView({
			width : Ti.UI.SIZE,
			height : Ti.UI.SIZE,
		});
		var doneButton = Ti.UI.createButton({
			width : (Alloy.isTablet) ? 150 : 100,
			backgroundColor : 'transparent',
			color : 'white',
			font : (Alloy.isTablet) ? Alloy.Globals.path.font18 : Alloy.Globals.path.font14,
			title : Alloy.Globals.selectedLanguage.doneTitle,
			height : (Alloy.isTablet) ? '40dp' : '30dp',
			textAlign : 'center',
			zIndex : 30,
		});

		var cancelButton = Ti.UI.createButton({
			width : (Alloy.isTablet) ? 150 : 100,
			backgroundColor : 'transparent',
			color : 'white',
			font : (Alloy.isTablet) ? Alloy.Globals.path.font18 : Alloy.Globals.path.font14,
			title : Alloy.Globals.selectedLanguage.cancel,
			height : (Alloy.isTablet) ? '40dp' : '30dp',
			textAlign : 'center',
			zIndex : 30,
		});
		if (Alloy.Globals.isEnglish) {
			doneButton.left = 0;
			cancelButton.left = (Alloy.isTablet) ? 170 : 120;
		} else {
			doneButton.right = 0;
			cancelButton.right = (Alloy.isTablet) ? 170 : 120;
		}

		topBackView.add(doneButton);
		topBackView.add(cancelButton);

		var animation = Ti.UI.createAnimation({
			bottom : 0,
			duration : 500
		});
		var clearView = Ti.UI.createView({
			backgroundColor : (Ti.Platform.osname == 'android') ? '#261f68' : 'transparent',
			height : Ti.UI.FILL,
			width : Ti.UI.FILL,

		});

		var backView = Ti.UI.createView({
			width : '100%',
			height : (Alloy.isTablet) ? '256' : '246dp',
			layout : 'vertical',
			bottom : '-250dp',
			zIndex : 25,
			backgroundColor : "red"
		});
		backView.add(topBackView);
		backView.add(picker);
		clearView.add(backView);
		win.add(clearView);

		backView.animate(animation);
		cancelButton.addEventListener('click', function() {
			var anim = Ti.UI.createAnimation({
				bottom : '-250dp',
				duration : 500
			});
			var animComplete = function() {
				anim.removeEventListener('complete', animComplete);

				clearView.remove(backView);
				win.remove(clearView);
				picker = undefined;
			};

			anim.addEventListener('complete', animComplete);
			backView.animate(anim);
		});

		doneButton.addEventListener('click', function() {
			var pickerdate = picker.value;
			var day = pickerdate.getDate();
			var month = pickerdate.getMonth() + 1;
			var year = pickerdate.getFullYear();
			if (day < 10)
				day = '0' + day;
			//service givin error if we are not passing as two digits
			if (month < 10)
				month = '0' + month;
			//service givin error if we are not passing as two digits

			var newdate = day + "-" + month + "-" + year;
			var newdate1 = year + "-" + month + "-" + day;

			objdestinationLabel.text = newdate;
			objdestinationLabelValue1.text = newdate1;
			objdestinationLabel.color = objdestinationLabelValue1.color = Alloy.Globals.path.formFieldsColor;

			var anim = Ti.UI.createAnimation({
				bottom : '-250dp',
				duration : 500
			});
			var animComplete = function() {
				anim.removeEventListener('complete', animComplete);

				clearView.remove(backView);
				win.remove(clearView);
				picker = undefined;
			};

			anim.addEventListener('complete', animComplete);
			backView.animate(anim);
		});
	} else {
		var picker = Ti.UI.createPicker({

		});
		//	picker.minDate= minDate;

		var selectedDate = new Date();
		if (objdestinationLabelValue1.text.length > 0 && objdestinationLabelValue1.text != '0') {
			var date = objdestinationLabelValue1.text.split('-');
			selectedDate = new Date(date[0], (date[1] - 1), date[2]);
		}
		picker.showDatePickerDialog({

			value : selectedDate, // some date
			callback : function(e) {
				if (e.cancel) {
					Ti.API.info('user canceled dialog');
				} else {
					Ti.API.info('value is: ' + e.value);

					Ti.API.info('lets see what this object is' + JSON.stringify(e));
					if (isEdit != undefined && objBudget.Expenses.length > 0) {
						var startDate = objBudget.StartDate.split("-");
						var endDate = objBudget.EndDate.split("-");
						Ti.API.info("Budget dates - " + objBudget.StartDate + " - " + objBudget.EndDate);

						var min_startDate = new Date(startDate[0], startDate[1] - 1, startDate[2]);
						var max_endDate = new Date(endDate[0], endDate[1] - 1, endDate[2]);
						if (isEdit == "startDate") {
							Ti.API.info('>>>>>' + selectedDate);
							if (min_startDate >= e.value) {
								selectedDate = e.value;
							} else {
								Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.editBudgetTitle, Alloy.Globals.selectedLanguage.budgetstartDateMsg + moment(min_startDate).format("DD-MM-YYYY"));
							}
						} else {
							if (max_endDate <= e.value) {
								selectedDate = e.value;
							} else {
								Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.editBudgetTitle, Alloy.Globals.selectedLanguage.budgetEndDateMsg + moment(max_endDate).format("DD-MM-YYYY"));
							}
						}
					} else {
						selectedDate = e.value;
					}
					var pickerdate = selectedDate;

					var today = new Date();

					var day = pickerdate.getDate();
					var month = pickerdate.getMonth() + 1;
					var year = pickerdate.getFullYear();
					if (day < 10)
						day = '0' + day;
					//service givin error if we are not passing as two digits
					if (month < 10)
						month = '0' + month;
					//service givin error if we are not passing as two digits

					var newdate = day + "-" + month + "-" + year;
					var newdate1 = year + "-" + month + "-" + day;

					objdestinationLabel.text = newdate;
					objdestinationLabelValue1.text = newdate1;
					//alert(String.formatDate(selectedDate, 'medium'));
					objdestinationLabel.color = objdestinationLabelValue1.color = Alloy.Globals.path.formFieldsColor;
				}
			}
		});
	}

};

function setupDatabase() {
	Ti.App.DBName = 'G2C_DB';
	Titanium.Database.install('MyBudget.sqlite', Ti.App.DBName);
	Alloy.Globals.DBManager = Alloy.createController('common/DbManager');
	Alloy.Globals.db = Ti.Database.open(Ti.App.DBName);
}

setupDatabase();
/*
 Alloy.Globals.arrMenu = [{
 title : "Budget Preparation", //Alloy.Globals.selectedLanguage.budgetPreparation,
 titleAr : "إعداد الميزانية", //Alloy.Globals.selectedLanguage.budgetPreparation,
 path : "CoreServices/winBudgetPreparation",
 image : Alloy.Globals.path.icnBudgetPreparation,
 id : 0,
 isPublic : false
 },{
 title :"Fund Transfer",  //Alloy.Globals.selectedLanguage.fundTransfer,
 titleAr :"تحويل الأموال",  //Alloy.Globals.selectedLanguage.fundTransfer,
 path : "CoreServices/winFundTransfer",
 image : Alloy.Globals.path.icnFundTransfer,
 id : 0,
 isPublic : false
 },{
 title : "Dashboard", //Alloy.Globals.selectedLanguage.dashBoard,
 titleAr :"لوحة القيادة",  //Alloy.Globals.selectedLanguage.dashBoard,
 path : "CoreServices/winDashBoard",
 image : Alloy.Globals.path.icnDashboard,
 id : 0,
 isPublic : false
 },{
 title : "Budget Reports",  //Alloy.Globals.selectedLanguage.bugetReports,
 titleAr :"تقارير الميزانية",  //Alloy.Globals.selectedLanguage.bugetReports,
 path :  "CoreServices/winBudgetReports",
 image : Alloy.Globals.path.icnBudgetReports,
 id : 0,
 isPublic : false
 },{
 title :  "Federal Final Account Reports", //Alloy.Globals.selectedLanguage.federalAcountReports,
 titleAr :  "تقارير الحساب النهائي الاتحادي",  //Alloy.Globals.selectedLanguage.federalAcountReports,
 path : "CoreServices/winFGFinalAccount",
 image : Alloy.Globals.path.icnFgfinalaccounts,
 id : 0,
 isPublic : false
 },{
 title : "GFS Reports", //Alloy.Globals.selectedLanguage.gfsReports,
 titleAr : "تقارير إحصاءات مالية الحكومة", // Alloy.Globals.selectedLanguage.gfsReports,
 path : "CoreServices/winGFSReports",
 image : Alloy.Globals.path.icnGFSReports,
 id : 0,
 isPublic : false
 },{
 title : "Salary Slip", // Alloy.Globals.selectedLanguage.salarySlip,
 titleAr :"شهادة راتب ", // Alloy.Globals.selectedLanguage.salarySlip,
 path : "CoreServices/winSalarySlip",
 image : Alloy.Globals.path.icnSalarySlip,
 id : 0,
 isPublic : false
 },{
 title :"Notifications",  //Alloy.Globals.selectedLanguage.notifications,
 titleAr :'التنبيهات' , //Alloy.Globals.selectedLanguage.notifications,
 path : "SupportingServices/winNotifications",
 image : Alloy.Globals.path.icnNotifications,
 id : 0,
 isPublic : false
 },{
 title : "FMIS Support", //Alloy.Globals.selectedLanguage.fmisSupport,
 titleAr :"دعم FMIS", //Alloy.Globals.selectedLanguage.fmisSupport,
 path : "SupportingServices/winFMISSupport",
 image : Alloy.Globals.path.icnFmisSupport,
 id : 0,
 isPublic : false
 },{
 title : "Training Plan", //Alloy.Globals.selectedLanguage.trainingPlan,
 titleAr :"خطة التدريب", //Alloy.Globals.selectedLanguage.trainingPlan,
 path : "SupportingServices/winAnnualTrainingPlan",
 image : Alloy.Globals.path.icnTrainingplan,
 id : 0,
 isPublic : false
 },{
 title : "Guides", //Alloy.Globals.selectedLanguage.guides,
 titleAr :"إرشادات", //Alloy.Globals.selectedLanguage.guides,
 path : "SupportingServices/winBudgetGuides",
 image : Alloy.Globals.path.icnBudgetGuides,
 id : 0,
 isPublic : false
 },{
 title : "Location of Federal Entities", //Alloy.Globals.selectedLanguage.locateFederal,
 titleAr :"موقع الكيانات الاتحادية", // Alloy.Globals.selectedLanguage.locateFederal,
 path : "SharedServices/winLocationFederal",
 image : Alloy.Globals.path.icnLocationFederal,
 id : 0,
 isPublic : true
 },{
 title : "About", // Alloy.Globals.selectedLanguage.aboutTitle,
 titleAr :"عن", // Alloy.Globals.selectedLanguage.aboutTitle,
 path : "SharedServices/winAbout",
 image : Alloy.Globals.path.icnAbout,
 id : 0,
 isPublic : true
 },{
 title :"News", //Alloy.Globals.selectedLanguage.news,
 titleAr :"أخبار", // Alloy.Globals.selectedLanguage.news,
 path : "SharedServices/winNewsList",
 image : Alloy.Globals.path.icnNews,
 id : 0,
 isPublic : true
 },{
 title :"Profile", // Alloy.Globals.selectedLanguage.profile,
 titleAr :"الملف الشخصي", // Alloy.Globals.selectedLanguage.profile,
 path : "SharedServices/winProfile",
 image : Alloy.Globals.path.icnProfile,
 id : 0,
 isPublic : true
 }];

 Alloy.Globals.arrLeftPanel = [{
 title : "Home",
 titleAr : "Home",
 path : "",
 image : "",
 id : 1,
 isPublic : false
 },{
 title : "About",
 titleAr : "About",
 path : "",
 image : "",
 id : 2,
 isPublic : false
 },{
 title : "News",
 titleAr : "News",
 path : "",
 image : "",
 id : 3,
 isPublic : false
 },{
 title : "Profile",
 titleAr : "Profile",
 path : "SharedServices/winProfile",
 image : "",
 id : 4,
 isPublic : false
 }];
 */
Alloy.Globals.isNotificationSeen = false;

Alloy.Globals.UserLocation = {
	latitude : 24.492187,
	longitude : 54.375679
};

// Function is used for getting user's current location by "Titanium.Geolocation.getCurrentPosition" function.
Alloy.Globals.getCurrentLocation = function(callback) {
	Titanium.Geolocation.getCurrentPosition(function(e) {
		if (!e.success || e.error) {
			Alloy.Globals.UserLocation = {
				latitude : 24.492187,
				longitude : 54.375679
			};
			Ti.API.info('======Current Location======' + e.success + "," + e.error);
			return;
		}

		var longitude = e.coords.longitude;
		var latitude = e.coords.latitude;
		var altitude = e.coords.altitude;
		var heading = e.coords.heading;
		var accuracy = e.coords.accuracy;
		var speed = e.coords.speed;
		var timestamp = e.coords.timestamp;
		var altitudeAccuracy = e.coords.altitudeAccuracy;

		Alloy.Globals.UserLocation = e.coords;

		Ti.API.log('geo - current location: ' + new Date(timestamp) + ' long ' + longitude + ' lat ' + latitude + ' accuracy ' + accuracy);
		callback(e.coords);
	});
};

Alloy.Globals.startLocationManager = function(e) {

	if (Ti.Geolocation.locationServicesEnabled != true) {
		Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.gpsLocation, Alloy.Globals.selectedLanguage.gpsLocationMessage);
		Alloy.Globals.UserLocation = {
			latitude : 24.492187,
			longitude : 54.375679
		};
		return;
	}
	Ti.Geolocation.preferredProvider = "gps";
	//Titanium.Geolocation.purpose = "For Etisalat Application";

	Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST;
	Titanium.Geolocation.distanceFilter = 10;

	var locationCallback = function(e) {
		if (!e.success || e.error) {
			return;
		}
		Alloy.Globals.UserLocation = e.coords;
		//Ti.App.fireEvent('locationUpdate');
	};

	Alloy.Globals.getCurrentLocation(function(e) {
		Titanium.Geolocation.addEventListener('location', locationCallback);
	});
};

Alloy.Globals.CleanHtml = function(content) {
	//alert("success");
	content = content.replace(/<html[^>]*>/g, '').replace(/<\/html>/g, '');
	content = content.replace(/<body[^>]*>/g, '').replace(/<\/body>/g, '');
	content = content.replace(/<b[^>]*>/g, '').replace(/<\/b>/g, '');
	content = content.replace(/&amp;/g, '&');
	content = content.replace(/&ldquo;/g, '"');
	content = content.replace(/&quot;/g, '"');
	content = content.replace(/&rdquo;/g, '"');
	content = content.replace(/&ndash;/g, '-');
	content = content.replace(/&rsquo;/g, '\'');
	content = content.replace(/&lsquo;/g, '\'');
	content = content.replace(/&nbsp;/g, ' ');
	content = content.replace(/\u200e/g, '');
	content = content.replace(/&rqduo;/g, '\"');
	content = content.replace(/<div[^>]*>/g, '').replace(/<\/div>/g, '');
	content = content.replace(/<p[^>]*>/g, '').replace(/<\/p>/g, '');
	content = content.replace(/<span[^>]*>/g, '').replace(/<\/span>/g, '');
	content = content.replace(/<strong[^>]*>/g, '').replace(/<\/strong>/g, '');
	content = content.replace(/<br *\/?>/gi, '\n');

	return content;

};

Alloy.Globals.deviceID = Titanium.Platform.id;
Alloy.Globals.entityName = "MOF";

if (OS_IOS) {
	Alloy.Globals.deviceType = 10;
	Alloy.Globals.appVersion = 10;
} else {
	Alloy.Globals.deviceType = 20;
	Alloy.Globals.appVersion = 20;
}
//Static Revenue sources
Alloy.Globals.arrFiveYear = [];
function getLastFiveYears() {
	for (var i = 5; i > 0; i--) {
		var currentTime = new Date();
		var year = currentTime.getFullYear() - i;

		Alloy.Globals.arrFiveYear.push({
			year : year
		});

	}
}

getLastFiveYears();

Alloy.Globals.arrThreeYear = [];
function getLastThreeYears() {
	for (var i = 3; i > 0; i--) {
		var currentTime = new Date();
		var year = currentTime.getFullYear() - i;

		Alloy.Globals.arrThreeYear.push({
			year : year
		});

	}
}

getLastThreeYears();

Alloy.Globals.RevenueSourcesReportColors = [{
	id : 1,
	title : Alloy.Globals.selectedLanguage.salary,
	value : "0",
	color : "#E69141"//'#e96307'
}, {
	id : 2,
	title : Alloy.Globals.selectedLanguage.dividend,
	value : "0",
	color : "#4DAA71"//'#eab450'
}, {
	id : 3,
	title : Alloy.Globals.selectedLanguage.rent,
	value : "0",
	color : "#479AD4"//'#84b125'
}, {
	id : 4,
	title : Alloy.Globals.selectedLanguage.familySupport,
	value : "0",
	color : "#D7634C"//'#064fab'
}, {
	id : 5,
	title : Alloy.Globals.selectedLanguage.saving,
	value : "0",
	color : "#d74c7d"//'#843591'
}, {
	id : 6,
	title : 'other1',
	value : "0",
	color : "#b8d74c"//'#ef3c36'
}, {
	id : 7,
	title : 'other 2',
	value : "0",
	color : "#4cc5d7"//'#ffc600'
}, {
	id : 8,
	title : 'other 3',
	value : "0",
	color : "#b14cd7"//'#8cc63e'
}, {
	id : 9,
	title : 'other 4',
	value : "0",
	color : "#4c5cd7"//'#1aa89e'
}, {
	id : 10,
	title : 'other 5',
	value : "0",
	color : "#67b54c"//'#2e3192'
}];

Alloy.Globals.ExpenseCategories = [{
	category_id : "101",
	category_code : "1",
	name_en : "Food",
	name_ar : "غذاء",
	description_en : "Food and Drink",
	description_ar : "الطعام والشراب",
	icon_url : "http://194.170.30.187/Guides/CategoryServices/icnFood.png",
	background_url : "http://194.170.30.187/Guides/CategoryServices/bg4.png"
}, {
	category_id : "102",
	category_code : "2",
	name_en : "Mobile Expense",
	name_ar : "مصاريف الموبايل",
	description_en : "Mobile Expense",
	description_ar : "مصاريف الموبايل",
	icon_url : "http://194.170.30.187/Guides/CategoryServices/icnMobileExpense.png",
	background_url : "http://194.170.30.187/Guides/CategoryServices/bg10.png"
}, {
	category_id : "103",
	category_code : "3",
	name_en : "Clothes",
	name_ar : "ملابس",
	description_en : "Clothes",
	description_ar : "ملابس",
	icon_url : "http://194.170.30.187/Guides/CategoryServices/icnClothes.png",
	background_url : "http://194.170.30.187/Guides/CategoryServices/bg9.png"
}, {
	category_id : "104",
	category_code : "4",
	name_en : "Car Maintenance",
	name_ar : "صيانة السيارات",
	description_en : "Car Maintenance",
	description_ar : "صيانة السيارات",
	icon_url : "http://194.170.30.187/Guides/CategoryServices/icnCar.png",
	background_url : "http://194.170.30.187/Guides/CategoryServices/bg2.png"
}, {
	category_id : "105",
	category_code : "5",
	name_en : "Fuel",
	name_ar : "وقود",
	description_en : "Fuel",
	description_ar : "وقود",
	icon_url : "http://194.170.30.187/Guides/CategoryServices/icnFuel.png",
	background_url : "http://194.170.30.187/Guides/CategoryServices/bg11.png"
}, {
	category_id : "106",
	category_code : "6",
	name_en : "Gym",
	name_ar : "الجمنازيوم",
	description_en : "Gym",
	description_ar : "الجمنازيوم",
	icon_url : "http://194.170.30.187/Guides/CategoryServices/icnGym.png",
	background_url : "http://194.170.30.187/Guides/CategoryServices/bg5.png"
}, {
	category_id : "107",
	category_code : "7",
	name_en : "Shopping",
	name_ar : "التسوق",
	description_en : "Shopping",
	description_ar : "التسوق",
	icon_url : "http://194.170.30.187/Guides/CategoryServices/icnShopping.png",
	background_url : "http://194.170.30.187/Guides/CategoryServices/bg12.png"
}, {
	category_id : "108",
	category_code : "8",
	name_en : "Medical",
	name_ar : "مصاريف طبية",
	description_en : "Medical",
	description_ar : "مصاريف طبية",
	icon_url : "http://194.170.30.187/Guides/CategoryServices/icnMedical.png",
	background_url : "http://194.170.30.187/Guides/CategoryServices/bg7.png"
}, {
	category_id : "109",
	category_code : "9",
	name_en : "Movie",
	name_ar : "أفلام",
	description_en : "Movie",
	description_ar : "أفلام",
	icon_url : "http://194.170.30.187/Guides/CategoryServices/icnMovie.png",
	background_url : "http://194.170.30.187/Guides/CategoryServices/bg1.png"
}, {
	category_id : "110",
	category_code : "10",
	name_en : "Metro Travel Expense",
	name_ar : "مصاريف المواصلات",
	description_en : "Metro Travel Expense",
	description_ar : "مصاريف المواصلات",
	icon_url : "http://194.170.30.187/Guides/CategoryServices/icnMetro.png",
	background_url : "http://194.170.30.187/Guides/CategoryServices/bg8.png"
}, {
	category_id : "111",
	category_code : "11",
	name_en : "Party",
	name_ar : "المناسبات",
	description_en : "Party",
	description_ar : "المناسبات",
	icon_url : "http://194.170.30.187/Guides/CategoryServices/icnParty.png",
	background_url : "http://194.170.30.187/Guides/CategoryServices/bg6.png"
}, {
	category_id : "112",
	category_code : "12",
	name_en : "Parking Expense",
	name_ar : "مصاريف مواقف السيارات",
	description_en : "Parking Expense",
	description_ar : "مصاريف مواقف السيارات",
	icon_url : "http://194.170.30.187/Guides/CategoryServices/parkingExpence.png",
	background_url : "http://194.170.30.187/Guides/CategoryServices/bg3.png"
}, {
	category_id : "113",
	category_code : "13",
	name_en : "Friends",
	name_ar : "أصدقاء",
	description_en : "Friends",
	description_ar : "أصدقاء",
	icon_url : "http://194.170.30.187/Guides/CategoryServices/friends.png",
	background_url : "http://194.170.30.187/Guides/CategoryServices/bg8.png"
}];

Alloy.Globals.arrSupWindow = [];
Alloy.Globals.gotoHomeScreen = function(arrWindow) {
	//Function is just used for going from particular window to the home screen window for "Practice RTA Theory Test".
	if (OS_IOS) {
		for (var i = 0; i <= arrWindow.length - 1; i++) {
			arrWindows[i].close({
				animated : true
			});

		}
	} else {
		for (var i = arrWindow.length - 1; i >= 0; i--) {
			arrWindows[i].close({
				animated : true
			});
		}
	}
};
Alloy.Globals.validateEmail = function(email) {
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
};

/*Alloy.Globals.validateEmail = function(email) {
 var re = /[a-zA-z0-9_.]+@[a-zA-Z0-9_.]+\.(com|ae|uk|in)/g;
 var valid = re.test(email);
 return valid;
 };*/

Alloy.Globals.arrWindows = [];
Alloy.Globals.gotoHome = function(index) {
	//Function is just used for going from particular window to the home screen window for "Practice RTA Theory Test".
	var start = 0;
	if (index != undefined && index != null) {
		start = index;
	}
	if (OS_IOS) {
		for (var i = start; i <= Alloy.Globals.arrWindows.length - 1; i++) {

			Alloy.Globals.arrWindows[i].close({
				animated : true
			});

		}
	} else {
		for (var i = Alloy.Globals.arrWindows.length - 1; i >= start; i--) {

			Alloy.Globals.arrWindows[i].close({
				animated : true
			});

		}
	}
};
Alloy.Globals.getFitZoomMapRegionWithCoords = function(points) {
	/* Function set the region of the map as per the annotations latitude and longitude
	 so that the all annoation pin Fit on the map and can see all the annotion together.
	 */
	var topLeftLatitude = -90;
	var topLeftLongitude = 180;
	var bottomRightLatitude = 90;
	var bottomRightLongitude = -180;

	for (var i = 0; i < points.length; i++) {
		var reg = points[i];
		topLeftLongitude = Math.min(topLeftLongitude, parseFloat(reg.longitude));
		topLeftLatitude = Math.max(topLeftLatitude, parseFloat(reg.latitude));
		bottomRightLongitude = Math.max(bottomRightLongitude, parseFloat(reg.longitude));
		bottomRightLatitude = Math.min(bottomRightLatitude, parseFloat(reg.latitude));
	}

	var fitLatitude = topLeftLatitude - (topLeftLatitude - bottomRightLatitude) * 0.5;
	var fitLongitude = topLeftLongitude + (bottomRightLongitude - topLeftLongitude) * 0.5;
	var fitSpanLatDelta = Math.abs(topLeftLatitude - bottomRightLatitude) * 1.1;
	var fitSpanLongDelta = Math.abs(bottomRightLongitude - topLeftLongitude) * 1.1;
	if (fitSpanLatDelta == 0 && fitSpanLongDelta == 0) {
		fitSpanLatDelta = fitSpanLongDelta = 0.01;
	}
	var fitRegion = {
		latitude : fitLatitude,
		longitude : fitLongitude,
		latitudeDelta : fitSpanLatDelta,
		longitudeDelta : fitSpanLongDelta
	};

	return fitRegion;
};

Alloy.Globals.addCommas = function(nStr) {
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
};

Alloy.Globals.gradiantLinearShape = {
	x1 : 0,
	y1 : 0,
	x2 : 1,
	y2 : 0
};

Alloy.Globals.gradientRadialShape = {
	cx : 0.5,
	cy : 0.5,
	r : 0.5
};

//Send mail to given email id
Alloy.Globals.sendMail = function(emailId, message, callBack) {
	var emailDialog = Ti.UI.createEmailDialog({
	});
	if (emailDialog.isSupported()) {
		//emailDialog.subject = "info";
		emailDialog.toRecipients = [emailId];
		emailDialog.messageBody = message;
		emailDialog.html = true;
		callBack(true);
		emailDialog.open();

	} else {
		callBack(false);
		Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.sendMail, Alloy.Globals.selectedLanguage.mailAccountMsg);
	}
};

var moment = require('alloy/moment');

Alloy.Globals.mSupplierDatePicker = function(txtFld, win) {

	if (OS_IOS) {

		var picker = Ti.UI.createPicker({
			type : Ti.UI.PICKER_TYPE_DATE,
			width : '100%',
			selectionIndicator : true,
			value : new Date(moment().add(1, 'days')),
			minDate : new Date(moment().add(1, 'days')),//new Date(moment().subtract(120, 'days')),
			//	maxDate : new Date(moment().add(300, 'days')),
		});

		if (txtFld.text.length > 0) {
			var date = txtFld.text.split('-');
			Ti.API.info('date=>>=' + JSON.stringify(date));
			var newDate = new Date(date[0], parseInt(date[1]) - 1, date[2]);
			picker.value = newDate;
		}

		var doneButton = Ti.UI.createButton({
			width : '100%',
			backgroundColor : Alloy.Globals.path.servicesColor,
			color : 'white',
			font : (Alloy.isTablet) ? Alloy.Globals.path.font18 : Alloy.Globals.path.font14,
			title : Alloy.Globals.selectedLanguage.doneTitle,
			height : (Alloy.isTablet) ? '40dp' : '35dp',
			textAlign : 'center',
			zIndex : 30,
		});

		var animation = Ti.UI.createAnimation({
			bottom : 0,
			duration : 500
		});
		var clearView = Ti.UI.createView({
			backgroundColor : (Ti.Platform.osname == 'android') ? '#261f68' : '#80000000',
			height : Ti.UI.FILL,
			width : Ti.UI.FILL,

		});

		clearView.addEventListener("click", function(e) {
			var anim = Ti.UI.createAnimation({
				bottom : '-250dp',
				duration : 500
			});
			var animComplete = function() {
				anim.removeEventListener('complete', animComplete);

				clearView.remove(backView);
				win.remove(clearView);
				picker = undefined;
			};

			anim.addEventListener('complete', animComplete);
			backView.animate(anim);
		});

		var backView = Ti.UI.createView({
			width : '100%',
			height : (Alloy.isTablet) ? '256' : '246dp',
			layout : 'vertical',
			bottom : '-250dp',
			zIndex : 25,
			backgroundColor : "red"
		});
		backView.add(doneButton);
		backView.add(picker);
		clearView.add(backView);
		win.add(clearView);

		backView.animate(animation);

		doneButton.addEventListener('click', function() {
			var pickerdate = picker.value;
			Ti.API.info('pickerdate==' + pickerdate);
			var day = pickerdate.getDate();
			var month = pickerdate.getMonth();
			var year = pickerdate.getFullYear();
			if (day < 10)
				day = '0' + day;

			month = parseInt(month) + 1;
			if (month < 10)
				month = '0' + month;

			//service givin error if we are not passing as two digits
			//if (month < 10)
			//month = '0' + month;
			//service givin error if we are not passing as two digits

			//   var newDate1 = day + "-" + (month + 1) + "-" + year;
			var newDate1 = year + "-" + month + "-" + day;
			Ti.API.info('newDate1==' + newDate1);
			//   Ti.API.info('pickerdate=='+JSON.stringify(pickerdate));

			txtFld.text = newDate1;
			txtFld.timeStamp = JSON.stringify(pickerdate);
			//pickerdate.getTime();
			Ti.API.info('txtFld.timeStamp==' + txtFld.timeStamp);

			var anim = Ti.UI.createAnimation({
				bottom : '-250dp',
				duration : 500
			});
			var animComplete = function() {
				anim.removeEventListener('complete', animComplete);

				clearView.remove(backView);
				win.remove(clearView);
				picker = undefined;
			};

			anim.addEventListener('complete', animComplete);
			backView.animate(anim);
		});
	} else {
		var picker = Ti.UI.createPicker({
			minDate : new Date(moment().add(1, 'days')),
		});

		var selectedDate = new Date();
		if (txtFld.text.length > 0) {
			var date = txtFld.text.split('-');
			//txtFld.value.split('-');
			// selectedDate = new Date(txtFld.year, txtFld.monthId, 1);//new Date(date[2], (date[1] - 1), date[0]);

			selectedDate = new Date(date[0], parseInt(date[1]) - 1, date[2]);
		}

		picker.showDatePickerDialog({

			value : selectedDate, // some date
			callback : function(e) {
				if (e.cancel) {
					Ti.API.info('user canceled dialog');
				} else {

					var pickerdate = e.value;
					var day = pickerdate.getDate();
					var month = pickerdate.getMonth();
					var year = pickerdate.getFullYear();
					if (day < 10)
						day = '0' + day;
					//service givin error if we are not passing as two digits
					month = parseInt(month) + 1;
					if (month < 10)
						month = '0' + month;
					//service givin error if we are not passing as two digits

					var newDate1 = year + "-" + month + "-" + day;

					txtFld.text = newDate1;
					txtFld.timeStamp = JSON.stringify(pickerdate);
					//pickerdate.getTime();

				}
			}
		});
	}

};

Alloy.Globals.VATTAXDatePicker = function(txtFld, win) {

	if (OS_IOS) {

		var picker = Ti.UI.createPicker({
			type : Ti.UI.PICKER_TYPE_DATE,
			width : '100%',
			selectionIndicator : true,
			value : new Date(),
			maxDate : new Date(),//new Date(moment().subtract(120, 'days')),
			//	maxDate : new Date(moment().add(300, 'days')),
		});

		if (txtFld.value.length > 0) {
			var date = txtFld.value.split('-');
			Ti.API.info('date=>>=' + JSON.stringify(date));
			var newDate = new Date(date[0], parseInt(date[1]) - 1, date[2]);
			picker.value = newDate;
		}

		var doneButton = Ti.UI.createButton({
			width : '100%',
			backgroundColor : Alloy.Globals.path.servicesColor,
			color : 'white',
			font : (Alloy.isTablet) ? Alloy.Globals.path.font18 : Alloy.Globals.path.font14,
			title : Alloy.Globals.selectedLanguage.doneTitle,
			height : (Alloy.isTablet) ? '40dp' : '35dp',
			textAlign : 'center',
			zIndex : 30,
		});

		var animation = Ti.UI.createAnimation({
			bottom : 0,
			duration : 500
		});
		var clearView = Ti.UI.createView({
			backgroundColor : (Ti.Platform.osname == 'android') ? '#261f68' : '#80000000',
			height : Ti.UI.FILL,
			width : Ti.UI.FILL,

		});

		clearView.addEventListener("click", function(e) {
			var anim = Ti.UI.createAnimation({
				bottom : '-250dp',
				duration : 500
			});
			var animComplete = function() {
				anim.removeEventListener('complete', animComplete);

				clearView.remove(backView);
				win.remove(clearView);
				picker = undefined;
			};

			anim.addEventListener('complete', animComplete);
			backView.animate(anim);
		});

		var backView = Ti.UI.createView({
			width : '100%',
			height : (Alloy.isTablet) ? '256' : '246dp',
			layout : 'vertical',
			bottom : '-250dp',
			zIndex : 25,
			backgroundColor : "red"
		});
		backView.add(doneButton);
		backView.add(picker);
		clearView.add(backView);
		win.add(clearView);

		backView.animate(animation);

		doneButton.addEventListener('click', function() {
			var pickerdate = picker.value;
			Ti.API.info('pickerdate==' + pickerdate);
			var day = pickerdate.getDate();
			var month = pickerdate.getMonth();
			var year = pickerdate.getFullYear();
			if (day < 10)
				day = '0' + day;

			month = parseInt(month) + 1;
			if (month < 10)
				month = '0' + month;

			var newDate1 = year + "-" + month + "-" + day;
			Ti.API.info('newDate1==' + newDate1);

			txtFld.value = newDate1;
			txtFld.timeStamp = JSON.stringify(pickerdate);
			Ti.API.info('txtFld.timeStamp==' + txtFld.timeStamp);

			var anim = Ti.UI.createAnimation({
				bottom : '-250dp',
				duration : 500
			});
			var animComplete = function() {
				anim.removeEventListener('complete', animComplete);

				clearView.remove(backView);
				win.remove(clearView);
				picker = undefined;
			};

			anim.addEventListener('complete', animComplete);
			backView.animate(anim);
		});
	} else {
		var picker = Ti.UI.createPicker({
			maxDate : new Date(),
		});

		var selectedDate = new Date();
		if (txtFld.value.length > 0) {
			var date = txtFld.value.split('-');
			//txtFld.value.split('-');
			// selectedDate = new Date(txtFld.year, txtFld.monthId, 1);//new Date(date[2], (date[1] - 1), date[0]);

			selectedDate = new Date(date[0], parseInt(date[1]) - 1, date[2]);
		}

		picker.showDatePickerDialog({

			value : selectedDate, // some date
			callback : function(e) {
				if (e.cancel) {
					Ti.API.info('user canceled dialog');
				} else {

					var pickerdate = e.value;
					var day = pickerdate.getDate();
					var month = pickerdate.getMonth();
					var year = pickerdate.getFullYear();
					if (day < 10)
						day = '0' + day;
					//service givin error if we are not passing as two digits
					month = parseInt(month) + 1;
					if (month < 10)
						month = '0' + month;
					//service givin error if we are not passing as two digits

					var newDate1 = year + "-" + month + "-" + day;

					txtFld.value = newDate1;
					txtFld.timeStamp = JSON.stringify(pickerdate);
					//pickerdate.getTime();

				}
			}
		});
	}

};

function is7InchTablet() {
	if (OS_IOS) {
		return false;
	}
	var physicalWidth = Alloy.Globals.platformWidth / Ti.Platform.displayCaps.xdpi;
	var physicalHeight = Alloy.Globals.platformHeight / Ti.Platform.displayCaps.ydpi;

	// pythagoras stuff
	var inch = Math.sqrt(physicalWidth * physicalWidth + physicalHeight * physicalHeight);
	if (inch <= 7.5 && Alloy.isTablet) {
		return true;
	} else {
		return false;
	}
}

function is8InchTablet() {
	if (OS_IOS) {
		return false;
	}
	var physicalWidth = Alloy.Globals.platformWidth / Ti.Platform.displayCaps.xdpi;
	var physicalHeight = Alloy.Globals.platformHeight / Ti.Platform.displayCaps.ydpi;

	// pythagoras stuff
	var inch = Math.sqrt(physicalWidth * physicalWidth + physicalHeight * physicalHeight);
	if ((inch <= 8.5 && inch > 7.5) && Alloy.isTablet) {
		return true;
	} else {
		return false;
	}
}

Alloy.Globals.is7InchTablet = is7InchTablet();
Alloy.Globals.is8InchTablet = is8InchTablet();

Alloy.Globals.partnershipTotal = 0;
Alloy.Globals.url = "";
if (OS_ANDROID) {
	// Somehow, only in alloy.js we can get the data (URL) that opened the app
	Alloy.Globals.url = Ti.Android.currentActivity.intent.data;
	if(Alloy.Globals.url == null){
		Alloy.Globals.url = "";
	}
	Ti.API.info('URL = ' + Alloy.Globals.url);
}

Alloy.Globals.GetFormattedHtml = function(language, content, textSize, isDefault) {
	Ti.API.info('TEXT SIZE === >> ' + textSize);
	
	var colorfont,
	    colorback;
	if (isDefault) {
		colorfont = "white";
		colorback = "black";
	} else {
		colorfont = "black";
		colorback = "white";
	}
	var htmlContent = "<!DOCTYPE html>";
	htmlContent += "<html lang=\"en\">";
	htmlContent += "<head>";
	htmlContent += "<meta charset=\"utf-8\">";
	htmlContent += '<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />';
	htmlContent += '<meta name="viewport" content="initial-scale=0" user-scalable="0">';
	//htmlContent += "<meta name=\"viewport\" content=\"width=300, initial-scale=1, maximum-scale=1,user-scalable=0\">";
	htmlContent += "<title>Title of the document</title>";
	htmlContent += "<style type=\"text/css\">";
	
	var bodyFontSize, headerFontSize, header2FontSize;
	
	if(Alloy.isTablet){
		bodyFontSize = (Alloy.Globals.isFullHDTablet) ? (4.0 + textSize) : (1.0 + textSize);
		headerFontSize = (1.5 + textSize);
		header2FontSize = (1.4 + textSize);
	} else {
		headerFontSize = (1.3 + textSize);
		header2FontSize = (1.2 + textSize);
		if(OS_ANDROID){
			bodyFontSize = (3.0 + textSize);
		} else {
			bodyFontSize = (0.8 + textSize);
		}
	}

	if (language == 1) {
		htmlContent += 'html, body, p, h1, h2{padding:0px; margin:0px; }';
		htmlContent += 'body {font-family: Tahoma, Helvetica, sans-serif; font-size:' + bodyFontSize + 'em; margin:1em; }';
		htmlContent += 'h1, h2 {font-family: Arial, Helvetica, sans-serif; font-size:' + headerFontSize + 'em; padding-top: 1.8em}';
		htmlContent += 'body > h1:first-child {padding-top: 0}';
		htmlContent += 'h2 {font-size:' + header2FontSize + 'em;; padding-top: 1.2em; text-decoration: underline}';
		htmlContent += 'ul, ol {padding:0 1.5em; margin:0px;}';
		htmlContent += 'li {padding: 0.2em 0}';
		htmlContent += '.certDetails {padding: 0 1em}';
		htmlContent += '.certDetails h2:first-child {padding-top: 0.2em}';
		htmlContent += '.redPadd {padding-top: 0.2em}';

		htmlContent += "</style>";
		htmlContent += "</head>";

		htmlContent += "<body text=" + colorfont + " bgcolor=" + colorback + ">";
		htmlContent += "<div id=\"container\">";
	} else {
		htmlContent += 'html, body, p, h1, h2{padding:0px; margin:0px; }';
		htmlContent += 'body {font-family: Tahoma, Helvetica, sans-serif; font-size:' + bodyFontSize + 'em; margin:1em; }';
		htmlContent += 'h1, h2 {font-family: Arial, Helvetica, sans-serif; font-size:' + headerFontSize + 'em; padding-top: 1.8em}';
		htmlContent += 'body > h1:first-child {padding-top: 0}';
		htmlContent += 'h2 {font-size:' + header2FontSize + 'em;; padding-top: 1.2em; text-decoration: underline}';
		htmlContent += 'ul, ol {padding:0 1.5em; margin:0px;}';
		htmlContent += 'li {padding: 0.2em 0}';
		htmlContent += '.certDetails {padding: 0 1em}';
		htmlContent += '.certDetails h2:first-child {padding-top: 0.2em}';
		htmlContent += '.redPadd {padding-top: 0.2em}';

		htmlContent += "</style>";
		htmlContent += "</head>";

		htmlContent += "<body dir=\"rtl\" text=" + colorfont + " bgcolor=" + colorback + ">";
		htmlContent += "<div id=\"container\">";
	}

	//_content = _content.replace(/style=/g, 'style1=');

	// htmlContent += '<h1>What is Residence TAX Certificate?</h1><p>It is a certificate issued to take advantage of double taxation avoidance agreements signed by the UAE.</p>';
	// htmlContent += '<h1>COMPANIES</h1><div class="certDetails"><h2>Required Documents:</h2><ol><li>Trade License</li><li>Lease Contract</li><li> Copy of the passport and residence of company director</li>';
	// htmlContent += '<li>Request Letter from the company</li><li>Bank statement for the last 6 months</li><li>Audited financial accounts</li></ol><h2>Fees:</h2>';
	// htmlContent += '<p>5000 Dirhams + 3 Dirhams, paid through e-Dirham Card</p></div><h1>PERSONAL</h1><div class="certDetails"><h2>Required Documents:</h2><ol>';
	// htmlContent += '<li>Passport copy and valid visa copy</li><li>Request Letter from the person</li><li>Bank statement for the last 6 months</li><li>Source of income with attested certificate</li>';
	// htmlContent += '<li>Certificate from the sponsor stating the individual activity and source of income</li></ol><h2>Fees:</h2><p>1000 Dirhams + 3 Dirhams, paid through e-Dirham Card</p></div>';
	// //_content;
	htmlContent += content;
	htmlContent += "</div></body></html>";
	Ti.API.info(">>>>>>>" + htmlContent);
	return htmlContent;
};


Alloy.Globals.suiteName = "group.ae.gov.mofuae";//'group.ae.gov.mofuae'
