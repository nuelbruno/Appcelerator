var args = arguments[0] || {};

var monthArray = [];
if (Alloy.Globals.isEnglish) {
 monthArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
} else{
	monthArray = ["يناير", "فبراير", "مسيرة", "نيسان", "قد", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "تشرين الثاني", "ديسمبر"];
}
$.imgRow.defaultImage =Alloy.Globals.path.defaultImageThumb;
$.imgRow.image = Alloy.Globals.baseNewsUrl+args.image;

$.lblTitle.text = Alloy.Globals.CleanHtml(args.title);
$.lblDate.text = args.date.substring(0, 2)+" "+monthArray[args.date.substring(3, 5).replace("/","")-1];
var alignment;
if (Alloy.Globals.isEnglish) {
	alignment = Titanium.UI.TEXT_ALIGNMENT_LEFT;
	$.dateView.backgroundImage = Alloy.Globals.path.bgNewsDateRight;
	$.imgRow.left = 10;
	$.lblTitle.left = 100;
	$.lblTitle.right = 40;
	$.leftBackView.right = 5;
	$.rightBackView.right =	$.leftBackView.left = $.dateView.right = 0;
	$.dateView.left = $.rightBackView.left = $.imgRow.right = undefined;
} else {
	alignment = Titanium.UI.TEXT_ALIGNMENT_RIGHT;
	$.dateView.backgroundImage = Alloy.Globals.path.bgNewsDateLeft;
	$.imgRow.right = 10;
	$.lblTitle.right = 100;
	$.lblTitle.left = 40;
	$.leftBackView.right = $.rightBackView.left = 	$.dateView.left = 0;
	$.leftBackView.left = 5;
	$.dateView.right = $.rightBackView.right = $.imgRow.left = undefined;

}

$.lblTitle.textAlign = alignment; 