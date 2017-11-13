function NewsDetailsView(uniqueName){
	//var uniqueName = _uniqueName;
	var self=Ti.UI.createView({
		top:0,
		left:10,
		right:10,
		layout:'vertical'
	});
	
	var HttpManager = require(L('HttpManager'));
	var httpManager = new HttpManager();
	
	httpManager.getNewsDetailsByUniqueName(uniqueName,function(arrList) {
			var lblTitle = Ti.UI.createLabel({
			top:0,
			left:0,
			color:Ti.App.TitleFontColor,
			text: arrList.item(0).getElementsByTagName('a:Headline').item(0).text,
		    font:{fontSize:Ti.App.BigFontSize,fontWeight:'bold' }
		});
		self.add(lblTitle);
		
		var lblDate = Ti.UI.createLabel({
			top:10,
			left:0,
			color:Ti.App.DescriptionFontColor,
			text:'15 dec 2013',
		    font:{fontSize:Ti.App.SmallFontSize }
		});
		self.add(lblDate);
		
		var imgNews=Ti.UI.createImageView({
			top:10,
			width:300,
			height:90,
			image:Ti.App.ResourcePath + 'common/temp_news_img.png',
			
		});
		//self.add(imgNews);
		
		var webViewContent = Ti.UI.createWebView({
			top:10,
			left:0,
			wrapText:true,
			color:Ti.App.DescriptionFontColor,
			html :arrList.item(0).getElementsByTagName('a:Content').item(0).text,
			backgroundColor:Ti.App.DefaultBackGroundColor,
			font:{fontSize:Ti.App.SmallFontSize}
		});
		
		self.add(webViewContent);
	});
	
	
	return self;
};
module.exports = NewsDetailsView;
