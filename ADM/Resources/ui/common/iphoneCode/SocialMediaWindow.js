function SocialMediaWindow(){
	var self=Ti.UI.createWindow({
		barImage:Ti.App.ResourcePath + L('top_bar'),
		navBarHidden:true,
		tabBarHidden: true ,
		backButtonTitle:'Back',
		backgroundColor:Ti.App.DefaultBackGroundColor
	});
	
	return self;
};
module.exports = SocialMediaWindow;
