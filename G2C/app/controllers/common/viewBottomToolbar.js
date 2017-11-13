var args = arguments[0] || {};

// Default content font size
// var contentFontSize = $.btnFontChange.contentFontSize;
var contentFontSize = Alloy.Globals.contentFontSize;

// Default content theme
var contentTheme = $.btnSystemChangeTheme.contentTheme;

// Default font size
var fontSizeToIncrease = 0;

// Default Toolbar open
var isToolBarOpen = false;

// Last ChildIndex
var lastChildIndex = 0;

// Window ID
var rootNodeId = '';

/**
 * Update all the labels in the given container
 *
 * @param {Object} rootNode
 */
var updateAllLabels = function(rootNode) {
	// Ti.API.info('Root Node: ' + rootNode.id);

	if ( typeof rootNode != 'undefined' && rootNode.font != null && rootNode.font != "" && typeof rootNode.setFont == 'function') {
		if ( typeof rootNode.originalFontSize == 'undefined' || rootNode.originalFontSize == null || rootNode.originalFontSize == "") {
			rootNode.originalFontSize = rootNode.font.fontSize;
			rootNode.originalHeight = rootNode.height;
		}

		rootNode.height = (fontSizeToIncrease == 0 ) ? rootNode.originalHeight : ((rootNode.apiName == 'Ti.UI.TextArea') ? rootNode.originalHeight : Ti.UI.SIZE);

		var font = JSON.parse(JSON.stringify(rootNode.font));
		font.fontSize = (parseInt(rootNode.originalFontSize) + fontSizeToIncrease) + "sp";

		rootNode.setFont(font);

	} else if (rootNode.apiName == 'Ti.UI.TableView' && typeof rootNode.getData == 'function') {
		var arrTblRecords = rootNode.getData();
		if (arrTblRecords.length > 0 && typeof arrTblRecords[0].rows != 'undefined') {
			for (var key in arrTblRecords) {
				for (var i = 0; i < arrTblRecords[key].rows.length; i++) {
					updateAllLabels(arrTblRecords[key].rows[i]);
				}
			}
		}
	} else if (rootNode.apiName == 'Ti.UI.ListView' && typeof rootNode.sections != 'undefined' && typeof rootNode.sections.length != 'undefined') {
		var listItems = rootNode.sections[0].items;
		listItems = _.map(listItems, function(listItem) {
			for (var key in listItem) {
				if ((key.indexOf('lbl') == 0 || key.indexOf('btn') == 0) && ( typeof listItem[key].font != 'undefined' && typeof listItem[key].font.fontSize != 'undefined')) {
					if ( typeof listItem[key].originalFontSize == 'undefined' || listItem[key].originalFontSize == null || listItem[key].originalFontSize == "") {
						listItem[key].originalFontSize = listItem[key].font.fontSize;
					}
					var font = JSON.parse(JSON.stringify(listItem[key].font));
					font.fontSize = (parseInt(listItem[key].originalFontSize) + fontSizeToIncrease) + "sp";
					listItem[key].font = font;
				}
			}
			return listItem;
		});

		rootNode.sections[0].setItems(listItems);

	} else if ( typeof rootNode.getChildren == 'function') {
		var children = rootNode.getChildren();
		for (var i = 0; i < children.length; i++) {

			var child = children[i];
			if (i == lastChildIndex && child.parent.id == rootNodeId) {
				Alloy.Globals.hideLoading();
			}

			if (child.id == 'navBarBackView' || child.id == 'instructionView' || child.id == 'stepsView') {

			} else {
				updateAllLabels(child);
			}
		}
	}
};

/**
 * Get all the labels from the current window
 *
 * @param {Object} rootNode
 *
 */

exports.setDefaultFont = function(rootNode) {

	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.updating);
	$.btnFontChange.contentFontSize = Alloy.Globals.contentFontSize;

	if (Alloy.Globals.contentFontSize == 'N') {
		fontSizeToIncrease = 0;
	} else if (Alloy.Globals.contentFontSize == 'M') {
		fontSizeToIncrease = 2;
	} else if (Alloy.Globals.contentFontSize == 'L') {
		fontSizeToIncrease = 4;
	}

	updateAllLabels(rootNode);
};

