
Ti.include(Titanium.Filesystem.resourcesDirectory +'View/MainView.js');
var MainController = function() {
	var wind = getMainView();
	
	
	wind.English.addEventListener('click', function(e) {
		Ti.App.LangID = 1;
		var landingnavigation = require('Controller/main_navigation');
		var win_land = new landingnavigation();
		Ti.App.baseWindow = win_land;
		win_land.open();
		//wind.close();
	});

	wind.Arabic.addEventListener('click', function(e) {
		Ti.App.LangID = 2;
		var landingnavigation = require('Controller/main_navigation');
		var win_land = new landingnavigation();
		Ti.App.baseWindow = win_land;
		win_land.open();
		//wind.close();
	});
	return wind;
};
module.exports = MainController;
