function ServicesItemsView(cat_id)
{
	var self = Ti.UI.createView({
		top:0,
		left:10,
		right:0
	});
	 var HttpManager = require(L('HttpManager'));
	    var httpManager = new HttpManager();

		var httpManager = httpManager.getMuncipalServicesList(cat_id, function(e) { //alert(e);
			cat_details = e;
			show_catDetails();
		});
		
		function checkValueempty()
		{
			var lenthset = cat_details.item(0).getElementsByTagName('a:Title').item(0).text;
		}
		
		function show_catDetails() {
			
			Ti.API.info("Title-------"+ cat_details.item(0).getElementsByTagName('a:Title').item(0).text);
			
			//var Name = cat_details.item(0).getElementsByTagName('a:Name').item(0).text;
			
			var section = Ti.UI.createListSection();
				var sections = [];
			 
				for (var i = 0; i < cat_details.length; i++) {
					
				    sections.push({
				       template:'template',title: {text:cat_details.item(i).getElementsByTagName('a:Title').item(0).text},
				       properties : {
				            itemId: cat_details.item(i).getElementsByTagName('a:ID').item(0).text,
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
			    
				//view_catDetailsFull.add(listView);
				
				listView.addEventListener('itemclick', function(e) {
					var item = e.section.getItemAt(e.itemIndex);
					Ti.API.info('Clicked row property : ' + item.properties.itemId);
					
					self.fireEvent('listItemSelected', {
								id_municip : item.properties.itemId,
								id : e.itemIndex
					});
					
				    //Ti.API.info('a ListItem was clicked!' + 'Item id - '+ e.itemId +'\n' + 'Bind Id - ' +e.bindId +'\n'+'Section Index - ' + e.sectionIndex + '\n'+ 'Item Index - '+ e.itemIndex);
				});
				
				self.add(listView);
			
			
		}	
		
	return self;
};
module.exports = ServicesItemsView;