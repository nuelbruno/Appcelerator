

function TermsAndConditionsView(uniqueName){
	//var uniqueName = _uniqueName;
	var self=Ti.UI.createView({
		top:0,
		left:10,
		right:10,
		layout:'vertical'
	});
	
	var HttpManager = require(L('HttpManager'));
	var httpManager = new HttpManager();
	
	httpManager.getGenericContentByUniqueName(uniqueName,function(arrList) {
		
		
		var lblTitle = Ti.UI.createLabel({
			top:0,
			left:0,
			color:Ti.App.TitleFontColor,
			text: arrList.item(0).getElementsByTagName('a:Title').item(0).text,
		    font:{fontSize:Ti.App.BigFontSize,fontWeight:'bold' }
		});
		self.add(lblTitle);
		
		
		
		
		//var relatedEntities = arrList.item(0).getElementsByTagName('a:RelatedEntities').item(0).getElementsByTagName('b:RelatedEntitiesView');
		var webViewContent = Ti.UI.createWebView({
			top:10,
			left:0,
			wrapText:true,
			layout:'vertical',
			height : "auto",
			color:Ti.App.DescriptionFontColor,
			html :arrList.item(0).getElementsByTagName('a:Content').item(0).text ,
			backgroundColor:Ti.App.DefaultBackGroundColor,
			font:{fontSize:Ti.App.SmallFontSize}
		});
		
		// var imgMap=Ti.UI.createImageView({
			// top: 10,
			// width:300,
			// height:150,
			// image:Ti.App.CMSDataFolderDomainPath + relatedEntities.item(1).getElementsByTagName('b:Url').item(0).text
// 			
		// });
		// self.add(imgMap);
		
		self.add(webViewContent);
	
	
	});
	return self;
};
module.exports = TermsAndConditionsView;