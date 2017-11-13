var args = arguments[0] || {};
var density;
var month = [];
if (Alloy.Globals.isEnglish) {
	month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

} else {
	month = ["يناير", "فبراير", "مارس", "ابريل", "مايو", "يونيو", "يوليو", "اغسطس", "سبتمبر", "اكتوبر", "نوفمبر", "ديسمبر"];
}

if (OS_IOS) {
	density = "dp";
} else {
	density = "px";
}
$.bgImageView.height = ((Alloy.isTablet) ? Alloy.Globals.GetHeight(120) : Alloy.Globals.GetHeight(100)) + density;

if (Alloy.Globals.isIOS7Plus) {
	//	$.winDashboard.statusBarStyle = Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT;
	$.winNewsDetail.extendEdges = [Ti.UI.EXTEND_EDGE_TOP];
	$.statusBar.height = 20;
}

function closeWindow() {
	Alloy.Globals.closeWindow($.winNewsDetail);
}

function gotoHome() {
	Alloy.Globals.gotoHome();
}

function changeLanguage() {
	$.lblNavTitle.text = Alloy.Globals.selectedLanguage.newsDetails;
	$.lblTitle.text = args.title;
	$.lblDesc.text = args.body;
	$.imgView.image = args.bigImage;
	if (args.body.length > 0) {
		$.lblDesc.visible = true;
		$.lblDesc.top = 15;
	}
	var newDate = new Date(args.date);
	if (Alloy.Globals.isEnglish) {
		$.lblDate.text = month[newDate.getMonth()] + " " + newDate.getDate() + ", " + newDate.getFullYear();
	} else {
		$.lblDate.text = newDate.getDate() + " " + month[newDate.getMonth()] + " " + newDate.getFullYear();
	}
}

var imageView;
/*if (OS_IOS) {
 var imgView_ex = require('com.obscure.imageview_ex');
 imageView = imgView_ex.createImageView({
 height : Ti.UI.SIZE,
 width : Ti.UI.SIZE,
 hires : true,
 contentMode : 'aspectfit',
 clipsToBounds : true,
 defaultImage : Alloy.Globals.path.defaultImageBanner
 });
 imageView.image = args.bigImage;
 } else {*/

/*imageView = Ti.UI.createImageView({
	width : Ti.UI.SIZE,
	height : Ti.UI.SIZE,
	defaultImage : Alloy.Globals.path.defaultImageBanner,
	image : args.bigImage

});

imageView.addEventListener('load', function(e) {
	Ti.API.info('IMAGE LOAD');
	// var imgHeight = imageView.toImage().height;
	// var imgWidth = imageView.toImage().width;
	var imgHeight = imageView.toImage().height;
	var imgWidth = imageView.toImage().width;
	var screenHeight = $.bgImageView.toImage().height;
	var screenWidth = $.bgImageView.toImage().width;
	var screenAspectRatio = (screenWidth / screenHeight);
	var imgAspectRatio = (imgWidth / imgHeight);
	var scaledHeight;
	var scaledWidth;

	Ti.API.info('IMAGE WIDTH = ' + imgWidth + " HEIGHT = " + imgHeight);
	Ti.API.info('IMAGE WIDTH = ' + screenWidth + " HEIGHT = " + screenHeight);

	if (imgAspectRatio <= screenAspectRatio) {
		scaledHeight = screenHeight;
		scaledWidth = (screenHeight * imgAspectRatio);
	} else {
		scaledWidth = screenWidth;
		scaledHeight = (scaledWidth / imgAspectRatio);
	}
	Ti.API.info('IMAGE WIDTH = ' + scaledWidth + " HEIGHT = " + scaledHeight);
	imageView.height = (OS_IOS) ? scaledHeight : (scaledHeight + 'px');
	imageView.width = (OS_IOS) ? scaledWidth : (scaledWidth + 'px');
});
// }
$.bgImageView.add(imageView);*/

$.winNewsDetail.addEventListener("focus", function(e) {
	$.viewBottomToolbar.setDefaultTheme($.winNewsDetail);
});

$.viewBottomToolbar.setDefaultTheme($.winNewsDetail);

// var openHelpScreen = $.viewInstructions.openHelpScreen;

/**
 * Adding the eventlistener for the bottom bar view
 *
 * @param {Object} e
 */
$.viewBottomToolbar.getView().addEventListener('click', function(e) {
	if (e.source.buttonId == 'btnFontChange') {
		$.viewBottomToolbar.changeFont($.winNewsDetail);
	} else if (e.source.buttonId == 'btnSystemFeedback') {
		$.viewBottomToolbar.openFeedbackScreen(e);
	} else/*if (e.source.buttonId == 'btnSystemInstruction') {
	 $.viewInstructions.openHelpScreen(e);
	 } else*/
	if (e.source.buttonId == 'btnSystemChangeTheme') {
		$.viewBottomToolbar.changeTheme($.winNewsDetail);
	}
});

/**
 * Called on open of the window
 *
 * @param {Object} e
 */
function windowOpened(e) {
	changeLanguage();
	$.mainView.layout="vertical";
	Alloy.Globals.arrWindows.push($.winNewsDetail);
	$.viewBottomToolbar.setOptions({
		showThemeButton : true,
		showInstructions : false,
		showFeedBack : true,
		showFontResize : true
	});
};

/**
 * Window is closed
 *
 * @param {Object} e
 */
function windowClosed(e) {
	Alloy.Globals.arrWindows.pop();
	$.imgBackBtn = $.imgHomeBtn = $.bgImageView = imageView = $.winNewsDetail = null;
	$.destroy();
};

