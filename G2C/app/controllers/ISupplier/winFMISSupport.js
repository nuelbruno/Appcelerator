var httpManager = require("httpManager");
//Alloy.createController("common/httpManager");
var isTablet = Alloy.isTablet;
var density;
var args = arguments[0] || {};
var arrTickets = args,
    arrSeachTickets =
    args;
if (OS_IOS) {
	density = "dp";
} else {
	density = "px";
}

if (Alloy.Globals.isIOS7Plus) {
	//$.winInvoice.extendEdges = [Ti.UI.EXTEND_EDGE_TOP];
	$.statusBar.height = 20;
	$.tblFmisSupport.separatorInsets = {
		left : 0
	};
}

function closeWindow() {
	Alloy.Globals.closeWindow($.winFMISSupport);
	//$.winISupplierHome.close();
}

function seachFmisData() {
	var arrSearch = [];
	arrSearch = arrSeachTickets.filter(function(obj) {
		return obj.requestNo.indexOf($.txtSearch.value.trim().toUpperCase()) != -1;
	});
	loadFmisList(arrSearch);
}

var prevOption = 0;

function optionSelected(e) {

	if (e.source.obj == prevOption) {
		$.imgProgressTick.backgroundImage = Alloy.Globals.path.icnUnChecked;
		$.imgClosedTick.backgroundImage = Alloy.Globals.path.icnUnChecked;
		$.imgReopenTick.backgroundImage = Alloy.Globals.path.icnUnChecked;
		prevOption = 0;
		$.txtSearch.value = "";
		arrSeachTickets = arrTickets;
		loadFmisList(arrTickets);
		return;
	}

	if (e.source.obj == 1) {
		$.imgProgressTick.backgroundImage = Alloy.Globals.path.icnChecked;
		$.imgClosedTick.backgroundImage = Alloy.Globals.path.icnUnChecked;
		$.imgReopenTick.backgroundImage = Alloy.Globals.path.icnUnChecked;
		prevOption = e.source.obj;
		$.txtSearch.value = "";
		filterArray("in progress");

	} else if (e.source.obj == 2) {
		$.imgProgressTick.backgroundImage = Alloy.Globals.path.icnUnChecked;
		$.imgClosedTick.backgroundImage = Alloy.Globals.path.icnChecked;
		$.imgReopenTick.backgroundImage = Alloy.Globals.path.icnUnChecked;
		prevOption = e.source.obj;
		$.txtSearch.value = "";
		filterArray("closed");
	} else {
		$.imgProgressTick.backgroundImage = Alloy.Globals.path.icnUnChecked;
		$.imgClosedTick.backgroundImage = Alloy.Globals.path.icnUnChecked;
		$.imgReopenTick.backgroundImage = Alloy.Globals.path.icnChecked;
		prevOption = e.source.obj;
		$.txtSearch.value = "";
		filterArray("reopen");
	}

}

function filterArray(searchWord) {
	arrSeachTickets = [];
	arrSeachTickets = arrTickets.filter(function(obj) {
		return obj.status.toLowerCase() == searchWord;
	});
	loadFmisList(arrSeachTickets);
}

