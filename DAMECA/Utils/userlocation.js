function mycurrentlocationUtlity(){

	//  MAIN VIEW FOR THE PAGE
	var view_map = Titanium.UI.createView({
		width : "100%",
		height : "auto"
		//backgroundColor : '#F2EEE4'
	});

	//map_win.add(view_map);
	 var groupView = Ti.UI.createView({
	        width : GetWidth(56),
	        height : GetHeight(71)
    });
 
    var groupImage = Ti.UI.createImageView({
        image : Ti.App.resourceurl+'images/favlocationpin.png',
        width : '100%',
        height : '100%'
    });
    groupView.add(groupImage);
 
   
	// ###############################  NEWS FINAL FETCH RESULT ################################## //
	if (Titanium.Geolocation.locationServicesEnabled === false) {
		Titanium.UI.createAlertDialog({
			title : 'Alameen',
			message : 'Your device has geo turned off - turn it on.'
		}).show();
		return;
	} else {

		location_service_process();
	}

	function location_service_process() {

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
				
				/*var longitude = e.coords.longitude;
				var latitude = e.coords.latitude;
				var altitude = e.coords.altitude;
				var heading = e.coords.heading;
				var accuracy = e.coords.accuracy;
				var speed = e.coords.speed;
				var timestamp = e.coords.timestamp;
				var altitudeAccuracy = e.coords.altitudeAccuracy;*/
	
				Ti.API.info('speed ' + speed);

				Titanium.API.info('geo - current location: ' + new Date(timestamp) + ' long ');

			});

			var annotation = Titanium.Map.createAnnotation({
				latitude : latitude,
				longitude : longitude,
				title : "Add to Favourite",
				animate : true,
				draggable : true,
				//leftButton : Ti.App.resourceurl+'images/favlocationpin.png',
				//image : Ti.App.resourceurl+'images/favlocationpin.png',
				image : (Ti.Platform.osname == 'android') ? Ti.App.resourceurl+'images/favlocationpin.png' : groupView.toImage()
			});

			var current_loc = {
				latitude : latitude,
				longitude : longitude,
				latitudeDelta : 0.010,
				longitudeDelta : 0.018
			};
			
			Ti.App.current_latitude = latitude;
			
			Ti.App.current_longitude = longitude;
			
			function toDeg(value) {
					var degrevalue =  value * 180 / Math.PI;
					
					var twoPlacedFloat = parseFloat(degrevalue).toFixed(4);
					
					return twoPlacedFloat;
				}
				
			function convertDecDeg(v,tipo) {
				if (!tipo) tipo='N';
				var deg;
				deg = v;
				if (!deg){
					return "";
				} else if (deg > 180 || deg < 0){
					// convert coordinate from north to south or east to west if wrong tipo
					return convertDecDeg(-v,(tipo=='N'?'S': (tipo=='E'?'W':tipo) ));
				} else {
					var gpsdeg = parseInt(deg);
					var remainder = deg - (gpsdeg * 1.0);
					var gpsmin = remainder * 60.0;
					var D = gpsdeg;
					var M = parseInt(gpsmin);
					var remainder2 = gpsmin - (parseInt(gpsmin)*1.0);
					var S = parseInt(remainder2*60.0);
					return D+"\xB0; "+M+"' "+S+"'' "+tipo;
				}
			}	
			
			var northdegree = convertDecDeg(latitude,'N');	
			
			var eastdegree = convertDecDeg(longitude, 'E');
			
			
			map_view_get(current_loc, annotation, northdegree, eastdegree);

		});
		

		function map_view_get(current_loc, annotation, northdegree, eastdegree) {
			//
			//CREATE MAP VIEW
			//
			var mapview = Titanium.Map.createView({
				mapType : Titanium.Map.STANDARD_TYPE,
				region : current_loc,
				animate : true,
				regionFit : true,
				userLocation : true,
				annotations : [annotation],
				touchEnabled : true,
				borderColor : 'F2EEE4',
				borderWidth : 1,
				width : "98%",
				top : 1,
				bottom:1
				//height : 360),
				//annotations:[annotation]
			});

			view_map.add(mapview);
			
			mapview.addEventListener('click', function(evt) { 
				
				Ti.API.info("latit" + annotation.latitude + "....... longti" + annotation.longitude);
				
				var pop_view = Titanium.UI.createView({
									width : "100%",
									height : "auto",
									backgroundColor : '#000',
									zIndex:1,
									opacity:0.6
								});
								
								
				var content_view = 	Titanium.UI.createView({
									width : "90%",
									height : "80%",
									layout:'vertical',
									backgroundColor : '#FFFFFF',
									//borderColor:'#999999',
									borderRadius:4,
									//borderWidth:1,
									//opacity:1,
									zIndex:2,
									top:GetHeight(60)
									
								});	
				var title_view = Titanium.UI.createView({
									width : "100%",
									height : GetHeight(45),
									top:0,
									backgroundGradient: {
											        type: 'linear',
											        startPoint: { x: '50%', y: '0%' },
											        endPoint: { x: '50%', y: '100%' },
											        colors: [ '#0091cf','#07598f' ]
									}
								});	
				content_view.add(title_view);
					
				
				var backimg_top = Titanium.UI.createLabel({
									text:Ti.App.L('addtofavourites'),
									color:'#FFFFFF',
									font : {
										fontSize : GetWidth(16),
										//fontWeight : "bold",
										//fontFamily : "Arial,Helvetica,sans-serif"
									},
									width : "60%",
									left:GetWidth(8)
									
								});	
				title_view.add(backimg_top);	
				
				var close_img = Titanium.UI.createImageView({
									width : GetWidth(30),
									right:GetWidth(8),
									image:Ti.App.resourceurl+'images/close.png'
								});	
				title_view.add(close_img);	
				
				close_img.addEventListener('click', function(evt) {
					pop_view.hide();
					content_view.hide();
					Ti.App.baseWindow.remove(pop_view);
					Ti.App.baseWindow.remove(content_view);
						
				});	
				
				var left_side = GetWidth(22);
				
				var degreelabel = northdegree+' , '+eastdegree+' ';
				
				var northeast_lable = Titanium.UI.createLabel({
									text: degreelabel,
									color:'#0ba4e6',
									font : {
										fontSize : GetWidth(16),
										//fontWeight : "bold",
										//fontFamily : "Arial,Helvetica,sans-serif"
									},
									width : "100%",
									top:GetHeight(5),
									left:left_side
									
								});	
				 content_view.add(northeast_lable);
				 
				 function getDate(){
				    var currentTime = new Date();
				    var hours = currentTime.getHours();
				    var minutes = currentTime.getMinutes();
				    var month = currentTime.getMonth();
				    var day = currentTime.getDate();
				    var year = currentTime.getFullYear();
				    
				    var ampm = hours >= 12 ? 'PM' : 'AM';
					  hours = hours % 12;
					  hours = hours ? hours : 12; // the hour '0' should be '12'
					  minutes = minutes < 10 ? '0'+minutes : minutes;
					  
				    var monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
				    var monthsting = monthNames[month];
				    
				    return monthsting +' '+day+', '+year+' | '+hours+':'+minutes+' '+ampm;
				}
								 
				 var timedatelabel = Titanium.UI.createLabel({
									text:getDate() ,
									color:'#0ba4e6',
									font : {
										fontSize : GetWidth(16),
										//fontWeight : "bold",
										//fontFamily : "Arial,Helvetica,sans-serif"
									},
									width : "100%",
									top:GetHeight(5),
									left:left_side
									
								});	
				 content_view.add(timedatelabel);
				 
				 var hor_line_ns = Titanium.UI.createLabel({
							text : '',
							height : 2,
							borderWidth : 1,
							borderColor : '#b0b0b0',
							opacity:0.5,
							width : "100%",
							//right : GetWidth(9),
							top : GetHeight(12)
						});
				content_view.add(hor_line_ns);
				
				var namelabel = Titanium.UI.createLabel({
									text:'Name/Title:' ,
									color:'#666666',
									font : {
										fontSize : GetWidth(14),
										//fontWeight : "bold",
										//fontFamily : "Arial,Helvetica,sans-serif"
									},
									width : "100%",
									top: GetHeight(12),
									left:left_side
									
								});	
				 content_view.add(namelabel);
				 
				 var name_textfld = Titanium.UI.createTextField({
									borderColor : '#b0b0b0',
									borderRadius : 4,
									borderWidth : 2,
									borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE,
									color:'#666666',
									font : {
										fontSize : GetWidth(14),
										//fontWeight : "bold",
										//fontFamily : "Arial,Helvetica,sans-serif"
									},
									width : "85%",
									height:GetHeight(30),
									top:GetHeight(5),
									rght:left_side,
									left:left_side
									
								});	
				 content_view.add(name_textfld);
				 
				 var brief_label = Titanium.UI.createLabel({
									text:'Brief Note:' ,
									color:'#666666',
									font : {
										fontSize : GetWidth(14),
										//fontWeight : "bold",
										//fontFamily : "Arial,Helvetica,sans-serif"
									},
									width : "100%",
									top:GetHeight(5),
									left:left_side
									
								});	
				 content_view.add(brief_label);
				 
				 var brief_textfld = Titanium.UI.createTextArea({
									color:'#666666',
									font : {
										fontSize : GetWidth(14),
										//fontWeight : "bold",
										//fontFamily : "Arial,Helvetica,sans-serif"
									},
									//borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
									backgroundImage : 'none',
									borderColor : '#b0b0b0',
									borderRadius : 4,
									borderWidth : 2,
									borderStyle : Ti.UI.INPUT_BORDERSTYLE_NONE,
									width : "85%",
									height:GetHeight(110),
									top:GetHeight(5),
									rght:left_side,
									left:left_side
									
								});	
				 content_view.add(brief_textfld);
				 
				 var submit_map_fav = Titanium.UI.createButton({
									//title:'Submit' ,
									color:'#666666',
									backgroundImage:Ti.App.resourceurl+'images/submitaddtofav.png',
									font : {
										fontSize : GetWidth(14),
										fontWeight : "bold",
										//fontFamily : "Arial,Helvetica,sans-serif"
									},
									width : "85%",
									height:GetHeight(35),
									top:GetHeight(10),
									left:left_side
								});	
				 content_view.add(submit_map_fav);
				 
				 submit_map_fav.addEventListener('click', function(evt) {
				 	
				 	var loc_name = name_textfld.value;
				 	var loc_note = brief_textfld.value;
				 	
				 	//Ti.API.info("lat---------" + annotation.latitude + "....... longti" + annotation.longitude);
				 	if (Ti.App.Properties.getBool('installed', false) === false) {
					    var db = Titanium.Database.install('/map_data.db','map_data');
					    Ti.App.Properties.setBool('installed', true);
					} else {
					    var db =Ti.Database.open('map_data');
					}
				 	
				    //db.open('map_data');
				    //db.execute("DELETE FROM location");
				   // alert(annotation.latitude+'$'+annotation.longitude);
				 	db.execute("INSERT INTO location (name, briefnote, latitiude, longitude) VALUES (?,?,?,?)",
				 	loc_name, loc_note, annotation.latitude, annotation.longitude);
				 					 	//loc_name, loc_note, '25.118252', '55.393860');
				 	
					/*var cityWeatherRS = db.execute('SELECT latitiude FROM location');
					while (cityWeatherRS.isValidRow())
					{
					  var name = cityWeatherRS.fieldByName('latitiude');
					  alert(name);
					  cityWeatherRS.next();
					}*/
					
				 	db.close();
				 	alert('Favourite location successfull added');
				 	
				 	var evt = {customData: 'myData'};
		            Ti.App.fireEvent('myEvent', evt);
		            
				 	pop_view.hide();
					content_view.hide();
					Ti.App.baseWindow.remove(pop_view);
					Ti.App.baseWindow.remove(content_view);
					
					
				 
				 });	
				 						
				Ti.App.baseWindow.add(content_view);					
								
				Ti.App.baseWindow.add(pop_view);				
			
			});	

			// map view pin change drag state event listener
			/*if (platform == 'ios') {
				mapview.addEventListener('pinchangedragstate', function(evt) {
					if (evt.oldState == "dragging") {
						annotation.subtitle = [annotation.latitude, ':', annotation.longitude].join(' ');
					}
					Ti.API.info(['newState:', evt.newState, 'oldState', evt.oldState].join(' '));
					Ti.App.Properties.setDouble('LATITUDE', annotation.latitude);
					Ti.App.Properties.setDouble('LONGITUDE', annotation.longitude);

					Ti.API.info("latit" + annotation.latitude + "....... longti" + annotation.longitude);

				});
			} else {

				mapview.addEventListener('regionChanged', function(evt) {
					//alert(evt.latitude);

					Ti.API.info("latit" + evt.latitude + "....... longti" + evt.longitude);
					var latit = evt.latitude;
					var longti = evt.longitude;
					Ti.App.Properties.setDouble('LATITUDE', latit);
					Ti.App.Properties.setDouble('LONGITUDE', longti);
					Ti.API.info("latit........TEST" + Ti.App.Properties.getDouble('LATITUDE') + "....... longti....TEST" + +Ti.App.Properties.getDouble('LONGITUDE'));

				});

			}*/
		}

	}

	


	
	
  
	return view_map;	

}

//make constructor function the public component interface
module.exports = mycurrentlocationUtlity;	