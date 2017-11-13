function HomeView(){
	
	
   
  




	var self=Ti.UI.createView({
		top:0,
		left:0,
		backgroundImage:'images/iphoneimages/home/blur_bg.png'
	});
	
	var imgLogo=Ti.UI.createImageView({
		top:50,
		align:'center',
		image:'images/iphoneimages/home/logo.png',
		width:'80%'
	});
	self.add(imgLogo);
	
	var viewLeftColumn=Ti.UI.createView({
		width:'66%',
		top:140,
		left:5
	});
	self.add(viewLeftColumn);
	
	var viewRightColumn=Ti.UI.createView({
		width:'33%',
		top:140,
		right:0
	});
	self.add(viewRightColumn);
	
	var imgMedia=Ti.UI.createImageView({
		top:0,
		left:0,
		//image:'images/iphoneimages/home/media.png',
		width:'100%'
	});
	viewLeftColumn.add(imgMedia);
	
	var imgServices=Ti.UI.createImageView({
		top:105,
		left:0,
		//image:'images/iphoneimages/home/services.png',
		width:'50%'
	});
	viewLeftColumn.add(imgServices);
	
	var imgSocialMedia=Ti.UI.createImageView({
		top:105,
		right:0,
		//image:'images/iphoneimages/home/social_media.png',
		width:'50%'
	});
	viewLeftColumn.add(imgSocialMedia);
	
	var imgMyLand=Ti.UI.createImageView({
		top:0,
		left:2,
		//image:'images/iphoneimages/home/my_land.png'
	});
	viewRightColumn.add(imgMyLand);
	
	
	imgMedia.addEventListener("click",function(e){
		self.fireEvent('HomeViewItemselected',{
			module:'Media',
			id:1
		});
	});
	
	imgMyLand.addEventListener("click",function(e){
		self.fireEvent('HomeViewItemselected',{
			module:'MyLand',
			id:2
		});
	});
	
	imgServices.addEventListener("click",function(e){
		self.fireEvent('HomeViewItemselected',{
			module:'Services',
			id:3
		});
	});
	
	imgSocialMedia.addEventListener("click",function(e){
		self.fireEvent('HomeViewItemselected',{
			module:'SocialMedia',
			id:4
		});
	});
	
var changeLanguage = function(e) {	
	if(Ti.App.LanguageId == 1)
   {
   	 
   	  imgMedia.image = 'images/iphoneimages/home/media.png';
   	  imgServices.image = 'images/iphoneimages/home/services.png';
   	  imgSocialMedia.image = 'images/iphoneimages/home/social_media.png';
   	  imgMyLand.image = 'images/iphoneimages/home/my_land.png';
   	  
   }
   else{
   	  
   	  imgMedia.image = 'images/iphoneimages/homearabic/media.png';
   	  imgServices.image = 'images/iphoneimages/homearabic/services.png';
   	  imgSocialMedia.image = 'images/iphoneimages/homearabic/social_media.png';
   	  imgMyLand.image = 'images/iphoneimages/homearabic/my_land.png';
   }
}
changeLanguage();
Ti.App.addEventListener('LanguageChanged', changeLanguage);	   
	
	return self;
};
module.exports =HomeView;

