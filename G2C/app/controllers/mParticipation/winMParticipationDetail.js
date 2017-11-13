var httpManager = require("httpManager");
//Alloy.createController('common/httpManager');
var args = arguments[0] || {};
var arrDoc = args.arrData;

if (Alloy.Globals.isIOS7Plus) {
	//$.winPurchaseOrder.extendEdges = [Ti.UI.EXTEND_EDGE_TOP];
	$.statusBar.height = 20;
}

function closeWindow() {
	Alloy.Globals.closeWindow($.winMParticipationDetail);
	//$.winISupplierHome.close();
}

function gotoHome() {
	Alloy.Globals.gotoHome();
}

function openmParticipationComment() {

	var win = Alloy.createController("mParticipation/winMParticipationComment", args.id).getView();
	Alloy.Globals.openWindow(win);
}

/*
 var arrDoc = [{
 title : "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
 titleName : "Ahmed Rashid",
 titleComments : "6 minutes"
 }];
 */

function loadItems(arrDoc) {

	$.lblComment.text = Alloy.Globals.selectedLanguage.comments + " (" + arrDoc.length + ")";

	if (arrDoc.length == 0) {
		$.lblNoItems.visible = true;
	} else {
		$.lblNoItems.visible = false;
	}

	var rowData = [];
	for (var i = 0; i < arrDoc.length; i++) {

		rowData.push({
			lblRowBy : {
				text : Alloy.Globals.selectedLanguage.by,
				width : (Alloy.Globals.isEnglish) ? 20 : 35,
				font : (Alloy.isTablet) ? Alloy.Globals.path.font15 : Alloy.Globals.path.font12,
			},
			lblRowTitle : {
				text : arrDoc[i].comments,
				font : (Alloy.isTablet) ? Alloy.Globals.path.font15 : Alloy.Globals.path.font12,
                isToExclude_contrast : true,
			},
			lblRowName : {
				text : (arrDoc[i].userName),// + "."),
				isToExclude_contrast : true,
                font : (Alloy.isTablet) ? Alloy.Globals.path.font14 : Alloy.Globals.path.font11,
			},
			/*lblRowDuration : {
				text : arrDoc[i].duration,
			},
			lblRowAgo : {
				text : Alloy.Globals.selectedLanguage.ago,
			},*/

			properties : {
				obj : arrDoc[i]
			}

		});

	}

	$.listSection.setItems(rowData);

	if (Alloy.Globals.commentAdded) {

		$.listSection.updateItemAt(0, {
			lblRowBy : {
				text : Alloy.Globals.selectedLanguage.by,
				width : (Alloy.Globals.isEnglish) ? 20 : 35
			},
			lblRowTitle : {
				text : arrDoc[0].comments,
				color : Alloy.Globals.path.navBarColor,
			},
			lblRowName : {
				text : (arrDoc[0].userName + "."),
			},
			/*lblRowDuration : {
				text : arrDoc[0].duration,
			},
			lblRowAgo : {
				text : Alloy.Globals.selectedLanguage.ago,
			},*/

			properties : {
				obj : arrDoc[0]
			}

		});

		Alloy.Globals.commentAdded = false;
	}

}


$.tableViewItems.addEventListener("itemclick", function(e) {
	var section = $.tableViewItems.sections[e.sectionIndex];
	var item = section.getItemAt(e.itemIndex);

	index = e.itemIndex;
//	$.lblCompose.text =  item.properties.obj.userName;
	$.lblCommentName.text = item.properties.obj.userName;
//	$.lblCommentDuration.text = item.properties.obj.duration;
	$.txtDesc.value = item.properties.obj.comments; 
	$.commentPopUp.visible = true;
	
	Ti.API.info('ee activity'+JSON.stringify(item.properties.obj));
});


var showHiddenCommentView = Ti.UI.createAnimation({
	top : 25,
	bottom : 0, //-25,
	curve : Ti.UI.ANIMATION_CURVE_EASE_OUT,
	duration : 300,
});

var hideHiddenCommentView = Ti.UI.createAnimation({
	top : 0,
	bottom : 0,
	curve : Ti.UI.ANIMATION_CURVE_EASE_OUT,
	duration : 300,
});

function hideCommentView() {

	$.mainBackView.animate(hideHiddenCommentView);

}

function hideCommentPopUp(){
	$.commentPopUp.visible = false;
}

