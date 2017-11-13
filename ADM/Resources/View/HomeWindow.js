function HomeWindow(){
	var self=Ti.UI.createWindow({
		navBarHidden:true,
		backgroundColor:Ti.App.DefaultBackGroundColor
	});
	
	return self;
};
module.exports =HomeWindow;
