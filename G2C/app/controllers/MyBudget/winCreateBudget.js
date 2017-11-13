var args = arguments[0] || {};
var budget,
    budgetObject;
if (Alloy.Globals.isIOS7Plus) {
	$.win.extendEdges = [Ti.UI.EXTEND_EDGE_TOP];
	$.statusBar.height = 20;

}

function closeWindow() {
	Alloy.Globals.closeWindow($.win);
}
function gotoHome(){
	Alloy.Globals.gotoHome();
}
var SelectYourStartDate = function(e) {
	$.txtNote.blur();
	$.txtNewSourceTitle.blur();
	Alloy.Globals.generateDatePicker($.lblSelectYourStartDate, $.lblSelectYourStartDate_value, $.win, budget, (args.mode == 'edit') ? "startDate" : undefined);
};
var SelectYourEndDate = function(e) {
	$.txtNote.blur();
	Alloy.Globals.generateDatePicker($.lblSelectYourEndDate, $.lblSelectYourEndDate_value, $.win, budget, (args.mode == 'edit') ? "endDate" : undefined);
};
var addRevenueResource = function(e) {
	hideKeyBoard();
	$.txtNote.blur();

	if ($.imgPlusGreen.image == Alloy.Globals.path.icnPlusGreen) {
		$.imgPlusGreen.image = Alloy.Globals.path.icnMinusGreen;

		$.viewRevenueResourcesGrid.height = Ti.UI.SIZE;
		$.viewRevenueResourcesGrid.visible = true;

		if ($.viewRevenueResourcesGrid.children.length < 10) {
			$.viewRevenueResourcesAdd.height = Ti.UI.SIZE;
			$.viewRevenueResourcesAdd.visible = true;
			$.viewRevenueResourcesAdd.top = 10;
		}

	} else {
		$.imgPlusGreen.image = Alloy.Globals.path.icnPlusGreen;
		$.viewRevenueResourcesGrid.height = 0;
		$.viewRevenueResourcesGrid.visible = false;

		$.viewRevenueResourcesAdd.height = 0;
		$.viewRevenueResourcesAdd.visible = false;

		$.viewRevenueResourcesAdd.top = 0;

	}

};
var totalAmountCalculate = function() {
	var _totalAmount = 0;
	for (var i = 0; i < $.viewRevenueResourcesGrid.children.length; i++) {

		var obj = $.viewRevenueResourcesGrid.children[i];
		var _revenueSourcetitle = obj.children[0].text;
		var _revenueSourceamount = obj.children[1].value;
		Ti.API.info(_revenueSourcetitle + "- " + _revenueSourceamount);
		if (_revenueSourceamount != "" && _revenueSourceamount != "0") {
			Ti.API.info('>>>>>>' + parseInt(_revenueSourceamount, 10));
			_totalAmount = _totalAmount + parseInt(_revenueSourceamount, 10);
		}
		Ti.API.info("total- " + _totalAmount);
	}

	if ($.txtNewSourceTitle.value.length != 0 && !($.txtNewSourceValue.value.length == 0 || $.txtNewSourceValue.value == "0")) {
		_totalAmount = parseInt(_totalAmount, 10) + parseInt($.txtNewSourceValue.value, 10);
	}

	$.lblRevenueResourcesValue.text = $.lblTotalAmount.text = _totalAmount;

};
var loadDefaultRevenueSources = function(arr) {
	for (var i = 0; i < arr.length; i++) {

		var doc = {
			title : arr[i].title,
			value : arr[i].value,
			callbackFunctionTotalAmount : totalAmountCalculate,
			index : i
		};
		var row = Alloy.createController("MyBudget/revenueResource", doc).getView();
		$.viewRevenueResourcesGrid.add(row);
	}
};
var calculateTotalAmount = function(e) {
	var errorMessage = "";
	if ($.txtNewSourceTitle.value.length == 0) {
		errorMessage = Alloy.Globals.selectedLanguage.enterRevenueSourceTitleMsg + "\n";
	}

	if ($.txtNewSourceValue.value.length == 0 || $.txtNewSourceValue.value == "0") {
		errorMessage = errorMessage + Alloy.Globals.selectedLanguage.enterRevenueSourceValueMsg + "\n";
	}

	if (errorMessage.length == 0) {
		addNewRevenueSource();
	}

};
var addNewRevenueSource = function(e) {
	$.txtNote.blur();
	var errorMessage = "";
	var revenueResourcesCount = $.viewRevenueResourcesGrid.children.length;

	if (parseInt(revenueResourcesCount, 10) >= 10) {
		Alloy.Globals.ShowAlert($.lblNavTitle.text, Alloy.Globals.selectedLanguage.maximuAllowedResourcesCountReachMsg);

	} else {
		if ($.txtNewSourceTitle.value.length == 0) {
			errorMessage = Alloy.Globals.selectedLanguage.enterRevenueSourceTitleMsg + "\n";
		}

		if ($.txtNewSourceValue.value.length == 0 || $.txtNewSourceValue.value == "0") {
			errorMessage = errorMessage + Alloy.Globals.selectedLanguage.enterRevenueSourceValueMsg + "\n";
		}

		if (errorMessage.length > 0) {
			Alloy.Globals.ShowAlert($.lblNavTitle.text, Alloy.Globals.selectedLanguage.plzEnterMissingFieldsMsg + "\n" + errorMessage);

		} else {
			var doc = {
				title : $.txtNewSourceTitle.value,
				value : $.txtNewSourceValue.value,
				callbackFunctionTotalAmount : totalAmountCalculate,
				index : parseInt(revenueResourcesCount, 10)
			};
			var row = Alloy.createController("MyBudget/revenueResource", doc).getView();
			$.viewRevenueResourcesGrid.add(row);

			$.txtNewSourceTitle.value = "";
			$.txtNewSourceValue.value = "";
			//$.txtNewSourceTitle.focus();
			totalAmountCalculate();

			revenueResourcesCount = $.viewRevenueResourcesGrid.children.length;

			if (parseInt(revenueResourcesCount, 10) >= 10) {
				$.viewRevenueResourcesAdd.visible = false;
				$.viewRevenueResourcesAdd.height = 0;
				$.txtNote.focus();
			}
		}
	}

};
var alertDialog = Ti.UI.createAlertDialog({
	message : Alloy.Globals.selectedLanguage.deleteBudgetMsg,
	buttonNames : [Alloy.Globals.selectedLanguage.no, Alloy.Globals.selectedLanguage.yes]
});
alertDialog.addEventListener('click', function(e) {
	if (e.index == 1) {
		Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading, false);
		var status = Alloy.Globals.DBManager.deleteBudget(args.budget_id);
		if (status) {
			Alloy.Globals.ShowAlert($.lblNavTitle.text, Alloy.Globals.selectedLanguage.myBudgetDeleteSuccessMsg);
			Ti.App.fireEvent("reloadBudgets");
			Alloy.Globals.hideLoading();
			closeWindow();
		} else {
			Alloy.Globals.hideLoading();
		}
	}
});
var deleteBudget = function(e) {
	$.txtNote.blur();
	alertDialog.title = $.lblNavTitle.text;
	alertDialog.show();
};
var createBudget = function(e) {
	$.txtNote.blur();
	hideKeyBoard();

	$.btnDone.touchEnabled = false;
	var errorMessage = '';
	var _title,
	    _totlRevenueAmount,
	    _startDate,
	    _endDate,
	    _notes =
	    undefined;

	if ($.txtName != null) {
		if ($.txtName.value.length == 0) {
			errorMessage = errorMessage + $.lblName.text + '\n';
		} else
			_title = $.txtName.value;

	}
	var _revenueAmount = 0;
	var revenueSources = [];
	calculateTotalAmount();
	for (var i = 0; i < $.viewRevenueResourcesGrid.children.length; i++) {
		Ti.API.info("Revenue contents --------> " + $.viewRevenueResourcesGrid.children[i].children[1].value);
		var mAmount = $.viewRevenueResourcesGrid.children[i].children[1].value;
		var obj = $.viewRevenueResourcesGrid.children[i];
		var _revenueSourcetitle = obj.children[0].value;
		var _revenueSourceamount = ($.viewRevenueResourcesGrid.children[i].children[1].value.length > 0) ? obj.children[1].value : 0;

		if (mAmount.length == 0) {
			mAmount = 0;
		}
		revenueSources.push({
			Title : _revenueSourcetitle,
			Amount : mAmount
		});
		_revenueAmount = _revenueAmount + parseInt(mAmount, 10);
		$.lblTotalAmount.text = _revenueAmount;
	}
	$.lblRevenueResourcesValue.text = _revenueAmount;

	Ti.API.info("Revenue Resources----------- " + JSON.stringify(revenueSources));

	if ($.lblRevenueResourcesValue != null) {
		if ($.lblRevenueResourcesValue.text == undefined || $.lblRevenueResourcesValue.text.length == 0 || $.lblRevenueResourcesValue.text == "0") {
			errorMessage = errorMessage + $.lblRevenueResources.text + '\n';
		} else
			_totlRevenueAmount = $.lblRevenueResourcesValue.text;
	}
	if ($.lblSelectYourStartDate_value != null) {
		if ($.lblSelectYourStartDate_value.text == 0) {
			errorMessage = errorMessage + $.lblStartDate.text + '\n';
		} else
			_startDate = $.lblSelectYourStartDate_value.text;
	}

	if ($.lblSelectYourEndDate_value != null) {
		if ($.lblSelectYourEndDate_value.text == 0) {
			errorMessage = errorMessage + $.lblEndDate.text + '\n';
		} else
			_endDate = $.lblSelectYourEndDate_value.text;
	}

	if ($.lblSelectYourStartDate_value.text != 0 && $.lblSelectYourEndDate_value.text != 0) {
		var startDate = _startDate.split("-");
		var endDate = _endDate.split("-");
		Ti.API.info("dates - " + _startDate + " - " + _endDate);

		var startDate_compare = new Date(startDate[0], startDate[1], startDate[2]);
		var endDate_compare = new Date(endDate[0], endDate[1], endDate[2]);
		if (endDate_compare < startDate_compare)
			errorMessage = errorMessage + Alloy.Globals.selectedLanguage.endDateCannotbeLess + "\n";
	}

	if ($.txtNote != null) {
		if ($.txtNote.value == 0) {
			errorMessage = errorMessage + $.lblNote.text + '\n';
		} else
			_notes = $.txtNote.value;
	}

	if (errorMessage.length > 0) {
		Alloy.Globals.ShowAlert($.lblNavTitle.text, Alloy.Globals.selectedLanguage.plzEnterMissingFieldsMsg + "\n" + errorMessage);
	} else {
		Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading, false);
		var budget = {
			Title : _title,
			StartDate : _startDate,
			EndDate : _endDate,
			Notes : _notes,
			LangCode : Alloy.Globals.languageCode,
			RevenueSources : revenueSources
		};

		//Ti.API.info("==> Budget Insertion Start  with ==>"+ JSON.stringify(budget));

		if (args.mode == 'edit') {
			var expenseCatTotalAmount = 0;
			Ti.API.info('>>>>>>>'+JSON.stringify(budgetObject[0].ExpenseCategoriesBudget));
			for (var i = 0; i < budgetObject[0].ExpenseCategoriesBudget.length; i++) {
				expenseCatTotalAmount += budgetObject[0].ExpenseCategoriesBudget[i].budget_Amount;
				Ti.API.info('>>>>>>>>'+expenseCatTotalAmount);
			}
			if (parseInt($.lblTotalAmount.text,10) < expenseCatTotalAmount) {
				Alloy.Globals.ShowAlert($.lblNavTitle.text, Alloy.Globals.selectedLanguage.budgetAmountCannotBeLessThanExpenseCategoryMsg);
				Alloy.Globals.hideLoading();
				return;
			}
			budget.budget_id = args.budget_id;
			var status = Alloy.Globals.DBManager.updateBudget(budget);
			if (status) {
				Alloy.Globals.ShowAlert($.lblNavTitle.text, Alloy.Globals.selectedLanguage.myBudgetUpdateSuccessMsg);

				Ti.App.fireEvent("reloadBudgets");
				closeWindow();
				Alloy.Globals.hideLoading();
			} else {
				Alloy.Globals.hideLoading();
			}
		} else {
			var status = Alloy.Globals.DBManager.insertBudget(budget);
			if (status) {
				Alloy.Globals.ShowAlert($.lblNavTitle.text, Alloy.Globals.selectedLanguage.myBudgetCreateSuccessMsg);

				Ti.App.fireEvent("reloadBudgets");
				closeWindow();
				Alloy.Globals.hideLoading();
			} else {
				Alloy.Globals.hideLoading();
			}
		}
	}
	$.btnDone.touchEnabled = true;

};

