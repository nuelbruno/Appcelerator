// ###############################  NEWS FINAL FETCH RESULT ################################## //
if (Titanium.Geolocation.locationServicesEnabled === false) {
	Titanium.UI.createAlertDialog({
		title : 'Alameen',
		message : 'Your device has geo turned off - turn it on.'
	}).show();
	//return;
} else {



	Ti.Geolocation.preferredProvider = Titanium.Geolocation.PROVIDER_GPS;
	Ti.Geolocation.purpose = "Get current position";
	Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST;
	Titanium.Geolocation.distanceFilter = 10;
	Ti.Geolocation.trackSignificantLocationChange = true;

	Titanium.Geolocation.getCurrentPosition(function(e) {// alert('gps called');
		if (e.error) {
			alert('HFL cannot get your current location');
			return;
		}

		var longitude = e.coords.longitude;
		var latitude = e.coords.latitude;
		var altitude = e.coords.altitude;
		var heading = e.coords.heading;
		var accuracy = e.coords.accuracy;
		var speed = e.coords.speed;
		var timestamp = e.coords.timestamp;
		var altitudeAccuracy = e.coords.altitudeAccuracy;

		Ti.API.info('speed ' + speed);

		Titanium.API.info('geo - current location: ' + new Date(timestamp) + ' long ' + longitude + ' lat ' + latitude + ' accuracy ' + accuracy);

		Titanium.Geolocation.addEventListener('location', function(e) {

			var longitude = e.coords.longitude;
			var latitude = e.coords.latitude;
			var altitude = e.coords.altitude;
			var heading = e.coords.heading;
			var accuracy = e.coords.accuracy;
			var speed = e.coords.speed;
			var timestamp = e.coords.timestamp;
			var altitudeAccuracy = e.coords.altitudeAccuracy;

			Ti.API.info('speed ' + speed);

			Titanium.API.info('geo - current location: ' + new Date(timestamp) + ' long ');
			
			Ti.App.latitudemap = latitude;
			Ti.App.longitudemap = longitude;

		});

		

	});
}
