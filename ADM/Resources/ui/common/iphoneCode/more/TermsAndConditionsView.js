

function TermsAndConditionsView(uniqueName){
	//var uniqueName = _uniqueName;
	var self=Ti.UI.createView({
		top:0,
		left:10,
		right:10,
		width:'100%',
		backgroundColor:Ti.App.DefaultBackGroundColor,
		layout:'vertical'
	});
	
	var HttpManager = require(L('HttpManager'));
	var httpManager = new HttpManager();
	
	httpManager.getGenericContentByUniqueName(uniqueName,function(arrList) {
		
		
		var lblTitle = Ti.UI.createLabel({
			top:0,
			width:'100%',
			textAlign:Ti.App.textAlign,
			color:Ti.App.TitleFontColor,
			text: arrList.item(0).getElementsByTagName('a:Title').item(0).text,
		    font:{fontSize:Ti.App.BigFontSize,fontWeight:'bold' }
		});
		self.add(lblTitle);
		
		
		 if(Ti.App.LanguageId == 1)
		      {
		      	var teramandconditon = '<div style="text-align:left;font-size:13px;color:#555555;">'+arrList.item(0).getElementsByTagName('a:Content').item(0).text+'</div>';
		      }
		      else{
		      	var teramandconditon = '<div style="text-align:right;font-size:13px;color:#555555;padding-right:13px;">'+arrList.item(0).getElementsByTagName('a:Content').item(0).text+'</div>';
		      }
		
		//var relatedEntities = arrList.item(0).getElementsByTagName('a:RelatedEntities').item(0).getElementsByTagName('b:RelatedEntitiesView');
		var webViewContent = Ti.UI.createWebView({
			top:10,
			left:0,
			wrapText:true,
			scalesPageToFit:true,
			layout:'vertical',
			height : "auto",
			color:Ti.App.DescriptionFontColor,
			html :teramandconditon,
			backgroundColor: 'transparent',
			font:{fontSize:Ti.App.SmallFontSize}
		});
		
		var htmlHack = '';
		htmlHack += 'var element = document.createElement("meta");';
		htmlHack += 'element.name = "viewport";';
		htmlHack += 'element.content = " initial-scale = 0.7";';
		htmlHack += 'var head = document.getElementsByTagName("head")[0];';
		htmlHack += 'head.appendChild(element);';
		 
		webViewContent.addEventListener('load', function(e) {
		    webViewContent.evalJS(htmlHack);
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