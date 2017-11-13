var httpManager = require("httpManager");//Alloy.createController('common/httpManager');

var args = arguments[0] || {};
var callBackFunction = args.callBackFunction;

var doc = args.obj;

var arrCategory = [{
	titleEn : "Bank Attachments",
	titleAr : "حساب البنك",
}, {
	titleEn : "Chamber of Commerce membership",
	titleAr : "عضوية الغرفة التجارية",
}, {
	titleEn : "Commercial Agencies Record",
	titleAr : "سجل الوكالات التجارية",
}, {
	titleEn : "From Supplier",
	titleAr : "متنوعات",
}, {
	titleEn : "Partnership Contract",
	titleAr : "عقد الشراكة",
}, {
	titleEn : "Registration in the Commercial Register",
	titleAr : "السجل التجاري",
}, {
	titleEn : "Signature",
	titleAr : "أعتماد التوقيع",
}, {
	titleEn : "Trade License",
	titleAr : "الرخصة التجارية",
}, {
	titleEn : "To the Buyer",
	titleAr : "إلي المشتري",
}];

//alert(args.isUpdate);
//alert(args.mappingId);

if (Alloy.Globals.isIOS7Plus) {
	//$.winPurchaseOrder.extendEdges = [Ti.UI.EXTEND_EDGE_TOP];
	$.statusBar.height = 20;
}

function closeWindow() {
	Alloy.Globals.closeWindow($.winAddAttachments);
}

function showAlert(message) {

	var alert = Ti.UI.createAlertDialog({
		title : Alloy.Globals.selectedLanguage.iSupplier,
		message : message,
		buttonNames : [Alloy.Globals.selectedLanguage.ok]
	});
	alert.addEventListener('click', function(e) {
		callBackFunction();
		closeWindow();
	});
	alert.show();
}

var isCategorySelected = false;

function setCategoryLabel(e) {
	isCategorySelected = true;
	$.lblCategoryValue.text = e.labelTitle;
}

var isTapped = false;

function selectCategory(e) {

	if (isTapped) {
		return;
	}
	isTapped = true;
	
	
	Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading, false);
	var arrData = [];

	for (var i = 0; i < arrCategory.length; i++) {
		var title = (Alloy.Globals.isEnglish) ? arrCategory[i].titleEn : arrCategory[i].titleAr;
		arrData.push({
			title : arrCategory[i].titleEn,
			titleAr : arrCategory[i].titleAr,
			value : title,
			//	id : arrDirectorNationality[i].code,
			selected : ""
		});
	}

	var winSelection = Alloy.createController('winSelection', {
		data : arrData,
		title : Alloy.Globals.selectedLanguage.supplierRegistration,
		callBackFunction : setCategoryLabel,
	}).getView();
	if (OS_IOS) {
		winSelection.open({
			modal : true
		});
	} else {
		winSelection.open();
	}
	
	Alloy.Globals.hideLoading();
	isTapped = false;

}

function removeAttachmentImage() {

	var alert = Ti.UI.createAlertDialog({
		title : Alloy.Globals.selectedLanguage.iSupplier,
		message : Alloy.Globals.selectedLanguage.deleteAttachment,
		buttonNames : [Alloy.Globals.selectedLanguage.ok, Alloy.Globals.selectedLanguage.cancel]
	});
	alert.addEventListener('click', function(e) {
		if (e.index == 0) {
			$.backImageView.visible = false;
			$.imgAttachment.image = "";
			arrSelectedImage = [];
		} else {
			alert.hide();
		}
	});
	alert.show();

}

function addAttachmentImage(image) {
	$.backImageView.visible = true;
	$.imgAttachment.image = image;
}

var arrBtnRemove = [];
var arrSelectedImage = [];
var arrMediaTypes = [];

function reloadBtnRemoveIndex(index) {
	// Reload attechment image on delete

	arrBtnRemove.splice(index, 1);
	for (var i = 0; i < arrSelectedImage.length; i++) {
		arrBtnRemove[i].index = i;
	}
}

