function AboutUsView(){
	var self = Ti.UI.createView({
		top:0,
		left:0,
		right:0
	});
	var HttpManager = require(L('HttpManager'));
	var httpManager = new HttpManager();
	
	var scrollviewOurVision= Ti.UI.createScrollView({
		top:0,
		left:0,
		layout:'vertical'
	});
	
	// var viewOurVision = Ti.UI.createView({
		// top:0,
		// left:0,
		// right:0,
		// height:270, 
		// layout:'vertical',
		// backgroundColor:'#ecefde'
	// });
// 	
	// var viewOurVisionSub = Ti.UI.createView({
		// top:10,
		// left:10,
		// right:10,
// 		
		// layout:'vertical'
	// });
// 	
	// var lblOurVision = Ti.UI.createLabel({
	  // top:0,
	  // left:0,
	  // text: 'Our Vision',
	  // color:Ti.App.TitleFontColor,
	  // font:{fontSize:Ti.App.BigFontSize,fontWeight:'bold' }
	// });
	// var lblOurVisionDescription = Ti.UI.createLabel({
		// top:10,
		// left:0,
		// wrapText:true,
		// color:Ti.App.DescriptionFontColor,
		// text : 'To be recognized as an efficient world class Municipal System ensuring sustainable development and enhancing the quality of life for the Emirate of Abu Dhabi',
		// font:{fontSize:Ti.App.SmallFontSize}
	// });
// 	
	// var imgOurVision =Ti.UI.createImageView({
		// top:30,
		// left:0,
		// image:Ti.App.ResourcePath + 'common/ourVision.png',
		// width:310,
		// height:121
// 		
	// });
	// viewOurVisionSub.add(lblOurVision);
	// viewOurVisionSub.add(lblOurVisionDescription);
	// viewOurVisionSub.add(imgOurVision);
// 	
	// viewOurVision.add(viewOurVisionSub);
// 	
// 	
	// //Mission
	// var viewOurMission = Ti.UI.createView({
		// top:0,
		// left:0,
		// right:0,
		// height:270,
		// backgroundColor:Ti.App.DefaultBackGroundColor,
		// layout:'vertical',
	// });
// 	
	// var viewOurMissionSub = Ti.UI.createView({
		// top:10,
		// left:10,
		// right:10,
		// layout:'vertical'
	// });
// 	
	// var lblOurMission = Ti.UI.createLabel({
	  // top:0,
	  // left:0,
	  // text: 'Our Mission',
	  // color:Ti.App.TitleFontColor,
	  // font:{fontSize:Ti.App.BigFontSize,fontWeight:'bold' }
	// });
	// var lblOurMissionDescription = Ti.UI.createLabel({
		// top:10,
		// left:0,
		// wrapText:true,
		// color:Ti.App.DescriptionFontColor,
		// text : 'To Deliver Best in-Class Efficient and Customer Centric Municipal Services by engaging with our Community & Partners',
		// font:{fontSize:Ti.App.SmallFontSize}
	// });
// 	
	// var imgOurMission =Ti.UI.createImageView({
		// top:30,
		// left:0,
		// image:'http://adm.gov.ae/uploads/mission.jpg',
		// width:310,
		// height:121
// 		
	// });
	// viewOurMissionSub.add(lblOurMission);
	// viewOurMissionSub.add(lblOurMissionDescription);
	// viewOurMissionSub.add(imgOurMission);
// 	
	// viewOurMission.add(viewOurMissionSub);
// 	
// 	
	// //Values
	// var viewOurValues = Ti.UI.createView({
		// top:0,
		// left:0,
		// right:0,
		// height:310,
		// backgroundColor:'#ecefde',
		// layout:'vertical',
	// });
// 	
	// var viewOurValuesSub = Ti.UI.createView({
		// top:10,
		// left:10,
		// right:10,
		// layout:'vertical'
	// });
// 	
	// var lblOurValues = Ti.UI.createLabel({
	  // top:0,
	  // left:0,
	  // text: 'Our Values',
	  // color:Ti.App.TitleFontColor,
	  // font:{fontSize:Ti.App.BigFontSize,fontWeight:'bold' }
	// });
	// var lblOurValuesDescription = Ti.UI.createLabel({
		// top:10,
		// left:0,
		// wrapText:true,
		// color:Ti.App.DescriptionFontColor,
		// text : '- Customer service \n- Develop our people \n- Accountability \n- Excellence \n- Knowledge sharing \n- Collaboration \n- Innovation',
		// font:{fontSize:Ti.App.SmallFontSize}
	// });
// 	
	// var imgOurValues =Ti.UI.createImageView({
		// top:30,
		// left:0,
		// image:'http://adm.gov.ae/uploads/values2.jpg',
		// width:310,
		// height:121
// 		
	// });
	// viewOurValuesSub.add(lblOurValues);
	// viewOurValuesSub.add(lblOurValuesDescription);
	// viewOurValuesSub.add(imgOurValues);
// 	
	// viewOurValues.add(viewOurValuesSub);
// 	
// 	
	// scrollviewOurVision.add(viewOurVision);
	// scrollviewOurVision.add(viewOurMission);
	// scrollviewOurVision.add(viewOurValues);
// 	
	// self.add(scrollviewOurVision);
	
	
	httpManager.getGenericContentList(Ti.App.AboutUsDetailsGenericContentCategoryUniqueName,function(arrList) {
		for (var i = 0; i < arrList.length; i++) {
			
			var title=arrList.item(i).getElementsByTagName('a:Title').item(0).text;
			var content =arrList.item(i).getElementsByTagName('a:Content').item(0).text;
			
			var relatedEntities = arrList.item(i).getElementsByTagName('a:RelatedEntities').item(0).getElementsByTagName('b:RelatedEntitiesView');
		 	var relatedImage = Ti.App.CMSDataFolderDomainPath + relatedEntities.item(0).getElementsByTagName('b:Url').item(0).text;
			//alert(relatedImage);
			Ti.API.info(relatedImage);
			
			if(i ==0 )//OUr Vision
			{
				var viewOurVision = Ti.UI.createView({
					top:0,
					left:0,
					right:0,
					height:270, 
					layout:'vertical',
					backgroundColor:'#ecefde'
				});
				
				var viewOurVisionSub = Ti.UI.createView({
					top:10,
					left:10,
					right:10,
					
					layout:'vertical'
				});
				
				var lblOurVision = Ti.UI.createLabel({
				  top:0,
				  left:0,
				  text: title,
				  color:Ti.App.TitleFontColor,
				  font:{fontSize:Ti.App.BigFontSize,fontWeight:'bold' }
				});
				var lblOurVisionDescription = Ti.UI.createLabel({
					top:10,
					left:0,
					wrapText:true,
					color:Ti.App.DescriptionFontColor,
					text : content,
					font:{fontSize:Ti.App.SmallFontSize}
				});
				
				var imgOurVision =Ti.UI.createImageView({
					top:30,
					left:0,
					image:relatedImage,
					width:'100%',//310,
					height:121
					
				});
				viewOurVisionSub.add(lblOurVision);
				viewOurVisionSub.add(lblOurVisionDescription);
				viewOurVisionSub.add(imgOurVision);
				
				viewOurVision.add(viewOurVisionSub);
				scrollviewOurVision.add(viewOurVision);
			}
			else if(i ==1 )//OUr MIssion
			{
				//Mission
				var viewOurMission = Ti.UI.createView({
					top:0,
					left:0,
					right:0,
					height:270,
					backgroundColor:Ti.App.DefaultBackGroundColor,
					layout:'vertical',
				});
				
				var viewOurMissionSub = Ti.UI.createView({
					top:10,
					left:10,
					right:10,
					layout:'vertical'
				});
				
				var lblOurMission = Ti.UI.createLabel({
				  top:0,
				  left:0,
				  text: title,
				  color:Ti.App.TitleFontColor,
				  font:{fontSize:Ti.App.BigFontSize,fontWeight:'bold' }
				});
				var lblOurMissionDescription = Ti.UI.createLabel({
					top:10,
					left:0,
					wrapText:true,
					color:Ti.App.DescriptionFontColor,
					text : content,
					font:{fontSize:Ti.App.SmallFontSize}
				});
				
				var imgOurMission =Ti.UI.createImageView({
					top:30,
					left:0,
					image:relatedImage,
					width:'100%',//310,
					height:121
					
				});
				viewOurMissionSub.add(lblOurMission);
				viewOurMissionSub.add(lblOurMissionDescription);
				viewOurMissionSub.add(imgOurMission);
				
				viewOurMission.add(viewOurMissionSub);
				scrollviewOurVision.add(viewOurMission);
			}
			else if(i ==2 )
			{
				//Values
				var viewOurValues = Ti.UI.createView({
					top:0,
					left:0,
					right:0,
					height:310,
					backgroundColor:'#ecefde',
					layout:'vertical',
				});
				
				var viewOurValuesSub = Ti.UI.createView({
					top:10,
					left:10,
					right:10,
					layout:'vertical'
				});
				
				var lblOurValues = Ti.UI.createLabel({
				  top:0,
				  left:0,
				  text: title,
				  color:Ti.App.TitleFontColor,
				  font:{fontSize:Ti.App.BigFontSize,fontWeight:'bold' }
				});
				var lblOurValuesDescription = Ti.UI.createLabel({
					top:10,
					left:0,
					wrapText:true,
					color:Ti.App.DescriptionFontColor,
					text :content, //'- Customer service \n- Develop our people \n- Accountability \n- Excellence \n- Knowledge sharing \n- Collaboration \n- Innovation',
					font:{fontSize:Ti.App.SmallFontSize}
				});
				
				var imgOurValues =Ti.UI.createImageView({
					top:30,
					left:0,
					image:relatedImage,//'http://adm.gov.ae/uploads/values2.jpg',
					width:'100%',//310,
					height:121
					
				});
				viewOurValuesSub.add(lblOurValues);
				viewOurValuesSub.add(lblOurValuesDescription);
				viewOurValuesSub.add(imgOurValues);
				
				viewOurValues.add(viewOurValuesSub);
				
				scrollviewOurVision.add(viewOurValues);
			}
		   
		}
	});
	
	self.add(scrollviewOurVision);
	// httpManager.getGenericContentByUniqueName(Ti.App.AboutUsDetailsGenericContentCategoryUniqueName,function(arrList) {
		// //alert( arrList);
		// //alert( arrList.item(0).getElementsByTagName('GetGenericContentByUniqueNameResult'));
// 		
		// var lblTitle = Ti.UI.createLabel({
			// top:0,
			// left:0,
			// color:Ti.App.TitleFontColor,
			// text: arrList.item(0).getElementsByTagName('a:Title').item(0).text,
		    // font:{fontSize:Ti.App.BigFontSize,fontWeight:'bold' }
		// });
		// self.add(lblTitle);
// 		
// 		
// 		
		// // var imgNews=Ti.UI.createImageView({
			// // top:10,
			// // width:300,
			// // height:90,
			// // image:Ti.App.ResourcePath + 'common/temp_news_img.png',
	// // 		
		// // });
		// // self.add(imgNews);
// 		
		// var webViewContent = Ti.UI.createWebView({
			// top:20,
			// left:0,
			// wrapText:true,
			// color:Ti.App.DescriptionFontColor,
			// html :arrList.item(0).getElementsByTagName('a:Content').item(0).text ,
			// backgroundColor:Ti.App.DefaultBackGroundColor,
			// font:{fontSize:Ti.App.SmallFontSize}
		// });
// 		
		// self.add(webViewContent);
// 	
// 	
	// });
	return self;
};
module.exports =AboutUsView;
