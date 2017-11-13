var screenWidth = Ti.Platform.displayCaps.platformWidth;
var screenHeight = Ti.Platform.displayCaps.platformHeight;

Ti.App.GetWidth = function(value) {
	var temp = (value * 100) / 320;
	return parseInt((screenWidth * temp) / 100);
};

Ti.App.GetHeight = function(height, width) {

	if ( typeof (width) == 'undefined') {

		var temp = (height * 100) / 480;
		return parseInt((screenHeight * temp) / 100);
	} else {
		var newHeight = (Ti.App.GetWidth(width) * height) / width;
		return newHeight;
	}
};

var screenWidth = Ti.Platform.displayCaps.platformWidth;
var screenHeight = Ti.Platform.displayCaps.platformHeight;

function GetHeight(value) {
	var temp = (value * 100) / 480;
	return parseInt((screenHeight * temp) / 100);
}

function GetWidth(value) {
	var temp = (value * 100) / 320;
	return parseInt((screenWidth * temp) / 100);
}

// #########  LANGUAGE CONVERTION FUNCTION CALL ############# //
Ti.App.LG = function(text) {
   
    var langFile = (Ti.App.LanguageId == 1)? 'en' : 'ar';	
	
	if ((Ti.App.englishXML === undefined || Ti.App.englishXML === null) && langFile == 'en') {
		
	   var file = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, 'i18n/' + langFile + '/strings.xml'); // Get the corresponding file from i18n
        if (file.exists()) {
        	var blob = file.read();
		    var xmltext = blob.text;
		    var xmldata = Titanium.XML.parseString(xmltext); // Parse the xml
		    Ti.App.englishXML = xmldata;
        }		
	}
	if ((Ti.App.arabicXML === undefined || Ti.App.arabicXML === null) && langFile == 'ar'){
		
	   var file = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, 'i18n/' + langFile + '/strings.xml'); // Get the corresponding file from i18n
        if (file.exists()) {
        	var blob = file.read();
		    var xmltext = blob.text;
		    var xmldata = Titanium.XML.parseString(xmltext); // Parse the xml
		    Ti.App.arabicXML = xmldata;
        }		
	}	
	
	switch(Ti.App.LanguageId) {
				case 1 :
					{
						var xpath = "/resources/string[@name='" + text + "']/text()"; 
						if (Ti.App.englishXML.evaluate(xpath)!=undefined && Ti.App.englishXML.evaluate(xpath).length > 0 ) {
								var result = Ti.App.englishXML.evaluate(xpath).item(0);
								if (result) {
									return result.text;
								} else {
									return text;
								}
							} else
						 return text;	
					}
					break;
				case 2 :
					{
						var xpath = "/resources/string[@name='" + text + "']/text()"; 
						if (Ti.App.arabicXML.evaluate(xpath)!=undefined && Ti.App.arabicXML.evaluate(xpath).length > 0 ) {
								var result = Ti.App.arabicXML.evaluate(xpath).item(0);
								if (result) {
									return result.text;
								} else {
									return text;
								}
							} else
						 return text;	
					}
					break;
				
			}
	
	
  
 
};

Ti.App.TitleBarHeight = Ti.App.GetHeight(44);

Ti.App.ViewTabSet = undefined;
 Ti.App.ViewTab= undefined;
var HistoryWinArray = [];
//Ti.App.GetHeight(31);

//Ti.App.webserviceURL = 'http://gis.adm.gov.ae/';

Ti.App.getDateString = function(date) {

	date = date.replace('/Date(', '');
	date = date.replace(')/', '');

	var projectDate = new Date();

	projectDate.setMilliseconds(date);

	return projectDate.toDateString();
};

