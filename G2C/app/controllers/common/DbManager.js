/*
* This File Contains the Database related function and queries used in whole application
*
*/

//Insert / Update / Delete
// This function just execute the sql query.functin takes sql statement as argument.
this.executeSQL = function(sql) {
	Alloy.Globals.db.execute(sql);
};

//Fetch Rows (Select)
// This function Fetch the Rows execute by Select query
this.fetchData = function(sql) {
	return Alloy.Globals.db.execute(sql);
};

this.executeDMLStatement = function(sql) {
	var isSuccess = true;
	try {
		this.executeSQL(sql);
	} catch(e) {
		Ti.API.info(JSON.stringify(e));
		isSuccess = false;
	}
	return isSuccess;
};

this.saveHomeImages = function(obj) {
	var isSuccess = true;
	try {
		var strQuery = "INSERT INTO 'tbl_home_images' (image_url,image_data,total_images) VALUES('" + obj.url + "','" + obj.imageData + "'," + obj.total_image + ")";
		this.executeSQL(strQuery);
	} catch(e) {
		Ti.API.info(JSON.stringify(e));
		isSuccess = false;
	}

	if (isSuccess) {
		Ti.API.info('Home Image SUCCESS DB');
	} else {
		Ti.API.info('Home Image FAIL DB');
	}
	return true;
};

this.isHomeImageExists = function(image_url) {
	var isSuccess = true;

	try {
		var strQuery = "SELECT image_url from tbl_home_images WHERE image_url='" + image_url + "'";
		var sql = Alloy.Globals.db.execute(strQuery);

		return ((sql.isValidRow()) ? true : false);
	} catch(e) {
		return false;
	}
};

this.getHomeImages = function() {
	try {
		var sql = Alloy.Globals.db.execute("select * from tbl_home_images order by rowid desc");

		var arrHomeImages = [];

		while (sql.isValidRow()) {

			arrHomeImages.push({
				image_url : sql.fieldByName("image_url"),
				url : Titanium.Utils.base64decode(sql.fieldByName("image_data")),
				total_images : sql.fieldByName("total_images"),
			});

			sql.next();
		}
		return arrHomeImages;
	} catch(e) {

	}
};

this.deleteHomeImages = function(image_url) {
	var isSuccess = true;

	try {
		var strQuery = "delete from tbl_home_images";
		var sql = Alloy.Globals.db.execute(strQuery);
	} catch(e) {
		return false;
	}
};


//Expense categories
this.insertBudget_ExepenseCategories = function(arrExepenseCategories) {
	var isSuccess = true;

	try 
	{
		if(arrExepenseCategories.length >0)
		{
			var strQuery = "delete from  'tbl_expensecategories' ";
		   	this.executeSQL(strQuery);
		   	
		   	Ti.API.info('Budget Expensecategory base table  dropped');
			
			for(var i=0; i < arrExepenseCategories.length; i++)
			{
				var expenseCat = arrExepenseCategories[i];
				var strQuery = "INSERT INTO 'tbl_expensecategories' (category_id,category_code,name_en,name_ar,description_en,description_ar,icon_url,background_url) VALUES(" + expenseCat.category_id + ","+ expenseCat.category_code +",'"+ expenseCat.name_en + "','" + expenseCat.name_ar +"','" + expenseCat.description_en +"','"+ expenseCat.description_ar + "','" + expenseCat.icon_url +"','"+ expenseCat.background_url + "')";
				 
				 //Ti.API.info(strQuery );
				 
		   	    this.executeSQL(strQuery);
		   	    
		   	    var id = Alloy.Globals.db.lastInsertRowId;
		        Ti.API.info("==> Budget Expensecategory base table inserted  : " + id );
			}
			
		}
		

	} catch(e) {
		Ti.API.info(JSON.stringify(e));
		isSuccess = false;
	}

	if (isSuccess) {
		Ti.API.info('Budget Expensecategory base table  STORE SUCCESS DB');
	} else {
		Ti.API.info('Budget Expensecategory base table STORE FAIL DB');
	}
	return isSuccess;
};

