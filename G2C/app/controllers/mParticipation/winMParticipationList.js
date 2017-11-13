var httpManager = require("httpManager");//Alloy.createController('common/httpManager');
var args = arguments[0] || {};
var arrDoc;
arrDoc = args;

if (Alloy.Globals.isIOS7Plus) {
	$.statusBar.height = 20;
}

function closeWindow() {
	Alloy.Globals.closeWindow($.winMParticipationList);
}

function loadItems(arrDoc){
	
	if (arrDoc.length == 0) {
		$.lblNoItems.visible = true;
	} else {
		$.lblNoItems.visible = false;
	}
	
	Ti.API.info('arrDoc==='+JSON.stringify(arrDoc));
		
	var rowData = [];
	for (var i = 0; i < arrDoc.length; i++) {
		
		Ti.API.info('arrDoc[i].enIncentive==='+arrDoc[i].enIncentive);
		
		rowData.push({
			lblTitle : {
				text : (Alloy.Globals.isEnglish) ? arrDoc[i].enTitle : arrDoc[i].arTitle,
				font: (Alloy.isTablet) ? Alloy.Globals.path.font18 : Alloy.Globals.path.font14,
			},
			/*lblTime : {
				text : arrDoc[i].duration,
			},*/
			lblEndDateValue : {
				text : arrDoc[i].endDate,
				font: (Alloy.isTablet) ? Alloy.Globals.path.font16 : Alloy.Globals.path.font12,
			},
			lblComments : {
				text : arrDoc[i].commentsCount + " " + Alloy.Globals.selectedLanguage.comments,
				font: (Alloy.isTablet) ? Alloy.Globals.path.font14 : Alloy.Globals.path.font10,
			},
			imgTop : {
				visible : (arrDoc[i].enIncentive.length == 0) ? false : true,
				backgroundImage : (arrDoc[i].enIncentive.length == 0) ? "" : Alloy.Globals.path.icnTag,
			},
			
			properties : {
				obj : arrDoc[i]
			}
		});
		
	}

	$.listSection.setItems(rowData);
	
}


var isClicked = false;
$.tableViewItems.addEventListener("itemclick",function(e){
	if(isClicked){
		return;
	}
	isClicked = true;
	var section = $.tableViewItems.sections[e.sectionIndex];
	var item = section.getItemAt(e.itemIndex);
			
	httpManager.getmParticipationDetails(item.properties.obj.id, function(e) {
			
			Ti.API.info('e=='+JSON.stringify(e));

			if (e != null) {
				var win = Alloy.createController("mParticipation/winMParticipationDetail",e).getView();
				Alloy.Globals.openWindow(win);
			} else {
				isClicked = false;
			}

		});		
			
});

function changeLanguage() {
	
	loadItems(arrDoc);
	
	$.lblNavTitle.text = Alloy.Globals.selectedLanguage.mParticipation;
}
changeLanguage();

$.winMParticipationList.addEventListener("focus", function(e) {
	isClicked = false;
	$.viewBottomToolbar.setDefaultTheme($.winMParticipationList);
});


$.viewBottomToolbar.setDefaultTheme($.winMParticipationList);

// var openHelpScreen = $.viewInstructions.openHelpScreen;

/**
 * Adding the eventlistener for the bottom bar view
 *
 * @param {Object} e
 */
$.viewBottomToolbar.getView().addEventListener('click', function(e) {
	if (e.source.buttonId == 'btnFontChange') {
		$.viewBottomToolbar.changeFont($.winMParticipationList);
	} else if (e.source.buttonId == 'btnSystemFeedback') {
		$.viewBottomToolbar.openFeedbackScreen(e);
	} else/*if (e.source.buttonId == 'btnSystemInstruction') {
	 $.viewInstructions.openHelpScreen(e);
	 } else*/
	if (e.source.buttonId == 'btnSystemChangeTheme') {
		$.viewBottomToolbar.changeTheme($.winMParticipationList);
	}
});

/**
 * Called on open of the window
 *
 * @param {Object} e
 */
function windowOpened(e) {
	Alloy.Globals.arrWindows.push($.winMParticipationList);
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
	$.imgBackBtn = $.tableViewItems = $.listSection = $.winMParticipationList = null;
	$.destroy();
};