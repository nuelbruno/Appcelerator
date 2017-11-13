var getInteractiveMaps = function(){
	var dataArray = [
		{name:'dmcamarinemap',imagePrefix:'DMCAMarineMap',imagePostfix:'.jpg'},
		{name:'jet_ski',imagePrefix:'JetSkiUsages',imagePostfix:'.jpg'},
		{name:'restricted_area',imagePrefix:'RestrictedAreas',imagePostfix:'.jpg'}];
		
	var MapsView = Ti.UI.createView({width:'100%',height:'100%',top:0,layout:'horizontal', headerTitle:Ti.App.L('interactivemaps')});
	if(dataArray.length>0)
	{
		var scrollView = Ti.UI.createScrollView({
			top:0,
			left:0,
			right:0,
			bottom:0,
			contentHeight:Ti.UI.SIZE,
			contentWidth:Ti.Platform.displayCaps.platformWidth
		});
		var contentView = Ti.UI.createView({
			width:Ti.Platform.displayCaps.platformWidth,
			height:Ti.UI.SIZE,
			layout:'horizontal',
			top:'2dp'
		});
		for(var i=0;i<dataArray.length;i++)
		{
		
			var thumbnailView = Ti.UI.createView({
				width : Ti.Platform.displayCaps.platformWidth/3-1.3,
				height : (Ti.Platform.displayCaps.platformWidth/3-1.3)*98/83,
				left :1,
				top:0,
				index:i
			});
			
			// alert(dataArray[i].imagePrefix+Ti.App.LangID+dataArray[i].imagePostfix);
			
			var imageView = Ti.UI.createView({
				backgroundImage:Ti.App.getResourceFile('images/'+dataArray[i].imagePrefix+'Thumb'+Ti.App.LangID+dataArray[i].imagePostfix),
				width:'100%',
				height:'100%',
				touchEnabled:false
			});
			
			var label = Ti.UI.createLabel({
				backgroundImage:Ti.App.getResourceFile('images/Common/MediaListTransparentEffect.png'),
				text:' '+Ti.App.L(dataArray[i].name),
				height:'15%',
				color:'white',
				width:'100%',
				touchEnabled:false,
				font: {fontSize:'12sp',fontWeight:'bold'},
				bottom:0
			});
			
			thumbnailView.add(imageView);
			thumbnailView.add(label);
			thumbnailView.addEventListener('click',function(e){
				if(e.source.index!=undefined)
				{
					var cls = require(Ti.App.getResourceFile('View/InteractiveMapDetails'));//getDetail(App, {image:e.source.imagePath, text : e.source.text});
					var object = new cls(dataArray[e.source.index]);
					alert(object);
					object.open();
					// alert(Ti.App.baseWindow.contentView);
					// Ti.App.baseWindow.contentView.add(object);
				};
			});
			contentView.add(thumbnailView);
		}
		scrollView.add(contentView);
		MapsView.add(scrollView);
	}
	return MapsView;
};
module.exports = getInteractiveMaps;