Ti.App.SetTitleView = function(win, view, title, searchVisible, backbtn) {
	var titleView = Ti.UI.createView({
		top : 0,
		left : 0,
		zIndex : 2,
		height : Ti.App.TitleBarHeight,
		width : '100%',
		//backgroundColor:'#8b1f05',
		backgroundImage : Ti.App.ResourcePath + L('top_bar')//L('androidtop')
	});
	
	var back_label;
    // alert(osname);
	if (backbtn == 1 && Ti.Platform.osname != 'android') {
		var backButtonview = Ti.UI.createView({
			top : 0,
			left : GetWidth(10),
			//height :Ti.App.TitleBarHeight,
			width : Ti.App.GetWidth(80),
			//height:GetHeight(20)
			//backgroundImage : Ti.App.ResourcePath + L('top_bar')//L('androidtop'),
		});

		titleView.add(backButtonview);

		var backarrow = Ti.UI.createImageView({
			image : 'images/iphoneimages/common/btn_back.png',
			width : GetWidth(15),
			left : GetWidth(0),
			height : GetHeight(20)
		});
		backButtonview.add(backarrow);

		var back_label = Ti.UI.createLabel({
			//text : Ti.App.LG('Back'),
			top : GetHeight(14),
			font : {
				fontSize : GetWidth(14),
				//fontWeight : "bold",
			},
			color : '#FFFFFF',
			left : GetWidth(22)
		});
		backButtonview.add(back_label);

		//var closeBtn = Ti.UI.createButton({title: 'Close'});

		backButtonview.addEventListener("click", function() {
			win.close();
			(Ti.App.ViewTab == undefined) ? '':Ti.App.ViewTab.show();
			(Ti.App.ViewTabSet == undefined) ? '':Ti.App.ViewTabSet.show();
		   
		});
	}

	var lblTitle = Ti.UI.createLabel({
		//left : GetWidth(80),
		top : 0,
		height : Ti.App.TitleBarHeight,
		width : Ti.App.GetWidth(200),
		//text : title,
		color : 'white',
		textAlign : 'center',
		backgroundColor : 'transparent',
		font : {
			fontSize : Ti.App.GetHeight(16), //Ti.App.GetHeight(15), //win.title,
			//fontFamily : 'Helvetica Neue',
			fontWeight : 'bold'
		},
	});
	titleView.add(lblTitle);

	if (searchVisible == 1) {
		var search_icon = Ti.UI.createImageView({
			image : 'images/iphoneimages/search_icon.png',
			width : GetWidth(45),
			right : GetWidth(10),
			height : GetHeight(45)
		});
		titleView.add(search_icon);

		search_icon.addEventListener("click", function() {

			Ti.App.fireEvent('event_one', {
				name : 'bar'
			});

		});

	}
	
	var changeLanguage = function(e) {
		if(backbtn == 1 &&  Ti.Platform.osname != 'android')
      	  back_label.text = Ti.App.LG('Back');
      	  
      	 lblTitle.text = Ti.App.LG(title);
      	 
      	 if(title == 'ComplainOrSuggestion')
      	 {
      	  lblTitle.left = GetWidth(80);
      	 }
	}
	changeLanguage();
	Ti.App.addEventListener('LanguageChanged', changeLanguage);	
	
	view.top = Ti.App.TitleBarHeight;

	win.add(titleView);

	return lblTitle;
};


Ti.App.ShowAlert = function(title, message) {
	var alert = Ti.UI.createAlertDialog({
		title : title,
		message : message,
		buttonNames : [L('Ok')]
	});
	alert.show();
};

var appWindow;

var app = {

};

