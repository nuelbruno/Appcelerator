var httpManager = require("httpManager");//Alloy.createController('common/httpManager');
var args = arguments[0] || {};
var monthArray = [];
var arrNews = [],
    count = 0,
    totalCount = parseInt(args.totalCount, 10);
if (OS_IOS) {
	density = "dp";
} else {
	density = "px";
}
//Initializing an array for storing data for search implementation
var searchArray = [];
if (Alloy.Globals.isIOS7Plus) {
	$.winNewsList.extendEdges = [Ti.UI.EXTEND_EDGE_TOP];
	$.statusBar.height = 20;
}

function closeWindow() {
	Alloy.Globals.closeWindow($.winNewsList);
}

//Defining function for loading data from webservice and add to tableview
function loadNews(arr, isFirstLoad) {
	if (arr.length == 0) {
		$.listSection.setItems([]);
		$.lblNoRecord.visible = true;
		return;
	} else {
		$.lblNoRecord.visible = false;
	}
	var rowData = [];
	for (var i = 0; i < arr.length; i++) {
		//Check if it is loading first time and then assigned the data to search array
		var newDate = new Date(arr[i].date);
		if (isFirstLoad) {
			searchArray.push(arr[i]);
		}
		rowData.push({
			imgRow : {
				image : arr[i].bigImage
			},
			lblTitle : {
				text : arr[i].title,
				verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_TOP,
				color : (Alloy.Globals.currentTheme == "dark") ? "#FFF" : Alloy.Globals.path.blackColor,
				font: (Alloy.isTablet) ? Alloy.Globals.path.font18 : Alloy.Globals.path.font14,
				backgroundColor : "transparent"
			},
			lblDate : {
				text : (Alloy.Globals.isEnglish) ? newDate.getDate() + " " + monthArray[newDate.getMonth()] : newDate.getDate() + "\n" + (newDate.getMonth() + 1),
				backgroundColor : "transparent",
				font : (Alloy.isTablet) ? Alloy.Globals.path.font12 : Alloy.Globals.path.font9
			},
			properties : {
				doc : arr[i]
			}
		});
	}
	if (isFirstLoad) {
		if (count >= 10) {
			$.listSection.deleteItemsAt(count, 1);
		}
		count += arr.length;
		if (count < totalCount) {
			rowData.push({
				template : "templateMore"
			});
		}
		$.listSection.appendItems(rowData);
	} else {
		if (count < totalCount && $.txtSearch.value.trim().length == 0) {
			rowData.push({
				template : "templateMore"
			});
		}
		$.listSection.setItems(rowData);
	}
	$.viewBottomToolbar.setDefaultFont($.winNewsList);

}

$.listView.addEventListener('itemclick', function(e) {
	if (count == e.itemIndex) {
		if (count < totalCount) {
			httpManager.getNewsWebservices(count + 1, count + 10, function(newsObj) {
				if (newsObj != null) {
					loadNews(newsObj.newsList, true);
				} else {
					return;
				}

			});
		}
	} else {
		var item = $.listSection.getItemAt(e.itemIndex);
		var winNewsDetail = Alloy.createController("News/winNewsDetail", item.properties.doc).getView();
		Alloy.Globals.openWindow(winNewsDetail);
	}
});

function searchList() {
	var arrSearchs = [];
	if ($.txtSearch.value.trim().length == 0) {
		arrSearchs = searchArray;
	} else {
		for (var i = 0; i < searchArray.length; i++) {
			if (searchArray[i].title.toUpperCase().indexOf($.txtSearch.value.toUpperCase().trim()) != -1) {
				arrSearchs.push(searchArray[i]);
			}
		}
	}
	loadNews(arrSearchs, false);
}

function changeLanguage() {
	$.lblNavTitle.text = Alloy.Globals.selectedLanguage.newsMofTitle;
	$.lblNoRecord.text = Alloy.Globals.selectedLanguage.noRecordFound;
	var alignment;
	if (Alloy.Globals.isEnglish) {
		monthArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
		alignment = Titanium.UI.TEXT_ALIGNMENT_LEFT;
		$.imgSearch.left = 10;
		if (OS_IOS) {
			$.txtSearch.left = 30;
			$.txtSearch.right = 10;
		} else {
			$.txtSearch.left = 25;
			$.txtSearch.right = 0;
		}
		$.imgSearch.right = undefined;
	} else {
		monthArray = ["يناير", "فبراير", "مارس", "ابريل", "مايو", "يونيو", "يوليو", "اغسطس", "سبتمبر", "اكتوبر", "نوفمبر", "ديسمبر"];
		alignment = Titanium.UI.TEXT_ALIGNMENT_RIGHT;
		$.imgSearch.right = 10;
		if (OS_IOS) {
			$.txtSearch.right = 30;
			$.txtSearch.left = 10;
		} else {
			$.txtSearch.right = 25;
			$.txtSearch.left = 0;
		}
		$.imgSearch.left = undefined;
	}
	$.txtSearch.textAlign = alignment;
	loadNews(args.newsList, true);
}

changeLanguage();

$.winNewsList.addEventListener("focus", function(e) {
	$.viewBottomToolbar.setDefaultTheme($.winNewsList);
});

$.viewBottomToolbar.setDefaultTheme($.winNewsList);

// var openHelpScreen = $.viewInstructions.openHelpScreen;

/**
 * Adding the eventlistener for the bottom bar view
 *
 * @param {Object} e
 */
$.viewBottomToolbar.getView().addEventListener('click', function(e) {
	if (e.source.buttonId == 'btnFontChange') {
		$.viewBottomToolbar.changeFont($.winNewsList);
	} else if (e.source.buttonId == 'btnSystemFeedback') {
		$.viewBottomToolbar.openFeedbackScreen(e);
	} else/*if (e.source.buttonId == 'btnSystemInstruction') {
	 $.viewInstructions.openHelpScreen(e);
	 } else*/
	if (e.source.buttonId == 'btnSystemChangeTheme') {
		$.viewBottomToolbar.changeTheme($.winNewsList);
	}
});

/**
 * Called on open of the window
 *
 * @param {Object} e
 */
function windowOpened(e) {
	Alloy.Globals.arrWindows.push($.winNewsList);
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
	searchArray = arrNews = $.listSection = $.imgBackBtn = $.imgSearch = $.listView = $.winNewsList = null;
	$.destroy();
};

