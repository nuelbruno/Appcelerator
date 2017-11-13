
// var activityIndicator;
Ti.App.customViews = {

	createCustomTabViews : function (obj2, tabName)
	{
		var obj1 = {label:tabName};
	    var obj3 = {};
	    for (var attrname in obj1)
	    {
	    	obj3[attrname] = obj1[attrname];
	    }
	    for (var attrname in obj2)
		{
			obj3[attrname] = obj2[attrname];
		}
	    return Ti.UI.createView(obj3);
	},
	
	showActivityIndicator : function()
	{
		Ti.App.baseWindow.touchEnabled = false;
		var style;
		if (Ti.Platform.name === 'iPhone OS'){
		  style = Ti.UI.iPhone.ActivityIndicatorStyle.DARK;
		}
		else {
		  style = Ti.UI.ActivityIndicatorStyle.DARK;
		}
		Ti.App.activityIndicator = Ti.UI.createActivityIndicator({
		  color: 'black',
		  font: {fontFamily:'Helvetica Neue', fontSize:'26sp', fontWeight:'bold'},
		  message: 'Loading...',
		  style:style,
		  height:Ti.UI.SIZE,
		  width:Ti.UI.SIZE,
		  zIndex:100
		});
		
		Ti.App.baseWindow.add(Ti.App.activityIndicator);
		Ti.App.activityIndicator.show();
	},
	
	removeActivityIndicator : function()
	{
		if(Ti.App.activityIndicator)
		{
			Ti.App.activityIndicator.hide();
			Ti.App.baseWindow.remove(Ti.App.activityIndicator);
			Ti.App.activityIndicator = undefined;
			Ti.App.baseWindow.touchEnabled = true;
		}
	},
	
	removeAllChildren : function(view)
	{		
		for(var i=0; i<view.children.length;i++)
		{
			if(view && view.children && view.children[view.children.length-1])
			view.remove(view.children[view.children.length-1]);
		}
	},

};