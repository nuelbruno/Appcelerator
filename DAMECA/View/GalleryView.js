Ti.include(Ti.App.getResourceFile('Model/GalleryModel.js'));
Ti.include('GalleryDetailView.js');
var getGalleryView = function(App){
	var dataArray = [];
	var NewsView = Ti.App.customViews.createCustomTabViews({width:'100%',height:'100%',top:0,layout:'horizontal'},Ti.App.L('gallery'));
	function receivedDataFromServer(data) // need {id:'any_id', data:'xml'}
	{
		if(data!=undefined && data.data!=undefined)
		{
			var xml = data.data;
			Ti.API.info(data.data);
			
			var nodeList = xml.getElementsByTagName('s:Envelope').item(0).getElementsByTagName('s:Body').item(0).getElementsByTagName('GetMediaGalleryByCategoryUniqueNameResponse').item(0).getElementsByTagName('GetMediaGalleryByCategoryUniqueNameResult').item(0).getElementsByTagName('a:MediaGalleryView');
			// alert(nodeList.length);
			if(nodeList.length>0)
			{
				var scrollView = Ti.UI.createScrollView({
					top:0,
					left:0,
					right:0,
					bottom:0,
					contentHeight:Ti.UI.SIZE,
					contentWidth:Ti.Platform.displayCaps.platformWidth
				});
				var contentView = Ti.UI.createView({
					width:Ti.Platform.displayCaps.platformWidth,
					height:Ti.UI.SIZE,
					layout:'horizontal',
					top:0
				});
				for(var i=0;i<nodeList.length;i++)
				{
					var imagePath = nodeList.item(i).getElementsByTagName('MainImage').item(0).text;
					// alert(imagePath);
					var title = nodeList.item(i).getElementsByTagName('a:Title').item(0).text;
				
					var thumbnailView = Ti.UI.createView({
						width : Ti.Platform.displayCaps.platformWidth/3-1.3,
						height : (Ti.Platform.displayCaps.platformWidth/3-1.3)*98/83,
						left :1,
						top:1,
						imagePath:imagePath,
						text:title
						// backgroundImage:encodeURI(imagePath)
					});
					// alert(imagePath);
					
					var imageView = Ti.UI.createView({
						// image:'http://www.dmca.ae/'+imagePath,
						backgroundImage:('http://www.dmca.ae/'+imagePath),
						width:'100%',
						height:'100%',
						touchEnabled:false
					});
					// thumbnailView.imagePath = imagePath;
					
					var label = Ti.UI.createLabel({
						backgroundImage:Ti.App.getResourceFile('images/Common/MediaListTransparentEffect.png'),
						text:' '+title,
						height:'15%',
						color:'white',
						// color:'black',
						bottom:0,
						left:0,
						right:0,
						touchEnabled:false,
						font: {fontSize:'12sp',fontWeight:'bold'}
					});
					
					thumbnailView.add(imageView);
					thumbnailView.add(label);
					thumbnailView.addEventListener('click',function(e){
						var win2 = getGalleryDetailView(App, {image:e.source.imagePath, text : e.source.text});
						win2.open();
					});
					contentView.add(thumbnailView);
				}
				scrollView.add(contentView);
				NewsView.add(scrollView);
			}
		}
	};
	NewsView.reload = function(){
		getGalleryParameters(App,receivedDataFromServer);
	};
	return NewsView;
};