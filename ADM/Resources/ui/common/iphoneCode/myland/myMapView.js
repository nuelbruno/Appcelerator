function MymapView_plot(level){
	
	
  // alert(Ti.App.areaname +' - ' + Ti.App.zoneName + ' - '+ Ti.App.plotName); alert('set');
   
   var self = Ti.UI.createView({
		top:0,
		width:'100%',
		left:0,
		//layout:'vertical'
	});
	
// ####### AREA VIEW ########### //
   var MymapView = 	Ti.UI.createView({
		top:0,
		backgroundColor:'#f3f5eb',
		width:'100%',
		height:GetHeight(40),
		left:GetWidth(7),
		//borderColor:'red',
		layout:'Horizontal'
	});
	self.add(MymapView);
	
	var twotabView = Ti.UI.createView({
		top:GetHeight(5),
		
		width:GetWidth(300),
		height:GetHeight(30),
		borderColor:'#8a2008',
		borderRadius:5,
		borderWidth:1,
		layout:'Horizontal'
		//left:GetWidth(10),
	});
	MymapView.add(twotabView);
	
	var Map_Tab = Ti.UI.createLabel({
					text : 'Map',
					
					font : {
						fontSize : GetWidth(12),
						fontWeight : "bold",
					},
					color : '#000',
					textAlign:'center',
					width:GetWidth(150),
					height:GetHeight(30)
				});
	twotabView.add(Map_Tab);
	
	var Detail_Tab = Ti.UI.createLabel({
					text : 'Details',
					backgroundColor:'#8a1d04',
					font : {
						fontSize : GetWidth(12),
						fontWeight : "bold",
					},
					color : '#000',
					textAlign:'center',
					width:GetWidth(150),
					height:GetHeight(30)
				});
	twotabView.add(Detail_Tab);
	
	var detailView ;
	
	var mapView;
	
	var detailView = details_show_View(detailView);
	
	self.add(detailView);
	
	detailView.show();
	
	var mapView = map_show_View(mapView);
	
	self.add(mapView);
	
	mapView.hide();
	
	Map_Tab.addEventListener('click',function(e){

		mapView.show()
	    
	    detailView.hide();
	    
	    Detail_Tab.backgroundColor ='#f3f5eb';
	    Map_Tab.backgroundColor ='#8a1d04';
	});	
	
	
	Detail_Tab.addEventListener('click',function(e){
		
		mapView.hide()
	    
	    detailView.show();
	    
	    Map_Tab.backgroundColor ='#f3f5eb';
	    Detail_Tab.backgroundColor ='#8a1d04';
	});	

// #############   FUNCTION FOR BOTH DETAILS VIEW AND MAP VIEW ############# //	
	function map_show_View(mapView)
	{
			  mapView = Ti.UI.createView({
					top:GetHeight(35),
					left:GetWidth(7),
					//borderColor:'red',
					//layout:'Horizontal'	
		            });
		            
		       var mapname = Ti.UI.createLabel({
					text : 'mapView',
					
					font : {
						fontSize : GetWidth(12),
						fontWeight : "bold",
					},
					color : '#000',
					textAlign:'left',
					width:'90%'
				});
	            mapView.add(mapname);      
		            
		      return  mapView;     
	}
// #############   FUNCTION FOR BOTH DETAILS VIEW AND MAP VIEW ############# //	
	function details_show_View(detailView)
	{
		  detailView = Ti.UI.createView({
					top:GetHeight(35),
					left:GetWidth(7),
					//borderColor:'red',
					//layout:'Horizontal'	
		            });
		            
		var areaName = Ti.UI.createLabel({
					text : 'Area Name',
					
					font : {
						fontSize : GetWidth(12),
						fontWeight : "bold",
					},
					color : '#000',
					textAlign:'left',
					width:'90%'
				});
	     detailView.add(areaName);            
		
		return detailView;
	}
	


  return self;

};
module.exports = MymapView_plot;