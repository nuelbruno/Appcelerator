var args = arguments[0] || {};
$.viewCatTitle.layout = $.viewAmount.layout = 'vertical';
$.lblTitle.text = args.title;
$.imgExpenseCategory_bg.image = args.bgIcon;
$.imgExpenseCategory.image = args.icon;
$.txtBudget.preValue = $.txtBudget.value = $.lblBudget.text = args.budget_Amount;
$.lblActual.text = args.actual;
$.lblDate.text = args.transactionDate;
var validateBudget = function(e) {
	if (parseInt(e.source.value, 10) < parseInt(e.source.budget_AmountSpent, 10)) {
		e.source.value = e.source.budget_AmountSpent;
		Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.expenseCategoryTitle, Alloy.Globals.selectedLanguage.budgetAmountCannotBeLessThanExpenseMsg + "\n" +Alloy.Globals.selectedLanguage.amountSpentAlreadyTitle +  "(" + $.lblTitle.text + ")" + "\n" +":" + e.source.budget_AmountSpent);
		e.source.focus();
	}

};

$.lblTitle.color = $.txtBudget.color = $.lblBudget.color = (Alloy.Globals.currentTheme == "dark") ? "#FFF" : Alloy.Globals.path.blackColor;

var calculateTotalBudgetAllocationAmount = function(e) {

};

if (args.isCategorySelection) {
	$.txtBudget.visible = $.lblBudget.visible = false;
}

if (args.isExpenseInfo || args.isInfo) {
	$.txtBudget.visible = false;

	$.lblBudget.visible = true;
	$.lblActual.visible = true;
	if (args.isExpenseInfo) {
		$.lblDate.visible = true;
		if (args.isFromBudget == undefined) {
			$.lblDate.height = Ti.UI.SIZE;
		} else {
			if ($.lblActual.text == null) {
				$.viewAmount.layout = "composite";
			}
		}
	}
}

var alignment;
$.lblDate.left = $.lblDate.right = $.lblTitle.left = $.lblTitle.right = 0;
if (Alloy.Globals.isEnglish) {
	alignment = Titanium.UI.TEXT_ALIGNMENT_LEFT;
	$.viewCategory.left = $.viewAmount.right = $.txtBudget.right = $.lblActual.right = $.lblBudget.right = 0;
	if (Alloy.isTablet) {
		$.viewTitle.left = 80;
		$.viewTitle.right = 10;
		$.viewCatTitle.left = 0;
		$.viewCatTitle.right = 145;

	} else {
		$.viewTitle.left = 50;
		$.viewTitle.right = 10;
		$.viewCatTitle.left = 0;
		$.viewCatTitle.right = 110;
	}
	$.lblBudget.textAlign = $.lblActual.textAlign = Titanium.UI.TEXT_ALIGNMENT_RIGHT;

} else {
	alignment = Titanium.UI.TEXT_ALIGNMENT_RIGHT;
	$.viewCategory.right = $.viewAmount.left = $.txtBudget.left = $.lblActual.left = $.lblBudget.left = 0;
	if (Alloy.isTablet) {
		$.viewTitle.left = 10;
		$.viewTitle.right = 80;
		$.viewCatTitle.right = 0;
		$.viewCatTitle.left = 145;
	} else {
		$.viewTitle.right = 50;
		$.viewTitle.left = 10;
		$.viewCatTitle.right = 0;
		$.viewCatTitle.left = 110;
	}
	$.lblBudget.textAlign = $.lblActual.textAlign = Titanium.UI.TEXT_ALIGNMENT_LEFT;
}
$.lblTitle.textAlign = $.txtBudget.textAlign = $.lblDate.textAlign = alignment;

$.txtBudget.addEventListener('change', function(e) {
	var regex = /^[0-9]+$/;
	if (!regex.test($.txtBudget.value)) {
		if ($.txtBudget.value.length > 0) {
			$.txtBudget.value = $.txtBudget.preValue;
		} else {
			$.txtBudget.preValue = "";
		}
	} else {
		$.txtBudget.preValue = $.txtBudget.value;
	}
});
