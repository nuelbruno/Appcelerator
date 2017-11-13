//function directionmapjs(App,latitiude_data, longitude_data, fun_call){
var screenWidth = Ti.Platform.displayCaps.platformWidth;
var screenHeight = Ti.Platform.displayCaps.platformHeight;

function GetHeight(value) {
	var temp = (value * 100) / 480;
	return parseInt((screenHeight * temp) / 100);
}

function GetWidth(value) {
	var temp = (value * 100) / 320;
	return parseInt((screenWidth * temp) / 100);
}

var dir_win = Titanium.UI.currentWindow;

dir_win.top = GetHeight(96);

listDrawerBtn = '';

Ti.App.directionwin = dir_win;

//alert('test');

var latitiude_data = Ti.App.dest_latitude;
var longitude_data = Ti.App.dest_longitude;

//alert(latitiude_data);
//  MAIN VIEW FOR THE PAGE
var view_mapdirection = Titanium.UI.createView({
	width : "100%",
	height : "auto"
	//backgroundColor : '#F2EEE4'
});

dir_win.add(view_mapdirection);

var view_direction = Titanium.UI.createView({
	width : "100%",
	height : "auto",
	//bottom: GetHeight(81)
	//backgroundColor : '#F2EEE4'
});

view_mapdirection.add(view_direction);

//map_win.add(view_map);
var adirimg_view = Ti.UI.createView({
	width : GetWidth(56),
	height : GetHeight(71)
});

var adirimg = Ti.UI.createImageView({
	image : Ti.App.resourceurl + 'images/directionpin.png',
	width : '100%',
	height : '100%'
});

adirimg_view.add(adirimg);

var text_adir = Ti.UI.createLabel({
	text : 'A',
	color : '#FFFFFF',
	top : 0,
	//textAlign:TEXT_ALIGNMENT_CENTER,
	textAlign : 'center',
	width : '100%',
	height : '50%'
});

adirimg_view.add(text_adir);

var bdirimg_view = Ti.UI.createView({
	width : GetWidth(56),
	height : GetHeight(71)
});

var bdirimg = Ti.UI.createImageView({
	image : Ti.App.resourceurl + 'images/directionpin.png',
	width : '100%',
	height : '100%'
});

bdirimg_view.add(bdirimg);

var text_bdir = Ti.UI.createLabel({
	text : 'B',
	color : '#FFFFFF',
	top : 0,
	//textAlign:TEXT_ALIGNMENT_CENTER,
	textAlign : 'center',
	width : '100%',
	height : '50%'
});

bdirimg_view.add(text_bdir);

//alert(latitiude_data); alert(longitude_data);

// ###############################  DIRECTION FETCH MAP JS FILE ################################## //
if (Titanium.Geolocation.locationServicesEnabled === false) {
	Titanium.UI.createAlertDialog({
		title : 'Alameen',
		message : 'Your device has geo turned off - turn it on.'
	}).show();
	//return;
} else {

	
			
			location_service_process(latitiude_data, longitude_data);	
		

	
}

function location_service_process(latitiude_data, longitude_data) {

	//Ti.App.current_latitude, Ti.App.current_longitude,
	    Ti.Geolocation.preferredProvider = Titanium.Geolocation.PROVIDER_GPS;
		Ti.Geolocation.purpose = "Get current position";
		Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST;
		Titanium.Geolocation.distanceFilter = 10;
		Ti.Geolocation.trackSignificantLocationChange = true;
		
		Titanium.Geolocation.addEventListener('location', function(e) {
				
				  alert('geo fun call');

			});

		Titanium.Geolocation.getCurrentPosition(function(e) {// alert('gps called');
			if (e.error) {
				alert('HFL cannot get your current location');
				return;
			}

			var longitude_cur = e.coords.longitude;
			var latitude_cur = e.coords.latitude;
			var altitude = e.coords.altitude;
			var heading = e.coords.heading;
			var accuracy = e.coords.accuracy;
			var speed = e.coords.speed;
			var timestamp = e.coords.timestamp;
			var altitudeAccuracy = e.coords.altitudeAccuracy;

			Ti.API.info('speed ' + speed);

			Titanium.API.info('geo - current location: ' + new Date(timestamp) + ' long ' + longitude_cur + ' lat ' + latitude_cur + ' accuracy ' + accuracy);

			
			
			
			
			// ########  STATIC MAP LANTI AND LONGTI ###### //
			var annotations = [Ti.Map.createAnnotation({
				latitude : latitiude_data,
				longitude : longitude_data,
				title : 'Direction',
				subtitle : 'static loc',
				animate : true,
				//pincolor: Ti.Map.ANNOTATION_GREEN,
				image : (Ti.Platform.osname == 'android') ? Ti.App.resourceurl + 'images/directionpin.png' : bdirimg_view.toImage()
			}), Ti.Map.createAnnotation({
				latitude : latitude_cur,
				longitude : longitude_cur,
				title : 'cur dir',
				subtitle : 'current loc',
				animate : true,
				image : (Ti.Platform.osname == 'android') ? Ti.App.resourceurl + 'images/directionpin.png' : adirimg_view.toImage()
			})];
			

			var current_loc = {
				latitude: latitude_cur,
			    longitude: longitude_cur,
				latitudeDelta : 0.010,
				longitudeDelta : 0.018
			};
			
			//var compassmap;
			//latitiude_data = '25.114105';
			//longitude_data = '55.392219';
			
			
		var compassmap = require('Utils/compass');

	    var compassmap = new compassmap(latitude_cur, longitude_cur, latitiude_data, longitude_data);
			
			
			map_view_get(current_loc, annotations, compassmap, latitude_cur, longitude_cur, latitiude_data, longitude_data);

		});
	
	
	function map_view_get(current_loc, annotations, compassmap, latitude_cur, longitude_cur, latitiude_data, longitude_data){
	
			var mapview = Titanium.Map.createView({
				mapType : Titanium.Map.STANDARD_TYPE,
				region : current_loc,
				animate : true,
				regionFit : true,
				userLocation : true,
				//annotations : annotations,
				touchEnabled : true,
				borderColor : 'F2EEE4',
				borderWidth : 1,
				width : "98%",
				zIndex : 1,
				top : 1
				//bottom:1
				
				//annotations:[annotation]
			});
		
			mapview.removeAllAnnotations();
		
			
			//var compassmap;
		
			
			// var compassmap = new compassmap(Ti.App.current_latitude, Ti.App.current_longitude, '25.118252', '55.393860');
		
		
			mapview.addAnnotations(annotations);
			
			view_direction.add(mapview);
			
			view_mapdirection.add(compassmap);
			
	 }		

	
}

dir_win.addEventListener('blur', function(event) {  //alert('dir window blur');

	dir_win.close();
	dir_win.remove(view_direction);
	view_direction =null;

})


//dir_win.open();

//return view_direction;

//}

//make constructor function the public component interface
//module.exports = directionmapjs;	