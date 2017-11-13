var args = arguments[0] || {};
var isTablet = Alloy.isTablet;
Ti.API.info('>>>>>>' + JSON.stringify(args));
if (args.data != undefined) {
	var data = args.data.data;
} else {
	var data = undefined;
}
var httpManager = require("httpManager");
//Alloy.createController('common/httpManager');
var colorCode,
    selectedReqType = null,
    selectedCategory = null,
    selectedCountry = null,
    selectedAttachmentType = null;
if (data != undefined) {
	$.requestTypeView.touchEnabled = false;
	$.categoryView.touchEnabled = false;
	$.countryView.touchEnabled = false;
	$.txtSubject.editable = false;
	selectedReqType = true;
	selectedCategory = {
		id : data.CategoryId
	};
	selectedCountry = true;
}

if (OS_IOS) {
	colorCode = Alloy.Globals.path.lblGrayColor;
} else {
	colorCode = "#888888";
}

if (Alloy.Globals.isIOS7Plus) {
	$.statusBar.height = 20;
}

function closeWindow() {
	Alloy.Globals.closeWindow($.winCreateRequest);
}

function gotoHome() {
	Alloy.Globals.gotoHome();
}

function setSelectedRequestType(e) {
	$.lblrequestType.text = (Alloy.Globals.isEnglish) ? e.obj.title : e.obj.titleAr;
	selectedReqType = e.obj;
}

function clearText() {
	if ($.txtDetail.value == Alloy.Globals.selectedLanguage.enterYourDetails) {
		$.txtDetail.value = "";
		$.txtDetail.color = Alloy.Globals.path.borderColor;
	}
}

function putHintText() {
	if ($.txtDetail.value.trim().length == 0) {
		$.txtDetail.color = colorCode;
		$.txtDetail.value = Alloy.Globals.selectedLanguage.enterYourDetails;
	}
}

var arrRequestType = [];
function showRequestTypes() {
	if (arrRequestType.length == 0) {
		httpManager.getTakamulRequestType(function(data) {
			if (data != null) {
				Ti.API.info('>>>>>>>' + JSON.stringify(data));
				if (data.status == "Success") {
					arrRequestType = data.arrRequestList;
					Alloy.createController("winSelection", {
						data : data.arrRequestList,
						title : Alloy.Globals.selectedLanguage.selectRequestType,
						callBackFunction : setSelectedRequestType
					}).getView().open();
				} else {
					Alloy.Globals.ShowAlert($.lblNavTitle.text, (Alloy.Globals.isEnglish) ? data.description_En : data.description_Ar);
				}
			}
		});
	} else {
		Alloy.createController("winSelection", {
			data : arrRequestType,
			title : Alloy.Globals.selectedLanguage.selectRequestType,
			callBackFunction : setSelectedRequestType
		}).getView().open();
	}
}

function setSelectedCategory(e) {
	$.lblCategory.text = (Alloy.Globals.isEnglish) ? e.obj.title : e.obj.titleAr;
	selectedCategory = e.obj;
}

var arrCategory = [];
function showCateogry() {
	if (arrCategory.length == 0) {
		httpManager.getTakamulCategory(function(data) {
			if (data != null) {
				Ti.API.info('>>>>>>>' + JSON.stringify(data));
				if (data.status == "Success") {
					$.lblAttachment.text = Alloy.Globals.selectedLanguage.selectAttachmentType;
					selectedAttachmentType = null;
					arrCategory = data.arrSubjectList, Alloy.createController("winSelection", {
						data : data.arrSubjectList,
						title : Alloy.Globals.selectedLanguage.selectCategory,
						callBackFunction : setSelectedCategory
					}).getView().open();
				} else {
					Alloy.Globals.ShowAlert($.lblNavTitle.text, (Alloy.Globals.isEnglish) ? data.description_En : data.description_Ar);
				}
			}
		});
	} else {
		Alloy.createController("winSelection", {
			data : arrCategory,
			title : Alloy.Globals.selectedLanguage.selectCategory,
			callBackFunction : setSelectedCategory
		}).getView().open();
	}

}

