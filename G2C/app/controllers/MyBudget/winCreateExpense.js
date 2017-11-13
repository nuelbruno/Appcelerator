var args = arguments[0] || {};
var budget = undefined;
Ti.API.info("Expense Row on load :" + JSON.stringify(args));

if (Alloy.Globals.isIOS7Plus) {
	$.win.extendEdges = [Ti.UI.EXTEND_EDGE_TOP];
	$.statusBar.height = 20;

}

function gotoHome(){
	Alloy.Globals.gotoHome();
}
function closeWindow() {
	Alloy.Globals.closeWindow($.win);
}

var SelectDate = function(e) {
	Alloy.Globals.generateDatePicker($.lblSelectDate, $.lblSelectDate_value, $.win, budget[0]);
};

var expenseRowsData = [];
var selectedExpenseCategory = undefined;
var addCategorySelection = function(e) {

	var budget = Alloy.Globals.DBManager.getBudgetDetailsById(args.ID);
	//Ti.API.info("==> Budget before category selection:"+ JSON.stringify(budget));
	if (budget.length > 0 && budget[0].ExpenseCategoriesBudget.length > 0) {
		var doc = {
			ExpenseCategoriesBudget : budget[0].ExpenseCategoriesBudget,
			isCategorySelection : true,
			callBackFunction : setCategoryValue
		};
		var count = 0;
		for (var i = 0,
		    length = budget[0].ExpenseCategoriesBudget.length; i < length; i++) {
			var budget_AmountSpent = (budget[0].ExpenseCategoriesBudget[i].budget_AmountSpent != null) ? budget[0].ExpenseCategoriesBudget[i].budget_AmountSpent : 0;
			var availableAmount = parseInt(budget[0].ExpenseCategoriesBudget[i].budget_Amount,10) - parseInt(budget_AmountSpent,10);
			if (availableAmount > 0) {
				count = 1;
			}
		}
		if (count == 1) {
			var win = Alloy.createController("MyBudget/winExpenseCategory", doc).getView();
			Alloy.Globals.openWindow(win);
		} else {
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.createExpenseTitle, Alloy.Globals.selectedLanguage.noCategoryAvailable);
		}
	} else {
		Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.createExpenseTitle, Alloy.Globals.selectedLanguage.noCategoryAvailable);
	}

};
var setCategoryValue = function(selectedCat) {
	//Ti.API.info("Create Expense selecte category:"+ JSON.stringify(selectedCat));
	selectedExpenseCategory = selectedCat;
	$.lblCategoryValue.text = selectedCat.title;
	var budget_AmountSpent = (selectedCat.budget_AmountSpent != null) ? selectedCat.budget_AmountSpent : 0;
	var availableAmount = parseInt(selectedCat.budget_Amount,10) - parseInt(budget_AmountSpent,10);
	$.lblBudgetAmountValue.text = selectedCat.budget_Amount + "(" + availableAmount + ")";
	$.lblBudgetAmountValue.availableAmount = availableAmount;
};
var saveExpense = function(e) {
	//Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading, false);

	var errorMessage = '';

	if ($.lblCategoryValue != null) {
		if ($.lblCategoryValue.text.length == 0)
			errorMessage = errorMessage + $.lblCategory.text + '\n';
	}

	if ($.txtAmount != null) {
		if ($.txtAmount.value == 0) {
			errorMessage = errorMessage + $.lblAmount.text + '\n';
		}
	}

	if ($.lblSelectDate_value != null) {
		if ($.lblSelectDate_value.text == 0) {
			errorMessage = errorMessage + $.lblDate.text + '\n';
		} else {
			var startDate = budget[0].StartDate.split("-");
			var endDate = budget[0].EndDate.split("-");
			var selectedDate = $.lblSelectDate_value.text.split("-");

			var startDate_compare = new Date(startDate[0], startDate[1], startDate[2]);
			var endDate_compare = new Date(endDate[0], endDate[1], endDate[2]);
			var selectedDate_compare = new Date(selectedDate[0], selectedDate[1], selectedDate[2]);

			Ti.API.info("dates - " + startDate_compare + " - " + endDate_compare + " - " + selectedDate_compare + " - " + (selectedDate_compare >= startDate_compare) + (selectedDate_compare <= endDate_compare));

			if (!(selectedDate_compare >= startDate_compare && selectedDate_compare <= endDate_compare))
				errorMessage = errorMessage + Alloy.Globals.selectedLanguage.expenseDateMsg + (startDate[2] + "-" + startDate[1] + "-" + startDate[0]) + " , " + (endDate[2] + "-" + endDate[1] + "-" + endDate[0]) + "\n";
		}
	}

	if (errorMessage.length > 0) {
		//Alloy.Globals.hideLoading();
		Alloy.Globals.ShowAlert($.lblNavTitle.text, Alloy.Globals.selectedLanguage.plzEnterMissingFieldsMsg + "\n" + errorMessage);
	} else {

		if (parseInt($.lblBudgetAmountValue.availableAmount,10) < parseInt($.txtAmount.value,10)) {
			//Alloy.Globals.hideLoading();
			var msg = Alloy.Globals.selectedLanguage.expenseAmountCannotBeGreaterThanAvailableBudgetAmountMsg + "\n" + Alloy.Globals.selectedLanguage.availableAmountTitle + ":" + $.lblBudgetAmountValue.availableAmount;
			Alloy.Globals.ShowAlert($.lblNavTitle.text, msg);
		} else {

			var expenses = [{
				expenseCatid : selectedExpenseCategory.id,
				amount : $.txtAmount.value,
				transaction_date : $.lblSelectDate.text
			}];

			var status = Alloy.Globals.DBManager.insertBudget_Expenses(args.ID, expenses);
			if (status) {
				var doc = {
					category : selectedExpenseCategory,
					title : selectedExpenseCategory.title,
					icon : selectedExpenseCategory.icon,
					bgIcon : selectedExpenseCategory.bgIcon,
					budget_Amount : selectedExpenseCategory.budget_Amount,//$.lblBudgetAmountValue.text,
					actual : parseInt($.txtAmount.value,10),
					budget_AmountSpent : selectedExpenseCategory.budget_AmountSpent,
					transactionDate : $.lblSelectDate.text,
					isExpenseInfo : true,
					isCategorySelection : false
				};

				var imgSeparator = Ti.UI.createImageView({
					width : "100%",
					height : 1,
					bottom : 0,
					backgroundColor : Alloy.Globals.path.grayColor
				});

				var row = Alloy.createController("MyBudget/expenseCategoryRow", doc).getView();

				row.add(imgSeparator);
				row.doc = doc;
				expenseRowsData.push(row);

				$.tableView.data = expenseRowsData;
				$.lblRecentExpenses.visible = true;
				$.bgTableView.show();

				reset();

				Alloy.Globals.ShowAlert($.lblNavTitle.text, Alloy.Globals.selectedLanguage.expenseCreateSuccessMsg);

				Ti.App.fireEvent("reloadBudgets");
				//Alloy.Globals.hideLoading();
			} else {
				//Alloy.Globals.hideLoading();
			}

		}

	}
};