this.getAllBudget_ExepenseCategories = function(arrExepenseCategories) {
	var strQuery = "select * from  'tbl_expensecategories' ";
   	this.executeSQL(strQuery);
   	
   	var sql = Alloy.Globals.db.execute(strQuery);
	var arrExpenseCategories = [];
	while (sql.isValidRow()) {
		var obj = {
			category_id :sql.fieldByName("category_id"),
			category_code:sql.fieldByName("category_code"),
			name_en : sql.fieldByName("name_en"),
			name_ar : sql.fieldByName("name_ar"),
			description_en : sql.fieldByName("description_en"),
			description_ar: sql.fieldByName("description_ar"),
			icon_url : sql.fieldByName("icon_url"),
			background_url : sql.fieldByName("background_url")
		};
		arrExpenseCategories.push(obj);

		sql.next();
	}
	return arrExpenseCategories;
	
};

this.getBudget_ExepenseCategory_ById = function(category_id) {
	//Ti.API.info("Get Expense category by id : "+ category_id);
	var strQuery = "select * from  'tbl_expensecategories'  where category_id =" + category_id;
   	this.executeSQL(strQuery);
   	
   	var sql = Alloy.Globals.db.execute(strQuery);
	var arrExpenseCategories = [];
	while (sql.isValidRow()) {
		var obj = {
			category_id :sql.fieldByName("category_id"),
			category_code:sql.fieldByName("category_code"),
			name_en : sql.fieldByName("name_en"),
			name_ar : sql.fieldByName("name_ar"),
			description_en : sql.fieldByName("description_en"),
			description_ar: sql.fieldByName("description_ar"),
			icon_url : sql.fieldByName("icon_url"),
			background_url : sql.fieldByName("background_url")
		};
		arrExpenseCategories.push(obj);

		sql.next();
	}
	
	Ti.API.info("Get Expense category by id : "+ category_id + "\n Category - "+ JSON.stringify(arrExpenseCategories));
	if(arrExpenseCategories.length >0 ) return  arrExpenseCategories[0];
	else 
	  return null;
	
};

//My Budget
this.insertBudget = function(obj) {
	var isSuccess = true;

	try {
		
		var strQuery = "INSERT INTO 'tbl_mybudget' (title,start_date,end_date,notes,lang_code) VALUES('" + obj.Title + "','" + obj.StartDate+"','" + obj.EndDate +"','"+ obj.Notes+"','"+  obj.LangCode +"')";

   	    this.executeSQL(strQuery);
   	    var id = Alloy.Globals.db.lastInsertRowId;
        Ti.API.info("==> inserted Budget ID : " + id);
  
		this.insertBudget_RevenueSources(id, obj.RevenueSources);

	} catch(e) {
		Ti.API.info(JSON.stringify(e));
		isSuccess = false;
	}

	if (isSuccess) {
		Ti.API.info('Budget STORE SUCCESS DB');
	} else {
		Ti.API.info('Budget STORE FAIL DB');
	}
	return isSuccess;
};
this.updateBudget = function(obj) {
	Ti.API.info("TESTING -------------->"+JSON.stringify(obj));
	var isSuccess = true;

	try {
		
		var strQuery = "UPDATE 'tbl_mybudget'  SET title ='" + obj.Title + "',start_date='" + obj.StartDate+"',end_date='" + obj.EndDate +"',notes='"+ obj.Notes+"',lang_code='"+  obj.LangCode +"' where budget_id = " + obj.budget_id;
		this.executeSQL(strQuery);
	    Ti.API.info("==> Updated Budget With  Budget with ID : " + obj.budget_id );
   	    
   	     var sqlRevenueSources = "delete from 'tbl_mybudget_revenuesources'  where budget_id = " + obj.budget_id;
	   	 this.executeSQL(sqlRevenueSources);
   	    Ti.API.info("==> deleted Budget revenue resources With  Budget with ID : " +  obj.budget_id );
   	    
		this.insertBudget_RevenueSources(obj.budget_id, obj.RevenueSources);

	} catch(e) {
		Ti.API.info(JSON.stringify(e));
		isSuccess = false;
	}

	if (isSuccess) {
		Ti.API.info('Budget STORE SUCCESS DB');
	} else {
		Ti.API.info('Budget STORE FAIL DB');
	}
	return isSuccess;
};
this.deleteBudget = function(budgetId) {
	var isSuccess = true;

	try 
	{
		    var sqlExpenses = "delete from 'tbl_mybudget_expenses'  where budget_id = " + budgetId;
	   	    this.executeSQL(sqlExpenses);
	   	     Ti.API.info("==> deleted Budget Expenses With  Budget with ID : " + budgetId );
	   	    
	   	    var sqlExpenseCategoryBudget = "delete from 'tbl_mybudget_expensecategorybudget'  where budget_id = " + budgetId;
	   	    this.executeSQL(sqlExpenseCategoryBudget);
	   	      Ti.API.info("==> deleted Budget Expenses category budgets With  Budget with ID : " + budgetId );
	   	      
	   	    var sqlRevenueSources = "delete from 'tbl_mybudget_revenuesources'  where budget_id = " + budgetId;
	   	    this.executeSQL(sqlRevenueSources);
	   	    
	   	    Ti.API.info("==> deleted Budget revenue resources With  Budget with ID : " + budgetId );
	   	    
	   	    var sqlBudget = "delete from 'tbl_mybudget'  where budget_id = " + budgetId;
	   	    this.executeSQL(sqlBudget);
	   	   
	        Ti.API.info("==> deleted EBudget With  Budget with ID : " + budgetId );
		

	} catch(e) {
		Ti.API.info(JSON.stringify(e));
		isSuccess = false;
	}

	if (isSuccess) {
		Ti.API.info('Budget  DELETE SUCCESS DB');
	} else {
		Ti.API.info('Budget DELETE FAIL DB');
	}
	return isSuccess;
};