function fn_DateCompare(DateA, DateB) {// this function is good for dates > 01/01/1970

	var a = new Date(DateA);
	var b = new Date(DateB);

	var msDateA = Date.UTC(a.getFullYear(), a.getMonth() + 1, a.getDate());
	var msDateB = Date.UTC(b.getFullYear(), b.getMonth() + 1, b.getDate());

	Ti.API.info("Comparing dates - start date : " + msDateA + "\n End Date :" + msDateB);
	if (parseFloat(msDateA) < parseFloat(msDateB))
		return -1;
	// lt
	else if (parseFloat(msDateA) == parseFloat(msDateB))
		return 0;
	// eq
	else if (parseFloat(msDateA) > parseFloat(msDateB))
		return 1;
	// gt
	else
		return null;
	// error
}

var reset = function(e) {
	if ($.txtName != null)
		$.txtName.value = "";
	if ($.lblSelectYourStartDate != null)
		$.lblSelectYourStartDate.text = "";
	if ($.lblSelectYourStartDate_value != null)
		$.lblSelectYourStartDate_value.text = 0;
	if ($.lblSelectYourEndDate != null)
		$.lblSelectYourEndDate.text = "";
	if ($.lblSelectYourEndDate_value != null)
		$.lblSelectYourEndDate_value.text = 0;
	if ($.viewRevenueResourcesGrid != null) {
		// Save childrens
		var removeData = [];
		for ( i = $.viewRevenueResourcesGrid.children.length; i > 0; i--) {
			removeData.push($.viewRevenueResourcesGrid.children[i - 1]);
		};

		// Remove childrens
		for ( i = 0; i < removeData.length; i++) {
			$.viewRevenueResourcesGrid.remove(removeData[i]);
		}
		removeData = null;

		loadDefaultRevenueSources(Alloy.Globals.RevenueSources);

		if ($.lblRevenueResourcesValue != null)
			$.lblRevenueResourcesValue.text = "";
		if ($.txtNewSourceTitle != null)
			$.txtNewSourceTitle.value = "";
		if ($.txtNewSourceValue != null)
			$.txtNewSourceValue.value = "";
		if ($.lblTotalAmount != null)
			$.lblTotalAmount.text = "";
		addRevenueResource();
		//show add revenue source view

	}
	if ($.txtNotes != null)
		$.txtNotes.value = "";

};
var loadEditData = function(budget_id) {
	budget = Alloy.Globals.DBManager.getBudgetDetailsById(budget_id);
	budgetObject = budget;
	Ti.API.info("Editing Budget--------- :" + JSON.stringify(budget));
	if (budget != null && budget.length > 0) {

		$.btnDone.title = Alloy.Globals.selectedLanguage.updateTitle;

		budget = budget[0];
		if ($.txtName != null)
			$.txtName.value = budget.Title;
		if ($.lblSelectYourStartDate != null && budget.StartDate != null) {
			var startDate = budget.StartDate.split("-");
			$.lblSelectYourStartDate.text = startDate[2] + "-" + startDate[1] + "-" + startDate[0];
		}
		if ($.lblSelectYourStartDate_value != null && budget.StartDate != null)
			$.lblSelectYourStartDate_value.text = budget.StartDate;
		if ($.lblSelectYourEndDate != null && budget.EndDate != null) {
			var endDate = budget.EndDate.split("-");
			$.lblSelectYourEndDate.text = endDate[2] + "-" + endDate[1] + "-" + endDate[0];
		}
		if ($.lblSelectYourEndDate_value != null && budget.EndDate != null)
			$.lblSelectYourEndDate_value.text = budget.EndDate;

		var _totalAmount = 0;
		for (var i = 0; i < budget.RevenueSources.length; i++) {
			var currentRevenueSource = budget.RevenueSources[i];
			_totalAmount = parseInt(_totalAmount, 10) + parseInt(currentRevenueSource.Amount, 10);
			if (i < Alloy.Globals.RevenueSources.length) {
				var obj = $.viewRevenueResourcesGrid.children[i];
				obj.children[1].value = currentRevenueSource.Amount;
			} else {
				var doc = {
					title : currentRevenueSource.Title,
					value : currentRevenueSource.Amount,
					callbackFunctionTotalAmount : totalAmountCalculate

				};
				var row = Alloy.createController("MyBudget/revenueResource", doc).getView();
				$.viewRevenueResourcesGrid.add(row);
			}

		}

		var revenueResourcesCount = $.viewRevenueResourcesGrid.children.length;

		if (budget.RevenueSources.length >= 10) {
			$.viewRevenueResourcesAdd.visible = false;
			$.viewRevenueResourcesAdd.height = 0;
		}

		//Ti.API.info("Total Amount :"+ _totalAmount);
		$.lblRevenueResourcesValue.text = _totalAmount;
		$.lblTotalAmount.text = _totalAmount;
		$.txtNote.value = budget.Notes;
		addRevenueResource();
		//show add revenue source view

	}
};

