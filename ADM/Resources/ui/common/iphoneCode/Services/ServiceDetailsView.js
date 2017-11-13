function ServiceDetailsView(id){
	//var uniqueName = _uniqueName;
	var self=Ti.UI.createView({
		top:0,
		width:'92%',
		left:10,
		right:10,
		layout:'vertical'
	});
	
	var HttpManager = require(L('HttpManager'));
	var httpManager = new HttpManager();
	
	httpManager.getMuncipalDetailById(id,function(arrList) {
			var lblTitle = Ti.UI.createLabel({
			top:0,
			//left:0,
			width:'100%',
			textAlign:Ti.App.textAlign,
			color:Ti.App.TitleFontColor,
			text: arrList.item(0).getElementsByTagName('a:Title').item(0).text,
		    font:{fontSize:Ti.App.BigFontSize,fontWeight:'bold' }
		});
		self.add(lblTitle);
		
		var lblServiceDescription = Ti.UI.createLabel({
			top:10,
			width:'100%',
			textAlign:Ti.App.textAlign,
			color:Ti.App.DescriptionFontColor,
			text:Ti.App.LG('ServiceDescription'),
		    font:{fontSize:Ti.App.BigFontSize,fontWeight:'bold' }
		});
		self.add(lblServiceDescription);
		
		var lblDescription = Ti.UI.createLabel({
			top:10,
			width:'100%',
			textAlign:Ti.App.textAlign,
			color:Ti.App.DescriptionFontColor,
			text:arrList.item(0).getElementsByTagName('a:Description').item(0).text,
		    font:{fontSize:Ti.App.SmallFontSize }
		});
		self.add(lblDescription);
		
		var lblFirstStopforClient = Ti.UI.createLabel({
			top:10,
			width:'100%',
			textAlign:Ti.App.textAlign,
			color:Ti.App.DescriptionFontColor,
			text:Ti.App.LG('FirstStopforClient'),
		    font:{fontSize:Ti.App.BigFontSize,fontWeight:'bold' }
		});
		self.add(lblFirstStopforClient);
		
		var lblFirstStopforClient1 = Ti.UI.createLabel({
			top:10,
			width:'100%',
			textAlign:Ti.App.textAlign,
			color:Ti.App.DescriptionFontColor,
			text:arrList.item(0).getElementsByTagName('a:ClientEntryPoint').item(0).text,
		    font:{fontSize:Ti.App.SmallFontSize }
		});
		self.add(lblFirstStopforClient1);
		
		var lblDocumentsRequired = Ti.UI.createLabel({
			top:10,
			width:'100%',
			textAlign:Ti.App.textAlign,
			color:Ti.App.DescriptionFontColor,
			text:Ti.App.LG('DocumentsRequired'),
		    font:{fontSize:Ti.App.BigFontSize,fontWeight:'bold' }
		});
		self.add(lblDocumentsRequired);
		
		var lblDocumentsRequired1 = Ti.UI.createLabel({
			top:10,
			width:'100%',
			textAlign:Ti.App.textAlign,
			color:Ti.App.DescriptionFontColor,
			text:arrList.item(0).getElementsByTagName('a:RequiredDocuments').item(0).text,
		    font:{fontSize:Ti.App.SmallFontSize }
		});
		self.add(lblDocumentsRequired1);
		
		var lblFees = Ti.UI.createLabel({
			top:10,
			width:'100%',
			textAlign:Ti.App.textAlign,
			color:Ti.App.DescriptionFontColor,
			text:Ti.App.LG('Fees'),
		    font:{fontSize:Ti.App.BigFontSize,fontWeight:'bold' }
		});
		self.add(lblFees);
		
		var lblFees1 = Ti.UI.createLabel({
			top:10,
			width:'100%',
			textAlign:Ti.App.textAlign,
			color:Ti.App.DescriptionFontColor,
			text:arrList.item(0).getElementsByTagName('a:RequiredFees').item(0).text,
		    font:{fontSize:Ti.App.SmallFontSize }
		});
		self.add(lblFees1);
		
		
		
		
	});
	
	
	return self;
};
module.exports = ServiceDetailsView;

