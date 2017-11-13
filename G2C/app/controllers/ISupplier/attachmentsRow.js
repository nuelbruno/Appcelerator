var args = arguments[0] || {};
var moment = require('alloy/moment');
$.lblOrderNumber.text = args.title;
$.lblDescription.text = args.description;
$.lblEntityValue.text = args.type;
$.lblOrdDateValue.text = args.category_Name;
$.lblAmoutValue.text = args.last_Updatedby;
$.lblupdateOnValue.text = moment(args.last_Updated).format("DD-MM-YYYY");
$.lblEntityTitle.text = Alloy.Globals.selectedLanguage.typeTitle;
$.lblOrdDateTitle.text = Alloy.Globals.selectedLanguage.categoryName;
$.lblAmoutTitle.text = Alloy.Globals.selectedLanguage.lastUpdateBy;
$.lblupdateOnTitle.text = Alloy.Globals.selectedLanguage.lastUpdateOn;
$.tblRow.imgUpDown = $.imgUpDown;
$.tblRow.mainView = $.mainBackView;
var alignment;
if (Alloy.Globals.isEnglish) {
	alignment = Ti.UI.TEXT_ALIGNMENT_LEFT;
	$.lblOrderNumber.left = 10;
	$.lblOrderNumber.right = 50,
	$.imgUpDown.right = 10;
	$.lblEntityTitle.left = $.lblOrdDateTitle.left = $.lblAmoutTitle.left = $.lblupdateOnTitle.left = 10;
	$.lblEntityValue.left = $.lblOrdDateValue.left = $.lblAmoutValue.left = $.lblupdateOnValue.left = 150;
	$.lblEntityValue.right = $.lblOrdDateValue.right = $.lblAmoutValue.right = $.lblupdateOnValue.right = 10;

} else {
	alignment = Ti.UI.TEXT_ALIGNMENT_RIGHT;
	$.lblOrderNumber.right = 10;
	$.lblOrderNumber.left = 50,
	$.imgUpDown.left = 10;
	$.lblEntityTitle.right = $.lblOrdDateTitle.right = $.lblAmoutTitle.right = $.lblupdateOnTitle.right = 10;
	$.lblEntityValue.right = $.lblOrdDateValue.right = $.lblAmoutValue.right = $.lblupdateOnValue.right = 150;
	$.lblEntityValue.left = $.lblOrdDateValue.left = $.lblAmoutValue.left = $.lblupdateOnValue.left = 10;

}
$.lblEntityTitle.textAlign = $.lblOrdDateTitle.textAlign = $.lblAmoutTitle.textAlign = $.lblupdateOnTitle.textAlign = alignment;
$.lblEntityValue.textAlign = $.lblOrdDateValue.textAlign = $.lblAmoutValue.textAlign = $.lblupdateOnValue.textAlign = alignment;
$.lblDescription.textAlign = $.lblOrderNumber.textAlign = alignment;
function showHideView(e){
	if (e.source.imgUpDown.isClick == false) {
		e.source.imgUpDown.isClick = true;
		e.source.imgUpDown.image = Alloy.Globals.path.iconArrow2Up;
		e.source.mainView.visible = true;
		e.source.mainView.height = Ti.UI.SIZE;
		e.source.mainView.bottom = 15;
		e.source.height = Ti.UI.SIZE;
	} else {
		e.source.imgUpDown.isClick = false;
		e.source.imgUpDown.image = Alloy.Globals.path.iconArrow2Down;
		e.source.mainView.visible = false;
		e.source.mainView.height = 0;
		e.source.mainView.bottom = 0;
		e.source.height = 46;
	}
	
}