function showCamera() {
	// This is open camera and attached capture image
	try {
		var success = true;
		if (OS_IOS) {
			var success = Titanium.Media.isCameraAccessible();
		}
		if (success) {

			Titanium.Media.showCamera({
				success : function(e) {

					if (e.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
						var mime_type = e.media.mimeType;
						var arr = Array();
						arr = mime_type.split('/');
						var image_type = arr[1];
						var image_name = arr[1];
						media_file_name = new Date().getTime() + "." + arr[1];
						Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading, false);
						madinati_Image = e.media.imageAsResized(400, 480);
						Alloy.Globals.hideLoading();
						arrSelectedImage.push({
							image : madinati_Image,
							//location : Alloy.Globals.UserLocation
						});
						
						addAttachmentImage(madinati_Image);
						
						/*var view = Ti.UI.createView({
							height : '100%',
							width : (Alloy.isTablet) ? 115 : "58dp",
						});

						var borderView = Ti.UI.createView({
							height : (Alloy.isTablet) ? 90 : '45dp',
							width : (Alloy.isTablet) ? 100 : '45dp',
							borderRadius : '5dp',
							borderColor : Alloy.Globals.path.goldColor,
							borderWidth : '1dp'
						});

						view.add(borderView);
						if (Alloy.Globals.isEnglish) {
							view.left = '7dp';
						} else {
							view.right = '7dp';
						}
						var imageView = Ti.UI.createImageView({
							top : 0,
							right : 0,
							left : 0,
							bottom : 0,
							image : madinati_Image,
						});
						var btnRemove = Ti.UI.createImageView({
							top : 0,
							right : 0,
							height : (Alloy.isTablet) ? 25 : 16,
							width : (Alloy.isTablet) ? 25 : 16,
							//    image : Alloy.Globals.path.imgRemove,
							// backgroundColor : Alloy.Globals.path.goldColor,
							image : Alloy.Globals.path.imgDeleteNew,
							style : 'PLAIN',
							index : arrSelectedImage.length - 1
						});

						view.addEventListener('click', function(e) {
							borderView.remove(imageView);
							arrSelectedImage.splice(btnRemove.index, 1);
							view.remove(btnRemove);
							$.imagesView.remove(view);
							reloadBtnRemoveIndex(btnRemove.index);

						});
						arrBtnRemove.push(btnRemove);
						borderView.add(imageView);
						view.add(btnRemove);
						$.imagesView.add(view);*/
					}
				},
				cancel : function() {
					Ti.API.info(' Cancelled ');
				},
				error : function(error) {
					if (error.code == 2) {
						Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.attachMedia, Alloy.Globals.selectedLanguage.cameraNotAvail);
					} else {
					//	alert(error);
					}
				},
				allowEditing : true,
				saveToPhotoGallery : true,
				mediaTypes : arrMediaTypes,
				videoQuality : Titanium.Media.QUALITY_LOW,
				videoMaximumDuration : Ti.Platform.osname == 'android' ? 20 : 20000
			});
		} else {
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.camera, Alloy.Globals.selectedLanguage.cameraNotAccess);

		}
	} catch(ex) {
	//	alert(ex);
	}
}

