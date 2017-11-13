var args = arguments[0] || {};

if (OS_IOS) {
	density = "dp";
} else {
	density = "px";
}
if(args.index %2 == 0){
	$.row.backgroundColor = Alloy.Globals.path.whiteColor;
}else{
	$.row.backgroundColor = Alloy.Globals.path.graphTableAlterBackColor;
}
//$.row.height = (Alloy.Globals.GetHeight(30) + density);
$.lblCode.text = args.code;
$.lblCode.color = Alloy.Globals.path.goldColor;
$.lblDesc.text = args.desc.replace("<br/>", "");
$.lblTotal.text = ""+args.total;

$.lblCode.width = "20%";//(Alloy.Globals.GetWidth(50) + density);
$.lblDesc.width = "46%";//(Alloy.Globals.GetWidth(125) + density);
$.lblTotal.width = "30%";//(Alloy.Globals.GetWidth(110) + density);

var alignment;

if (Alloy.Globals.isEnglish) {

	alignment = Titanium.UI.TEXT_ALIGNMENT_LEFT;

	$.lblCode.left = "1%";//(Alloy.Globals.GetWidth(5) + density);
	$.lblDesc.left = "21%";//(Alloy.Globals.GetWidth(60) + density);
	$.lblTotal.left = "69%";//(Alloy.Globals.GetWidth(190) + density);

	$.lblCode.right = $.lblDesc.right = $.lblTotal.right = undefined;
	$.lblCode.textAlign = $.lblDesc.textAlign = /*$.lblTotal.textAlign = */"center";
	//alignment;

} else {
	alignment = Titanium.UI.TEXT_ALIGNMENT_RIGHT;1

	$.lblCode.right = "1%";//(Alloy.Globals.GetWidth(5) + density);
	$.lblDesc.right = "21%";//(Alloy.Globals.GetWidth(60) + density);
	$.lblTotal.right = "69%";//(Alloy.Globals.GetWidth(200) + density);

	$.lblCode.left = $.lblDesc.left = $.lblTotal.left = undefined;
	$.lblCode.textAlign = $.lblDesc.textAlign = /*$.lblTotal.textAlign = */"center";
	//alignment;

}
