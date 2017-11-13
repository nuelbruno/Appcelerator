function MoreWindow(){
	var self=Ti.UI.createWindow({
		barImage:Ti.App.ResourcePath + L('top_bar'),
		backgroundColor:Ti.App.DefaultBackGroundColor,
		navBarHidden:true,
		tabBarHidden: true ,
		backButtonTitle:'Back'
	});
	
	return self;
};
module.exports = MoreWindow;
