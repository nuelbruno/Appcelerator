var getNewsDetailView = function(App, data) {

	var newsWindow = Ti.UI.createWindow({
		backgroundColor : 'white',
		fullscreen : true
	});
	var backButton = Ti.UI.createView({
		backgroundImage : Titanium.Filesystem.resourcesDirectory + 'images/Common/Back.png',
		height : '40%',
		width : Ti.Platform.displayCaps.platformHeight / 10 * 40 / 100 * 1.158,
		left : '2%'
	});
	backButton.addEventListener('click', function() {
		newsWindow.close();
	});

	var headerView = Ti.UI.createView({
		width : Ti.Platform.displayCaps.platformWidth,
		height : Ti.Platform.displayCaps.platformHeight * 10 / 100,
		top : 0,
		// layout:'horizontal', //107FCC  //0A3A72,
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
		text : 'News',
		color : 'white',
		font : {
			fontSize : '22sp',
			fontWeight : 'bold'
		}
	});

	headerView.add(titleBar);
	headerView.add(backButton);

	/*************** Content view ***************/

	var scrollView = Ti.UI.createScrollView({
		width : '96%',
		contentWidth : Ti.UI.SIZE,
		contentHeight : Ti.UI.SIZE,
		backgroundColor : 'transparent',
		top : '10%',
		bottom : '13%',
	});

	var contentView = Ti.UI.createView({
		width : '96%',
		// height:Ti.UI.SIZE,
		layout : 'vertical',
		top : '13%',
		bottom : '13%',
	});

	var heading = Ti.UI.createLabel({
		// backgroundImage:Titanium.Filesystem.resourcesDirectory+'images/Common/MediaListTransparentEffect.png',
		width : '100%',
		height : Ti.UI.SIZE,
		text : data.headlines,
		color : '#0A3A72',
		font : {
			fontSize : '18sp'
		},
		top : 0,
		left : 0
	});

	var dateLabel = Ti.UI.createLabel({
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE,
		color : '#D6D6D6',
		top : '35%',
		top : 1,
		text : data.date,
		left : 0,
		font : {
			fontSize : '12sp'
		},
	});

	var gradeLine = Ti.UI.createView({
		width : '100%',
		height : '3sp',
		backgroundColor : '#DCDCDC',
		top : '5sp'
	});

	// var img = Ti.UI.createImageView({
	// image:encodeURI( data.newsThumb)
	// });
	//
	// alert(img.getWidth());

	var imageView = Ti.UI.createImageView({
		image : encodeURI(data.newsThumb), //data.newsThumb,
		width : '100%',
		height : Ti.Platform.displayCaps.platformWidth / 2,
		// height:Ti.UI.SIZE,
		top : '5sp'
	});

	var description = Ti.UI.createTextArea({
		width : '100%',
		height : Ti.UI.FILL,
		// touchEnabled:false,
		editable : false,
		value : data.Content,
		color : 'black'
	});

	contentView.add(heading);
	contentView.add(dateLabel);
	contentView.add(gradeLine);
	contentView.add(imageView);
	contentView.add(description);
	// scrollView.add(contentView);

	/*************** Share view ***************/

	var shareView = Ti.UI.createView({
		width : '100%',
		height : '13%',
		bottom : 0,
		backgroundColor : 'transparent'
	});

	var shareBackView = Ti.UI.createView({
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
			colors : ['#DCDCDC', '#CBCBCB']
		},
		height : Ti.Platform.displayCaps.platformHeight / 10,
		width : '100%',
		bottom : 0
	});

	var shareFB = Ti.UI.createImageView({
		width : (Ti.Platform.displayCaps.platformWidth / 10) * 19 / 51,
		height : (Ti.Platform.displayCaps.platformWidth / 10) * 38 / 51,
		left : '5%',
		image : Titanium.Filesystem.resourcesDirectory + 'images/Facebook.png',
	});

	var fbTextView = Ti.UI.createView({
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE,
		layout : 'vertical'
	});

	var fbShareTxt = Ti.UI.createLabel({
		text : '  share',
		color : '#0A3A72'
	});
	var fbCountTxt = Ti.UI.createLabel({
		text : '  1,289',
		color : '#4B4B4B',
		font : {
			fontSize : '12dp'
		}
	});
	fbTextView.add(fbShareTxt);
	fbTextView.add(fbCountTxt);

	var fbView = Ti.UI.createView({
		width : '28.33%',
		height : Ti.SIZE,
		// layout:'horizontal',
		left : '5%'
	});
	fbView.add(shareFB);
	fbView.add(fbTextView);
	fbView.addEventListener('click', function() {
		shareWithFB();
	});

	var shareTwit = Ti.UI.createImageView({
		width : (Ti.Platform.displayCaps.platformWidth / 10),
		height : (Ti.Platform.displayCaps.platformWidth / 10) * 38 / 51,
		right : '5%',
		image : Titanium.Filesystem.resourcesDirectory + 'images/Twitter.png',
	});

	var ttTextView = Ti.UI.createView({
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE,
		layout : 'vertical'
	});

	var ttShareTxt = Ti.UI.createLabel({
		text : 'share',
		color : '#0A3A72',
	});
	var ttCountTxt = Ti.UI.createLabel({
		text : '1,289',
		color : '#4B4B4B',
		font : {
			fontSize : '12dp'
		}
	});
	ttTextView.add(ttShareTxt);
	ttTextView.add(ttCountTxt);

	var twitterView = Ti.UI.createView({
		width : '28.33%',
		height : Ti.UI.SIZE,
		// layout:'horizontal',
		right : '5%'
	});
	twitterView.add(shareTwit);
	twitterView.add(ttTextView);
	twitterView.addEventListener('click',function(){
		twitter_call();
	});

	var shareMiddleImage = Ti.UI.createView({
		backgroundImage : Titanium.Filesystem.resourcesDirectory + 'images/ShareBG.png',
		height : '100%',
		width : Ti.Platform.displayCaps.platformHeight * 13 / 100 * 3
	});

	var shareAppImage = Ti.UI.createImageView({
		width : (Ti.Platform.displayCaps.platformWidth / 10),
		height : (Ti.Platform.displayCaps.platformWidth / 10),
		image : Titanium.Filesystem.resourcesDirectory + 'images/Share.png',
	});

	shareBackView.add(fbView);
	shareBackView.add(twitterView);
	shareView.add(shareBackView);
	shareView.add(shareMiddleImage);

	newsWindow.add(headerView);
	newsWindow.add(contentView);
	// newsWindow.add(heading);
	// newsWindow.add(dateLabel);
	// newsWindow.add(imageView);
	newsWindow.add(shareView);

	var shareWithFB = function(e) {
		var win = Titanium.UI.createWindow();
		var facebook_dialog;
		win.addEventListener('facebook_go', function() {
			if (Titanium.Facebook.loggedIn) {
				//alert('send')
				send_facebook_stream();
			} else {
				Titanium.Facebook.authorize();

				Titanium.Facebook.addEventListener('login', function(e) {
					Titanium.API.info('FACEBOOK LOGIN DATA' + e.data);
					send_facebook_stream();
				});

			}
			Titanium.Facebook.appid = "163070503903400";
			Titanium.Facebook.permissions = ['publish_stream'];
			/**
			 * GENERATE THE FACEBOOK SHARE DIALOG
			 * SEND THE FACEBOOK STREAM TO FACEBOOK
			 */
			function send_facebook_stream() {

				// CREATE THE FACEBOOK MESSAGE
				var data1 = {
					name : data.headlines,
					link : "http://www.dmca.ae",
					caption : data.headlines,
					description : data.Content,
					picture : Ti.UI.createImageView({
						image : data.newsThumb,
						width : Ti.UI.SIZE,
						height : Ti.UI.SIZE
					})//.toImage()
				};
				if (!facebook_dialog) {
					facebook_dialog = Titanium.Facebook.dialog("feed", data1, showRequestResult);
				}

				/**
				 * HANDLE THE REQUEST RESULT FROM FACEBOOK
				 */
				function showRequestResult(r) {
					//alert(r)

					if (r.result) {
						facebook_response = Ti.UI.createAlertDialog({
							title : 'Facebook Shared!',
							message : 'Your stream was published'
						});
					} else {
						facebook_response = Ti.UI.createAlertDialog({
							title : 'Facebook Stream was cancelled',
							message : 'Nothing was published.'
						});

					}
					facebook_response.show();
					var fb_resp_timeout = setTimeout(function() {
						facebook_response.hide();
					}, 2000);
				}

			}

		});
		win.fireEvent('facebook_go');
	};

	function twitter_call(uniq_name) {
		var social = require(Ti.App.getResourceFile('View/social'));
		var twitter = social.create({
			site: 'Twitter', // <-- this example is for Twitter. I'll expand this to other sites in the future.
			consumerKey: 'dq29w9RWiq6WtjCrnVA', // <--- you'll want to replace this
			consumerSecret: '3CCfHCTrXhbgEAEsyLTVVz8VWe9tcxkrzMeOX1Ps' // <--- and this with your own keys!
		});

		main_url = 'http://dmca.ae/';
		language = (Ti.App.LangID === 1)?'en/':'ar/';
		uniquname = 'news/' + uniq_name + '.aspx';
		url_set = main_url + language + uniquname;
		twitter.share({
			message : 'DMCA News ' + url_set,
			success : function() {
				alert('Tweeted!');
			},

			error : function(error) {
				alert('Oh no! ' + error);
			}
		});
	}
	return newsWindow;
};
//
//
