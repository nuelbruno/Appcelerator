function MylandCode() {

	var myland_view = Ti.UI.createView({
		//backgroundColor:'#ffffff'
		width : '100%',
		//bottom : GetWidth(50),
		//backgroundImage : Ti.App.imagePath + '1_splash.jpg',
		//zIndex : 3
	});

	var Header_controle = require(Ti.App.getcommonjsPath('Utils/headerView'));

	var Header_controle = new Header_controle('Select Area', true, '', true);

	myland_view.add(Header_controle);

	// ########## BACK EVENT ################ //
	// Header_controle.children[1].addEventListener('click',function(e){ alert('test');

	//   HomeView.show(); myland_view.hide();

	// });

	/*var button_moveforward = Ti.UI.createButton({
	title:'Move next window',
	width:'40%',
	height:'20%',
	top:100
	})

	button_moveforward.addEventListener('click',function(e){ alert('test');

	});*/

	// ########## Select Area view code ############# //
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
			myland_view.fireEvent('listItemSelected', {
							        module : 'zoneSelected',
									itemid : item.properties.itemId,
									id : e.itemIndex
						});
			

		});
		myland_view.add(listView);
	}

	

	return myland_view;
}

module.exports = MylandCode; 