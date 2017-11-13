function plotSelected(){
	var self = Ti.UI.createView({
		top:0,
		left:0,
		right:0
	});
	
	
	var Header_controle = require(Ti.App.getcommonjsPath('Utils/headerView'));

	var Header_controle = new Header_controle('Plot Select', true, '', true);

	self.add(Header_controle);
		
	// ##########  LISTING OF ALL VIEWS IN TAB ################ //
	var HttpManager = require(Ti.App.getcommonjsPath('Utils/HttpManager'));
	var httpManager = new HttpManager();

	var httpManager = httpManager.webserviceMyland(function(e) {
		curentItem = e;
		show_Myland();
	});

	function show_Myland() {

		var listView = Ti.UI.createListView({
			top : GetHeight(50),
			left : GetWidth(0),
			backgroundColor : Ti.App.DefaultBackGroundColor
		});

		var data = [];
		for (var i = 0; i < curentItem.length; i++) {
			data.push({
				properties : {
					itemId : curentItem[i].Headline,
					title : curentItem[i].UniqueName,
					//image : curentItem[i].icon,
					accessoryType : Ti.UI.LIST_ACCESSORY_TYPE_NONE,
					color : '#666666',
				}
			});
		}

		var section = Ti.UI.createListSection();
		section.setItems(data);
		listView.sections = [section];
		listView.addEventListener('itemclick', function(e) {
			
			var item = e.section.getItemAt(e.itemIndex);
			Ti.API.info('Clicked row property : ' + item.properties.itemId);
			self.fireEvent('listItemSelected', {
							        module : 'mapShow',
									itemid : item.properties.itemId,
									id : e.itemIndex
						});

		});
		self.add(listView);
	}
			
	
	
	
	return self;
	
};
module.exports = plotSelected;