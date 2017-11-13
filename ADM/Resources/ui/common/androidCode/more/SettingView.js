function SettingsView(){
	var self = Ti.UI.createView({
		top:20,
		left:10,
		right:10,
		layout:'vertical'
	});
	
	var lblTitle = Ti.UI.createLabel({
	  top:0,
	  left:0,
	  //text: 'Change language',
	  color:Ti.App.TitleFontColor,
	  font:{fontSize:Ti.App.BigFontSize,fontWeight:'bold' }
	});
	self.add(lblTitle);
	
	
	var englishchange = Titanium.UI.createButton({
	   title: 'English',
	   top: 10,
	   left:0,
	   width: 160,
	   height: 40
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
		
		//Ti.include("ui/handheld/ios/customTabBar.js");

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
	
	});
	
	var arabicchange = Titanium.UI.createButton({
	   title: 'Arabic',
	   top: 10,
	   left:0,
	   width: 160,
	   height: 40
	});
	self.add(arabicchange);
	arabicchange.addEventListener('click',function(e)
	{
		
		Ti.App.Properties.setString('SETTING_LANGUAGE', 'ar');
		Ti.App.LanguageId = 2;
		Ti.App.fireEvent('LanguageChanged');
		//Ti.include("ui/handheld/ios/customTabBar.js");

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
		
		
	   
	});
	
	var changeLanguage = function(e) {
		
	  if(Ti.App.LanguageId == 1)
      {
      	 lblTitle.text = 'Change language';
      	 
      } 
      else
      {
      	 lblTitle.text = 'تغيير اللغة';
      	
      }		
		
	}
	changeLanguage();
	Ti.App.addEventListener('LanguageChanged', changeLanguage);	
	
	
	
	
	return self;
};
module.exports =SettingsView;