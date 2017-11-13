function FindUsView(){
	var self = Ti.UI.createView({
		top:10,
		left:10,
		right:10
	});
	
	// var lblTest = Ti.UI.createLabel({
		// top:60,
		// left:10,
		// text:'Test label',
		// color:'red'
	// });
	// self.add(lblTest);
	
	var HttpManager = require(L('HttpManager'));
	var httpManager = new HttpManager();
	
	//alert('find us inn');
	httpManager.getGenericContentList(Ti.App.ServiceCentersFindUsGenericContentCategoryUniqueName,function(arrList) {
		var section = Ti.UI.createListSection();
		var sections = [];
	 
		for (var i = 0; i < arrList.length; i++) {
		    sections.push({
		       template:'template',title: {text:arrList.item(i).getElementsByTagName('a:Title').item(0).text},
		       properties : {
		            itemId: arrList.item(i).getElementsByTagName('a:UniqueName').item(0).text,
		            accessoryType: Ti.UI.LIST_ACCESSORY_TYPE_NONE
		        }
		    });
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
			
			self.fireEvent('FindUsLocationDetails', {
						module : 'FindUsLocationDetails',
						id : e.itemIndex,
						uniqueName : item.properties.itemId
			});
			
		    //Ti.API.info('a ListItem was clicked!' + 'Item id - '+ e.itemId +'\n' + 'Bind Id - ' +e.bindId +'\n'+'Section Index - ' + e.sectionIndex + '\n'+ 'Item Index - '+ e.itemIndex);
		});
	});
	
	
	
	
	
	return self;
};
module.exports = FindUsView;
