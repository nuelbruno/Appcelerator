
function tabgroup()
{
	
// ################# TAB GROPU CREATING #################### //
	var App;
	Ti.include(Titanium.Filesystem.resourcesDirectory+'/Utils/CustomTab.js');
	var FindUs = function()
	{
		var Findview = Ti.App.customViews.createCustomTabViews({width:'100%',height:'100%',top:0,layout:'horizontal'},'Find Us');
		
		var finduscode = require(Ti.App.getcommonjsPath('View/FindusView'));

	    var finduscode = new finduscode();
		
		Findview.add(finduscode);
		
		return Findview;
	};
	
	var eService = function()
	{
		var eServiceview = Ti.App.customViews.createCustomTabViews({width:'100%',height:'100%',top:0,layout:'horizontal'},'eService');
		
		var eServicecode = require(Ti.App.getcommonjsPath('View/eServiceView'));

	    var eServicecode = new eServicecode();
		
		eServiceview.add(eServicecode);
		
		return eServiceview;
	};
	
	var contactus = function()
	{
		var contactus = Ti.App.customViews.createCustomTabViews({width:'100%',height:'100%',top:0,layout:'horizontal'},'Contact Us');
		
		var ContactusCode = require(Ti.App.getcommonjsPath('View/ContactusView'));

	    var ContactusCode = new ContactusCode();
		
		contactus.add(ContactusCode);
		
		return contactus;
	};
	
	var more = function()
	{
		var moreView = Ti.App.customViews.createCustomTabViews({width:'100%',height:'100%',top:0,layout:'horizontal'},'More');
		
		var MoreCode = require(Ti.App.getcommonjsPath('View/MoreView'));

	    var MoreCode = new MoreCode();
		
		moreView.add(MoreCode);
	    
		return moreView;
	};
	
	var tabViewArray = [];
	var view1 = FindUs();
	var view2 = eService();
	var view3 = contactus();
	var view4 = more();
	
	tabViewArray.push(view1);
	tabViewArray.push(view2);
	tabViewArray.push(view3);
	tabViewArray.push(view4);
	var all_tab_group = createCustomTab(App, tabViewArray);
	
	return all_tab_group;
	
}
module.exports = tabgroup;