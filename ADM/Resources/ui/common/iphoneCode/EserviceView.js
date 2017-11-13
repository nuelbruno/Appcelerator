function EserviceView(){
	var self=Ti.UI.createView({
		top:0,
		left:0
	});
	
	var imgComingSoon = Ti.UI.createImageView({
		//top:20,
		left:0,
		width:'100%',
		image:Ti.App.ResourcePath + 'common/coming_soon_ios.png',
		
	});
	self.add(imgComingSoon);
	
	var changeLanguage = function(e) {	 
	if(Ti.App.LanguageId == 1)
   {
   	 
   	  imgComingSoon.image = Ti.App.ResourcePath + 'common/coming_soon_ios.png';
   	   	  
   }
   else{
   	  
   	 imgComingSoon.image = Ti.App.ResourcePath + 'common/coming_soon_ios_ara.png';
   }
}
changeLanguage();
Ti.App.addEventListener('LanguageChanged', changeLanguage);	  
	
	return self;
}
module.exports = EserviceView;

