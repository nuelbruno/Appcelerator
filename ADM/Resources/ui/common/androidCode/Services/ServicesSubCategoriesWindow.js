function ServicesSubCategoriesWindow(){
	var self=Ti.UI.createWindow({
		barImage:Ti.App.ResourcePath + L('top_bar'),
		navBarHidden:true,
		tabBarHidden: true ,
		title:'Media',
		backgroundColor:Ti.App.DefaultBackGroundColor
	});
	return self;
};
module.exports = ServicesSubCategoriesWindow;
