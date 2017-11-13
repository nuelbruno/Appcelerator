function HeaderControle(title, backevent, share, search)
{
	
       var headerViewMyland = Ti.UI.createView({
		width : Ti.Platform.displayCaps.platformWidth,
		height :GetHeight(40),
		top : 0,
		// layout:'horizontal', //107FCC  //0A3A72,
		backgroundGradient : {
			type : 'linear',
			startPoint : {
				x : '50%',
				y : '0%'
			},
			endPoint : {
				x : '50%',
				y : '100%'
			},
			colors : ['#912d11', '#912e13']
		}
	   });
	   
	   //myland_view.add(headerViewMyland);
	   
	   
	   var Title_lable_header = Titanium.UI.createLabel({
			text : title,
			font : {
				fontSize : 16,
				fontFamily : Ti.App.fontName,
				fontWeight : "bold",
			},
			color : '#FFFFFFFF',
			textAlign : 'center',
			//left : GetWidth(3),
			width : '60%'
			
		});
		
		headerViewMyland.add(Title_lable_header);
		
		if(backevent == true)
		{
			var back_image= Titanium.UI.createLabel({
				text : '< Back',
				font : {
					fontSize : 16,
					fontFamily : Ti.App.fontName,
					//fontWeight : "bold",
				},
				color : '#FFFFFFFF',
				textAlign : 'left',
				left : GetWidth(3),
				width : '20%'
				
			});
			
			headerViewMyland.add(back_image);
		}	
		
		if(search == true)
		{
			var search_img= Titanium.UI.createImageView({
			image:'',
			width : '20%',
			right : GetWidth(3)
		    });
		   headerViewMyland.add(search_img);
		}

   return headerViewMyland;
}
module.exports = HeaderControle;