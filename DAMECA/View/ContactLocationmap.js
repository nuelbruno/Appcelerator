var getClocationmap = function(App) {

	var con_locationmap = Ti.App.customViews.createCustomTabViews({
		width : '100%',
		height : '100%',
		top : 0,
		layout : 'horizontal'
	}, Ti.App.L('loaction_map'));

	

	/*var directionmapjs = require('Utils/directionmap');

	 var directionmapjs = new directionmapjs(App,Ti.App.dest_latitude,Ti.App.dest_longitude,'');

	 directionview.add(directionmapjs);*/
	
	var view_contactmap = Ti.UI.createView({
		//backgroundColor : 'transparent ',
		width : '100%',
		top : 0,
		left:GetWidth(0),
		touchEnabled:false
		//layout : "vertical"
	});

	con_locationmap.add(view_contactmap);
	
	var contactmap_img = Ti.UI.createImageView({
		width : '100%',
		top : GetHeight(0),
		touchEnabled:false,
		image : Ti.Filesystem.resourcesDirectory + 'images/Backgrounds/contactmap.jpg'
	});

	view_contactmap.add(contactmap_img);
	
	

	con_locationmap.reload = function() {


	};
	return con_locationmap;
}; 