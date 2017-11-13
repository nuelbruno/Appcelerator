var getmyfavourite = function(App) {

	var myfavourite = Ti.App.customViews.createCustomTabViews({
		width : '100%',
		height : '100%',
		top : 0,
		layout : 'horizontal'
	}, 'My Favourites');
	
	
    
	
	//getGalleryParameters(App);
	
	//Ti.include(Ti.App.resourceurl+'Utils/favourite_loc.js');
	
	//var returnfav = myfavouritelocation(App);	

		var myfavouritelocation = require('Utils/favourite_loc');
		var myfavouritelocation = new myfavouritelocation();
	    myfavourite.add(myfavouritelocation);			    
   
	
	myfavourite.reload = function(){
		
	};
	return myfavourite;
};
