var args = arguments[0] || {};
var httpManager = require("httpManager");//Alloy.createController("common/httpManager");
if (Alloy.Globals.isIOS7Plus) {
	//$.winPurchaseOrder.extendEdges = [Ti.UI.EXTEND_EDGE_TOP];
	$.statusBar.height = 20;
}

function closeWindow() {
	Alloy.Globals.closeWindow($.winFMISOption);
	//$.winISupplierHome.close();
}

function changeLanguage() {
	$.lblNavTitle.text = Alloy.Globals.selectedLanguage.support;
	$.lblcreateFMIS.text = Alloy.Globals.selectedLanguage.createTicket;
	$.lblViewFMIS.text = Alloy.Globals.selectedLanguage.viewTicket;
	var alignment;
	if (Alloy.Globals.isEnglish) {
		$.lblcreateFMIS.left = $.lblViewFMIS.left = $.imgDetailsOne.right = $.imgDetailsTwo.right = 10;
		$.lblcreateFMIS.right = $.lblViewFMIS.right = 45;
		$.imgDetailsOne.image = $.imgDetailsTwo.image = Alloy.Globals.path.icnRowDetail;
		alignment = Ti.UI.TEXT_ALIGNMENT_LEFT;
	} else {
		$.lblcreateFMIS.right = $.lblViewFMIS.right = $.imgDetailsOne.left = $.imgDetailsTwo.left = 10;
		$.lblcreateFMIS.left = $.lblViewFMIS.left = 45;
		$.imgDetailsOne.image = $.imgDetailsTwo.image = Alloy.Globals.path.icnRowDetailRight;
		alignment = Ti.UI.TEXT_ALIGNMENT_RIGHT;
	}
	$.lblcreateFMIS.textAlign = $.lblViewFMIS.textAlign = alignment;
}

function gotoNextWindow(e) {
	if (e.source.index == 1) {
		var payLoad = {
			isDetail : false,
		};
		var win = Alloy.createController("ISupplier/winCreateTicket", payLoad).getView();
		if (OS_IOS) {
			Alloy.Globals.openWindow(win);
		} else {
			win.open();
		}
	}else{
		httpManager.getAllFMISTickets(function(e) {
			if (e != null) {
				Ti.API.info(e);
				if (e.status == "Success") {
					var nextWindow = Alloy.createController("ISupplier/winFMISSupport", e.arrData).getView();
					Alloy.Globals.openWindow(nextWindow);
				} else {
					Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.iSupplier,e.description);
				}

			}
		});
	}
}

changeLanguage();

$.winFMISOption.addEventListener("focus",function(e){
	$.viewBottomToolbar.setDefaultTheme($.winFMISOption);
});
$.viewBottomToolbar.setDefaultTheme($.winFMISOption);

/**
 * Adding the eventlistener for the bottom bar view
 *
 * @param {Object} e
 */
$.viewBottomToolbar.getView().addEventListener('click', function(e) {
	if (e.source.buttonId == 'btnFontChange') {
		$.viewBottomToolbar.changeFont($.winFMISOption);
	} else if (e.source.buttonId == 'btnSystemFeedback') {
		$.viewBottomToolbar.openFeedbackScreen(e);
	} else if(e.source.buttonId == 'btnSystemChangeTheme'){
		$.viewBottomToolbar.changeTheme($.winFMISOption);
	}
});

/**
 * Called on open of the window
 *
 * @param {Object} e
 */
var windowOpened = function(e) {
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
var windowClosed = function(e){
	$.destroy();
};