function setSelectedCountry(e) {
	$.lblCountry.text = (Alloy.Globals.isEnglish) ? e.obj.title : e.obj.titleAr;
	selectedCountry = e.obj;
}

var arrCountry = [];
function showCountry() {
	if (arrCountry.length == 0) {
		httpManager.getTakamulCountry(function(data) {
			if (data != null) {
				if (data.status == "Success") {
					Ti.API.info('>>>>>>>' + JSON.stringify(data));
					arrCountry = data.arrSubjectList;
					Alloy.createController("winSelection", {
						data : data.arrSubjectList,
						title : Alloy.Globals.selectedLanguage.selectCountry,
						callBackFunction : setSelectedCountry
					}).getView().open();
				} else {
					Alloy.Globals.ShowAlert($.lblNavTitle.text, (Alloy.Globals.isEnglish) ? data.description_En : data.description_Ar);
				}
			}
		});
	} else {
		Alloy.createController("winSelection", {
			data : arrCountry,
			title : Alloy.Globals.selectedLanguage.selectCountry,
			callBackFunction : setSelectedCountry
		}).getView().open();
	}
}

function setSelectedAttachmentsType(e) {
	$.lblAttachment.text = (Alloy.Globals.isEnglish) ? e.obj.title : e.obj.titleAr;
	selectedAttachmentType = e.obj;

}

function showAttachmentType() {
	if (selectedCategory == null) {
		Alloy.Globals.ShowAlert($.lblNavTitle.text, Alloy.Globals.selectedLanguage.firstSelectCategory);
		return;
	}

	httpManager.getTakamulAttachmentType(selectedCategory.id, function(data) {
		if (data != null) {
			if (data.status == "Success") {
				Ti.API.info('>>>>>>>' + JSON.stringify(data));
				Alloy.createController("winSelection", {
					data : data.arrSubjectList,
					title : Alloy.Globals.selectedLanguage.selectAttachmentType,
					callBackFunction : setSelectedAttachmentsType
				}).getView().open();
			} else {
				Alloy.Globals.ShowAlert($.lblNavTitle.text, (Alloy.Globals.isEnglish) ? data.description_En : data.description_Ar);
			}
		}
	});
}

function closePopUP() {
	args.callback();
	closeWindow();
}

function openUserSatisfaction() {
	httpManager.getUserSatisfactionQuestions(function(e) {

		if (e == null) {
			return;
		}
		args.callback();
		closeWindow();
		var win = Alloy.createController("UserSatisfaction/winUserSatisfaction", e).getView();
		Alloy.Globals.openWindow(win);

	});
}

