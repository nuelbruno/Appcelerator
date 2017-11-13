function ServicesItemsWindow()
{
	var self = Ti.UI.createWindow({
		top:0,
		left:10,
		barImage:Ti.App.ResourcePath + L('top_bar'),
		backgroundColor:Ti.App.DefaultBackGroundColor,
		
		navBarHidden:true,
		tabBarHidden: true ,
		backButtonTitle:'Back'
	});
	return self;
};
module.exports = ServicesItemsWindow;
