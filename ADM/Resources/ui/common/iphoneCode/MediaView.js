function MediaView(){
	var self=Ti.UI.createView({
		top:0,
		left:0
	});
	Ti.include(L('PictureGallery'));
	
	var NewsView = require(Ti.App.ClassPath + L('NewsView'));
    var viewNews = new NewsView();
    
	var PhotosView = require(Ti.App.ClassPath + L('PhotosView'));
    var viewPhotos = new PhotosView();
    
    var VideosView = require(Ti.App.ClassPath + L('VideosView'));
    var viewVideos = new VideosView();
     
	var btnNews = Titanium.UI.createButton({
		top : 10,
		left : 10,
		width : 99,
		height : 29,
		backgroundImage : Ti.App.ResourcePath + 'common/news_hover.png' //Ti.App.LG('bg_NewsTab_hover')
	});
	var btnPhotos = Titanium.UI.createButton({
		top : 10,
		left : 109,
		width : 101,
		height : 29,
		backgroundImage : Ti.App.ResourcePath + Ti.App.LG('bg_PhotosTab')
	});
	
	var btnVideos = Titanium.UI.createButton({
		top : 10,
		left : 210,
		width : 99,
		height : 29,
		backgroundImage : Ti.App.ResourcePath + Ti.App.LG('bg_VideosTab')
	});
	
	self.add(btnNews);
	self.add(btnPhotos);
	self.add(btnVideos);

    btnNews.addEventListener("click",function(e){
    	btnNews.backgroundImage =Ti.App.ResourcePath + 'common/news_hover.png';
    	btnPhotos.backgroundImage = Ti.App.ResourcePath + Ti.App.LG('bg_PhotosTab');
    	btnVideos.backgroundImage = Ti.App.ResourcePath + Ti.App.LG('bg_VideosTab');
    	
    	self.add(viewNews);
    	self.remove(viewPhotos);
    	self.remove(viewVideos);
    	
    });	
    
    btnPhotos.addEventListener("click",function(e){
    	btnNews.backgroundImage = Ti.App.ResourcePath + Ti.App.LG('bg_NewsTab');
    	btnPhotos.backgroundImage = Ti.App.ResourcePath + Ti.App.LG('bg_PhotosTab_hover');
    	btnVideos.backgroundImage = Ti.App.ResourcePath + Ti.App.LG('bg_VideosTab');
    	
    	self.remove(viewNews);
    	self.add(viewPhotos);
    	self.remove(viewVideos);
    	
    	
    });	
    
    btnVideos.addEventListener("click",function(e){
    	btnNews.backgroundImage = Ti.App.ResourcePath + Ti.App.LG('bg_NewsTab');
    	btnPhotos.backgroundImage = Ti.App.ResourcePath + Ti.App.LG('bg_PhotosTab');
    	btnVideos.backgroundImage = Ti.App.ResourcePath + Ti.App.LG('bg_VideosTab_hover');
    	
    	self.remove(viewNews);
    	self.remove(viewPhotos);
    	self.add(viewVideos);
    	
    });	
    
	self.add(viewNews);
	
	return self; 
};
module.exports=MediaView;