function choosePhotoGallery() {
	// This function is open device gallery for select image to attached
	try {
		Titanium.Media.openPhotoGallery({
			success : function(event) {
				try {

					if (event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
						var mime_type = event.media.mimeType;
						var arr = Array();
						arr = mime_type.split('/');
						var image_type = arr[1];
						var image_name = arr[1];
						media_file_name = new Date().getTime() + "." + arr[1];
						madinati_Image = event.media.imageAsResized(400, 480);
						Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading, false);
						Alloy.Globals.hideLoading();

						// Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.createTicket, Alloy.Globals.selectedLanguage.imageTooLAarge);
						//
						// Alloy.Globals.hideLoading();
						// return;

						arrSelectedImage.push({
							image : madinati_Image,
							//location : Alloy.Globals.UserLocation
						});
						
						addAttachmentImage(madinati_Image);
						
					/*	var view = Ti.UI.createView({
							height : '100%',
							width : (Alloy.isTablet) ? 115 : "58dp",
						});

						var borderView = Ti.UI.createView({
							height : (Alloy.isTablet) ? 90 : '45dp',
							width : (Alloy.isTablet) ? 100 : '45dp',
							borderRadius : '5dp',
							// borderColor : Alloy.Globals.path.goldColor,
							image : Alloy.Globals.path.imgDeleteNew,
							borderWidth : '1dp'
						});

						view.add(borderView);
						if (Alloy.Globals.isEnglish) {
							view.left = '7dp';
						} else {
							view.right = '7dp';
						}
						var imageView = Ti.UI.createImageView({
							top : 0,
							right : 0,
							left : 0,
							bottom : 0,
							image : madinati_Image,
						});
						var btnRemove = Ti.UI.createImageView({
							top : 0,
							right : 0,
							height : (Alloy.isTablet) ? 25 : 16,
							width : (Alloy.isTablet) ? 25 : 16,
							//	image : Alloy.Globals.path.imgRemove,
							// backgroundColor : Alloy.Globals.path.goldColor,
							image : Alloy.Globals.path.imgDeleteNew,
							style : 'PLAIN',
							index : arrSelectedImage.length - 1
						});

						view.addEventListener('click', function(e) {
							borderView.remove(imageView);
							arrSelectedImage.splice(btnRemove.index, 1);
							view.remove(btnRemove);
							$.imagesView.remove(view);
							reloadBtnRemoveIndex(btnRemove.index);

						});
						arrBtnRemove.push(btnRemove);
						borderView.add(imageView);
						view.add(btnRemove);
						$.imagesView.add(view);
						
						*/
						
					}

				} catch(ex1) {
				//	alert('Success block=' + ex1);
				}
			}, // end of success block
			cancel : function() {
				Ti.API.info(' Cancelled ');
			},
			error : function(error) {
				alert(error);
				Ti.API.info(' An error occurred!! ');
			},
			allowEditing : true,
			mediaTypes : arrMediaTypes,
			videoQuality : Titanium.Media.QUALITY_LOW,
			videoMaximumDuration : Ti.Platform.osname == 'android' ? 20 : 20000

		});
	} catch(ex) {
	//	alert(ex);
	}

}

function selectAttachment() {
	
	Ti.API.info('arrSelectedImage.length==='+JSON.stringify(arrSelectedImage.length));
	
	// This is used to upload images.Gives Media options to upload images.
	if (arrSelectedImage.length > 0) {

		Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.createTicket, Alloy.Globals.selectedLanguage.selectMaximiumFive);

	} else {
		arrMediaTypes = [Ti.Media.MEDIA_TYPE_PHOTO];
		mediaOptionDialog = Titanium.UI.createOptionDialog({
			options : [Alloy.Globals.selectedLanguage.useCamera, Alloy.Globals.selectedLanguage.selectFromGallery, Alloy.Globals.selectedLanguage.cancel],
			cancel : 2,
		});

		mediaOptionDialog.addEventListener('click', function(e) {
			var ind = e.index;
			if (ind == 0) {
				showCamera();
			} else if (ind == 1) {
				choosePhotoGallery();
			}
		});
		mediaOptionDialog.show();
	}
}

function submitForm() {
	
	Ti.API.info('submitt'+doc.fileId);
	
	if ($.txtTitle.value.length == 0) {
		Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.iSupplier, Alloy.Globals.selectedLanguage.enterTitle);
		return;
	} else if (!isCategorySelected) {
		Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.iSupplier, Alloy.Globals.selectedLanguage.selectCategory);
		return;
	} else if (arrSelectedImage.length == 0) {
		Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.iSupplier, Alloy.Globals.selectedLanguage.selectAttachment);
		return;
	} /*else if ($.txtComments.value.length == 0) {
		Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.iSupplier, Alloy.Globals.selectedLanguage.enterComments);
		return;
	}*/

	var obj = {
		registerId : args.registeredId,
		title : $.txtTitle.value.trim(),
		desc : $.txtDescription.value.trim(),
		category : $.lblCategoryValue.text,
		text : $.txtComments.value.trim(),
		action : (args.isUpdate) ? "UPDATE" : "INSERT",
		fileId : (args.isUpdate) ? doc.fileId : "",
	};

