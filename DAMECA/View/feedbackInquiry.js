var getfeedbackinquiry = function(App) {

	var feedbackinquiry = Ti.App.customViews.createCustomTabViews({
		width : '100%',
		height : '100%',
		top : 0,
		layout : 'horizontal'
	}, Ti.App.L('feedback_and_inquiry'));

	

	/*var directionmapjs = require('Utils/directionmap');

	 var directionmapjs = new directionmapjs(App,Ti.App.dest_latitude,Ti.App.dest_longitude,'');

	 directionview.add(directionmapjs);*/
	
	var scrollview_feedback = Ti.UI.createScrollView({
		contentHeight:'auto',
		contentWidth:'auto',
		width:'95%',
		height:GetHeight(500),
		left:GetWidth(5),
		top:GetWidth(0),
		showVerticalScrollIndicator: false,
        showHorizontalScrollIndicator: false,
		layout:'vertical'		
	});
	
	// ### name ### //
	var name_feedback = Ti.UI.createLabel({
		text : Ti.App.L('Name'),
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
	
	scrollview_feedback.add(name_feedback);
	
	var name_txt_feedback = Ti.UI.createTextField({
		left : GetWidth(1),
		height : GetHeight(30),
		backgroundColor : '#FFFFFF',
		width : '98%',
		top : GetHeight(110),
		backgroundImage : 'none',
		borderColor : '#b8b8b8',
		borderRadius : 4,
		borderWidth : 2,
		color : '#666666',
		font : {
			fontSize : '12sp'
		},
		top : GetHeight(5),
		borderStyle : Ti.UI.INPUT_BORDERSTYLE_NONE
	});
	
	scrollview_feedback.add(name_txt_feedback);
	
	// #### ADDRESS #### //
	var address_feedback = Ti.UI.createLabel({
		text : Ti.App.L('Address'),
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
	
	scrollview_feedback.add(address_feedback);
	
	var address_txt_feedback = Ti.UI.createTextField({
		left : GetWidth(1),
		height : GetHeight(30),
		backgroundColor : '#FFFFFF',
		width : '98%',
		top : GetHeight(110),
		backgroundImage : 'none',
		borderColor : '#b8b8b8',
		borderRadius : 4,
		borderWidth : 2,
		color : '#666666',
		font : {
			fontSize : '12sp'
		},
		top : GetHeight(5),
		borderStyle : Ti.UI.INPUT_BORDERSTYLE_NONE
	});
	
	scrollview_feedback.add(address_txt_feedback);
	
	// #### EMAIL #### //
	var email_feedback = Ti.UI.createLabel({
		text : Ti.App.L('email_dmca'),
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
	
	scrollview_feedback.add(email_feedback);
	
	var email_txt_feedback = Ti.UI.createTextField({
		left : GetWidth(1),
		height : GetHeight(30),
		backgroundColor : '#FFFFFF',
		width : '98%',
		top : GetHeight(110),
		backgroundImage : 'none',
		borderColor : '#b8b8b8',
		borderRadius : 4,
		borderWidth : 2,
		color : '#666666',
		font : {
			fontSize : '12sp'
		},
		top : GetHeight(5),
		borderStyle : Ti.UI.INPUT_BORDERSTYLE_NONE
	});
	
	scrollview_feedback.add(email_txt_feedback);
	
	// #### SUBJECT #### //
	var subject_feedback = Ti.UI.createLabel({
		text : Ti.App.L('subject'),
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
	
	scrollview_feedback.add(subject_feedback);
	
	var subject_txt_feedback = Ti.UI.createTextField({
		left : GetWidth(1),
		height : GetHeight(30),
		backgroundColor : '#FFFFFF',
		width : '98%',
		top : GetHeight(110),
		backgroundImage : 'none',
		borderColor : '#b8b8b8',
		borderRadius : 4,
		borderWidth : 2,
		color : '#666666',
		font : {
			fontSize : '12sp'
		},
		top : GetHeight(5),
		borderStyle : Ti.UI.INPUT_BORDERSTYLE_NONE
	});
	
	scrollview_feedback.add(subject_txt_feedback);
	
	// #### COMMENT #### //
	var comment_feedback = Ti.UI.createLabel({
		text : Ti.App.L('comments'),
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
	
	scrollview_feedback.add(comment_feedback);
	
	
	var comment_txt_feedback = Titanium.UI.createTextArea({
		height : GetHeight(60),
		backgroundColor : '#FFFFFF',
		width : '98%',
		backgroundImage : 'none',
		borderColor : '#b8b8b8',
		borderRadius : 4,
		borderWidth : 2,
		color : '#666666',
		font : {
			fontSize : '12sp'
		},
		top : GetHeight(5),
		borderStyle : Ti.UI.INPUT_BORDERSTYLE_NONE

	}); 

	scrollview_feedback.add(comment_txt_feedback);
	
	// attached button
	
	var feed_attach_view = Ti.UI.createView({
		//backgroundColor : 'transparent ',
		backgroundColor:'#e0e0e0',
		borderColor : '#bdbdbd',
		borderRadius : 4,
		borderWidth : 2,
		width : '98%',
		height:GetWidth(30), 
		top : GetHeight(10),
		//left:GetWidth(5),
	});

	scrollview_feedback.add(feed_attach_view);
	
	var attach_img = Ti.UI.createImageView({
		width : GetWidth(25),
		top : GetHeight(3),
		height : GetHeight(25),
		left:GetWidth(80),
		image : Ti.Filesystem.resourcesDirectory + 'images/ContactUs/Attachment.png'
	});

	feed_attach_view.add(attach_img);
	
	
	var attach_lable = Ti.UI.createLabel({
		text : Ti.App.L('attachments'),
		width : '60%',
		height : 'auto',
		color : '#666666',
		//textAlign : 'left',
		left:GetWidth(120),
		font : {
			fontSize : '14sp',
			fontWeight : "bold",
			//fontFamily : "Arial,Helvetica,sans-serif"
		},
		top : GetHeight(5)
	});
	feed_attach_view.add(attach_lable);
	
	// ######## show attachments ########### //
	var view_attach_show = Ti.UI.createView({
		//backgroundColor : 'transparent ',
		width : '98%',
		height:GetHeight(80), 
		top : GetHeight(10),
		//left:GetWidth(5),
	});

	scrollview_feedback.add(view_attach_show);
	
	// ######## SUBMIT AND RESET BUTTONS ########### //
	var view_submit_reset_button= Ti.UI.createView({
		//backgroundColor : 'transparent ',
		width : '98%',
		height:GetWidth(35), 
		top : GetHeight(10),
		bottom:GetHeight(10)
		//left:GetWidth(5),
	});

	scrollview_feedback.add(view_submit_reset_button);

	var submit_butfeed = Ti.UI.createButton({
		image:Ti.Filesystem.resourcesDirectory + 'images/Buttons/Submit.png',
		width:GetWidth(140),
		left:GetWidth(0),
		height:GetHeight(35)
	});
	
	view_submit_reset_button.add(submit_butfeed);
	
	var reset_butfeed = Ti.UI.createButton({
		image:Ti.Filesystem.resourcesDirectory + 'images/Buttons/Reset.png',
		width:GetWidth(140),
		right:GetWidth(0),
		height:GetHeight(35)
	});
	
	
	if(Ti.App.LangID === 2)
	{
		name_feedback.textAlign = 'right';
		email_feedback.textAlign = 'right'; 
		address_feedback.textAlign = 'right';
		subject_feedback.textAlign = 'right';
		comment_feedback.textAlign = 'right';
	}
	
	view_submit_reset_button.add(reset_butfeed);
	// ######## END ############ //
	
	feedbackinquiry.add(scrollview_feedback);

	feedbackinquiry.reload = function() {


	};
	return feedbackinquiry;
}; 