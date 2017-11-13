function Mymapwindow() {
	var self = Ti.UI.createWindow({
		barImage : Ti.App.ResourcePath + L('top_bar'),
		navBarHidden:true,
		tabBarHidden: true ,
		title : 'My Land',
		backButtonTitle:'Back',
		backgroundColor : Ti.App.DefaultBackGroundColor
	});
	
	
	
	


	// alert(Ti.App.areaname +' - ' + Ti.App.zoneName + ' - '+ Ti.App.plotName); alert('set');

	var self_view = Ti.UI.createView({
		top : 0,
		width : '100%',
		left : 0,
		//layout:'vertical'
	});
	
	
	Ti.App.SetTitleView(self,self_view, 'Myland' , 0, 1);

	// ####### AREA VIEW ########### //
	var MymapView = Ti.UI.createView({
		top : 0,
		backgroundColor : '#f3f5eb',
		width : '100%',
		height : GetHeight(40),
		left : GetWidth(0),
		//borderColor:'red',
		layout : 'Horizontal'
	});
	self_view.add(MymapView);

	var twotabView = Ti.UI.createView({
		top : GetHeight(5),
        left : GetWidth(8),
		width : GetWidth(300),
		height : GetHeight(30),
		borderColor : '#8a2008',
		borderRadius : 5,
		borderWidth : 1,
		layout : 'Horizontal'
		//left:GetWidth(10),
	});
	MymapView.add(twotabView);

	var Map_Tab = Ti.UI.createLabel({
		text : Ti.App.LG('Map'),

		font : {
			fontSize : GetWidth(12),
			fontWeight : "bold",
		},
		color : '#000',
		textAlign : 'center',
		width : GetWidth(150),
		height : GetHeight(30)
	});
	twotabView.add(Map_Tab);

	var Detail_Tab = Ti.UI.createLabel({
		text : Ti.App.LG('Details'),
		backgroundColor : '#8a1d04',
		font : {
			fontSize : GetWidth(12),
			fontWeight : "bold",
		},
		color : '#000',
		textAlign : 'center',
		width : GetWidth(150),
		height : GetHeight(30)
	});
	twotabView.add(Detail_Tab);

	var detailView;

	var mapView;

	var detailView = details_show_View(detailView);

	self_view.add(detailView);

	detailView.show();

	var mapView = map_show_View(mapView);

	self_view.add(mapView);

	mapView.hide();

	Map_Tab.addEventListener('click', function(e) {

		mapView.show();

		detailView.hide();
		
		self.orientationModes = [ 
		 Ti.UI.PORTRAIT,
         Titanium.UI.LANDSCAPE_LEFT,
         Ti.UI.LANDSCAPE_RIGHT
       
        ];
        
       (Ti.App.ViewTab == undefined) ? '':Ti.App.ViewTab.hide();
	   (Ti.App.ViewTabSet == undefined) ? '':Ti.App.ViewTabSet.hide();

		Map_Tab.color = '#FFFFFF';
		Detail_Tab.color = '#000000';

		Detail_Tab.backgroundColor = '#f3f5eb';
		Map_Tab.backgroundColor = '#8a1d04';
	});

	Detail_Tab.addEventListener('click', function(e) {

		mapView.hide();

		detailView.show();
		
		(Ti.App.ViewTab == undefined) ? '':Ti.App.ViewTab.show();
		(Ti.App.ViewTabSet == undefined) ? '':Ti.App.ViewTabSet.show();
		
		self.orientationModes = [ 
		 Ti.UI.PORTRAIT
        ];

		Map_Tab.color = '#000000';
		Detail_Tab.color = '#FFFFFF';

		Map_Tab.backgroundColor = '#f3f5eb';
		Detail_Tab.backgroundColor = '#8a1d04';
	});

	// #############   FUNCTION FOR BOTH DETAILS VIEW AND MAP VIEW ############# //
	function map_show_View(mapView) {
		
		
		
		mapView = Ti.UI.createView({
			top : GetHeight(45),
			left : GetWidth(0),
			//right : GetWidth(7),
			//borderColor:'red',
			//layout:'Horizontal'
		});

		//var webview_map = Titanium.UI.createWebView({url:'http://www.arcgis.com/home/webmap/viewer.html?url=http://gis.adm.gov.ae/sddgisms/rest/services/MyLand_ZoneSectorPlot/MapServer?layers=show:0,1,2',
		//     top:GetHeight(45)});

		var webview_map = Titanium.UI.createWebView({
			url : Ti.App.ClassPath+'/myland/esrimap.html', 
		});
		
		webview_map.scalesPageToFit = false;

		mapView.add(webview_map);

		webview_map.addEventListener('load', function() {
			var data = {
				plotnumber : Ti.App.plotName,
				sectorname : Ti.App.zoneName
			    };

			webview_map.evalJS("passMap_data('" + JSON.stringify(data) + "');");
			
			
		});

		return mapView;
	}

	// #############   FUNCTION FOR BOTH DETAILS VIEW AND MAP VIEW ############# //
	function details_show_View(detailView) {
		detailView = Ti.UI.createView({
			top : GetHeight(35),
			left : GetWidth(7),
			navBarHidden:true,
		    tabBarHidden: true ,
			//borderColor:'red',
			//layout:'Horizontal'
		});

		var content_view = Ti.UI.createView({
			top : GetHeight(20),
			left : GetWidth(7),
			//borderColor:'red',
			layout : 'vertical'
		});

		detailView.add(content_view);

		var areaName = Ti.UI.createLabel({
			text :  Ti.App.LG('AreaName'),
			top : GetHeight(5),
			font : {
				fontSize : GetWidth(12),
				fontWeight : "bold",
			},
			color : '#999999',
			textAlign : Ti.App.textAlign,
			width : '90%'
		});
		content_view.add(areaName);

		var areaName_val = Ti.UI.createLabel({
			text : Ti.App.areaname,
			top : GetHeight(5),
			font : {
				fontSize : GetWidth(12),
				fontWeight : "bold",
			},
			color : '#666666',
			textAlign : Ti.App.textAlign,
			width : '90%'
		});
		content_view.add(areaName_val);

		var zoneName = Ti.UI.createLabel({
			text : Ti.App.LG('ZoneName'),
			top : GetHeight(10),
			font : {
				fontSize : GetWidth(12),
				fontWeight : "bold",
			},
			color : '#999999',
			textAlign : Ti.App.textAlign,
			width : '90%'
		});
		content_view.add(zoneName);

		var zoneName_val = Ti.UI.createLabel({
			text : Ti.App.zoneName,
			top : GetHeight(5),
			font : {
				fontSize : GetWidth(12),
				fontWeight : "bold",
			},
			color : '#666666',
			textAlign : Ti.App.textAlign,
			width : '90%'
		});
		content_view.add(zoneName_val);

		var plotnumber = Ti.UI.createLabel({
			text : Ti.App.LG('PlotName'),
			top : GetHeight(10),
			font : {
				fontSize : GetWidth(12),
				fontWeight : "bold",
			},
			color : '#999999',
			textAlign : Ti.App.textAlign,
			width : '90%'
		});
		content_view.add(plotnumber);

		var plotnumber_val = Ti.UI.createLabel({
			text : Ti.App.plotName,
			top : GetHeight(5),
			font : {
				fontSize : GetWidth(12),
				fontWeight : "bold",
			},
			color : '#666666',
			textAlign : Ti.App.textAlign,
			width : '90%'
		});
		content_view.add(plotnumber_val);
		
		var HttpManager = require(L('HttpManager'));
	    var httpManager = new HttpManager();

		var httpManager = httpManager.webserMapfinal(Ti.App.plotName,Ti.App.zoneName , function(e) { //alert(e);
			details_Item = e;
			show_finalmapdetails();
		});
		
		function show_finalmapdetails() {
			
			Ti.API.info("mainlanduseage-------"+ details_Item.item(0).getElementsByTagName('a:MAIN_LANDUSE_ENG').item(0).text);
			Ti.API.info("sublanduage-------"+ details_Item.item(0).getElementsByTagName('a:SUB_LANDUSE_ENG').item(0).text);
			Ti.API.info("bru-------"+details_Item.item(0).getElementsByTagName('a:AreaSQRM').item(0).text);
		  
		 var Areasqkm =  details_Item.item(0).getElementsByTagName('a:AreaSQRM').item(0).text;
		 var mainlandusage =  details_Item.item(0).getElementsByTagName('a:MAIN_LANDUSE_ENG').item(0).text;
		 
		 var areasqfeet = Areasqkm * 10.764;
		 
		 // alert(Areasqkm);
		 
		 var areasql = Ti.UI.createLabel({
			text : Ti.App.LG('LandAreaSQM'),
			top : GetHeight(10),
			font : {
				fontSize : GetWidth(12),
				fontWeight : "bold",
			},
			color : '#999999',
			textAlign : Ti.App.textAlign,
			width : '90%'
		});
		content_view.add(areasql);

		var areasq_value = Ti.UI.createLabel({
			text : Areasqkm,
			top : GetHeight(5),
			font : {
				fontSize : GetWidth(12),
				fontWeight : "bold",
			},
			color : '#666666',
			textAlign : Ti.App.textAlign,
			width : '90%'
		});
		content_view.add(areasq_value);
		
		var feetareasq = Ti.UI.createLabel({
			text : Ti.App.LG('LandAreaSQF'),
			top : GetHeight(10),
			font : {
				fontSize : GetWidth(12),
				fontWeight : "bold",
			},
			color : '#999999',
			textAlign : Ti.App.textAlign,
			width : '90%'
		});
		content_view.add(feetareasq);

		var feetareasq_value = Ti.UI.createLabel({
			text : areasqfeet,
			top : GetHeight(5),
			font : {
				fontSize : GetWidth(12),
				fontWeight : "bold",
			},
			color : '#666666',
			textAlign : Ti.App.textAlign,
			width : '90%'
		});
		content_view.add(feetareasq_value);
		
		var mainland = Ti.UI.createLabel({
			text :  Ti.App.LG('Usage'),
			top : GetHeight(10),
			font : {
				fontSize : GetWidth(12),
				fontWeight : "bold",
			},
			color : '#999999',
			textAlign : Ti.App.textAlign,
			width : '90%'
		});
		content_view.add(mainland);

		var mainland_value = Ti.UI.createLabel({
			text : mainlandusage,
			top : GetHeight(5),
			font : {
				fontSize : GetWidth(12),
				fontWeight : "bold",
			},
			color : '#666666',
			textAlign : Ti.App.textAlign,
			width : '90%'
		});
		content_view.add(mainland_value);
		
		
		
		}	

		return detailView;
	}


	self.add(self_view);

	return self;
};
module.exports = Mymapwindow;
