function ContactUsView(){
	var self=Ti.UI.createView({
		top:20,
		left:0,
		right:0,
		layout : 'vertical'
	});
	//Call us
	 var viewCallCenter = Ti.UI.createView({
	 	top:20,
	 	left:30,
	 	right:30,
	 	height:40,
	 	backgroundImage : Ti.App.ResourcePath + 'common/contact_bg.png',
	 	layout :'horizontal'
	 });
	
	var imgCallCenter = Ti.UI.createImageView({
		top:5,
		left: 10,
		image : Ti.App.ResourcePath + 'common/call.png'
	});
	viewCallCenter.add(imgCallCenter);
	
	// var lblCallCenter = Ti.UI.createLabel({
		// left: 15,
		// text : L('OurCallcenter'),
		// color: Ti.App.DescriptionFontColor,
		// font :{
			// fontSize:'12dp',
// 			
		// }
	// });
	// viewCallCenter.add(lblCallCenter);
	
	var lblCallCenterNo = Ti.UI.createLabel({
		left: 15,
		text : Ti.App.ContactNo,
		color: Ti.App.RedColor,
		font :{
			fontSize:'12dp',
			
		}
	});
	viewCallCenter.add(lblCallCenterNo);
	
	viewCallCenter.addEventListener('click',function(e){
		
		var the_number = Ti.App.ContactNo;
		 Ti.Platform.openURL('tel:'+the_number);
	});
	
	
	//Emai us
	var viewEmailUs = Ti.UI.createView({
	 	top:20,
	 	left:30,
	 	right:30,
	 	height:40,
	 	backgroundImage : Ti.App.ResourcePath + 'common/contact_bg.png',
	 	layout :'horizontal'
	 });
	
	var imgEmailUs = Ti.UI.createImageView({
		top:10,
		//left: 10,
		image : Ti.App.ResourcePath + 'common/email.png'
	});
	viewEmailUs.add(imgEmailUs);
	
	// var lblEmailUs = Ti.UI.createLabel({
		// top:10,
		// left: 15,
		// text : L('EmailUs'),
		// color: Ti.App.DescriptionFontColor,
		// font :{
			// fontSize:'12dp',
// 			
		// }
	// });
	//viewEmailUs.add(lblEmailUs);
	
	var lblComplainOrSuggestion = Ti.UI.createLabel({
		top:10,
		left: 15,
		//text : LG('ComplainOrSuggestion'),
		color: Ti.App.RedColor,
		font :{
			fontSize:'12dp',
			
		}
	});
	viewEmailUs.add(lblComplainOrSuggestion);
	
	var changeLanguage = function(e) {
		
	  if(Ti.App.LanguageId == 1)
      {
      	 lblComplainOrSuggestion.text = 'Complain and Suggestion';
      	 imgEmailUs.left = 10;
    	} 
      else
      {
      	  lblComplainOrSuggestion.text = 'شكوى أو اقتراح';
      	  imgEmailUs.left = 10;
      }		
		
	}
	Ti.App.addEventListener('LanguageChanged', changeLanguage);	
	
	
	viewEmailUs.addEventListener('click',function(e){
		
		self.fireEvent('ShowComplainOrSuggestionForm', {
							// module : 'NewsDetails',
							// id : e.itemIndex,
							// uniqueName : item.properties.uniqueName
				});
	});
	
	self.add(viewCallCenter);
	self.add(viewEmailUs);
	
	
	
	
	return self;
};
module.exports = ContactUsView;