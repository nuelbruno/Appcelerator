/**
 *  ++++++++++++Property Listing+++++++++++
 *
 * App.Styling.leftPanelistButtonStyle;
 * .
 * .
 * .
 **/
Ti.App.prepareForStyling = function() {
	var width = '10%';
	var height = (Ti.Platform.displayCaps.platformHeight * 3 / 100);
	var left = '2%';
	var Styling = {};
	Styling.leftPanelistButtonStyle = {
		width : width,
		height : height,
		left : left,
	};
	return Styling;
};