this.insertBudget_RevenueSources = function(budgetId,objRevenueSources) {
	var isSuccess = true;

	try 
	{
		for(var i=0; i < objRevenueSources.length; i++)
		{
			var strQuery = "INSERT INTO 'tbl_mybudget_revenuesources' (budget_id,title,amount) VALUES(" + budgetId + ",'"+ objRevenueSources[i].Title + "'," + objRevenueSources[i].Amount+")";
	
	   	    this.executeSQL(strQuery);
	   	    
	   	    var id = Alloy.Globals.db.lastInsertRowId;
	        Ti.API.info("==> inserted Revenue Resource ID : " + id );
		}

	} catch(e) {
		Ti.API.info(JSON.stringify(e));
		isSuccess = false;
	}

	if (isSuccess) {
		Ti.API.info('Revenue Source  STORE SUCCESS DB');
	} else {
		Ti.API.info('Revenue Source  STORE FAIL DB');
	}
	return isSuccess;
};


this.insertBudget_ExpenseCategoriesBudget = function(budgetId,objExpenseCategoriesBudget) {
	var isSuccess = true;

	try 
	{
		for(var i=0; i < objExpenseCategoriesBudget.length; i++)
		{
			var strQuery = "INSERT INTO 'tbl_mybudget_expensecategorybudget' (budget_id,expensecatid,amount) VALUES(" + budgetId + ",'"+ objExpenseCategoriesBudget[i].id + "'," + objExpenseCategoriesBudget[i].budget_Amount +")";
	
	   	    this.executeSQL(strQuery);
	   	    
	   	    var id = Alloy.Globals.db.lastInsertRowId;
	        Ti.API.info("==> inserted Expense Category Budget with ID : " + id );
		}

	} catch(e) {
		Ti.API.info(JSON.stringify(e));
		isSuccess = false;
	}

	if (isSuccess) {
		Ti.API.info('Expense Category Budget  STORE SUCCESS DB');
	} else {
		Ti.API.info('Expense Category Budget  STORE FAIL DB');
	}
	return isSuccess;
};