exports.changeFont = function(rootNode) {

	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.updating);

	lastChildIndex = rootNode.children.length - 1;
	rootNodeId = rootNode.id;
	contentFontSize = $.btnFontChange.contentFontSize;
	if (contentFontSize == 'N') {
		fontSizeToIncrease = 2;
		$.btnFontChange.contentFontSize = "M";
		Alloy.Globals.contentFontSize = "M";
	} else if (contentFontSize == 'M') {
		fontSizeToIncrease = 4;
		$.btnFontChange.contentFontSize = "L";
		Alloy.Globals.contentFontSize = "L";
	} else if (contentFontSize == 'L') {
		fontSizeToIncrease = 0;
		$.btnFontChange.contentFontSize = "N";
		Alloy.Globals.contentFontSize = "N";
	}
	updateAllLabels(rootNode);
};

/**
 * Update all the labels in the given container
 *
 * @param {Object} rootNode
 */
var updateTheme = function(rootNode, color, backgroundColor) {
	// Ti.API.info( typeof rootNode.setFont + 'Root Node: ' + rootNode.id);

	if ( typeof rootNode != 'undefined' && typeof rootNode.setFont == 'function') {

		if ( typeof rootNode.originalColor == 'undefined' || rootNode.originalColor == null || rootNode.originalColor == "") {
			rootNode.originalColor = rootNode.color;
		}
		rootNode.color = (Alloy.Globals.currentTheme == 'dark') ? color : rootNode.originalColor;
		// Ti.API.info('ROOOT NODE == ' + rootNode);
	}
	if (rootNode.apiName == 'Ti.UI.TableView' && typeof rootNode.getData == 'function') {
		if (rootNode.id == "tableViewBudget") {
			rootNode.backgroundColor = backgroundColor;
		} else {
			var arrTblRecords = rootNode.getData();
			rootNode.backgroundColor = backgroundColor;
			if (arrTblRecords.length > 0 && typeof arrTblRecords[0].rows != 'undefined') {
				for (var key in arrTblRecords) {
					for (var i = 0; i < arrTblRecords[key].rows.length; i++) {
						updateTheme(arrTblRecords[key].rows[i], color, backgroundColor);
					}
				}
			}
		}
	} else if (rootNode.apiName == 'Ti.UI.ListView' && typeof rootNode.sections != 'undefined' && typeof rootNode.sections.length != 'undefined') {
		rootNode.backgroundColor = backgroundColor;
		var listItems = rootNode.sections[0].items;
		listItems = _.map(listItems, function(listItem) {
			for (var key in listItem) {
				if (key == "btnPayView" || key == "lblPay" || key == "lblDate" || listItem[key].isToExclude_contrast) {
					continue;
				}
				if (key.indexOf('lbl') == 0 || key.indexOf('btn') == 0) {
					listItem[key].color = color;
					listItem[key].backgroundColor = backgroundColor;
				}
				listItem[key].backgroundColor = backgroundColor;
			}
			return listItem;
		});

		rootNode.sections[0].setItems(listItems);

	} else if ( typeof rootNode.getChildren == 'function') {
		var children = rootNode.getChildren();
		for (var i = 0; i < children.length; i++) {
			var child = children[i];

			if ((child.id != 'navBarBackView') && (child.id != 'stepsView') && (child.id == 'stepBackView' || child.id == 'instructionView' || child.id == 'topView' || (( typeof child.id != 'undefined' && child.id != null && child.id != '' ) && ((child.id).toLowerCase()).indexOf('separator') > -1) || child.id == 'bottomToolBarView' || child.id == 'backView' || child.backgroundColor == Alloy.Globals.path.buttonBackgroundColor || child.backgroundColor == Alloy.Globals.path.goldColor || child.backgroundColor == Alloy.Globals.path.navBarColor || child.isToExclude_contrast == true)) {
				//skip this view
			} else {
				if (child.id == 'navBarBackView' || child.id == 'stepsView') {
					child.backgroundColor = (child.backgroundColor == '#000000' || backgroundColor == '#FFFFFF') ? child.originalBackgrounColor : backgroundColor;
				} else {
					rootNode.backgroundColor = backgroundColor;
				}
				updateTheme(child, color, backgroundColor);
			}
		}
	}
};

/**
 * Change theme for all
 *
 * @param {Object} rootNode
 */
