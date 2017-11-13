
// code for finding current location in latitude and logitude......

var longitude;
var latitude;
 
Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST;
Titanium.Geolocation.distanceFilter = 10;
Titanium.Geolocation.getCurrentPosition(function(e)
{
    if (!e.success || e.error)
    {
        alert('error ' + JSON.stringify(e.error));
        return;
    }
    longitude = e.coords.longitude;
    latitude = e.coords.latitude;
    var altitude = e.coords.altitude;
    var heading = e.coords.heading;
    var accuracy = e.coords.accuracy;
    var speed = e.coords.speed;
    var timestamp = e.coords.timestamp;
    var altitudeAccuracy = e.coords.altitudeAccuracy;
});
 
var locationCallback = function(e)
{
    if (!e.success || e.error)
    {
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
 
    setTimeout(function()
    {
 
    },100);
 
    // reverse geo
    Titanium.Geolocation.reverseGeocoder(latitude,longitude,function(evt)
    {
        if (evt.success) {
            var places = evt.places;
            if (places && places.length) {
                //reverseGeo.text = places[0].address;
                var place = places[0].address;
                alert("Current location "+place);
            } else {
                //reverseGeo.text = "No address found";
                alert("No address found");
            }
            //Ti.API.debug("reverse geolocation result = "+JSON.stringify(evt));
        }
        else {              
        }
    });
 
};
Titanium.Geolocation.addEventListener('location', locationCallback);

//////////////////////////===============================================


//
// var win = Titanium.UI.createWindow();
//
// var mountainView = Titanium.Map.createAnnotation({
// latitude:37.390749,
// longitude:-122.081651,
// title:"Appcelerator Headquarters",
// subtitle:'Mountain View, CA',
// pincolor:Titanium.Map.ANNOTATION_RED,
// animate:true,
// leftButton: '../images/appcelerator_small.png',
// myid:1 // Custom property to uniquely identify this annotation.
// });
//
// var mapview = Titanium.Map.createView({
// mapType: Titanium.Map.STANDARD_TYPE,
// region: {latitude:37.390749, longitude:-122.081651,
// latitudeDelta:0.01, longitudeDelta:0.01},
// animate:true,
// regionFit:true,
// userLocation:true,
// annotations:[mountainView]
// });
//
// win.add(mapview);
// // Handle click events on any annotations on this map.
// mapview.addEventListener('click', function(evt) {
//
// Ti.API.info("Annotation " + evt.title + " clicked, id: " + evt.annotation.myid);
//
// // Check for all of the possible names that clicksouce
// // can report for the left button/view.
// if (evt.clicksource == 'leftButton' || evt.clicksource == 'leftPane' ||
// evt.clicksource == 'leftView') {
// Ti.API.info("Annotation " + evt.title + ", left button clicked.");
// }
// });
// win.open();
//
// // For the iOS platform, wait for the complete event to ensure the region is set
// if (Ti.Platform.name == 'iPhone OS') {
// mapview.addEventListener('complete', function(evt){
// mapview.region = {
// latitude:37.390749, longitude:-122.081651,
// latitudeDelta:0.01, longitudeDelta:0.01
// };
// });
// }
//
//

//************Map view: code to stuck with the user's current location..***/

// var win = Ti.UI.createWindow();
//
// var annotations = [
// Ti.Map.createAnnotation({
// latitude: 37.389569,
// longitude: -122.050212,
// title: 'Appcelerator HQ',
// subtitle: 'Mountain View, CA',
// animate: true,
// pincolor: Ti.Map.ANNOTATION_GREEN,
// leftButton: 'appcelerator.gif'
// }),
// Ti.Map.createAnnotation({
// latitude: 37.331689,
// longitude: -122.030731,
// title: 'Apple HQ',
// subtitle: 'Cupertino, CA',
// animate: true,
// pincolor: Ti.Map.ANNOTATION_RED,
// rightButton: 'apple.png'
// }),
// Ti.Map.createAnnotation({
// latitude: 37.422502,
// longitude: -122.0855498,
// title: 'Google HQ',
// subtitle: 'Mountain View, CA',
// animate: true,
// image: 'google.png',
// leftView: Ti.UI.createButton({
// title: 'leftView',
// height: 32,
// width: 70
// }),
// rightView: Ti.UI.createLabel({
// text: 'rightView',
// height: 'auto',
// width: 'auto',
// color: '#fff'
// })
// })
// ];
// var mapview = Titanium.Map.createView({
// mapType: Titanium.Map.STANDARD_TYPE,
// // region: {
// // latitude:37.389569,
// // longitude:-122.050212,
// // latitudeDelta:.05,
// // longitudeDelta:.05
// // },
// animate:true,
// regionFit:true,
// userLocation:true,
// // annotations: annotations
// });
// // mapview.addRoute({
// // name: 'myroute',
// // width: 4,
// // color: '#f00',
// // points: [
// // {latitude:37.422502, longitude:-122.0855498},
// // {latitude:37.389569, longitude:-122.050212},
// // {latitude:37.331689, longitude:-122.030731}
// // ]
// // });
// win.add(mapview);
// win.open();

/////******************* SoapCall: method to check soap ***********************/
var reqObject = new require('SoapCall').getResponseFromTheServer();

var parameters = {
	URL : 'http://www.dmca.ae/DMCATacsoft/Services/Feedbackservice.svc',
	soapAction : 'http://tempuri.org/IFeedbackService/SaveFeedback',
	name : 'SaveFeedback',
	params : ['websiteID', 'languageID', 'categoryID', 'subject', 'name', 'company', 'emailAddress', 'phoneNumber', 'comment', 'address', 'feedbackType'],
	values : ['1', '1', '1', 'test', 'text', 'Tacme', 'nsahu@tacme.com', '0569200847', 'nothing', 'no known', '1'],
	keyName : 'SaveFeedbackResponse'
};

var xml = getResponseFromTheServer(parameters);
if(xml!=undefined)
{
	
}

/////////////////////////////////====================================