// This is a single context application with mutliple windows in a stack
(function() {
	//determine platform and form factor and render approproate components
	var osname = Ti.Platform.osname, version = Ti.Platform.version, height = Ti.Platform.displayCaps.platformHeight, width = Ti.Platform.displayCaps.platformWidth;

	//considering tablet to have one dimension over 900px - this is imperfect, so you should feel free to decide
	//yourself what you consider a tablet form factor for android
	var isTablet = osname === 'ipad' || (osname === 'android' && (width > 899 || height > 899));

	var isTablet = (osname === 'android' && (width > 899 || height > 899));

	Ti.App.ResourcePath = '';
	Ti.App.ClassPath = '';
	var Window;
	//Titanium.API.log("osname:"+osname);
	//if (isTablet) {
		//Ti.App.ResourcePath = '/images/';
		//Ti.App.ClassPath = 'ui/common/android';
		//Window = require('ui/handheld/android/ApplicationWindow');
	//} else {
		// iPhone and Mobile Web make use of the platform-specific navigation controller,
		// all other platforms follow a similar UI pattern
		if (osname === 'iphone') {
			Ti.App.ResourcePath = 'images/iphoneimages/';
			Ti.App.ClassPath = 'ui/common/iphoneCode';
			Window = require('ui/handheld/ios/ApplicationWindow');
		}
		// else if (osname == 'ipad') {
		//Ti.App.ResourcePath = '/images/ipadImages/';
		//Ti.App.ClassPath = 'ui/common/ipad';
		//Window = require('ui/handheld/ios/ApplicationWindow');
		//}
		//else if (osname == 'mobileweb') {
		//Window = require('ui/handheld/mobileweb/ApplicationWindow');
		//}
		else {
			Ti.App.ResourcePath = '/images/';
			Ti.App.ClassPath = 'ui/common/androidCode';
			Window = require('ui/handheld/android/ApplicationWindow');
		}
	//}
	//Titanium.API.log("REsource path : "+ Ti.App.ResourcePath +"- resource classpath :"+ Ti.App.ClassPath);
	Ti.include(L('AppConfig'));

	appWindow = new Window();
	
	appWindow.hide();
	
	appWindow.open();

	
// #################  LANGUAGE OPTION SHOWING WINDOW ################## //	
	
	//Ti.App.Properties.setString('SETTING_LANGUAGE', 'en');
   var lang_first =  Ti.App.Properties.getString('SETTING_LANGUAGE');
 if(lang_first != null || lang_first != '')
 {   	

	var Win_language = Ti.UI.createWindow({
		width : '100%',
		backgroundImage : 'images/1_splash.jpg'

	});


	var LangTabView = Ti.UI.createView({
		top : GetHeight(170),
        //left : GetWidth(8),
		width : GetWidth(181),
		height : GetHeight(40),
		borderColor : '#8a2008',
		borderRadius : 3,
		borderWidth : 1,
		layout : 'Horizontal'
		//left:GetWidth(10),
	});
	Win_language.add(LangTabView);

	var EnglishTab = Ti.UI.createLabel({
		text : 'English',
        backgroundColor : 'transparent',
		font : {
			fontSize : GetWidth(12),
			fontWeight : "bold",
		},
		color : '#8a2008',
		textAlign : 'center',
		width : GetWidth(90),
		height : GetHeight(40)
	});
	LangTabView.add(EnglishTab);
	

	var ver_line_tab = Titanium.UI.createLabel({
		text : '',
		height : "100%",
		borderWidth : 1,
		textAlign : 'right',
		borderColor : '#8a2008',
		opacity : 0.8,
		width : 1

	}); 
	LangTabView.add(ver_line_tab);


	var ArabicTab = Ti.UI.createLabel({
		text : 'العربية',
		backgroundColor : 'transparent',
		font : {
			fontSize : GetWidth(12),
			fontWeight : "bold",
		},
		color : '#8a2008',
		textAlign : 'center',
		width : GetWidth(90),
		height : GetHeight(40)
	});
	LangTabView.add(ArabicTab);

	EnglishTab.addEventListener('click', function(e) {
		
		Ti.App.Properties.setString('SETTING_LANGUAGE', 'en');
		Ti.App.Properties.setString('FIRSTTIME_LOG', true);
		Ti.App.LanguageId = 1;
		
		Ti.App.fireEvent('LanguageChanged');
		
		appWindow.show();
		//ctb.show();
		Win_language.close();
		
		Ti.include("ui/handheld/ios/customTabBar.js");

		var ctb = new CustomTabBar({
			tabBar : appWindow,
			imagePath : 'images/',
			width : 80,
			height : 40,
			items : [{
				image : 'iphoneimages/bottom_tabs/home.png',
				selected : 'iphoneimages/bottom_tabs/home_active.png'
			}, {
				image : 'iphoneimages/bottom_tabs/services.png',
				selected : 'iphoneimages/bottom_tabs/services_active.png'
			}, {
				image : 'iphoneimages/bottom_tabs/contact_us.png',
				selected : 'iphoneimages/bottom_tabs/contact_us_active.png'
			}, {
				image : 'iphoneimages/bottom_tabs/more.png',
				selected : 'iphoneimages/bottom_tabs/more_active.png'
			}]
		});
	
	    Ti.App.ViewTab =  ctb;
		//ctb.hide();

	});
	
	ArabicTab.addEventListener('click', function(e) {
		
		Ti.App.Properties.setString('SETTING_LANGUAGE', 'ar');
		Ti.App.Properties.setString('FIRSTTIME_LOG', true);
		Ti.App.LanguageId = 2;
		Ti.App.fireEvent('LanguageChanged');
		appWindow.show();
		//ctb.show();
		Win_language.close();
		
		Ti.include("ui/handheld/ios/customTabBar.js");

		var ctb = new CustomTabBar({
			tabBar : appWindow,
			imagePath : 'images/',
			width : 80,
			height : 40,
			items : [{
				image : 'iphoneimages/ArabicBTabs/find_us.png',
				selected : 'iphoneimages/ArabicBTabs/find_us_active.png'
			}, {
				image : 'iphoneimages/ArabicBTabs/services.png',
				selected : 'iphoneimages/ArabicBTabs/services_active.png'
			}, {
				image : 'iphoneimages/ArabicBTabs/contact_us.png',
				selected : 'iphoneimages/ArabicBTabs/contact_us_active.png'
			}, {
				image : 'iphoneimages/ArabicBTabs/more.png',
				selected : 'iphoneimages/ArabicBTabs/more_active.png'
			}]
		});
		Ti.App.ViewTab =  ctb;
	});
	
	Win_language.open();
  }
  else{
  	    Ti.App.LanguageId = (lang_first == 'en')? 1 : 2;
  	    
		Ti.App.fireEvent('LanguageChanged');
		appWindow.show();
		Ti.include("ui/handheld/ios/customTabBar.js");
        if(Ti.App.LanguageId == 1)
        {
			var ctb = new CustomTabBar({
				tabBar : appWindow,
				imagePath : 'images/',
				width : 80,
				height : 40,
				items : [{
					image : 'iphoneimages/bottom_tabs/home.png',
					selected : 'iphoneimages/bottom_tabs/home_active.png'
				}, {
					image : 'iphoneimages/bottom_tabs/services.png',
					selected : 'iphoneimages/bottom_tabs/services_active.png'
				}, {
					image : 'iphoneimages/bottom_tabs/contact_us.png',
					selected : 'iphoneimages/bottom_tabs/contact_us_active.png'
				}, {
					image : 'iphoneimages/bottom_tabs/more.png',
					selected : 'iphoneimages/bottom_tabs/more_active.png'
				}]
			});
			Ti.App.ViewTab =  ctb;
		}
		else
		{
			  var ctb = new CustomTabBar({
				tabBar : appWindow,
				imagePath : 'images/',
				width : 80,
				height : 40,
				items : [{
					image : 'iphoneimages/ArabicBTabs/find_us.png',
					selected : 'iphoneimages/ArabicBTabs/find_us_active.png'
				}, {
					image : 'iphoneimages/ArabicBTabs/services.png',
					selected : 'iphoneimages/ArabicBTabs/services_active.png'
				}, {
					image : 'iphoneimages/ArabicBTabs/contact_us.png',
					selected : 'iphoneimages/ArabicBTabs/contact_us_active.png'
				}, {
					image : 'iphoneimages/ArabicBTabs/more.png',
					selected : 'iphoneimages/ArabicBTabs/more_active.png'
				}]
			});
			Ti.App.ViewTab =  ctb;	
		}	
  }	

})();



