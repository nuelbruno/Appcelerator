function toptab_myland(level, areaname, zoneName){
	var TopTabview = Ti.UI.createView({
		top:GetHeight(0),
		backgroundColor:'#f3f5eb',
		width:'100%',
		height:GetHeight(50),
		zIndex : 3,
		//borderColor:'red',
		layout:'Horizontal',
		left:0
	});
	
// ####### AREA VIEW ########### //
   var MyareaView = Ti.UI.createView({
		top : GetHeight(10),
		backgroundImage:'images/iphoneimages/tablike/area.png',
		width:GetWidth(100),
		height:GetHeight(30),
		layout:'Horizontal',
		left:GetWidth(10),
	});
	TopTabview.add(MyareaView);
	
	var Myarea_img = Ti.UI.createImageView({
		//image:'images/iphoneimages/tablike/area.png',
		width:GetWidth(20),
		left:GetWidth(3),
		height:GetHeight(20)	
	});
	MyareaView.add(Myarea_img);
	
	var areanametxt = Ti.App.LG('Area');
	
	var Lable_Myarea = Ti.UI.createLabel({
					text : (areaname.length > 1)? areaname : areanametxt,
					top:GetHeight(2),
					font : {
						fontSize : GetWidth(12),
						fontWeight : "bold",
					},
					color : '#666666',
					left:GetWidth(25),
					height:GetHeight(25)
				});
	MyareaView.add(Lable_Myarea);
	
	// ####### ZONE VIEW ########### //
	
	var MyZoneView = Ti.UI.createView({
		top : GetHeight(10),
		width:GetWidth(100),
		height:GetHeight(30),
		backgroundImage:'images/iphoneimages/tablike/zone.png',
		layout:'Horizontal',
		left:0
	});
	TopTabview.add(MyZoneView);
	
	var MyZone_img = Ti.UI.createImageView({
		//image:'images/iphoneimages/tablike/zone.png',
		width:GetWidth(20),
		left:GetWidth(3),
		height:GetHeight(20)	
	});
	MyZoneView.add(MyZone_img);
	
	var zonetextlang = Ti.App.LG('Zone');
	
	var Lable_MyZone = Ti.UI.createLabel({
					text : (zoneName.length > 1)? zoneName : zonetextlang,
					top:GetHeight(2),
					font : {
						fontSize : GetWidth(12),
						fontWeight : "bold",
					},
					color : '#666666',
					left:GetWidth(25),
					height:GetHeight(25)
				});
	MyZoneView.add(Lable_MyZone);

	
	// ####### PLOT VIEW ########### //
	
	var MyPlotView = Ti.UI.createView({
		top : GetHeight(10),
		width:GetWidth(100),
		height:GetHeight(30),
		backgroundImage:'images/iphoneimages/tablike/plot.png',
		layout:'Horizontal',
		left:0
	});
	TopTabview.add(MyPlotView);
	
	var MyPlot_img = Ti.UI.createImageView({
		//image:'images/iphoneimages/tablike/plot.png',
		width:GetWidth(20),
		left:GetWidth(3),
		height:GetHeight(20)	
	});
	MyPlotView.add(MyPlot_img);
	
	var Lable_MyPlot = Ti.UI.createLabel({
					text : Ti.App.LG('Plot'),
					top:GetHeight(2),
					font : {
						fontSize : GetWidth(12),
						fontWeight : "bold",
					},
					color : '#666666',
					left:GetWidth(25),
					height:GetHeight(25)
				});
	MyPlotView.add(Lable_MyPlot);		
	
	if(level == 1)
	{
	   MyareaView.backgroundImage = 'images/iphoneimages/tablike/area_active.png';
	}
	if(level == 2)
	{
	   MyareaView.backgroundImage = 'images/iphoneimages/tablike/tab.png';
	   MyZoneView.backgroundImage = 'images/iphoneimages/tablike/zone_active.png';	
	}		
	
	
	
	return TopTabview;
};
module.exports =toptab_myland;