var httpManager = require("httpManager");
//Alloy.createController("common/httpManager");
var colorCode;

if (OS_IOS) {
	colorCode = Alloy.Globals.path.lblGrayColor;
} else {
	colorCode = "#888888";
}
var args = arguments[0] || {};
var callBack = args.callBack;
var data = args.data;
if (args.isDetail) {
	$.txtDescription.editable = false;
	$.lblNavTitle.text = "Details of : " + data.requestNo;
	$.lblCategoryValue.text = data.category;
	$.lblSubCategoryValue.text = data.subCategory;
	$.txtDescription.value = data.issueDescription;
	$.categoryView.touchEnabled = $.subCategoryView.touchEnabled = false;
	$.lblAttachements.visible = false;
	$.attachmentView.visible = false;
	$.imagesView.visible = false;
	$.btnSubmit.visible = false;

} else {
	$.lblNavTitle.text = Alloy.Globals.selectedLanguage.createTicket;
	//$.lblDepartmentValue.text = Alloy.Globals.selectedLanguage.others;
	$.lblCategoryValue.text = Alloy.Globals.selectedLanguage.others;
	$.lblSubCategoryValue.text = Alloy.Globals.selectedLanguage.others;
	// $.lblDepartmentValue.text = Alloy.Globals.selectedLanguage.department;
	$.lblCategoryValue.text = Alloy.Globals.selectedLanguage.categoryTitle;
	$.lblSubCategoryValue.text = Alloy.Globals.selectedLanguage.subCategory;
	//$.lblFederalValue.text = Alloy.Globals.selectedLanguage.SuppFederalEntity;
	$.txtDescription.color = colorCode;
	$.txtDescription.value = $.txtDescription.noteHintText = $.txtDescription._hintText = Alloy.Globals.selectedLanguage.enterHintText;
}

if (OS_IOS) {
	density = "dp";
} else {
	density = "px";
}

/*$.winCreateTicket.addEventListener("open", function(e) {
 $.lblTitle.height = (Alloy.Globals.GetHeight(20) + density);
 $.departmentView.height = $.categoryView.height = $.subCategoryView.height = $.categoryView.height = (Alloy.Globals.GetHeight(27) + density);
 $.attachmentView.height = $.btnSubmit.height = (Alloy.Globals.GetHeight(27) + density);
 //	$.lblStatus.width = (Alloy.Globals.GetWidth(80) + density);
 });*/

if (Alloy.Globals.isIOS7Plus) {
	//	$.winDashboard.statusBarStyle = Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT;
	$.winCreateTicket.extendEdges = [Ti.UI.EXTEND_EDGE_TOP];
	$.statusBar.height = 20;
}

