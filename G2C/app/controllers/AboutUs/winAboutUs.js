var httpManager = require("httpManager");

var args = arguments[0] || {};
var density,isClicked=false;

if (OS_IOS) {
	density = "dp";
} else {
	density = "px";
}

if (Alloy.Globals.isIOS7Plus) {
	$.winAboutUs.extendEdges = [Ti.UI.EXTEND_EDGE_TOP];
	$.statusBar.height = 20;
}

function loadItems(arrDoc) {
	var rowData = [];
	for (var i = 0; i < arrDoc.length; i++) {

		//Creating  TableViewRow
		var row = Ti.UI.createTableViewRow({
			width : "100%",
			height : (Alloy.isTablet) ? 60 : 50,
			backgroundColor : "transparent",
			selectedBackgroundColor : Alloy.Globals.path.navBarColor

		});
		//Creating a Label for assigning item name
		var lblTitle = Ti.UI.createLabel({
			text : arrDoc[i].title.replace("_", "&"),
			color : "black",
			touchEnabled : false,
			bubbleParent : false,
			verticalAlign : "center",
		});

		//Creating an Imagview for setting arrows in tableviewRow
		var imgArrow = Ti.UI.createImageView({
			width : (Alloy.isTablet) ? 12 : 8,
			height : (Alloy.isTablet) ? 23 : 15,
			touchEnabled : false,
			bubbleParent : false,
		});
		row.imgArrow = imgArrow;
		//creating a view for row separation
		var separator = Ti.UI.createView({
			bottom : 0,
			height : 0.5,
			width : '100%',
			backgroundColor : Alloy.Globals.path.grayColor,
			touchEnabled : false
		});

		if (Alloy.Globals.isEnglish) {
			lblTitle.font = (Alloy.isTablet) ? Alloy.Globals.path.font19 : Alloy.Globals.path.font16;
			lblTitle.left = 10;
			lblTitle.right = (Alloy.isTablet) ? 45 : 35;
			lblTitle.textAlign = "left";
			imgArrow.right = 10;
			imgArrow.left = undefined;
			imgArrow.backgroundImage = Alloy.Globals.path.icnArrowRightBlack;
		} else {
			lblTitle.font = (Alloy.isTablet) ? Alloy.Globals.path.font19 : Alloy.Globals.path.font16;
			lblTitle.right = 10;
			lblTitle.left = (Alloy.isTablet) ? 45 : 35;
			lblTitle.textAlign = "right";
			imgArrow.left = 10;
			imgArrow.backgroundImage = Alloy.Globals.path.icnArrowLeftBlack;
			imgArrow.right = undefined;
		}
		row.add(lblTitle);
		row.add(imgArrow);
		row.add(separator);
		row.doc = arrDoc[i];
		rowData.push(row);
		row.addEventListener("click", function(e) {
			var win;
			if(isClicked == true){
				return;
			}
			isClicked = true;
			if (e.index == 0) {

				var win = Alloy.createController("AboutUs/winVisionMission", e.source.doc.title).getView();
				Alloy.Globals.openWindow(win);

			} else if (e.index == 1) {

				var win = Alloy.createController("AboutUs/winTopManagement", e.source.doc.title).getView();
				Alloy.Globals.openWindow(win);

			} else if (e.index == 2) {

				var win = Alloy.createController("AboutUs/winStrategicGoals", e.source.doc.title).getView();
				Alloy.Globals.openWindow(win);

			} else if (e.index == 3) {

				var win = Alloy.createController("AboutUs/winAchievements", e.source.doc.title).getView();
				Alloy.Globals.openWindow(win);

			}

		});
	}
	$.tableViewItems.data = rowData;
	
}

function closeWindow() {
	Alloy.Globals.closeWindow($.winAboutUs);
}

function changeLanguage() {
	$.lblNavTitle.text = Alloy.Globals.selectedLanguage.aboutTitle;
	$.imgTop.image = args.parentNode.image;
	loadItems(args.subNodes);
	var alignment;
	if (Alloy.Globals.isEnglish) {
		alignment = Titanium.UI.TEXT_ALIGNMENT_LEFT;
	} else {
		alignment = Titanium.UI.TEXT_ALIGNMENT_RIGHT;
	}

}

changeLanguage();
$.winAboutUs.addEventListener("focus", function(e) {
	$.viewBottomToolbar.setDefaultTheme($.winAboutUs);
	isClicked = false;
});
$.viewBottomToolbar.setDefaultTheme($.winAboutUs);

/**
 * Adding the eventlistener for the bottom bar view
 *
 * @param {Object} e
 */
$.viewBottomToolbar.getView().addEventListener('click', function(e) {
	if (e.source.buttonId == 'btnFontChange') {
		$.viewBottomToolbar.changeFont($.winAboutUs);
	} else if (e.source.buttonId == 'btnSystemFeedback') {
		$.viewBottomToolbar.openFeedbackScreen(e);
	} else if (e.source.buttonId == 'btnSystemInstruction') {
		$.viewInstructions.openHelpScreen(e);
	} else if(e.source.buttonId == 'btnSystemChangeTheme'){
		$.viewBottomToolbar.changeTheme($.winAboutUs);
	}
});
/**
 * Called on open of the window
 *
 * @param {Object} e
 */
var windowOpened = function(e) {
	Alloy.Globals.arrWindows.push($.winAboutUs);
	$.viewBottomToolbar.setOptions({
		showThemeButton : true,
		showInstructions : false,
		showFeedBack : true,
		showFontResize : true,
	});
};

/**
 * Window is closed
 *
 * @param {Object} e
 */
var windowClosed = function(e) {
	Alloy.Globals.arrWindows.pop();
	$.imgBackBtn = $.tableViewItems = $.imgTop = null;
	$.destroy();
};
