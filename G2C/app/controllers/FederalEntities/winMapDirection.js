var args = arguments[0] || {};
var ab = Ti.Platform.model;
var ipn = ab.search('iPod'),
    isTablet = Alloy.isTablet;
var itemObj = args.itemObj;
if (itemObj.image.length != 0) {
	$.imgView.image = itemObj.image;

} else {
	$.imgView.image = Alloy.Globals.path.defaultImageThumb;
}

var density;
var json = '';
if (OS_IOS) {
	density = "dp";
} else {
	density = "px";
}

$.winMapDirection.addEventListener("open", function(e) {
	Alloy.Globals.arrWindows.push($.winMapDirection);
	$.winMapDirection.layout = "vertical";
	if (Alloy.Globals.isIOS7Plus) {
		//	$.winDashboard.statusBarStyle = Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT;
		$.winMapDirection.extendEdges = [Ti.UI.EXTEND_EDGE_TOP];
		$.statusBar.height = 20;

	}
	$.navBarBackView.top = 0;
	//$.navBarBackView.height = Ti.UI.SIZE;
	//	$.navBarBackView.backgroundColor = "transparent";
	$.navBarBackView.layout = "vertical";
	$.navBar.height = 45;

	if (OS_IOS) {
		$.mapDetails.top = 0;
	} else {
		$.mapDetails.top = 45;
	}
	$.mapDetails.bottom = 0;
	changeLanguage();
	//getGoogleDirection();

});

if (Alloy.Globals.isIOS7Plus) {
	//	$.winDashboard.statusBarStyle = Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT;
	$.winMapDirection.extendEdges = [Ti.UI.EXTEND_EDGE_TOP];
	$.statusBar.height = 20;

}

$.phoneCall.addEventListener('click', function() {

	var number = itemObj.number;

	if (number.length != 0) {
		if (number != null)

			if (ipn == 0) {
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.phone, Alloy.Globals.selectedLanguage.phoneCallService);
				return;
			}
		Alloy.Globals.makeCall(itemObj.number);
	} else {
		Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.phone, Alloy.Globals.selectedLanguage.notAvailable);
	}
});
$.browse.addEventListener('click', function() {
	var winDetail = Alloy.createController("FederalEntities/winWebView", itemObj).getView();
	Alloy.Globals.openWindow(winDetail);

});
function closeWindow() {
	Alloy.Globals.closeWindow($.winMapDirection);
}

function gotoHome() {
	Alloy.Globals.gotoHome();
}

var isDirectionViewOpened = false;

function showDirectionView() {

	if (Ti.Network.online == false) {
		Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.networkError, Alloy.Globals.selectedLanguage.noInternet);
		return false;
	} else {
		Ti.API.info('>>>>> showDirection');
		if (json.status != "NOT_FOUND") {

			var win = Alloy.createController("FederalEntities/winDirections", json).getView();
			Alloy.Globals.openWindow(win);
		} else {
			$.mapDetails.remove($.directionView);
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.direction, Alloy.Globals.selectedLanguage.invalidRoute);
			return;
		}
	}

}

function decodeLine(encoded) {
	var len = encoded.length;
	var index = 0;
	var array = [];
	var lat = 0;
	var lng = 0;

	while (index < len) {
		var b;
		var shift = 0;
		var result = 0;
		do {
			b = encoded.charCodeAt(index++) - 63;
			result |= (b & 0x1f) << shift;
			shift += 5;
		} while (b >= 0x20);

		var dlat = ((result & 1) ? ~(result >> 1) : (result >> 1));
		lat += dlat;

		shift = 0;
		result = 0;
		do {
			b = encoded.charCodeAt(index++) - 63;
			result |= (b & 0x1f) << shift;
			shift += 5;
		} while (b >= 0x20);

		var dlng = ((result & 1) ? ~(result >> 1) : (result >> 1));
		lng += dlng;

		array.push([lat * 1e-5, lng * 1e-5]);
	}

	return array;
}

var dLatitude = itemObj.latitude;
var dLongitude = itemObj.longitude;

function getGoogleDirection() {
	var languegPrefix = "en";
	if (Alloy.Globals.isEnglish) {
		languegPrefix = "en";
	} else {
		languegPrefix = "ar";
	}
	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading, false);
	var Url_map = 'http://maps.googleapis.com/maps/api/directions/json?origin=' + args.curLocation.latitude + ',' + args.curLocation.longitude + '&destination=' + dLatitude + ',' + dLongitude + '&sensor=false&language=' + languegPrefix;

	var pathData = [];
	var xhr = Ti.Network.createHTTPClient();
	xhr.onload = function(e) {
		var response = this.responseText;
		json = JSON.parse(response);

		Alloy.Globals.hideLoading();
		if (json.routes.length == 0) {
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.direction, Alloy.Globals.selectedLanguage.invalidRoute);
			return;
		}

		//lblRoute
		$.lblTime.text = json.routes[0].legs[0].duration.text;
		$.lblDistance.text = json.routes[0].legs[0].distance.text;
		$.lblRoute.text = json.routes[0].legs[0].start_address;

		var step = json.routes[0].legs[0].steps;
		var intStep = 0,
		    intSteps = step.length,
		    points = [];
		var decodedPolyline,
		    intPoint = 0,
		    intPoints = 0;
		points.length = pathData.length = 0;
		for ( intStep = 0; intStep < intSteps; intStep = intStep + 1) {
			decodedPolyline = decodeLine(step[intStep].polyline.points);
			intPoints = decodedPolyline.length;
			for ( intPoint = 0; intPoint < intPoints; intPoint = intPoint + 1) {
				if (decodedPolyline[intPoint] != null) {
					points.push({
						latitude : decodedPolyline[intPoint][0],
						longitude : decodedPolyline[intPoint][1]
					});
					pathData.push(decodedPolyline[intPoint][0], decodedPolyline[intPoint][1]);
				}
			}
		}

	};
	xhr.onerror = function(e) {
		Alloy.Globals.hideLoading();
	};
	xhr.open('GET', Url_map);
	xhr.setTimeout(35000);
	xhr.send();

	var arrAnnotation = [];

	var sAddress = Alloy.Globals.Map.createAnnotation({
		latitude : dLatitude, //Alloy.Globals.UserLocation.latitude,
		longitude : dLongitude, //Alloy.Globals.UserLocation.longitude,
		animate : false,
		image : Alloy.Globals.path.imgAnnotation, //"/images/iPhoneImages/icnCurrentLocation.png",
		title : $.lblTitle.text
	});
	$.mapView.addAnnotation(sAddress);
	arrAnnotation.push(sAddress);
	$.mapView.region = Alloy.Globals.getFitZoomMapRegionWithCoords(arrAnnotation);
}

