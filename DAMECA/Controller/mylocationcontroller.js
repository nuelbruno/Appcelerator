
//var getfishingcontroller = function(App)
function getfishingcontroller(App) {

	Ti.include(Titanium.Filesystem.resourcesDirectory+'Utils/CustomTab.js');
	Ti.include(Titanium.Filesystem.resourcesDirectory+'View/mylocationview.js');
	Ti.include(Titanium.Filesystem.resourcesDirectory+'View/showdirectionview.js');
	Ti.include(Titanium.Filesystem.resourcesDirectory+'View/myfavouriteview.js');
	var tabViewArray = [];
	var view1 = getmylocationview(App);
	var view2 = getshowdirection(App);
	var view3 = getmyfavourite(App);
	
	tabViewArray.push(view1);
	tabViewArray.push(view2);
	tabViewArray.push(view3);
	return createCustomTab(App, tabViewArray);
};

module.exports = getfishingcontroller; 