this.deleteBudget_ExpenseCategoriesBudget = function(budgetId) {
	var isSuccess = true;

	try 
	{
		
			var strQuery = "delete from 'tbl_mybudget_expensecategorybudget'  where budget_id = " + budgetId;
	
	   	    this.executeSQL(strQuery);
	   	   
	        Ti.API.info("==> deleted Expense Budget Category Budget With  Budget with ID : " + budgetId );
		

	} catch(e) {
		Ti.API.info(JSON.stringify(e));
		isSuccess = false;
	}

	if (isSuccess) {
		Ti.API.info('Expense Budget Category Budget  DELETE SUCCESS DB');
	} else {
		Ti.API.info('Expense Budget Category Budget  DELETE FAIL DB');
	}
	return isSuccess;
};


this.insertBudget_Expenses = function(budgetId,objExpenses) {
	var isSuccess = true;

	try 
	{
		for(var i=0; i < objExpenses.length; i++)
		{
			var strQuery = "INSERT INTO 'tbl_mybudget_expenses' (budget_id,expensecatid,amount,transaction_date) VALUES(" + budgetId + ",'"+ objExpenses[i].expenseCatid + "'," + objExpenses[i].amount +",'"+ objExpenses[i].transaction_date +"')";
	
	   	    this.executeSQL(strQuery);
	   	    
	   	    var id = Alloy.Globals.db.lastInsertRowId;
	        Ti.API.info("==> inserted Expense  with ID : " + id );
		}

	} catch(e) {
		Ti.API.info(JSON.stringify(e));
		isSuccess = false;
	}

	if (isSuccess) {
		Ti.API.info('Expense  STORE SUCCESS DB');
	} else {
		Ti.API.info('Expense  STORE FAIL DB');
	}
	return isSuccess;
};

this.deleteBudget_Expenses = function(budgetId) {
	var isSuccess = true;

	try 
	{
		
			var strQuery = "DELETE FROM 'tbl_mybudget_expenses' where budget_id ="+  budgetId;
	   	    this.executeSQL(strQuery);
	   	   
	        Ti.API.info("==> deleted Expenses with   Budget ID : " + budgetId );
		

	} catch(e) {
		Ti.API.info(JSON.stringify(e));
		isSuccess = false;
	}

	if (isSuccess) {
		Ti.API.info('Expense Delete for Budget SUCCESS DB');
	} else {
		Ti.API.info('Expense Delete for Budget FAIL DB');
	}
	return isSuccess;
};