function getTurnByTurnDirection() {
	if (!Titanium.Geolocation.getLocationServicesEnabled()) {
		Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.direction, Alloy.Globals.selectedLanguage.turnOnGPS);
	} else {
		getCurrentLocation(function(e) {
			var strUrl = "http://maps.google.com/maps?saddr=" + e.latitude + "," + e.longitude + "&daddr=" + dLatitude + "," + dLongitude;
			if (OS_IOS) {
				strUrl = "comgooglemaps://?saddr=" + e.latitude + "," + e.longitude + "&daddr=" + dLatitude + "," + dLongitude + "&directionsmode=driving";
				if (Titanium.Platform.canOpenURL(strUrl)) {
					Ti.Platform.openURL(strUrl);
				} else {
					strUrl = "http://maps.google.com/maps?saddr=" + e.latitude + "," + e.longitude + "&daddr=" + dLatitude + "," + dLongitude;
					Ti.Platform.openURL(strUrl);
				}
			} else {
				Ti.Platform.openURL(strUrl);
			}
		});

	}
}

function getCurrentLocation(callback) {
	Titanium.Geolocation.getCurrentPosition(function(e) {
		if (!e.success || e.error) {
			if (OS_IOS) {
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.direction, Alloy.Globals.selectedLanguage.turnOnGPS);
			} else {
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.direction, Alloy.Globals.selectedLanguage.turnOnGPS);
			}
			return;
		} else {
			callback({
				latitude : e.coords.latitude,
				longitude : e.coords.longitude
			});
		}

	});
}

function changeLanguage() {

	$.lblStart.text = Alloy.Globals.selectedLanguage.start;

	var alignment;
	if (Alloy.Globals.isEnglish) {
		alignment = Titanium.UI.TEXT_ALIGNMENT_LEFT;
		//
		$.lblNavTitle.text = itemObj.enName;
		$.lblTitle.text = itemObj.enName;
		$.lblAddress.text = itemObj.enAddress;
		$.viewContents.left = 0;
		$.imgTravelmode.left = /*$.lblRoute.left = */0;
		$.viewContents.right = 90;
		$.viewContentsTop.right = 80;
		$.viewContentsTop.left = $.viewStart.right = 10;
		$.browse.left = 50;
		$.phoneCall.left = 10;
		$.viewImages.right = 10;
		$.lblTime.left = 40;
		$.lblDistance.left = 120;
		if (isTablet) {
			$.viewContents.right = 120;
			$.browse.left = 75;
			$.lblTime.left = 50;
			$.lblDistance.left = 210;
		}
		$.lblTime.right = $.lblDistance.right = undefined;
	} else {
		alignment = Titanium.UI.TEXT_ALIGNMENT_RIGHT;

		$.lblNavTitle.text = itemObj.arName;
		$.lblTitle.text = itemObj.arName;
		$.lblAddress.text = itemObj.arAddress;
		$.viewContents.right = 0;
		$.imgView.left = $.imgTravelmode.right = /*$.lblRoute.right = */0;
		$.viewContents.left = 90;
		$.viewContentsTop.left = 80;
		$.viewContentsTop.right = $.viewStart.left = $.viewImages.left = 10;
		$.phoneCall.right = 10;
		$.browse.right = 50;
		$.viewImages.left = 10;
		$.lblTime.right = 40;
		$.lblDistance.right = 120;
		if (isTablet) {
			$.viewContents.left = 120;
			$.browse.right = 75;
			$.lblTime.right = 50;
			$.lblDistance.right = 210;
		}
		$.lblTime.left = $.lblDistance.left = undefined;
	}
	$.lblTime.textAlign = $.lblDistance.textAlign = $.lblAddress.textAlign = $.lblTitle.textAlign = $.lblRoute.textAlign = alignment;
	getGoogleDirection();
}


$.winMapDirection.addEventListener("close", function(e) {
	Alloy.Globals.arrWindows.pop();
	$.imgBackBtn = $.imgHomeBtn = $.phoneCall = $.browse = $.imgView = $.mapView = $.imgTravelmode = $.imgStart = null;
});

$.winMapDirection.addEventListener("focus", function(e) {
	Alloy.Globals.arrWindows.pop();
	$.imgBackBtn = $.imgHomeBtn = $.phoneCall = $.browse = $.imgView = $.mapView = $.imgTravelmode = $.imgStart = null;
});

