//Ti.include(Titanium.Filesystem.resourcesDirectory+'/Model/GalleryModel.js');

var getmylocationview = function(App){

	var mapviewcurrent = Ti.App.customViews.createCustomTabViews({width:'100%',height:'100%',top:0,layout:'horizontal'},'Identify My Location');
	
	//getGalleryParameters(App);
	
    var mycurrentlocationUtlity = require('Utils/userlocation');
					    
	var mycurrentlocationUtlity = new mycurrentlocationUtlity();
	mapviewcurrent.add(mycurrentlocationUtlity);
	
	//  MAIN VIEW FOR THE PAGE
	
					    
	mapviewcurrent.reload = function(){Ti.API.info('I am in Identify My Location');};
	return mapviewcurrent;
};