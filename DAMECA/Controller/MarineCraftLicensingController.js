
//var getMediaController = function(App)
function getMCraftLicensingController() {
	
	Ti.include(Ti.App.getResourceFile('Utils/CustomTab.js'));

	var tabViewArray = [];
	
	var win = Ti.UI.createWindow({
		backgroundColor:'white',
		fullscreen:true,
		layout:'vertical'
	});
	var backButton = Ti.UI.createView({
		backgroundImage:Ti.App.getResourceFile('images/Common/Back.png'),
		height:'40%',
		width:'10%',
		left:'2%'	
	});
	backButton.addEventListener('click',function(){
		win.close();
	});
	
	var headerView = Ti.UI.createView({
		width:Ti.Platform.displayCaps.platformWidth,
		height:Ti.Platform.displayCaps.platformHeight*10/100,
		top:0,
		// layout:'horizontal', //107FCC  //0A3A72,
		backgroundGradient: {
	        type: 'linear',
	        startPoint: { x: '50%', y: '0%' },
	        endPoint: { x: '50%', y: '100%' },
	        colors: [ '#107FCC','#0A3A72' ]
	   }
	});
	
	var titleBar = Ti.UI.createLabel({
		width:'100%',
		height:'100%',
		textAlign:'center',
		text:Ti.App.L('gallery'),
		color : 'white'
	});
	
	headerView.add(titleBar);
	headerView.add(backButton);
	win.add(headerView);
	win.contentView = Ti.UI.createView({
		width:'100%',
		height:'90%',
		top:0
	});
	win.add(win.contentView);
	
	var cls1 = require(Ti.App.getResourceFile('View/MCraftLCategories'));
	var view1 = new cls1();
	cls1 = undefined;
	
	var cls2 = require(Ti.App.getResourceFile('View/MCraftLServiceProcedure'));
	var view2 = new cls2();
	cls2 = undefined;
	
	var cls3 = require(Ti.App.getResourceFile('View/MCraftLRequirements'));
	var view3 = new cls3();
	cls3 = undefined;
	
	tabViewArray.push(view1);
	tabViewArray.push(view2);
	tabViewArray.push(view3);
	win.contentView.add(createCustomTab(undefined, tabViewArray));
	win.open();
};

module.exports = getMCraftLicensingController; 