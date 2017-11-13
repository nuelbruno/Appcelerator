var landingnavigation = function(App)
{
	
	var landingwin;
	

	landingwin = Ti.UI.createWindow({
		backgroundImage:Ti.App.resourceurl+'images/Backgrounds/Landing.jpg',
		//backgroundColor : 'white', //App.defaultWindowColor,
		frontPanelView : undefined,
		contentView : undefined,
		headerPanel : undefined,
		leftPanel : undefined,
		fullscreen : true
	});
	
	var view_landing = Ti.UI.createView({
		width:'97%',
		height:'auto',
		top:0
	});
	
	// TOP border line and BOTTOM LOGO 	
	var logo_top = Ti.UI.createImageView({
		width:'100%',
		height:GetHeight(40),
		top:GetHeight(10),
		image:Ti.Filesystem.resourcesDirectory+'images/Common/Logo.png'
	});
	
	view_landing.add(logo_top);
	

	var hori_line = Titanium.UI.createLabel({
		text : '',
		height : 2,
		borderWidth : 1,
		top:GetHeight(60),
		textAlign : 'right',
		borderColor : '#b0b0b0',
		opacity : 0.5,
		width : '100%'
	});
	
	/*************** weather view ***************/
	
	var weatherView = Ti.UI.createView({
		width:'90%',
		top:GetHeight(62),
		height:GetHeight(53),
	});
	
	var thisLabelTemp = Ti.UI.createLabel({
	    color:'black',
	    font:{ fontSize: 20, fontWeight:"bold" },
	    text:'--',//"99.9F"+"\u00B0",
	    left:0,
	    height:'70%',
	    bottom:'15%',
	    width:GetHeight(52)*70/100
	});
	
	var wImage = Ti.UI.createImageView({
		bottom:'15%',
		height:'70%',
		image:Ti.App.getResourceFile('WeatherEn/60x60/na.png'),
		left:GetHeight(52)*70/100+10,
		width:GetHeight(52)*70/100
	});
	
	var wTextLabel = Ti.UI.createLabel({
		bottom:'15%',
		height:'30%',
		text:'--',
		left:wImage.left+wImage.width+10
	});
	
	var receivedWeatherData = function(data)
	{
		wImage.image = Ti.App.getResourceFile('WeatherEn/60x60/'+data.iconName+'.png');
		wTextLabel.text = data.text;
		thisLabelTemp.text = data.temp+'°';//encodeURI(data.temp+'°') ;//  data.temp+'°';
	};
	var wParser = require(Ti.App.getResourceFile('Utils/WeatherForcastParser'));
	var parserObj = new wParser(receivedWeatherData);
	weatherView.add(thisLabelTemp);
	weatherView.add(wImage);
	weatherView.add(wTextLabel);
	
	
	
	/*************** weather view ***************/
	
	view_landing.add(hori_line); 
	view_landing.add(weatherView);

    // BANNER ANIMATE IMAGE VIEW 	
	var banneranimate = require('View/banner_animate');
		  
	var banneranimate = new banneranimate(App);
	
	view_landing.add(banneranimate);
	
	// CENTER SCROLLABE VIEW SETUP CODE 
	var scrollable_landing = require('View/landing_scrollview');
		  
	var scrollable_landing = new scrollable_landing(App);

	view_landing.add(scrollable_landing);
    
    landingwin.add(view_landing);
    
	return landingwin;
};

module.exports = landingnavigation;