var upDateExpenses = function(e) {
	closeWindow();
};
var reset = function() {
	if ($.lblCategoryValue != null)
		$.lblCategoryValue.text = "";
	if ($.lblBudgetAmountValue != null)
		$.lblBudgetAmountValue.text = "";
	if ($.txtAmount != null)
		$.txtAmount.value = "";

	if ($.lblSelectDate != null)
		$.lblSelectDate.text = "";
	if ($.lblSelectDate_value != null)
		$.lblSelectDate_value.text = 0;
};
function changeLanguage() {

	$.lblNavTitle.text = Alloy.Globals.selectedLanguage.createExpenseTitle;
	$.lblCategory.text = Alloy.Globals.selectedLanguage.categoryTitle;
	$.lblBudgetAmount.text = Alloy.Globals.selectedLanguage.budgetTitle;
	$.lblAmount.text = Alloy.Globals.selectedLanguage.amountTitle;
	$.lblDate.text = Alloy.Globals.selectedLanguage.dateTitle;
	$.btnSave.title = Alloy.Globals.selectedLanguage.save;
	$.lblRecentExpenses.text = Alloy.Globals.selectedLanguage.recentExpenseTitle;
	budget = Alloy.Globals.DBManager.getBudgetDetailsById(args.ID);
	Ti.API.info("==> Budget on expense load:" + JSON.stringify(budget));
	if (budget.length > 0 && budget[0].Expenses.length > 0) {
		if (budget[0].Expenses) {
			$.lblRecentExpenses.visible = true;
			for (var i = 0; i < budget[0].Expenses.length; i++) {
				var currentExpense = budget[0].Expenses[i];
				var currentCat = budget[0].Expenses[i].expenseCategory;
				//Alloy.Globals.ExpenseCategories[currentExpense.expenseCategoryId];

				var transactionDate = "N/A";
				if (currentExpense.transaction_date != undefined) {
					var transaction_date = currentExpense.transaction_date.split("-");
					transactionDate = transaction_date[0] + "-" + transaction_date[1] + "-" + transaction_date[2];
				}

				var doc = {
					category : currentCat, //Alloy.Globals.ExpenseCategories[currentExpense.expenseCategoryId],
					title : (Alloy.Globals.isEnglish) ? currentCat.name_en : currentCat.name_ar,
					icon : currentCat.icon_url,
					bgIcon : currentCat.background_url,
					budget_Amount : currentExpense.budget_Amount,
					actual : currentExpense.amount,
					budget_AmountSpent : currentExpense.budget_AmountSpent,
					transactionDate : transactionDate,
					isExpenseInfo : true,
					isCategorySelection : false
				};

				var imgSeparator = Ti.UI.createImageView({
					width : "100%",
					height : 1,
					bottom : 0,
					backgroundColor : Alloy.Globals.path.grayColor
				});

				var row = Alloy.createController("MyBudget/expenseCategoryRow", doc).getView();

				row.add(imgSeparator);
				row.doc = doc;
				expenseRowsData.push(row);
			}

			$.tableView.data = expenseRowsData;
			$.bgTableView.show();
		}
	}

	var alignment;

	if (Alloy.Globals.isEnglish) {
		alignment = Titanium.UI.TEXT_ALIGNMENT_LEFT;

		$.viewCategory.children[0].left = $.viewBudgetAmount.children[0].left = $.viewAmount.children[0].left = $.viewDate.children[0].left = 10;
		$.viewCategory.children[1].left = $.viewBudgetAmount.children[1].left = $.viewAmount.children[1].left = $.viewDate.children[1].left = (Alloy.isTablet) ?  70 : 50;
		$.viewCategory.children[2].left = $.viewBudgetAmount.children[2].left = $.viewAmount.children[2].left = $.viewDate.children[2].left = (Alloy.isTablet) ? 240 : 140;

		//right icons alignment
		$.viewCategory.children[2].children[0].left = $.viewDate.children[2].children[0].left = $.viewCategory.children[2].children[1].right = 0;
		$.viewDate.children[2].children[1].right = 10;

		$.lblRecentExpenses.left = 0;

		$.viewCategory.children[0].right = undefined;
		$.viewCategory.children[1].right = undefined;
		$.viewCategory.children[2].right = undefined;

	} else {
		alignment = Titanium.UI.TEXT_ALIGNMENT_RIGHT;

		$.viewCategory.children[0].right = $.viewBudgetAmount.children[0].right = $.viewAmount.children[0].right = $.viewDate.children[0].right = 10;
		$.viewCategory.children[1].right = $.viewBudgetAmount.children[1].right = $.viewAmount.children[1].right = $.viewDate.children[1].right = (Alloy.isTablet) ?  70 : 50;
		$.viewCategory.children[2].right = $.viewBudgetAmount.children[2].right = $.viewAmount.children[2].right = $.viewDate.children[2].right = (Alloy.isTablet) ? 240 : 140;

		//right icons alignment
		$.viewCategory.children[2].children[0].right = $.viewDate.children[2].children[0].right = $.viewCategory.children[2].children[1].left = 0;
		$.viewDate.children[2].children[1].left = 10;

		$.lblRecentExpenses.right = 0;

		$.viewCategory.children[0].left = $.viewBudgetAmount.children[0].left = $.viewAmount.children[0].left = $.viewDate.children[0].left = undefined;
		$.viewCategory.children[1].left = $.viewBudgetAmount.children[1].left = $.viewAmount.children[1].left = $.viewDate.children[1].left = undefined;
		$.viewCategory.children[2].left = $.viewBudgetAmount.children[2].left = $.viewAmount.children[2].left = $.viewDate.children[2].left = undefined;

	}
	$.viewCategory.children[1].textAlign = $.viewBudgetAmount.children[1].textAlign = $.viewAmount.children[1].textAlign = $.viewDate.children[1].textAlign = $.lblBudgetAmountValue.textAlign = $.lblRecentExpenses.textAlign = $.txtAmount.textAlign = alignment;
}

