var getServiceInfoController = function(){
	
	var width = Ti.Platform.displayCaps.platformWidth*96/100;
	var height = width/5;
	
	
	var condBackImage = 'images/Common/ListBg.png';
	var condBackclickImage = 'images/Common/ListBgClick.png';
	if(Ti.App.LangID === 2)
	{
		condBackImage = 'images/Common/ListBgar.png';
		condBackclickImage = 'images/Common/ListBgClickar.png';
	}
	
	var backView = Ti.UI.createView({
		backgroundImage:Ti.App.getResourceFile('images/Backgrounds/DMCAAwareness.jpg'),
		backgroundColor:'white',
		width:'100%',
		height:'100%',
		layout:'vertical'
	});
	/*****************  Marine Craft licensing  ***************/
	
	var craftLicensingFirstBackView = Ti.UI.createView({
		// backgroundImage:Ti.App.getResourceFile('images/ListIcons/SafetyFirst.png'),
		backgroundColor:'transparent',
		width:'98%',
		height:Ti.Platform.displayCaps.platformWidth*98/100/5,
		top:width/98*2,
		left:'1%'
	});
	
	var craftLicensingFirstView = Ti.UI.createView({
		backgroundImage:Ti.App.getResourceFile(condBackImage),
		width:'100%',
		top:0
	});
	
	var iconView1 = Ti.UI.createView({
		width: GetWidth(19),//'17.6%',
		height:GetHeight(24.5),
		left:GetWidth(23),
		backgroundImage:Ti.App.getResourceFile('images/ListIcons/CraftLicensing.png'),
		touchEnabled : false
	});
	
	var craftLicensingLabel = Ti.UI.createLabel({
		width:Ti.UI.SIZE,
		left:'27.67%',
		text:Ti.App.L('marine_craft_crew_licensing'),
		color:'#0A3A72',
		font:'20sp',
		touchEnabled : false
	});
	
	craftLicensingFirstView.addEventListener('touchstart',function(e){
		e.source.backgroundImage = Ti.App.getResourceFile(condBackclickImage);
	});
	
	craftLicensingFirstView.addEventListener('touchend',function(e){
		e.source.backgroundImage = Ti.App.getResourceFile(condBackImage);
	});
	
	craftLicensingFirstView.addEventListener('click',function(e){
		var cls = require(Ti.App.getResourceFile('Controller/MarineCraftLicensingController'));
		var obj = new cls();
	});
	
	craftLicensingFirstView.add(iconView1);
	craftLicensingFirstView.add(craftLicensingLabel);
	craftLicensingFirstBackView.add(craftLicensingFirstView);
	
	
	
	/*****************  Marine Crew licensing  ***************/
	var crewLicensingFirstBackView = Ti.UI.createView({
		// backgroundImage:Ti.App.getResourceFile('images/ListIcons/SafetyFirst.png'),
		backgroundColor:'transparent',
		width:'98%',
		height:Ti.Platform.displayCaps.platformWidth*98/100/5,
		top:width/98*2,
		left:'1%'
	});
	
	var crewLicensingFirstView = Ti.UI.createView({
		backgroundImage:Ti.App.getResourceFile(condBackImage),
		width:'100%',
		top:0
	});
	
	var iconView2 = Ti.UI.createView({
		width: GetWidth(19),//'17.6%',
		height:GetHeight(24.5),
		left:GetWidth(23),
		backgroundImage:Ti.App.getResourceFile('images/ListIcons/CrewLicensing.png'),
		touchEnabled : false
	});
	
	var crewLicensingLabel = Ti.UI.createLabel({
		width:Ti.UI.SIZE,
		left:'27.67%',
		text:Ti.App.L('marine_craft_licensing'),
		color:'#0A3A72',
		font:'20sp',
		touchEnabled : false
	});
	
	crewLicensingFirstView.addEventListener('touchstart',function(e){
		e.source.backgroundImage = Ti.App.getResourceFile(condBackclickImage);
	});
	
	crewLicensingFirstView.addEventListener('touchend',function(e){
		e.source.backgroundImage = Ti.App.getResourceFile(condBackImage);
	});
	
	crewLicensingFirstView.addEventListener('click',function(e){
		var cls = require(Ti.App.getResourceFile('Controller/MarineCrewLicensingController'));
		var obj = new cls();
	});
	
	crewLicensingFirstView.add(iconView2);
	crewLicensingFirstView.add(crewLicensingLabel);
	crewLicensingFirstBackView.add(crewLicensingFirstView);
	
	
	
	/*****************  Marine Commercial licensing  ***************/
	
	
	var commercialLicensingFirstBackView = Ti.UI.createView({
		// backgroundImage:Ti.App.getResourceFile('images/ListIcons/SafetyFirst.png'),
		backgroundColor:'transparent',
		width:'98%',
		height:Ti.Platform.displayCaps.platformWidth*98/100/5,
		top:width/98*2,
		left:'1%'
	});
	
	var commercialLicensingFirstView = Ti.UI.createView({
		backgroundImage:Ti.App.getResourceFile(condBackImage),
		width:'100%',
		top:0
	});
	
	commercialLicensingFirstView.addEventListener('touchstart',function(e){
		e.source.backgroundImage = Ti.App.getResourceFile(condBackclickImage);
	});
	
	commercialLicensingFirstView.addEventListener('touchend',function(e){
		e.source.backgroundImage = Ti.App.getResourceFile(condBackImage);
	});
	
	commercialLicensingFirstView.addEventListener('click',function(e){
		var cls = require(Ti.App.getResourceFile('Controller/MarineCommercialLicensingController'));
		var obj = new cls();
	});
	
	var iconView3 = Ti.UI.createView({
		width: GetWidth(19),//'17.6%',
		height:GetHeight(24.5),
		left:GetWidth(23),
		backgroundImage:Ti.App.getResourceFile('images/ListIcons/CommercialLicensing.png'),
		touchEnabled : false
	});
	
	var commercialLicensingLabel = Ti.UI.createLabel({
		width:Ti.UI.SIZE,
		left:'27.67%',
		text:Ti.App.L('marinetime_commercial_licensing'),
		color:'#0A3A72',
		font:'20sp',
		touchEnabled : false
	});
	
	commercialLicensingFirstView.add(iconView3);
	commercialLicensingFirstView.add(commercialLicensingLabel);
	commercialLicensingFirstBackView.add(commercialLicensingFirstView);
	
	if(Ti.App.LangID === 2)
	{
		iconView1.left = undefined;
		iconView2.left = undefined;
		iconView3.left = undefined;
		iconView1.right = GetWidth(23);
		iconView2.right = GetWidth(23);
		iconView3.right = GetWidth(23);
	}
	
	backView.add(crewLicensingFirstBackView);
	backView.add(craftLicensingFirstBackView);
	backView.add(commercialLicensingFirstBackView);
	
	return backView;
};
module.exports = getServiceInfoController;
