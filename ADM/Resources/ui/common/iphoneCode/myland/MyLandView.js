function MyLandView(level, areaname, zoneName) {
	var self = Ti.UI.createView({
		top : 0,
		left : 0,
		right : 0
	});

	//alert(level);
	// ############ MY LAND TOP TAB BAR LIKE UI ################# //

	var Toptab_View = require(Ti.App.ClassPath + L('toptab_myland'));
	var Toptab_View = new Toptab_View(level, areaname, zoneName);
	self.add(Toptab_View);

	// ##########  LISTING OF ALL VIEWS IN TAB ################ //
	var section = Ti.UI.createListSection();

	//alert(get_id);
	// var webserviceLand = require(Ti.App.ClassPath + L('webserviceLand'));
	// var webserviceLand = new webserviceLand();
	// Ti.API.info(webserviceLand);
	// self.add(Toptab_View);
	var HttpManager = require(L('HttpManager'));
	var httpManager = new HttpManager();

	// now assign that array to the table's data property to add those objects as rows

	// alternatively, you could do
	
	

	if (level == 0) {
		var httpManager = httpManager.webserviceMyland(function(e) {
			curentItem = e;
			show_Myland();
		});
		function show_Myland() {
			
			
			//alert(curentItem.length); alert(curentItem.length);
			var sections = [];
			
			

			var search_fld_area = Titanium.UI.createSearchBar({
				showCancel : false,
				visible:false,
				//opacity:0,
               // autocorrect:false,
				barColor : '#f3f5eb',
				backgroundImage : 'none',
				backgroundColor:'#f3f5eb',
				filterAttribute : 'widgetname',
				width : "100%",
				height : GetHeight(40),
				zIndex : 3,
				top : GetHeight(5),
				left : GetWidth(0)
			});
			
			Ti.App.addEventListener('event_one', function(e) { 
			    // alert(e.name);  // logs 'bar'
			     search_fld_area.visible = true;
			     search_fld_area.blur();
			});

			self.add(search_fld_area);

			search_fld_area.addEventListener('return', function(e) {

				if (!Titanium.Network.online) {
					alert("You need an intrnet connection to search for books.");
				} else if (e.value.length >= 3) {

				}
				else {
					alert("Please use minimum 3 characters to search.");
				}
			});
			search_fld_area.addEventListener('cancel', function(e) {
			    search_fld_area.visible = false;
			});
			
			var table = Titanium.UI.createTableView({
				top : GetHeight(10),
				left : GetWidth(10),
				right : GetWidth(10),
				showVerticalScrollIndicator: false,
				//borderColor:'red',
				search : search_fld_area,
				filterAttribute : 'areaname',
				backgroundColor : Ti.App.DefaultBackGroundColor
			});
			for (var i = 0; i < curentItem.length; i++) {
				/*sections.push({
				 template:'template',
				 title: {text:curentItem.item(i).text},
				 properties : {
				 itemId:curentItem.item(i).text,
				 accessoryType: Ti.UI.LIST_ACCESSORY_TYPE_NONE
				 }
				 });*/
				if(Ti.App.LanguageId == 1){
					
					var imageArr = 'rightImage';
					
				}
				var row = Titanium.UI.createTableViewRow({
					//title : curentItem.item(i).text,
					//left: 100,
					width:'100%',
					//imageArr :'images/iphoneimages/common/listing_arrow.png',
					
					itemId : curentItem.item(i).text,
					areaname : curentItem.item(i).text			
				});
				
				var title_row = Titanium.UI.createLabel({
		            text: curentItem.item(i).text,
		            font:{fontSize:16,fontWeight:'bold'},
		            width:'100%',
		            textAlign:Ti.App.textAlign,
		            color:Ti.App.DescriptionFontColor,
					font:{ fontSize: Ti.App.SmallFontSize, fontWeight:'bold' },
		            height:GetWidth(40)
		        });
		        
				
				if(Ti.App.LanguageId == 1)
				{
					row.rightImage = 'images/iphoneimages/common/listing_arrow.png';
				}else
				{
					row.leftImage = 'images/iphoneimages/common/listing_arrow_ar.png';
				}
		        
		        
		        
		        row.add(title_row);

				table.appendRow(row);
			}

			table.addEventListener('click', function(e) {

				//alert(e.rowData.title+' '+ e.rowData.itemId);
				Ti.App.areaname = e.rowData.itemId;

				self.fireEvent('listItemSelected', {
					module : 'zoneSelect',
					areaname : e.rowData.itemId,
					itemid : e.rowData.itemId,
					id : e.rowData.itemId
				});
			});

			self.add(table);
		}

	} else if (level == 1) {
		var httpManager = httpManager.webserviceMyzone(areaname, function(e) {//alert(e.length);
			curentItem = e;
			show_Myzone();
		});
		function show_Myzone() {

			var search_fld_area_zone = Titanium.UI.createSearchBar({
				showCancel : true,
				visible:false,
				barColor : '#f3f5eb',
				filterAttribute : 'widgetname',
				width : "100%",
				height : GetHeight(40),
				zIndex : 5,
				top :  GetHeight(5),
				left : GetWidth(0)
			});

			self.add(search_fld_area_zone);

			Ti.App.addEventListener('event_one', function(e) { 
			    // alert(e.name);  // logs 'bar'
			     search_fld_area_zone.visible = true;
			     search_fld_area_zone.blur();
			});


			search_fld_area_zone.addEventListener('return', function(e) {

				if (!Titanium.Network.online) {
					alert("You need an intrnet connection to search for books.");
				} else if (e.value.length >= 3) {

				}
				else {
					alert("Please use minimum 3 characters to search.");
				}
			});
			search_fld_area_zone.addEventListener('cancel', function(e) {
			    search_fld_area_zone.visible = false;
			});
			search_fld_area_zone.addEventListener('click', function(e) {
			    search_fld_area_zone.visible = false;
			});
			
			var table = Titanium.UI.createTableView({
				top : GetHeight(10),
				left : GetWidth(10),
				right : GetWidth(10),
				showVerticalScrollIndicator: false,
				search : search_fld_area_zone,
				filterAttribute : 'zonename',
				backgroundColor : Ti.App.DefaultBackGroundColor
			});
			for (var i = 0; i < curentItem.length; i++) {
				var row = Titanium.UI.createTableViewRow({
					//title : curentItem.item(i).text,
					//rightImage :'images/iphoneimages/common/listing_arrow.png',
					itemId : curentItem.item(i).text,
					zonename : curentItem.item(i).text
					
				});
				
				var title_row = Titanium.UI.createLabel({
		            text: curentItem.item(i).text,
		            font:{fontSize:16,fontWeight:'bold'},
		            width:'100%',
		            textAlign:Ti.App.textAlign,
		            color:Ti.App.DescriptionFontColor,
					font:{ fontSize: Ti.App.SmallFontSize, fontWeight:'bold' },
		            height:GetWidth(40)
		        });
		        
				
				if(Ti.App.LanguageId == 1)
				{
					row.rightImage = 'images/iphoneimages/common/listing_arrow.png';
				}else
				{
					row.leftImage = 'images/iphoneimages/common/listing_arrow_ar.png';
				}
				 row.add(title_row);

				table.appendRow(row);
			}

			table.addEventListener('click', function(e) {

				//alert(e.rowData.title+' '+ e.rowData.itemId);
				Ti.App.zoneName = e.rowData.itemId;

				self.fireEvent('listItemSelected', {
					module : 'sectorSelect',
					zoneName : e.rowData.itemId,
					areaname : areaname,
					itemid : e.rowData.itemId,
					id : e.rowData.itemId
				});
			});

			self.add(table);

		}

	} else if (level == 2) {
		var httpManager = httpManager.webserviceMyplot(zoneName, function(e) {
			curentItem = e;
			show_Myplot();
		});
		function show_Myplot() {
			
			var search_fld_plot = Titanium.UI.createSearchBar({
				showCancel : true,
				visible:false,
				barColor : '#f3f5eb',
				filterAttribute : 'widgetname',
				width : "100%",
				height : GetHeight(40),
				zIndex : 5,
				top :  GetHeight(5),
				left : GetWidth(0)
			});

			self.add(search_fld_plot);

			Ti.App.addEventListener('event_one', function(e) { 
			    // alert(e.name);  // logs 'bar'
			     search_fld_plot.visible = true;
			     search_fld_plot.blur();
			});

			self.add(search_fld_plot);

			search_fld_plot.addEventListener('return', function(e) {

				if (!Titanium.Network.online) {
					alert("You need an intrnet connection to search for books.");
				} else if (e.value.length >= 3) {

				}
				else {
					alert("Please use minimum 3 characters to search.");
				}
			});
			search_fld_plot.addEventListener('cancel', function(e) {
			    search_fld_plot.visible = false;
			});
			search_fld_plot.addEventListener('click', function(e) {
			    search_fld_plot.visible = false;
			});
			
			var table = Titanium.UI.createTableView({
				top : GetHeight(10),
				left : GetWidth(10),
				right : GetWidth(10),
				showVerticalScrollIndicator: false,
				search : search_fld_plot,
				filterAttribute : 'plotname',
				backgroundColor : Ti.App.DefaultBackGroundColor
			});
			for (var i = 0; i < curentItem.length; i++) {
				var row = Titanium.UI.createTableViewRow({
					//title : curentItem.item(i).text,
					//rightImage :'images/iphoneimages/common/listing_arrow.png',
					itemId : curentItem.item(i).text,
					plotname : curentItem.item(i).text
					
				});
				
				var title_row = Titanium.UI.createLabel({
		            text: curentItem.item(i).text,
		            font:{fontSize:16,fontWeight:'bold'},
		            width:'100%',
		            textAlign:Ti.App.textAlign,
		            color:Ti.App.DescriptionFontColor,
					font:{ fontSize: Ti.App.SmallFontSize, fontWeight:'bold' },
		            height:GetWidth(40)
		        });
		        
				
				if(Ti.App.LanguageId == 1)
				{
					row.rightImage = 'images/iphoneimages/common/listing_arrow.png';
				}else
				{
					row.leftImage = 'images/iphoneimages/common/listing_arrow_ar.png';
				}
				 row.add(title_row);


				table.appendRow(row);
			}

			table.addEventListener('click', function(e) {

				//alert(e.rowData.title+' '+ e.rowData.itemId);
				Ti.App.plotName = e.rowData.itemId;

				self.fireEvent('listItemSelected', {
					module : 'plotSelected',
					plotName : e.rowData.itemId,
					areaname : areaname,
					zoneName : zoneName,
					areaname : areaname,
					itemid : e.rowData.itemId,
					id : e.rowData.itemId
				});
			});

			self.add(table);

		}

	}

	return self;

};
module.exports = MyLandView; 