function changeLanguage() {
	$.lblNavTitle.text = Alloy.Globals.selectedLanguage.viewTicket;
	$.lblTicket.text = Alloy.Globals.selectedLanguage.ticketNo;
	$.lblDate.text = Alloy.Globals.selectedLanguage.dateTitle;
	$.lblStatus.text = Alloy.Globals.selectedLanguage.status;
	$.lblNoRecord.text = Alloy.Globals.selectedLanguage.noRecordFound;
	$.lblStatusTitle.text = Alloy.Globals.selectedLanguage.statusSubTickets;
	$.lblInProgress.text = Alloy.Globals.selectedLanguage.inProgress;
	$.lblClosed.text = Alloy.Globals.selectedLanguage.closed;
	$.lblReopen.text = Alloy.Globals.selectedLanguage.reopen;
	var alignment;
	$.lblTicket.width = Alloy.Globals.GetWidth(85) + density;
	$.lblDate.width = Alloy.Globals.GetWidth(75) + density;
	$.lblStatus.width = Alloy.Globals.GetWidth(80) + density;
	if (Alloy.Globals.isEnglish) {
		$.imgSearch.left = 10;
		if (OS_IOS) {
			$.txtSearch.left = (isTablet) ? 40 : 30;
			$.txtSearch.right = 10;
		} else {
			$.txtSearch.left = (isTablet) ? 35 : 25;
			$.txtSearch.right = 0;
		}
		alignment = Ti.UI.TEXT_ALIGNMENT_LEFT;
		$.inProgressView.left = 0;
		$.closedView.left = "33%";
		$.reOpenView.left = "66%";
		$.imgProgressTick.left = $.imgClosedTick.left = $.imgReopenTick.left = 2;
		$.lblInProgress.left = $.lblClosed.left = $.lblReopen.left = (isTablet) ? 32 : 22;
		$.lblTicket.left = "2%";
		$.separatorFir.left = "33.33%";
		$.lblDate.left = $.lblDate.right = undefined;
		$.separatorSec.right = "33.33%";
		$.lblStatus.right = "2%";
	} else {
		$.imgSearch.right = 10;
		if (OS_IOS) {
			$.txtSearch.right = (isTablet) ? 40 : 30;
			$.txtSearch.left = 10;
		} else {
			$.txtSearch.right = (isTablet) ? 35 : 25;
			$.txtSearch.left = 0;
		}
		alignment = Ti.UI.TEXT_ALIGNMENT_RIGHT;
		$.inProgressView.right = 0;
		$.closedView.right = "33%";
		$.reOpenView.right = "66%";
		$.imgProgressTick.right = $.imgClosedTick.right = $.imgReopenTick.right = 2;
		$.lblInProgress.right = $.lblClosed.right = $.lblReopen.right = (isTablet) ? 32 : 22;
		$.lblTicket.right = "2%";
		$.separatorFir.right = "33.33%";
		$.lblDate.left = $.lblDate.right = undefined;
		$.separatorSec.left = "33.33%";
		$.lblStatus.left = "2%";
	}
	$.lblTicket.textAlign = $.lblDate.textAlign = $.lblStatus.textAlign = $.lblStatusTitle.textAlign = alignment;
	$.txtSearch.textAlign = $.lblInProgress.textAlign = $.lblClosed.textAlign = $.lblReopen.textAlign = alignment;
}

function loadFmisList(arrTickets) {
	$.tblFmisSupport.data = [];
	var arrTblRow = [];
	if (arrTickets.length == 0) {
		$.lblNoRecord.visible = true;
	} else {
		$.lblNoRecord.visible = false;
	}
	for (var i = 0,
	    length = arrTickets.length; i < length; i++) {
		var row = Ti.UI.createTableViewRow({
			height : (isTablet) ? 55 : 40,
			width : "100%",
			backgroundColor : (((i + 1) % 2) == 0) ? Alloy.Globals.path.whiteColor : "#F2F2F2",
			selectedColor : "none",
			selectionStyle : 0,
			obj : arrTickets[i],
			className : "tickets row"
		});
		var lblTicket = Ti.UI.createLabel({
			height : Ti.UI.SIZE,
			width : "29.32%",
			font : (isTablet) ? Alloy.Globals.path.font17 : Alloy.Globals.path.font12,
			color : Alloy.Globals.path.vatButtonTitleColor,
			text : arrTickets[i].requestNo,
		});
		row.add(lblTicket);
		var separatorFirst = Ti.UI.createView({
			width : 1,
			height : "100%",
			backgroundColor : Alloy.Globals.path.grayColor,
		});
		row.add(separatorFirst);
		var lblDate = Ti.UI.createLabel({
			height : Ti.UI.SIZE,
			width : "29.32%",
			font : (isTablet) ? Alloy.Globals.path.font17 : Alloy.Globals.path.font12,
			color : Alloy.Globals.path.vatButtonTitleColor,
			text : arrTickets[i].submitDate
		});
		row.add(lblDate);
		var separatorSec = Ti.UI.createView({
			width : 1,
			height : "100%",
			backgroundColor : Alloy.Globals.path.grayColor,
				isToExclude_contrast: true
		});
		row.add(separatorSec);
		var btnStatus = Ti.UI.createLabel({
			//width : 80,
			width : "29.32%",
			color : Alloy.Globals.path.vatButtonTitleColor,
			font : (isTablet) ? Alloy.Globals.path.font17 : Alloy.Globals.path.font12,
			text : arrTickets[i].status.toUpperCase()
		});
		row.add(btnStatus);
		var bottomSeparator = Ti.UI.createView({
			bottom : 0,
			height : 1,
			left : 0,
			right : 0,
			backgroundColor : Alloy.Globals.path.grayColor,
				isToExclude_contrast: true
		});
		row.add(bottomSeparator);
		if (arrTickets[i].status.toLowerCase() == "closed") {
			btnStatus.color = Alloy.Globals.path.greenColor;
		} else if (arrTickets[i].status.toLowerCase() == "in progress") {
			btnStatus.color = Alloy.Globals.path.orangeColor;
		} else {
			btnStatus.color = Alloy.Globals.path.blueColor;
		}
		var alignment;
		if (Alloy.Globals.isEnglish) {
			alignment = Ti.UI.TEXT_ALIGNMENT_LEFT;
			lblTicket.left = "2%";
			separatorFirst.left = "33.33%";
			lblDate.right = lblDate.left = undefined;
			separatorSec.right = "33.33%";
			btnStatus.right = "2%";
		} else {
			alignment = Ti.UI.TEXT_ALIGNMENT_RIGHT;
			lblTicket.right = "2%";
			separatorFirst.right = "33.33%";
			lblDate.left = lblDate.right = undefined;
			separatorSec.left = "33.33%";
			btnStatus.left = "2%";
		}
		lblTicket.textAlign = lblDate.textAlign = btnStatus.textAlign = alignment;
		arrTblRow.push(row);
	}
	$.tblFmisSupport.data = arrTblRow;
}