function createRequest() {
	if (selectedReqType == null) {
		Alloy.Globals.ShowAlert($.lblNavTitle.text, Alloy.Globals.selectedLanguage.selectRequestType);
		return;
	} else if (selectedCategory == null) {
		Alloy.Globals.ShowAlert($.lblNavTitle.text, Alloy.Globals.selectedLanguage.selectCategory);
		return;
	} else if (selectedCountry == null) {
		Alloy.Globals.ShowAlert($.lblNavTitle.text, Alloy.Globals.selectedLanguage.selectCountry);
		return;
	} else if ($.txtSubject.value.trim().length == 0) {
		Alloy.Globals.ShowAlert($.lblNavTitle.text, Alloy.Globals.selectedLanguage.enterSubjectHint);
		return;
	} else if ($.txtDetail.value.trim().length == 0 || $.txtDetail.value.trim() == Alloy.Globals.selectedLanguage.enterYourDetails) {
		Alloy.Globals.ShowAlert($.lblNavTitle.text, Alloy.Globals.selectedLanguage.enterDetails);
		return;
	}/* else if (selectedAttachmentType == null) {
	 Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.createRequest, Alloy.Globals.selectedLanguage.selectAttachmentType);
	 return;
	 }*/ else if (selectedAttachmentType != null && arrSelectedImage.length == 0) {
		Alloy.Globals.ShowAlert($.lblNavTitle.text, Alloy.Globals.selectedLanguage.attachMedia);
		return;
	}

	var arrMedia = [];
	var mediaSize = 0;
	for (var i = 0,
	    len = arrSelectedImage.length; i < len; i++) {
		mediaSize += arrSelectedImage[i].image.size;
		arrMedia.push({
			fileName : "MOF" + ".jpg",
			fileTitle : "MOF" + ".jpg",
			fileSize : mediaSize,
			byteData : Titanium.Utils.base64encode(arrSelectedImage[i].image)
		});
	}
	if (data != undefined) {
		httpManager.updateTakamulRequest(args.data.requestID, $.txtDetail.value.trim(), data.requestBusID, arrMedia, (selectedAttachmentType == null) ? "" : selectedAttachmentType.id, args.data.data.requestTypeId, function(data) {
			Ti.API.info('>>>>>>>>' + data);
			if (data != null) {
				if (data.tokenDetails.status == "Success") {
					setTokenData(data.tokenDetails);
					var alertDialog = Ti.UI.createAlertDialog({
						title : Alloy.Globals.selectedLanguage.replyRequest,
						message : (Alloy.Globals.isEnglish) ? data.tokenDetails.description_EN : data.tokenDetails.description_AR,
						buttonNames : [Alloy.Globals.selectedLanguage.ok],
					});
					alertDialog.show();
					alertDialog.addEventListener('click', function(e) {
						// $.backView.show();
						// $.popView.show();
						args.callback();
						closeWindow();
					});

				} else {
					Ti.App.Properties.setInt("isLoggedIn_Takamul", false);
					Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.createRequest, (Alloy.Globals.isEnglish) ? data.tokenDetails.description_EN : data.tokenDetails.description_AR);
				}

			}
		});
	} else {
		httpManager.createTakamulRequest(selectedReqType.id, selectedCategory.id, $.txtSubject.value.trim(), selectedCountry.id, $.txtDetail.value.trim(), arrMedia, (selectedAttachmentType == null) ? "" : selectedAttachmentType.id, function(data) {
			Ti.API.info('>>>>>>>>' + data);
			if (data != null) {
				if (data.tokenDetails.status == "Success") {
					setTokenData(data.tokenDetails);
					var alertDialog = Ti.UI.createAlertDialog({
						title : Alloy.Globals.selectedLanguage.createRequest,
						message : (Alloy.Globals.isEnglish) ? data.tokenDetails.description_EN : data.tokenDetails.description_AR,
						buttonNames : [Alloy.Globals.selectedLanguage.ok],
					});
					alertDialog.show();
					alertDialog.addEventListener('click', function(e) {
						// $.backView.show();
						// $.popView.show();
						if(args.isFromHome){
							closeWindow();					
						}else{
							args.callback();
							closeWindow();
						}
					});

				} else {
					Ti.App.Properties.setInt("isLoggedIn_Takamul", false);
					Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.createRequest, (Alloy.Globals.isEnglish) ? data.tokenDetails.description_EN : data.tokenDetails.description_AR);
				}
			}
		});
	}
}