function hideKeyboard() {
	if (OS_IOS) {
		$.btnHide.animate({
			right : -60,
			duration : 200
		});
		$.btnDoneView.animate({
			right : 0,
			duration : 200,
		});
	}
	$.txtNote.blur();
}

var multilineTextBoxFocus = function(e) {
	if (OS_IOS) {
		$.btnHide.animate({
			right : 0,
			duration : 200
		});
		$.btnDoneView.animate({
			right : -70,
			duration : 200,
		});
	}
	$.scrlView.canCancelEvents = false;
	if (e.source.value.trim() == Alloy.Globals.selectedLanguage.noteHintText) {
		e.source.value = "";
	}
};
var multilineTextBoxBlur = function(e) {
	$.scrlView.canCancelEvents = true;
	if (e.source.value.trim().length == 0) {
		e.source.value = Alloy.Globals.selectedLanguage.noteHintText;
	}
	hideKeyboard();
};

function changeLanguage() {
	$.btnDelete.title = Alloy.Globals.selectedLanguage.deleteTitle;
	$.lblAddSource.text = Alloy.Globals.selectedLanguage.addSourceTitle;
	$.lblStartDate.text = Alloy.Globals.selectedLanguage.startDateTitle;
	$.lblEndDate.text = Alloy.Globals.selectedLanguage.endDateTitle;
	$.lblName.text = Alloy.Globals.selectedLanguage.nameTitle;
	$.lblTotal.text = Alloy.Globals.selectedLanguage.totalText;
	$.lblNote.text = Alloy.Globals.selectedLanguage.noteTitle;
	$.lblRevenueResources.text = Alloy.Globals.selectedLanguage.revenueResourceTitle;
	$.txtNote.value = Alloy.Globals.selectedLanguage.noteHintText;
	$.btnHide.title = Alloy.Globals.selectedLanguage.doneTitle;
	loadDefaultRevenueSources(Alloy.Globals.RevenueSources);
	if (OS_IOS) {
		$.btnDone.right = 10;
	} else {
		$.btnDone.right = 5;
	}
	$.lblNavTitle.text = Alloy.Globals.selectedLanguage.createBudgetTitle;
	$.btnDone.title = Alloy.Globals.selectedLanguage.saveTitle;
	if (args.mode == 'edit') {
		$.lblNavTitle.text = Alloy.Globals.selectedLanguage.editBudgetTitle;
		$.btnDone.title = Alloy.Globals.selectedLanguage.updateTitle;
		//Ti.API.info("Edit Budget With ID : "+ args.budget_id);
		loadEditData(args.budget_id);
	}

	var alignment;

	if (Alloy.Globals.isEnglish) {
		alignment = Titanium.UI.TEXT_ALIGNMENT_LEFT;
		$.viewName.children[0].left = $.viewRevenueSources.children[0].left = $.viewStartDate.children[0].left = $.viewEndDate.children[0].left = $.viewNote.children[0].left = $.viewTotal.children[0].left = 10;
		$.viewName.children[1].left = $.viewRevenueSources.children[1].left = $.viewStartDate.children[1].left = $.viewEndDate.children[1].left = $.viewNote.children[1].left = $.viewTotal.children[1].left = (Alloy.isTablet) ? 70 : 50;
		$.viewName.children[2].left = $.viewRevenueSources.children[2].left = $.viewStartDate.children[2].left = $.viewEndDate.children[2].left = $.viewNote.children[2].left = (Alloy.isTablet) ? 240 : 140;
		$.viewNote.children[2].right = 5;
		//$.viewRevenueSources.children[1].width = '45%';
		$.viewRevenueSources.children[2].left = (Alloy.isTablet) ? 340 : 190;
		//'65%';

		//right icons alignment
		$.viewRevenueSources.children[2].children[0].left = $.viewStartDate.children[2].children[0].left = $.viewEndDate.children[2].children[0].left = 0;
		$.viewStartDate.children[2].children[1].right = $.viewEndDate.children[2].children[1].right = 10;
		$.viewRevenueSources.children[2].children[1].right = 0;

		//Revenue sources add
		$.txtNewSourceTitle.left = (Alloy.isTablet) ? 80 : 50;
		$.txtNewSourceValue.right = 10;

		$.viewAddSource.children[0].left = 0;
		$.viewAddSource.children[1].left = 30;

		$.viewTotal.children[2].right = 10;
		$.lblTotalAmount.left = 10;
		//buttons
		if (args.mode == 'edit') {

			$.btnDelete.visible = true;
		}

		$.viewName.children[0].right = undefined;
		$.viewName.children[1].right = undefined;
		$.viewName.children[2].right = undefined;

	} else {
		alignment = Titanium.UI.TEXT_ALIGNMENT_RIGHT;
		$.viewName.children[0].right = $.viewRevenueSources.children[0].right = $.viewStartDate.children[0].right = $.viewEndDate.children[0].right = $.viewNote.children[0].right = $.viewTotal.children[0].right = 10;
		$.viewName.children[1].right = $.viewRevenueSources.children[1].right = $.viewStartDate.children[1].right = $.viewEndDate.children[1].right = $.viewNote.children[1].right = $.viewTotal.children[1].right = (Alloy.isTablet) ? 70 : 50;
		$.viewName.children[2].right = $.viewRevenueSources.children[2].right = $.viewStartDate.children[2].right = $.viewEndDate.children[2].right = $.viewNote.children[2].right = (Alloy.isTablet) ? 240 : 140;
		$.viewNote.children[2].left = 5;
		//$.viewRevenueSources.children[1].width = '45%';
		$.viewRevenueSources.children[2].right = (Alloy.isTablet) ? 340 : 190;
		//'65%';

		//right icons alignment
		$.viewRevenueSources.children[2].children[0].right = $.viewStartDate.children[2].children[0].right = $.viewEndDate.children[2].children[0].right = 0;
		$.viewStartDate.children[2].children[1].left = $.viewEndDate.children[2].children[1].left = 10;
		$.viewRevenueSources.children[2].children[1].left = 0;

		//Revenue sources add
		$.txtNewSourceTitle.right = (Alloy.isTablet) ? 80 : 50;
		$.txtNewSourceValue.left = 10;

		$.viewAddSource.children[0].right = 0;
		$.viewAddSource.children[1].right = 30;

		$.viewTotal.children[2].left = 10;
		$.lblTotalAmount.right = 10;
		//buttons
		if (args.mode == 'edit') {

			$.btnDelete.visible = true;
		}

		$.viewName.children[0].left = undefined;
		$.viewName.children[1].left = undefined;
		$.viewName.children[2].left = undefined;
	}

	$.viewName.children[1].textAlign = $.viewRevenueSources.children[1].textAlign = $.viewStartDate.children[1].textAlign = $.viewEndDate.children[1].textAlign = $.viewNote.children[1].textAlign = alignment;
	$.viewTotal.children[1].textAlign = $.viewName.children[2].textAlign = $.viewNote.children[2].textAlign = alignment;
	$.txtNewSourceTitle.textAlign = alignment;
	$.txtNewSourceValue.textAlign = alignment;
	$.lblTotalAmount.textAlign = alignment;
}

