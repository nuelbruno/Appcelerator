Ti.include(Ti.App.getResourceFile('Model/NewsModel.js'));
Ti.include('NewsDetailView.js');
var getNewsView = function(App) {
	var dataArray = [];
	var NewsView = Ti.App.customViews.createCustomTabViews({
		width : '100%',
		height : '100%',
		top : 0,
		layout : 'horizontal'
		},Ti.App.L('news'));
	function receivedDataFromServer(data)
	{
		if (data != undefined && data.data != undefined) {
			var xml = data.data;
			Ti.API.info(xml);

			var nodeList = xml.getElementsByTagName('s:Envelope').item(0).getElementsByTagName('s:Body').item(0).getElementsByTagName('SearchNewsResponse').item(0).getElementsByTagName('SearchNewsResult').item(0).getElementsByTagName('a:NewsView');
			if (nodeList.length > 0) {
				Ti.API.info(nodeList);
				for (var i = 0; i < nodeList.length; i++) {
					var img = '';
					if (nodeList.item(i).getElementsByTagName('MainImage').item(0) != undefined && nodeList.item(i).getElementsByTagName('MainImage').item(0) != null) {
						img = nodeList.item(i).getElementsByTagName('MainImage').item(0).textContent;
					}
					var cont = '';
					if (nodeList.item(i).getElementsByTagName('Content').item(0) != undefined && nodeList.item(i).getElementsByTagName('Content').item(0) != null) {
						cont = nodeList.item(i).getElementsByTagName('Content').item(0).textContent;
					}
					var temp = {
						headlines : nodeList.item(i).getElementsByTagName('a:Title').item(0).textContent,
						newsID : nodeList.item(i).getElementsByTagName('ID').item(0).textContent,
						newsThumb : img,
						Content : cont,
						date : nodeList.item(i).getElementsByTagName('CreatedDate').item(0).textContent,
					};
					// Ti.API.info(temp);
					dataArray.push(temp);
				};

				Ti.API.info('here ---- >');
				var scrollView = Ti.UI.createScrollView({
					top : 0,
					left : 0,
					right : 0,
					bottom : 0,
					contentHeight : Ti.UI.SIZE,
					contentWidth : Ti.Platform.displayCaps.platformWidth,
					// backgroundColor:'green'
				});

				Ti.API.info('here ---- > 2');

				var contentView = Ti.UI.createView({
					width : Ti.Platform.displayCaps.platformWidth,
					height : Ti.UI.SIZE,
					layout : 'horizontal',
					// backgroundColor:'green',
					left : 0
				});

				Ti.API.info('here ---- > 3');

				for (var i = 0; i < dataArray.length; i++) {

					Ti.API.info('here ---- > 4 ' + i);

					var thumbnailView = Ti.UI.createView({
						width : (Ti.Platform.displayCaps.platformWidth / 3) - 1.3,
						height : ((Ti.Platform.displayCaps.platformWidth / 3) - 1.3) * 77 / 53,
						left : 1,
						top : 1,
						index : i,
						backgroundColor : '#E8E8E8',
					});

					var imageView = Ti.UI.createImageView({
						width : '100%',
						height : '68.50%',
						top : 0,
						image : encodeURI('http://www.dmca.ae/'+dataArray[i].newsThumb),
						touchEnabled : false
					});

					Ti.API.info('desc ---------- >' + dataArray[i].headlines);

					var label = Ti.UI.createLabel({
						text : ' ' + dataArray[i].headlines,
						height : Ti.FILL,
						color : 'black',
						top : '68.50%',
						left : 0,
						right : 0,
						touchEnabled : false,
						font : {
							fontSize : '10sp'
						},
						textAlign : 'center'
					});
					thumbnailView.add(imageView);
					thumbnailView.add(label);
					thumbnailView.addEventListener('click', function(e) {
						Ti.API.info('here ---- > 2');

						if (e.source.index != undefined)
							{
								var win2 = getNewsDetailView(App, dataArray[e.source.index]);
								win2.open();
							}
					});
					contentView.add(thumbnailView);
				}
				scrollView.add(contentView);
				NewsView.add(scrollView);
			}
		}
	};
	NewsView.reload = function() {
		// alert('focus');
		getNewsParameters(App, receivedDataFromServer);
	};
	return NewsView;
}; 