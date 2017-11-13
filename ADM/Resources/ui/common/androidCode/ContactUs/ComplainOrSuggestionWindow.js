function ComplainOrSuggestionWindow(){
	var self=Ti.UI.createWindow({
		barImage:Ti.App.ResourcePath + L('top_bar'),
		navBarHidden:true,
		tabBarHidden: true ,
		backgroundColor:Ti.App.DefaultBackGroundColor
	});
	
	return self;
};

module.exports =ComplainOrSuggestionWindow;