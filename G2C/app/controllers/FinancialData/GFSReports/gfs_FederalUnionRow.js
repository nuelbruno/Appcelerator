var args = arguments[0] || {};

if (OS_IOS) {
	density = "dp";
} else {
	density = "px";
}
if (args.index % 2 == 0) {
	$.row.backgroundColor = Alloy.Globals.path.whiteColor;
} else {
	$.row.backgroundColor = Alloy.Globals.path.graphTableAlterBackColor;
}

$.row.height = (Alloy.Globals.GetHeight(30) + density);
$.lblDesc.text = args.desc;
$.lblTotal.text = "" + args.total;
$.lblDesc.width = "48%";
$.lblTotal.width = "44%";

var alignment;

if (Alloy.Globals.isEnglish) {

	alignment = Titanium.UI.TEXT_ALIGNMENT_LEFT;
	$.lblDesc.left = "2%";
	$.lblTotal.right = "6%";
	$.lblDesc.right = $.lblTotal.left = undefined;
	$.lblDesc.textAlign = "center";

} else {
	alignment = Titanium.UI.TEXT_ALIGNMENT_RIGHT;
	$.lblDesc.right = "2%";
	$.lblTotal.left = "2%";
	$.lblDesc.left = $.lblTotal.right = undefined;
	$.lblDesc.textAlign = "center";

}