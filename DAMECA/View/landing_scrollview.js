var scrollable_landing = function(App) {

	var controller = require('Utils/MainWindowWithLeftPanel');
	// alert(new controller);
	var win = new controller(App);

	var scrollableView_ld;

	var view1 = Ti.UI.createView({
		backgroundColor : 'transparent ',
		top : 0
	});

	var mainsview1 = Ti.UI.createView({
		backgroundColor : 'transparent ',
		top : 0,
		layout : "vertical"
		//opacity : 0.3
	});
	view1.add(mainsview1);
	
	// +++++++++++++++++++++++++ FIRST COLUMN CODE ++++++++++++++++++++++++++++++//
	// ############################################################################# //
	var horiz_view1 = Ti.UI.createView({
		backgroundColor : 'transparent ',
		width : Ti.UI.SIZE,
		height : GetHeight(120),
		//opacity : 5,
		//zIndex:1,
		top : 0,
		left : 0,
		//horizontalWrap:false,
		layout : "horizontal"
	});

	mainsview1.add(horiz_view1);

	// #################  SERVICE INFORMATION DMCA ################################ //

	var backgrd_img1 = Ti.UI.createView({
		backgroundImage : Ti.Filesystem.resourcesDirectory + 'images/MainNavigation/One.png',
		width : GetWidth(102),
		height : 'auto',
		//opacity : 10,
		//zIndex:2,
		left : 0,
		top : 0
	});

	horiz_view1.add(backgrd_img1);

	var serviceinfo_img = Ti.UI.createImageView({
		width : GetWidth(50),
		height : GetHeight(50),
		zIndex : 5,
		top : GetHeight(10),
		image : Ti.Filesystem.resourcesDirectory + 'images/MainNavigation/DMCASI.png'
	});

	backgrd_img1.add(serviceinfo_img);

	var serviceinfo_label = Ti.UI.createLabel({
		text :Ti.App.L('dmcaserviceinfo'),
		width : '98%',
		height : 'auto',
		zIndex : 5,
		color : '#105285',
		textAlign : 'center',
		font : {
			fontSize : '12sp',
			//fontWeight : "bold",
			//fontFamily : "Arial,Helvetica,sans-serif"
		},
		top : GetHeight(75)
	});

	backgrd_img1.add(serviceinfo_label);
		backgrd_img1.addEventListener('click',function(){
		var Awareness = require(Ti.App.getResourceFile('Controller/ServiceInfo'));
		var view = new Awareness();
		
		Ti.App.setAppHeaderTitle(Ti.App.L('dmcamedia'));
		Ti.App.customViews.removeAllChildren(win.contentView);
		win.contentView.add(view);
		Ti.App.baseWindow = win;
		win.open();
	});

	// #################  MY MARINA DMCA ################################ //

	var backgrd_img2 = Ti.UI.createView({
		backgroundImage : Ti.Filesystem.resourcesDirectory + 'images/MainNavigation/Two.png',
		width : GetWidth(102),
		height : 'auto',
		//opacity : 10,
		//zIndex:2,
		left : 0,
		top : 0
	});

	horiz_view1.add(backgrd_img2);

	var mymarina_img = Ti.UI.createImageView({
		width : GetWidth(50),
		height : GetHeight(50),
		zIndex : 5,
		top : GetHeight(10),
		image : Ti.Filesystem.resourcesDirectory + 'images/MainNavigation/MyMarina.png'
	});

	backgrd_img2.add(mymarina_img);

	var mymarina_label = Ti.UI.createLabel({
		text :Ti.App.L('mymarina'),
		width : '98%',
		height : 'auto',
		zIndex : 5,
		color : '#105285',
		textAlign : 'center',
		font : {
			fontSize : '12sp',
			//fontWeight : "bold",
			//fontFamily : "Arial,Helvetica,sans-serif"
		},
		top : GetHeight(75)
	});

	backgrd_img2.add(mymarina_label);

	backgrd_img2.addEventListener('click', function(e) {

		Ti.App.setAppHeaderTitle('My Marina');
		var getfishingcontroller1 = require(Ti.App.getResourceFile('Controller/mylocationcontroller'));
		var getfishingcontroller = new getfishingcontroller1();
		//var tabWin = getfishingcontroller;
		Ti.App.ActiveTabController = getfishingcontroller;
		//getfishingcontroller.loadTabWithIndex(0);
		//Ti.App.customViews.removeAllChildren(win.contentView);
		win.contentView.add(getfishingcontroller);
		//win.remove(e.source);
		Ti.App.setbackevent(win);
		Ti.App.baseWindow = win;
		win.open();

	});

	// #################  DMCA MEDIA ################################ //

	var backgrd_img3 = Ti.UI.createView({
		backgroundImage : Ti.Filesystem.resourcesDirectory + 'images/MainNavigation/Three.png',
		width : GetWidth(102),
		height : 'auto',
		//opacity : 10,
		//zIndex:2,
		left : 0,
		top : 0
	});

	horiz_view1.add(backgrd_img3);

	var mymarina_img = Ti.UI.createImageView({
		width : GetWidth(50),
		height : GetHeight(50),
		zIndex : 5,
		top : GetHeight(10),
		image : Ti.Filesystem.resourcesDirectory + 'images/MainNavigation/DMCAMedia.png'
	});

	backgrd_img3.add(mymarina_img);

	var mymarina_label = Ti.UI.createLabel({
		text : Ti.App.L('dmcamedia'),
		width : '98%',
		height : 'auto',
		zIndex : 5,
		color : '#105285',
		textAlign : 'center',
		font : {
			fontSize : '12sp',
			//fontWeight : "bold",
			//fontFamily : "Arial,Helvetica,sans-serif"
		},
		top : GetHeight(75)
	});

	backgrd_img3.add(mymarina_label);

	backgrd_img3.addEventListener('click', function(e) {

		Ti.App.setAppHeaderTitle(Ti.App.L('dmcamedia'));
		var getMediaController1 = require(Ti.App.getResourceFile('Controller/MediaController'));
		var getMediaController = new getMediaController1(App);
		var tabWin = getMediaController;
		Ti.App.ActiveTabController = tabWin;
		tabWin.loadTabWithIndex(0);
		win.contentView.add(tabWin);
		win.remove(e.source);
		Ti.App.setbackevent(win);
		Ti.App.baseWindow = win;
		win.open();

	});

	// +++++++++++++++++++++++++ SECOND COLUMN CODE ++++++++++++++++++++++++++++++//
	// ############################################################################# //
	var horiz_view2 = Ti.UI.createView({
		backgroundColor : 'transparent ',
		width : Ti.UI.SIZE,
		height : GetHeight(120),
		//opacity : 5,
		//zIndex:1,
		top : 0,
		left : 0,
		//horizontalWrap:false,
		layout : "horizontal"
	});

	mainsview1.add(horiz_view2);

	// #################   DMCA  AWARENESS ################################ //

	var backgrd_img21 = Ti.UI.createView({
		backgroundImage : Ti.Filesystem.resourcesDirectory + 'images/MainNavigation/Four.png',
		width : GetWidth(102),
		height : 'auto',
		//opacity : 10,
		//zIndex:2,
		left : 0,
		top : 0
	});

	horiz_view2.add(backgrd_img21);

	var sawareness_img = Ti.UI.createImageView({
		width : GetWidth(50),
		height : GetHeight(50),
		zIndex : 5,
		top : GetHeight(10),
		image : Ti.Filesystem.resourcesDirectory + 'images/MainNavigation/DMCAAwareness.png'
	});

	backgrd_img21.add(sawareness_img);

	var sawareness_label = Ti.UI.createLabel({
		text : Ti.App.L('dmcaawareness'),
		width : '96%',
		height : 'auto',
		zIndex : 5,
		color : '#105285',
		textAlign : 'center',
		font : {
			fontSize : '12sp',
			//fontWeight : "bold",
			//fontFamily : "Arial,Helvetica,sans-serif"
		},
		top : GetHeight(75)
	});

	backgrd_img21.add(sawareness_label);
	
	backgrd_img21.addEventListener('click',function(){
		var Awareness = require(Ti.App.getResourceFile('Controller/AwarenessController'));
		var view = new Awareness();
		
		Ti.App.setAppHeaderTitle(Ti.App.L('dmcaawareness'));
		Ti.App.customViews.removeAllChildren(win.contentView);
		Ti.App.setbackevent(win);
		win.contentView.add(view);
		Ti.App.baseWindow = win;
		win.open();
	});

	// #################   DMCA  INTERACTIVE MAPS ################################ //

	var backgrd_img22 = Ti.UI.createView({
		backgroundImage : Ti.Filesystem.resourcesDirectory + 'images/MainNavigation/Five.png',
		width : GetWidth(102),
		height : 'auto',
		//opacity : 10,
		//zIndex:2,
		left : 0,
		top : 0
	});

	horiz_view2.add(backgrd_img22);

	var interactive_img = Ti.UI.createImageView({
		width : GetWidth(50),
		height : GetHeight(50),
		zIndex : 5,
		top : GetHeight(10),
		image : Ti.Filesystem.resourcesDirectory + 'images/MainNavigation/InteractiveMaps.png'
	});

	backgrd_img22.add(interactive_img);

	var interactive_labl = Ti.UI.createLabel({
		text : Ti.App.L('interactivemaps'),
		width : '99%',
		height : 'auto',
		zIndex : 5,
		color : '#105285',
		textAlign : 'center',
		font : {
			fontSize : '12sp',
			//fontWeight : "bold",
			//fontFamily : "Arial,Helvetica,sans-serif"
		},
		top : GetHeight(75)
	});

	backgrd_img22.add(interactive_labl);

	backgrd_img22.addEventListener('click', function(e) {

		var getMediaController1 = require(Ti.App.getResourceFile('View/InteractiveMapsThumb'));
		var view = new getMediaController1();
		Ti.App.setAppHeaderTitle(Ti.App.L('interactivemaps'));
		// var tabWin = getMediaController;
		// App.ActiveTabController = tabWin;
		// tabWin.loadTabWithIndex(0);
		Ti.App.customViews.removeAllChildren(win.contentView);
		win.contentView.add(view);
		Ti.App.setbackevent(win);
		Ti.App.baseWindow = win;
		// win.remove(e.source);
		// win.remove(btn1);
		win.open();

	});

	// #################  DUBAI COAST TODAY ################################ //

	var backgrd_img23 = Ti.UI.createView({
		backgroundImage : Ti.Filesystem.resourcesDirectory + 'images/MainNavigation/Six.png',
		width : GetWidth(102),
		height : 'auto',
		//opacity : 10,
		//zIndex:2,
		left : 0,
		top : 0
	});

	horiz_view2.add(backgrd_img23);

	var dubaicost_img = Ti.UI.createImageView({
		width : GetWidth(50),
		height : GetHeight(50),
		zIndex : 5,
		top : GetHeight(10),
		image : Ti.Filesystem.resourcesDirectory + 'images/MainNavigation/DubaiCoastToday.png'
	});

	backgrd_img23.add(dubaicost_img);
	dubaicost_img.addEventListener('click',function(){
		Ti.Platform.openURL("https://www.marinetraffic.com/en/");
	});

	var dubaicost_lbl = Ti.UI.createLabel({
		text : Ti.App.L('dubaicoasttoday'),
		width : '96%',
		height : 'auto',
		zIndex : 5,
		color : '#105285',
		textAlign : 'center',
		font : {
			fontSize : '12sp',
			//fontWeight : "bold",
			//fontFamily : "Arial,Helvetica,sans-serif"
		},
		top : GetHeight(75)
	});

	backgrd_img23.add(dubaicost_lbl);

	// ++++++++++++++++++++++++++++++++++++ SECOND SCROLLABLVE VIEW CODE +++++++++++++++++++++++++++++++++++++++++//
	// ########################################################################################################### //
	var view2 = Ti.UI.createView({
		backgroundColor : 'transparent ',
		top : 0
		//opacity : 0.3
	});

	var mainsview2 = Ti.UI.createView({
		backgroundColor : 'transparent ',
		top : 0,
		layout : "vertical"
		//opacity : 0.3
	});

	view2.add(mainsview2);

	// +++++++++++++++++++++++++ FIRST COLUMN CODE ++++++++++++++++++++++++++++++//
	// ############################################################################# //
	var horiz_view3 = Ti.UI.createView({
		backgroundColor : 'transparent ',
		width : Ti.UI.SIZE,
		height : GetHeight(120),
		//opacity : 5,
		//zIndex:1,
		top : 0,
		left : 0,
		//horizontalWrap:false,
		layout : "horizontal"
	});

	mainsview2.add(horiz_view3);

	// #################  ABOUT DMCA ################################ //

	var backgrd_img_s1 = Ti.UI.createView({
		backgroundImage : Ti.Filesystem.resourcesDirectory + 'images/MainNavigation/Seven.png',
		width : GetWidth(102),
		height : 'auto',
		//opacity : 10,
		//zIndex:2,
		left : 0,
		top : 0
	});

	horiz_view3.add(backgrd_img_s1);

	var aboutscroll_img = Ti.UI.createImageView({
		width : GetWidth(50),
		height : GetHeight(50),
		zIndex : 5,
		top : GetHeight(10),
		image : Ti.Filesystem.resourcesDirectory + 'images/MainNavigation/AboutDMCA.png'
	});

	backgrd_img_s1.add(aboutscroll_img);

	var aboutscroll_lbl = Ti.UI.createLabel({
		text : Ti.App.L('aboutdmca'),
		width : '98%',
		height : 'auto',
		zIndex : 5,
		color : '#105285',
		textAlign : 'center',
		font : {
			fontSize : '12sp',
			//fontWeight : "bold",
			//fontFamily : "Arial,Helvetica,sans-serif"
		},
		top : GetHeight(75)
	});

	backgrd_img_s1.add(aboutscroll_lbl);

	backgrd_img_s1.addEventListener('click', function(e) {

		var getMediaController1 = require(Ti.App.getResourceFile('Controller/AboutUS'));
		var about_view = new getMediaController1();
		Ti.App.setAppHeaderTitle(Ti.App.L('aboutdmca'));
		Ti.App.ActiveTabController = undefined;
		Ti.App.customViews.removeAllChildren(win.contentView);
		win.contentView.add(about_view);
		win.remove(e.source);
		Ti.App.setbackevent(win);
		Ti.App.baseWindow = win;
		win.open();

	});

	// #################  CONTACT DMCA ################################ //

	var backgrd_img_s2 = Ti.UI.createView({
		backgroundImage : Ti.Filesystem.resourcesDirectory + 'images/MainNavigation/Eight.png',
		width : GetWidth(102),
		height : 'auto',
		//opacity : 10,
		//zIndex:2,
		left : 0,
		top : 0
	});

	horiz_view3.add(backgrd_img_s2);

	var contactscrol_img = Ti.UI.createImageView({
		width : GetWidth(50),
		height : GetHeight(50),
		zIndex : 5,
		top : GetHeight(10),
		image : Ti.Filesystem.resourcesDirectory + 'images/MainNavigation/ContactDMCA.png'
	});

	backgrd_img_s2.add(contactscrol_img);

	var contactscrol_lbl = Ti.UI.createLabel({
		text : Ti.App.L('contactus'),
		width : '96%',
		height : 'auto',
		zIndex : 5,
		color : '#105285',
		textAlign : 'center',
		font : {
			fontSize : '12sp',
			//fontWeight : "bold",
			//fontFamily : "Arial,Helvetica,sans-serif"
		},
		top : GetHeight(75)
	});

	backgrd_img_s2.add(contactscrol_lbl);
	
	backgrd_img_s2.addEventListener('click',function(){
		var Contactus = require(Ti.App.getResourceFile('Controller/ContactUS'));
		var Contactus = new Contactus();
		
		Ti.App.setAppHeaderTitle(Ti.App.L('contactus'));
		Ti.App.customViews.removeAllChildren(win.contentView);
		win.contentView.add(Contactus);
		Ti.App.baseWindow = win;
		win.open();
	});


	
    // ################### Main scrollable view #########################  //
	scrollableView_ld = Ti.UI.createScrollableView({
		views : [view1, view2],
		//showPagingControl:false,
		top : GetHeight(115),
		height : GetHeight(240),
	});

	return scrollableView_ld;
};

module.exports = scrollable_landing; 