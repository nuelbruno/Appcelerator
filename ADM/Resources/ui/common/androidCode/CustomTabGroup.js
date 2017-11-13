function CustomTabGroup(){
	var self=Ti.UI.createWindow({
		top:0,
	    left:0,
	});
	
	var bottomTabGroup=Ti.UI.createView({
		bottom:0,
		height:107,
		backgroundColor:'black'
		
	});
	
	var btnFindUs=Ti.UI.createButton({
		image:'images/iphoneimages/bottom_tabs/find_us.png',
		width:160,
		height:70,
		left:0
	});
	
	var btnEservice=Ti.UI.createButton({
		image:'images/iphoneimages/bottom_tabs/eservices.png',
		width:160,
		height:107,
		left:160	
	});
	
	var btnContactUs=Ti.UI.createButton({
		image:'images/iphoneimages/bottom_tabs/contact_us.png',
		width:160,
		height:107,
		left:320
	});
	
	var btnMore = Ti.UI.createButton({
		image:'images/iphoneimages/bottom_tabs/more.png',
		width:160,
		height:107,
		left:480
	});
	
	bottomTabGroup.add(btnFindUs);
	bottomTabGroup.add(btnEservice);
	bottomTabGroup.add(btnContactUs);
	bottomTabGroup.add(btnMore);
	
	self.add(bottomTabGroup);
	
	return self;
	
	
	
};
module.exports =CustomTabGroup;
