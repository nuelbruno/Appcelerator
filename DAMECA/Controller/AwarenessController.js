var getAwarenessController = function(){
	
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
	
	var safetyFirstBackView = Ti.UI.createView({
		// backgroundImage:Ti.App.getResourceFile('images/ListIcons/SafetyFirst.png'),
		backgroundColor:'transparent',
		width:'98%',
		height:Ti.Platform.displayCaps.platformWidth*98/100/5,
		top:width/98*2,
		left:'1%'
	});
	
	var safetyFirstView = Ti.UI.createView({
		backgroundImage:Ti.App.getResourceFile(condBackImage),
		width:'100%',
		top:0
	});
	
	var iconView1 = Ti.UI.createView({
		width: GetWidth(19),//'17.6%',
		height:GetHeight(24.5),
		left:GetWidth(23),
		backgroundImage:Ti.App.getResourceFile('images/ListIcons/SafetyFirst.png'),
		touchEnabled : false
	});
	
	var safetyLabel = Ti.UI.createLabel({
		width:Ti.UI.SIZE,
		left:'27.67%',
		text:Ti.App.L('safety_first'),
		color:'#0A3A72',
		font:'20dp',
		touchEnabled : false
	});
	
	safetyFirstView.addEventListener('touchstart',function(e){
		e.source.backgroundImage = Ti.App.getResourceFile(condBackclickImage);
	});
	
	safetyFirstView.addEventListener('touchend',function(e){
		e.source.backgroundImage = Ti.App.getResourceFile(condBackImage);
	});
	
	safetyFirstView.addEventListener('click',function(e){
		var cls = require(Ti.App.getResourceFile('Controller/SafetyFirstController'));
		var obj = new cls();
	});
	
	safetyFirstView.add(iconView1);
	safetyFirstView.add(safetyLabel);
	safetyFirstBackView.add(safetyFirstView);
	
	backView.add(safetyFirstBackView);
	var boatingQuizFirstBackView = Ti.UI.createView({
		// backgroundImage:Ti.App.getResourceFile('images/ListIcons/SafetyFirst.png'),
		backgroundColor:'transparent',
		width:'98%',
		height:Ti.Platform.displayCaps.platformWidth*98/100/5,
		top:width/98*2,
		left:'1%'
	});
	
	var boatingQuizFirstView = Ti.UI.createView({
		backgroundImage:Ti.App.getResourceFile(condBackImage),
		width:'100%',
		top:0
	});
	
	boatingQuizFirstView.addEventListener('touchstart',function(e){
		e.source.backgroundImage = Ti.App.getResourceFile(condBackclickImage);
	});
	
	boatingQuizFirstView.addEventListener('touchend',function(e){
		e.source.backgroundImage = Ti.App.getResourceFile(condBackImage);
	});
	
	boatingQuizFirstView.addEventListener('click',function(e){
		var window1 = Ti.UI.createWindow({
			fullscreen:true
		});
		var	headerView = Ti.UI.createView({
			width:Ti.Platform.displayCaps.platformWidth,
			height:Ti.Platform.displayCaps.platformHeight*10/100,
			top:0,
			// layout:'horizontal', //107FCC  //0A3A72,
			backgroundGradient: {
		        type: 'linear',
		        startPoint: { x: '50%', y: '0%' },
		        endPoint: { x: '50%', y: '100%' },
		        colors: [ '#0091cf','#084d82' ]
		    }
		});
		
		var headerLabel = Ti.UI.createLabel({
			width:Ti.Platform.displayCaps.platformHeight*9/100,
			height:Ti.Platform.displayCaps.platformHeight*9/100,
			// left:'20%',
			text:'X',
			textAlign:'center',
			color:'white',
			borderColor:'white',
			backgroundColor:'transparent',
			borderRadius:Ti.Platform.displayCaps.platformHeight/18,
			borderWidth:3,
			right:0
		});
		
		headerView.add(headerLabel);
		
		window1.add(headerView);
		// Create a WebView
		var wv = Ti.UI.createWebView({
			top:'10%',
			url : 'http://www.classmarker.com/'
		});
		wv.addEventListener('load', function(e) {
			Ti.API.info('webview loaded: '+ e.url);
		});
		
		// Add to the parent view.
		window1.add(wv);
		window1.open();
		
		headerLabel.addEventListener('click',function(e){
			window1.close();
		});
		
		// Ti.Platform.openURL("http://www.classmarker.com/");
	});
	
	var iconView2 = Ti.UI.createView({
		width: GetWidth(19),//'17.6%',
		height:GetHeight(24.5),
		left:GetWidth(23),
		backgroundImage:Ti.App.getResourceFile('images/Common/boatingquiz.png'),
		touchEnabled : false
	});
	
	var boatingQuizLabel = Ti.UI.createLabel({
		width:Ti.UI.SIZE,
		left:'27.67%',
		text:Ti.App.L('boating_quiz'),
		color:'#0A3A72',
		font:'20dp',
		touchEnabled : false
	});
	
	boatingQuizFirstView.add(iconView2);
	
	if(Ti.App.LangID === 2)
	{
		iconView1.left = undefined;
		iconView2.left = undefined;
		iconView1.right = GetWidth(23);
		iconView2.right = GetWidth(23);
	}
	boatingQuizFirstView.add(boatingQuizLabel);
	boatingQuizFirstBackView.add(boatingQuizFirstView);
	backView.add(boatingQuizFirstBackView);
	return backView;
};
module.exports = getAwarenessController;
