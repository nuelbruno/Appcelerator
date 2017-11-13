function MediaWindow(){
	var self=Ti.UI.createWindow({
		barImage:Ti.App.ResourcePath + L('top_bar'),
		navBarHidden:true,
		tabBarHidden: true ,
		title:'Media',
		backgroundColor:Ti.App.DefaultBackGroundColor,
		backButtonTitle:'Back'
	});
	
	return self;
};
module.exports=MediaWindow;