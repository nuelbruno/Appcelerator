function LandingviewCode() {

	var landing_view = Ti.UI.createView({
		//backgroundColor:'#ffffff'
		width : '100%',
		bottom : GetWidth(50),
		zIndex : 3
	});
	
	var HomeView = Ti.UI.createView({
		//backgroundColor:'#ffffff'
		width : '100%',
		//bottom : GetWidth(50),
		backgroundImage : Ti.App.imagePath + '1_splash.jpg',
		zIndex : 4
	});
	
	landing_view.add(HomeView);
	
	//  ###########   MEDIA  CONTROLE ################# //

	var MediaImage = Ti.UI.createImageView({
		backgroundColor : 'blue',
		left : GetWidth(5),
		top : GetHeight(130),
		width : GetWidth(210),
		height : GetHeight(90),

	})
	HomeView.add(MediaImage);
	
	var MediaCode = require(Ti.App.getcommonjsPath('View/Media'));

	var MediaCode = new MediaCode();
	
	MediaImage.addEventListener('click',function(e){
	   
	    HomeView.hide();
	     // landing_view.remove(HomeView); 	
		landing_view.add(MediaCode);
	});	
	
	//  ###########   SERVICE  CONTROLE ################# //
	
	var ServiceView = Ti.UI.createImageView({
		backgroundColor : 'green',
		left : GetWidth(5),
		top : GetHeight(225),
		width : GetWidth(102),
		height : GetHeight(90),

	})
	HomeView.add(ServiceView);
	
	var ServiceCode = require(Ti.App.getcommonjsPath('View/ServicesView'));

	var ServiceCode = new ServiceCode();
	
	ServiceView.addEventListener('click',function(e){
	   
	    landing_view.remove(HomeView); 	
		landing_view.add(ServiceCode);
	});
	
	//  ###########   SOCIAL MEDIA CONTROLE ################# //
	
	var SocailMediaView = Ti.UI.createImageView({
		backgroundColor : 'green',
		left : GetWidth(113),
		top : GetHeight(225),
		width : GetWidth(102),
		height : GetHeight(90),

	})
	HomeView.add(SocailMediaView);
	
	var SocailMediaCode = require(Ti.App.getcommonjsPath('View/SocialmediaView'));

	var SocailMediaCode = new SocailMediaCode();
	
	SocailMediaView.addEventListener('click',function(e){
	   
	    landing_view.remove(HomeView); 	
		landing_view.add(SocailMediaCode);
	});
	
	//  ###########   MY LAND VIEW CONTORLE ################# //
	
	var animateLeft = Ti.UI.createAnimation({
    left: GetWidth(0),
    //width:'100%',
    //height:'100%',
   // curve: Ti.UI.iOS.ANIMATION_CURVE_EASE_OUT,
    duration: 300
	});
	var animateRight    = Ti.UI.createAnimation({
	    right: GetWidth(320),
	   // width:'100%',
	   // height:'100%',
	    
	   // curve: Ti.UI.iOS.ANIMATION_CURVE_EASE_OUT,
	    duration: 300
	});
	
	var MyLandView = Ti.UI.createImageView({
		backgroundColor : 'pink',
		left : GetWidth(220),
		top : GetHeight(130),
		width : GetWidth(95),
		height : GetHeight(185),

	})
	HomeView.add(MyLandView);
	
	var MylandCode = require(Ti.App.getcommonjsPath('View/MylandView'));

	var MylandCode = new MylandCode();
	
    var zoneSelect = require(Ti.App.getcommonjsPath('Model/zoneSelect'));

	var zoneSelect = new zoneSelect();
	
	//zoneSelect.hide();
	
	var plotSelected = require(Ti.App.getcommonjsPath('Model/plotSelected'));

	var plotSelected = new plotSelected();
	
	var MymapView = require(Ti.App.getcommonjsPath('Model/MapviewLand'));

	var MymapView = new MymapView();
	
	MyLandView.addEventListener('click',function(e){
	    // HomeView.hide();
	    // landing_view.remove(HomeView); 	
		//landing_view.add(MylandCode);
		
		HomeView.animate(animateRight);
		animateRight.addEventListener('complete', function() {  
			 HomeView.right=0;
			 HomeView.hide();
		});
        
		//landing_view.animate(animateLeft);
		landing_view.add(MylandCode);
	     
		
		
		//alert(JSON.stringify(MylandCode.children[1]));
	});
	
	MylandCode.children[0].children[1].addEventListener('click',function(e){ //alert('back select area');
		  
		     HomeView.show();
	         landing_view.remove(MylandCode);
	         
	});
	zoneSelect.children[0].children[1].addEventListener('click',function(e){ //alert('back select area');
		  
		     
	         landing_view.remove(zoneSelect);
	         landing_view.add(MylandCode);
	         
	});
	plotSelected.children[0].children[1].addEventListener('click',function(e){ //alert('back select area');
		  
		     
	         landing_view.remove(plotSelected);
	         landing_view.add(zoneSelect);
	});
	MymapView.children[0].children[1].addEventListener('click',function(e){ //alert('back select area');
		  
		     
	         landing_view.remove(MymapView);
	         landing_view.add(plotSelected);
	});
	
	landing_view.addEventListener('listItemSelected',function(e){ //alert('test lnd');
	    	
	    	   //landing_view.animate(animateRight);
		        
		        
	    	   
	    	    var id = e.id;
		        var module=e.module;
		        if(module == 'zoneSelected')
		        {

			        landing_view.add(zoneSelect);
			        landing_view.remove(MylandCode);
			        /*landing_view.animate({
					   view:zoneSelect,
					   transition:Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
					});
					landing_view.add(zoneSelect); 
			        
				    landing_view.remove(MylandCode);*/
			        
			       
			    }
			    else if(module == 'plotSelected')
			    {
			    	
			    	landing_view.remove(zoneSelect);
			        landing_view.add(plotSelected);
			       
			    }  
			    else if(module == 'mapShow')
			    {
			    	
			    	landing_view.remove(plotSelected);
			        landing_view.add(MymapView);
			       
			    }    
	    	 
	});
	
	//##############

	Ti.App.LandView = landing_view;

	return landing_view;
}

module.exports = LandingviewCode; 