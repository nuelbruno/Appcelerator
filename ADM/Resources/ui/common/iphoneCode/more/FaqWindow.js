function FaqWindow(){
	var self = Ti.UI.createWindow({
		barImage:Ti.App.ResourcePath + L('top_bar'),
		backgroundColor:Ti.App.DefaultBackGroundColor,
		backButtonTitle:'Back',
		navBarHidden:true,
		tabBarHidden: true ,
	});
	return self;
};
module.exports =FaqWindow;