$.win.addEventListener('click', function(e) {
	if (!OS_IOS)
		Ti.UI.Android.hideSoftKeyboard();
	else {
		if ($.txtAmount != null)
			$.txtAmount.blur();
	}

});

var hideKeyBoard = function() {
	Ti.API.info("Create Budget - Keyboard hiding");

	if (!OS_IOS)
		Ti.UI.Android.hideSoftKeyboard();
	else {
		if ($.txtAmount != null)
			$.txtAmount.blur();

	}
};

$.txtAmount.addEventListener('change', function(e) {
	var regex = /^[0-9]+$/;
	if (!regex.test($.txtAmount.value)) {
		if ($.txtAmount.value.length > 0) {
			$.txtAmount.value = $.txtAmount.preValue;
		}else{
			$.txtAmount.preValue = "";
		}
	} else {
		$.txtAmount.preValue = $.txtAmount.value;
	}
});
Ti.App.addEventListener('HideKeyBoard', hideKeyBoard);

changeLanguage();

$.win.addEventListener("focus", function(e) {
	$.viewBottomToolbar.setDefaultTheme($.win);
});

$.viewBottomToolbar.setDefaultTheme($.win);

// var openHelpScreen = $.viewInstructions.openHelpScreen;

/**
 * Adding the eventlistener for the bottom bar view
 *
 * @param {Object} e
 */
