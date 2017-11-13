var getIMapDetailView = function(data) {
	//alert(data); //{name:'DMCA Marine Map',imagePrefix:'DMCAMarineMap',imagePostfix:'.jpg'}

	var galleryWindow = Ti.UI.createWindow({
		backgroundColor : 'white',
		fullscreen : true
	});
	// Ti.API.trace(Ti.App.getResourceFile( 'images/Common/Back.png');
	var backButton = Ti.UI.createView({
		backgroundImage : Ti.App.getResourceFile( 'images/Common/Back.png'),
		height : '40%',
		width : Ti.Platform.displayCaps.platformHeight / 10 * 40 / 100 * 1.158,
		left : '2%'
	});
	backButton.addEventListener('click', function() {
		galleryWindow.close();
	});

	var headerView = Ti.UI.createView({
		width : Ti.Platform.displayCaps.platformWidth,
		height : Ti.Platform.displayCaps.platformHeight * 10 / 100,
		top : 0,
		backgroundGradient : {
			type : 'linear',
			startPoint : {
				x : '50%',
				y : '0%'
			},
			endPoint : {
				x : '50%',
				y : '100%'
			},
			colors : ['#107FCC', '#0A3A72']
		}
	});

	var titleBar = Ti.UI.createLabel({
		width : '100%',
		height : '100%',
		textAlign : 'center',
		text : 'Gallery',
		color : 'white',
		text:data.name
	});

	headerView.add(titleBar);
	headerView.add(backButton);

	/*************** Image view ***************/
	
	var imageTemp = Ti.UI.createImageView({
		image : (Ti.App.getResourceFile('images/'+data.imagePrefix+Ti.App.LangID+data.imagePostfix)),
		height:'auto',
		width:'auto'
	});
	Ti.API.info( "height=" + imageTemp.size.height);
	Ti.API.info( "width=" + imageTemp.size.width);
	
	var imageHeight = Ti.Platform.displayCaps.platformHeight*90/100;
	var imageWidth = imageTemp.size.width*imageTemp.size.height/imageHeight;
	
	imageTemp = null;
	
	var imageView = Ti.UI.createImageView({
		image:Ti.App.getResourceFile('images/'+data.imagePrefix+Ti.App.LangID+data.imagePostfix),
		width:'100%',
		height:'100%',
		left:0,
		// top:'10%',
		backgroundColor:'green'
	});
	
	var scrollView = Ti.UI.createScrollView({
		contentHeight:imageHeight,
		contentWidth:imageWidth,
		top : '10%',
		bottom : 0,
		width:'100%',
		showHorizontalScrollIndicator:true,
		showVerticalScrollIndicator : true,
		minZoomScale:1,
		maxZoomScale : 10,
		// contentOffset: {x:0,y:0}
	});

	scrollView.add(imageView);
	var gradientLbl = Ti.UI.createLabel({
		backgroundImage : Ti.App.getResourceFile( 'images/Common/MediaListTransparentEffect.png'),
		width : '100%',
		height : '15%',
		bottom : 0,
		text : '   ' + data.name,
		color : 'white',
		font : {
			fontSize : '15dp',
			fontWeight : 'bold'
		},
	});
	galleryWindow.add(headerView);
	// galleryWindow.add(imageView);
	
	galleryWindow.add(scrollView);
	galleryWindow.add(gradientLbl);
	
	return galleryWindow;

};
// 
// function twitter_call(uniq_name) {
// 
	// main_url = 'http://alameen.gov.ae/';
	// language = 'en/';
	// uniquname = 'news/' + uniq_name + '.aspx';
	// url_set = main_url + language + uniquname;
	// twitter.share({
		// message : 'Alameen news ' + url_set,
		// success : function() {
			// alert('Tweeted!');
		// },
		// error : function(error) {
			// alert('Oh no! ' + error);
		// }
	// });
// }
// 
// function facebook_call(uniq_name) {
	// var facebook_long = Titanium.UI.createWindow({
		// backgroundColor : '#000',
		// tabBarHidden : true,
		// navBarHidden : true,
		// statusBarHidden : true,
		// modal : true
	// });
// 
	// var top_head_face = Titanium.UI.createImageView({
		// image : img_path + '/topheadbg.png',
		// //backgroundColor : 'transparent',
		// width : '100%',
		// //left : "3%",
		// height : GetHeight(42),
		// //top : '8%',
		// //zIndex : 1,
		// top : 0
	// });
// 
	// facebook_long.add(top_head_face);
// 
	// var top_backbut_face = Titanium.UI.createImageView({
		// image : img_path + '/back.png',
		// //backgroundColor : 'transparent',
		// width : GetWidth(25),
		// height : GetHeight(38),
		// //top : '8%',
		// left : GetWidth(11),
		// zIndex : 2,
		// top : GetHeight(5),
	// });
// 
	// if (Ti.Platform.osname != 'android') {
		// facebook_long.add(top_backbut_face);
		// top_backbut_face.addEventListener('click', function(e) {
			// facebook_long.close();
		// });
// 
	// } else {
// 
		// facebook_long.addEventListener('android:back', function() {
			// facebook_long.close();
		// });
	// }
// 
	// main_url = 'http://alameen.gov.ae';
	// language = '/en';
	// uniquname = '/news/' + uniq_name + '.aspx';
	// url_set = main_url + language + uniquname;
// 
	// var webViewface = Ti.UI.createWebView({
		// url : 'http://m.facebook.com/sharer.php?u=' + url_set,
		// top : GetHeight(42),
	// });
// 
	// webViewface.addEventListener('load', function(e) {
		// Ti.API.info('Now on page ' + e.url);
		// //Ti.API.info('Now on page ' + url_close);
	// });
// 
	// facebook_long.add(webViewface);
	// facebook_long.open();
// };
// 
module.exports = getIMapDetailView;