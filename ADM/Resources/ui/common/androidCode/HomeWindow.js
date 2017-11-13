function HomeWindow(){
	var self=Ti.UI.createWindow({
		navBarHidden:true,
		backgroundColor:Ti.App.DefaultBackGroundColor,
		navBarHidden:true,
		tabBarHidden: true ,
		backButtonTitle:'Back'
	});
	
	return self;
};
module.exports =HomeWindow;
