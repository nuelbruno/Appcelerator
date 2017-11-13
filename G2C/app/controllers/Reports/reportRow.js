var args = arguments[0] || {};
var density;
if (OS_IOS) {
	density = "dp";
} else {
	density = "px";
}

$.lblTitle.text = args;
var alignment;
if (Alloy.Globals.isEnglish) {
	alignment = Titanium.UI.TEXT_ALIGNMENT_LEFT;
	$.lblTitle.left = $.imgRowArrow.right = 10;
	$.lblTitle.right = 35;
	$.imgRowArrow.backgroundImage = Alloy.Globals.path.icnArrowRightBlack;
	$.imgRowArrow.left = undefined;
} else {
	alignment = Titanium.UI.TEXT_ALIGNMENT_RIGHT;
	$.lblTitle.right = $.imgRowArrow.left = 10;
	$.lblTitle.left = 35;
	$.imgRowArrow.backgroundImage = Alloy.Globals.path.icnArrowLeftBlack;
	$.imgRowArrow.right = undefined;
}

$.lblTitle.textAlign = alignment;
