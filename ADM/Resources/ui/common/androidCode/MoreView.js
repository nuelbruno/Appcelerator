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
		 /*
		 MoreTabList=[
						{
							title:L('aboutus'),//Ti.App.LG('aboutus'),
							value:'AboutUs'
						},
						{
							title:L('faq'),//Ti.App.LG('faq'),
							value:'FAQ'
						},
						{
							title:L('settings'),//Ti.App.LG('settings'),
							value:'Settings'
						},
						{
							title:L('termsandconditions'),//Ti.App.LG('termsandconditions'),
							value:'TermsAndconditions'
						},
						{
							title:L('Findus'),//Ti.App.LG('Findus'),
							value:'FindUs'
						}
						
						];*/
						
		 		
		 if(Ti.App.LanguageId == 1)
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
						
						
	      	
	      }	
	      
	      for (var i = 0; i < MoreTabList.length; i++) {
				
							var row = Titanium.UI.createTableViewRow({
								height: GetHeight(30),
								title : MoreTabList[i].title,
								rightImage :Ti.App.ResourcePath + 'common/listing_arrow.png',
								value : MoreTabList[i].value,
								color:Ti.App.DescriptionFontColor,
					            font:{ fontSize: Ti.App.SmallFontSize, fontWeight:'bold' }
								/* other properties */
							});
			
							RowData.push(row);
		   }
						
		  table_settings.setData(RowData);
	      
	   
	};

    changeLanguage();	
    
    Ti.App.addEventListener('LanguageChanged', changeLanguage);	
    
          
	return self;
};
module.exports = MoreView;