function closeWindow() {
	Alloy.Globals.closeWindow($.winCreateTicket);
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
						/*
						 var cropRect = e.cropRect;

						 var madinati_Image = e.media;

						 var mime_type = madinati_Image.mimeType;

						 var arr = Array();

						 arr = mime_type.split('/');

						 var image_type = arr[1];
						 var image_name = arr[1];

						 media_file_name = new Date().getTime() + "." + arr[1];

						 var heightOfImage = madinati_Image.height;
						 var widthOfImage = madinati_Image.width;

						 //alert("Before " + heightOfImage + "," + widthOfImage);

						 var newHeight = 500;
						 try {
						 if (heightOfImage > newHeight) {
						 Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading, false);

						 var ImageFactory = require('ti.imagefactory');

						 widthOfImage = (newHeight * widthOfImage) / heightOfImage;

						 var madinati_Image = ImageFactory.imageAsResized(madinati_Image, {
						 width : 400, //widthOfImage,
						 height : 480, // newHeight,
						 // quality : ImageFactory.QUALITY_LOW
						 });

						 heightOfImage = madinati_Image.height;
						 widthOfImage = madinati_Image.width;

						 Alloy.Globals.hideLoading();
						 //alert("Before " + heightOfImage + "," + widthOfImage);
						 }
						 } catch(exx) {
						 Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.createTicket, Alloy.Globals.selectedLanguage.imgTooBig);
						 // Ti.API.info('>>>>>>> catch Block >>>>>>>>>>>' + exx);
						 Alloy.Globals.hideLoading();
						 return;
						 }
						 arrSelectedImage.push({
						 image : madinati_Image,
						 location : Alloy.Globals.UserLocation
						 });
						 var view = Ti.UI.createView({
						 height : '100%',
						 width : "55dp",
						 });

						 var borderView = Ti.UI.createView({
						 height : '45dp',
						 width : '45dp',
						 borderRadius : '5dp',
						 borderColor : Alloy.Globals.path.buttonBackgroundColor,
						 borderWidth : '1dp'
						 });

						 view.add(borderView);
						 if (Alloy.Globals.isEnglish) {
						 view.left = '7dp';
						 } else {
						 view.right = '7dp';
						 }
						 // viewLeft = viewLeft + view.width + 7;
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
						 height : 8, //Ti.UI.SIZE,
						 width : 8, //Ti.UI.SIZE,
						 //	image : Alloy.Globals.path.imgRemove,
						 backgroundColor : Alloy.Globals.path.buttonBackgroundColor,
						 style : 'PLAIN',
						 index : arrSelectedImage.length - 1
						 });

						 view.addEventListener('click', function(e) {
						 borderView.remove(imageView);
						 view.remove(btnRemove);
						 $.imagesView.remove(view);
						 arrSelectedImage.splice(btnRemove.index, 1);
						 });

						 arrBtnRemove.push(btnRemove);
						 borderView.add(imageView);
						 view.add(btnRemove);
						 $.imagesView.add(view);
						 */
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
						/*
						 var cropRect = event.cropRect;

						 madinati_Image = event.media;

						 var mime_type = madinati_Image.mimeType;

						 var arr = Array();

						 arr = mime_type.split('/');

						 var image_type = arr[1];
						 var image_name = arr[1];

						 media_file_name = new Date().getTime() + "." + arr[1];

						 var heightOfImage = madinati_Image.height;
						 var widthOfImage = madinati_Image.width;

						 //alert("Before " + heightOfImage + "," + widthOfImage);

						 var newHeight = 500;
						 try {
						 if (heightOfImage > newHeight) {
						 Alloy.Globals.showLoading(Alloy.Globals.selectedLanguage.loading, false);

						 var ImageFactory = require('ti.imagefactory');

						 widthOfImage = (newHeight * widthOfImage) / heightOfImage;

						 madinati_Image = ImageFactory.imageAsResized(madinati_Image, {
						 width : 400, // widthOfImage,
						 height : 480, //newHeight,
						 // quality : ImageFactory.QUALITY_LOW
						 });

						 heightOfImage = madinati_Image.height;
						 widthOfImage = madinati_Image.width;

						 //alert("Before " + heightOfImage + "," + widthOfImage);
						 Alloy.Globals.hideLoading();
						 }
						 } catch(exx) {
						 Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.createTicket, Alloy.Globals.selectedLanguage.imgTooBig);
						 // Ti.API.info('>>>>>>> catch Block >>>>>>>>>>>' + exx);
						 Alloy.Globals.hideLoading();
						 return;
						 }
						 arrSelectedImage.push({
						 image : madinati_Image,
						 location : Alloy.Globals.UserLocation
						 });

						 var view = Ti.UI.createView({
						 height : '100%',
						 width : "55dp",
						 });

						 var borderView = Ti.UI.createView({
						 height : '45dp',
						 width : '45dp',
						 borderRadius : '5dp',
						 borderColor : Alloy.Globals.path.buttonBackgroundColor,
						 borderWidth : '1dp'
						 });

						 view.add(borderView);
						 if (Alloy.Globals.isEnglish) {
						 view.left = '7dp';
						 } else {
						 view.right = '7dp';
						 }
						 // viewLeft = viewLeft + view.width + 7;
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
						 height : 8, //Ti.UI.SIZE,
						 width : 8, //Ti.UI.SIZE,
						 //	image : Alloy.Globals.path.imgRemove,
						 backgroundColor : Alloy.Globals.path.buttonBackgroundColor,
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
	$.txtDescription.blur();
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

var federalEntityId = null;
var departmentId = null;
var categoryId = null;
var subCategoryId = null;

function setFederalLabel(e) {
	$.lblFederalValue.text = e.labelTitle;
	federalEntityId = e.obj.id;
	departmentId = null;
	$.lblCategoryValue.text = Alloy.Globals.selectedLanguage.categoryTitle;
}

function setDepartmentLabel(e) {
	$.lblDepartmentValue.text = e.labelTitle;
	departmentId = e.obj.id;
}

function setCategoryLabel(e) {
	$.lblCategoryValue.text = e.labelTitle;
	categoryId = e.obj.id;
	subCategoryId = null;
	$.lblSubCategoryValue.text = Alloy.Globals.selectedLanguage.subCategory;
}

function setSubCategoryLabel(e) {
	$.lblSubCategoryValue.text = e.labelTitle;
	subCategoryId = e.obj.id;
}

var isTapped = false;

function showFederalList() {

	if (args.isDetail) {
		return;
	}

	if (isTapped) {
		return;
	}
	isTapped = true;

	httpManager.getFederalEntityList(function(e) {

		var arrList = [];

		for (var i = 0; i < e.length; i++) {
			var title = Alloy.Globals.isEnglish ? e[i].enName : e[i].arName;
			arrList.push({
				title : title,
				titleAr : title,
				value : title,
				id : e[i].id,
				selected : ""
			});
		}

		var winSelection = Alloy.createController('winSelection', {
			data : arrList,
			title : Alloy.Globals.selectedLanguage.selectFederalEntity,
			callBackFunction : setFederalLabel,
		}).getView();
		if (OS_IOS) {
			winSelection.open({
				modal : true
			});
		} else {
			winSelection.open();

		}

		isTapped = false;

	});
}

function showDepartmentList() {

	if (args.isDetail) {
		return;
	}

	if (isTapped) {
		return;
	}
	isTapped = true;

	httpManager.getDepartmentList(federalEntityId, function(e) {
		if (e.length == 0) {
			isTapped = false;
			return;
		}
		var arrList = [];

		for (var i = 0; i < e.length; i++) {
			var title = Alloy.Globals.isEnglish ? e[i].enName : e[i].arName;
			arrList.push({
				title : title,
				titleAr : title,
				value : title,
				id : e[i].id,
				selected : ""
			});
		}

		var winSelection = Alloy.createController('winSelection', {
			data : arrList,
			title : Alloy.Globals.selectedLanguage.selectDepartment,
			callBackFunction : setDepartmentLabel,
		}).getView();
		if (OS_IOS) {
			winSelection.open({
				modal : true
			});
		} else {
			winSelection.open();
		}

		isTapped = false;

	});

}

function showCategoryList() {
	$.txtDescription.blur();
	if (args.isDetail) {
		return;
	}

	if (isTapped) {
		return;
	}
	isTapped = true;

	httpManager.getCategoryList(function(e) {
		if (e.length == 0) {
			isTapped = false;
			return;
		}
		var arrList = [];

		for (var i = 0; i < e.length; i++) {
			var title = Alloy.Globals.isEnglish ? e[i].enName : e[i].arName;
			arrList.push({
				title : title,
				titleAr : title,
				value : title,
				id : e[i].id,
				selected : ""
			});
		}

		var winSelection = Alloy.createController('winSelection', {
			data : arrList,
			title : Alloy.Globals.selectedLanguage.selectCategory,
			callBackFunction : setCategoryLabel,
		}).getView();
		if (OS_IOS) {
			winSelection.open({
				modal : true
			});
		} else {
			winSelection.open();
		}

		isTapped = false;

	});

}

function showSubCategoryList() {
	$.txtDescription.blur();
	if (args.isDetail) {
		return;
	}

	if (categoryId == null) {
		Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.createTicket, Alloy.Globals.selectedLanguage.selectCategory);
		return;
	}

	if (isTapped) {
		return;
	}
	isTapped = true;

	httpManager.getSubCategoryList(categoryId, function(e) {
		if (e.length == 0) {
			isTapped = false;
			return;
		}
		var arrList = [];

		for (var i = 0; i < e.length; i++) {
			var title = Alloy.Globals.isEnglish ? e[i].enName : e[i].arName;
			arrList.push({
				title : title,
				titleAr : title,
				value : title,
				id : e[i].id,
				selected : ""
			});
		}

		var winSelection = Alloy.createController('winSelection', {
			data : arrList,
			title : Alloy.Globals.selectedLanguage.selectSubCategory,
			callBackFunction : setSubCategoryLabel,
		}).getView();
		if (OS_IOS) {
			winSelection.open({
				modal : true
			});
		} else {
			winSelection.open();
		}

		isTapped = false;

	});

}

function closePopUP() {
	if (callBack != undefined) {
		callBack();
	}
	closeWindow();
}

function openUserSatisfaction() {
	httpManager.getUserSatisfactionQuestions(function(e) {
		if (e == null) {
			return;
		}
		var win = Alloy.createController("UserSatisfaction/winUserSatisfaction", {
			callBack : closePopUP,
			data : e,
			serviceID : 6
		}).getView();
		Alloy.Globals.openWindow(win);

	});
}

function submitTicket() {
	$.txtDescription.blur();
	Ti.API.info('>>>>>' + $.txtDescription.value);
	// if(federalEntityId == null){
	// Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.createTicket, Alloy.Globals.selectedLanguage.selectFederalEntity);
	// return;
	// }
	// if (departmentId == null) {
	// Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.createTicket, Alloy.Globals.selectedLanguage.selectDepartment);
	// return;
	//}
	if (categoryId == null) {
		Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.createTicket, Alloy.Globals.selectedLanguage.selectCategory);
		return;
	} else if (subCategoryId == null) {
		Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.createTicket, Alloy.Globals.selectedLanguage.selectSubCategory);
		return;
	} else if (($.txtDescription.value == $.txtDescription._hintText) || $.txtDescription.value.trim().length == 0) {
		Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.createTicket, Alloy.Globals.selectedLanguage.textBoxHintText_Message);
		return;
	}

	var currentDate = new Date();

	var obj = {
		language : (Alloy.Globals.isEnglish) ? 1 : 0,
		applicantName : "ajnsdj asdnasd",
		applicantTitle : "G2C:mSupplier", // optional
		applicantEmail : Ti.App.Properties.getString("emailID"), //"aaelshamy@mof.gov.ae",
		applicantMobile : "", //	optional
		applicantPhone : "", //	optional
		federalEntityId : /*Ti.App.Properties.getString("entityCode"),*/31,
		federalEntityName : Alloy.Globals.selectedLanguage.SuppFederalEntity,
		departmentId : 7, //"2",
		departmentName : Alloy.Globals.selectedLanguage.others, //"الموارد المالية",
		subCatgoryId : subCategoryId, //"61",
		subCatgoryName : $.lblSubCategoryValue.text, //"اخرى",
		categoryName : $.lblCategoryValue.text, //"الأستاذ العام",
		description : $.txtDescription.value, //"تهديكم وزارة التعليم العالي والبحث العلمي أطيب التحيات ،،، يرجى من سيادتكم التكرم بفتح الفترة المحاسبية لشهر فبراير 2014م حتى نتمكن من صرف رواتب الطلاب في بداية شهر فبراير 2014م",
		status : "2", // Static
		submitData : currentDate,
		currentTeamId : "", //	optional
		currentSupportSubCategoryId : "", //	optional
		closureDate : "", //	optional
		requestNo : "", //	optional
		foElapsedMins : "0", // Static
		elapsedMins : "0",		// Static
	};

	Ti.API.info('OBJJJJ == ' + JSON.stringify(obj));

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
	httpManager.createTicket(obj, arrMedia, function(e) {
		if (e != null) {
			if (e.status == "Success") {
				var alert = Ti.UI.createAlertDialog({
					title : Alloy.Globals.selectedLanguage.createTicket,
					message : (Alloy.Globals.isEnglish) ? e.description_EN : e.description_Ar,
					buttonNames : [Alloy.Globals.selectedLanguage.ok]
				});
				alert.addEventListener('click', function(e) {
					$.backView.show();
					$.popView.show();
				});
				alert.show();

				//alert(e.description);
			} else {
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.createTicket, (Alloy.Globals.isEnglish) ? e.description_EN : description_Ar);
			}
		}
	});

}