this.getAllBudgets = function(langCode) {
	//try {
		var strQuery = " SELECT *,(SELECT sum(amount)  FROM tbl_mybudget_revenuesources where budget_id = t.budget_id) as Budget_Amount,"+
		 "(select sum(exp.amount) from  tbl_mybudget_expenses exp where exp.budget_id = t.budget_id) as Budget_AmountSpent"+ 
		 " from  tbl_mybudget t order by t.budget_id desc";

		var sql = Alloy.Globals.db.execute(strQuery);
		var arrBudgets = [];
		while (sql.isValidRow()) {
			var obj = {
				ID :sql.fieldByName("budget_id"),
				Title:sql.fieldByName("title"),
				StartDate : sql.fieldByName("start_date"),
				EndDate : sql.fieldByName("end_date"),
				Notes : sql.fieldByName("notes"),
				LangCode: sql.fieldByName("lang_code"),
				budget_Amount : sql.fieldByName("Budget_Amount"),
				budget_AmountSpent : sql.fieldByName("Budget_AmountSpent"),
				ExpenseCategoriesBudget :[],
				Expenses : []
			};

			var str = "SELECT * from tbl_mybudget_revenuesources WHERE budget_id = " + obj.ID;
			var sqlRevenueSources = Alloy.Globals.db.execute(str);
			var arrRevenueSources = [];
			while (sqlRevenueSources.isValidRow()) {
				arrRevenueSources.push({
					id: sqlRevenueSources.fieldByName("id"),
					budget_id: sqlRevenueSources.fieldByName("budget_id"),
					Title : sqlRevenueSources.fieldByName("title"),
					Amount : sqlRevenueSources.fieldByName("amount")
				});
				sqlRevenueSources.next();
			}
       		obj.RevenueSources = arrRevenueSources;
       		
       		Ti.API.info("Budget List -- Revenue sources populated ---");
       		
       		var str = "SELECT *,(select sum(exp.amount) from  tbl_mybudget_expenses exp where exp.expensecatid = t.expensecatid and exp.budget_id = "+ obj.ID +")  as Budget_AmountSpent from tbl_mybudget_expensecategorybudget t WHERE t.budget_id = " + obj.ID;
			var sqlExpenseCategoriesBudget = Alloy.Globals.db.execute(str);
			var arrExpenseCategoriesBudget = [];
			while (sqlExpenseCategoriesBudget.isValidRow()) {
				arrExpenseCategoriesBudget.push({
					id: sqlExpenseCategoriesBudget.fieldByName("expensecatid"),
					budget_id:sqlExpenseCategoriesBudget.fieldByName("budget_id"),
					index:sqlExpenseCategoriesBudget.fieldByName("expensecatid"),
					expenseCategoryId :sqlExpenseCategoriesBudget.fieldByName("expensecatid"),
					budget_Amount : sqlExpenseCategoriesBudget.fieldByName("amount"),
					budget_AmountSpent : sqlExpenseCategoriesBudget.fieldByName("Budget_AmountSpent"),
				});
				sqlExpenseCategoriesBudget.next();
			}
       		obj.ExpenseCategoriesBudget = arrExpenseCategoriesBudget;
       		Ti.API.info("Budget List -- Budget Expense categories populated ---");
       		
       		var str = "SELECT *,(select amount from  tbl_mybudget_expensecategorybudget bc where bc.expensecatid = t.expensecatid and bc.budget_id = "+ obj.ID +")  as Budget_Amount,"+ 
			"(select sum(exp.amount) from  tbl_mybudget_expenses exp where exp.expensecatid = t.expensecatid and exp.budget_id = "+ obj.ID +")  as Budget_AmountSpent"+ 
			" FROM tbl_mybudget_expenses t where t.budget_id = " + obj.ID;
			
			var sqlExpenses = Alloy.Globals.db.execute(str);
			var arrExpenses = [];
			while (sqlExpenses.isValidRow()) {
				arrExpenses.push({
					id: sqlExpenses.fieldByName("id"),
					budget_id: sqlExpenses.fieldByName("budget_id"),
					expenseCategoryId : sqlExpenses.fieldByName("expensecatid"),
					amount : sqlExpenses.fieldByName("amount"),
					transaction_date:sqlExpenses.fieldByName("transaction_date"),
					budget_Amount : sqlExpenses.fieldByName("Budget_Amount"),
					budget_AmountSpent : sqlExpenses.fieldByName("Budget_AmountSpent"),
				});
				sqlExpenses.next();
			}
       		obj.Expenses = arrExpenses;
       		Ti.API.info("Budget List -- Expenses  populated ---");
       		
			arrBudgets.push(obj);

			sql.next();
		}
		return arrBudgets;

	// } catch(e) {
		// Ti.API.info('EXCEPTION Budget == ' + JSON.stringify(e));
		// return [];
	// }
};
this.getBudgetDetailsById = function(budgetId) {
	Ti.API.info("==> Getting Budget details By Id : " + budgetId);
	try {
		var strQuery = " SELECT *,(SELECT sum(amount)  FROM tbl_mybudget_revenuesources where budget_id = t.budget_id) as Budget_Amount,"+
		 "(select sum(exp.amount) from  tbl_mybudget_expenses exp where exp.budget_id = t.budget_id) as Budget_AmountSpent"+ 
		 " from  tbl_mybudget t where  t.budget_id=" + budgetId ;
		 
		var sql = Alloy.Globals.db.execute(strQuery);
		var arrBudgets = [];
		while (sql.isValidRow()) {
			var obj = {
				ID :sql.fieldByName("budget_id"),
				Title:sql.fieldByName("title"),
				StartDate : sql.fieldByName("start_date"),
				EndDate : sql.fieldByName("end_date"),
				Notes : sql.fieldByName("notes"),
				LangCode: sql.fieldByName("lang_code"),
				budget_Amount : sql.fieldByName("Budget_Amount"),
				budget_AmountSpent : sql.fieldByName("Budget_AmountSpent"),
				ExpenseCategoriesBudget :[],
				Expenses : []
			};

			var str = "SELECT * from tbl_mybudget_revenuesources WHERE budget_id = " + obj.ID;
			var sqlRevenueSources = Alloy.Globals.db.execute(str);
			var arrRevenueSources = [];
			while (sqlRevenueSources.isValidRow()) {
				arrRevenueSources.push({
					id:sqlRevenueSources.fieldByName("id"),
					budget_id: sqlRevenueSources.fieldByName("budget_id"),
					Title : sqlRevenueSources.fieldByName("title"),
					Amount : sqlRevenueSources.fieldByName("amount")
				});
				sqlRevenueSources.next();
			}
       		obj.RevenueSources = arrRevenueSources;
       		
       		Ti.API.info("Budget Details -- Revenue sources populated ---");
       		
       		var str = "SELECT *,(select sum(exp.amount) from  tbl_mybudget_expenses exp where exp.expensecatid = t.expensecatid and exp.budget_id = "+ obj.ID +") as Budget_AmountSpent from tbl_mybudget_expensecategorybudget t WHERE t.budget_id = " + obj.ID;
			var sqlExpenseCategoriesBudget = Alloy.Globals.db.execute(str);
			var arrExpenseCategoriesBudget = [];
			while (sqlExpenseCategoriesBudget.isValidRow()) {
				
				
				arrExpenseCategoriesBudget.push({
					id: sqlExpenseCategoriesBudget.fieldByName("expensecatid"),
					budget_id:sqlExpenseCategoriesBudget.fieldByName("budget_id"),
					index:sqlExpenseCategoriesBudget.fieldByName("expensecatid"),
					expenseCategoryId :sqlExpenseCategoriesBudget.fieldByName("expensecatid"),
					expenseCategory : this.getBudget_ExepenseCategory_ById(sqlExpenseCategoriesBudget.fieldByName("expensecatid")),
					budget_Amount : sqlExpenseCategoriesBudget.fieldByName("amount"),
					budget_AmountSpent : sqlExpenseCategoriesBudget.fieldByName("Budget_AmountSpent"),
				});
				sqlExpenseCategoriesBudget.next();
			}
       		obj.ExpenseCategoriesBudget = arrExpenseCategoriesBudget;
       		Ti.API.info("Budget Details -- Budget Expense categories populated ---");
       		
       		var str = "SELECT *,(select amount from  tbl_mybudget_expensecategorybudget bc where bc.expensecatid = t.expensecatid and bc.budget_id = "+ obj.ID +")  as Budget_Amount,"+ 
			"(select sum(exp.amount) from  tbl_mybudget_expenses exp where exp.expensecatid = t.expensecatid and exp.budget_id = "+ obj.ID +")  as Budget_AmountSpent"+ 
			" FROM tbl_mybudget_expenses t where t.budget_id = " + obj.ID;
			
			var sqlExpenses = Alloy.Globals.db.execute(str);
			var arrExpenses = [];
			while (sqlExpenses.isValidRow()) {
				arrExpenses.push({
					id: sqlExpenses.fieldByName("id"),
					budget_id: sqlExpenses.fieldByName("budget_id"),
					expenseCategoryId : sqlExpenses.fieldByName("expensecatid"),
					expenseCategory : this.getBudget_ExepenseCategory_ById(sqlExpenses.fieldByName("expensecatid")),
					amount : sqlExpenses.fieldByName("amount"),
					transaction_date:sqlExpenses.fieldByName("transaction_date"),
					budget_Amount : sqlExpenses.fieldByName("Budget_Amount"),
					budget_AmountSpent : sqlExpenses.fieldByName("Budget_AmountSpent"),
				});
				sqlExpenses.next();
			}
       		obj.Expenses = arrExpenses;
       		Ti.API.info("Budget Details -- Expenses  populated ---");

			arrBudgets.push(obj);

			sql.next();
		}
		return arrBudgets;

	} catch(e) {
		Ti.API.info('EXCEPTION Budget == ' + JSON.stringify(e));
		return [];
	}
};


