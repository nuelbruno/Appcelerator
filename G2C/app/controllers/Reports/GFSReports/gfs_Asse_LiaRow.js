var args = arguments[0] || {};

if (OS_IOS) {
	density = "dp";
} else {
	density = "px";
}

$.row.height = (Alloy.Globals.GetHeight(30) + density);
$.lblCode.text = args.code;
$.lblDesc.text = args.desc;
$.lblTotal.text = args.total;

$.lblCode.width = (Alloy.Globals.GetWidth(70) + density);
$.lblDesc.width = (Alloy.Globals.GetWidth(135) + density);
$.lblTotal.width = (Alloy.Globals.GetWidth(70) + density);

var alignment;

if (Alloy.Globals.isEnglish) {

	alignment = Titanium.UI.TEXT_ALIGNMENT_LEFT;

	$.lblCode.left = (Alloy.Globals.GetWidth(5) + density);
	$.lblDesc.left = (Alloy.Globals.GetWidth(80) + density);
	$.lblTotal.left = (Alloy.Globals.GetWidth(220) + density);

	$.lblCode.right = $.lblDesc.right = $.lblTotal.right = undefined;
	$.lblCode.textAlign = $.lblDesc.textAlign = /*$.lblTotal.textAlign = */"center";
	//alignment;

} else {
	alignment = Titanium.UI.TEXT_ALIGNMENT_RIGHT;

	$.lblCode.right = (Alloy.Globals.GetWidth(5) + density);
	$.lblDesc.right = (Alloy.Globals.GetWidth(80) + density);
	$.lblTotal.right = (Alloy.Globals.GetWidth(220) + density);

	$.lblCode.left = $.lblDesc.left = $.lblTotal.left = undefined;
	$.lblCode.textAlign = $.lblDesc.textAlign = /*$.lblTotal.textAlign = */"center";
	//alignment;

}