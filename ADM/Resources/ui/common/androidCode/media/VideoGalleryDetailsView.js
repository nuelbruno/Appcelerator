function VideoGalleryDetailsView(videoUrl){
	//var uniqueName = _uniqueName;
	var self=Ti.UI.createView({
		top:0,
		left:0,
		right:0,
		layout:'vertical'
	});
	Ti.API.info ('Video path :' + videoUrl);
	
	var videoPlayer = Titanium.Media.createVideoPlayer({
	    url:videoUrl,
	    backgroundColor: '#000',
	    fullscreen:false,
	    scalingMode: Titanium.Media.VIDEO_SCALING_ASPECT_FIT,
	    mediaControlMode: Titanium.Media.VIDEO_CONTROL_NONE     
	});
    self.add(videoPlayer);
    
    
	return self;
};
module.exports = VideoGalleryDetailsView;