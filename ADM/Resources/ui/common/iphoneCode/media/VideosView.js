function VideosView(){
	var self = Ti.UI.createView({
		top:50,
		left:0,
		backgroundColor:Ti.App.DefaultBackGroundColor
	});
	
	//Ti.include(L('PictureGallery'));
	
	var videoGallery = PictureGallery.createWindow({
	    //images: Ti.App.TempVideoGalleryVideos,
	    isVideoGallery : true,
	   //title: 'pictures',
	    thumbGallery: {
	    numberOfColumnPortrait: 3,
	    numberOfColumnLandscape: 5,
	    thumbSize: 185,
	    thumbBorderColor: '#555',
	    thumbBorderWidth: 0,
	    thumbBackgroundColor: '#FFF',
	    backgroundColor: Ti.App.DefaultBackGroundColor
	  }
	});
	
	var Videonotlabel = Ti.UI.createLabel({
		text : Ti.App.LG('novideosavailable'),

		font : {
			fontSize : GetWidth(12),
			fontWeight : "bold",
		},
		color : '#000',
		textAlign : 'center',
		width : GetWidth(150),
		height : GetHeight(30)
	});
	self.add(Videonotlabel);

	
	
	
	self.add(videoGallery);
	
	return self;
};
module.exports = VideosView;
