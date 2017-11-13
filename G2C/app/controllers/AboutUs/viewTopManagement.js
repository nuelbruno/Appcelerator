var args = arguments[0] || {};
$.lblTitle.text = args.Title;
$.lblContent.text = args.Content;
var isexpand = false;
$.viewTop.Title = $.lblTitle;
$.viewTop.Content = $.lblContent;
$.viewTop.Image = $.imgArrow;
var resetFunction= args.callBackFunction;
var alignment;
Ti.API.info("Tyyyyyy  ----------> "+args.Title);
if (Alloy.Globals.isEnglish) {
	alignment = Titanium.UI.TEXT_ALIGNMENT_LEFT;
	$.lblTitle.left = 10;
	$.lblTitle.right = 35;
	$.lblContent.left = 10;
	$.lblContent.right = 10;
	$.imgArrow.right = 10;
	//imgArrow.backgroundImage = Alloy.Globals.path.goldColor;
	$.imgArrow.left =  undefined;

} else {
	alignment = Titanium.UI.TEXT_ALIGNMENT_RIGHT;
	$.lblTitle.left = 35;
	$.lblTitle.right = 10;
	$.lblContent.right = 10;
	$.lblContent.left = 10;
	$.imgArrow.left = 10;
	//imgArrow.backgroundImage = Alloy.Globals.path.goldColor;
	$.imgArrow.right = undefined;
}
$.lblTitle.textAlign = $.lblContent.textAlign = alignment;
$.viewTop.addEventListener("click", function(e) {

	if (isexpand) {
		isexpand = false;
		// e.source.height = Titanium.UI.SIZE;
		// $.lblContent.visible = true;
		// $.imgArrow.backgroundImage = Alloy.Globals.path.icnArrowUp;
		
		Ti.API.info("Test 1" );
	} else {
		isexpand = true;
		// e.source.height = Titanium.UI.SIZE;
		// $.lblContent.visible = true;
		// $.imgArrow.backgroundImage = Alloy.Globals.path.icnArrowUp;
		
		Ti.API.info("Test 2" );
	}
	resetFunction($.viewTop,isexpand);

});

