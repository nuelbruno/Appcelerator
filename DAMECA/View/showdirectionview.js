var getshowdirection = function(App) {

	var directionview = Ti.App.customViews.createCustomTabViews({
		width : '100%',
		height : '100%',
		top : 0,
		layout : 'horizontal'
	}, 'Show Direction');

	//getGalleryParameters(App);
	Ti.API.info('Show Direction');

	Ti.App.dest_latitude = '25.118252';
	Ti.App.dest_longitude = '55.393860';

	/*var directionmapjs = require('Utils/directionmap');

	 var directionmapjs = new directionmapjs(App,Ti.App.dest_latitude,Ti.App.dest_longitude,'');

	 directionview.add(directionmapjs);*/
	
	

	directionview.reload = function() {

		var dir_win = Ti.UI.createWindow({
			width : '100%',
			height : 'auto',
			zIndex : 5,
			url : 'Utils/directionmap.js',
			top : GetHeight(96)
		});

		dir_win.open();
		
		Ti.App.directionwin_timer =setInterval(function()
		{
		   //alert('call');
		   
		   Ti.App.directionwin.close();
		   Ti.App.directionwin = null;
		   
		   var dir_win = Ti.UI.createWindow({
				width : '100%',
				height : 'auto',
				zIndex : 5,
				url : 'Utils/directionmap.js',
				top : GetHeight(96)
			});
	
			dir_win.open();
		   
		   
		},6000);

	};
	return directionview;
}; 