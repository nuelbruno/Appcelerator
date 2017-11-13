function MyLandWindow(){
	var self=Ti.UI.createWindow({
		title:'My Land',
		barImage:Ti.App.ResourcePath + L('top_bar'),
		navBarHidden:true,
		tabBarHidden: true ,
		backButtonTitle:'Back',		
		backgroundColor:Ti.App.DefaultBackGroundColor
	});
	
	
	//self.navBarHidden = true;
	
	
	return self;
};
module.exports = MyLandWindow;
