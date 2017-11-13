
//var getMediaController = function(App)
function getMediaController(App) {
	
	Ti.include(Titanium.Filesystem.resourcesDirectory+'/Utils/CustomTab.js');
	Ti.include(Titanium.Filesystem.resourcesDirectory+'/View/NewsView.js');
	Ti.include(Titanium.Filesystem.resourcesDirectory+'/View/GalleryView.js');

	var tabViewArray = [];
	var view1 = getNewsView(App);
	var view2 = getGalleryView(App);
	
	tabViewArray.push(view1);
	tabViewArray.push(view2);
	return createCustomTab(App, tabViewArray);
};

module.exports = getMediaController; 