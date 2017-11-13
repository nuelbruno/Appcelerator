function MoreView(){
	var self=Ti.UI.createView({
		top:0,
		left:10
	});
	
	
	var section = Ti.UI.createListSection();
	var sections = [];
	var RowData = [];
	var MoreTabList = [];
	
	 var table_settings = Titanium.UI.createTableView({
				top : GetHeight(10),
				left : GetWidth(0),
				right : GetWidth(5),
				showVerticalScrollIndicator: false,
				backgroundColor : Ti.App.DefaultBackGroundColor
			});
			self.add(table_settings);
			
			

			table_settings.addEventListener('click', function(e) {

	            self.fireEvent('listItemSelected', {
							module : e.rowData.value,
							id : e.rowData.value
				});
			});
	
	var changeLanguage = function(e) {
		
		 table_settings.setData([]);
		 RowData = [];
		 
		 MoreTabList=[
						{
							title:Ti.App.LG('aboutus'),
							value:'AboutUs'
						},
						{
							title:Ti.App.LG('faq'),
							value:'FAQ'
						},
						{
							title:Ti.App.LG('settings'),
							value:'Settings'
						},
						{
							title:Ti.App.LG('termsandconditions'),
							value:'TermsAndconditions'
						},
						{
							title:Ti.App.LG('Findus'),
							value:'FindUs'
						}
						
						];
						
		 		
		/* if(Ti.App.LanguageId == 1)
	      {
	      	 MoreTabList=[
						{
							title:'About US',
							value:'AboutUs'
						},
						{
							title:'F.A.Q',
							value:'FAQ'
						},
						{
							title: 'Settings',
							value:'Settings'
						},
						{
							title: 'Terms And Conditions',
							value:'TermsAndconditions'
						},
						{
							title: 'Find Us',
							value:'FindUs'
						}
						
						];
						
	      	 
	      } 
	      else
	      {
	      	 MoreTabList=[
						{
							title:'ar_about',
							value:'AboutUs'
						},
						{
							title:'ar_faq',
							value:'FAQ'
						},
						{
							title:'ar_settings',
							value:'Settings'
						},
						{
							title:'ar_termscondtion',
							value:'TermsAndconditions'
						},
						{
							title:'ar_findus',
							value:'FindUs'
						}
						
						];
						
						
	      	
	      }	*/
	      
	      for (var i = 0; i < MoreTabList.length; i++) {
				
							var row = Titanium.UI.createTableViewRow({
								//title : MoreTabList[i].title,
								//rightImage :'images/iphoneimages/common/listing_arrow.png',
								value : MoreTabList[i].value,
								//color:Ti.App.DescriptionFontColor,
					            //font:{ fontSize: Ti.App.SmallFontSize, fontWeight:'bold' }
								/* other properties */
							});
							
							var title_row = Titanium.UI.createLabel({
					            text: MoreTabList[i].title,
					            width:'100%',
					            textAlign:Ti.App.textAlign,
					            color:Ti.App.DescriptionFontColor,
								font:{ fontSize: Ti.App.SmallFontSize, fontWeight:'bold' },
					            height:GetWidth(40)
					        });
					        
							
							if(Ti.App.LanguageId == 1)
							{
								row.rightImage = 'images/iphoneimages/common/listing_arrow.png';
							}else
							{
								row.leftImage = 'images/iphoneimages/common/listing_arrow_ar.png';
							}
							 row.add(title_row);
			
							RowData.push(row);
		   }
						
		  table_settings.setData(RowData);
	      
	   
	}

    changeLanguage();	
    
    Ti.App.addEventListener('LanguageChanged', changeLanguage);	
    
          
	return self;
};
module.exports = MoreView;

