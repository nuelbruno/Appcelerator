var args = arguments[0] || {};

$.lblTitle.text = args.title;

var budget_amount = parseInt(args.budget_Amount);
var budget_AmountSpent = parseInt(args.budget_AmountSpent);
var amount_remaining = budget_amount - budget_AmountSpent;

$.lblBudgetAmount.text = args.budget_Amount;
$.lblAvailableAmount.text = amount_remaining;
$.lblRemains.text = Alloy.Globals.selectedLanguage.spentAmount + budget_AmountSpent;
$.spentView.width = ((budget_AmountSpent / budget_amount) * 100) + "%";
$.remainsView.width = ((amount_remaining / budget_amount) * 100) + "%";
var alignment;
$.lblRemains.left = 0;
if (Alloy.Globals.isEnglish) {
	alignment = Titanium.UI.TEXT_ALIGNMENT_LEFT;
	$.leftContentCol1.left = 0;
	$.leftContentCol2.right = 0;
	$.lblTitle.left = 10;
	$.lblTitle.right = 85;
	$.viewReport.right = 40;
	$.viewEdit.right = 0;
	if (Alloy.isTablet) {
		$.lblTitle.right = 135;
		$.viewReport.right = 70;
	}

} else {
	alignment = Titanium.UI.TEXT_ALIGNMENT_RIGHT;
	$.leftContentCol1.right = 0;
	$.leftContentCol2.left = 0;
	$.lblTitle.right = 10;
	$.lblTitle.left = 85;
	$.viewReport.left = 40;
	$.viewEdit.left = 0;
	if (Alloy.isTablet) {
		$.lblTitle.left = 135;
		$.viewReport.left = 70;
	}
}

$.lblTitle.textAlign = alignment;

$.viewReport.budget_id = args.budget_id;
$.viewEdit.budget_id = args.budget_id;
