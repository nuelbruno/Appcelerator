function favouite_listview() {

	

	var i = 0;

	if (Ti.App.Properties.getBool('installed', false) === false) {
		var db = Titanium.Database.install('/map_data.db', 'map_data');
		Ti.App.Properties.setBool('installed', true);
	} else {
		var db = Ti.Database.open('map_data');
	}
	
	var serach_bg = Titanium.UI.createView({
		width : "100%",
		//height : GetHeight(43),
		//backgroundColor : '#e0e0e0',
		top : 0,
		layout:'vertical'
	});

	//view_favour.add(serach_bg);
	
	
	var search_fld = Titanium.UI.createSearchBar({
		showCancel : true,
		barColor : '#e0e0e0',
		filterAttribute : 'widgetname',
		width : "100%",
		//height : GetHeight(30),
		top : GetHeight(1),
		left : GetWidth(0)
	}); 

    serach_bg.add(search_fld);
	
	
	var tableView = Ti.UI.createTableView({
		//data : tableData,
		height : 'auto',
		width : '98%',
		top : GetHeight(1),
		bottom : GetHeight(20),
		selectedColor : 'none',
		backgroundColor : '#FFFFFF',
		separatorColor : "#FFFFFF",
		separatorStyle : 'none',
		search:search_fld,
        filterAttribute:'loc_name'
	});
	
	
	
	firstcall_list();	
	
	function firstcall_list(){
			
	  
	  var tableData = [];
		
	  var fav_location_row = db.execute('SELECT * FROM location ORDER BY id DESC');

		/*Ti.UI.createAlertDialog({
			title : 'Number of rows',
			message : fav_location_row.field(0)
		}).show();*/
		//alert(fav_location_row.getRowCount);

		while (fav_location_row.isValidRow()) {
			var name_data = fav_location_row.fieldByName('name');
			var note_data = fav_location_row.fieldByName('briefnote');
			var latitiude_data = fav_location_row.fieldByName('latitiude'); 
			var longitude_data = fav_location_row.fieldByName('longitude');
			var id_data = fav_location_row.fieldByName('id');

			var row = Ti.UI.createTableViewRow({
				className : 'forumEvent', // used to improve table performance
				selectedBackgroundColor : 'white',
				rowIndex : i, // custom property, useful for determining the row during events
				height : GetHeight(85),
				loc_name:name_data,
				latitud: latitiude_data,
				longitud:longitude_data,
				bottom : GetHeight(20)
			});

			var favlist_bg_view = Titanium.UI.createView({
				width : "100%",
				latitud: latitiude_data,
				longitud:longitude_data,
				height : GetHeight(85),
				backgroundImage : Ti.App.resourceurl + 'images/fav_listbg.png',

			});

			row.add(favlist_bg_view);

			var favlistlabelview = Titanium.UI.createView({
				width : "70%",
				height : 'auto',
				latitud: latitiude_data,
				longitud:longitude_data,
				top : GetHeight(10),
				left : GetWidth(10),
				layout : 'vertical'
			});

			favlist_bg_view.add(favlistlabelview);

			var favlist_details = Ti.UI.createLabel({
				color : '#055085',
				text : name_data,
				latitud: latitiude_data,
				longitud:longitude_data,
				font : {
					fontSize : GetWidth(14),
					//fontWeight : "bold",
					//fontFamily : "Arial,Helvetica,sans-serif"
				},
				top : GetHeight(10),
				left : GetWidth(3)

			});
			favlistlabelview.add(favlist_details);

			var favlist_note = Ti.UI.createLabel({
				color : '#666666',
				latitud: latitiude_data,
				longitud:longitude_data,
				text : note_data,
				font : {
					fontSize : GetWidth(12),
					//fontWeight : "bold",
					//fontFamily : "Arial,Helvetica,sans-serif"
				},
				top : GetHeight(3),
				left : GetWidth(3)

			});
			favlistlabelview.add(favlist_note);

			var favlist_imgpin = Titanium.UI.createImageView({
				width : GetWidth(34),
				height : GetHeight(44),
				latitud: latitiude_data,
				longitud:longitude_data,
				image : Ti.App.resourceurl + 'images/favlocationpin.png',
				right : GetWidth(10)

			});
			favlist_bg_view.add(favlist_imgpin);
			
			

			favlist_bg_view.addEventListener('click', function(event) {  
				
				if(Ti.App.directionwin != undefined)
				{
					Ti.App.directionwin.close();
					//Ti.App.directionwin='';
				}

				//var tabWin = getshowdirection(App);
				Ti.App.ActiveTabController.loadTabWithIndex(1);
				//App.fav_latitude = latitiude_data;
				//App.fav_longitiude = longitude_data;
				//alert(App.fav_latitude+'test');
				//getshowdirection(App);
				
				//alert(event.source.latitud + '$$' + event.source.longitud );
				  
				
				var fun_call = true;
				
				Ti.App.dest_latitude = event.source.latitud;
				Ti.App.dest_longitude = event.source.longitud;
				
				var dir_win = Ti.UI.createWindow({
					      width: '100%',
					      height: 'auto',
					      url: 'Utils/directionmap.js',
					      top:100
				});
				
				dir_win.open();

				//var directionmapjs = new directionmapjs(App, Ti.App.dest_latitude, Ti.App.dest_longitude, fun_call)
				//directionmapjs.view_direction.reload();;
				//directionview.add(directionmapjs);
				
				
				
				

			});

			tableData.push(row);
			//alert(i);

			i++;
			fav_location_row.next();
		}
		
		tableView.setData(tableData);
	}	

	//db.open('map_data');
	//db.execute('DELETE  from location');

	 serach_bg.add(tableView);
	
	// tableView.setData(tableData);

	Ti.App.addEventListener('myEvent', function(e) {
		tableData = null;
		tableView.data = tableData;
		tableView.setData([]);
		tableView.data = null;
		firstcall_list();
		//alert('test');

	});


	/*var backfav_img = Ti.UI.createImageView({
	image : Ti.App.resourceurl + 'images/fav_listbg.png',
	width : '97%',
	height : GetHeight(80),
	});
	scrollview_fav.add(backfav_img);*/

	//view_favour.add(tableView);

	return serach_bg;

}

//make constructor function the public component interface
module.exports = favouite_listview; 