function openCreateTicketWindow() {
	var payLoad = {
		isDetail : false,
		callBack : reloadData
	};

	var win = Alloy.createController("ISupplier/winCreateTicket", payLoad).getView();
	if (OS_IOS) {
		Alloy.Globals.openWindow(win);
	} else {
		win.open();
	}

}

function reloadData() {
	$.imgProgressTick.backgroundImage = Alloy.Globals.path.icnUnChecked;
	$.imgClosedTick.backgroundImage = Alloy.Globals.path.icnUnChecked;
	$.imgReopenTick.backgroundImage = Alloy.Globals.path.icnUnChecked;
	prevOption = 0;
	httpManager.getAllFMISTickets(function(e) {
		if (e.status == "Success") {
			arrTickets = e.arrData;
			loadFmisList(arrTickets);
		} else if (e.status == "Failure") {

			Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.viewTicket, (Alloy.Globals.isEnglish) ? e.description_En : e.description_Ar);
			return;
		}
	});

}

$.tblFmisSupport.addEventListener("click", function(e) {
	httpManager.getFMISTicketDetails(e.row.obj.requestNo, e.row.obj.requestId, function(e) {

		if (e != null) {
			if (e.status == "Success") {
				var payLoad = {
					data : e,
					isDetail : true,
				};

				var win = Alloy.createController("ISupplier/winCreateTicket", payLoad).getView();
				if (OS_IOS) {
					Alloy.Globals.openWindow(win);
				} else {
					win.open();
				}
			} else {
				Alloy.Globals.ShowAlert(Alloy.Globals.selectedLanguage.viewTicket, (Alloy.Globals.isEnglish) ? e.description_En : e.description_Ar);
				return;
			}
		}
	});
});
changeLanguage();
var alertDialog = Ti.UI.createAlertDialog({
	title : Alloy.Globals.selectedLanguage.viewTicket, //noTicketFound
	message : Alloy.Globals.selectedLanguage.createTicketMsg,
	buttonNames : [Alloy.Globals.selectedLanguage.ok, Alloy.Globals.selectedLanguage.cancelTitle]
});
alertDialog.addEventListener('click', function(e) {
	if (e.index == 0) {
		openCreateTicketWindow();
	} else {
		return;
	}
});

$.winFMISSupport.addEventListener("focus",function(e){
	$.viewBottomToolbar.setDefaultTheme($.winFMISSupport);
});
$.viewBottomToolbar.setDefaultTheme($.winFMISSupport);

/**
 * Adding the eventlistener for the bottom bar view
 *
 * @param {Object} e
 */
$.viewBottomToolbar.getView().addEventListener('click', function(e) {
	if (e.source.buttonId == 'btnFontChange') {
		$.viewBottomToolbar.changeFont($.winFMISSupport);
	} else if (e.source.buttonId == 'btnSystemFeedback') {
		$.viewBottomToolbar.openFeedbackScreen(e);
	} else if(e.source.buttonId == 'btnSystemChangeTheme'){
		$.viewBottomToolbar.changeTheme($.winFMISSupport);
	}
});

/**
 * Called on open of the window
 *
 * @param {Object} e
 */
var windowOpened = function(e) {
	$.lblTicket.width = "29.32%";
	$.lblDate.width = "29.32%";
	$.lblStatus.width = "29.32%";
	if (arrTickets.length == 0) {
		alertDialog.show();
	}
	loadFmisList(arrTickets);
	
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


