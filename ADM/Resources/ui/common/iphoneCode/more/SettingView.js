function SettingsView(){
	var self = Ti.UI.createView({
		top:20,
		left:10,
		right:10,
		layout:'vertical'
	});
	
	var lblTitle = Ti.UI.createLabel({
	  top:10,
	  width:'100%',
	  //left:0,
	  //text: 'Change language',
	  color:Ti.App.TitleFontColor,
	  font:{ fontSize: Ti.App.SmallFontSize, fontWeight:'bold' }
	});
	self.add(lblTitle);
	
	
	var englishchange = Titanium.UI.createButton({
	   title: 'English',
	   font:{ fontSize: Ti.App.SmallFontSize, fontWeight:'bold' },
	   color:Ti.App.RedColor,
	   borderColor:Ti.App.RedColor,
	   borderWidth:1,
	   borderRadius:3,
	   backgroundImage:'none',
	   top: 10,
	   //left:0,
	   width: 160,
	   height: 30
	});
	self.add(englishchange);
	englishchange.addEventListener('click',function(e)
	{
	     Ti.App.Properties.setString('SETTING_LANGUAGE', 'en');
		 Ti.App.Properties.setString('FIRSTTIME_LOG', true);
		 Ti.App.LanguageId = 1;
		
		 Ti.App.fireEvent('LanguageChanged');
		 
		
		
		 //appWindow.show();
		 //ctb.show();
		// Win_language.close();
		
		Ti.include("ui/handheld/ios/customTabBar.js");

		var ctb = new CustomTabBar({
			tabBar : appWindow,
			imagePath : 'images/',
			width : GetWidth(80),
			height : GetHeight(40),
			items : [{
				image : 'iphoneimages/bottom_tabs/home.png',
				selected : 'iphoneimages/bottom_tabs/home_active.png'
			}, {
				image : 'iphoneimages/bottom_tabs/services.png',
				selected : 'iphoneimages/bottom_tabs/services_active.png'
			}, {
				image : 'iphoneimages/bottom_tabs/contact_us.png',
				selected : 'iphoneimages/bottom_tabs/contact_us_active.png'
			}, {
				image : 'iphoneimages/bottom_tabs/more.png',
				selected : 'iphoneimages/bottom_tabs/more_active.png'
			}],
			currentTab : 3
		});
		
		
		
		 Ti.App.ViewTabSet =  ctb;
	
	});
	
	var arabicchange = Titanium.UI.createButton({
	   title: 'Arabic',
	   color:Ti.App.RedColor,
	   color:Ti.App.RedColor,
	   borderColor:Ti.App.RedColor,
	   borderWidth:1,
	   borderRadius:3,
	   backgroundImage:'none',
	   font:{ fontSize: Ti.App.SmallFontSize, fontWeight:'bold' },
	   top: 10,
	   //left:0,
	   width: 160,
	   height: 30
	});
	self.add(arabicchange);
	arabicchange.addEventListener('click',function(e)
	{
		
		Ti.App.Properties.setString('SETTING_LANGUAGE', 'ar');
		Ti.App.LanguageId = 2;
		Ti.App.fireEvent('LanguageChanged');
		Ti.include("ui/handheld/ios/customTabBar.js");

		var ctb = new CustomTabBar({
			tabBar : appWindow,
			imagePath : 'images/',
			width : GetWidth(80),
			height : GetHeight(40),
			items : [{
				image : 'iphoneimages/ArabicBTabs/find_us.png',
				selected : 'iphoneimages/ArabicBTabs/find_us_active.png'
			}, {
				image : 'iphoneimages/ArabicBTabs/services.png',
				selected : 'iphoneimages/ArabicBTabs/services_active.png'
			}, {
				image : 'iphoneimages/ArabicBTabs/contact_us.png',
				selected : 'iphoneimages/ArabicBTabs/contact_us_active.png'
			}, {
				image : 'iphoneimages/ArabicBTabs/more.png',
				selected : 'iphoneimages/ArabicBTabs/more_active.png'
			}],
			currentTab : 3
		});
		
		 Ti.App.ViewTabSet =  ctb;
	   
	});
	
	var changeLanguage = function(e) {
		
	  if(Ti.App.LanguageId == 1)
      {
      	 lblTitle.text = 'Change language';
      	 lblTitle.textAlign = 'left'; 
      	 
      } 
      else
      {
      	 lblTitle.text = 'تغيير اللغة';
      	 lblTitle.textAlign = 'right'; 
      	
      }		
		
	}
	changeLanguage();
	Ti.App.addEventListener('LanguageChanged', changeLanguage);	
	
	
	
	
	return self;
};
module.exports =SettingsView;