$.win.addEventListener('click', function(e) {
	Ti.API.info('>>>>>>>>>>');
	$.txtNote.blur();
	// if (!OS_IOS)
	// Ti.UI.Android.hideSoftKeyboard();
	// else {
	if ($.txtName != null)
		$.txtName.blur();
	if ($.txtNewSourceTitle != null)
		$.txtNewSourceTitle.blur();
	if ($.txtNewSourceValue != null)
		$.txtNewSourceValue.blur();
	for (var i = 0; i < $.viewRevenueResourcesGrid.children.length; i++) {
		var obj = $.viewRevenueResourcesGrid.children[i];
		obj.children[1].blur();

	}
	// }

});

var hideKeyBoard = function() {
	Ti.API.info("Create Budget - Keyboard hiding");

	if (!OS_IOS)
		Ti.UI.Android.hideSoftKeyboard();
	else {
		if ($.txtName != null)
			$.txtName.blur();

	}
};
$.txtNewSourceValue.addEventListener('change', function(e) {
	var regex = /^[0-9]+$/;
	if (!regex.test($.txtNewSourceValue.value)) {
		if ($.txtNewSourceValue.value.length > 0) {
			$.txtNewSourceValue.value = $.txtNewSourceValue.preValue;
		} else {
			$.txtNewSourceValue.preValue = "";
		}
	} else {
		$.txtNewSourceValue.preValue = $.txtNewSourceValue.value;
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
	$.imgBackBtn = $.imgHomeBtn = $.imgName = $.imgAmount = $.imgPlusGreen = $.imgTotal = $.imgDate = $.imgSelectYourStartDate = null;
	$.imgSelectYourEndDate = $.imgNote = $.viewRevenueResourcesGrid = null;
	$.destroy();
};