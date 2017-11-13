var getcontactinformation = function(App) {

	
	// ###### call function ####### //
	function call_function(number)
	{
		
		var msg = 'Are you sure to call?';

		var confirmAlert = Ti.UI.createAlertDialog({
			title : 'Confirm your action',
			message : msg,
			buttonNames : ['OK', 'Cancel'],
			cancel : 1
		});

		confirmAlert.addEventListener('click', function(e) {

			switch(e.index) {
				case 0:
					var phone = number;
					Ti.Platform.openURL('tel:' + phone);
					break;
				case 1:

					break;
			}

		});
		confirmAlert.show();
	}
	
	// ########  contact information view ############ //
	
	var contactinformationview = Ti.App.customViews.createCustomTabViews({
		width : '100%',
		height : '100%',
		top : 0,
		layout : 'horizontal'
	}, Ti.App.L('contactus'));

	

	/*var directionmapjs = require('Utils/directionmap');

	 var directionmapjs = new directionmapjs(App,Ti.App.dest_latitude,Ti.App.dest_longitude,'');

	 directionview.add(directionmapjs);*/
	
	var view_contInform = Ti.UI.createView({
		//backgroundColor : 'transparent ',
		width : '98%',
		top : 0,
		left:GetWidth(5),
		layout : "vertical"
	});

	contactinformationview.add(view_contInform);
	
	// ####################### CONTACT TOP THREE LABELS ########################## //
	
	var MaritimeAuthority_lbl = Ti.UI.createLabel({
		text : Ti.App.L('dubai_meritime_city_authority'),
		width : '100%',
		height : 'auto',
		color : '#074f82',
		textAlign : 'left',
		font : {
			fontSize : '14sp',
			fontWeight : "bold",
			//fontFamily : "Arial,Helvetica,sans-serif"
		},
		top : GetHeight(7)
	});
	
	view_contInform.add(MaritimeAuthority_lbl);
	
	var PhoneAddress_lbl = Ti.UI.createLabel({
		text : Ti.App.L('dubai_uae'),
		width : '100%',
		height : 'auto',
		color : '#666666',
		textAlign : 'left',
		font : {
			fontSize : '12sp',
			//fontWeight : "bold",
			//fontFamily : "Arial,Helvetica,sans-serif"
		},
		top : GetHeight(5)
	});
	
	view_contInform.add(PhoneAddress_lbl);
	
	var fax_label = Ti.UI.createLabel({
		text : Ti.App.L('fax'),
		width : '100%',
		height : 'auto',
		color : '#666666',
		textAlign : 'left',
		font : {
			fontSize : '12sp',
			//fontWeight : "bold",
			//fontFamily : "Arial,Helvetica,sans-serif"
		},
		top : GetHeight(5)
	});
	
	view_contInform.add(fax_label);
	
	// ####################### CONTACT CALL EMAIL TWO BOX ########################## //
	var Callemail_view = Ti.UI.createView({
		//backgroundColor : 'transparent ',
		height : GetHeight(75),
		top : GetHeight(6),
		layout : "horizontal"
	});

	view_contInform.add(Callemail_view);
	
	var callBox_view = Ti.UI.createView({
		backgroundImage : Ti.Filesystem.resourcesDirectory + 'images/ContactUs/BG1.png',
		width : GetWidth(110),
		height : GetHeight(73),
		top : 0,
		layout : "vertical"
	});

	Callemail_view.add(callBox_view);
	
	var callbox_img = Ti.UI.createImageView({
		width : GetWidth(15),
		height : GetHeight(22),
		top : GetHeight(10),
		image : Ti.Filesystem.resourcesDirectory + 'images//ContactUs/Call.png',
	});

	callBox_view.add(callbox_img);
	
	var callbox_txt = Ti.UI.createLabel({
		text : Ti.App.L('facebook'),
		width : '100%',
		height : 'auto',
		color : '#333333',
		textAlign : 'center',
		font : {
			fontSize : '10sp',
			//fontWeight : "bold",
			//fontFamily : "Arial,Helvetica,sans-serif"
		},
		top : GetHeight(3)
	});
	
	callBox_view.add(callbox_txt);
	
	var callbox_number = Ti.UI.createLabel({
		text : '800 4806',
		width : '100%',
		height : 'auto',
		color : '#074f82',
		textAlign : 'center',
		font : {
			fontSize : '12sp',
			fontWeight : "bold",
			//fontFamily : "Arial,Helvetica,sans-serif"
		},
		top : GetHeight(0)
	});
	
	callBox_view.add(callbox_number);
	

	callBox_view.addEventListener('click', function(e) {//alert('call');
		
		   call_function('8004806');
	});

	
	// email
	var emailBox_view = Ti.UI.createView({
		backgroundImage : Ti.Filesystem.resourcesDirectory + 'images/ContactUs/BG1.png',
		width : GetWidth(110),
		height : GetHeight(73),
		top : 0,
		layout : "vertical"
	});

	Callemail_view.add(emailBox_view);
	
	var emailBox_img = Ti.UI.createImageView({
		width : GetWidth(15),
		height : GetHeight(22),
		top : GetHeight(10),
		image : Ti.Filesystem.resourcesDirectory + 'images//ContactUs/Call.png',
	});

	emailBox_view.add(emailBox_img);
	
	var emailBox_txt = Ti.UI.createLabel({
		text : Ti.App.L('email_dmca'),
		width : '100%',
		height : 'auto',
		color : '#333333',
		textAlign : 'center',
		font : {
			fontSize : '10sp',
			//fontWeight : "bold",
			//fontFamily : "Arial,Helvetica,sans-serif"
		},
		top : GetHeight(3)
	});
	
	emailBox_view.add(emailBox_txt);
	
	var emailBox_number = Ti.UI.createLabel({
		text : 'info@dmca.ae',
		width : '100%',
		height : 'auto',
		color : '#074f82',
		textAlign : 'center',
		font : {
			fontSize : '12sp',
			fontWeight : "bold",
			//fontFamily : "Arial,Helvetica,sans-serif"
		},
		top : GetHeight(0)
	});
	
	emailBox_view.add(emailBox_number);
	
	emailBox_view.addEventListener('click', function(e) {   //alert('call');
       var msg ='Are you sure to send Email?';
       var confirmAlert = Ti.UI.createAlertDialog({
	    title: 'Confirm your action',
	    message: msg,
	    buttonNames: [ 'OK', 'Cancel' ],
	    cancel: 1
	    });
    
       confirmAlert.addEventListener('click', function(e){
		    
		     switch(e.index) {
			      case 0:
			        var emailDialog = Ti.UI.createEmailDialog();
						emailDialog.subject = "subject";
						emailDialog.toRecipients = ['info@dmca.ae'];
						emailDialog.messageBody = 'message';
						emailDialog.open();
			        break;
			      case 1:
			        break;
			      }     
		  });
		  confirmAlert.show();
	});
	// ################### CONTACT SOCAIL MEDIA THREE BOX AND LABEL ################# //
	
	var socailMedia_txt = Ti.UI.createLabel({
		text : Ti.App.L('social_media'),
		width : '100%',
		height : 'auto',
		color : '#666666',
		textAlign : 'left',
		font : {
			fontSize : '14sp',
			fontWeight : "bold",
			//fontFamily : "Arial,Helvetica,sans-serif"
		},
		top : GetHeight(6)
	});
	
	view_contInform.add(socailMedia_txt);
	
	// social media links
	var socialmedia_view = Ti.UI.createView({
		backgroundColor : '#d4d4d4 ',
		borderColor:'#a1a1a1',
		borderRadius:3,
		borderWidth:1,
		//opacity:0.6,
		height : GetHeight(54),
		top : GetHeight(6),
		right:GetWidth(5),
		layout : "horizontal"
	});

	view_contInform.add(socialmedia_view);
	
	// #### facebook #### //
	var facebookBox_view = Ti.UI.createView({
		//backgroundImage : Ti.Filesystem.resourcesDirectory + 'images/ContactUs/BG2.png',
		width : GetWidth(102),
		height : GetHeight(57),
		left : 0
		//layout : "vertical"
	});

	socialmedia_view.add(facebookBox_view);
	
	var facebookbox_img = Ti.UI.createImageView({
		width : GetWidth(15),
		height : GetHeight(22),
		top : GetHeight(15),
		left:GetWidth(12),
		image : Ti.Filesystem.resourcesDirectory + 'images//ContactUs/Facebook.png',
	});

	facebookBox_view.add(facebookbox_img);
	
	var facebooktext = Ti.UI.createLabel({
		text : Ti.App.L('facebook'),
		width : '100%',
		height : 'auto',
		color : '#074f82',
		textAlign : 'left',
		font : {
			fontSize : '10sp',
			fontWeight : "bold",
			//fontFamily : "Arial,Helvetica,sans-serif"
		},
		top : GetHeight(11),
		left:GetWidth(34)
	});
	
	facebookBox_view.add(facebooktext);
	
	var facebookfollowus = Ti.UI.createLabel({
		text : Ti.App.L('follow_us_on'),
		width : '100%',
		height : 'auto',
		color : '#333333',
		textAlign : 'left',
		font : {
			fontSize : '10sp',
			//fontWeight : "bold",
			//fontFamily : "Arial,Helvetica,sans-serif"
		},
		top :GetHeight(25),
		left:GetWidth(34)
	});
	
	facebookBox_view.add(facebookfollowus);
	

	var ver_facebook = Titanium.UI.createLabel({
		text : '',
		height : "100%",
		borderWidth : 1,
		textAlign : 'right',
		borderColor : '#a6a6a6',
		opacity : 0.5,
		width : 1,
		right : 0

	});

	facebookBox_view.add(ver_facebook); 
	
	function socialpagelinkwin(url_link)
	{
		
		
		var social_win = Titanium.UI.createWindow({
			backgroundColor : '#000',
			tabBarHidden : true,
			navBarHidden : true,
			statusBarHidden : true,
			modal : true
		});

		var title_view = Titanium.UI.createView({
			width : "100%",
			height : GetHeight(45),
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
				colors : ['#0091cf', '#07598f']
			}
		});
		social_win.add(title_view);

		var close_img = Titanium.UI.createImageView({
			width : GetWidth(30),
			right : GetWidth(8),
			zIndex : 1,
			top : GetHeight(5),
			image : Ti.App.resourceurl + 'images/close.png'
		});
		social_win.add(close_img);

		close_img.addEventListener('click', function(evt) {
			social_win.close();
		});

		var extwebview = Titanium.UI.createWebView({
			top : GetHeight(42),
			left : 0,
			right : 0,
			url : url_link,
			width : '100%',
			backgroundColor : '#ccc'
		});
		social_win.add(extwebview);
		//adding webview in current window

		social_win.open(); 

	}
	
	facebookBox_view.addEventListener('click', function(e) {   //alert('call');
		socialpagelinkwin('https://www.facebook.com/pages/Dubai-Maritime-City-Authority-%D8%B3%D9%84%D8%B7%D8%A9-%D9%85%D8%AF%D9%8A%D9%86%D8%A9-%D8%AF%D8%A8%D9%8A-%D8%A7%D9%84%D9%85%D9%84%D8%A7%D8%AD%D9%8A%D8%A9/277903248889415');
    });
	// #### twitter #### //https://www.facebook.com/DMCAForce
	var twitterBox_view = Ti.UI.createView({
		//backgroundImage : Ti.Filesystem.resourcesDirectory + 'images/ContactUs/BG2.png',
		width : GetWidth(102),
		height : GetHeight(57),
		left : 0
		//layout : "vertical"
	});
	socialmedia_view.add(twitterBox_view);
	var twitter_img = Ti.UI.createImageView({
		width : GetWidth(20),
		height : GetHeight(22),
		top : GetHeight(15),
		left:GetWidth(7),
		image : Ti.Filesystem.resourcesDirectory + 'images/ContactUs/Twitter.png',
	});

	twitterBox_view.add(twitter_img);
	
	var twiitertext = Ti.UI.createLabel({
		text :Ti.App.L('twitter'),
		width : '100%',
		height : 'auto',
		color : '#074f82',
		textAlign : 'left',
		font : {
			fontSize : '10sp',
			fontWeight : "bold",
			//fontFamily : "Arial,Helvetica,sans-serif"
		},
		top : GetHeight(11),
		left:GetWidth(34)
	});
	
	twitterBox_view.add(twiitertext);
	
	var twitterfollowus = Ti.UI.createLabel({
		text : Ti.App.L('follow_us_on'),
		width : '100%',
		height : 'auto',
		color : '#333333',
		textAlign : 'left',
		font : {
			fontSize : '10sp',
			//fontWeight : "bold",
			//fontFamily : "Arial,Helvetica,sans-serif"
		},
		top :GetHeight(25),
		left:GetWidth(34)
	});
	
	twitterBox_view.add(twitterfollowus);
	
	var ver_twitter = Titanium.UI.createLabel({
		text : '',
		height : "100%",
		borderWidth : 1,
		textAlign : 'right',
		borderColor : '#a6a6a6',
		opacity : 0.5,
		width : 1,
		right : 0

	});

	twitterBox_view.add(ver_twitter); 
	
	twitterBox_view.addEventListener('click', function(e) {   //alert('call');
	 
	 				socialpagelinkwin('https://twitter.com/DMAuthority');
	});				
	// #### youtube #### //
	var youtubeBox_view = Ti.UI.createView({
		//backgroundImage : Ti.Filesystem.resourcesDirectory + 'images/ContactUs/BG2.png',
		width : GetWidth(102),
		height : GetHeight(57),
		left : 0
	});

	socialmedia_view.add(youtubeBox_view);
	
	var youtube_img = Ti.UI.createImageView({
		width : GetWidth(20),
		height : GetHeight(22),
		top : GetHeight(15),
		left:GetWidth(7),
		image : Ti.Filesystem.resourcesDirectory + 'images/ContactUs/YouTube.png',
	});

	youtubeBox_view.add(youtube_img);
	
	var youtubetext = Ti.UI.createLabel({
		text : Ti.App.L('youtube'),
		width : '100%',
		height : 'auto',
		color : '#074f82',
		textAlign : 'left',
		font : {
			fontSize : '10sp',
			fontWeight : "bold",
			//fontFamily : "Arial,Helvetica,sans-serif"
		},
		top : GetHeight(11),
		left:GetWidth(34)
	});
	
	youtubeBox_view.add(youtubetext);
	
	var youtubefollowus = Ti.UI.createLabel({
		text : Ti.App.L('follow_us_on'),
		width : '100%',
		height : 'auto',
		color : '#333333',
		textAlign : 'left',
		font : {
			fontSize : '10sp',
			//fontWeight : "bold",
			//fontFamily : "Arial,Helvetica,sans-serif"
		},
		top :GetHeight(25),
		left:GetWidth(34)
	});
	
	youtubeBox_view.add(youtubefollowus);
	
	youtubeBox_view.addEventListener('click', function(e) {   //alert('call');
	 
	 				socialpagelinkwin('http://www.youtube.com/channel/UCMxov2cBSXt05a84yEn09sg');
	});
	// ################### MARITIME EMERGENCY CONTACT CONTENTS ##################### //
	
	var horiz_line_maritime = Titanium.UI.createLabel({
		text : '',
		height : 2,
		borderWidth : 1,
		//textAlign : 'right',
		borderColor : '#a6a6a6',
		opacity : 0.3,
		width : '100%',
		right:GetWidth(3),
		top : GetHeight(9)

	});

	view_contInform.add(horiz_line_maritime); 
	
	var mertime_emergenecy_txt = Ti.UI.createLabel({
		text : Ti.App.L('emergency_contact'),
		width : '100%',
		height : 'auto',
		color : '#074f82',
		textAlign : 'left',
		font : {
			fontSize : '14sp',
			fontWeight : "bold",
			//fontFamily : "Arial,Helvetica,sans-serif"
		},
		top : GetHeight(6)
	});
	
	view_contInform.add(mertime_emergenecy_txt);
	
	//#### emerveny buttons ### //
	
	var emergency_view = Ti.UI.createView({
		//backgroundColor : 'transparent ',
		height : GetHeight(75),
		top : GetHeight(6),
		layout : "horizontal"
	});

	view_contInform.add(emergency_view);
	
	
	// ### police ### //
	var police_view = Ti.UI.createView({
		backgroundImage : Ti.Filesystem.resourcesDirectory + 'images/ContactUs/BG3.png',
		width : GetWidth(100),
		height : GetHeight(83),
		top : 0,
		layout : "vertical"
	});

	emergency_view.add(police_view);
	
	var policeBox_img = Ti.UI.createImageView({
		width : GetWidth(20),
		height : GetHeight(22),
		top : GetHeight(10),
		image : Ti.Filesystem.resourcesDirectory + 'images/ContactUs/Police.png',
	});

	police_view.add(policeBox_img);
	
	var policeBox_txt = Ti.UI.createLabel({
		text : Ti.App.L('police'),
		width : '100%',
		height : 'auto',
		color : '#FFFFFF',
		textAlign : 'center',
		font : {
			fontSize : '10sp',
			//fontWeight : "bold",
			//fontFamily : "Arial,Helvetica,sans-serif"
		},
		top : GetHeight(3)
	});
	
	police_view.add(policeBox_txt);
	
	var police_number = Ti.UI.createLabel({
		text : '999',
		width : '100%',
		height : 'auto',
		color : '#FFFFFF',
		textAlign : 'center',
		font : {
			fontSize : '14sp',
			fontWeight : "bold",
			//fontFamily : "Arial,Helvetica,sans-serif"
		},
		top : GetHeight(0)
	});
	
	police_view.add(police_number);
	
	
	police_view.addEventListener('click', function(e) {//alert('call');

		   call_function('999');
	});

	
	// ### coast Guard ### //
	var coastguard_view = Ti.UI.createView({
		backgroundImage : Ti.Filesystem.resourcesDirectory + 'images/ContactUs/BG3.png',
		width : GetWidth(100),
		height : GetHeight(83),
		top : 0,
		left:GetWidth(4),
		layout : "vertical"
	});

	emergency_view.add(coastguard_view);
	
	var coastguard_img = Ti.UI.createImageView({
		width : GetWidth(20),
		height : GetHeight(22),
		top : GetHeight(10),
		image : Ti.Filesystem.resourcesDirectory + 'images/ContactUs/CoastGuard.png',
	});

	coastguard_view.add(coastguard_img);
	
	var coastguard_txt = Ti.UI.createLabel({
		text : Ti.App.L('coast_guard'),
		width : '100%',
		height : 'auto',
		color : '#FFFFFF',
		textAlign : 'center',
		font : {
			fontSize : '10sp',
			//fontWeight : "bold",
			//fontFamily : "Arial,Helvetica,sans-serif"
		},
		top : GetHeight(3)
	});
	
	coastguard_view.add(coastguard_txt);
	
	var coastguard_number = Ti.UI.createLabel({
		text : '996',
		width : '100%',
		height : 'auto',
		color : '#FFFFFF',
		textAlign : 'center',
		font : {
			fontSize : '14sp',
			fontWeight : "bold",
			//fontFamily : "Arial,Helvetica,sans-serif"
		},
		top : GetHeight(0)
	});
	
	coastguard_view.add(coastguard_number);
	
	coastguard_view.addEventListener('click', function(e) {//alert('call');

		   call_function('996');
	});

	
	// ### port police ### //
	var portpolice_view = Ti.UI.createView({
		backgroundImage : Ti.Filesystem.resourcesDirectory + 'images/ContactUs/BG3.png',
		width : GetWidth(100),
		height : GetHeight(83),
		top : 0,
			left:GetWidth(4),
		layout : "vertical"
	});

	emergency_view.add(portpolice_view);
	
	var Portpolice_img = Ti.UI.createImageView({
		width : GetWidth(23),
		height : GetHeight(20),
		top : GetHeight(10),
		image : Ti.Filesystem.resourcesDirectory + 'images/ContactUs/PoliceStation.png',
	});

	portpolice_view.add(Portpolice_img);
	
	var Portpolice_txt = Ti.UI.createLabel({
		text : Ti.App.L('ports_police_station'),
		width : '100%',
		height : 'auto',
		color : '#FFFFFF',
		textAlign : 'center',
		font : {
			fontSize : '10sp',
			//fontWeight : "bold",
			//fontFamily : "Arial,Helvetica,sans-serif"
		},
		top : GetHeight(3)
	});
	
	portpolice_view.add(Portpolice_txt);
	
	var Portpolice_number = Ti.UI.createLabel({
		text : '04-3459999',
		width : '100%',
		height : 'auto',
		color : '#FFFFFF',
		textAlign : 'center',
		font : {
			fontSize : '14sp',
			fontWeight : "bold",
			//fontFamily : "Arial,Helvetica,sans-serif"
		},
		top : GetHeight(0)
	});
	
	portpolice_view.add(Portpolice_number);
	
	
	portpolice_view.addEventListener('click', function(e) {//alert('call');

		   call_function('04-3459999');
	});
	

	contactinformationview.reload = function() {


	};
	return contactinformationview;
}; 