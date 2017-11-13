
//var getMediaController = function(App)
function getContactUsController(App) {
	
	Ti.include(Titanium.Filesystem.resourcesDirectory+'/Utils/CustomTab.js');
	Ti.include(Titanium.Filesystem.resourcesDirectory+'/View/ContactInformation.js');
	Ti.include(Titanium.Filesystem.resourcesDirectory+'/View/ContactLocationmap.js');
	Ti.include(Titanium.Filesystem.resourcesDirectory+'/View/feedbackInquiry.js');
	
	var tabViewArray = [];
	var view1 = getcontactinformation(App);
	var view2 = getClocationmap(App);
	var view3 = getfeedbackinquiry(App);
	
	tabViewArray.push(view1);
	tabViewArray.push(view2);
	tabViewArray.push(view3);
	return createCustomTab(App, tabViewArray);
};

module.exports = getContactUsController; 