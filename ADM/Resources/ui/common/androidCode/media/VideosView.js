function VideosView(){
	var self = Ti.UI.createView({
		top:50,
		left:0,
		backgroundColor:Ti.App.DefaultBackGroundColor
	});
	
	//Ti.include(L('PictureGallery'));
	
	var videoGallery = PictureGallery.createWindow({
	  images: Ti.App.TempVideoGalleryVideos,
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
	
	
	
	self.add(videoGallery);
	
	return self;
};
module.exports = VideosView;
