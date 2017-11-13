function SocialMediaView(){
	var self=Ti.UI.createView({
		top:0,
		left:10
	});
	
	var facebookView=Ti.UI.createView({
		top:40,
		left:25,
		width : GetWidth(250),
		height : GetHeight(45),
		backgroundColor : '#FFFFFF',
		borderColor:'#8a2008',
		borderRadius:4,
		borderWidth:1
	});
	
	var imgFaceBook =Ti.UI.createImageView({
		//top :10,
		left:5,
		image:Ti.App.ResourcePath + 'common/facebook-icon.png',
		width:30,
		
	});
	facebookView.add(imgFaceBook);
	
	var facebooktxt = Ti.UI.createLabel({
		//text : LG('Facebook'),
		//backgroundColor : '#FFFFFF',
		font : {
			fontSize : GetWidth(12),
			fontWeight : "bold",
		},
		color : '#8a2008',
		//textAlign : 'center',
		left:45,
		width : GetWidth(150)
		//height : GetHeight(30)
	});
	facebookView.add(facebooktxt);
	
	self.add(facebookView);
	
	var Youtubeview=Ti.UI.createView({
		top:170,//100,
		left:25,
		width : GetWidth(250),
		height : GetHeight(45),
		backgroundColor : '#FFFFFF',
		borderColor:'#8a2008',
		borderRadius:4,
		borderWidth:1
	});
	
	self.add(Youtubeview);
	
	var imgYoutube =Ti.UI.createImageView({
		//top :10,
		left:10,
		image:Ti.App.ResourcePath + 'common/Youtube-icon.png',
		width:30
		
	});
	Youtubeview.add(imgYoutube);
	
	var imageYoutube = Ti.UI.createLabel({
		//text : LG('Youtube'),
		//backgroundColor : '#FFFFFF',
		font : {
			fontSize : GetWidth(12),
			fontWeight : "bold",
		},
		color : '#8a2008',
		//textAlign : 'center',
		left:45,
		width : GetWidth(150)
		//height : GetHeight(30)
	});
	Youtubeview.add(imageYoutube);
	
	
	var twitterView=Ti.UI.createView({
		top:300,//160,
		left:25,
		width : GetWidth(250),
		height : GetHeight(45),
		backgroundColor : '#FFFFFF',
		borderColor:'#8a2008',
		borderRadius:4,
		borderWidth:1
	});
	
	self.add(twitterView);
	
	var imgTwitter =Ti.UI.createImageView({
		//top :10,
		left:10,
		image:Ti.App.ResourcePath + 'common/twitter-icon.png',
		width:30,
		
	});
	twitterView.add(imgTwitter);
	
	var imagtwitter_TXT = Ti.UI.createLabel({
		//text : LG('Twitter'),
		//backgroundColor : '#FFFFFF',
		font : {
			fontSize : GetWidth(12),
			fontWeight : "bold",
		},
		color : '#8a2008',
		//textAlign : 'center',
		left:45,
		width : GetWidth(150)
		//height : GetHeight(30)
	});
	twitterView.add(imagtwitter_TXT);
	
	var changeLanguage = function(e) {
		
	  if(Ti.App.LanguageId == 1)
      {
      	 facebooktxt.text = 'Facebook';
      	 imageYoutube.text = 'Youtube';
      	 imagtwitter_TXT.text = 'Twitter';
    	} 
      else
      {
      	 facebooktxt.text = 'الفيسبوك';
      	 imageYoutube.text = 'يوتيوب';
      	 imagtwitter_TXT.text = 'تويتر';
      }		
		
	};
	changeLanguage();
	Ti.App.addEventListener('LanguageChanged', changeLanguage);	
	
	
	
	facebookView.addEventListener('click',function(e){
		Ti.Platform.openURL(Ti.App.ADMFaceBookURL);
	});
	
	twitterView.addEventListener('click',function(e){
		Ti.Platform.openURL(Ti.App.ADMTwitterURL);
	});
	
	Youtubeview.addEventListener('click',function(e){
		Ti.Platform.openURL(Ti.App.ADMYoutubeURL);
	});
	return self;
};
module.exports = SocialMediaView;