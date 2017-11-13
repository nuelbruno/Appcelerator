var args = arguments[0] || {};

var budget_Amount = 0;
var budget_AmountSpent = 0;
var available_Amount = 0;


if(args.budget_Amount != undefined && args.budget_Amount !=null) 
   budget_Amount = parseInt(args.budget_Amount,10);
   
if(args.budget_AmountSpent != undefined && args.budget_AmountSpent !=null) 
   budget_AmountSpent = parseInt(args.budget_AmountSpent,10);

available_Amount = budget_Amount - budget_AmountSpent;

function closeWindow() {
	Alloy.Globals.closeWindow($.win);
}
function gotoHome(){
	Alloy.Globals.gotoHome();
}
if (OS_IOS) {
	density = "dp";
} else {
	density = "px";
}

if (Alloy.Globals.isIOS7Plus) {
	$.win.extendEdges = [Ti.UI.EXTEND_EDGE_TOP];
	$.statusBar.height = 20;
	
	
	$.tableView.separatorInsets = {
		left : 0
	};
}

//Ti.API.info("is category :" + args.isCategorySelection);
if(args.isCategorySelection)
{
	$.lblNavTitle.text ="Select Category"; //Alloy.Globals.selectedLanguage.expenseCategoryTitle;

	$.viewRightView.visible = false;
	$.viewExpenseHeader.visible =false;
	$.viewExpenseHeader.height = 0;
}

//Defining function for loading data from webservice and add to tableview
function loadList(arr, isFirstLoad) {

	var rowData = [];
	for (var i = 0; i < arr.length; i++) {
		var budget_AmountSpent = (arr[i].budget_AmountSpent !=null) ? arr[i].budget_AmountSpent : 0;
		var availableAmount = parseInt(arr[i].budget_Amount,10) - parseInt(budget_AmountSpent,10);
		var doc = {
			id:arr[i].category_id,
			title : (Alloy.Globals.isEnglish) ? arr[i].name_en : arr[i].name_ar,
			icon : arr[i].icon_url,
			bgIcon : arr[i].background_url,
			budget_Amount :arr[i].budget_Amount,
			budget_AmountSpent:budget_AmountSpent,
			actual : "",
			isExpenseInfo : false,
			isCategorySelection : args.isCategorySelection,
			calculateTotalBudgetAllocationAmount:calculateTotalBudgetAllocationAmount
		};

		if(args.isCategorySelection)
		{
			if(availableAmount >0)
			{
				var imgSeparator = Ti.UI.createImageView({
					width : "100%",
					height : 1,
					bottom : 0,
					backgroundColor : Alloy.Globals.path.grayColor
				});
		
				var row = Alloy.createController("MyBudget/expenseCategoryRow", doc).getView();
				
				row.add(imgSeparator);
				row.doc = doc;
				rowData.push(row);
			}
		}
		else 
		{
			var imgSeparator = Ti.UI.createImageView({
				width : "100%",
				height : 1,
				bottom : 0,
				backgroundColor : Alloy.Globals.path.grayColor
			});
	
			var row = Alloy.createController("MyBudget/expenseCategoryRow", doc).getView();
			
			row.add(imgSeparator);
			row.doc = doc;
			rowData.push(row);
		}
		
		
	}
	$.tableView.data = rowData;
	
	
}
//Navigate to  detail screen
if(args.isCategorySelection)
{
	$.tableView.addEventListener("click", function(e) {
		$.tableView.touchEnabled = false;
		//Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading, false);
	    //Ti.API.info("selected Category : " + JSON.stringify(e.row.doc));
		args.callBackFunction(e.row.doc);
		closeWindow();
		$.tableView.touchEnabled = true;
		
	});
}



