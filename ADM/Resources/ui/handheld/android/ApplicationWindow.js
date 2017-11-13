function ApplicationWindow() {
	
	
Ti.App.textAlign = 'left';	
var rightImage = 'images/iphoneimages/common/listing_arrow.png';
var leftImage = 'images/iphoneimages/common/listing_arrow.png';
	
var changeLanguage = function(e) {

  
              if(Ti.App.LanguageId == 1)
		      {
		      	    
				 Ti.App.textAlign = 'left';
				 WindowHistoryClose();
				 //var rightImage :'images/iphoneimages/common/listing_arrow.png';
				 Ti.App.tableArrrow = rightImage; 
				
		      }	
		      else
		      {
		      	  Ti.App.textAlign = 'right';
		      	  WindowHistoryClose();  
		      	  Ti.App.tableArrrow = leftImage;
		      	  
		      	 
		      }
		      
		      function WindowHistoryClose()
		      {
		      	 
		      	 // alert(HistoryWinArray.length);
		      	  if(HistoryWinArray.length != 0)	
				 
				 for (var L = 0; L < HistoryWinArray.length; L++) {
                 
                       var CurLandWin = HistoryWinArray[L];
                       CurLandWin.close();
                 }
                 HistoryWinArray.length = 0;
		      }		
  
  
}


changeLanguage();	
	
Ti.App.addEventListener('LanguageChanged', changeLanguage);

	
	var osname = Ti.Platform.osname;
	var HttpManager = require(L('HttpManager'));

	var HomeView = require(Ti.App.ClassPath + L('HomeView'));
	var HomeWindow = require(L('HomeWindow'));

	var FindUsView = require(Ti.App.ClassPath + L('FindUsView'));
	var FindUsWindow = require(L('FindUsWindow'));

	var EserviceView = require(Ti.App.ClassPath + L('EserviceView'));
	var EserviceWindow = require(L('EserviceWindow'));

	var ContactUsView = require(Ti.App.ClassPath + L('ContactUsView'));
	var ContactUsWindow = require(L('ContactUsWindow'));

	var ComplainOrSuggestionView = require(Ti.App.ClassPath + L('ComplainOrSuggestionView'));
	var ComplainOrSuggestionWindow = require(L('ComplainOrSuggestionWindow'));

	var MoreView = require(Ti.App.ClassPath + L('MoreView'));
	var MoreWindow = require(L('MoreWindow'));

	//Home tab Sub windows
	var MediaView = require(Ti.App.ClassPath + L('MediaView'));
	var MediaWindow = require(L('MediaWindow'));

	var MyLandView = require(Ti.App.ClassPath + L('MyLandView'));
	var MyLandWindow = require(L('MyLandWindow'));

	var MyLandView = require(Ti.App.ClassPath + L('MyLandView'));

	var Mymapview = require(Ti.App.ClassPath + L('Mymapview'));
	var MyLandWindow = require(L('MyLandWindow'));

	var Mapplotwindow = require(L('mapplotwindow'));

	var NewsDetailsView = require(Ti.App.ClassPath + L('NewsDetailsView'));
	var NewsDetailsWindow = require(L('NewsDetailsWindow'));

	var VideoGalleryDetailsView = require(Ti.App.ClassPath + L('VideoGalleryDetailsView'));
	var VideoGalleryDetailsWindow = require(L('VideoGalleryDetailsWindow'));

	var ServicesView = require(Ti.App.ClassPath + L('ServicesView'));
	var ServicesWindow = require(L('ServicesWindow'));

	var ServicesSubCategoriesView = require(Ti.App.ClassPath + L('ServicesSubCategoriesView'));
	var ServicesSubCategoriesWindow = require(L('ServicesSubCategoriesWindow'));

    var ServicesItemsView = require(Ti.App.ClassPath + L('ServicesItemsView'));
	var ServicesItemsWindow = require(L('ServicesItemsWindow'));
	
	 var ServiceDetailsView = require(Ti.App.ClassPath + L('ServiceDetailsView'));
	var ServiceDetailsWindow = require(L('ServiceDetailsWindow'));


	//var ServiceChildcategoryView = require(Ti.App.ClassPath + L('ServicesChildCategoryView'));
	// var ServiceChildcategorywin = require(L('ServicesChildCategoryWindow'));

	var SocialMediaView = require(Ti.App.ClassPath + L('SocialMediaView'));
	var SocialMediaWindow = require(L('SocialMediaWindow'));

	//MOre tab sub windows
	var AboutUsView = require(Ti.App.ClassPath + L('AboutUsView'));
	var AboutUsWindow = require(L('AboutUsWindow'));

	var FaqView = require(Ti.App.ClassPath + L('FaqView'));
	var FaqWindow = require(L('FaqWindow'));

	var TermsAndConditionsView = require(Ti.App.ClassPath + L('TermsAndConditionsView'));
	var TermsAndConditionsWindow = require(L('TermsAndConditionsWindow'));

	var FindUsView = require(Ti.App.ClassPath + L('FindUsView'));
	var FindUsWindow = require(L('FindUsWindow'));

	var FindUsDetailsView = require(Ti.App.ClassPath + L('FindUsDetailsView'));
	var FindUsDetailsWindow = require(L('FindUsDetailsWindow'));
	
	var SettingViewlang = require(Ti.App.ClassPath + L('SettingView'));
	var SettingLangWindow = require(L('SettingWindow'));

	//create object instance
	var self = Ti.UI.createTabGroup({

	});

	var ProgressView = require("ui/common/loading/progress.view");

	var progressView = new ProgressView(self);

	Ti.App.showLoading = function(message, isError) {
		progressView.show({
			text : message,
			error : isError,
		});
	};
	Ti.App.changeLoading = function(message, success) {
		progressView.change({
			text : message,
			success : success
		});
	};
	Ti.App.hideLoading = function() {
		progressView.hide();
	};
	//Tab1
	//create master view container
	var masterContainerWindowHome = new HomeWindow();
	masterContainerWindowHome.title = 'ADM Mobile App';
	var homeview = new HomeView();

	masterContainerWindowHome.add(homeview);

	masterContainerWindowHome.navBarHidden = true;
	var tab1 = Ti.UI.createTab({
		title : 'Home',
		icon : Ti.App.ResourcePath + L('tab1icon'),
		window : masterContainerWindowHome
	});
	masterContainerWindowHome.containingTab = tab1;
	Ti.App.Tab1 = tab1;
	self.addTab(tab1);
	homeview.addEventListener("HomeViewItemselected", function(e) {
		var id = e.id;
		var module = e.module;
		if (module == "Media") {

			var mediaView = new MediaView();
			var mediaWindow = new MediaWindow();
			mediaWindow.add(mediaView);

			mediaWindow.Title = 'Media';
		    HistoryWinArray.push(mediaWindow);
		    Ti.App.SetTitleView(mediaWindow,mediaView, 'Media' , 0 , 1);
			

			tab1.open(mediaWindow);

			mediaView.addEventListener("MediaViewItemSelected", function(e) {
				var id = e.id;
				var module = e.module;
				var uniqueName = e.uniqueName;
				var videoUrl = e.videoUrl;

				if (module == "NewsDetails") {
					var newsDetailsView = new NewsDetailsView(uniqueName);
					var newsDetailsWindow = new NewsDetailsWindow();
					newsDetailsWindow.title = Ti.App.Newstxt;
                    HistoryWinArray.push(newsDetailsWindow);
                    Ti.App.SetTitleView(newsDetailsWindow,newsDetailsView, 'News' , 0, 1);
					newsDetailsWindow.add(newsDetailsView);

					tab1.open(newsDetailsWindow);
				}

			});
		} else if (module == "MyLand") {
			var level = 0;
			
			
			var myLandView = new MyLandView(level, '', '');
			var myLandWindow = new MyLandWindow();
			myLandWindow.add(myLandView);

			myLandWindow.Title = Ti.App.Mylandtxt;
			
			HistoryWinArray.push(myLandWindow);
			
			Ti.App.SetTitleView(myLandWindow,myLandView , 'Myland' , 1, 1);

			tab1.open(myLandWindow);

			myLandView.addEventListener('listItemSelected', function(e) {

				var id = e.id;
				var areaname = e.areaname;
				var module = e.module;

				if (module == "zoneSelect") {
					var level = 1;
					var myLandView = new MyLandView(level, areaname, '');
					var myLandWindow = new MyLandWindow();
					myLandWindow.add(myLandView);

					myLandWindow.Title = 'My land';
					HistoryWinArray.push(myLandWindow);
					Ti.App.SetTitleView(myLandWindow,myLandView , 'Myland' , 1 , 1);

					tab1.open(myLandWindow);

					myLandView.addEventListener('listItemSelected', function(e) {

						var id = e.id;
						var zoneName = e.zoneName;
						var areaname = e.areaname;
						var module = e.module;

						if (module == "sectorSelect") {
							var level = 2;
							var myLandView = new MyLandView(level, areaname, zoneName);
							var myLandWindow = new MyLandWindow();
							myLandWindow.add(myLandView);

							myLandWindow.Title = 'My land';
							HistoryWinArray.push(myLandWindow);
							Ti.App.SetTitleView(myLandWindow,myLandView , 'Myland' , 1 , 1);

							tab1.open(myLandWindow);
							myLandView.addEventListener('listItemSelected', function(e) {

								var id = e.id;
								var zoneName = e.zoneName;
								var areaname = e.areaname;
								var plotName = e.plotName;
								var module = e.module;

								if (module == "plotSelected") {
									var Mapplotwindow = require(L('mapplotwindow'));

									var level = 3;

									var Mapplotwindow = new Mapplotwindow();
									//var Mymapview = new Mymapview(level);
									//Mapplotwindow.add(Mymapview);
    								HistoryWinArray.push(Mapplotwindow);
									//Ti.App.areaname = areaname;
									Ti.App.zoneName = zoneName;
									Ti.App.plotName = plotName;

									myLandWindow.Title = Ti.App.Mylandtxt;
									//Ti.App.SetTitleView(myLandWindow,myLandView);

									tab1.open(Mapplotwindow);
								}

							});
						}

					});
				}

			});

		} else if (module == "MyLand") {
			var myLandView = new MyLandView();
			var myLandWindow = new MyLandWindow();
			myLandWindow.add(myLandView);

			myLandWindow.Title = Ti.App.Mylandtxt;
			//Ti.App.SetTitleView(myLandWindow,myLandView);

			tab1.open(myLandWindow);
		} else if (module == "Services") {
			var servicesView = new ServicesView();
			var servicesWindow = new ServicesWindow();
			servicesWindow.add(servicesView);

			HistoryWinArray.push(servicesWindow);
            Ti.App.SetTitleView(servicesWindow,servicesView, 'Services' , 0 , 1);
			
			tab1.open(servicesWindow);

			servicesView.addEventListener("listItemSelected", function(e) {
				var id = e.id;
				var module = e.module;
				var title = e.title;
				var uniqueName = e.uniqueName;

				var servicesSubCategoriesView = new ServicesSubCategoriesView(id);
				var servicesSubCategoriesWindow = new ServicesSubCategoriesWindow();
				servicesSubCategoriesWindow.title = title;
				
                HistoryWinArray.push(servicesSubCategoriesWindow);
				
                Ti.App.SetTitleView(servicesSubCategoriesWindow,servicesSubCategoriesView, 'Services' , 0, 1);
                
				servicesSubCategoriesWindow.add(servicesSubCategoriesView);

				tab1.open(servicesSubCategoriesWindow);

				servicesSubCategoriesView.addEventListener('listItemSelected', function(e) {

					var id = e.id;
					var module = e.module;
					var cat_id = e.id_cat;
					
					
					var servicesItemsView = new ServicesItemsView(cat_id);
					var servicesItemsWindow = new ServicesItemsWindow();
					
					servicesItemsWindow.add(servicesItemsView);
					servicesItemsWindow.Title = 'Services';
					
					HistoryWinArray.push(servicesItemsWindow);
					Ti.App.SetTitleView(servicesItemsWindow,servicesItemsView, 'Services' , 0, 1);
					
					tab1.open(servicesItemsWindow);

					servicesItemsView.addEventListener('listItemSelected', function(e) {
						
						var id = e.id;
					    var module = e.module;
					    var id_municip = e.id_municip;

						
						var serviceDetailsView =new ServiceDetailsView(id_municip);
						var serviceDetailsWindow =new ServiceDetailsWindow();
						
						serviceDetailsWindow.add(serviceDetailsView);
						
						HistoryWinArray.push(serviceDetailsWindow);

						serviceDetailsWindow.Title = Ti.App.Servicestxt;
					    Ti.App.SetTitleView(serviceDetailsWindow,serviceDetailsView, 'Services' , 0, 1);
						

					    tab1.open(serviceDetailsWindow);

					});

				});

			});
		} else if (module == "SocialMedia") {
			var socialMediaView = new SocialMediaView();
			var socialMediaWindow = new SocialMediaWindow();
			socialMediaWindow.add(socialMediaView);

			socialMediaWindow.Title = Ti.App.SocialMediatxt;
			
			HistoryWinArray.push(socialMediaWindow);
			
			Ti.App.SetTitleView(socialMediaWindow,socialMediaView, 'SocialMedia' , 0, 1);

			tab1.open(socialMediaWindow);
		}

	});

	//Tab2
	//create master view container
	var masterContainerWindowEservice = new EserviceWindow();
	masterContainerWindowEservice.title = 'eServices';
	var eserviceView = new EserviceView();

	//Ti.App.SetTitleView(masterContainerWindowEservice,eserviceView);
   
    Ti.App.SetTitleView(masterContainerWindowEservice, eserviceView, 'eServices', 0, 0);
	   //changeLanguage();	
		
	    Ti.App.addEventListener('LanguageChanged', changeLanguage);
   
	masterContainerWindowEservice.add(eserviceView);

	var tab2 = Ti.UI.createTab({
		title : 'Eservice',
		icon : Ti.App.ResourcePath + L('tab2icon'),
		window : masterContainerWindowEservice
	});
	masterContainerWindowEservice.containingTab = tab2;
	self.addTab(tab2);
	Ti.App.Tab2 = tab2;

	//Tab3
	//create master view container
	var masterContainerWindowContactUs = new ContactUsWindow();
	masterContainerWindowContactUs.title = Ti.App.contactustxt;
	var contactUsView = new ContactUsView();
	
	
	Ti.App.SetTitleView(masterContainerWindowContactUs,contactUsView, 'contactus' , 0 , 0);

	masterContainerWindowContactUs.add(contactUsView);

	var tab3 = Ti.UI.createTab({
		title : 'Contact Us',
		icon : Ti.App.ResourcePath + L('tab3icon'),
		window : masterContainerWindowContactUs
	});
	masterContainerWindowContactUs.containingTab = tab3;
	self.addTab(tab3);
	Ti.App.Tab3 = tab3;
	contactUsView.addEventListener('ShowComplainOrSuggestionForm', function(e) {
		var complainOrSuggestionView = new ComplainOrSuggestionView();
		var complainOrSuggestionWindow = new ComplainOrSuggestionWindow();
		complainOrSuggestionWindow.title =  Ti.App.ComplainOrSuggestiontxt;
 
        HistoryWinArray.push(complainOrSuggestionWindow);
        Ti.App.SetTitleView(complainOrSuggestionWindow,complainOrSuggestionView, 'ComplainOrSuggestion' , 0, 1);
   
		complainOrSuggestionWindow.add(complainOrSuggestionView);
		tab3.open(complainOrSuggestionWindow);
	});
	//Tab4
	//create master view container
	var masterContainerWindowMore = new MoreWindow();
	masterContainerWindowMore.title = Ti.App.Moretxt;
	var moreView = new MoreView();
	
	
	Ti.App.SetTitleView(masterContainerWindowMore,moreView,  'More' , 0, 0);

	masterContainerWindowMore.add(moreView);

	moreView.addEventListener('listItemSelected', function(e) {
		var id = e.id;
		var module = e.module;
		var uniqueName = e.uniqueName;
		Ti.API.info('Module : ' + module + ' id : ' + id);

		if (module == 'AboutUs') {
			var aboutUsView = new AboutUsView();
			var aboutUsWindow = new AboutUsWindow();
			Ti.App.SetTitleView(aboutUsWindow,aboutUsView, 'aboutus' , 0, 1);

			aboutUsWindow.add(aboutUsView);

			tab4.open(aboutUsWindow);
		} else if (module == 'FAQ') {
			var faqView = new FaqView();
			var faqWindow = new FaqWindow();
			Ti.App.SetTitleView(faqWindow,faqView, 'faq' , 0, 1);
			faqWindow.add(faqView);

			tab4.open(faqWindow);
		}
		else if(module == 'Settings')
		{
			
	        var settingViewlang = new SettingViewlang();
			var settingLangWindow = new SettingLangWindow();
			Ti.App.SetTitleView(settingLangWindow,settingViewlang,  'settings' , 0, 1);
			settingLangWindow.add(settingViewlang);
			
			tab4.open(settingLangWindow);
		} 
		else if (module == 'TermsAndconditions') {
			var termsAndConditionsView = new TermsAndConditionsView(Ti.App.TermsAndConditionsGenericContentUniqueName);
			var termsAndConditionsWindow = new TermsAndConditionsWindow();
			
			Ti.App.SetTitleView(termsAndConditionsWindow,termsAndConditionsView, 'termsandconditions' , 0, 1);
			termsAndConditionsWindow.add(termsAndConditionsView);

			tab4.open(termsAndConditionsWindow);
		} else if (module == 'FindUs') {
			var findUsView = new FindUsView();
			var findUsWindow = new FindUsWindow();
			
			Ti.App.SetTitleView(findUsWindow,findUsView, 'Findus' , 0, 1);
			
			findUsWindow.add(findUsView);

			tab4.open(findUsWindow);

			findUsView.addEventListener("FindUsLocationDetails", function(e) {
				var id = e.id;
				var module = e.module;
				var uniqueName = e.uniqueName;

				var findUsDetailsView = new FindUsDetailsView(uniqueName);
				var findUsDetailsWindow = new FindUsDetailsWindow();
				findUsDetailsWindow.title = Ti.App.Findustxt;

                 Ti.App.SetTitleView(findUsDetailsWindow,findUsDetailsView, 'Findus' , 0, 1);

				findUsDetailsWindow.add(findUsDetailsView);

				tab4.open(findUsDetailsWindow);

			});
		}

	});

	var tab4 = Ti.UI.createTab({
		title :  'More',
		icon : Ti.App.ResourcePath + L('tab4icon'),
		window : masterContainerWindowMore
	});
	masterContainerWindowMore.containingTab = tab4;
	self.addTab(tab4);
	Ti.App.Tab4 = tab4;
	
	
	 
	/*var isHide = false;
	btn1.addEventListener('click', function() {
		isHide = !isHide;
		
		if ( isHide ) {
			btn1.title = 'Show Tabs';
			ctb.hide();		
		} else {
			btn1.title = 'Hide Tabs';
			ctb.show(); 
		}
	});*/

	return self;

};
module.exports = ApplicationWindow;