function changeLanguage() {

	loadItems(arrDoc);
	$.lblNavTitle.text = Alloy.Globals.selectedLanguage.mParticipation;

//	$.lblDuration.text = args.subDuration;
	$.lblEndDateValue.text = args.endDate;
	$.lblAddComment.text = Alloy.Globals.selectedLanguage.addComment;
	$.lblCommentSuccess.text = Alloy.Globals.selectedLanguage.commentAdded;
	
	if(args.enIncentive.length > 0)
		$.imgTop.backgroundImage = Alloy.Globals.path.icnTagArticle;
	
	var alignment;

	if (Alloy.Globals.isEnglish) {

		$.lblTitle.text = args.enTitle;
		$.lblDesc.text = args.enDesc;

		alignment = Ti.UI.TEXT_ALIGNMENT_LEFT;

		$.imgClose.left = 10;
		$.lblCommentSuccess.left = 30;
		$.lblCommentSuccess.right = 10;

		$.imgTop.right = 15;
		$.imgCross.right = 5;
		$.imgCross.left = undefined;
		
		/*$.viewDuration.left = */$.lblComment.left = $.viewAddComment.right = 10;
		$.icnAddComment.right = 5;
		$.lblAddComment.right = 25;
		$.lblAddComment.left = 5;

		$.imgClose.right = /*$.viewDuration.right = */$.lblComment.right = $.viewAddComment.left = $.icnAddComment.left = undefined;

		$.lblAddComment.textAlign = Ti.UI.TEXT_ALIGNMENT_RIGHT;

	} else {
		$.lblTitle.text = args.arTitle;
		$.lblDesc.text = args.arDesc;

		alignment = Ti.UI.TEXT_ALIGNMENT_RIGHT;

		$.imgClose.right = 10;
		$.lblCommentSuccess.right = 30;
		$.lblCommentSuccess.left = 10;
		$.imgCross.left = 5;
		$.imgCross.right = undefined;
		$.imgTop.left = 15;

		/*$.viewDuration.right = */$.lblComment.right = $.viewAddComment.left = 10;
		$.icnAddComment.left = 5;
		$.lblAddComment.left = 25;
		$.lblAddComment.right = 5;

		$.imgClose.right = /*$.viewDuration.left = */$.lblComment.left = $.viewAddComment.right = $.icnAddComment.right = undefined;

		$.lblAddComment.textAlign = Ti.UI.TEXT_ALIGNMENT_LEFT;

	}

	$.txtDesc.textAlign = $.lblTitle.textAlign = $.lblDesc.textAlign = $.lblComment.textAlign = $.lblCommentSuccess.textAlign = alignment;

}

$.winMParticipationDetail.addEventListener("focus", function(e) {
	
	isClicked = false;
	$.viewBottomToolbar.setDefaultTheme($.winMParticipationDetail);
	
	if (Alloy.Globals.commentAdded) {
		httpManager.getmParticipationDetails(args.id, function(e) {

			if (e != null) {

				//	Alloy.Globals.commentAdded = false;
				$.mainBackView.animate(showHiddenCommentView);

				Ti.API.info('e==' + JSON.stringify(e));
				arrDoc = e.arrData;
				loadItems(arrDoc);

			}

		});
	}

});

changeLanguage();

$.viewBottomToolbar.setDefaultTheme($.winMParticipationDetail);

// var openHelpScreen = $.viewInstructions.openHelpScreen;

/**
 * Adding the eventlistener for the bottom bar view
 *
 * @param {Object} e
 */
$.viewBottomToolbar.getView().addEventListener('click', function(e) {
	if (e.source.buttonId == 'btnFontChange') {
		$.viewBottomToolbar.changeFont($.winMParticipationDetail);
	} else if (e.source.buttonId == 'btnSystemFeedback') {
		$.viewBottomToolbar.openFeedbackScreen(e);
	} else/*if (e.source.buttonId == 'btnSystemInstruction') {
	 $.viewInstructions.openHelpScreen(e);
	 } else*/
	if (e.source.buttonId == 'btnSystemChangeTheme') {
		$.viewBottomToolbar.changeTheme($.winMParticipationDetail);
	}
});

/**
 * Called on open of the window
 *
 * @param {Object} e
 */
function windowOpened(e) {
	Alloy.Globals.arrWindows.push($.winMParticipationDetail);
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
	$.mainView.removeAllChildren();	
	$.imgBackBtn = $.imgHomeBtn = $.imgClose = $.winMParticipationDetail = null;
	$.destroy();
};