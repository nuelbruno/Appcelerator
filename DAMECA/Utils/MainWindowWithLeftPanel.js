var LeftPanelWindow = function(frontPanelContentView, leftpanelContentView) {
	//alert(Ti.App.Styling);
	Ti.App.isSlided = false;
	var mainWindow;
	var leftPanelView;
	var listDrawerBtn;
	var mainWindowHeaderView;
	// mainWindow.contentView;
	var frontPanelView;
	var headerView;

	mainWindow = Ti.UI.createWindow({
		backgroundColor : 'white', //App.defaultWindowColor,
		frontPanelView : undefined,
		contentView : undefined,
		headerPanel : undefined,
		leftPanel : undefined,
		fullscreen : true
	});

	leftPanelView = Ti.UI.createView({
		//backgroundColor : '#0A3A72',
		left : 0,
		right : 0,
		top : 0,
		bottom : 0
	});

	headerView = Ti.UI.createView({
		width : Ti.Platform.displayCaps.platformWidth,
		height : Ti.Platform.displayCaps.platformHeight * 10 / 100,
		top : 0,
		// layout:'horizontal', //107FCC  //0A3A72,
		backgroundGradient : {
			type : 'linear',
			startPoint : {
				x : '50%',
				y : '0%'
			},
			endPoint : {
				x : '50%',
				y : '100%'
			},
			colors : ['#0091cf', '#084d82']
		}
	});

	var headerLabel = Ti.UI.createLabel({
		width : '60%',
		height : '100%',
		left : '20%',
		text : Ti.App.L('dmcamedia'),
		font : {
			fontSize : '12sp',
			//fontWeight : "bold",
			//fontFamily : "Arial,Helvetica,sans-serif"
		},
		textAlign : 'center',
		color : 'white'
	});

	Ti.App.setbackevent = function(win_cls) {
		headerLabel.addEventListener('click', function() {
			win_cls.close();
			if (Ti.App.directionwin != undefined) {
				Ti.App.directionwin.close();
			}
		});
	};

	Ti.App.setAppHeaderTitle = function(title) {
		headerLabel.text = title;
	};

	frontPanelView = Ti.UI.createView({
		backgroundColor : 'white',
		left : 0,
		width : Ti.Platform.displayCaps.platformWidth,
		top : 0,
		bottom : 0
	});
	mainWindow.contentView = Ti.UI.createView({
		width : '100%',
		height : '90%',
		top : '10%'
	});

	listDrawerBtn = Ti.UI.createButton({
		left : Ti.App.Styling.leftPanelistButtonStyle.left,
		width : Ti.App.Styling.leftPanelistButtonStyle.width,
		height : Ti.App.Styling.leftPanelistButtonStyle.height,
		backgroundImage : Titanium.Filesystem.resourcesDirectory + 'images/Common/Nav.png'
	});

	listDrawerBtn.addEventListener('click', function() {
		if (Ti.App.isSlided) {
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
		} else// slide
		{
			listDrawerBtn.enabled = false;
			Ti.App.isSlided = true;
			var animation = Titanium.UI.createAnimation();
			animation.left = Math.floor((Ti.Platform.displayCaps.platformWidth) / 100 * 84);
			animation.duration = 500;
			var animationHandler = function() {
				animation.removeEventListener('complete', animationHandler);
				frontPanelView.animate(animation);
			};
			animation.addEventListener('complete', animationHandler);
			listDrawerBtn.enabled = true;
			frontPanelView.animate(animation);
		}
	});

	// left pannel content view
	var leftpanelviewcnt = require(Ti.App.getResourceFile('View/leftpanelview'));

	var leftpanelviewcnt = new leftpanelviewcnt(mainWindow, frontPanelView, listDrawerBtn);

	leftPanelView.add(leftpanelviewcnt);

	mainWindow.headerPanel = headerView;
	headerView.add(listDrawerBtn);
	headerView.add(headerLabel);
	frontPanelView.add(headerView);
	mainWindow.add(leftPanelView);
	mainWindow.add(frontPanelView);
	// mainWindow.contentView = mainWindow.contentView;
	frontPanelView.add(mainWindow.contentView);

	return mainWindow;
};

module.exports = LeftPanelWindow; 