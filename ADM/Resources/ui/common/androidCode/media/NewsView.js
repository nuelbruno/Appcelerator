function NewsView(){
	var selfNews = Ti.UI.createView({
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
	selfNews.add(imgNews);
	
	
	httpManager.getNewsList(function(arrList) {
		        var section = Ti.UI.createListSection();
				var sections = [];
				var RowData = [];
				
				
				 var table_news = Titanium.UI.createTableView({
							top : 100,
							left : GetWidth(5),
							
							showVerticalScrollIndicator: false,
							backgroundColor : Ti.App.DefaultBackGroundColor
						});
						selfNews.add(table_news);
		
				for (var i = 0; i < arrList.length; i++) {
						
						var row = Titanium.UI.createTableViewRow({
							height: GetHeight(100),
							value:arrList.item(i).getElementsByTagName('a:UniqueName').item(0).text
							//title : arrList.item(i).getElementsByTagName('a:Headline').item(0).text,
							//rightImage :Ti.App.ResourcePath + 'common/listing_arrow.png',
							
							//color:Ti.App.DescriptionFontColor,
				            //font:{ fontSize: Ti.App.SmallFontSize, fontWeight:'bold' }
							/* other properties */
						});
						
						var lblDate=Ti.UI.createLabel({
							top:5,
							left:0,
							height: GetHeight(15),
							wrapText:true,
							color:Ti.App.DescriptionFontColor,
							font: { fontSize: Ti.App.SmallFontSize, fontWeight:'bold' },
							text : 'Dec 12'
							
						});		
						row.add(lblDate);
						
						var lblTitle=Ti.UI.createLabel({
							top:GetHeight(20),
							left:0,
							height: GetHeight(30),
							wrapText:true,
							color: Ti.App.TitleFontColor,
							font: { fontSize:Ti.App.MediumFontSize },
							text : arrList.item(i).getElementsByTagName('a:Headline').item(0).text
							
						});		
						row.add(lblTitle);
						
						var lblDescription=Ti.UI.createLabel({
							top:GetHeight(50),
							left:0,
							wrapText:true,
							height: GetHeight(45),
							 color: Ti.App.DescriptionFontColor,
                			font: {  fontSize: Ti.App.SmallFontSize },
							text : arrList.item(i).getElementsByTagName('a:Summary').item(0).text
							
						});		
						row.add(lblDescription);
						
						RowData.push(row);
				   }
								
				  table_news.setData(RowData);
				  
				  table_news.addEventListener('click', function(e) {
					//alert('clicked' + e.rowData.value);
	              Ti.App.fireEvent('MediaViewItemSelected', {
	              					module : 'NewsDetails',
									 id : e.rowData.value,
									 uniqueName : e.rowData.value
									
						});
					});
		
				   // var section = Ti.UI.createListSection();
				   // var listView = Ti.UI.createListView({
				  	// top:100,
				  	// left:10,
				  	// properties:{
				  		// //height: 130,
				  	// },
				  	// sections: [section],
				    // templates: { 'template': Ti.App.NewsListTemplate },
				    // defaultItemTemplate: 'template',
				    // backgroundColor:Ti.App.DefaultBackGroundColor
				    // });
// 				    
					// var sections = [];  //a:Headline
// 					
// 					
				// //alert(arrList.length);
// 				
// 				
					// for (var i = 0; i < arrList.length; i++) {
// 						
						// //alert(arrList.item(i).getElementsByTagName('a:Headline').item(0).text);
						// //Ti.API.info(arrList.item(i).getElementsByTagName('a:Headline').item(0).text);
						// sections.push({
							// template:'template',
							// date:{textContent:'Dec 12' },
							// //info:{textContent:arrList.item(i).getElementsByTagName('a:Headline').item(0).text},
							// //es_info:{textContent:arrList.item(i).getElementsByTagName('a:Summary').item(0).text},
							// properties : {
					            // uniqueName: arrList.item(i).getElementsByTagName('UniqueName').item(0).text,
					            // accessoryType: Ti.UI.LIST_ACCESSORY_TYPE_NONE
					        // }
							// });
// 							
// 							
					// }
// 					
// 					
// 					
					// section.setItems(sections);
					// alert(sections);
					// self.add(listView);
// 					
// 					
// 					
					// listView.addEventListener('itemclick', function(e) {
						// var item = e.section.getItemAt(e.itemIndex);
						// //Ti.API.info('Clicked row property : ' + item.properties.itemId);
// 						
						// self.fireEvent('MediaViewItemSelected', {
									// module : 'NewsDetails',
									// id : e.itemIndex,
									// uniqueName : item.properties.uniqueName
						// });
// 						
					    // //Ti.API.info('a ListItem was clicked!' + 'Item id - '+ e.itemId +'\n' + 'Bind Id - ' +e.bindId +'\n'+'Section Index - ' + e.sectionIndex + '\n'+ 'Item Index - '+ e.itemIndex);
					// });
				
	});
	
  
	
	return selfNews;
};
module.exports = NewsView;
