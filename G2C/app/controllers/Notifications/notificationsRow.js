var args = arguments[0] || {};

$.imgRow.backgroundImage = args.image;
$.lblTitle.text = args.title;
$.lblDate.text = args.shortDate;

var alignment;

if (Alloy.Globals.isEnglish) {
	alignment = Titanium.UI.TEXT_ALIGNMENT_LEFT;
	
	$.dateView.backgroundImage = Alloy.Globals.path.bgNewsDateRight;
	
	$.imgRow.left = 10;
	$.lblTitle.left = 100;
	$.lblTitle.right = 40;
	$.dateView.right = 0;
	$.leftBackView.left = 0;
	$.leftBackView.right = 5;
	$.rightBackView.right = 0;
	
	$.dateView.left = $.rightBackView.left = $.imgRow.right = undefined;
	
} else {
	alignment = Titanium.UI.TEXT_ALIGNMENT_RIGHT;
	
	$.dateView.backgroundImage = Alloy.Globals.path.bgNewsDateLeft;
	
	$.imgRow.right = 10;
	$.lblTitle.right = 100;
	$.lblTitle.left = 40;
	$.dateView.left = 0;
	$.leftBackView.right = 0;
	$.leftBackView.left = 5;
	$.rightBackView.left = 0;
	
	$.dateView.right = $.rightBackView.right = $.imgRow.left = undefined;

}

$.lblTitle.textAlign = alignment; 