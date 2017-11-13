function ServiceChildcategorywin(){
	var Child_view=Ti.UI.createWindow({
		barImage:Ti.App.ResourcePath + L('top_bar'),
		navBarHidden:true,
		tabBarHidden: true ,
		title:'Service',
		backgroundColor:Ti.App.DefaultBackGroundColor
	});
	
	
	
	
	return Child_view;
};
module.exports = ServiceChildcategorywin;