$.viewBottomToolbar.getView().addEventListener('click', function(e) {
	if (e.source.buttonId == 'btnFontChange') {
		$.viewBottomToolbar.changeFont($.win);
	} else if (e.source.buttonId == 'btnSystemFeedback') {
		$.viewBottomToolbar.openFeedbackScreen(e);
	} else/*if (e.source.buttonId == 'btnSystemInstruction') {
	 $.viewInstructions.openHelpScreen(e);
	 } else*/
	if (e.source.buttonId == 'btnSystemChangeTheme') {
		$.viewBottomToolbar.changeTheme($.win);
	}
});

/**
 * Called on open of the window
 *
 * @param {Object} e
 */
function windowOpened(e) {
	Alloy.Globals.arrWindows.push($.win);
	$.viewBottomToolbar.setOptions({
		showThemeButton : true,
		showInstructions : false,
		showFeedBack : true,
		showFontResize : true
	});
};

/**
 * Window is closed
 *
 * @param {Object} e
 */
function windowClosed(e) {
	Alloy.Globals.arrWindows.pop();
	$.imgBackBtn = $.imgHomeBtn = $.imgCategory = $.imgPlusGreen = $.imgAmount = $.imgDate = $.imgSelectDate = $.tableView = null;
	$.destroy();
};