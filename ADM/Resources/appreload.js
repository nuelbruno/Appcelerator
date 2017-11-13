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

Ti.App.TitleBarHeight = Ti.App.GetHeight(44);
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
		width : Ti.App.GetWidth(320),
		backgroundImage : Ti.App.ResourcePath + L('top_bar')//L('androidtop'),
	});

	if (backbtn == 1) {
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
			text : LG('Back'),
			top : GetHeight(11),
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
		});
	}

	var lblTitle = Ti.UI.createLabel({
		//left : GetWidth(80),
		top : 0,
		height : Ti.App.TitleBarHeight,
		width : Ti.App.GetWidth(200),
		text : title,
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
			image : 'images/iphoneimages/common/clock.png',
			width : GetWidth(15),
			right : GetWidth(10),
			height : GetHeight(15)
		});
		titleView.add(search_icon);

		search_icon.addEventListener("click", function() {

			Ti.App.fireEvent('event_one', {
				name : 'bar'
			});

		});

	}
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
	if (isTablet) {
		//Ti.App.ResourcePath = '/images/';
		//Ti.App.ClassPath = 'ui/common/android';
		//Window = require('ui/handheld/android/ApplicationWindow');
	} else {
		// iPhone and Mobile Web make use of the platform-specific navigation controller,
		// all other platforms follow a similar UI pattern
		if (osname === 'iphone') {
			Ti.App.ResourcePath = '/images/iphoneImages/';
			Ti.App.ClassPath = 'ui/common/iphone';
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
			Ti.App.ClassPath = 'ui/common/android';
			Window = require('ui/handheld/android/ApplicationWindow');
		}
	}
	//Titanium.API.log("REsource path : "+ Ti.App.ResourcePath +"- resource classpath :"+ Ti.App.ClassPath);
	Ti.include(L('AppConfig'));

	appWindow = new Window();
	
	appWindow.hide();
	
	appWindow.open();

	Ti.include("ui/handheld/ios/customTabBar.js");

	var ctb = new CustomTabBar({
		tabBar : appWindow,
		imagePath : 'images/',
		width : 80,
		height : 40,
		items : [{
			image : 'iphoneimages/bottom_tabs/find_us.png',
			selected : 'iphoneimages/bottom_tabs/find_us_active.png'
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

	ctb.hide();

// #################  LANGUAGE OPTION SHOWING WINDOW ################## //	
	
	Ti.App.Properties.setString('SETTING_LANGUAGE', 'en');

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
		
		appWindow.show();
		ctb.show();
		Win_language.close();
	});
	
	ArabicTab.addEventListener('click', function(e) {
		
		Ti.App.Properties.setString('SETTING_LANGUAGE', 'ar');
		Ti.App.Properties.setString('FIRSTTIME_LOG', true);
		Ti.App.LanguageId = 2;
		
		appWindow.show();
		ctb.show();
		Win_language.close();
	});
	
	Win_language.open();

})();


// #########  LANGUAGE CONVERTION FUNCTION CALL ############# //

function LG(text) {
  
 if (Ti.App.languageXML === undefined || Ti.App.languageXML === null) {
  	
   // var langFile = Ti.App.Properties.getString('SETTING_LANGUAGE'); 
    
    var langFile = (Ti.App.LanguageId == 1)? 'en' : 'ar';
    
    Ti.API.info("File directory=2"+Ti.Filesystem.resourcesDirectory+'i18n/' + langFile + '/strings.xml');
    
    var file = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, 'i18n/' + langFile + '/strings.xml'); // Get the corresponding file from i18n
    
    if (!file.exists()) { //alert('en');
      var langFile = "en"; // Fall back to english as the default language
      file = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory,'i18n/' + langFile + '/strings.xml');
    }
    
    Ti.API.info("File exists="+file.exists());
    
   alert(langFile);
    
    var blob = file.read();
    var xmltext = blob.text;
    var xmldata = Titanium.XML.parseString(xmltext); // Parse the xml
    Ti.App.languageXML = xmldata; // Store the parsed xml so that we don't parse everytime L() is called
  }
  // Get the localised string from xml file
  var xpath = "/resources/string[@name='" + text + "']/text()"; 
  var result = Ti.App.languageXML.evaluate(xpath).item(0);
  if (result) {
    return result.text;
  } else {
    return text; // Return the text if localised version not found
  }
}