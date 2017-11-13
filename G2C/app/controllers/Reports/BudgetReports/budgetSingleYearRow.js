var args = arguments[0] || {};

if (OS_IOS) {
	density = "dp";
} else {
	density = "px";
}

$.row.height = (Alloy.Globals.GetHeight(30) + density);
$.lblCode.text = args.code;
$.lblGroup21.text = args.group21.toFixed(2) + ' M';
$.lblGroup22.text = args.group22.toFixed(2) + ' M';
$.lblGroup31.text = args.group31.toFixed(2) + ' M';
$.lblTotal.text = args.total.toFixed(2) + ' M';

$.lblCode.width = $.lblGroup21.width = $.lblGroup22.width = $.lblGroup31.width = $.lblTotal.width = (Alloy.Globals.GetWidth(60) + density);

var alignment;

if (Alloy.Globals.isEnglish) {

	alignment = Titanium.UI.TEXT_ALIGNMENT_LEFT;

	$.lblCode.left = (Alloy.Globals.GetWidth(0) + density);
	$.lblGroup21.left = (Alloy.Globals.GetWidth(65) + density);
	$.lblGroup22.left = (Alloy.Globals.GetWidth(125) + density);
	$.lblGroup31.left = (Alloy.Globals.GetWidth(195) + density);
	$.lblTotal.left = (Alloy.Globals.GetWidth(255) + density);

	$.lblCode.right = $.lblGroup21.right = $.lblGroup22.right = $.lblGroup31.right = $.lblTotal.right = undefined;
	$.lblCode.textAlign = $.lblGroup21.textAlign = $.lblGroup22.textAlign = $.lblGroup31.textAlign = $.lblTotal.textAlign = "center";
	//alignment;

} else {
	alignment = Titanium.UI.TEXT_ALIGNMENT_RIGHT;

	$.lblCode.right = (Alloy.Globals.GetWidth(0) + density);
	$.lblGroup21.right = (Alloy.Globals.GetWidth(35) + density);
	$.lblGroup22.right = (Alloy.Globals.GetWidth(125) + density);
	$.lblGroup31.right = (Alloy.Globals.GetWidth(195) + density);
	$.lblTotal.right = (Alloy.Globals.GetWidth(255) + density);

	$.lblCode.left = $.lblDesc.left = $.lblGroup22.left = $.lblGroup31.left = $.lblTotal.left = undefined;
	$.lblCode.textAlign = $.lblGroup21.textAlign = $.lblGroup22.textAlign = $.lblGroup31.textAlign = $.lblTotal.textAlign = "center";
	//alignment;

}