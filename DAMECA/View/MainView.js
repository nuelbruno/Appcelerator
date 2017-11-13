var getMainView = function(App){
	var wind = Titanium.UI.createWindow({
		backgroundImage:Ti.Filesystem.resourcesDirectory+'images/main.jpg',
		backgroundColor:'white',
		fullscreen:true
	});
	
	wind.English = Titanium.UI.createButton({
		backgroundImage:Ti.Filesystem.resourcesDirectory+'images/Buttons/English.png',
		height:Ti.Platform.displayCaps.platformWidth*40/100/4.1,
		width:'40%',
		left:'5%',
	});
	
	wind.Arabic = Titanium.UI.createButton({
		backgroundImage:Ti.Filesystem.resourcesDirectory+'images/Buttons/Arabic.png',
		height:Ti.Platform.displayCaps.platformWidth*40/100/4.1,
		width:'40%',
		right:'5%',
	});
	
	var headerView = Ti.UI.createView({
		width:'100%',
		height:Ti.Platform.displayCaps.platformWidth/8.4,
		top:'5%',
		backgroundImage:Ti.Filesystem.resourcesDirectory+'images/Common/Logo.png'
	});
	
	wind.add(headerView);
	wind.add(wind.English);
	wind.add(wind.Arabic);
	
	return wind;
	
};
