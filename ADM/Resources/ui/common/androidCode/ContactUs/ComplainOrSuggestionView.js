function ComplainOrSuggestionView(){
	var self=Ti.UI.createView({
		top:0,
		left:0,
		right:0,
		layout:'vertical'
	});
	
	//Contact FOrm
	var scrollView = Ti.UI.createScrollView({
		contentWidth : 'auto',
		contentHeight : 'auto',
		top : 5,
		left : 5,
		right : 10,
		bottom: 30,
		height : 'auto',
		width : '100%'
	});
	self.add(scrollView);

	var x = 4;
	var y = 5;
	var lbly = 9;
	var lblx = 11;
	var height =60; //30;
	var width = GetWidth(300);
	var vSpace = 6;
	var txtVSpace = 3;
	var hSpace = 5;

	var txtWidth = 300;

	var lblFirstname = Titanium.UI.createLabel({
		height : height,
		width : width,
		top : lbly,
		//left : lblx,
		//text : Ti.App.LG('FirstName') + ' *',
		color : Ti.App.DescriptionFontColor,
		font : {
			fontSize : 22.5,
			fontFamily : 'Helvetica Neue',
			fontWeight : 'medium'
		},
	});
	scrollView.add(lblFirstname);
	y += height + txtVSpace;
	lbly += height + txtVSpace;

	var txtFirstname = Titanium.UI.createTextField({
		height : height + 5,
		width : width,
		top : y,
		left : x,
		paddingLeft : 10,

		backgroundImage : Ti.App.ResourcePath + L('text_box'),
		
		font : {
			fontSize : 22,
			fontFamily : 'Helvetica Neue',
			fontWeight : 'medium'
		},
		textAlign : 'left',
		appearance : Titanium.UI.KEYBOARD_APPEARANCE_DEFAULT,
		keyboardType : Titanium.UI.KEYBOARD_DEFAULT,
	});
	scrollView.add(txtFirstname);
	y += height + txtVSpace;
	lbly += height + txtVSpace;

	var lblLastname = Titanium.UI.createLabel({
		height : height,
		width : width,
		top : lbly,
		//left : lblx,
		//text : Ti.App.LG('LastName') + ' *',
		color : Ti.App.DescriptionFontColor,
		font : {
			fontSize : 22.5,
			fontFamily : 'Helvetica Neue',
			fontWeight : 'medium'
		},
	});
	scrollView.add(lblLastname);
	y += height + txtVSpace;
	lbly += height + txtVSpace;

	var txtLastname = Titanium.UI.createTextField({
		height : height + 5,
		width : width,
		top : y,
		left : x,
		paddingLeft : 10,

		backgroundImage : Ti.App.ResourcePath + L('text_box'),
		font : {
			fontSize : 22,
			fontFamily : 'Helvetica Neue',
			fontWeight : 'medium'
		},
		textAlign : 'left',
		appearance : Titanium.UI.KEYBOARD_APPEARANCE_DEFAULT,
		keyboardType : Titanium.UI.KEYBOARD_DEFAULT,
	});
	scrollView.add(txtLastname);
	y += height + txtVSpace;
	lbly += height + txtVSpace;

	var lblemail = Titanium.UI.createLabel({
		height : height,
		width : width,
		top : lbly,
		//left : lblx,
		//text : Ti.App.LG('EmailID') + ' *',
		color : Ti.App.DescriptionFontColor,
		font : {
			fontSize : 22.5,
			fontFamily : 'Helvetica Neue',
			fontWeight : 'medium'
		},
	});
	scrollView.add(lblemail);
	y += height + txtVSpace;
	lbly = y;
	var txtemail = Titanium.UI.createTextField({
		height : height + 5,
		width : width,
		top : y,
		left : x,
		paddingLeft : 10,

		backgroundImage : Ti.App.ResourcePath + L('text_box'),
		font : {
			fontSize : 22,
			fontFamily : 'Helvetica Neue',
			fontWeight : 'medium'
		},
		textAlign : 'left',
		appearance : Titanium.UI.KEYBOARD_APPEARANCE_DEFAULT,
		keyboardType : Titanium.UI.KEYBOARD_EMAIL ,

	});
	scrollView.add(txtemail);
	y += height + txtVSpace;
	lbly += height + txtVSpace;

	var lblphone = Titanium.UI.createLabel({
		height : height,
		width : width,
		top : lbly,
		//left : lblx,
		//text : Ti.App.LG('MobileNumber') + ' *',
		color :  Ti.App.DescriptionFontColor,
		font : {
			fontSize : 22.5,
			fontFamily : 'Helvetica Neue',
			fontWeight : 'medium'
		},
	});
	scrollView.add(lblphone);
	y += height + txtVSpace;
	lbly += height + txtVSpace;
	var txtphone = Titanium.UI.createTextField({
		height : height + 5,
		width : width,
		top : y,
		left : x,

		paddingLeft : 10,
		backgroundImage : Ti.App.ResourcePath + L('text_box'),
		font : {
			fontSize : 22,
			fontFamily : 'Helvetica Neue',
			fontWeight : 'medium'
		},
		textAlign : 'left',
		appearance : Titanium.UI.KEYBOARD_NUMBERS_PUNCTUATION,
		keyboardType : Titanium.UI.KEYBOARD_DECIMAL_PAD,
		hintText : 'e.g 0501234567',
		maxLength : 16

	});
	scrollView.add(txtphone);
	y += height + txtVSpace;
	lbly += height + txtVSpace;

	var lblSubject = Titanium.UI.createLabel({
		height : height,
		width : width,
		top : lbly,
		//left : lblx,
		//text : Ti.App.LG('Subject'),
		color : Ti.App.DescriptionFontColor,
		font : {
			fontSize : 22.5,
			fontFamily : 'Helvetica Neue',
			fontWeight : 'medium'
		},
	});
	scrollView.add(lblSubject);
	y += height + txtVSpace;
	lbly += height + txtVSpace;

	var txtSubject = Titanium.UI.createTextField({
		height : height + 5,
		width : width,
		top : y,
		left : x,
		paddingLeft : 10,

		backgroundImage : Ti.App.ResourcePath + L('text_box'),
		
		font : {
			fontSize : 22,
			fontFamily : 'Helvetica Neue',
			fontWeight : 'medium'
		},
		textAlign : 'left',
		appearance : Titanium.UI.KEYBOARD_APPEARANCE_DEFAULT,
		keyboardType : Titanium.UI.KEYBOARD_DEFAULT,
	});
	scrollView.add(txtSubject);
	y += height + txtVSpace;
	lbly += height + txtVSpace;
	
	var lblComments = Titanium.UI.createLabel({
		height : height,
		width : width,
		top : lbly,
		//left : lblx,
		//text : Ti.App.LG('Comments') + ' *',
		color : Ti.App.DescriptionFontColor,
		font : {
			fontSize : 22.5,
			fontFamily : 'Helvetica Neue',
			fontWeight : 'medium'
		},
	});
	scrollView.add(lblComments);
	y += height + txtVSpace;
	lbly += height + txtVSpace;

	var txtComments = Titanium.UI.createTextArea({
		height : height + 25,
		width : width,
		top : y,
		left : x,
		paddingLeft : 10,

		backgroundImage : Ti.App.ResourcePath + L('text_field'),
		
		font : {
			fontSize : 22,
			fontFamily : 'Helvetica Neue',
			fontWeight : 'medium'
		},
		textAlign : 'left',
		appearance : Titanium.UI.KEYBOARD_APPEARANCE_DEFAULT,
		keyboardType : Titanium.UI.KEYBOARD_DEFAULT,
	});
	scrollView.add(txtComments);
	y += height + txtVSpace;
	lbly += height + txtVSpace;
	
	var lblwarning = Titanium.UI.createLabel({
		height : height,
		width : width,
		top : lbly + 10,
		//left : lblx,
		//text : '* ' + Ti.App.LG('Mandatoryfileds'),
		color : Ti.App.DescriptionFontColor,
		font : {
			fontSize : 22.5,
			fontFamily : 'Helvetica Neue',
			fontWeight : 'medium'
		},
	});
	scrollView.add(lblwarning);

	var btnsave = Titanium.UI.createButton({
		width : 87,
		height : 67,
		//top:290,
		top : lbly +20,
		//title : Ti.App.LG('Submit'),
		color :  'white',
		font : {
			fontSize : 11,
			fontFamily : 'Helvetica Neue',
			fontWeight : 'bold'
		},
		backgroundImage : Ti.App.ResourcePath + L('red_button')
	});
	scrollView.add(btnsave);
	
	var changeLanguage = function(e) {
		
	        lblFirstname.text = L('FirstName') + ' *';//Ti.App.LG('FirstName') + ' *';
			lblLastname.text =  L('LastName') + ' *';//Ti.App.LG('LastName') + ' *';
			lblemail.text = L('EmailID') + ' *';//Ti.App.LG('EmailID') + ' *';
			lblphone.text = L('MobileNumber') + ' *';//Ti.App.LG('MobileNumber') + ' *';
			lblSubject.text = L('Subject');//Ti.App.LG('Subject');
			lblComments.text = L('Comments') + ' *';//Ti.App.LG('Comments') + ' *';
			lblwarning.text = '* ' + L('Mandatoryfileds');//Ti.App.LG('Mandatoryfileds');
			btnsave.title = L('Submit');//Ti.App.LG('Submit');
	  
	  if(Ti.App.LanguageId == 1)
      {
      	    lblFirstname.textAlign = 'left';
			lblLastname.textAlign = 'left';
			lblemail.textAlign = 'left';
			lblphone.textAlign = 'left';
			lblSubject.textAlign = 'left';
			lblComments.textAlign = 'left';
			lblwarning.textAlign = 'left';
			
      }	
      else
      {
      	    lblFirstname.textAlign = 'right';
			lblLastname.textAlign = 'right';
			lblemail.textAlign = 'right';
			lblphone.textAlign = 'right';
			lblSubject.textAlign = 'right';
			lblComments.textAlign = 'right';
			lblwarning.textAlign = 'right';
      }		
		
	};
	changeLanguage();
	Ti.App.addEventListener('LanguageChanged', changeLanguage);			
	
	function validateEmail(email) {
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	}
	
	btnsave.addEventListener('click', function() {

		var errorMessage = '';

		if (txtFirstname != null) {
			if ((txtFirstname.value.trim()).length == 0) {
				errorMessage = errorMessage + L('EnterFirstName') + '\n';
			}
		} else {
			errorMessage = errorMessage + L('EnterFirstName') + '\n';
		}
		if (txtLastname != null) {
			if ((txtLastname.value.trim()).length == 0) {
				errorMessage = errorMessage + L('EnterLastName') + '\n';
			}
		} else {
			errorMessage = errorMessage + L('EnterLastName') + '\n';
		}
		

		if (txtemail != null) {
			if ((txtemail.value.trim()).length == 0) {
				errorMessage = errorMessage + L('EnterEmailID') + '\n';

			} else {
				var emailvaildate = validateEmail(txtemail.value.trim());
				if (emailvaildate == 0) {
					errorMessage = errorMessage + L('Invalid Email Format ') + '\n';
				}
			}
		} else {
			errorMessage = errorMessage + L('EnterEmailID') + '\n';
			;
		}
		if (txtphone != null) {
			if ((txtphone.value.trim()).length == 0) {
				errorMessage = errorMessage + L('EnterphoneNumber') + '\n';
				;
			}
		} else {
			errorMessage = errorMessage + L('EnterphoneNumber') + '\n';
			;
		}

		
		if (txtComments != null) {
			if ((txtComments.value.trim()).length == 0) {
				errorMessage = errorMessage + L('EnterComments') + '\n';
			}
		} else {
			errorMessage = errorMessage + L('EnterComments') + '\n';
		}

		if (errorMessage.length > 0) {

			Ti.App.ShowAlert('Complain or suggestion', errorMessage);
			return;
		}
		
		
		txtFirstname.value = '';
		txtLastname.value = '';
		txtemail.value = '';
		txtphone.value = '';
		txtSubject.value = '';
		txtComments.value = '';
		


		
		
		Ti.App.ShowAlert(L('SendCommentSuccessMsg'));
		
		
		

	});
	
	return self;
};

module.exports = ComplainOrSuggestionView;