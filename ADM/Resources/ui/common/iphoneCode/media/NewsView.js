function NewsView(){
	var self = Ti.UI.createView({
		top:50,
		left:0,
		backgroundColor:Ti.App.DefaultBackGroundColor
	});

var HttpManager = require(L('HttpManager'));
var httpManager = new HttpManager();

     var imgNews=Ti.UI.createImageView({
		top:10,
		width:300,
		height:90,
		image:Ti.App.ResourcePath + 'common/temp_news_img.png',
		
	});
	self.add(imgNews);
	
	
	httpManager.getNewsList(function(arrList) {
				   var section = Ti.UI.createListSection();
				   var listView = Ti.UI.createListView({
				  	top:100,
				  	left:10,
				  	properties:{
				  		//height: 130,
				  	},
				  	sections: [section],
				    templates: { 'template': Ti.App.NewsListTemplate },
				    defaultItemTemplate: 'template',
				    backgroundColor:Ti.App.DefaultBackGroundColor
				    });
				    
					var sections = [];  //a:Headline
					
					//alert(JSON.stringify(arrList));
				
					for (var i = 0; i < arrList.length; i++) {
						
						//alert(arrList.item(i).getElementsByTagName('a:Headline').item(0).text);
						
						sections.push({
							template:'template',
							date:{text:'Dec 12' },
							info:{text:arrList.item(i).getElementsByTagName('a:Headline').item(0).text},
							es_info:{text:arrList.item(i).getElementsByTagName('a:Summary').item(0).text},
							properties : {
					            uniqueName: arrList.item(i).getElementsByTagName('UniqueName').item(0).text,
					            accessoryType: Ti.UI.LIST_ACCESSORY_TYPE_NONE
					        }
							});
					}
					section.setItems(sections);
					
					self.add(listView);
					
					
					
					listView.addEventListener('itemclick', function(e) {
						var item = e.section.getItemAt(e.itemIndex);
						//Ti.API.info('Clicked row property : ' + item.properties.itemId);
						
						self.fireEvent('MediaViewItemSelected', {
									module : 'NewsDetails',
									id : e.itemIndex,
									uniqueName : item.properties.uniqueName
						});
						
					    //Ti.API.info('a ListItem was clicked!' + 'Item id - '+ e.itemId +'\n' + 'Bind Id - ' +e.bindId +'\n'+'Section Index - ' + e.sectionIndex + '\n'+ 'Item Index - '+ e.itemIndex);
					});
				
	});
	
  
	
	return self;
};
module.exports = NewsView;
