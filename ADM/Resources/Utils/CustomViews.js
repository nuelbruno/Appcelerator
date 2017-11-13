Ti.App.customViews = {

	createCustomTabViews : function (obj2, tabName)
	{
		var obj1 = {label:tabName};
	    var obj3 = {};
	    for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
	    for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
	    return Ti.UI.createView(obj3);
	},
	
	showActivityIndicator : function()
	{
		var style;
		if (Ti.Platform.name === 'iPhone OS'){
		  style = Ti.UI.iPhone.ActivityIndicatorStyle.DARK;
		}
		else {
		  style = Ti.UI.ActivityIndicatorStyle.DARK;
		}
		var activityIndicator = Ti.UI.createActivityIndicator({
		  color: 'green',
		  font: {fontFamily:'Helvetica Neue', fontSize:26, fontWeight:'bold'},
		  message: 'Loading...',
		  style:style,
		  top:10,
		  left:10,
		  height:Ti.UI.SIZE,
		  width:Ti.UI.SIZE
		});
		App.baseWindow.add(activityIndicator);
		activityIndicator.show();
	},
	
	removeAllChildren : function(view)
	{		
		for(var i=0; i<view.children.length;i++)
		{
			if(view && view.children && view.children[view.children.length-1])
			view.remove(view.children[view.children.length-1]);
		}
	},
	
	removeActivityIndicator : function()
	{
		activityIndicator.hide();
		App.baseWindow.remove(activityIndicator);
		activityIndicator = undefined;
	}
	
	

};