this.addToFavourite = function(obj) {
	var isSuccess = true;

	try {
		var openTime = closeTime = "";
		var fromDay = toDay = -1;

		if (obj.Shifts != null) {
			if (obj.Shifts.length > 0) {
				openTime = obj.Shifts[0].OpenTime;
				closeTime = obj.Shifts[0].OpenTime;
				fromDay = obj.Shifts[0].FromDay;
				toDay = obj.Shifts[0].ToDay;
			}
		}
		var strQuery = "INSERT INTO 'tbl_favourite' (service_id,title,information,phone,unique_name,keyword,latitude,longitude,image_url,distance,open_time,close_time,from_day,to_day,category_unique_name,category_main_image,category_description,language_id,station_code) VALUES(" + obj.ID + ",'" + obj.Title + "','" + obj.Information + "','" + obj.Phone + "','" + obj.UniqueName + "','" + obj.Keywords + "'," + obj.GeoCoordinateX + "," + obj.GeoCoordinateY + ",'" + obj.MainImageFullURL + "'," + obj.Distance + ",'" + openTime + "','" + closeTime + "'," + fromDay + "," + toDay + ",'" + obj.CategoriesUniqueNameList + "','" + obj.CategoryMainImageFullURL + "','" + obj.CategoryDescription + "'," + Alloy.Globals.languageId + ",'" + obj.StationCode + "')";

		this.executeSQL(strQuery);

		this.addFacility(obj.ID, obj.Facilities, "tbl_facility");

	} catch(e) {
		Ti.API.info(JSON.stringify(e));
		isSuccess = false;
	}

	if (isSuccess) {
		Ti.API.info('Service STORE SUCCESS DB');
	} else {
		Ti.API.info('Service STORE FAIL DB');
	}
	return isSuccess;
};

