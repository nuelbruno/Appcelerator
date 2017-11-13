// Ti.include(Ti.App.getResourceFile('/Model/NewsModel.js'));
// Ti.include(Titanium.Filesystem.resourcesDirectory + '/View/NewsDetailView.js');
var getMCrewLCategoriesView = function() {
	var dataArray = [];
	var meritimeSafetyView = Ti.App.customViews.createCustomTabViews({
		width : '100%',
		height : '100%',
		top : 0,
		layout : 'vertical'
		},Ti.App.L('categories'));
		
	var upperTextView = Ti.UI.createWebView({
		top:0,
		width:'96%',
		color:'black',
		editable:false,
		bottom:0,
		left:'2%',
		scalesPageToFit:true,
		url:Ti.App.getResourceFile('craftCategories.html')
	});
	meritimeSafetyView.add(upperTextView);
		
	meritimeSafetyView.reload = function()
	{
		
	};
	return meritimeSafetyView;
};

module.exports = getMCrewLCategoriesView;