var multilineTextBoxFocus = function(e) {

	if (e.source.value == Alloy.Globals.selectedLanguage.enterHintText) {
		e.source.value = "";
		e.source.color = Alloy.Globals.path.borderColor;
	}

};
var multilineTextBoxBlur = function(e) {
	if (e.source.value == "") {
		e.source.value = Alloy.Globals.selectedLanguage.enterHintText;
		e.source.color = colorCode;
	} else {
		e.source.color = Alloy.Globals.path.borderColor;
	}
};

function changeLanguage() {

	$.lblTitle.text = Alloy.Globals.selectedLanguage.ticketDetails;
	$.lblDescription.text = Alloy.Globals.selectedLanguage.descriptionTitle;// + " : ";
	$.lblAttachements.text = Alloy.Globals.selectedLanguage.attachments;// + " : ";
	$.btnSubmit.title = Alloy.Globals.selectedLanguage.submitTitle;
	$.lblCategory.text = Alloy.Globals.selectedLanguage.categoryTitle;
	$.lblSubCategory.text = Alloy.Globals.selectedLanguage.subCategory;
	$.lblUserSatisfaction.text = Alloy.Globals.selectedLanguage.userSatisfaction;
	$.lblSuggestion.text = Alloy.Globals.selectedLanguage.userSatisfactionSuggestion;
	$.lblFeedback.text = Alloy.Globals.selectedLanguage.yes;
	$.lblSkip.text = Alloy.Globals.selectedLanguage.skip;
	var alignment;

	if (Alloy.Globals.isEnglish) {
		alignment = Titanium.UI.TEXT_ALIGNMENT_LEFT;
		/*$.lblFederalValue.left = $.lblDepartmentValue.left =*/
		$.lblCategoryValue.left = $.lblSubCategoryValue.left = 10;
		/*$.lblFederalValue.right = $.lblDepartmentValue.right =*/
		$.lblCategoryValue.right = $.lblSubCategoryValue.right = (Alloy.isTablet) ? 50 : 40;
		$.lblAttachements.left = $.imgAttachment.right = 10;
		/*$.imgFederalArrow.right = $.imgDepartmentArrow.right =*/
		$.imgCategoryArrow.right = $.imgSubCategoryArrow.right = $.imgAttachment.right = 10;

		$.lblFeedback.left = $.lblSkip.right = 0;

	} else {
		alignment = Titanium.UI.TEXT_ALIGNMENT_RIGHT;
		/*$.lblFederalValue.left = $.lblDepartmentValue.left =*/
		$.lblCategoryValue.left = $.lblSubCategoryValue.left = (Alloy.isTablet) ? 50 : 40;
		/*$.lblFederalValue.right = $.lblDepartmentValue.right =*/
		$.lblCategoryValue.right = $.lblSubCategoryValue.right = 10;
		$.lblAttachements.right = $.imgAttachment.left = 10;
		/*$.imgFederalArrow.left = $.imgDepartmentArrow.left =*/
		$.imgCategoryArrow.left = $.imgSubCategoryArrow.left = $.imgAttachment.left = 10;
		$.lblFeedback.right = $.lblSkip.left = 0;

	}

	$.lblTitle.textAlign = /*$.lblFederalValue.textAlign = $.lblDepartmentValue.textAlign =*/
	$.lblCategoryValue.textAlign = $.lblSubCategoryValue.textAlign = alignment;
	$.lblDescription.textAlign = $.lblAttachements.textAlign = $.txtDescription.textAlign = alignment;
	/*$.lblFederal.textAlign = $.lblDepartment.textAlign =*/
	$.lblCategory.textAlign = $.lblSubCategory.textAlign = alignment;
}