this.isFavourite = function(s_id) {
	var isSuccess = true;

	try {
		var strQuery = "SELECT service_id from tbl_favourite WHERE service_id=" + s_id + " and language_id=" + Alloy.Globals.languageId;
		var sql = Alloy.Globals.db.execute(strQuery);

		return ((sql.isValidRow()) ? true : false);
	} catch(e) {
		return false;
	}

};

this.getFavourite = function() {
	var isSuccess = true;

	try {
		var strQuery = "SELECT * from tbl_favourite where language_id=" + Alloy.Globals.languageId;

		var sql = Alloy.Globals.db.execute(strQuery);
		var arrFavourite = [];
		while (sql.isValidRow()) {
			var obj = {
				ID : sql.fieldByName("service_id"),
				Title : sql.fieldByName("title"),
				Information : sql.fieldByName("information"),
				Phone : sql.fieldByName("phone"),
				UniqueName : sql.fieldByName("unique_name"),
				Keywords : sql.fieldByName("keyword"),
				GeoCoordinateX : sql.fieldByName("latitude"),
				GeoCoordinateY : sql.fieldByName("longitude"),
				MainImageFullURL : sql.fieldByName("image_url"),
				Distance : sql.fieldByName("distance"),
				CategoriesUniqueNameList : sql.fieldByName("category_unique_name"),
				CategoryMainImageFullURL : sql.fieldByName("category_main_image"),
				CategoryDescription : sql.fieldByName("category_description"),
				StationCode : sql.fieldByName("station_code"),
			};

			var str = "SELECT * from tbl_facility WHERE service_id = " + obj.ID;
			var sqlFacility = Alloy.Globals.db.execute(str);
			var arrFacilities = [];
			while (sqlFacility.isValidRow()) {
				arrFacilities.push({
					UniqueName : sqlFacility.fieldByName("unique_name"),
					Title : sqlFacility.fieldByName("title")
				});
				sqlFacility.next();
			}
			obj.Facilities = arrFacilities;

			var arrShifts = [];
			if (sql.fieldByName("open_time") != "") {
				arrShifts.push({
					OpenTime : sql.fieldByName("open_time"),
					CloseTime : sql.fieldByName("close_time"),
					FromDay : sql.fieldByName("from_day"),
					ToDay : sql.fieldByName("to_day"),
				});
			}
			obj.Shifts = arrShifts;

			arrFavourite.push(obj);

			sql.next();
		}
		return arrFavourite;

	} catch(e) {
		Ti.API.info('EXCEPTION FAVOURITE == ' + JSON.stringify(e));
		return [];
	}

};
