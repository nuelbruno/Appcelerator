var args = arguments[0] || {};
var currentPage = 1;

var density;

if (OS_IOS) {
	density = "dp";
} else {
	density = "px";
}

//Initializing an array for storing data for search implementation
var searchArray = [];
if (Alloy.Globals.isIOS7Plus) {
	//	$.winDashboard.statusBarStyle = Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT;
	$.winBudgetGuidesDetail.extendEdges = [Ti.UI.EXTEND_EDGE_TOP];
	$.statusBar.height = 20;
}

function closeWindow() {
	Alloy.Globals.closeWindow($.winBudgetGuidesDetail);
}

function gotoHome() {
	Alloy.Globals.gotoHome();
}

function changeLanguage() {
	$.lblNavTitle.text = Alloy.Globals.selectedLanguage.gccStatisticalBook;
	var alignment;
	if (Alloy.Globals.isEnglish) {
		alignment = Titanium.UI.TEXT_ALIGNMENT_LEFT;
		$.btnPrevious.addEventListener('click', loadPreviousPage);
		$.btnNext.addEventListener('click', loadNextPage);
		$.btnNext.visible = true;
		// $.imgSearch.left = 5;
		// $.imgSearch.right = undefined;
		// if (OS_IOS) {
		// $.txtSearch.right = 10;
		// $.txtSearch.left = 25;
		// } else {
		// $.txtSearch.right = 0;
		// $.txtSearch.left = 20;
		// }

	} else {
		alignment = Titanium.UI.TEXT_ALIGNMENT_RIGHT;
		$.btnPrevious.addEventListener('click', loadNextPage);
		$.btnNext.addEventListener('click', loadPreviousPage);
		$.btnPrevious.visible = true;
		// $.imgSearch.right = 5;
		// $.imgSearch.left = undefined;
		// if (OS_IOS) {
		// $.txtSearch.left = 10;
		// $.txtSearch.right = 25;
		// } else {
		// $.txtSearch.left = 0;
		// $.txtSearch.right = 20;
		// }
	}
	//$.txtSearch.textAlign = alignment;
}

function loadNextPage() {
	currentPage++;
	if (currentPage == args.pageCount) {
		if (Alloy.Globals.isEnglish) {
			$.btnNext.visible = false;
		} else {
			$.btnPrevious.visible = false;
		}

	}
	if (Alloy.Globals.isEnglish) {
		$.btnPrevious.visible = true;
	} else {
		$.btnNext.visible = true;
	}

	Ti.API.info('URL = ' + (args.pageUrl + currentPage + ".html"));
	$.lblCurrentPage.text = currentPage + "/" + args.pageCount;
	$.webView.url = (args.pageUrl + currentPage + ".html");
}

function loadPreviousPage() {
	currentPage--;
	if (currentPage == 1) {
		if (Alloy.Globals.isEnglish) {
			$.btnPrevious.visible = false;
		} else {
			$.btnNext.visible = false;
		}
	}
	if (Alloy.Globals.isEnglish) {
		$.btnNext.visible = true;
	} else {
		$.btnPrevious.visible = true;
	}
	$.lblCurrentPage.text = currentPage + "/" + args.pageCount;
	$.webView.url = (args.pageUrl + currentPage + ".html");
	Ti.API.info('URL = ' + (args.pageUrl + currentPage + ".html"));

}

$.winBudgetGuidesDetail.addEventListener("swipe", function(e) {
	Ti.API.info('>>>>>'+JSON.stringify(e));
	if (e.direction == "up" || e.direction == "down") {
		Ti.API.info('>>>>>>>'+JSON.stringify(e));
		return;
	}
	if (Alloy.Globals.isEnglish) {
		if (e.direction == "left") {
			if (currentPage == args.pageCount) {
				return;
			}
			loadNextPage();
		} else if (e.direction == "right") {
			if (currentPage == 1) {
				return;
			}
			loadPreviousPage();
		}
	} else {
		if (e.direction == "right") {
			if (currentPage == args.pageCount) {
				return;
			}
			loadNextPage();
		} else if (e.direction == "left") {
			if (currentPage == 1) {
				return;
			}
			loadPreviousPage();
		}
	}

});

changeLanguage();

$.winBudgetGuidesDetail.addEventListener("focus", function(e) {
	$.viewBottomToolbar.setDefaultTheme($.winBudgetGuidesDetail);
});

$.viewBottomToolbar.setDefaultTheme($.winBudgetGuidesDetail);

// var openHelpScreen = $.viewInstructions.openHelpScreen;

/**
 * Adding the eventlistener for the bottom bar view
 *
 * @param {Object} e
 */
$.viewBottomToolbar.getView().addEventListener('click', function(e) {
	if (e.source.buttonId == 'btnFontChange') {
		$.viewBottomToolbar.changeFont($.winBudgetGuidesDetail);
	} else if (e.source.buttonId == 'btnSystemFeedback') {
		$.viewBottomToolbar.openFeedbackScreen(e);
	} else/*if (e.source.buttonId == 'btnSystemInstruction') {
	 $.viewInstructions.openHelpScreen(e);
	 } else*/
	if (e.source.buttonId == 'btnSystemChangeTheme') {
		$.viewBottomToolbar.changeTheme($.winBudgetGuidesDetail);
	}
});

/**
 * Called on open of the window
 *
 * @param {Object} e
 */
function windowOpened(e) {
	Alloy.Globals.arrWindows.push($.winBudgetGuidesDetail);
	Ti.API.info('URL = ' + (args.pageUrl + currentPage + ".html"));
	$.lblCurrentPage.text = currentPage + "/" + args.pageCount;
	$.webView.url = (args.pageUrl + currentPage + ".html");
	$.viewBottomToolbar.setOptions({
		showThemeButton : true,
		showInstructions : false,
		showFeedBack : true,
		showFontResize : false
	});
};

/**
 * Window is closed
 *
 * @param {Object} e
 */
function windowClosed(e) {
	Alloy.Globals.arrWindows.pop();
	$.imgBackBtn = $.imgHomeBtn = $.webView = $.btnPrevious = $.btnNext = null;
	$.destroy();
};