// $.txtDescription.addEventListener("focus",function(e){
// if(istxtFocus == false){
// $.txtDescription.value == "";
// istxtFocus = true;
// }
// });
//
// $.txtDescription.addEventListener("blur",function(e){
// if($.txtDescription.value.trim().length == 0){
// $.txtDescription.value = Alloy.Globals.selectedLanguage.textBoxHintText_Message;
// istxtFocus = false;
// }
// });
changeLanguage();

$.winCreateTicket.addEventListener("focus", function(e) {
	$.viewBottomToolbar.setDefaultTheme($.winCreateTicket);
});
$.viewBottomToolbar.setDefaultTheme($.winCreateTicket);

/**
 * Adding the eventlistener for the bottom bar view
 *
 * @param {Object} e
 */
$.viewBottomToolbar.getView().addEventListener('click', function(e) {
	if (e.source.buttonId == 'btnFontChange') {
		$.viewBottomToolbar.changeFont($.winCreateTicket);
	} else if (e.source.buttonId == 'btnSystemFeedback') {
		$.viewBottomToolbar.openFeedbackScreen(e);
	} else if (e.source.buttonId == 'btnSystemChangeTheme') {
		$.viewBottomToolbar.changeTheme($.winCreateTicket);
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
var windowClosed = function(e) {
	$.destroy();
};