var upDateBudgetCategoryValues = function(e){
	var selectedExpenseCategories = [];
	var _totalBudgetAllocation = 0, isExpesnseLess = false;
	for(var i=0; i < $.tableView.data[0].rows.length ; i++) {
		var currentRow = $.tableView.data[0].rows[i];
        var _expenseCatTitle = currentRow.children[0].children[1].children[0].text;
		var _budgetAmount = currentRow.children[0].children[1].children[1].value;
		var _expenseAmount = currentRow.children[0].children[1].children[1].budget_AmountSpent;
		if (!(_budgetAmount == undefined || _budgetAmount == 0)) {

			if (_budgetAmount < _expenseAmount) {
				isExpesnseLess = true;
				break;
			}
			_totalBudgetAllocation = _totalBudgetAllocation + parseInt(_budgetAmount, 10);
			selectedExpenseCategories.push({
				id : currentRow.doc.id, //i,
				index : i,
				title : _expenseCatTitle,
				budget_Amount : _budgetAmount,
			});
		}
	}
	if (isExpesnseLess == true) {
		return;
	}
	if (budget_Amount < _totalBudgetAllocation) {
		Alloy.Globals.ShowAlert($.lblNavTitle.text, Alloy.Globals.selectedLanguage.budgetAmountCannotBeGreaterThanRevenueSourcesAmountMsg + "\n" + Alloy.Globals.selectedLanguage.maximumBudgetAmountTitle + ":" + budget_Amount + "\n" + Alloy.Globals.selectedLanguage.currentlyAllocatedBudget + ":" + _totalBudgetAllocation);

	} else {
		var isDeletedOldRecords = Alloy.Globals.DBManager.deleteBudget_ExpenseCategoriesBudget(args.ID);
    
	    if(isDeletedOldRecords)
	    {
	    	Alloy.Globals.DBManager.insertBudget_ExpenseCategoriesBudget(args.ID,selectedExpenseCategories);
		    
		    args.callbackFunction_reload();
			closeWindow();
	    }
		
	}
};
var setCurrentExpenseBudgetCategoryValues =function(){
	if(args.ExpenseCategoriesBudget != undefined && args.ExpenseCategoriesBudget.length >0)
	{
		for(var i=0;i<args.ExpenseCategoriesBudget.length;i++)
		{			
			var expenseCatId = args.ExpenseCategoriesBudget[i].id;
			var currentBudget = args.ExpenseCategoriesBudget[i].budget_Amount;
			
			var rowIndex =-1;
			for(var j=0;j<$.tableView.data[0].rows.length;j++)
			{
				var currentRow = $.tableView.data[0].rows[j];
				if(currentRow.doc.id == expenseCatId)
				{
					rowIndex = j;
					break;
				}	
			}
			
			if(rowIndex != -1)
			{
				var currentRow = $.tableView.data[0].rows[rowIndex];
				currentRow.children[0].children[1].children[1].value = currentBudget;
				currentRow.children[0].children[1].children[1].budget_AmountSpent = args.ExpenseCategoriesBudget[i].budget_AmountSpent;
			 
			}
			
		}
	}
};
var calculateTotalBudgetAllocationAmount = function(){
	
	var _totalBudgetAllocation = 0;
	for(var i=0; i < $.tableView.data[0].rows.length ; i++) {
		var currentRow = $.tableView.data[0].rows[i];
		if(parseInt(currentRow.children[0].children[1].children[1].value,10) >0)
		  _totalBudgetAllocation = _totalBudgetAllocation + parseInt(currentRow.children[0].children[1].children[1].value,10);
	}
	if( budget_Amount < _totalBudgetAllocation)
	{
		Alloy.Globals.ShowAlert($.lblNavTitle.text, Alloy.Globals.selectedLanguage.budgetAmountCannotBeGreaterThanRevenueSourcesAmountMsg +"\n" + Alloy.Globals.selectedLanguage.maximumBudgetAmountTitle + ":" + budget_Amount +"\n"+ Alloy.Globals.selectedLanguage.currentlyAllocatedBudget + ":"+ _totalBudgetAllocation);
		
	}
	
};
$.win.addEventListener('click',function(e){
	//Ti.API.info("Expense Category Window click :" + JSON.stringify(args));
    if (!OS_IOS)
		Ti.UI.Android.hideSoftKeyboard();
	else {
		for(var i=0; i < $.tableView.data[0].rows.length ; i++) {
			var currentRow = $.tableView.data[0].rows[i];
			currentRow.children[0].children[1].children[1].blur();
		}
	}	
});

function changeLanguage() {
    //Ti.API.info("Expense Category Selection - Current Arguments :" + JSON.stringify(args));
    var arrExpenseCategories =[];
    
    if(args.isCategorySelection)
    {
    	for(var i=0;i<args.ExpenseCategoriesBudget.length;i++)
    	{
    		var expCat = args.ExpenseCategoriesBudget[i].expenseCategory;
    		
    		args.ExpenseCategoriesBudget[i].category_id = expCat.category_id;
    		args.ExpenseCategoriesBudget[i].name_en = expCat.name_en;
    		args.ExpenseCategoriesBudget[i].name_ar = expCat.name_ar;
    		args.ExpenseCategoriesBudget[i].icon_url = expCat.icon_url;
    		args.ExpenseCategoriesBudget[i].background_url = expCat.background_url;
    		
    		
    	}
    	
    	loadList(args.ExpenseCategoriesBudget, true);
    }
      
    else 
    {
    	//loadList(Alloy.Globals.ExpenseCategories, true);
	  var arrExpCategories = Alloy.Globals.DBManager.getAllBudget_ExepenseCategories();
	  
		//Ti.API.info("Get All BudgetExpensecategories  -----  >" + JSON.stringify(arrExpCategories));
		loadList(arrExpCategories, true);
		
		setCurrentExpenseBudgetCategoryValues();
	
		
    }
	  

	
	
	if(args.isCategorySelection)
	{
		$.lblNavTitle.text = Alloy.Globals.selectedLanguage.selectCategory;
	}
	else {
		$.lblActual.visible = true;
		$.lblNavTitle.text = Alloy.Globals.selectedLanguage.expenseCategoryTitle;
		$.lblActual.text = Alloy.Globals.selectedLanguage.budgetLimitTitle + "  :  " +budget_Amount;
	}

	var alignment;

	if (Alloy.Globals.isEnglish) {
		alignment = Titanium.UI.TEXT_ALIGNMENT_LEFT;
		$.viewExpenseHeader.right =0;
		$.lblActual.left = 10;
	    $.lblBudget.right = (Alloy.isTablet) ? 70 : 57;
	} else {
		alignment = Titanium.UI.TEXT_ALIGNMENT_RIGHT;
		$.viewExpenseHeader.left =0;
		$.lblActual.right = 10;
		$.lblBudget.left = (Alloy.isTablet) ? 80 : 70;
	}
	$.lblActual.textAlign = $.lblBudget.textAlign = alignment;
}
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
	$.imgBackBtn = $.imgHomeBtn = $.tableView = null;
	$.destroy();
};