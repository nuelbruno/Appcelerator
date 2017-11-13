// sgn

//all the globals to be added here in the App
Ti.App.baseWindow = undefined;
Ti.App.ServiceInfoController = undefined;
Ti.App.AboutController = undefined;
Ti.App.ContactController = undefined;
Ti.App.MediaController = undefined;
Ti.App.AwarenessController = undefined;
Ti.App.CoastToday = undefined;
Ti.App.FishingLocationController = undefined;
Ti.App.DBName = 'DMCARouteMap';
Ti.App.defaultWindowColor = 'blue';
Ti.App.customViews = undefined;
Ti.App.Defines = undefined;
Ti.App.LangID = 1;

Ti.App.getResourceFile = function(filepath) {
	if (Ti.Platform.osname == 'android') {
		return '../' + filepath;
	} else
		return Titanium.Filesystem.resourcesDirectory + filepath;
};

Ti.App.ActiveTabController = undefined;

Ti.App.fav_latitude = undefined;
Ti.App.fav_longitiude = undefined;

Ti.include(Titanium.Filesystem.resourcesDirectory + 'Utils/CustomViews.js');
Ti.include(Titanium.Filesystem.resourcesDirectory + 'Utils/Defines.js');
Ti.include(Titanium.Filesystem.resourcesDirectory + 'Styling/Styling.js');

Ti.App.Styling = Ti.App.prepareForStyling();

var MainController = require('Controller/MainController');
var win1 = new MainController();

win1.orientationModes = [Titanium.UI.PORTRAIT, Titanium.UI.UPSIDE_PORTRAIT];

win1.open();

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

Ti.App.L = function(text) {

	if (Ti.App.languageXML === undefined || Ti.App.languageXML === null) {
		var langFile = 'en';
		langFile = (Ti.App.LangID === 1) ? 'en' : 'ar';
		Ti.API.info("File directory=2" + Ti.Filesystem.resourcesDirectory + 'i18n/' + langFile + '/strings.xml');
		var file = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, 'i18n/' + langFile + '/strings.xml');
		if (!file.exists()) {
			var langFile = "en";
			file = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, 'i18n/' + langFile + '/strings.xml');
		}
		Ti.API.info("File exists=" + file.exists());
		var blob = file.read();
		var xmltext = blob.text;
		var xmldata = Titanium.XML.parseString(xmltext);
		// Parse the xml
		Ti.App.languageXML = xmldata;
	}
	var xpath = "/resources/string[@name='" + text + "']/text()";
	if(Ti.App.languageXML.evaluate(xpath))
	{	
		var result = Ti.App.languageXML.evaluate(xpath).item(0);
		if (result) {
			return result.text;
		} else {
			return text;
		}
		// Return the text if localised version not found
	}
	else return text;
};

Ti.App.resourceurl = Titanium.Filesystem.resourcesDirectory;