exports.changeTheme = function(rootNode) {
	contentTheme = $.btnSystemChangeTheme.contentTheme;
	if (contentTheme == "light") {
		$.btnSystemChangeTheme.contentTheme = "dark";
		Alloy.Globals.currentTheme = "dark";
		updateTheme(rootNode, '#FFFFFF', '#000000');
	} else {
		$.btnSystemChangeTheme.contentTheme = "light";
		Alloy.Globals.currentTheme = "light";
		updateTheme(rootNode, '#000000', '#FFFFFF');
	}
};

/**
 * Set the default theme whichever is selected
 *
 * @param {Object} rootNode
 */

Alloy.Globals.setDefaultTheme = function(rootNode) {

	if (Alloy.Globals.currentTheme == "light") {
		$.btnSystemChangeTheme.contentTheme = "light";
		updateTheme(rootNode, '#000000', '#FFFFFF');
	} else {
		$.btnSystemChangeTheme.contentTheme = "dark";
		updateTheme(rootNode, '#FFFFFF', '#000000');
	}
};

exports.setDefaultTheme = function(rootNode) {
	Ti.API.info('Current Font: ' + Alloy.Globals.contentFontSize);

	lastChildIndex = rootNode.children.length - 1;
	rootNodeId = rootNode.id;

	var isThemeChanged = (Alloy.Globals.currentTheme == $.btnSystemChangeTheme.contentTheme);
	if (isThemeChanged == false) {
		if (Alloy.Globals.currentTheme == "light") {
			$.btnSystemChangeTheme.contentTheme = "light";
			updateTheme(rootNode, '#000000', '#FFFFFF');
		} else {
			$.btnSystemChangeTheme.contentTheme = "dark";
			updateTheme(rootNode, '#FFFFFF', '#000000');
		}
	}

	var isFontsChanged = (Alloy.Globals.contentFontSize == $.btnFontChange.contentFontSize);
	if (isFontsChanged == false) {
		Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.updating);
		$.btnFontChange.contentFontSize = Alloy.Globals.contentFontSize;

		if (Alloy.Globals.contentFontSize == 'N') {
			fontSizeToIncrease = 0;
		} else if (Alloy.Globals.contentFontSize == 'M') {
			fontSizeToIncrease = 2;
		} else if (Alloy.Globals.contentFontSize == 'L') {
			fontSizeToIncrease = 4;
		}

		updateAllLabels(rootNode);
	}
};

/**
 * Open the bottom toolbar
 *
 * @param {Object} e
 */
function openBottomToolBar(e) {
	if (isToolBarOpen) {
		$.bottomToolBarView.animate({
			bottom : -($.bottomToolBarView.height - $.btnTopArrow.height),
			duration : 300
		});
		$.imgBottomBarArrow.image = Alloy.Globals.path.icnArrowUPWhite;
	} else {
		$.bottomToolBarView.animate({
			bottom : 0,
			duration : 300
		});
		$.imgBottomBarArrow.image = Alloy.Globals.path.icnArrowDownWhite;
	}
	isToolBarOpen = !isToolBarOpen;
}

/**
 * Open the feedback screen
 */
exports.openFeedbackScreen = function() {
	Alloy.createController("UserFeedback/winUserFeedback").getView().open((OS_IOS) ? {
		modal : true,
	} : {});
};

/**
 * Set the options visibility and bar bottom position
 *
 * @param {Object} newBottom
 */
exports.setOptions = function(params) {
	$.bottomToolBarView.bottom = -($.bottomToolBarView.height - $.btnTopArrow.height);
	/*if(params.viewHeight == 0){
		$.bottomToolBarView.height = 0;
	}*/
	if (params.showThemeButton != undefined && params.showThemeButton == false) {
		$.btnSystemChangeTheme.applyProperties({
			width : 0,
			height : 0,
			left : 0,
			visible : false
		});
	}

	if (params.showInstructions != undefined && params.showInstructions == false) {
		$.btnSystemInstruction.applyProperties({
			width : 0,
			height : 0,
			left : 0,
			visible : false
		});
	}

	if (params.showFeedBack != undefined && params.showFeedBack == false) {
		$.btnSystemFeedback.applyProperties({
			width : 0,
			height : 0,
			left : 0,
			visible : false
		});
	}

	if (params.showFontResize != undefined && params.showFontResize == false) {
		$.btnFontChange.applyProperties({
			width : 0,
			height : 0,
			left : 0,
			visible : false
		});
	}

};

$.bottomToolBarView.bottom = -($.bottomToolBarView.height - $.btnTopArrow.height);
