var leftpanelviewcnt = function(mainWindow, frontPanelView, listDrawerBtn) {
	
	function slideanimation()
	{
		    listDrawerBtn.enabled = false;
			Ti.App.isSlided = false;
			// slide to the original position
			var animation = Titanium.UI.createAnimation();
			animation.left = 0;
			animation.duration = 500;
			var animationHandler = function() {
				animation.removeEventListener('complete', animationHandler);
				frontPanelView.animate(animation);
			};
			animation.addEventListener('complete', animationHandler);
			listDrawerBtn.enabled = true;
			frontPanelView.animate(animation);
	}
	
	var leftpan_contentview = Ti.UI.createView({
		//backgroundColor : '#0A3A72',
		left : 0,
		right : 0,
		top : 0,
		bottom : 0
	});

  
    var pan_topview = Ti.UI.createView({
		left : 0,
		top : 0,
		width:'96%',
		height:GetHeight(20),
		backgroundGradient: {
	        type: 'linear',
	        startPoint: { x: '50%', y: '0%' },
	        endPoint: { x: '50%', y: '100%' },
	        colors: [ '#008fcc','#07598f' ]
	  },
	   layout : "horizontal"
	});

	leftpan_contentview.add(pan_topview);
	
	var navigation_arrow_img = Ti.UI.createImageView({
		width:GetWidth(14),
		height:'auto',
		left:GetWidth(3),
		top:GetHeight(3),
		image:Ti.Filesystem.resourcesDirectory+'images/SideBar/Navigation.png'
	});
	
	pan_topview.add(navigation_arrow_img);
	
	var navgationtext = Ti.UI.createLabel({
		text : 'NAVIGATION',
		width : '70%',
		height : 'auto',
		color:'#78d1f5',
		left:GetWidth(3),
		font : {
			fontSize : '10sp',
			//fontWeight : "bold",
			//fontFamily : "Arial,Helvetica,sans-serif"
		},
		top : GetHeight(3)
	}); 
	pan_topview.add(navgationtext);
	
	// ################ ALL MENUS ADDING #################### //
	var allmenu_view = Ti.UI.createView({
		top:GetHeight(20),
		width:'100%',
		height:'auto',
		backgroundGradient: {
	        type: 'linear',
	        startPoint: { x: '50%', y: '0%' },
	        endPoint: { x: '50%', y: '100%' },
	        colors: [ '#008fcc','#074f82' ]
	  },
	   layout : "vertical"
	});

	leftpan_contentview.add(allmenu_view);
	
	//  DMCA SERVICE INFORMATION ########## //
	var dmcaserv_view = Ti.UI.createView({
		left : 0,
		top : 0,
		height:GetHeight(45),
		layout:'horizontal'
	});
	
	allmenu_view.add(dmcaserv_view);
	
	
	var dmcaservice_img = Ti.UI.createImageView({
		width:GetWidth(28),
		height:'auto',
		left:GetWidth(4),
		top:GetHeight(10),
		image:Ti.Filesystem.resourcesDirectory+'images/SideBar/DMCASI.png'
	});
	
	dmcaserv_view.add(dmcaservice_img);
	
	var dmcaservice_lblnav = Ti.UI.createLabel({
		text :Ti.App.L('dmcaserviceinfo'),
		width : '80%',
		height : 'auto',
		color:'#FFFFFF',
		left:GetWidth(8),
		font : {
			fontSize : '13sp',
			//fontWeight : "bold",
			//fontFamily : "Arial,Helvetica,sans-serif"
		},
		top : GetHeight(14)
	}); 
	dmcaserv_view.add(dmcaservice_lblnav);
	
	var dmcaline_service = Titanium.UI.createLabel({
		text : '',
		height : 1,
		borderWidth : 1,
		top:GetHeight(2),
		borderColor : '#FFFFFF',
		opacity : 0.3,
		width : '100%'
	});
	
	allmenu_view.add(dmcaline_service);
	// MY MARIAN ######################### //
	var Marina_view = Ti.UI.createView({
		left : 0,
		top : 0,
		height:GetHeight(45),
		layout:'horizontal'
	});
	
	allmenu_view.add(Marina_view);
	
	
	var marina_img_panel = Ti.UI.createImageView({
		width:GetWidth(28),
		height:'auto',
		left:GetWidth(4),
		top:GetHeight(10),
		image:Ti.Filesystem.resourcesDirectory+'images/SideBar/MyMarina.png'
	});
	
	Marina_view.add(marina_img_panel);
	
	var marina_lbl_panel = Ti.UI.createLabel({
		text :Ti.App.L('mymarina'),
		width : '80%',
		height : 'auto',
		color:'#FFFFFF',
		left:GetWidth(8),
		font : {
			fontSize : '13sp',
			//fontWeight : "bold",
			//fontFamily : "Arial,Helvetica,sans-serif"
		},
		top : GetHeight(14)
	}); 
	Marina_view.add(marina_lbl_panel);
	
	var marinaline_panel = Titanium.UI.createLabel({
		text : '',
		height : 2,
		borderWidth : 1,
		top:GetHeight(2),
		borderColor : '#FFFFFF',
		opacity : 0.3,
		width : '100%'
	});
	
	allmenu_view.add(marinaline_panel);
	
	Marina_view.addEventListener('click', function(e) {

		Ti.App.setAppHeaderTitle('My Marina');
		var getfishingcontroller1 = require(Ti.App.getResourceFile('Controller/mylocationcontroller'));
		var getfishingcontroller = new getfishingcontroller1();
		var tabWin = getfishingcontroller;
		Ti.App.ActiveTabController = tabWin;
		tabWin.loadTabWithIndex(0);
		mainWindow.contentView.add(tabWin);
		mainWindow.remove(mainWindow.contentView);
		Ti.App.setbackevent(mainWindow);
		//Ti.App.baseWindow = win;
		mainWindow.open();
		
		slideanimation();

	});
	
	// DMCA MEDIA ####################### //
	var Media_view = Ti.UI.createView({
		left : 0,
		top : 0,
		height:GetHeight(45),
		layout:'horizontal'
	});
	
	allmenu_view.add(Media_view);
	
	
	var media_img_panel = Ti.UI.createImageView({
		width:GetWidth(28),
		height:'auto',
		left:GetWidth(4),
		top:GetHeight(10),
		image:Ti.Filesystem.resourcesDirectory+'images/SideBar/DMCAMedia.png'
	});
	
	Media_view.add(media_img_panel);
	
	var media_lbl_panel = Ti.UI.createLabel({
		text : Ti.App.L('dmcamedia'),
		width : '80%',
		height : 'auto',
		color:'#FFFFFF',
		left:GetWidth(8),
		font : {
			fontSize : '13sp',
			//fontWeight : "bold",
			//fontFamily : "Arial,Helvetica,sans-serif"
		},
		top : GetHeight(14)
	}); 
	Media_view.add(media_lbl_panel);
	
	var medialine_panel = Titanium.UI.createLabel({
		text : '',
		height : 2,
		borderWidth : 1,
		top:GetHeight(2),
		borderColor : '#FFFFFF',
		opacity : 0.3,
		width : '100%'
	});
	
	allmenu_view.add(medialine_panel);
	
	Media_view.addEventListener('click', function(e) {
		Ti.App.setAppHeaderTitle(Ti.App.L('dmcamedia'));
		var getMediaController1 = require(Ti.App.getResourceFile('Controller/MediaController'));
		var getMediaController = new getMediaController1();
		var tabWin = getMediaController;
		Ti.App.ActiveTabController = tabWin;
		tabWin.loadTabWithIndex(0);
		mainWindow.contentView.add(tabWin);
		mainWindow.remove(mainWindow.contentView);
		Ti.App.setbackevent(mainWindow);
		//Ti.App.baseWindow = win;
		mainWindow.open();
		slideanimation();

	});
	// DMCA AWARENESS ##################### //
	var Awareness_view = Ti.UI.createView({
		left : 0,
		top : 0,
		height:GetHeight(45),
		layout:'horizontal'
	});
	
	allmenu_view.add(Awareness_view);
	
	
	var awareness_img_panel = Ti.UI.createImageView({
		width:GetWidth(28),
		height:'auto',
		left:GetWidth(4),
		top:GetHeight(10),
		image:Ti.Filesystem.resourcesDirectory+'images/SideBar/DMCAAwareness.png'
	});
	
	Awareness_view.add(awareness_img_panel);
	
	var awareness_lbl_panel = Ti.UI.createLabel({
		text : Ti.App.L('dmcaawareness'),
		width : '80%',
		height : 'auto',
		color:'#FFFFFF',
		left:GetWidth(8),
		font : {
			fontSize : '13sp',
			//fontWeight : "bold",
			//fontFamily : "Arial,Helvetica,sans-serif"
		},
		top : GetHeight(14)
	}); 
	Awareness_view.add(awareness_lbl_panel);
	
    Awareness_view.addEventListener('click',function(){
    	
		var Awareness = require(Ti.App.getResourceFile('Controller/AwarenessController'));
		var view = new Awareness();
		
		Ti.App.setAppHeaderTitle(Ti.App.L('dmcaawareness'));
		Ti.App.customViews.removeAllChildren(mainWindow.contentView);
		mainWindow.contentView.add(view);
		mainWindow.remove(mainWindow.contentView);
		Ti.App.setbackevent(mainWindow);
		//Ti.App.baseWindow = win;
		mainWindow.open();
		slideanimation();
	});
	
	var awareline_panel = Titanium.UI.createLabel({
		text : '',
		height : 2,
		borderWidth : 1,
		top:GetHeight(2),
		borderColor : '#FFFFFF',
		opacity : 0.3,
		width : '100%'
	});
	
	allmenu_view.add(awareline_panel);
	
	// INTERACTIVE MAPS ################## //
	
	var Interactive_view = Ti.UI.createView({
		left : 0,
		top : 0,
		height:GetHeight(45),
		layout:'horizontal'
	});
	
	allmenu_view.add(Interactive_view);
	
	
	var awareness_img_panel = Ti.UI.createImageView({
		width:GetWidth(28),
		height:'auto',
		left:GetWidth(4),
		top:GetHeight(10),
		image:Ti.Filesystem.resourcesDirectory+'images/SideBar/InteractiveMaps.png'
	});
	
	Interactive_view.add(awareness_img_panel);
	
	var awareness_lbl_panel = Ti.UI.createLabel({
		text : Ti.App.L('interactivemaps'),
		width : '80%',
		height : 'auto',
		color:'#FFFFFF',
		left:GetWidth(8),
		font : {
			fontSize : '13sp',
			//fontWeight : "bold",
			//fontFamily : "Arial,Helvetica,sans-serif"
		},
		top : GetHeight(14)
	}); 
	Interactive_view.add(awareness_lbl_panel);
	
	Interactive_view.addEventListener('click', function(e) {

		var getMediaController1 = require(Ti.App.getResourceFile('View/InteractiveMapsThumb'));
		var view = new getMediaController1();
		Ti.App.setAppHeaderTitle(Ti.App.L('interactivemaps'));
		Ti.App.customViews.removeAllChildren(mainWindow.contentView);
		mainWindow.contentView.add(view);
		mainWindow.remove(mainWindow.contentView);
		Ti.App.setbackevent(mainWindow);
		//Ti.App.baseWindow = win;
		mainWindow.open();
		slideanimation();

	});
	
	var interline_panel = Titanium.UI.createLabel({
		text : '',
		height : 2,
		borderWidth : 1,
		top:GetHeight(2),
		borderColor : '#FFFFFF',
		opacity : 0.3,
		width : '100%'
	});
	
	allmenu_view.add(interline_panel);
	
	// DUABI COAST TODAY ################## //
	
	var Coast_view = Ti.UI.createView({
		left : 0,
		top : 0,
		height:GetHeight(45),
		layout:'horizontal'
	});
	
	allmenu_view.add(Coast_view);
	
	
	var cost_img_panel = Ti.UI.createImageView({
		width:GetWidth(28),
		height:'auto',
		left:GetWidth(4),
		top:GetHeight(10),
		image:Ti.Filesystem.resourcesDirectory+'images/SideBar/DubaiCoastToday.png'
	});
	
	Coast_view.add(cost_img_panel);
	
	var cost_lbl_panel = Ti.UI.createLabel({
		text : Ti.App.L('dubaicoasttoday'),
		width : '80%',
		height : 'auto',
		color:'#FFFFFF',
		left:GetWidth(8),
		font : {
			fontSize : '13sp',
			//fontWeight : "bold",
			//fontFamily : "Arial,Helvetica,sans-serif"
		},
		top : GetHeight(14)
	}); 
	Coast_view.add(cost_lbl_panel);
	
	var coastline_panel = Titanium.UI.createLabel({
		text : '',
		height : 2,
		borderWidth : 1,
		top:GetHeight(2),
		borderColor : '#FFFFFF',
		opacity : 0.3,
		width : '100%'
	});
	
	allmenu_view.add(coastline_panel);
	
	// ABOUT DMCA ######################## //
	var About_view = Ti.UI.createView({
		left : 0,
		top : 0,
		height:GetHeight(45),
		layout:'horizontal'
	});
	
	allmenu_view.add(About_view);
	
	
	var about_img_panel = Ti.UI.createImageView({
		width:GetWidth(28),
		height:'auto',
		left:GetWidth(4),
		top:GetHeight(10),
		image:Ti.Filesystem.resourcesDirectory+'images/SideBar/AboutDMCA.png'
	});
	
	About_view.add(about_img_panel);
	
	var about_lbl_panel = Ti.UI.createLabel({
		text : Ti.App.L('aboutdmca'),
		width : '80%',
		height : 'auto',
		color:'#FFFFFF',
		left:GetWidth(8),
		font : {
			fontSize : '13sp',
			//fontWeight : "bold",
			//fontFamily : "Arial,Helvetica,sans-serif"
		},
		top : GetHeight(14)
	}); 
	About_view.add(about_lbl_panel);
	
	About_view.addEventListener('click', function(e) {

		var getMediaController1 = require(Ti.App.getResourceFile('Controller/AboutUS'));
		var about_view = new getMediaController1();
		Ti.App.setAppHeaderTitle(Ti.App.L('aboutdmca'));
		Ti.App.ActiveTabController = undefined;
		Ti.App.customViews.removeAllChildren(mainWindow.contentView);
		mainWindow.contentView.add(about_view);
		mainWindow.remove(mainWindow.contentView);
		Ti.App.setbackevent(mainWindow);
		//Ti.App.baseWindow = win;
		mainWindow.open();
		slideanimation();

	});
	
	var aboutline_panel = Titanium.UI.createLabel({
		text : '',
		height : 2,
		borderWidth : 1,
		top:GetHeight(2),
		borderColor : '#FFFFFF',
		opacity : 0.3,
		width : '100%'
	});
	
	allmenu_view.add(aboutline_panel);
	// CONTAC T######################### //
	var Contact_view = Ti.UI.createView({
		left : 0,
		top : 0,
		height:GetHeight(45),
		layout:'horizontal'
	});
	
	allmenu_view.add(Contact_view);
	
	
	var contact_img_panel = Ti.UI.createImageView({
		width:GetWidth(28),
		height:'auto',
		left:GetWidth(4),
		top:GetHeight(10),
		image:Ti.Filesystem.resourcesDirectory+'images/SideBar/ContactDMCA.png'
	});
	
	Contact_view.add(contact_img_panel);
	
	var contact_lbl_panel = Ti.UI.createLabel({
		text : Ti.App.L('contactus'),
		width : '80%',
		height : 'auto',
		color:'#FFFFFF',
		left:GetWidth(8),
		font : {
			fontSize : '13sp',
			//fontWeight : "bold",
			//fontFamily : "Arial,Helvetica,sans-serif"
		},
		top : GetHeight(14)
	}); 
	Contact_view.add(contact_lbl_panel);
	
	var contactline_panel = Titanium.UI.createLabel({
		text : '',
		height : 2,
		borderWidth : 1,
		top:GetHeight(2),
		borderColor : '#FFFFFF',
		opacity : 0.3,
		width : '100%'
	});
	
	allmenu_view.add(contactline_panel);
	
	// LANGUAGE ######################## //
	
	var Language_view = Ti.UI.createView({
		left : 0,
		top : 0,
		height:GetHeight(45),
		layout:'horizontal'
	});
	
	allmenu_view.add(Language_view);
	
	
	var lang_img_panel = Ti.UI.createImageView({
		width:GetWidth(28),
		height:'auto',
		left:GetWidth(4),
		top:GetHeight(10),
		image:Ti.Filesystem.resourcesDirectory+'images/SideBar/ChangeLang.png'
	});
	
	Language_view.add(lang_img_panel);
	
	var lang_lbl_panel = Ti.UI.createLabel({
		text : 'Change Language',
		width : '80%',
		height : 'auto',
		color:'#FFFFFF',
		left:GetWidth(8),
		font : {
			fontSize : '13sp',
			//fontWeight : "bold",
			//fontFamily : "Arial,Helvetica,sans-serif"
		},
		top : GetHeight(14)
	}); 
	Language_view.add(lang_lbl_panel);
	
	var langline_panel = Titanium.UI.createLabel({
		text : '',
		height : 2,
		borderWidth : 1,
		top:GetHeight(2),
		borderColor : '#FFFFFF',
		opacity : 0.3,
		width : '100%'
	});
	
	allmenu_view.add(langline_panel);
	

	return leftpan_contentview;
};

module.exports = leftpanelviewcnt; 