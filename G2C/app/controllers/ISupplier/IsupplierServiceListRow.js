var args = arguments[0] || {};
$.iconView.image = args.icon;
$.lblTitle.text = args.title;
$.tblRowIsupplier.lbl = $.lblTitle;
//$.backView.backgroundImage = Alloy.Globals.path.ISupplierRowBG;

if(args.winPath == "ISupplier/winDrafts"){
	$.iconView.width = $.iconView.height = 24;
}

if (Alloy.Globals.isEnglish) {
	alignment = Titanium.UI.TEXT_ALIGNMENT_LEFT;
	$.lblTitle.left = 55;
	$.lblTitle.right = 15;
	$.iconView.left = 15;

} else {
	alignment = Titanium.UI.TEXT_ALIGNMENT_RIGHT;
	$.lblTitle.right = 55;
	$.lblTitle.left = 15;
	$.iconView.right = 15;
}
$.lblTitle.textAlign = alignment;
