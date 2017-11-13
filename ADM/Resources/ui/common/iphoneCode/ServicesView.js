function ServicesView(){
	var self=Ti.UI.createView({
		top:0,
		left:10
	});
	var HttpManager = require(L('HttpManager'));
	var httpManager = new HttpManager();
	
	httpManager.getCategoryList('MunicipalServiceDAL.Model.MunicipalService',function(arrList) {
		var section = Ti.UI.createListSection();
		var sections = [];
	 
		for (var i = 0; i < arrList.length; i++) {
			var subCat = arrList.item(i).getElementsByTagName('a:SubCategories').item(0);
			//Ti.API.info("cat : " + arrList.item(i).getElementsByTagName('a:Name').item(0).text +"sub categoires count :"+ subCat);
			if(subCat !=null && subCat.getAttribute('z:Size') >0)
			{
			    sections.push({
			       template:'template',title: {text:arrList.item(i).getElementsByTagName('a:Name').item(0).text},
			       properties : {
			            itemId: arrList.item(i).getElementsByTagName('a:ID').item(0).text,
			            itemText :arrList.item(i).getElementsByTagName('a:Name').item(0).text,
			            accessoryType: Ti.UI.LIST_ACCESSORY_TYPE_NONE
			        }
			    });
		   }
		}
		 section.setItems(sections);
		
		
		
	    var listView = Ti.UI.createListView({
	  	sections: [section],
	    templates: { 'template': Ti.App.ListViewTemplate1 },
	    defaultItemTemplate: 'template',
	    backgroundColor:Ti.App.DefaultBackGroundColor
	    });
	    
		self.add(listView);
		
		listView.addEventListener('itemclick', function(e) {
			var item = e.section.getItemAt(e.itemIndex);
			Ti.API.info('Clicked row property : ' + item.properties.itemId);
			
			self.fireEvent('listItemSelected', {
						module : item.properties.itemId,
						id : item.properties.itemId,
						title: item.properties.itemText
			});
			
		    //Ti.API.info('a ListItem was clicked!' + 'Item id - '+ e.itemId +'\n' + 'Bind Id - ' +e.bindId +'\n'+'Section Index - ' + e.sectionIndex + '\n'+ 'Item Index - '+ e.itemIndex);
		});
	});
	
	
	
	
	
	return self;
};
module.exports = ServicesView;
