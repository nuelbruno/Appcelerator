if (Alloy.Globals.isIOS7Plus) {
	$.statusBar.height = 20;
	//$.statusBar.backgroundColor = Alloy.Globals.path.bgColor;
}

var alignment = "";
function changeLanguage() {
	$.lblNavTitle.text = Alloy.Globals.selectedLanguage.editApplication;
	$.btnSave.title = Alloy.Globals.selectedLanguage.save;
	$.btnCancel.title = Alloy.Globals.selectedLanguage.cancel;
	
	$.lblTitle.text = "This is the application title";
	$.lblDate.text = "05-September-2014";
	$.lblTime.text = "11:30PM";
	
		
	if(Alloy.Globals.isEnglish){
		$.imgCalendar.left = 10;
		$.lblDate.left = 30;
		$.imgTime.left = (Alloy.isTablet) ? 190 : 140;
		$.lblTime.left = (Alloy.isTablet) ? 210 : 160;
		
		$.btnSave.left = $.btnCancel.right = 0;
				
		alignment = Titanium.UI.TEXT_ALIGNMENT_LEFT;
	} else {
		$.imgCalendar.right = 10;
		$.lblDate.right = 30;
		$.imgTime.right = (Alloy.isTablet) ? 190 : 140;
		$.lblTime.right = (Alloy.isTablet) ? 210 : 160;
		
		$.btnSave.right = $.btnCancel.left = 0;
				
		alignment = Titanium.UI.TEXT_ALIGNMENT_RIGHT;
	}
	$.lblTitle.textAlign = $.lblDate.textAlign = $.lblTime.textAlign = $.txtContent.textAlign = alignment;

}
var animateLeftPanelToRight = Ti.UI.createAnimation({
	left : 0,
	curve : Ti.UI.ANIMATION_CURVE_EASE_OUT,
	//	transform : Ti.UI.create2DMatrix().scale(0.9, 0.80),
	duration : 300,
});

var animateLeftPanelToLeft = Ti.UI.createAnimation({
	left : -$.leftView.width,
	curve : Ti.UI.ANIMATION_CURVE_EASE_IN,
	//	transform : Ti.UI.create2DMatrix().scale(1.0, 1.0),
	duration : 300,
});

function showLeftPanel() {
	if (!isLeftPanelOpened) {

		if (OS_IOS) {
			$.leftView.animate(animateLeftPanelToRight);
		} else {
			//	var matrix = Ti.UI.create2DMatrix();
			//	matrix = matrix.scale(1.0, 1.0, 0.9, 0.8);
			var a = Ti.UI.createAnimation({
				left : $.leftView.width,
				//	transform : matrix,
				duration : 300,
			});
			$.homeView.animate(a);
		}
		$.closeView.visible = true;
		isLeftPanelOpened = true;

	} else {

		if (OS_IOS) {
			$.leftView.animate(animateLeftPanelToLeft);
		} else {
			//	var matrix = Ti.UI.create2DMatrix();
			//	matrix = matrix.scale(0.9, 0.8, 1.0, 1.0);
			var a = Ti.UI.createAnimation({
				left : 0,
				//	transform : matrix,
				duration : 300,
			});
			$.homeView.animate(a);
		}
		$.closeView.visible = false;
		isLeftPanelOpened = false;

	}
}

function gotoHome(){
	Alloy.Globals.gotoHome();
}
$.winEditApplication.addEventListener("focus",function(e){
	$.viewBottomToolbar.setDefaultTheme($.winEditApplication);
});
$.viewBottomToolbar.setDefaultTheme($.winEditApplication);


/**
 * Adding the eventlistener for the bottom bar view
 *
 * @param {Object} e
 */
$.viewBottomToolbar.getView().addEventListener('click', function(e) {
	if (e.source.buttonId == 'btnFontChange') {
		$.viewBottomToolbar.changeFont($.winEditApplication);
	} else if (e.source.buttonId == 'btnSystemFeedback') {
		$.viewBottomToolbar.openFeedbackScreen(e);
	} else if (e.source.buttonId == 'btnSystemInstruction') {
		$.viewInstructions.openHelpScreen(e);
	} else if (e.source.buttonId == 'btnSystemChangeTheme') {
		$.viewBottomToolbar.changeTheme($.winEditApplication);
	}
});


$.winEditApplication.addEventListener("open",function(e){
	Alloy.Globals.arrWindows.push($.winEditApplication);
	$.viewBottomToolbar.setOptions({
		showThemeButton : true,
		showInstructions : false,
		showFeedBack : true,
		showFontResize : true
	});
});

$.winEditApplication.addEventListener("close",function(e){
	Alloy.Globals.arrWindows.pop();
	$.destroy();
});
function closeWindow() {
	Alloy.Globals.closeWindow($.winEditApplication);
}

changeLanguage();
