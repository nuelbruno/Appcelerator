function PhotosView(){
	
	var self = Ti.UI.createView({
		top:50,
		left:0,
		backgroundColor:Ti.App.DefaultBackGroundColor
	});
	
	var HttpManager = require(L('HttpManager'));
	var httpManager = new HttpManager();
	
	httpManager.getMediaGalleryImages(function(arrList) {
		var arr = [];

		for (var i = 0; i < arrList.length; i++) {
						
						
						
			arr.push({
				
				path:Ti.App.CMSDataFolderDomainPath + arrList.item(i).getElementsByTagName('a:ThumbnailPath').item(0).text,
				thumbPath:Ti.App.CMSDataFolderDomainPath + arrList.item(i).getElementsByTagName('a:ThumbnailPath').item(0).text,
				caption: arrList.item(i).getElementsByTagName('a:FileName').item(0).text
				
				});
		}
		Ti.include(L('PictureGallery'));
		
		var pictureGallery = PictureGallery.createWindow({
		  images: arr,
		  //isVideoGallery : false,
		  //title: 'pictures',
		  
		  thumbGallery: {
		    numberOfColumnPortrait: 3,
		    numberOfColumnLandscape: 5,
		    thumbSize: 185,
		    thumbBorderColor: '#555',
		    thumbBorderWidth: 0,
		    thumbBackgroundColor: '#FFF',
		    backgroundColor: Ti.App.DefaultBackGroundColor
		  },
		  scrollableGallery :{
		  	labelColor:'red',
		  }
		});
		
		self.add(pictureGallery);
	});
	
	// var pictureGallery = PictureGallery.createWindow({
	  // images: Ti.App.TempPhotoGalleryImages,
	  // //isVideoGallery : false,
	  // //title: 'pictures',
// 	  
	  // thumbGallery: {
	    // numberOfColumnPortrait: 3,
	    // numberOfColumnLandscape: 5,
	    // thumbSize: 185,
	    // thumbBorderColor: '#555',
	    // thumbBorderWidth: 0,
	    // thumbBackgroundColor: '#FFF',
	    // backgroundColor: Ti.App.DefaultBackGroundColor
	  // },
	  // scrollableGallery :{
	  	// labelColor:'red',
	  // }
	// });
// 	
	// self.add(pictureGallery);
	
	return self;
};
module.exports = PhotosView;