//	Ti.API.info('arrSelectedImage.length==='+JSON.stringify(arrSelectedImage.length));
//	Ti.API.info('arrSelectedImage==='+JSON.stringify(arrSelectedImage[0].image));

	var arrMedia = [];
	var mediaSize = 0;
	for (var i = 0,
	    len = arrSelectedImage.length; i < len; i++) {
		mediaSize += arrSelectedImage[i].image.size;
		arrMedia.push({
			fileName : "MOF" + ".png",
			fileTitle : "MOF" + ".png",
			fileSize : mediaSize,
			byteData : Titanium.Utils.base64encode(arrSelectedImage[i].image)
		});
	}

	httpManager.addMSupplierAttachments(obj, arrMedia, function(e) {

		Ti.API.info('e===' + JSON.stringify(e));

		if (e == null) {
			return;
		}

		if (e.status == "S") {
			showAlert(Alloy.Globals.selectedLanguage.dataSuccess);
		} else {
			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.iSupplier, e.msg);
		//	alert(e.msg);
		}

	});

}

function changeLanguage() {
	
	Ti.API.info('change'+doc.fileId);
	
	$.lblNavTitle.text = Alloy.Globals.selectedLanguage.supplierRegistration,

	$.lblAttachmentsDetails.text = Alloy.Globals.selectedLanguage.attachmentsDetails;

	$.lblTitle.text = Alloy.Globals.selectedLanguage.title;
	$.lblDescription.text = Alloy.Globals.selectedLanguage.description;

	$.lblCategory.text = Alloy.Globals.selectedLanguage.categoryTitle;
	$.lblCategoryValue.text = Alloy.Globals.selectedLanguage._selectCategory;
	$.lblAttachment.text = Alloy.Globals.selectedLanguage.attachments;
	$.lblComments.text = Alloy.Globals.selectedLanguage.comments;

	if (args.isUpdate) {
	//	arrSelectedImage.length = 1;
		isCategorySelected = true;
		$.backImageView.visible = true;
		$.txtTitle.value = doc.title;
		$.txtDescription.value = doc.desc;
		$.lblCategoryValue.text = doc.categoryName;
		$.txtComments.value = doc.text;
		$.imgAttachment.image = Ti.Utils.base64decode(doc.imageData);
		arrSelectedImage.push({
			image : $.imgAttachment.image,
		//	location : Alloy.Globals.UserLocation
		});
	}

	var alignment;

	if (Alloy.Globals.isEnglish) {
		alignment = Ti.UI.TEXT_ALIGNMENT_LEFT;

		$.backImageView.left = 5;
		$.backImageView.right = undefined;
		
		$.lblAttachment.left = $.imgCameraAttachment.right = 0;
		$.lblAttachment.right = 30;
		
		
	} else {
		alignment = Ti.UI.TEXT_ALIGNMENT_RIGHT;

		$.backImageView.right = 5;
		$.backImageView.left = undefined;
		
		$.lblAttachment.right = $.imgCameraAttachment.left = 0;
		$.lblAttachment.left = 30;
	}

	$.lblAttachmentsDetails.textAlign = $.lblTitle.textAlign = $.lblDescription.textAlign = $.lblCategory.textAlign = $.lblComments.textAlign = $.lblAttachment.textAlign = alignment;
	$.txtTitle.textAlign = $.txtDescription.textAlign = $.lblCategoryValue.textAlign = $.txtComments.textAlign = alignment;

}

changeLanguage();

$.winAddAttachments.addEventListener("focus",function(e){
	$.viewBottomToolbar.setDefaultTheme($.winAddAttachments);
});
$.viewBottomToolbar.setDefaultTheme($.winAddAttachments);

/**
 * Adding the eventlistener for the bottom bar view
 *
 * @param {Object} e
 */
$.viewBottomToolbar.getView().addEventListener('click', function(e) {
	if (e.source.buttonId == 'btnFontChange') {
		$.viewBottomToolbar.changeFont($.winAddAttachments);
	} else if (e.source.buttonId == 'btnSystemFeedback') {
		$.viewBottomToolbar.openFeedbackScreen(e);
	} else if(e.source.buttonId == 'btnSystemChangeTheme'){
		$.viewBottomToolbar.changeTheme($.winAddAttachments);
	}
});

/**
 * Called on open of the window
 *
 * @param {Object} e
 */
var windowOpened = function(e) {
	$.viewBottomToolbar.setOptions({
		showThemeButton : true,
		showInstructions : false,
		showFeedBack : true,
		showFontResize : true
	});
};


/**
 * Window is closed
 * 
 * @param {Object} e
 */
var windowClosed = function(e){
	$.destroy();
};