function setTokenData(e) {
	//Ti.App.Properties.setObject("LoginDetaisObj_Takamul", e);

	Ti.App.Properties.setInt("authenticationCode_Takamul", e.tokenCode);
	Ti.App.Properties.setString("emailID_Takamul", e.emailId);
	Ti.App.Properties.setString("createdDate_Takamul", e.createdDate);
	Ti.App.Properties.setString("lastUpdatedDate_Takamul", e.lastUpdatedDate);
	Ti.App.Properties.setString("status_Takamul", e.tokenStatus);
	Ti.App.Properties.setString("roleType_Takamul", e.roleType);
	Ti.App.Properties.setString("groupType_Takamul", e.groupType);
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
						var view = Ti.UI.createView({
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
						$.imagesView.add(view);
					}

				},
				cancel : function() {
					Ti.API.info(' Cancelled ');
				},
				error : function(error) {
					//alert(error);
					if (error.code == 2) {
						Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.createTicket, Alloy.Globals.selectedLanguage.cameraNotAvail);
					} else {
						alert(error);
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
		alert(ex);
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

						arrSelectedImage.push({
							image : madinati_Image,
							//location : Alloy.Globals.UserLocation
						});

						var view = Ti.UI.createView({
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
					}

				} catch(ex1) {
					alert('Success block=' + ex1);
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
		alert(ex);
	}

}

function selectImage() {
	// This is used to upload images.Gives Media options to upload images.
	$.txtDetail.blur();
	if (selectedAttachmentType == null) {
		return;
	}
	if (arrSelectedImage.length >= 3) {
		Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.createTicket, Alloy.Globals.selectedLanguage.imageLimitMsg);
	} else {
		arrMediaTypes = [Ti.Media.MEDIA_TYPE_PHOTO];
		mediaOptionDialog = Titanium.UI.createOptionDialog({
			options : [Alloy.Globals.selectedLanguage.cameraTitle, Alloy.Globals.selectedLanguage.photoGalleryTitle, Alloy.Globals.selectedLanguage.cancel],
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

function changeLanguage() {
	$.lblNavTitle.text = Alloy.Globals.selectedLanguage.createNewRequest;
	$.lblCreateRequest.text = Alloy.Globals.selectedLanguage.createNewRequest;
	$.lblrequestType.text = Alloy.Globals.selectedLanguage.selectRequestType;
	$.lblCategory.text = Alloy.Globals.selectedLanguage.selectCategory;
	$.lblsubject.text = Alloy.Globals.selectedLanguage.subjectTitle + ":";
	$.lblCountry.text = Alloy.Globals.selectedLanguage.selectCountry;
	$.lblDetail.text = Alloy.Globals.selectedLanguage.details + ":";
	$.txtDetail.color = colorCode;
	$.txtDetail.value = Alloy.Globals.selectedLanguage.enterYourDetails;
	$.lblAttachment.text = Alloy.Globals.selectedLanguage.selectAttachmentType;
	$.lblAttachements.text = Alloy.Globals.selectedLanguage.attachments + " : ";
	$.btnDone.title = Alloy.Globals.selectedLanguage.send;
	$.lblUserSatisfaction.text = Alloy.Globals.selectedLanguage.userSatisfaction;
	$.lblSuggestion.text = Alloy.Globals.selectedLanguage.userSatisfactionSuggestion;
	$.lblFeedback.text = Alloy.Globals.selectedLanguage.yes;
	$.lblSkip.text = Alloy.Globals.selectedLanguage.skip;

	var alignment;
	if (Alloy.Globals.isEnglish) {
		if (data != undefined) {
			$.lblNavTitle.text = Alloy.Globals.selectedLanguage.replyRequest;
			$.lblCreateRequest.text = Alloy.Globals.selectedLanguage.replyRequest;
			$.lblrequestType.text = data.requestType_En;
			$.lblCategory.text = data.Category_En;
			$.lblCountry.text = data.country_En;
			$.txtSubject.value = data.subject;
		}

		alignment = Ti.UI.TEXT_ALIGNMENT_LEFT;
		$.lblrequestTypeAstrik.left = $.lblCategoryAstrik.left = $.lblCountryAstrik.left = $.lblsubjectAstrik.left = $.lblDetailAstrik.left = 8;
		$.lblrequestType.left = $.lblCategory.left = $.lblCountry.left = $.lblsubject.left = $.lblDetail.left = $.lblAttachment.left = $.lblAttachements.left = 17;
		$.imgdownArrow.right = $.imgdownArrowCat.right = $.imgdownArrowCou.right = $.imgdownArrowAtt.right = $.imgAttachment.right = 10;
		$.txtSubject.left = (isTablet) ? 200 : 140;
		$.txtDetail.left = (isTablet) ? 195 : 135;
		$.txtSubject.right = $.txtDetail.right = 10;
		$.lblrequestType.right = $.lblCategory.right = $.lblCountry.right = $.lblAttachment.right = (isTablet) ? 40 : 33;

		$.lblFeedback.left = $.lblSkip.right = 0;

	} else {
		if (data != undefined) {
			$.lblCreateRequest.text = Alloy.Globals.selectedLanguage.replyRequest;
			$.lblrequestType.text = data.requestType_Ar;
			$.lblCategory.text = data.Category_Ar;
			$.txtSubject.value = data.subject;
			$.lblCountry.text = data.country_Ar;
		}
		$.lblrequestTypeAstrik.right = $.lblCategoryAstrik.right = $.lblCountryAstrik.right = $.lblsubjectAstrik.right = $.lblDetailAstrik.right = 8;
		$.lblrequestType.right = $.lblCategory.right = $.lblCountry.right = $.lblsubject.right = $.lblDetail.right = $.lblAttachment.right = $.lblAttachements.right = 17;
		$.imgdownArrow.left = $.imgdownArrowCat.left = $.imgdownArrowCou.left = $.imgdownArrowAtt.left = $.imgAttachment.left = 10;
		$.txtSubject.right = (isTablet) ? 200 : 140;
		$.txtDetail.right = (isTablet) ? 195 : 135;
		$.txtSubject.left = $.txtDetail.left = 10;
		$.lblrequestType.left = $.lblCategory.left = $.lblCountry.left = $.lblAttachment.left = (isTablet) ? 40 : 33;
		alignment = Ti.UI.TEXT_ALIGNMENT_RIGHT;

		$.lblFeedback.right = $.lblSkip.left = 0;
	}
	$.lblCreateRequest.textAlign = $.lblrequestType.textAlign = $.lblCategory.textAlign = $.lblCountry.textAlign = $.lblsubject.textAlign = $.lblDetail.textAlign = $.lblAttachment.textAlign = alignment;
	$.txtSubject.textAlign = $.txtDetail.textAlign = $.lblAttachements.textAlign = alignment;
}

changeLanguage();

$.winCreateRequest.addEventListener("focus", function(e) {
	$.viewBottomToolbar.setDefaultTheme($.winCreateRequest);
});

$.viewBottomToolbar.setDefaultTheme($.winCreateRequest);

// var openHelpScreen = $.viewInstructions.openHelpScreen;

/**
 * Adding the eventlistener for the bottom bar view
 *
 * @param {Object} e
 */
$.viewBottomToolbar.getView().addEventListener('click', function(e) {
	if (e.source.buttonId == 'btnFontChange') {
		$.viewBottomToolbar.changeFont($.winCreateRequest);
	} else if (e.source.buttonId == 'btnSystemFeedback') {
		$.viewBottomToolbar.openFeedbackScreen(e);
	} else/*if (e.source.buttonId == 'btnSystemInstruction') {
	 $.viewInstructions.openHelpScreen(e);
	 } else*/
	if (e.source.buttonId == 'btnSystemChangeTheme') {
		$.viewBottomToolbar.changeTheme($.winCreateRequest);
	}
});

/**
 * Called on open of the window
 *
 * @param {Object} e
 */
function windowOpened(e) {
	Alloy.Globals.arrWindows.push($.winCreateRequest);
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
function windowClosed(e) {
	Alloy.Globals.arrWindows.pop();
	$.winCreateRequest.removeAllChildren();
	$.imgBackBtn = $.imgHomeBtn = $.winCreateRequest = null;
	$.destroy();
};