var args = arguments[0] || {};

$.lblTitle.value = args.title;
if(args.index <5){
	$.lblTitle.editable = false;
}
if (parseInt(args.value,10) > 0)
	$.txtValue.preValue = $.txtValue.value = args.value;

var calculateTotalAmount = function() {
	args.callbackFunctionTotalAmount();
};

var alignment;
if (Alloy.Globals.isEnglish) {
	alignment = Titanium.UI.TEXT_ALIGNMENT_LEFT;
	$.lblTitle.left = (Alloy.isTablet) ? 80 : 50;
	// $.lblTitle.left = (Alloy.isTablet) ? 90 : 60;
	// $.lblTitle.right = (Alloy.isTablet) ? 150 : 120;
	$.txtValue.right = 10;

} else {
	alignment = Titanium.UI.TEXT_ALIGNMENT_RIGHT;
	$.lblTitle.right = (Alloy.isTablet) ? 80 : 50;
	// $.lblTitle.left = (Alloy.isTablet) ? 150 : 120;
	$.txtValue.left = 10;

}
$.lblTitle.textAlign = $.txtValue.textAlign = alignment;
$.txtValue.addEventListener('change', function(e) {
	var regex = /^[0-9]+$/;
	if (!regex.test($.txtValue.value)) {
		if ($.txtValue.value.length > 0) {
			$.txtValue.value = $.txtValue.preValue;
		}else{
			$.txtValue.preValue = "";
		}
	} else {
		$.txtValue.preValue = $.txtValue.value;
	}
});