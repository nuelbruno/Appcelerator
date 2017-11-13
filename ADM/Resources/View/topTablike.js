function toptab_myland(level){
	var TopTabview = Ti.UI.createView({
		top:0,
		backgroundColor:'#f3f5eb',
		width:'100%',
		height:GetHeight(40),
		//borderColor:'red',
		layout:'Horizontal',
		left:0
	});
	
// ####### AREA VIEW ########### //
   var MyareaView = 	Ti.UI.createView({
		top:0,
		backgroundColor:'red',
		width:GetWidth(100),
		height:GetHeight(30),
		layout:'Horizontal',
		left:GetWidth(10),
	});
	TopTabview.add(MyareaView);
	
	var Myarea_img = Ti.UI.createImageView({
		image:'',
		width:GetWidth(20),
		left:GetWidth(3),
		height:GetHeight(20)	
	});
	MyareaView.add(Myarea_img);
	
	var Lable_Myarea = Ti.UI.createLabel({
					text : 'AREA',
					font : {
						fontSize : GetWidth(12),
						fontWeight : "bold",
					},
					color : '#000',
					left:GetWidth(25),
					height:GetHeight(25)
				});
	MyareaView.add(Lable_Myarea);
	
	// ####### ZONE VIEW ########### //
	
	var MyZoneView = Ti.UI.createView({
		top:0,
		width:GetWidth(100),
		height:GetHeight(30),
		backgroundColor:'blue',
		layout:'Horizontal',
		left:0
	});
	TopTabview.add(MyZoneView);
	
	var MyZone_img = Ti.UI.createImageView({
		image:'',
		width:GetWidth(20),
		left:GetWidth(3),
		height:GetHeight(20)	
	});
	MyZoneView.add(MyZone_img);
	
	var Lable_MyZone = Ti.UI.createLabel({
					text : 'ZONE',
					font : {
						fontSize : GetWidth(12),
						fontWeight : "bold",
					},
					color : '#000',
					left:GetWidth(25),
					height:GetHeight(25)
				});
	MyZoneView.add(Lable_MyZone);

	
	// ####### PLOT VIEW ########### //
	
	var MyPlotView = Ti.UI.createView({
		top:0,
		width:GetWidth(100),
		height:GetHeight(30),
		backgroundColor:'green',
		layout:'Horizontal',
		left:0
	});
	TopTabview.add(MyPlotView);
	
	var MyPlot_img = Ti.UI.createImageView({
		image:'',
		width:GetWidth(20),
		left:GetWidth(3),
		height:GetHeight(20)	
	});
	MyPlotView.add(MyPlot_img);
	
	var Lable_MyPlot = Ti.UI.createLabel({
					text : 'PLOT',
					font : {
						fontSize : GetWidth(12),
						fontWeight : "bold",
					},
					color : '#000',
					left:GetWidth(25),
					height:GetHeight(25)
				});
	MyPlotView.add(Lable_MyPlot);		
	
	if(level == 1)
	{
	   MyareaView.backgroundColor = 'white';	
	}
	if(level == 2)
	{
	   MyareaView.backgroundColor = 'white';
	   MyZoneView.backgroundColor = 'white';	
	}		
	
	
	
	return TopTabview;
};
module.exports =toptab_myland;