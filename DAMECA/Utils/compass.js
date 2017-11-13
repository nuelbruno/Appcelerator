function compassmap(latitude, longitude, latitiude_data, longitude_data) {

	//alert(latitude+'$'+longitude+'$'+latitiude_data+'$'+longitude_data);
	
	//latitude = '25.116436'; longitude = '55.390416'; latitiude_data = '25.114105'; longitude_data = '55.392219';
		
	var compassview = Ti.UI.createView({
		backgroundColor : 'transparent ',
		height :  GetHeight(80),
		//opacity:0.7,
		zIndex : 1,
		width : '100%',
		bottom :0,
		left : 0
	});
	
	var opacity_view = Ti.UI.createView({
		backgroundColor:'#000',
		height :  GetHeight(80),
		opacity:0.4,
		zIndex : 2,
		width : '100%',
		bottom :0,
		left : 0
	});
	
	compassview.add(opacity_view);
	
	var opacity_control_view = Ti.UI.createView({
		backgroundColor : 'transparent ',
		height :  GetHeight(80),
		//opacity:0.9,
		zIndex : 3,
		width : '100%',
		bottom :0,
		left : 0
	});
	
	compassview.add(opacity_control_view);
	
	

	var imgCompass = Ti.UI.createImageView({
		image : Titanium.Filesystem.resourcesDirectory+'images/gps_direction.png',
		height :GetHeight(66),
		width : GetWidth(66),
		right : GetWidth(10),
		bottom:GetHeight(10),
		zIndex : 6,
		//opacity:1
	});
	
	 var compassImage = Ti.UI.createImageView({
        image : Titanium.Filesystem.resourcesDirectory+'images/compass2.png',
		height : GetHeight(72),
		width : GetWidth(72),
		bottom:GetHeight(5),
		left : GetWidth(10),
        zIndex : 6,
		//opacity:1
    });
    
    var distance_value = distance(latitude,longitude,latitiude_data,longitude_data, 'N'); //alert(distance_value);
    
 
	var distance = Titanium.UI.createLabel({
		text : '  ' + distance_value + ' KM',
		color : '#ffffff',
		// height : '90dp',
		borderColor : '#333333',
		borderRadius : 5,
		borderWidth : 1,
		font : {
			fontSize : '12sp',
		},
		width : GetWidth(150),
		bottom : GetHeight(35),
		textAlign : 'center',
		left : GetWidth(95),
		zIndex : 6,
		//opacity:1
	});

    
    function distance(lat2, lon2, lat1, lon1, unit) {
	    var e = (3.1415926538*lat1/180);
	    var f = (3.1415926538*lon1/180);
	    var g = (3.1415926538*lat2/180);
	    var h = (3.1415926538*lon2/180);
	    
	    var i=(Math.cos(e)*Math.cos(g)*Math.cos(f)*Math.cos(h)+Math.cos(e)*Math.sin(f)*Math.cos(g)*Math.sin(h)+Math.sin(e)*Math.sin(g));
		var j=(Math.acos(i));
		var k=(6371*j);
	    var result = Math.floor(k * 100) / 100;
	    
	    return result
   }
   
  
	
	
	if (Ti.Geolocation.locationServicesEnabled) {

		if (Titanium.Geolocation.hasCompass) {
			Titanium.Geolocation.showCalibration = false;

			Ti.Geolocation.getCurrentHeading(function(e) {

				if (e.error) {
					alert('error: ' + e.error);
					return;
				}

				var x = e.heading.x;
				var y = e.heading.y;
				var z = e.heading.z;
				var magneticHeading = e.heading.magneticHeading;
				var accuracy = e.heading.accuracy;
				var trueHeading = e.heading.trueHeading;
				var timestamp = e.heading.timestamp;

				//var bearing = getBearing(25.116436, 55.390540, 25.113889, 55.392439);
				//alert(latitude+'$'+longitude+'$'+latitiude_data+'$'+longitude_data);
				var bearing = getBearing(latitude, longitude, latitiude_data, longitude_data);
				
				var t_com = Ti.UI.create2DMatrix();
                t_com = t_com.rotate(360-magneticHeading);
 
                compassImage.transform = t_com;

				var t = Ti.UI.create2DMatrix();
				t = t.rotate(bearing - magneticHeading);

				imgCompass.transform = t;

				function toRad(value) {
					return value * Math.PI / 180;
				}

				function toDeg(value) {
					return value * 180 / Math.PI;
				}

				function getBearing(lat1, lon1, lat2, lon2) {

					var dLon = toRad((lon2 - lon1));
					lat1 = toRad(lat1);
					lat2 = toRad(lat2);

					var y = Math.sin(dLon) * Math.cos(lat2);
					var x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);
					var brng = toDeg(Math.atan2(y, x));
					//lblBearing.text = 'Bearing:' + brng;
					return brng;
				}

			});

			Titanium.Geolocation.addEventListener('heading', function(e) {
				if (e.error) {
					Titanium.API.info("error: " + e.error);
					return;
				}

				var x = e.heading.x;
				var y = e.heading.y;
				var z = e.heading.z;
				var magneticHeading = e.heading.magneticHeading;
				var accuracy = e.heading.accuracy;
				var trueHeading = e.heading.trueHeading;
				var timestamp = e.heading.timestamp;

				var bearing = getBearing(latitude, longitude,latitiude_data, longitude_data);
				var t = Ti.UI.create2DMatrix();
				t = t.rotate(bearing - magneticHeading);
				imgCompass.transform = t;
				
				var t_com = Ti.UI.create2DMatrix();
                t_com = t_com.rotate(360-magneticHeading);
 
                compassImage.transform = t_com;

				function toRad(value) {
					return value * Math.PI / 180;
				}

				function toDeg(value) {
					return value * 180 / Math.PI;
				}

				function getBearing(lat1, lon1, lat2, lon2) {
					var dLon = toRad((lon2 - lon1));
					lat1 = toRad(lat1);
					lat2 = toRad(lat2);
					var y = Math.sin(dLon) * Math.cos(lat2);
					var x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);
					var brng = toDeg(Math.atan2(y, x));
					//lblBearing.text = 'Bearing:' + brng;
					return brng;
				}

			});
		} else {
			Titanium.API.info("No Compass on device");
		}

	} else {
		alert("Please enable location service.");
	}
	opacity_control_view.add(imgCompass);
	opacity_control_view.add(compassImage);
	opacity_control_view.add(distance);

	return compassview;

}

//make constructor function the public component interface
module.exports = compassmap;
